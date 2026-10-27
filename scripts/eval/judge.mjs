#!/usr/bin/env node
/**
 * 판정 — 의미 보존 검사(결과마다)와 품질 쌍 비교(순서를 바꿔 두 번).
 *
 *   node scripts/eval/judge.mjs meaning --out <이름> --condition A [--ids a,b] [--force] [--pass 2]
 *   node scripts/eval/judge.mjs pair --out <이름> --left A --right B0 [--left-from <다른 이름>] [--ids a,b]
 *   node scripts/eval/judge.mjs rescore --out <이름> --condition A   # 판정 모델을 다시 부르지 않고 문자열 검사와 통과 여부만 다시 계산
 *
 * 판정자는 별도의 새 세션이다. 도구 없이(--tools "") 원문·요청·익명 결과만 받는다. 스킬 이름, 조건, 원하는 승자는 알려 주지 않는다.
 * 의미 보존 검사는 평가 기준(must_preserve·must_not)을 함께 받는다. 문자열 검사(exact)는 판정 모델 없이 따로 한다.
 * 품질 비교는 두 결과가 모두 의미 보존 검사와 문자열 검사를 통과한 쌍만 한다.
 * 판정 기록은 records.json의 judge/meaning/·judge/pair/ 항목으로 묶인다(lib/records.mjs).
 * --pass 2: 같은 결과를 한 번 더 판정해 judge/meaning-pass2/에 쓴다(판정자 일치도 확인용). 품질 비교 대상은 1차 판정으로 정한다.
 * --left-from: 왼쪽 조건의 결과를 다른 결과 폴더에서 가져온다(입력·모델·환경·설정이 같은 기준선을 재사용할 때). 재사용 사실은 판정 기록에 남는다.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, cliVersion, makeSandbox, parseArgs, parseStream, pool, readJson, runClaude, scrub, sha256, usageOf } from './lib/common.mjs'
import { openRecords, packRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {
  model: 'claude-opus-5-5',
  effort: 'high',
  concurrency: '4',
  'timeout-min': '10',
  claude: 'claude',
  cases: null,
})
const mode = options._[0]
if (!['meaning', 'pair', 'rescore'].includes(mode) || !options.out) {
  console.error('사용법: judge.mjs meaning --out <이름> --condition <조건> | pair --out <이름> --left <조건> --right <조건> [--left-from <이름>] [--right-from <이름>]')
  process.exit(1)
}

const rawDir = (name) => join(ROOT, 'evals/runs', name)
const opened = new Map()
const recordsOf = (name) => {
  if (!opened.has(name)) opened.set(name, openRecords(name))
  return opened.get(name)
}
const out = recordsOf(options.out)
const manifestOf = (name, condition) => recordsOf(name).get(`manifest/${condition}`)
const casesFileOf = (name, condition) => join(ROOT, options.cases ?? manifestOf(name, condition).casesFile)
const casesById = (file) => Object.fromEntries(readJson(file).map((item) => [item.id, item]))
const ids = options.ids ? String(options.ids).split(',') : null
const version = cliVersion(options.claude)

/** 조건의 회차별 마지막 시도 */
const latestRuns = (name, condition) => {
  const byKey = new Map()
  for (const record of recordsOf(name).list(`runs/${condition}`)) {
    const key = `${record.id}-r${record.rep}`
    if (!byKey.has(key) || byKey.get(key).attempt < record.attempt) byKey.set(key, record)
  }
  return [...byKey.values()].filter((record) => !ids || ids.includes(record.id)).sort((a, b) => a.id.localeCompare(b.id) || a.rep - b.rep)
}

/** 판정에는 원본 출력(경로를 지우기 전)을 쓴다. 원본 로그가 없으면 공개 기록을 쓴다 */
const outputOf = (name, record) => {
  const file = join(rawDir(name), record.condition, `${record.id}-r${record.rep}-a${record.attempt}`, 'output.txt')
  return existsSync(file) ? readFileSync(file, 'utf8') : record.output
}

