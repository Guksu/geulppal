#!/usr/bin/env node
/**
 * 한국어 자연스러움 사례 — Claude가 개발 작업 중에 한국어로 쓰는 답변이 한국어 독자에게 바로 읽히는지 본다.
 *
 *   node scripts/eval/natural.mjs build --dir evals/korean-natural                       # spec.json → cases.json
 *   node scripts/eval/natural.mjs polish --dir evals/korean-natural --from <이름> --condition A [--to <파일>]   # 그 답변을 다듬게 하는 사례 → polish-cases.json
 *   node scripts/eval/natural.mjs summary --out <이름> [--conds A,I,N1]                  # 판정 모델이 표시한 곳 집계 → evals/results/<이름>/natural.md
 *   node scripts/eval/natural.mjs check --out <이름> --condition A --page <html>         # 사람이 1분 안에 확인할 문장 10개(표시한 문장 6, 안 한 문장 4)
 *   node scripts/eval/natural.mjs check-score --out <이름> --ratings <json>              # 사람 판단과 판정 모델 표시가 맞는지 → evals/results/<이름>-sentence-check/
 *
 * 판정(judge.mjs natural)은 evals/judge/korean-natural.md로, 독자가 멈칫할 표현을 종류·정도와 함께 표시한다.
 * 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다. 이 스킬이 고치려는 표현이 남았는지 보는 근거로만 쓴다.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, readJson, sha256, writeJson } from './lib/common.mjs'
import { openRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
const usage = '사용법: natural.mjs build --dir <폴더> | polish --dir <폴더> --from <이름> --condition <조건> | summary --out <이름> [--conds A,I]'
if (!['build', 'polish', 'summary', 'check', 'check-score'].includes(mode)) {
  console.error(usage)
  process.exit(1)
}

const POLISH_REQUEST = '아래 글은 개발 작업 중에 받은 답변이야. 내용은 그대로 두고 한국어로 자연스럽게 다듬어 줘. 다듬은 글만 줘.'

if (mode === 'build') {
  const dir = join(ROOT, options.dir)
  const spec = readJson(join(dir, 'spec.json'))
  const fixtures = Object.fromEntries(readJson(join(ROOT, spec.fixtures_from)).map((item) => [item.id, item.fixture]))
  const cases = spec.cases.map((item) => {
    // 저장소 코드 없이 묻는 질문은 input에 질문을 둔다. reader가 있으면 판정에서 그 독자를 기준으로 본다
    if (item.fixture && !fixtures[item.fixture]) throw new Error(`${item.id}: 저장소 코드 ${item.fixture}가 없다`)
    if (!item.fixture && !item.input) throw new Error(`${item.id}: 저장소 코드도 질문도 없다`)
    if (item.prompt && !spec.prompts[item.prompt]) throw new Error(`${item.id}: 질문 ${item.prompt}가 없다`)
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
      request: item.request ?? spec.prompts[item.prompt],
      input: item.input ?? '',
      must_preserve: [item.fixture ? '작업 폴더의 코드를 근거로 질문에 답한다' : '질문에 답한다'],
      must_not: [],
      exact: [],
      ...(item.fixture ? { fixture: fixtures[item.fixture] } : {}),
      ...(item.reader ? { reader: item.reader } : {}),
      prompt_kind: item.prompt ?? 'question',
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
  const to = options.to ?? 'polish-cases.json'
  writeJson(join(dir, to), cases)
  console.log(`다듬기 사례 ${cases.length}개 → ${options.dir}/${to}`)
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

// 사람 확인용 문장 고르기: 판정 모델이 표시한 문장과 표시하지 않은 문장을 섞는다
const CHECK_FILE = join(ROOT, 'evals/runs/rating/sentence-check.json')
const sentencesOf = (text) => {
  const out = []
  let fence = false
  for (const raw of text.split('\n')) {
    if (raw.trim().startsWith('```')) { fence = !fence; continue }
    if (fence || /^\s*(\||#)/.test(raw)) continue
    const line = raw.replace(/^\s*([-*]|\d+\.)\s+/, '').replace(/\*\*/g, '').trim()
    for (const sentence of line.split(/(?<=[.!?])\s+/)) if (/[가-힣]/.test(sentence) && sentence.length >= 15 && sentence.length <= 160) out.push(sentence.trim())
  }
  return out
}
const seeded = (text) => {
  let a = parseInt(sha256(text).slice(0, 8), 16)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const shuffle = (list, random) => list.map((v) => [random(), v]).sort((x, y) => x[0] - y[0]).map(([, v]) => v)

if (mode === 'check') {
  const records = openRecords(options.out)
  const cond = options.condition
  const cases = Object.fromEntries(readJson(join(ROOT, 'evals/korean-natural/cases.json')).map((c) => [c.id, c]))
  const random = seeded(`${options.out}:${cond}`)
  const judged = shuffle(records.list(`judge/natural/${cond}`).filter((r) => r.judged), random)
  const runOf = (r) => records.get(`runs/${cond}/${r.id}-r${r.rep}-a${r.attempt}`)
  const flagged = []
  const used = new Set()
  const want = ['literal', 'literal', 'literal', 'awkward', ['coined', 'noun_chain'], ['translationese', 'symbol']]
  for (const cat of want) {
    const cats = [cat].flat()
    for (const r of judged) {
      if (used.has(r.id)) continue
      const span = r.spans.find((sp) => cats.includes(sp.category) && sp.quoteFound)
      const sentence = span && sentencesOf(runOf(r).output).find((x) => x.includes(span.quote))
      if (!sentence) continue
      flagged.push({ case: r.id, rep: r.rep, sentence, flagged: true, span })
      used.add(r.id)
      break
    }
  }
  const clean = []
  for (const r of judged) {
    if (clean.length >= 4) break
    if (used.has(r.id)) continue
    const candidates = sentencesOf(runOf(r).output).filter((x) => !r.spans.some((sp) => x.includes(sp.quote) || sp.quote.includes(x)))
    if (!candidates.length) continue
    clean.push({ case: r.id, rep: r.rep, sentence: candidates[Math.floor(random() * candidates.length)], flagged: false })
    used.add(r.id)
  }
  const items = shuffle([...flagged, ...clean], random).map((it, i) => ({ id: `s${String(i + 1).padStart(2, '0')}`, question: cases[it.case].request, ...it }))
  mkdirSync(join(ROOT, 'evals/runs/rating'), { recursive: true })
  writeJson(CHECK_FILE, { run: options.out, condition: cond, items })
  const page = items.map(({ id, question, sentence }) => ({ id, question, sentence }))
  const title = '어색한 문장 확인'
  const lede = 'Claude가 개발 질문에 한국어로 답한 글에서 문장 10개를 뽑았습니다. 문장마다 읽다가 멈칫하면 "어색함", 아니면 "괜찮음"을 눌러 주세요. 1분 정도 걸립니다.'
  const html = readFileSync(join(ROOT, 'scripts/eval/sentence-page.html'), 'utf8').replaceAll('{{TITLE}}', title).replace('{{LEDE}}', lede).replace('/*ITEMS*/[]', () => JSON.stringify(page).replace(/</g, '\\u003c'))
  writeFileSync(options.page, html)
  console.log(`문장 ${items.length}개(표시한 문장 ${flagged.length}, 안 한 문장 ${clean.length}) → ${options.page}`)
}

if (mode === 'check-score') {
  const { run, condition, items } = readJson(CHECK_FILE)
  const ratings = Object.fromEntries(readJson(options.ratings).map((r) => [r.item, r.choice]))
  const rows = items.map((it) => ({ ...it, human: ratings[it.id] ?? null }))
  const agree = rows.filter((r) => r.human && (r.human === 'awkward') === r.flagged).length
  const rated = rows.filter((r) => r.human).length
  const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')
  const lines = [
    '# 어색한 문장 확인', '',
    `자동 생성 파일이다(\`node scripts/eval/natural.mjs check-score\`). ${run}의 ${condition} 결과에서 판정 모델이 멈칫할 곳으로 표시한 문장과 표시하지 않은 문장을 섞어, 저장소 소유자가 어느 쪽인지 모르는 상태로 "어색함/괜찮음"을 골랐다.`, '',
    `| | 사람: 어색함 | 사람: 괜찮음 |`, '|---|---|---|',
    `| 판정 모델이 표시한 문장 | ${rows.filter((r) => r.flagged && r.human === 'awkward').length} | ${rows.filter((r) => r.flagged && r.human === 'fine').length} |`,
    `| 표시하지 않은 문장 | ${rows.filter((r) => !r.flagged && r.human === 'awkward').length} | ${rows.filter((r) => !r.flagged && r.human === 'fine').length} |`, '',
    `일치 ${agree}/${rated}.`, '',
    '| 문장 | 사례 | 판정 모델 | 사람 | 문장 내용 | 판정 모델이 짚은 곳 |', '|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.id} | \`${r.case}\` r${r.rep} | ${r.flagged ? `표시(${r.span.category})` : '표시 안 함'} | ${r.human === 'awkward' ? '어색함' : r.human === 'fine' ? '괜찮음' : '-'} | ${cell(r.sentence)} | ${r.flagged ? cell(r.span.quote) : ''} |`),
    '',
  ]
  const dir = join(ROOT, 'evals/results', `${run}-sentence-check`)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'report.md'), lines.join('\n'))
  writeJson(join(dir, 'items.json'), rows)
  console.log(lines.slice(0, 11).join('\n'))
}
