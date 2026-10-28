#!/usr/bin/env node
/**
 * 작성 실행 — 사례마다 격리된 새 세션에서 claude -p로 글을 쓰게 한다.
 *
 *   node scripts/eval/run.mjs --out <이름> --condition A --skill none [--cases evals/cases.json] [--ids a,b] [--reps 2]
 *   node scripts/eval/run.mjs --out <이름> --condition B0 --skill evals/snapshots/v0.1.0/geulppal
 *
 * 작성 모델에는 request와 input만 준다. 스킬 조건은 작업 폴더의 .claude/skills/geulppal에 스킬을 두고
 * 요청 앞에 /geulppal을 붙인다. 두 조건의 차이는 이 두 가지뿐이다.
 * 공개 기록은 evals/results/<이름>/records.json의 runs/·manifest/ 항목으로 묶인다(lib/records.mjs).
 * 원본 로그(스트림·대화 기록·stderr)는 evals/runs/<이름>/에 쓴다(커밋 제외).
 * 같은 사례·회차의 기록이 있으면 건너뛴다. --retry-failed를 주면 실패한 회차를 새 시도(a2, a3…)로 다시 돌린다.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import {
  ROOT, cliVersion, fileHash, findTranscript, installSkill, makeSandbox, newSessionId, parseArgs, parseStream, pool,
  readJson, readTranscript, runClaude, scrub, skillEvidence, treeHash, usageOf,
} from './lib/common.mjs'
import { changedFiles, ensureFixture, fixtureHash, fixtureKey, installFixture, pickDeliverable, snapshot } from './lib/fixtures.mjs'
import { openRecords, packRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {
  cases: 'evals/cases.json',
  reps: '2',
  'rep-start': '1',
  model: 'claude-sonnet-5-5',
  effort: 'high',
  concurrency: '4',
  'timeout-min': '10',
  claude: 'claude',
})
if (!options.out || !options.condition || !options.skill) {
  console.error('사용법: run.mjs --out <이름> --condition <이름> --skill <스킬 폴더|none> [--cases 파일] [--ids a,b] [--reps N] [--rep-start N] [--model M] [--effort E] [--concurrency N] [--retry-failed]')
  process.exit(1)
}

const WRITER_TOOLS = ['Read', 'Glob', 'Grep', 'Skill']
// 초안 사례(작업 폴더 자료가 있는 사례)는 사용자가 저장소에서 "README를 써 줘"라고 하는 상황이다. 파일을 쓸 수 있게 하고,
// 쓰기는 acceptEdits 모드로 작업 폴더 안에서만 자동 허용한다(밖은 묻는 단계에서 거절됨). 쓴 파일을 결과로 본다
const DRAFT_TOOLS = [...WRITER_TOOLS, 'Write', 'Edit']
const toolsOf = (item) => (item?.fixture ? DRAFT_TOOLS : WRITER_TOOLS)
const skillDir = options.skill === 'none' ? null : resolve(options.skill)
const casesFile = resolve(options.cases)
const allCases = readJson(casesFile)
const ids = options.ids ? String(options.ids).split(',') : null
const cases = ids ? allCases.filter((c) => ids.includes(c.id)) : allCases
if (ids && cases.length !== ids.length) {
  console.error(`없는 사례: ${ids.filter((id) => !allCases.some((c) => c.id === id)).join(', ')}`)
  process.exit(1)
}
const records = openRecords(options.out)
const rawDir = join(ROOT, 'evals/runs', options.out)
const reps = Number(options.reps)
const repStart = Number(options['rep-start'])
const version = cliVersion(options.claude)

const promptOf = (item) => `${skillDir ? '/geulppal ' : ''}${item.request}${item.input ? `\n\n${item.input}` : ''}`

// 초안 사례는 작업 폴더에 저장소 코드 등을 넣는다(lib/fixtures.mjs). 사례에 적힌 해시와 다르면 실행하지 않는다
const fixtureDirs = {}
for (const item of cases.filter((c) => c.fixture)) {
  const dir = ensureFixture(item.fixture)
  if (item.fixture.sha256 && fixtureHash(dir) !== item.fixture.sha256) {
    console.error(`${item.id}: 작업 폴더 자료의 해시가 사례와 다르다`)
    process.exit(1)
  }
  fixtureDirs[item.id] = dir
}

const baseArgs = (sessionId, item) => [
  '--output-format', 'stream-json', '--verbose',
  '--model', options.model,
  '--effort', options.effort,
  '--session-id', sessionId,
  '--setting-sources', 'project',
  '--strict-mcp-config',
  '--permission-mode', item?.fixture ? 'acceptEdits' : 'dontAsk',
  '--tools', toolsOf(item).join(','),
  '--allowedTools', WRITER_TOOLS.join(' '),
]

// 조건 명세 — 실행 기록과 함께 남긴다. 조건마다 따로 써서 동시에 돌려도 서로 덮어쓰지 않는다
records.put(`manifest/${options.condition}`, {
  condition: options.condition,
  skill: skillDir ? { path: relative(ROOT, skillDir), treeSha256: treeHash(skillDir), skillMdSha256: fileHash(join(skillDir, 'SKILL.md')) } : null,
  invocation: skillDir ? '요청 앞에 "/geulppal " (프로젝트 스킬 .claude/skills/geulppal)' : '요청 그대로 (스킬 없음, 빈 .claude 폴더)',
  model: options.model,
  effort: options.effort,
  cli: version,
  args: [...baseArgs('<새 UUID>', cases[0]), '-p', '<프롬프트>'].map(String),
  tools: toolsOf(cases[0]),
  casesFile: casesFile.replace(`${ROOT}/`, ''),
  casesSha256: fileHash(casesFile),
  updated: new Date().toISOString(),
})

const attemptsOf = (condition, id, rep) =>
  records
    .names(`runs/${condition}`)
    .filter((name) => name.startsWith(`${id}-r${rep}-a`))
    .map((name) => records.get(`runs/${condition}/${name}`))
    .sort((a, b) => a.attempt - b.attempt)

const runOne = async (item, rep, attempt) => {
  const box = makeSandbox()
  installSkill(box.work, skillDir)
  if (fixtureDirs[item.id]) installFixture(box.work, fixtureDirs[item.id])
  const before = fixtureDirs[item.id] ? snapshot(box.work) : null
  const sessionId = newSessionId()
  const prompt = promptOf(item)
  const args = ['-p', prompt, ...baseArgs(sessionId, item)]
  const started = new Date().toISOString()
  const run = await runClaude({ claude: options.claude, args, cwd: box.work, env: box.env, timeoutMs: Number(options['timeout-min']) * 60 * 1000 })
  const stream = parseStream(run.stdout)
  const transcriptFile = findTranscript(box.config, sessionId)
  const transcript = transcriptFile ? readTranscript(transcriptFile) : []
  const evidence = skillEvidence({ transcript, skillDir, toolUses: stream.toolUses, base: box.base })
  const reply = typeof stream.result?.result === 'string' ? stream.result.result : ''
  // 초안 사례는 작업 폴더에 새로 쓰거나 고친 파일이 결과다. 파일을 쓰지 않았으면 마지막 답을 결과로 본다
  const files = before ? changedFiles(box.work, before) : []
  const deliverable = before ? pickDeliverable(files) : null
  const output = deliverable ? readFileSync(join(box.work, deliverable.path), 'utf8') : reply

  // 원본 로그 — 커밋하지 않는다
  const raw = join(rawDir, options.condition, `${item.id}-r${rep}-a${attempt}`)
  mkdirSync(raw, { recursive: true })
  writeFileSync(join(raw, 'stream.jsonl'), run.stdout)
  writeFileSync(join(raw, 'stderr.txt'), run.stderr)
  writeFileSync(join(raw, 'output.txt'), output)
  if (before) {
    writeFileSync(join(raw, 'reply.txt'), reply)
    for (const file of files) {
      mkdirSync(dirname(join(raw, 'files', file.path)), { recursive: true })
      copyFileSync(join(box.work, file.path), join(raw, 'files', file.path))
    }
  }
  if (transcriptFile) copyFileSync(transcriptFile, join(raw, 'transcript.jsonl'))
  // 계정 사용량(rate limit)은 공개 기록에 넣지 않고 원본 로그에만 둔다
  writeFileSync(join(raw, 'rate-limit.json'), JSON.stringify(stream.rateLimits.at(-1) ?? null))

  let status = 'ok'
  if (run.timedOut) status = 'timeout'
  else if (run.code !== 0 || !stream.result || stream.result.is_error) status = 'error'
  else if (!output.trim()) status = 'empty_output'
  else if (skillDir && !(evidence.commandExpanded && evidence.skillBodyInjected)) status = 'skill_not_loaded'

  const record = {
    id: item.id,
    condition: options.condition,
    rep,
    attempt,
    status,
    started,
    sessionIdIsNew: stream.init?.session_id === sessionId,
    model: { requested: options.model, init: stream.init?.model ?? null, responses: stream.models, usage: Object.keys(stream.result?.modelUsage ?? {}) },
    effort: options.effort,
    cli: stream.init?.claude_code_version ?? version,
    environment: {
      envNames: box.envNames,
      tools: stream.init?.tools ?? null,
      mcpServers: stream.init?.mcp_servers ?? null,
      plugins: (stream.init?.plugins ?? []).map((plugin) => plugin.source ?? plugin.name),
      skills: stream.init?.skills ?? null,
      permissionMode: stream.init?.permissionMode ?? null,
      apiKeySource: stream.init?.apiKeySource ?? null,
    },
    skill: evidence,
    prompt,
    ...(item.fixture ? { fixture: { key: fixtureKey(item.fixture), sha256: item.fixture.sha256 ?? null } } : {}),
    ...(before ? { deliverable: deliverable ? { kind: 'file', path: deliverable.path } : { kind: 'reply' }, files: files.map(({ path, chars, isNew }) => ({ path, chars, isNew })), reply: scrub(reply) } : {}),
    output: scrub(output),
    outputHadLocalPath: scrub(output) !== output,
    exitCode: run.code,
    signal: run.signal,
    timedOut: run.timedOut,
    durationMs: stream.result?.duration_ms ?? null,
    wallMs: run.wallMs,
    numTurns: stream.result?.num_turns ?? null,
    usage: usageOf(stream.result),
    costUsd: stream.result?.total_cost_usd ?? null,
    permissionDenials: (stream.result?.permission_denials ?? []).map((denial) => ({ tool: denial.tool_name, input: scrub(JSON.stringify(denial.tool_input ?? {})) })),
    toolCalls: stream.toolUses.map((use) => ({ name: use.name, input: scrub(JSON.stringify(use.input ?? {})).slice(0, 300) })),
    error: status === 'ok' ? null : scrub((stream.result?.result && stream.result.is_error ? String(stream.result.result) : run.stderr).slice(-1500)),
  }
  records.put(`runs/${options.condition}/${item.id}-r${rep}-a${attempt}`, record)
  box.cleanup()
  const cost = record.costUsd === null ? '' : ` $${record.costUsd.toFixed(3)}`
  console.log(`${options.condition} ${item.id} r${rep} a${attempt} — ${status}, ${Math.round(run.wallMs / 1000)}초${cost}${skillDir ? `, 스킬 ${evidence.skillBodyInjected ? '읽음' : '안 읽음'}` : ''}`)
  return record
}

const jobs = []
for (const item of cases) {
  for (let rep = repStart; rep < repStart + reps; rep++) {
    const attempts = attemptsOf(options.condition, item.id, rep)
    const last = attempts.at(-1)
    if (last && (last.status === 'ok' || !options['retry-failed'])) continue
    jobs.push(() => runOne(item, rep, (last?.attempt ?? 0) + 1))
  }
}
console.log(`${options.condition}: ${jobs.length}회 실행 (사례 ${cases.length}개, 회차 ${repStart}~${repStart + reps - 1}, 모델 ${options.model}, ${version})`)
const done = await pool(jobs, Number(options.concurrency))
packRecords(options.out)
const tally = done.reduce((acc, record) => ({ ...acc, [record.status]: (acc[record.status] ?? 0) + 1 }), {})
console.log(`끝: ${JSON.stringify(tally)}`)