const exactCheck = (item, output) => {
  const checked = item.exact ?? []
  const missing = checked.filter((literal) => !output.includes(literal))
  // 고칠 게 없으면 그대로 두라는 요청에 원문을 다시 싣지 않고 답했다면 손상될 문자열이 없다
  if (item.task === 'noop-check' && checked.length > 0 && missing.length === checked.length) return { checked, missing, applicable: false, pass: true }
  return { checked, missing, applicable: true, pass: missing.length === 0 }
}

const block = (label, text) => `## ${label}\n\n<<<${label} 시작>>>\n${text}\n<<<${label} 끝>>>`

const MEANING_SCHEMA = {
  type: 'object',
  properties: {
    preserve: { type: 'array', items: { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['kept', 'lost', 'distorted', 'n/a'] }, evidence: { type: 'string' } }, required: ['item', 'status', 'evidence'], additionalProperties: false } },
    must_not: { type: 'array', items: { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['ok', 'violated'] }, evidence: { type: 'string' } }, required: ['item', 'status', 'evidence'], additionalProperties: false } },
    general: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          check: { type: 'string', enum: ['new_facts', 'omission', 'number_scope', 'status_certainty', 'conditions', 'literals', 'scope'] },
          status: { type: 'string', enum: ['ok', 'problem'] },
          evidence: { type: 'string' },
        },
        required: ['check', 'status', 'evidence'],
        additionalProperties: false,
      },
    },
    verdict: { type: 'string', enum: ['pass', 'fail'] },
    fail_reasons: { type: 'array', items: { type: 'string' } },
  },
  required: ['preserve', 'must_not', 'general', 'verdict', 'fail_reasons'],
  additionalProperties: false,
}

const PAIR_SCHEMA = {
  type: 'object',
  properties: {
    criteria: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          criterion: { type: 'string', enum: ['findability', 'inflation_repetition', 'flow', 'fit_voice', 'restraint'] },
          better: { type: 'string', enum: ['X', 'Y', 'same'] },
          evidence: { type: 'string' },
        },
        required: ['criterion', 'better', 'evidence'],
        additionalProperties: false,
      },
    },
    verdict: { type: 'string', enum: ['X', 'Y', 'tie', 'both_inadequate'] },
    reason: { type: 'string' },
    meaning_concerns: { type: 'string' },
  },
  required: ['criteria', 'verdict', 'reason', 'meaning_concerns'],
  additionalProperties: false,
}

const judgeArgs = ({ prompt, rubric, schema }) => [
  '-p', prompt,
  '--output-format', 'stream-json', '--verbose',
  '--model', options.model,
  '--effort', options.effort,
  '--tools', '',
  '--setting-sources', 'project',
  '--strict-mcp-config',
  '--no-session-persistence',
  '--system-prompt', rubric,
  '--json-schema', JSON.stringify(schema),
]

/** 판정 호출 — 구조화된 답이 없으면 두 번까지 다시 부르고 시도 수를 남긴다 */
const callJudge = async ({ prompt, rubric, schema }) => {
  const attempts = []
  for (let attempt = 1; attempt <= 3; attempt++) {
    const box = makeSandbox()
    const run = await runClaude({ claude: options.claude, args: judgeArgs({ prompt, rubric, schema }), cwd: box.work, env: box.env, timeoutMs: Number(options['timeout-min']) * 60 * 1000 })
    box.cleanup()
    const stream = parseStream(run.stdout)
    const answer = stream.result?.structured_output ?? null
    attempts.push({
      attempt,
      ok: Boolean(answer),
      exitCode: run.code,
      timedOut: run.timedOut,
      durationMs: stream.result?.duration_ms ?? null,
      wallMs: run.wallMs,
      usage: usageOf(stream.result),
      costUsd: stream.result?.total_cost_usd ?? null,
      models: Object.keys(stream.result?.modelUsage ?? {}),
      error: answer ? null : scrub((stream.result?.result ?? run.stderr ?? '').slice(-800)),
    })
    if (answer) return { answer, attempts }
  }
  return { answer: null, attempts }
}

