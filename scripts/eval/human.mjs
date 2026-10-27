#!/usr/bin/env node
/**
 * 사람이 쓴 글 사례 — 2024년 이전 공개 글(공공누리 제1유형) 발췌로 사례를 만든다.
 *
 *   node scripts/eval/human.mjs slop [--ids a,b] [--force]      # 부풀린 글 만들기와 사실 검수
 *   node scripts/eval/human.mjs build                          # evals/human/cases.json 만들기
 *   node scripts/eval/human.mjs reference --out <이름>          # 사람 원문을 조건 H의 실행 기록으로 넣기
 *   --dir evals/human-readme                                   # 다른 자료 묶음(README 등)에 같은 명령을 쓸 때
 *
 * 원문 하나로 사례 두 개를 만든다.
 * - polish: 사람이 쓴 원문을 그대로 주고 다듬어 달라고 한다. 필요 없는 수정과 말투 손상을 본다.
 * - deslop: 같은 원문을 스킬 없는 별도 세션에게 "더 전문적이고 매력적으로" 고쳐 달라고 해서 받은 글을 주고 AI 티를 빼 달라고 한다.
 *   사람 원문은 작성 모델에게 주지 않는다. 품질 비교에서 기준 조건 H로만 쓴다.
 * 부풀린 글은 판정 모델이 원문과 대조해 사실이 그대로인지 검수한다(evals/judge/slop-check.md). 통과하지 못하면 세 번까지 다시 만든다.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, cliVersion, makeSandbox, parseArgs, parseStream, pool, readJson, runClaude, scrub, sha256, usageOf, writeJson } from './lib/common.mjs'
import { openRecords, packRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {
  'slop-model': 'claude-sonnet-5-5',
  'judge-model': 'claude-opus-5-5',
  effort: 'high',
  concurrency: '4',
  claude: 'claude',
})
const mode = options._[0]
const SET = options.dir ?? 'evals/human'
const HUMAN = join(ROOT, SET)
const sources = readJson(join(HUMAN, 'sources.json'))
const spec = readJson(join(HUMAN, 'spec.json'))
const slopFile = join(HUMAN, 'slop.json')
const casesFile = join(HUMAN, 'cases.json')
const ids = options.ids ? String(options.ids).split(',') : null

const SLOP_REQUEST = '아래 글을 더 전문적이고 매력적인 글로 풍성하게 다듬어 줘. 독자의 흥미를 끌 수 있게. 사실, 숫자, 날짜, 이름, 링크는 바꾸거나 새로 만들지 마. 다듬은 글만 보내 줘.'

const CHECK_SCHEMA = {
  type: 'object',
  properties: {
    preserve: { type: 'array', items: { type: 'object', properties: { item: { type: 'string' }, status: { type: 'string', enum: ['kept', 'lost', 'distorted'] }, evidence: { type: 'string' } }, required: ['item', 'status', 'evidence'], additionalProperties: false } },
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

const block = (label, text) => `## ${label}\n\n<<<${label} 시작>>>\n${text}\n<<<${label} 끝>>>`
const specOf = (sourceId) => spec.cases.find((item) => item.source === sourceId)

/** 도구 없는 새 세션 한 번 */
const callIsolated = async ({ prompt, model, systemPrompt, schema }) => {
  const box = makeSandbox()
  const args = [
    '-p', prompt,
    '--output-format', 'stream-json', '--verbose',
    '--model', model,
    '--effort', options.effort,
    '--tools', '',
    '--setting-sources', 'project',
    '--strict-mcp-config',
    '--no-session-persistence',
    ...(systemPrompt ? ['--system-prompt', systemPrompt] : []),
    ...(schema ? ['--json-schema', JSON.stringify(schema)] : []),
  ]
  const run = await runClaude({ claude: options.claude, args, cwd: box.work, env: box.env, timeoutMs: 15 * 60 * 1000 })
  box.cleanup()
  const stream = parseStream(run.stdout)
  return {
    text: typeof stream.result?.result === 'string' ? stream.result.result : '',
    structured: stream.result?.structured_output ?? null,
    meta: {
      model: model,
      responses: Object.keys(stream.result?.modelUsage ?? {}),
      exitCode: run.code,
      durationMs: stream.result?.duration_ms ?? null,
      usage: usageOf(stream.result),
      costUsd: stream.result?.total_cost_usd ?? null,
      error: stream.result && !stream.result.is_error ? null : scrub((stream.result?.result ?? run.stderr ?? '').slice(-500)),
    },
  }
}

