#!/usr/bin/env node
/**
 * 사람 블라인드 비교 — 사람이 쓴 글 사례에서 결과 쌍을 골라 평가 페이지를 만들고, 받은 평가를 모델 판정과 맞춰 본다.
 *
 *   node scripts/eval/rating.mjs build --page <html 경로>     # 쌍 고르기 → evals/runs/rating/pairs.json(정답 포함, 커밋하지 않음)과 평가 페이지
 *   node scripts/eval/rating.mjs score --ratings <json 경로>   # 받은 평가 집계 → evals/results/2026-10-27-human-rating/
 *   --set draft-readme                                       # README 초안 사례(evals/draft-readme)로 같은 일을 할 때
 *
 * 두 결과가 모두 의미 보존(초안은 근거 판정)을 통과한 쌍만 쓴다. 초안 사례의 사람 README(H)는 판정하지 않으므로 통과로 본다.
 * 사례마다 쌍 하나(회차는 고정된 난수로 고른다), 좌우 순서도 고정된 난수로 정한다.
 * 페이지에는 쌍 번호·요청·원문(초안은 메모)·결과 두 개만 넣는다. 어느 쪽이 어떤 조건인지는 pairs.json에만 있고, 평가가 끝난 뒤 공개한다.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { ROOT, parseArgs, readJson, sha256, writeJson } from './lib/common.mjs'
import { openRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), { set: 'human' })
const mode = options._[0]

// 0.3.0 결과: 개발용은 2라운드 후보(C2, 같은 스킬), 확인용은 고정 후 실행(C)
const HUMAN_RUNS = { human: '2026-10-27-human', dev: '2026-10-27-human-r2', test: '2026-10-27-human-final' }
// README 초안: 확인용(test)의 글빨 없음·0.3.0은 기준선 실행, 새 확인용(holdout)과 0.4.0·사람 README는 최종 실행에 있다
const DRAFT_RUNS = { baseline: '2026-10-28-draft-readme', final: '2026-10-28-draft-readme-final' }
const draftRun = (item) => (item.split === 'holdout' ? DRAFT_RUNS.final : DRAFT_RUNS.baseline)
// 메모 업무 글: 확인용은 기준선 실행, 새 확인용은 최종 실행. 0.4.1(F)과 비교한다
// 블로그: 확인용·새 확인용의 0.4.3은 최종 실행, 2차 새 확인용은 2차 최종 실행
const blogRun = (item) => (item.split === 'holdout2' ? '2026-10-29-draft-blog-final2' : '2026-10-29-draft-blog-final')
const fictionRun = (item) => (item.split === 'holdout' ? '2026-10-30-draft-fiction-final' : '2026-10-30-draft-fiction')
const memoRun = (item) => (item.split === 'holdout' ? '2026-10-28-draft-memo-final' : '2026-10-28-draft-memo')
const SETS = {
  human: {
    cases: 'evals/human/cases.json',
    pairsFile: 'evals/runs/rating/pairs.json',
    results: 'evals/results/2026-10-27-human-rating',
    storeKey: 'geulppal-blind',
    title: '글빨 블라인드 비교',
    lede: '같은 요청을 받은 두 결과를 읽고, 요청한 사람이 그대로 쓸 글로 어느 쪽이 나은지 골라 주세요. 사실과 조건은 판정 모델이 이미 확인했으니 읽기 좋은지, 요청과 말투에 맞는지를 보면 됩니다. 어느 쪽이 글빨인지, 사람이 쓴 원문인지는 알려 드리지 않습니다.',
    right: (item) => (item.split === 'dev' ? { run: HUMAN_RUNS.dev, condition: 'C2' } : { run: HUMAN_RUNS.test, condition: 'C' }),
    groups: [
      { key: 'A-vs-0.3.0', left: { run: HUMAN_RUNS.human, condition: 'A' }, filter: () => true, max: 99 },
      { key: 'H-vs-0.3.0', left: { run: HUMAN_RUNS.human, condition: 'H' }, filter: (item) => item.variant === 'deslop', max: 99 },
      { key: 'B-vs-0.3.0', left: { run: HUMAN_RUNS.human, condition: 'B' }, filter: (item) => item.split === 'test', max: 4 },
    ],
  },
  'draft-readme': {
    cases: 'evals/draft-readme/cases.json',
    pairsFile: 'evals/runs/rating/draft-readme-pairs.json',
    results: 'evals/results/2026-10-28-draft-readme-rating',
    storeKey: 'geulppal-blind-draft-readme',
    title: '글빨 README 초안 블라인드 비교',
    lede: '저장소 코드를 보고 README를 처음부터 써 달라는 요청에 나온 두 결과입니다. 저장소에 그대로 올릴 README로 어느 쪽이 나은지 골라 주세요. 코드와 맞는지는 판정 모델이 따로 확인했으니, 처음 보는 사람이 무엇인지·어떻게 쓰는지 빨리 알 수 있는지, 읽기 좋은지를 보면 됩니다. 어느 쪽이 글빨인지, 사람이 쓴 README인지는 알려 드리지 않습니다.',
    context: '작성자는 저장소 코드(README와 설명 문서는 뺌)만 보고 썼습니다.',
    referencePass: true,
    right: () => ({ run: DRAFT_RUNS.final, condition: 'E' }),
    groups: [
      { key: 'A-vs-0.4.0', left: (item) => ({ run: draftRun(item), condition: 'A' }), filter: (item) => item.split !== 'dev', max: 99 },
      { key: 'H-vs-0.4.0', left: { run: DRAFT_RUNS.final, condition: 'H' }, filter: (item) => item.split !== 'dev', max: 99 },
      { key: 'C-vs-0.4.0', left: (item) => ({ run: draftRun(item), condition: 'C' }), filter: (item) => item.split !== 'dev', max: 4 },
    ],
  },
  'draft-memo': {
    cases: 'evals/draft-memo/cases.json',
    pairsFile: 'evals/runs/rating/draft-memo-pairs.json',
    results: 'evals/results/2026-10-28-draft-memo-rating',
    storeKey: 'geulppal-blind-draft-memo',
    title: '글빨 메모 업무 글 블라인드 비교',
    lede: '메모만 주고 보도자료·안내문·보고서·기획서를 써 달라는 요청에 나온 두 결과입니다. 요청한 사람이 그대로 쓸 글로 어느 쪽이 나은지 골라 주세요. 메모와 맞는지는 판정 모델이 따로 확인했으니, 받는 사람이 필요한 것을 빨리 찾을 수 있는지, 문서 종류에 맞는지, 읽기 좋은지를 보면 됩니다. 어느 쪽이 글빨인지, 사람이 쓴 기사인지는 알려 드리지 않습니다.',
    context: '작성자는 요청과 아래 메모만 받았습니다.',
    referencePass: true,
    right: (item) => ({ run: memoRun(item), condition: 'F' }),
    groups: [
      { key: 'A-vs-0.4.1', left: (item) => ({ run: memoRun(item), condition: 'A' }), filter: (item) => item.split !== 'dev', max: 99 },
      { key: 'H-vs-0.4.1', left: (item) => ({ run: memoRun(item), condition: 'H' }), filter: (item) => item.split !== 'dev' && item.genre === '보도자료', max: 99 },
    ],
  },
  'draft-blog': {
    cases: 'evals/draft-blog/cases.json',
    pairsFile: 'evals/runs/rating/draft-blog-pairs.json',
    results: 'evals/results/2026-10-29-draft-blog-rating',
    storeKey: 'geulppal-blind-draft-blog',
    title: '글빨 블로그·에세이 블라인드 비교',
    lede: '글쓴이 메모나 한두 줄 설명만 주고 블로그 글·에세이를 써 달라는 요청에 나온 두 결과입니다. 내 이름으로 올릴 글로 어느 쪽이 나은지 골라 주세요. 입력에 없는 경험을 지어냈는지는 판정 모델이 따로 확인했으니, 한 사람의 이야기로 자연스럽게 읽히는지, 말투가 맞는지를 보면 됩니다. 어느 쪽이 글빨인지, 사람이 쓴 원래 글인지는 알려 드리지 않습니다.',
    context: '작성자는 요청과 아래 입력만 받았습니다.',
    referencePass: true,
    right: (item) => ({ run: blogRun(item), condition: 'I' }),
    groups: [
      { key: 'A-vs-0.4.3', left: (item) => ({ run: item.split === 'test' ? '2026-10-29-draft-blog' : blogRun(item), condition: 'A' }), filter: (item) => item.split !== 'dev', max: 99 },
      { key: 'F-vs-0.4.3', left: (item) => ({ run: item.split === 'test' ? '2026-10-29-draft-blog' : blogRun(item), condition: 'F' }), filter: (item) => ['test', 'holdout'].includes(item.split), max: 4 },
      { key: 'H-vs-0.4.3', left: (item) => ({ run: blogRun(item), condition: 'H' }), filter: (item) => item.split !== 'dev' && item.input_kind !== 'brief', max: 6 },
    ],
  },
  'draft-fiction': {
    cases: 'evals/draft-fiction/cases.json',
    pairsFile: 'evals/runs/rating/draft-fiction-pairs.json',
    results: 'evals/results/2026-10-30-draft-fiction-rating',
    storeKey: 'geulppal-blind-draft-fiction',
    title: '글빨 짧은 소설 블라인드 비교',
    lede: '한두 줄 설명이나 설정 메모로 짧은 소설을 써 달라는 요청에 나온 두 결과입니다. 읽고 싶은 소설로 어느 쪽이 나은지 골라 주세요. 조건을 지켰는지는 판정 모델이 따로 봤지만, 이 비교에는 조건을 못 지킨 결과도 섞여 있습니다. 어느 쪽이 글빨인지는 알려 드리지 않습니다.',
    context: '작성자는 요청과 아래 입력만 받았습니다.',
    // 소설은 품질이 주된 기준이라 조건 판정 결과와 상관없이 쌍을 고른다
    anyPass: true,
    right: (item) => ({ run: fictionRun(item), condition: 'I' }),
    groups: [{ key: 'A-vs-0.4.3', left: (item) => ({ run: fictionRun(item), condition: 'A' }), filter: (item) => item.split !== 'dev', max: 99 }],
  },
  'draft-fiction-l1': {
    cases: 'evals/draft-fiction/cases.json',
    pairsFile: 'evals/runs/rating/draft-fiction-l1-pairs.json',
    results: 'evals/results/2026-10-31-draft-fiction-l1-rating',
    storeKey: 'geulppal-blind-draft-fiction-l1',
    title: '글빨 짧은 소설 블라인드 비교 2',
    lede: '같은 소설 요청에 나온 두 결과입니다. 요청에 분량이 있으면 그것도 함께 보고, 읽고 싶은 소설로 어느 쪽이 나은지 골라 주세요. 조건을 못 지킨 결과도 섞여 있습니다. 어느 쪽이 어떤 버전인지는 알려 드리지 않습니다.',
    context: '작성자는 요청과 아래 입력만 받았습니다.',
    anyPass: true,
    right: (item) => ({ run: item.split === 'dev' ? '2026-10-31-draft-fiction-l1' : '2026-10-31-draft-fiction-final2', condition: 'L1' }),
    groups: [{ key: '0.4.3-vs-0.4.6', left: (item) => ({ run: item.split === 'dev' ? '2026-10-30-draft-fiction' : '2026-10-31-draft-fiction-final2', condition: 'I' }), filter: (item) => ['dev', 'holdout2'].includes(item.split), max: 99 }],
  },
}
const SET = SETS[options.set]
if (!SET) {
  console.error(`--set은 ${Object.keys(SETS).join('·')} 중 하나`)
  process.exit(1)
}
const PAIRS_FILE = join(ROOT, SET.pairsFile)
const cases = readJson(join(ROOT, SET.cases))
const byId = Object.fromEntries(cases.map((item) => [item.id, item]))
const GROUPS = SET.groups
const zeroThree = SET.right

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
// 초안 사례의 사람 README(H, 실행하지 않은 기준 조건)는 근거 판정을 하지 않으므로 통과로 본다
const passed = (run, condition, id, rep) =>
  SET.anyPass ||
  (SET.referencePass && recordsOf(run).get(`manifest/${condition}`)?.model === null) || recordsOf(run).get(`judge/meaning/${condition}/${id}-r${rep}`)?.pass === true
// 같은 쌍을 판정 모델이 비교한 기록이 있으면 함께 둔다(사람 판정과 맞춰 보기용)
const modelJudgment = (left, right, id, rep) => {
  for (const run of [right.run, left.run]) {
    // 분량을 뺀 보조 비교(judge/pair-nolength)만 있으면 그것을 둔다
    for (const folder of ['pair', 'pair-nolength']) {
      const record = recordsOf(run).get(`judge/${folder}/${left.condition}-vs-${right.condition}/${id}-r${rep}`)
      if (record?.judged) return { run, result: record.result, judgments: record.judgments.map((j) => j.winner), ...(folder === 'pair' ? {} : { lengthIgnored: true }) }
    }
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
      const left = typeof group.left === 'function' ? group.left(item) : group.left
      const reps = [1, 2].filter((rep) => passed(left.run, left.condition, item.id, rep) && passed(right.run, right.condition, item.id, rep))
      if (!reps.length) continue
      const rep = reps[Math.floor(random() * reps.length)]
      chosen.push({ item, rep, right, left })
    }
    // 그룹 안에서 고를 수가 넘으면 고정된 난수 순서로 자른다
    for (const { item, rep, right, left } of shuffle(chosen, random).slice(0, group.max)) {
      const leftText = latestRun(left.run, left.condition, item.id, rep).output
      const rightText = latestRun(right.run, right.condition, item.id, rep).output
      const swap = seeded(`${group.key}:${item.id}:${rep}`)() < 0.5
      pairs.push({
        group: group.key,
        case: item.id,
        rep,
        variant: item.variant,
        split: item.split,
        sides: swap ? [{ ...right }, { ...left }] : [{ ...left }, { ...right }],
        texts: swap ? [rightText, leftText] : [leftText, rightText],
        model: modelJudgment(left, right, item.id, rep),
      })
    }
  }
  // 그룹이 섞이게 전체 순서를 고정된 난수로 섞고 번호를 붙인다
  const ordered = shuffle(pairs, seeded('order'))
  ordered.forEach((pair, index) => (pair.id = `p${String(index + 1).padStart(2, '0')}`))
  pairs.splice(0, pairs.length, ...ordered)
  mkdirSync(dirname(PAIRS_FILE), { recursive: true })
  writeJson(PAIRS_FILE, { builtAt: new Date().toISOString(), pairs })

  const page = pairs.map((pair) => ({
    id: pair.id,
    request: byId[pair.case].request,
    input: byId[pair.case].input,
    texts: pair.texts,
    ...(byId[pair.case].task === 'draft' ? { kind: 'draft', context: SET.context } : {}),
  }))
  const json = JSON.stringify(page).replace(/</g, '\\u003c')
  const template = readFileSync(join(ROOT, 'scripts/eval/rating-page.html'), 'utf8')
  const html = template
    .replace('{{TITLE}}', SET.title)
    .replace('{{HEADING}}', SET.title)
    .replace('{{LEDE}}', SET.lede)
    .replace("/*STORE_KEY*/'geulppal-blind'", JSON.stringify(SET.storeKey))
    .replace('/*PAIRS*/[]', () => json)
  writeFileSync(options.page, html)
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
  const label = { A: '글빨 없음', B: '글빨 0.2.1', C: '글빨 0.3.0', C2: '글빨 0.3.0', E: '글빨 0.4.0', F: '글빨 0.4.1', I: '글빨 0.4.3', L1: '0.4.6 후보', H: { human: '사람 원문', 'draft-readme': '사람 README', 'draft-memo': '사람 기사', 'draft-blog': '사람 글' }[options.set] }
  const rows = []
  const tally = {}
  for (const pair of pairs) {
    const rating = ratings.find((r) => r.pair === pair.id)
    const pick = rating?.choice
    const winner = pick === 'x' ? pair.sides[0].condition : pick === 'y' ? pair.sides[1].condition : pick ?? null
    const norm = (c) => (c === 'C2' ? 'C' : c)
    const human = winner && ['A', 'B', 'C', 'C2', 'E', 'F', 'I', 'L1', 'H'].includes(winner) ? norm(winner) : winner
    const model = pair.model ? (['tie', 'both_inadequate', 'inconsistent'].includes(pair.model.result) ? pair.model.result : norm(pair.model.result)) : null
    tally[pair.group] ??= {}
    tally[pair.group][human ?? '미평가'] = (tally[pair.group][human ?? '미평가'] ?? 0) + 1
    rows.push({ id: pair.id, group: pair.group, case: pair.case, rep: pair.rep, human, model, note: rating?.note ?? '' })
  }
  const outDir = join(ROOT, SET.results)
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