const judgeMeta = (rubric) => ({ model: options.model, effort: options.effort, cli: version, rubricSha256: sha256(rubric), at: new Date().toISOString() })

if (mode === 'meaning') {
  const condition = options.condition
  const rubric = readFileSync(join(ROOT, 'evals/judge/meaning.md'), 'utf8')
  const cases = casesById(casesFileOf(options.out, condition))
  const jobs = latestRuns(options.out, condition).map((record) => async () => {
    const key = `${options.pass === '2' ? 'judge/meaning-pass2' : 'judge/meaning'}/${condition}/${record.id}-r${record.rep}`
    const previous = out.get(key)
    // --force: 판정 지침을 고친 뒤 같은 결과를 다시 판정할 때
    if (!options.force && previous?.attempt === record.attempt && previous?.judge?.answer) return null
    const item = cases[record.id]
    if (record.status !== 'ok') {
      out.put(key, { id: record.id, condition, rep: record.rep, attempt: record.attempt, runStatus: record.status, judged: false })
      console.log(`의미 ${condition} ${record.id} r${record.rep} — 실행 상태 ${record.status}, 판정 안 함`)
      return null
    }
    const output = outputOf(options.out, record)
    const exact = exactCheck(item, output)
    const prompt = [
      block('요청', item.request),
      block('원문', item.input),
      block('결과', output),
      `## 보존 항목\n\n${item.must_preserve.map((line) => `- ${line}`).join('\n')}`,
      `## 금지 변경\n\n${item.must_not.map((line) => `- ${line}`).join('\n')}`,
      item.notes ? `## 참고\n\n${item.notes}` : '',
    ].filter(Boolean).join('\n\n')
    const judged = await callJudge({ prompt, rubric, schema: MEANING_SCHEMA })
    const pass = judged.answer ? judged.answer.verdict === 'pass' && exact.pass : null
    out.put(key, { id: record.id, condition, rep: record.rep, attempt: record.attempt, runStatus: record.status, judged: Boolean(judged.answer), pass, exact, judge: { ...judgeMeta(rubric), answer: judged.answer, attempts: judged.attempts } })
    console.log(`의미 ${condition} ${record.id} r${record.rep} — ${judged.answer ? judged.answer.verdict : '판정 실패'}${exact.pass ? '' : `, 문자열 누락 ${exact.missing.length}`}`)
    return null
  })
  console.log(`의미 보존 판정: ${condition} ${jobs.length}건 (판정 모델 ${options.model})`)
  await pool(jobs, Number(options.concurrency))
  packRecords(options.out)
}