if (mode === 'slop') {
  const rubric = readFileSync(join(ROOT, 'evals/judge/slop-check.md'), 'utf8')
  const store = existsSync(slopFile) ? readJson(slopFile) : { about: '', request: SLOP_REQUEST, items: {} }
  store.about = `deslop 사례의 입력. 사람이 쓴 원문을 스킬 없는 별도 세션이 고친 글과, 판정 모델이 원문과 대조한 검수 결과. scripts/eval/human.mjs slop${SET === 'evals/human' ? '' : ` --dir ${SET}`}으로 만든다.`
  store.request = SLOP_REQUEST
  store.cli = cliVersion(options.claude)
  const targets = sources.filter((source) => (!ids || ids.includes(source.id)) && (options.force || store.items[source.id]?.status !== 'ok'))
  const jobs = targets.map((source) => async () => {
    const item = specOf(source.id)
    const attempts = []
    for (let attempt = 1; attempt <= 3; attempt++) {
      const generated = await callIsolated({ prompt: `${SLOP_REQUEST}\n\n${source.text}`, model: options['slop-model'] })
      if (!generated.text.trim()) {
        attempts.push({ attempt, generation: generated.meta, text: '', check: null })
        continue
      }
      const prompt = [
        block('요청', SLOP_REQUEST),
        block('원문', source.text),
        block('결과', generated.text),
        `## 보존 항목\n\n${item.must_preserve.map((line) => `- ${line}`).join('\n')}`,
        `## 금지 변경\n\n${[...item.must_not, ...spec.common_must_not].map((line) => `- ${line}`).join('\n')}`,
      ].join('\n\n')
      const checked = await callIsolated({ prompt, model: options['judge-model'], systemPrompt: rubric, schema: CHECK_SCHEMA })
      const missingExact = item.exact.filter((literal) => !generated.text.includes(literal))
      attempts.push({ attempt, generation: generated.meta, text: generated.text, check: { rubricSha256: sha256(rubric), meta: checked.meta, answer: checked.structured, missingExact } })
      const verdict = checked.structured?.verdict ?? '판정 실패'
      console.log(`slop ${source.id} a${attempt} — ${verdict}${missingExact.length ? `, 원문 표기 빠짐 ${missingExact.join(', ')}` : ''}`)
      if (verdict === 'pass') break
    }
    const passed = attempts.find((a) => a.check?.answer?.verdict === 'pass')
    store.items[source.id] = { status: passed ? 'ok' : 'failed', at: new Date().toISOString(), chosenAttempt: passed?.attempt ?? null, text: passed?.text ?? null, attempts }
  })
  await pool(jobs, Number(options.concurrency))
  writeJson(slopFile, store)
  const failed = Object.entries(store.items).filter(([, value]) => value.status !== 'ok').map(([key]) => key)
  console.log(`끝: ${Object.keys(store.items).length - failed.length}개 통과${failed.length ? `, 통과 못 함 ${failed.join(', ')}` : ''}`)
}

if (mode === 'build') {
  const slop = existsSync(slopFile) ? readJson(slopFile) : { items: {} }
  const cases = []
  for (const source of sources) {
    const item = specOf(source.id)
    if (!item) throw new Error(`spec.json에 ${source.id}가 없다`)
    const base = {
      genre: spec.genre ?? (source.id.includes('news') || source.id.includes('qa') ? '공공기관 안내문' : '블로그 체험기'),
      language: 'ko',
      split: source.split,
      source: source.id,
      origin: `human:${source.url}`,
      overlaps_skill_examples: false,
    }
    const mustNot = [...item.must_not, ...spec.common_must_not]
    cases.push({
      id: `${source.id}-polish`,
      task: 'rewrite',
      variant: 'polish',
      ...base,
      request: item.polish_request,
      input: source.text,
      must_preserve: item.must_preserve,
      must_not: mustNot,
      exact: item.exact,
      notes: spec.notes.polish,
    })
    const slopped = slop.items[source.id]
    if (slopped?.status !== 'ok') {
      console.log(`deslop ${source.id}: 검수를 통과한 입력이 없어 만들지 않음`)
      continue
    }
    // 부풀린 글에 원문 표기가 그대로 있는 것만 문자열 검사에 쓴다
    const exact = item.exact.filter((literal) => slopped.text.includes(literal))
    cases.push({
      id: `${source.id}-deslop`,
      task: 'rewrite',
      variant: 'deslop',
      ...base,
      request: item.deslop_request,
      input: slopped.text,
      must_preserve: item.must_preserve,
      must_not: mustNot,
      exact,
      notes: spec.notes.deslop,
      reference: source.id,
    })
  }
  writeJson(casesFile, cases)
  console.log(`사례 ${cases.length}개 → ${SET}/cases.json (dev ${cases.filter((c) => c.split === 'dev').length}, test ${cases.filter((c) => c.split === 'test').length})`)
}

if (mode === 'reference') {
  if (!options.out) {
    console.error('사용법: human.mjs reference --out <이름> [--reps 2]')
    process.exit(1)
  }
  const records = openRecords(options.out)
  const cases = readJson(casesFile)
  const reps = Number(options.reps ?? 2)
  const textOf = Object.fromEntries(sources.map((source) => [source.id, source.text]))
  records.put('manifest/H', {
    condition: 'H',
    skill: null,
    invocation: '실행하지 않음. 사람이 쓴 원문을 결과로 둔 기준 조건(polish는 입력과 같은 글, deslop은 부풀리기 전 원문)',
    model: null,
    effort: null,
    cli: null,
    casesFile: `${SET}/cases.json`,
    casesSha256: sha256(readFileSync(casesFile)),
    updated: new Date().toISOString(),
  })
  for (const item of cases) {
    for (let rep = 1; rep <= reps; rep++) {
      records.put(`runs/H/${item.id}-r${rep}-a1`, {
        id: item.id,
        condition: 'H',
        rep,
        attempt: 1,
        status: 'ok',
        reference: true,
        prompt: null,
        output: textOf[item.source],
        durationMs: null,
        numTurns: null,
        usage: usageOf(null),
        costUsd: null,
        skill: null,
      })
    }
  }
  packRecords(options.out)
  console.log(`H: ${cases.length * reps}건 → ${options.out}`)
}

if (!['slop', 'build', 'reference'].includes(mode)) {
  console.error('사용법: human.mjs slop | build | reference --out <이름>')
  process.exit(1)
}
