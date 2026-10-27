#!/usr/bin/env node
/**
 * 자동 선택(트리거) 평가 — 스킬을 설치한 새 세션에 /geulppal 없이 자연어 요청을 주고, Claude가 geulppal을 고르는지 본다.
 *
 *   node scripts/eval/trigger.mjs --out <이름> --label <스킬 이름표> --skill <스킬 폴더> [--queries evals/trigger/queries.json] [--reps 2]
 *
 * 선택으로 세는 것: Skill 도구로 geulppal을 부르거나 Read로 geulppal의 SKILL.md를 연 경우. 명시적 호출은 이 평가에 없다.
 * 같은 요청에 대해 단어 겹침 대리 지표(lib/lexical.mjs)도 계산해 실제 선택과 나란히 남긴다. 대리 지표는 실제 선택이 아니다.
 * 작성 평가와 달리 파일 편집(Edit·Write)을 허용한다. 셸은 주지 않는다.
 */
import { mkdirSync, writeFileSync, existsSync, readdirSync, copyFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import {
  ROOT, cliVersion, fileHash, findTranscript, installSkill, makeSandbox, newSessionId, parseArgs, parseStream, pool, readJson,
  readTranscript, runClaude, scrub, treeHash, usageOf, writeJson,
} from './lib/common.mjs'
import { createRanker, parseListing } from './lib/lexical.mjs'

const options = parseArgs(process.argv.slice(2), {
  queries: 'evals/trigger/queries.json',
  reps: '2',
  model: 'claude-sonnet-5-5',
  effort: 'high',
  concurrency: '4',
  'timeout-min': '10',
  'max-budget-usd': '1',
  claude: 'claude',
})
if (!options.out || !options.label || !options.skill) {
  console.error('사용법: trigger.mjs --out <이름> --label <이름표> --skill <스킬 폴더> [--queries 파일] [--reps N] [--report]')
  process.exit(1)
}
const TOOLS = ['Read', 'Glob', 'Grep', 'Skill', 'Edit', 'Write']
const skillDir = resolve(options.skill)
const queriesFile = resolve(options.queries)
const spec = readJson(queriesFile)
const queries = [...spec.should.map((q) => ({ ...q, expect: true })), ...spec.should_not.map((q) => ({ ...q, expect: false }))]
const resultsDir = join(ROOT, 'evals/results', options.out)
const rawDir = join(ROOT, 'evals/runs', options.out)
const version = cliVersion(options.claude)
const reps = Number(options.reps)

writeJson(join(resultsDir, 'manifest', `trigger-${options.label}.json`), {
  condition: `trigger-${options.label}`,
  kind: 'trigger',
  skill: { path: relative(ROOT, skillDir), treeSha256: treeHash(skillDir), skillMdSha256: fileHash(join(skillDir, 'SKILL.md')) },
  invocation: '자연어 요청 그대로(/geulppal 없음), 프로젝트 스킬 .claude/skills/geulppal',
  model: options.model,
  effort: options.effort,
  cli: version,
  tools: TOOLS,
  maxBudgetUsd: Number(options['max-budget-usd']),
  queriesFile: relative(ROOT, queriesFile),
  queriesSha256: fileHash(queriesFile),
  updated: new Date().toISOString(),
})

const args = (prompt, sessionId) => [
  '-p', prompt,
  '--output-format', 'stream-json', '--verbose',
  '--model', options.model,
  '--effort', options.effort,
  '--session-id', sessionId,
  '--setting-sources', 'project',
  '--strict-mcp-config',
  '--permission-mode', 'dontAsk',
  '--tools', TOOLS.join(','),
  '--allowedTools', TOOLS.join(' '),
  '--max-budget-usd', String(options['max-budget-usd']),
]

const runOne = async (query, rep) => {
  const file = join(resultsDir, 'trigger', options.label, `${query.id}-r${rep}.json`)
  if (existsSync(file)) return readJson(file)
  const box = makeSandbox()
  installSkill(box.work, skillDir)
  for (const [name, content] of Object.entries(query.files ?? {})) {
    mkdirSync(dirname(join(box.work, name)), { recursive: true })
    writeFileSync(join(box.work, name), content)
  }
  const sessionId = newSessionId()
  const run = await runClaude({ claude: options.claude, args: args(query.prompt, sessionId), cwd: box.work, env: box.env, timeoutMs: Number(options['timeout-min']) * 60 * 1000 })
  const stream = parseStream(run.stdout)
  const transcriptFile = findTranscript(box.config, sessionId)
  const transcript = transcriptFile ? readTranscript(transcriptFile) : []
  const listing = transcript.find((entry) => entry.type === 'attachment' && entry.attachment?.type === 'skill_listing')?.attachment?.content ?? ''
  const skillCalls = stream.toolUses.filter((use) => use.name === 'Skill').map((use) => String(use.input?.skill ?? use.input?.command ?? ''))
  const readSkillMd = stream.toolUses.some((use) => use.name === 'Read' && String(use.input?.file_path ?? '').includes('/skills/geulppal/SKILL.md'))
  const selected = skillCalls.some((name) => name.replace(/^\//, '') === 'geulppal') || readSkillMd
  const raw = join(rawDir, 'trigger', options.label, `${query.id}-r${rep}`)
  mkdirSync(raw, { recursive: true })
  writeFileSync(join(raw, 'stream.jsonl'), run.stdout)
  writeFileSync(join(raw, 'stderr.txt'), run.stderr)
  if (transcriptFile) copyFileSync(transcriptFile, join(raw, 'transcript.jsonl'))
  // 대리 지표 — 이 실행에 실제로 깔린 스킬 목록으로 순위를 매긴다
  const docs = parseListing(listing)
  const ranked = docs.length ? createRanker(docs)(query.prompt) : []
  const proxySelected = ranked.length > 0 && ranked[0].name === 'geulppal' && ranked[0].score > 0 && (ranked[1]?.score ?? 0) < ranked[0].score
  const status = run.timedOut ? 'timeout' : stream.result ? (stream.result.is_error ? 'error' : 'ok') : 'error'
  const record = {
    id: query.id,
    label: options.label,
    rep,
    expect: query.expect,
    prompt: query.prompt,
    status,
    resultSubtype: stream.result?.subtype ?? null,
    selected,
    selectedBy: skillCalls.includes('geulppal') ? 'Skill' : readSkillMd ? 'Read SKILL.md' : null,
    otherSkillCalls: skillCalls.filter((name) => name !== 'geulppal'),
    listedGeulppal: docs.some((doc) => doc.name === 'geulppal'),
    proxy: { selected: proxySelected, top3: ranked.slice(0, 3).map((r) => `${r.name}:${r.score.toFixed(1)}`), listedSkills: docs.map((doc) => doc.name) },
    model: { requested: options.model, init: stream.init?.model ?? null, responses: stream.models },
    cli: stream.init?.claude_code_version ?? version,
    sessionIdIsNew: stream.init?.session_id === sessionId,
    toolCalls: stream.toolUses.map((use) => ({ name: use.name, input: scrub(JSON.stringify(use.input ?? {})).slice(0, 200) })),
    permissionDenials: (stream.result?.permission_denials ?? []).map((denial) => denial.tool_name),
    durationMs: stream.result?.duration_ms ?? null,
    wallMs: run.wallMs,
    usage: usageOf(stream.result),
    costUsd: stream.result?.total_cost_usd ?? null,
    error: status === 'ok' ? null : scrub((stream.result?.result ?? run.stderr ?? '').slice(-800)),
  }
  writeJson(file, record)
  box.cleanup()
  console.log(`트리거 ${options.label} ${query.id} r${rep} — ${status}, ${query.expect ? '써야 함' : '쓰지 말아야 함'}, 선택 ${selected ? '예' : '아니오'}, 대리 지표 ${proxySelected ? '예' : '아니오'}`)
  return record
}

const jobs = queries.flatMap((query) => Array.from({ length: reps }, (_, i) => () => runOne(query, i + 1)))
console.log(`트리거 평가 ${options.label}: 요청 ${queries.length}개 × ${reps}회 (${options.model}, ${version})`)
await pool(jobs, Number(options.concurrency))

// 집계
const records = readdirSync(join(resultsDir, 'trigger', options.label)).filter((f) => f.endsWith('.json')).map((f) => readJson(join(resultsDir, 'trigger', options.label, f)))
const okRecords = records.filter((r) => r.status === 'ok')
const byQuery = {}
for (const r of okRecords) (byQuery[r.id] ??= []).push(r)
const lines = [
  `# 트리거 평가: ${options.label}`, '',
  `자동 생성 파일이다(\`node scripts/eval/trigger.mjs --out ${options.out} --label ${options.label} --skill ${relative(ROOT, skillDir)}\`).`, '',
  `실행 ${records.length}회(성공 ${okRecords.length}, 실패 ${records.length - okRecords.length}). 요청 ${queries.length}개 × ${reps}회. 같은 요청의 반복은 새 요청으로 세지 않는다.`, '',
  '| 구분 | 요청 | 실제 선택(회차별) | 단어 겹침 대리 지표 | 다른 스킬 호출 |', '|---|---|---|---|---|',
]
for (const query of queries) {
  const list = (byQuery[query.id] ?? []).sort((a, b) => a.rep - b.rep)
  const cells = list.map((r) => (r.selected ? '선택' : '안 함')).join(' · ') || '실패'
  const proxy = list[0] ? (list[0].proxy.selected ? '선택' : '안 함') : '-'
  const others = [...new Set(list.flatMap((r) => r.otherSkillCalls))].join(', ') || '-'
  lines.push(`| ${query.expect ? '써야 함' : '쓰지 말아야 함'} | \`${query.id}\` | ${cells} | ${proxy} | ${others} |`)
}
const rate = (expect, key) => {
  const list = okRecords.filter((r) => r.expect === expect)
  return `${list.filter((r) => (key === 'proxy' ? r.proxy.selected : r.selected)).length}/${list.length}`
}
const queryLevel = (expect) => {
  const ids = queries.filter((q) => q.expect === expect).map((q) => q.id)
  const all = ids.filter((id) => (byQuery[id] ?? []).length > 0 && byQuery[id].every((r) => r.selected)).length
  const some = ids.filter((id) => (byQuery[id] ?? []).some((r) => r.selected)).length
  return { total: ids.length, all, some }
}
const should = queryLevel(true)
const shouldNot = queryLevel(false)
lines.push('', '## 요약', '',
  `- 써야 하는 요청: 실행 단위 선택 ${rate(true, 'real')}. 요청 단위로는 ${should.total}개 중 모든 회차에서 선택 ${should.all}개, 한 번 이상 선택 ${should.some}개.`,
  `- 쓰지 말아야 하는 요청: 실행 단위 선택 ${rate(false, 'real')}. 요청 단위로는 ${shouldNot.total}개 중 한 번 이상 선택 ${shouldNot.some}개.`,
  `- 단어 겹침 대리 지표(모델 호출 없음): 써야 하는 요청 ${rate(true, 'proxy')}, 쓰지 말아야 하는 요청 ${rate(false, 'proxy')}. 실제 선택과 다른 지표다.`,
  `- 비용 합 ${okRecords.reduce((a, r) => a + (r.costUsd ?? 0), 0).toFixed(3)} USD(CLI 보고값), 시간 중앙값 ${(okRecords.map((r) => r.durationMs).sort((a, b) => a - b)[Math.floor(okRecords.length / 2)] / 1000).toFixed(1)}초.`,
)
writeFileSync(join(resultsDir, `trigger-${options.label}.md`), `${lines.join('\n')}\n`)
console.log(lines.join('\n'))