if (mode === 'pair') {
  const left = options.left
  const right = options.right
  const leftFrom = options['left-from'] ?? options.out
  const rightFrom = options['right-from'] ?? options.out
  const rubric = readFileSync(join(ROOT, 'evals/judge/quality.md'), 'utf8')
  const cases = casesById(casesFileOf(rightFrom, right))
  const meaningOf = (name, condition, record) => recordsOf(name).get(`judge/meaning/${condition}/${record.id}-r${record.rep}`)
  const leftRuns = Object.fromEntries(latestRuns(leftFrom, left).map((record) => [`${record.id}-r${record.rep}`, record]))
  const pairDir = `judge/pair/${left}-vs-${right}`
  const jobs = []
  for (const rightRecord of latestRuns(rightFrom, right)) {
    const key = `${rightRecord.id}-r${rightRecord.rep}`
    const leftRecord = leftRuns[key]
    const summaryKey = `${pairDir}/${key}`
    const previous = out.get(summaryKey)
    if (!leftRecord) continue
    const leftMeaning = meaningOf(leftFrom, left, leftRecord)
    const rightMeaning = meaningOf(rightFrom, right, rightRecord)
    const eligible = leftMeaning?.pass === true && rightMeaning?.pass === true
    const base = {
      id: rightRecord.id,
      rep: rightRecord.rep,
      left: { condition: left, from: leftFrom, attempt: leftRecord.attempt, meaningPass: leftMeaning?.pass ?? null },
      right: { condition: right, from: rightFrom, attempt: rightRecord.attempt, meaningPass: rightMeaning?.pass ?? null },
      reusedBaseline: leftFrom !== options.out || rightFrom !== options.out,
    }
    if (!eligible) {
      out.put(summaryKey, { ...base, judged: false, reason: '두 결과가 모두 의미 보존을 통과하지 않아 품질 비교에서 제외' })
      continue
    }
    if (previous?.judged && previous.left.attempt === leftRecord.attempt && previous.right.attempt === rightRecord.attempt) continue
    jobs.push(async () => {
      const item = cases[rightRecord.id]
      const leftText = outputOf(leftFrom, leftRecord)
      const rightText = outputOf(rightFrom, rightRecord)
      // o1: X=왼쪽, Y=오른쪽 / o2: X=오른쪽, Y=왼쪽
      const orders = [
        { order: 'o1', X: left, Y: right, xText: leftText, yText: rightText },
        { order: 'o2', X: right, Y: left, xText: rightText, yText: leftText },
      ]
      const judgments = []
      for (const order of orders) {
        const prompt = [block('요청', item.request), block('원문', item.input), block('결과 X', order.xText), block('결과 Y', order.yText)].join('\n\n')
        const judged = await callJudge({ prompt, rubric, schema: PAIR_SCHEMA })
        const verdict = judged.answer?.verdict ?? null
        const winner = verdict === 'X' ? order.X : verdict === 'Y' ? order.Y : verdict
        judgments.push({ order: order.order, X: order.X, Y: order.Y, verdict, winner, answer: judged.answer, attempts: judged.attempts })
      }
      const winners = judgments.map((j) => j.winner)
      const consistent = winners[0] !== null && winners[0] === winners[1]
      out.put(summaryKey, { ...base, judged: true, judge: judgeMeta(rubric), judgments, consistent, result: consistent ? winners[0] : 'inconsistent' })
      console.log(`쌍 ${left}-vs-${right} ${key} — ${winners.join(' / ')}${consistent ? '' : ' (순서에 따라 바뀜)'}`)
    })
  }
  console.log(`품질 쌍 비교: ${left}(${leftFrom}) vs ${right}(${rightFrom}) ${jobs.length}쌍 × 순서 2 (판정 모델 ${options.model})`)
  await pool(jobs, Number(options.concurrency))
  packRecords(options.out)
}

if (mode === 'rescore') {
  const condition = options.condition
  const cases = casesById(casesFileOf(options.out, condition))
  const runs = Object.fromEntries(latestRuns(options.out, condition).map((record) => [`${record.id}-r${record.rep}`, record]))
  for (const folder of ['judge/meaning', 'judge/meaning-pass2']) {
    for (const name of out.names(`${folder}/${condition}`)) {
      const key = `${folder}/${condition}/${name}`
      const judged = out.get(key)
      if (!judged.judged) continue
      const exact = exactCheck(cases[judged.id], outputOf(options.out, runs[`${judged.id}-r${judged.rep}`]))
      const pass = judged.judge.answer.verdict === 'pass' && exact.pass
      if (pass !== judged.pass) console.log(`다시 계산 ${folder} ${condition} ${judged.id} r${judged.rep}: ${judged.pass} → ${pass}`)
      out.put(key, { ...judged, exact, pass, ...(pass !== judged.pass ? { rescored: { from: judged.pass, reason: '문자열 검사 적용 범위 수정' } } : {}) })
    }
  }
  packRecords(options.out)
}
