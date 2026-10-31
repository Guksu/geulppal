#!/usr/bin/env node
/**
 * 사람이 읽는 사례별 페이지 — 요청·원문·조건별 결과·판정 이유를 사례마다 한 페이지에 모은다.
 *
 *   node scripts/eval/render.mjs --name holdout --title "처음 보는 사례" --cases evals/holdout/cases.json \
 *     --conds A=2026-10-27-holdout,B0=2026-10-27-holdout,B2=2026-10-27-holdout \
 *     --pairs 2026-10-27-holdout/A-vs-B2,2026-10-27-holdout/B0-vs-B2,2026-10-27-holdout/A-vs-B0
 *
 * --split dev|test: 사람이 쓴 글 사례(evals/human/cases.json)에서 한쪽만 그린다.
 *
 * evals/results/cases/<name>/README.md(목록)와 <사례 id>.md를 쓴다. 실행·판정 기록(evals/results/<실행>/records.json)만 읽고 모델은 부르지 않는다.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, readJson } from './lib/common.mjs'
import { openRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
if (!options.name || !options.cases || !options.conds) {
  console.error('사용법: render.mjs --name <이름> --title <제목> --cases <사례 파일> --conds A=<실행>,B0=<실행> [--pairs <실행>/<왼쪽>-vs-<오른쪽>,…] [--split dev|test] [--intro <설명>]')
  process.exit(1)
}

const LABELS = { A: '글빨 없음', B0: '글빨 0.1.0', B1: '글빨 0.2.0-r1', B2: '글빨 0.2.0', B: '글빨 0.2.1', C1: '글빨 0.3.0-r1', C2: '글빨 0.3.0-r2', C: '글빨 0.3.0', D1: '0.3.1 후보', D: '0.3.1 후보', E1: '0.4.0-r1 후보', E2: '0.4.0-r2 후보', E: '글빨 0.4.0', F1: '0.4.1-r1 후보', F: '글빨 0.4.1', G1: '0.4.2-r1 후보', G: '0.4.2 후보', I1: '0.4.3-r1 후보', I: '글빨 0.4.3', J1: '0.4.4-r1 후보', J: '0.4.4 후보', K1: '0.4.5-r1 후보', L1: '0.4.6-r1 후보', L: '0.4.6 후보', H: '사람 원문' }
const TASKS = { rewrite: '수정', draft: '새 글 작성', diagnose: '진단만', summarize: '요약', 'noop-check': '고칠 게 없으면 그대로' }
const LANGUAGES = { ko: '한국어', en: '영어', 'ko-en': '한영 혼용' }
const label = (condition) => LABELS[condition] ?? condition
const SHORT = { A: '없음', B0: '0.1.0', B1: '0.2.0-r1', B2: '0.2.0', B: '0.2.1', C1: '0.3.0-r1', C2: '0.3.0-r2', C: '0.3.0', D1: '0.3.1후보', D: '0.3.1후보', H: '사람', E1: '0.4.0-r1', E2: '0.4.0-r2', E: '0.4.0', F1: '0.4.1-r1', F: '0.4.1', G1: '0.4.2-r1', G: '0.4.2후보', I1: '0.4.3-r1', I: '0.4.3', J1: '0.4.4-r1', J: '0.4.4후보', K1: '0.4.5-r1', L1: '0.4.6-r1', L: '0.4.6후보' }
const short = (condition) => SHORT[condition] ?? condition

const cases = readJson(join(ROOT, options.cases)).filter((item) => !options.split || item.split === options.split)
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
const meaningOf = (run, condition, id, rep) => recordsOf(run).get(`judge/meaning/${condition}/${id}-r${rep}`)
const pairOf = (pair, id, rep) => recordsOf(pair.run).get(`judge/pair/${pair.name}/${id}-r${rep}`)
const repsOf = (id) => [...new Set(conds.flatMap(({ run, condition }) => {
  const pattern = new RegExp(`^${id}-r(\\d+)-a\\d+$`)
  return recordsOf(run).names(`runs/${condition}`).map((name) => name.match(pattern)).filter(Boolean).map((match) => Number(match[1]))
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

// 원문 없이 쓴 사례(작업 폴더 자료가 있는 사례)는 의미 보존 대신 근거 판정을 한다
const isDraftCase = (item) => Boolean(item.fixture) || ['memo', 'fiction'].includes(item.variant)
const drafting = cases.some(isDraftCase)
// 소설은 지어낸 이야기라 근거 대신 요청 조건을 판정한다
const CHECK = cases.length && cases.every((item) => item.variant === 'fiction') ? '조건 판정' : drafting ? '근거 판정' : '의미 보존'
const meaningBadge = (record, meaning) => {
  if (!record) return '실행 기록 없음'
  if (record.status !== 'ok') return `✗ 실행 실패(${record.status})`
  if (!meaning?.judged) return '판정 없음'
  return meaning.pass ? `○ ${CHECK} 통과` : `✗ ${CHECK} 실패`
}
const failReasons = (meaning) => [
  ...(meaning?.judge?.answer?.fail_reasons ?? []),
  ...(meaning?.exact?.applicable !== false && meaning?.exact?.missing?.length ? [`글자 그대로 남아야 할 문자열이 빠짐: ${meaning.exact.missing.map((s) => `\`${s}\``).join(', ')}`] : []),
  ...(meaning?.length && !meaning.length.pass ? [`분량 ${meaning.length.chars}자(공백 제외)가 요청 범위 ${meaning.length.min}~${meaning.length.max}자를 벗어남`] : []),
]
const pairResult = (pair, record) => {
  if (!record) return '-'
  if (!record.judged) return `비교 안 함(${CHECK} 실패)`
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
    ...(isDraftCase(item)
      ? ['## 메모', '', item.input ? quote(item.input) : '> (없음)', ...(item.fixture ? ['', `작성 모델은 작업 폴더에서 \`${item.fixture.repo}\` 커밋 \`${item.fixture.commit.slice(0, 7)}\`의 코드(${item.fixture.paths.map((path) => `\`${path}\``).join(', ')}, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.`] : [])]
      : ['## 원문', '', quote(item.input)]),
    '',
    '<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>',
    '',
    isDraftCase(item) ? '**다뤄야 할 내용** (통과 조건에는 넣지 않음)' : '**남아야 할 것**',
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
      if (reasons.length) lines.push(`**${CHECK} 실패 이유(판정 모델)**`, '', ...reasons.map((reason) => `- ${cell(reason)}`), '')
    })
  }
  const pairCells = []
  if (pairs.length) {
    lines.push('## 품질 비교', '', `두 결과가 모두 ${CHECK}을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.`, '', '| 회차 | 비교 | 결과 |', '|---|---|---|')
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
  `사례 이름을 누르면 요청, ${drafting ? '메모' : '원문'}, 조건별 결과, 판정 이유를 볼 수 있습니다. ${CHECK} 칸은 조건마다 통과한 회차 수입니다(${conds.map(({ condition }) => label(condition)).join(' · ')}).`,
  '',
  `| 사례 | 작업 | ${CHECK} 통과<br>(${conds.map(({ condition }) => short(condition)).join(' · ')}) |${pairs.map((pair) => ` ${short(pair.left)} vs ${short(pair.right)} |`).join('')}`,
  `|---|---|---|${pairs.map(() => '---|').join('')}`,
  ...index.map(({ item, meaningCells, pairCells }) =>
    `| [\`${item.id}\`](${item.id}.md)<br>${cell(item.genre)} | ${TASKS[item.task] ?? item.task} | ${meaningCells.map((c) => `${c.pass}/${c.total}`).join(' · ')} |${pairCells.map((c) => ` ${c} |`).join('')}`,
  ),
  ...(pairs.length ? ['', '품질 비교 칸은 회차별 결과입니다. 이름이 적힌 쪽이 우세, `같음`은 차이 없음, `엇갈림`은 순서를 바꾸면 판정이 바뀐 경우, `제외`는 한쪽 이상이 ' + CHECK + '에 실패해 비교하지 않은 경우입니다.'] : []),
  '',
  '자동으로 만든 페이지입니다. 판정은 모두 모델(`claude-opus-5-5`)이 했고 사람의 평가가 아닙니다.',
]
writeFileSync(join(outDir, 'README.md'), `${header.join('\n')}\n`)
console.log(`${options.name}: 사례 ${cases.length}개 → evals/results/cases/${options.name}/`)
