#!/usr/bin/env node
/**
 * 사람 블라인드 비교 — 사람이 쓴 글 사례에서 결과 쌍을 골라 평가 페이지를 만들고, 받은 평가를 모델 판정과 맞춰 본다.
 *
 *   node scripts/eval/rating.mjs build --page <html 경로>     # 쌍 고르기 → evals/runs/rating/pairs.json(정답 포함, 커밋하지 않음)과 평가 페이지
 *   node scripts/eval/rating.mjs score --ratings <json 경로>   # 받은 평가 집계 → evals/results/2026-10-27-human-rating/
 *
 * 두 결과가 모두 의미 보존을 통과한 쌍만 쓴다. 사례마다 쌍 하나(회차는 고정된 난수로 고른다), 좌우 순서도 고정된 난수로 정한다.
 * 페이지에는 쌍 번호·요청·원문·결과 두 개만 넣는다. 어느 쪽이 어떤 조건인지는 pairs.json에만 있고, 평가가 끝난 뒤 공개한다.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { ROOT, parseArgs, readJson, sha256, writeJson } from './lib/common.mjs'
import { openRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
const PAIRS_FILE = join(ROOT, 'evals/runs/rating/pairs.json')
const cases = readJson(join(ROOT, 'evals/human/cases.json'))
const byId = Object.fromEntries(cases.map((item) => [item.id, item]))

// 0.3.0 결과: 개발용은 2라운드 후보(C2, 같은 스킬), 확인용은 고정 후 실행(C)
const RUNS = { human: '2026-10-27-human', dev: '2026-10-27-human-r2', test: '2026-10-27-human-final' }
const zeroThree = (item) => (item.split === 'dev' ? { run: RUNS.dev, condition: 'C2' } : { run: RUNS.test, condition: 'C' })
const GROUPS = [
  { key: 'A-vs-0.3.0', left: { run: RUNS.human, condition: 'A' }, filter: () => true, max: 99 },
  { key: 'H-vs-0.3.0', left: { run: RUNS.human, condition: 'H' }, filter: (item) => item.variant === 'deslop', max: 99 },
  { key: 'B-vs-0.3.0', left: { run: RUNS.human, condition: 'B' }, filter: (item) => item.split === 'test', max: 4 },
]

// 고정된 난수(mulberry32) — 같은 입력이면 같은 쌍·같은 좌우 순서
const seeded = (text) => {
  let a = parseInt(sha256(text).slice(0, 8), 16)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// 고정된 난수로 섞기(Fisher–Yates)
const shuffle = (items, random) => {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const opened = new Map()
const recordsOf = (run) => {
  if (!opened.has(run)) opened.set(run, openRecords(run))
  return opened.get(run)
}
const latestRun = (run, condition, id, rep) =>
  recordsOf(run)
    .names(`runs/${condition}`)
    .filter((name) => name.startsWith(`${id}-r${rep}-a`))
    .map((name) => recordsOf(run).get(`runs/${condition}/${name}`))
    .sort((a, b) => b.attempt - a.attempt)[0] ?? null
const passed = (run, condition, id, rep) => recordsOf(run).get(`judge/meaning/${condition}/${id}-r${rep}`)?.pass === true
// 같은 쌍을 판정 모델이 비교한 기록이 있으면 함께 둔다(사람 판정과 맞춰 보기용)
const modelJudgment = (left, right, id, rep) => {
  for (const run of [right.run, left.run]) {
    const record = recordsOf(run).get(`judge/pair/${left.condition}-vs-${right.condition}/${id}-r${rep}`)
    if (record?.judged) return { run, result: record.result, judgments: record.judgments.map((j) => j.winner) }
  }
  return null
}

if (mode === 'build') {
  if (!options.page) {
    console.error('사용법: rating.mjs build --page <html 경로>')
    process.exit(1)
  }
  const pairs = []
  for (const group of GROUPS) {
    const random = seeded(group.key)
    const chosen = []
    for (const item of cases.filter(group.filter)) {
      const right = zeroThree(item)
      const reps = [1, 2].filter((rep) => passed(group.left.run, group.left.condition, item.id, rep) && passed(right.run, right.condition, item.id, rep))
      if (!reps.length) continue
      const rep = reps[Math.floor(random() * reps.length)]
      chosen.push({ item, rep, right })
    }
    // 그룹 안에서 고를 수가 넘으면 고정된 난수 순서로 자른다
    for (const { item, rep, right } of shuffle(chosen, random).slice(0, group.max)) {
      const leftText = latestRun(group.left.run, group.left.condition, item.id, rep).output
      const rightText = latestRun(right.run, right.condition, item.id, rep).output
      const swap = seeded(`${group.key}:${item.id}:${rep}`)() < 0.5
      pairs.push({
        group: group.key,
        case: item.id,
        rep,
        variant: item.variant,
        split: item.split,
        sides: swap ? [{ ...right }, { ...group.left }] : [{ ...group.left }, { ...right }],
        texts: swap ? [rightText, leftText] : [leftText, rightText],
        model: modelJudgment(group.left, right, item.id, rep),
      })
    }
  }
  // 그룹이 섞이게 전체 순서를 고정된 난수로 섞고 번호를 붙인다
  const ordered = shuffle(pairs, seeded('order'))
  ordered.forEach((pair, index) => (pair.id = `p${String(index + 1).padStart(2, '0')}`))
  pairs.splice(0, pairs.length, ...ordered)
  mkdirSync(dirname(PAIRS_FILE), { recursive: true })
  writeJson(PAIRS_FILE, { builtAt: new Date().toISOString(), pairs })

  const page = pairs.map((pair) => ({ id: pair.id, request: byId[pair.case].request, input: byId[pair.case].input, texts: pair.texts }))
  const json = JSON.stringify(page).replace(/</g, '\\u003c')
  const template = readFileSync(join(ROOT, 'scripts/eval/rating-page.html'), 'utf8')
  writeFileSync(options.page, template.replace('/*PAIRS*/[]', json))
  const count = pairs.reduce((acc, pair) => ({ ...acc, [pair.group]: (acc[pair.group] ?? 0) + 1 }), {})
  console.log(`쌍 ${pairs.length}개 ${JSON.stringify(count)} → ${options.page}`)
}

