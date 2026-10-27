#!/usr/bin/env node
/**
 * 사람이 읽는 사례별 페이지 — 요청·원문·조건별 결과·판정 이유를 사례마다 한 페이지에 모은다.
 *
 *   node scripts/eval/render.mjs --name holdout --title "처음 보는 사례" --cases evals/holdout/cases.json \
 *     --conds A=2026-10-27-holdout,B0=2026-10-27-holdout,B2=2026-10-27-holdout \
 *     --pairs 2026-10-27-holdout/A-vs-B2,2026-10-27-holdout/B0-vs-B2,2026-10-27-holdout/A-vs-B0
 *
 * evals/results/cases/<name>/README.md(목록)와 <사례 id>.md를 쓴다. 실행·판정 기록(evals/results/<실행>/)만 읽고 모델은 부르지 않는다.
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, readJson } from './lib/common.mjs'

const options = parseArgs(process.argv.slice(2), {})
if (!options.name || !options.cases || !options.conds) {
  console.error('사용법: render.mjs --name <이름> --title <제목> --cases <사례 파일> --conds A=<실행>,B0=<실행> [--pairs <실행>/<왼쪽>-vs-<오른쪽>,…] [--intro <설명>]')
  process.exit(1)
}

const LABELS = { A: '글빨 없음', B0: '글빨 0.1.0', B1: '글빨 0.2.0-r1', B2: '글빨 0.2.0' }
const TASKS = { rewrite: '수정', draft: '새 글 작성', diagnose: '진단만', summarize: '요약', 'noop-check': '고칠 게 없으면 그대로' }
const LANGUAGES = { ko: '한국어', en: '영어', 'ko-en': '한영 혼용' }
const label = (condition) => LABELS[condition] ?? condition
const SHORT = { A: '없음', B0: '0.1.0', B1: '0.2.0-r1', B2: '0.2.0' }
const short = (condition) => SHORT[condition] ?? condition

const cases = readJson(join(ROOT, options.cases))
const conds = String(options.conds).split(',').map((pair) => {
  const [condition, run] = pair.split('=')
  return { condition, run }
})
const pairs = options.pairs
  ? String(options.pairs).split(',').map((spec) => {
      const [run, name] = spec.split('/')
      const [left, right] = name.split('-vs-')
      return { run, name, left, right }
    })
  : []
const outDir = join(ROOT, 'evals/results/cases', options.name)
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const resultsDir = (run) => join(ROOT, 'evals/results', run)
const latestRun = (run, condition, id, rep) => {
  const folder = join(resultsDir(run), 'runs', condition)
  if (!existsSync(folder)) return null
  return readdirSync(folder)
    .filter((name) => name.startsWith(`${id}-r${rep}-a`) && name.endsWith('.json'))
    .map((name) => readJson(join(folder, name)))
    .sort((a, b) => b.attempt - a.attempt)[0] ?? null
}
const readIf = (file) => (existsSync(file) ? readJson(file) : null)
const meaningOf = (run, condition, id, rep) => readIf(join(resultsDir(run), 'judge/meaning', condition, `${id}-r${rep}.json`))
const pairOf = (pair, id, rep) => readIf(join(resultsDir(pair.run), 'judge/pair', pair.name, `${id}-r${rep}.json`))
const repsOf = (id) => [...new Set(conds.flatMap(({ run, condition }) => {
  const folder = join(resultsDir(run), 'runs', condition)
  const pattern = new RegExp(`^${id}-r(\\d+)-a\\d+\\.json$`)
  return existsSync(folder) ? readdirSync(folder).map((name) => name.match(pattern)).filter(Boolean).map((match) => Number(match[1])) : []
}))].sort((a, b) => a - b)

// 원문·결과는 인용 블록으로 보여 준다 — 코드 블록과 달리 긴 줄이 화면 폭에서 줄바꿈된다.
// 마크다운 링크는 링크로 만들지 않고 [텍스트](대상)을 그대로 보인다. 링크 대상이 바뀌었는지 눈으로 확인할 수 있게 하고, 페이지에 깨진 링크를 만들지 않는다
const showLinks = (text) => {
  let fenced = false
  return text.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced
    return fenced ? line : line.replace(/(^|[^\\])\[([^\]\n]*)\]\(/g, '$1\\[$2](')
  }).join('\n')
}
const quote = (text) => (text.trim() ? showLinks(text.trimEnd()).split('\n').map((line) => (line ? `> ${line}` : '>')).join('\n') : '> (빈 출력)')
const cell = (text) => String(text).replace(/\|/g, '\\|').replace(/\n+/g, ' ')

const meaningBadge = (record, meaning) => {
  if (!record) return '실행 기록 없음'
  if (record.status !== 'ok') return `✗ 실행 실패(${record.status})`
  if (!meaning?.judged) return '판정 없음'
  return meaning.pass ? '○ 의미 보존 통과' : '✗ 의미 보존 실패'
}
const failReasons = (meaning) => [
  ...(meaning?.judge?.answer?.fail_reasons ?? []),
  ...(meaning?.exact?.applicable !== false && meaning?.exact?.missing?.length ? [`글자 그대로 남아야 할 문자열이 빠짐: ${meaning.exact.missing.map((s) => `\`${s}\``).join(', ')}`] : []),
]
const pairResult = (pair, record) => {
  if (!record) return '-'
  if (!record.judged) return '비교 안 함(의미 보존 실패)'
  return { [pair.left]: `${label(pair.left)} 우세`, [pair.right]: `${label(pair.right)} 우세`, tie: '차이 없음', both_inadequate: '둘 다 부적절', inconsistent: '순서를 바꾸면 판정이 바뀜' }[record.result] ?? record.result
}

const index = []
for (const item of cases) {
  const reps = repsOf(item.id)
  const lines = [
    `# \`${item.id}\``,
    '',
    `[← ${options.title ?? options.name} 목록](README.md) · ${TASKS[item.task] ?? item.task} · ${item.genre} · ${LANGUAGES[item.language] ?? item.language}`,
    '',
    '## 요청',
    '',
    quote(item.request),
    '',
    '## 원문',
    '',
    quote(item.input),
    '',
    '<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>',
    '',
    '**남아야 할 것**',
    '',
    ...item.must_preserve.map((line) => `- ${line}`),
    '',
    '**있으면 안 되는 변경**',
    '',
    ...item.must_not.map((line) => `- ${line}`),
    ...(item.exact?.length ? ['', `**글자 그대로 남아야 할 문자열**: ${item.exact.map((s) => `\`${s}\``).join(', ')}`] : []),
    ...(item.notes ? ['', `**메모**: ${item.notes}`] : []),
    '',
    '</details>',
    '',
  ]
  const meaningCells = conds.map(() => ({ pass: 0, total: 0 }))
  for (const rep of reps) {
    lines.push(`## ${rep}회차`, '')
    conds.forEach(({ condition, run }, i) => {
      const record = latestRun(run, condition, item.id, rep)
      const meaning = meaningOf(run, condition, item.id, rep)
      if (record) meaningCells[i].total++
      if (meaning?.pass) meaningCells[i].pass++
      lines.push(`### ${label(condition)} — ${meaningBadge(record, meaning)}`, '', record ? quote(record.output) : '> (실행 기록 없음)', '')
      const reasons = meaning?.judged && !meaning.pass ? failReasons(meaning) : []
      if (reasons.length) lines.push('**의미 보존 실패 이유(판정 모델)**', '', ...reasons.map((reason) => `- ${cell(reason)}`), '')
    })
  }
  const pairCells = []
  if (pairs.length) {
    lines.push('## 품질 비교', '', '두 결과가 모두 의미 보존을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.', '', '| 회차 | 비교 | 결과 |', '|---|---|---|')
    const details = []
    for (const pair of pairs) {
      const results = []
      for (const rep of reps) {
        const record = pairOf(pair, item.id, rep)
        const result = pairResult(pair, record)
        results.push(!record ? '-' : !record.judged ? '제외' : ({ tie: '같음', both_inadequate: '둘 다 부적절', inconsistent: '엇갈림' }[record.result] ?? short(record.result)))
        lines.push(`| ${rep} | ${label(pair.left)} vs ${label(pair.right)} | ${result} |`)
        if (record?.judged) {
          details.push(
            `<details><summary>${rep}회차 ${label(pair.left)} vs ${label(pair.right)}: 판정 이유</summary>`,
            '',
            ...record.judgments.flatMap((judgment, order) => [
              `**${order + 1}번째 판정** (결과 X = ${label(judgment.X)}, 결과 Y = ${label(judgment.Y)}) → ${judgment.winner === 'tie' ? '차이 없음' : judgment.winner === 'both_inadequate' ? '둘 다 부적절' : `${label(judgment.winner)} 우세`}`,
              '',
              cell(judgment.answer?.reason ?? ''),
              '',
            ]),
            '</details>',
            '',
          )
        }
      }
      pairCells.push(results.join(' · '))
    }
    lines.push('', ...details)
  }
  writeFileSync(join(outDir, `${item.id}.md`), `${lines.join('\n').replace(/\n{3,}/g, '\n\n')}\n`)
  index.push({ item, meaningCells, pairCells })
}

const header = [
  `# 사례별 결과: ${options.title ?? options.name}`,
  '',
  '[← 벤치마크 개요](../../README.md)',
  '',
  ...(options.intro ? [String(options.intro), ''] : []),
  `사례 이름을 누르면 요청, 원문, 조건별 결과, 판정 이유를 볼 수 있습니다. 의미 보존 칸은 조건마다 통과한 회차 수입니다(${conds.map(({ condition }) => label(condition)).join(' · ')}).`,
  '',
  `| 사례 | 작업 | 의미 보존 통과<br>(${conds.map(({ condition }) => short(condition)).join(' · ')}) |${pairs.map((pair) => ` ${short(pair.left)} vs ${short(pair.right)} |`).join('')}`,
  `|---|---|---|${pairs.map(() => '---|').join('')}`,
  ...index.map(({ item, meaningCells, pairCells }) =>
    `| [\`${item.id}\`](${item.id}.md)<br>${cell(item.genre)} | ${TASKS[item.task] ?? item.task} | ${meaningCells.map((c) => `${c.pass}/${c.total}`).join(' · ')} |${pairCells.map((c) => ` ${c} |`).join('')}`,
  ),
  ...(pairs.length ? ['', '품질 비교 칸은 회차별 결과입니다. 이름이 적힌 쪽이 우세, `같음`은 차이 없음, `엇갈림`은 순서를 바꾸면 판정이 바뀐 경우, `제외`는 한쪽 이상이 의미 보존에 실패해 비교하지 않은 경우입니다.'] : []),
  '',
  '자동으로 만든 페이지입니다. 판정은 모두 모델(`claude-opus-5-5`)이 했고 사람의 평가가 아닙니다.',
]
writeFileSync(join(outDir, 'README.md'), `${header.join('\n')}\n`)
console.log(`${options.name}: 사례 ${cases.length}개 → evals/results/cases/${options.name}/`)
