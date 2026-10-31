#!/usr/bin/env node
/**
 * 한국어 자연스러움 사례 — Claude가 개발 작업 중에 한국어로 쓰는 답변이 한국어 독자에게 바로 읽히는지 본다.
 *
 *   node scripts/eval/natural.mjs build --dir evals/korean-natural                       # spec.json → cases.json
 *   node scripts/eval/natural.mjs polish --dir evals/korean-natural --from <이름> --condition A   # 그 답변을 다듬게 하는 사례 → polish-cases.json
 *   node scripts/eval/natural.mjs summary --out <이름> [--conds A,I,N1]                  # 판정 모델이 표시한 곳 집계 → evals/results/<이름>/natural.md
 *
 * 판정(judge.mjs natural)은 evals/judge/korean-natural.md로, 독자가 멈칫할 표현을 종류·정도와 함께 표시한다.
 * 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다. 이 스킬이 고치려는 표현이 남았는지 보는 근거로만 쓴다.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, readJson, writeJson } from './lib/common.mjs'
import { openRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
const usage = '사용법: natural.mjs build --dir <폴더> | polish --dir <폴더> --from <이름> --condition <조건> | summary --out <이름> [--conds A,I]'
if (!['build', 'polish', 'summary'].includes(mode)) {
  console.error(usage)
  process.exit(1)
}

const POLISH_REQUEST = '아래 글은 개발 작업 중에 받은 답변이야. 내용은 그대로 두고 한국어로 자연스럽게 다듬어 줘. 다듬은 글만 줘.'

if (mode === 'build') {
  const dir = join(ROOT, options.dir)
  const spec = readJson(join(dir, 'spec.json'))
  const fixtures = Object.fromEntries(readJson(join(ROOT, spec.fixtures_from)).map((item) => [item.id, item.fixture]))
  const cases = spec.cases.map((item) => {
    if (!fixtures[item.fixture]) throw new Error(`${item.id}: 저장소 코드 ${item.fixture}가 없다`)
    if (!spec.prompts[item.prompt]) throw new Error(`${item.id}: 질문 ${item.prompt}가 없다`)
    return {
      id: item.id,
      task: 'answer',
      variant: 'explain',
      genre: '개발 작업 답변',
      language: 'ko',
      split: item.split,
      source: null,
      origin: `authored:${options.dir}/spec.json`,
      overlaps_skill_examples: false,
      request: spec.prompts[item.prompt],
      input: '',
      must_preserve: ['작업 폴더의 코드를 근거로 질문에 답한다'],
      must_not: [],
      exact: [],
      fixture: fixtures[item.fixture],
      prompt_kind: item.prompt,
      notes: '판정은 evals/judge/korean-natural.md로 한국어 독자가 멈칫할 표현만 본다. 답의 사실 여부는 이 사례에서 판정하지 않는다.',
    }
  })
  writeJson(join(dir, 'cases.json'), cases)
  console.log(`사례 ${cases.length}개 → ${options.dir}/cases.json`)
}

if (mode === 'polish') {
  const dir = join(ROOT, options.dir)
  const base = Object.fromEntries(readJson(join(dir, 'cases.json')).map((item) => [item.id, item]))
  const records = openRecords(options.from)
  const latest = new Map()
  for (const record of records.list(`runs/${options.condition}`)) {
    const key = `${record.id}-r${record.rep}`
    if (record.status === 'ok' && (!latest.has(key) || latest.get(key).attempt < record.attempt)) latest.set(key, record)
  }
  // 사례마다 1회차 답변만 쓴다(같은 질문의 두 답을 둘 다 다듬게 하지 않는다)
  const cases = [...latest.values()].filter((record) => record.rep === 1 && base[record.id]).map((record) => ({
    id: `${record.id}-polish`,
    task: 'rewrite',
    variant: 'polish',
    genre: '개발 작업 답변 다듬기',
    language: 'ko',
    split: base[record.id].split,
    source: null,
    origin: `generated:${options.from}/runs/${options.condition}/${record.id}-r1`,
    overlaps_skill_examples: false,
    request: POLISH_REQUEST,
    input: record.output.trim(),
    must_preserve: ['답변의 사실, 코드 이름, 수치, 조건, 확실성 표시(추측·가능성)를 그대로 둔다'],
    must_not: ['답변에 없는 사실·권고·평가를 보태기', '코드 블록·식별자·경로 바꾸기'],
    exact: [],
    notes: `글빨 없는 Claude(${options.condition})가 쓴 답변을 다듬게 한다. 의미 보존 판정(meaning.md)과 멈칫할 곳 판정(korean-natural.md)을 함께 본다.`,
  }))
  writeJson(join(dir, 'polish-cases.json'), cases)
  console.log(`다듬기 사례 ${cases.length}개 → ${options.dir}/polish-cases.json`)
}

if (mode === 'summary') {
  const records = openRecords(options.out)
  const conds = options.conds ? String(options.conds).split(',') : records.dirs('judge/natural')
  const lines = ['# 한국어 독자가 멈칫하는 곳', '', `자동 생성 파일이다(\`node scripts/eval/natural.mjs summary --out ${options.out}\`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.`, '']
  const CATS = ['literal', 'coined', 'noun_chain', 'symbol', 'translationese', 'awkward']
  lines.push('| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | ' + CATS.join(' | ') + ' | 글에 없는 인용 |', '|---|---|---|---|' + CATS.map(() => '---|').join('') + '---|')
  const examples = {}
  for (const cond of conds) {
    const judged = records.list(`judge/natural/${cond}`).filter((r) => r.judged)
    const spans = judged.flatMap((r) => r.spans.map((s) => ({ ...s, id: r.id, rep: r.rep })))
    const byCat = Object.fromEntries(CATS.map((c) => [c, spans.filter((s) => s.category === c).length]))
    const clean = judged.filter((r) => r.spans.length === 0).length
    const major = spans.filter((s) => s.severity === 'major').length
    const missing = spans.filter((s) => s.quoteFound === false).length
    lines.push(`| ${cond} | ${judged.length} | ${clean} | ${spans.length}(${major}) | ${CATS.map((c) => byCat[c]).join(' | ')} | ${missing} |`)
    examples[cond] = spans
  }
  lines.push('', '표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.', '')
  for (const cond of conds) {
    lines.push(`## ${cond}`, '', '| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |', '|---|---|---|---|---|---|')
    const cell = (text) => String(text ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
    for (const s of examples[cond]) lines.push(`| \`${s.id}\` r${s.rep} | ${s.category} | ${s.severity} | ${cell(s.quote)} | ${cell(s.why)} | ${cell(s.suggestion)} |`)
    lines.push('')
  }
  writeFileSync(join(ROOT, 'evals/results', options.out, 'natural.md'), lines.join('\n'))
  console.log(lines.slice(0, 6 + conds.length).join('\n'))
}