if (mode === 'score') {
  if (!options.ratings) {
    console.error('사용법: rating.mjs score --ratings <json 경로>')
    process.exit(1)
  }
  const { pairs } = readJson(PAIRS_FILE)
  const ratings = readJson(options.ratings)
  const label = { A: '글빨 없음', B: '글빨 0.2.1', C: '글빨 0.3.0', C2: '글빨 0.3.0', H: '사람 원문' }
  const rows = []
  const tally = {}
  for (const pair of pairs) {
    const rating = ratings.find((r) => r.pair === pair.id)
    const pick = rating?.choice
    const winner = pick === 'x' ? pair.sides[0].condition : pick === 'y' ? pair.sides[1].condition : pick ?? null
    const norm = (c) => (c === 'C2' ? 'C' : c)
    const human = winner && ['A', 'B', 'C', 'C2', 'H'].includes(winner) ? norm(winner) : winner
    const model = pair.model ? (['tie', 'both_inadequate', 'inconsistent'].includes(pair.model.result) ? pair.model.result : norm(pair.model.result)) : null
    tally[pair.group] ??= {}
    tally[pair.group][human ?? '미평가'] = (tally[pair.group][human ?? '미평가'] ?? 0) + 1
    rows.push({ id: pair.id, group: pair.group, case: pair.case, rep: pair.rep, human, model, note: rating?.note ?? '' })
  }
  const outDir = join(ROOT, 'evals/results/2026-10-27-human-rating')
  mkdirSync(outDir, { recursive: true })
  writeJson(join(outDir, 'pairs.json'), { pairs: pairs.map(({ texts, ...rest }) => rest), ratings: rows })
  const names = (value) => label[value] ?? { same: '비슷함', neither: '둘 다 별로', tie: '차이 없음', inconsistent: '엇갈림', both_inadequate: '둘 다 부적절' }[value] ?? value ?? '-'
  const lines = [
    '# 사람 블라인드 비교',
    '',
    '자동 생성 파일이다(`node scripts/eval/rating.mjs score`). 평가자는 저장소 소유자 한 명이고, 어느 쪽이 어떤 조건인지 모르는 상태로 골랐다.',
    '',
    '## 그룹별',
    '',
    '| 비교 | 결과 |',
    '|---|---|',
    ...Object.entries(tally).map(([group, counts]) => `| ${group} | ${Object.entries(counts).map(([k, v]) => `${names(k)} ${v}`).join(', ')} |`),
    '',
    '## 쌍별',
    '',
    '| 쌍 | 비교 | 사례 | 사람 | 판정 모델 | 메모 |',
    '|---|---|---|---|---|---|',
    ...rows.map((r) => `| ${r.id} | ${r.group} | \`${r.case}\` r${r.rep} | ${names(r.human)} | ${names(r.model)} | ${String(r.note).replace(/\|/g, '\\|').replace(/\n/g, ' ')} |`),
    '',
  ]
  writeFileSync(join(outDir, 'report.md'), lines.join('\n'))
  console.log(lines.join('\n'))
}

if (!['build', 'score'].includes(mode)) {
  console.error('사용법: rating.mjs build --page <html 경로> | score --ratings <json 경로>')
  process.exit(1)
}
