#!/usr/bin/env node
/**
 * 집계 — 결과 폴더 하나의 실행·판정 기록을 표로 만든다.
 *
 *   node scripts/eval/report.mjs --out <이름>
 *
 * evals/results/<이름>/report.md와 summary.json을 쓴다. 같은 사례의 반복 실행과 순서를 바꾼 판정은 새 사례로 세지 않는다.
 * 사례 단위 결과는 회차별 쌍 결과를 모은 것이다.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, writeJson } from './lib/common.mjs'
import { openRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
if (!options.out) {
  console.error('사용법: report.mjs --out <이름>')
  process.exit(1)
}
const dir = join(ROOT, 'evals/results', options.out)
const records = openRecords(options.out)
const listJson = (folder) => records.list(folder)
const median = (values) => {
  const sorted = values.filter((v) => typeof v === 'number').sort((a, b) => a - b)
  if (sorted.length === 0) return null
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}
const sum = (values) => (values.some((v) => typeof v !== 'number') ? null : values.reduce((a, b) => a + b, 0))
const fmt = (value, digits = 0) => (value === null || value === undefined ? '알 수 없음' : Number(value).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits }))

const manifest = { conditions: Object.fromEntries(listJson('manifest').map((spec) => [spec.condition, spec])) }
const conditions = Object.keys(manifest.conditions).filter((condition) => records.names(`runs/${condition}`).length > 0).sort()
const summary = { name: options.out, conditions: {}, pairs: {} }
const lines = [`# 결과: ${options.out}`, '', '자동 생성 파일이다(`node scripts/eval/report.mjs --out ' + options.out + '`). 해석은 따로 쓴 보고서에 있다.', '']

// 조건
lines.push('## 조건', '', '| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |', '|---|---|---|---|---|---|')
for (const condition of conditions) {
  const spec = manifest.conditions[condition]
  lines.push(`| ${condition} | ${spec.skill ? `\`${spec.skill.path}\`` : '없음'} | ${spec.skill ? spec.skill.treeSha256.slice(0, 12) : '-'} | ${spec.model} | ${spec.effort} | ${spec.cli} |`)
}
lines.push('')

// 실행
lines.push('## 실행', '', '모든 시도를 센다. 재시도는 원래 시도와 따로 센다.', '', '| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |', '|---|---|---|---|---|---|---|---|---|')
const latestByCondition = {}
for (const condition of conditions) {
  const all = listJson(`runs/${condition}`)
  const latest = new Map()
  for (const record of all) {
    const key = `${record.id}-r${record.rep}`
    if (!latest.has(key) || latest.get(key).attempt < record.attempt) latest.set(key, record)
  }
  latestByCondition[condition] = [...latest.values()]
  // 사람 원문처럼 실행하지 않은 기준 조건(human.mjs reference)은 실행 지표가 없다
  if (manifest.conditions[condition].model === null) {
    lines.push(`| ${condition} | 실행 안 함(기준 원문 ${latest.size}건) | - | - | - | - | - | - | - |`)
    summary.conditions[condition] = { reference: true, records: latest.size }
    continue
  }
  const failures = all.filter((r) => r.status !== 'ok')
  const failureKinds = failures.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {})
  const withSkill = Boolean(manifest.conditions[condition].skill)
  const injected = all.filter((r) => r.skill?.skillBodyInjected && r.skill?.skillBodyMatchesInstalled !== false).length
  const refs = all.filter((r) => (r.skill?.referenceReads ?? []).length > 0).length
  const denials = sum(all.map((r) => r.permissionDenials.length))
  const fresh = all.filter((r) => r.sessionIdIsNew).length
  lines.push(`| ${condition} | ${all.length} | ${all.length - failures.length} | ${failures.length ? Object.entries(failureKinds).map(([k, v]) => `${k} ${v}`).join(', ') : '없음'} | ${all.filter((r) => r.attempt > 1).length} | ${withSkill ? `${injected}/${all.length}` : `해당 없음 (geulppal 목록 노출 ${all.filter((r) => r.skill?.listedGeulppal).length})`} | ${withSkill ? `${refs}/${all.length}` : '-'} | ${denials} | ${fresh}/${all.length} |`)
  summary.conditions[condition] = { attempts: all.length, failures: failureKinds, retries: all.filter((r) => r.attempt > 1).length, skillInjected: injected, referenceReads: refs }
}
const promptHashes = new Set(conditions.flatMap((c) => latestByCondition[c].map((r) => r.skill?.systemPromptHash)).filter(Boolean))
lines.push('', `시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: ${promptHashes.size}개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.`, '')

// 정확성
const meaningByCondition = {}
// 원문 없이 쓴 사례(작업 폴더 자료가 있는 사례)는 의미 보존 대신 근거 판정(evals/judge/draft-claims.md)을 한다
const drafting = conditions.some((condition) => records.list(`judge/meaning/${condition}`).some((judged) => ['draft-claims', 'draft-memo-claims', 'draft-fiction-check'].includes(judged.judge?.kind)))
const fiction = Object.values(manifest.conditions).some((spec) => String(spec.casesFile ?? '').includes('draft-fiction'))
const CHECK = fiction ? '조건 판정' : drafting ? '근거 판정' : '의미 보존'
lines.push(`## 정확성: ${CHECK}`, '', drafting
  ? (fiction ? '원문 없이 쓴 소설이다. 판정 모델이 요청한 조건(시점, 형식, 인물, 배경, 사건 순서, 결말)과 설정을 지켰는지 보고, 요청에 분량이 있으면 스크립트가 공백을 뺀 글자 수를 센다. 하나라도 어기면 실패다. 지어낸 장면·대사·감정은 문제가 아니다. 분모는 성공한 실행 중 판정한 실행이다.' : '원문 없이 쓴 글이다. 판정 모델이 작성자가 받은 자료(작업 폴더의 코드나 메모)를 읽고 결과의 구체적인 주장마다 근거를 찾는다. 근거와 어긋나는 주장(contradicted)이나 근거를 찾지 못한 구체적 주장(unsupported)이 하나라도 있으면 실패다. 근거를 찾지 못했다는 것이 틀렸다는 뜻은 아니다. 분모는 성공한 실행 중 판정한 실행이다.')
  : '판정 모델의 의미 보존 검사와 문자열 검사(`exact`)를 모두 통과해야 통과다. 분모는 성공한 실행 중 판정한 실행이다.', '', '| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |', '|---|---|---|---|---|---|---|')
for (const condition of conditions) {
  const judged = listJson(`judge/meaning/${condition}`)
  meaningByCondition[condition] = Object.fromEntries(judged.map((m) => [`${m.id}-r${m.rep}`, m]))
  const done = judged.filter((m) => m.judged)
  const pass = done.filter((m) => m.pass).length
  const exactMiss = done.filter((m) => !m.exact?.pass).length
  const notJudged = judged.filter((m) => m.runStatus === 'ok' && !m.judged).length
  const excluded = judged.filter((m) => m.runStatus !== 'ok').length
  lines.push(`| ${condition} | ${done.length} | ${pass} | ${done.length - pass} | ${exactMiss} | ${notJudged} | ${excluded} |`)
  summary.conditions[condition].meaning = { judged: done.length, pass, fail: done.length - pass, exactMissing: exactMiss, notJudged, excluded }
}
// 같은 결과를 두 번 판정했으면 일치도와 엄격 기준(둘 중 하나라도 실패면 실패)을 함께 적는다
if (records.dirs('judge/meaning-pass2').length > 0) {
  lines.push('', '같은 결과를 판정 모델로 한 번 더 판정했다(2차). 품질 비교 대상은 1차 판정으로 정했다.', '', '| 조건 | 두 번 판정한 실행 | 판정 일치 | 1차 통과 | 2차 통과 | 둘 다 통과(엄격) |', '|---|---|---|---|---|---|')
  for (const condition of conditions) {
    const second = Object.fromEntries(listJson(`judge/meaning-pass2/${condition}`).map((m) => [`${m.id}-r${m.rep}`, m]))
    const both = Object.entries(meaningByCondition[condition]).filter(([key, m]) => m.judged && second[key]?.judged)
    const agree = both.filter(([key, m]) => m.pass === second[key].pass).length
    const strict = both.filter(([key, m]) => m.pass && second[key].pass).length
    lines.push(`| ${condition} | ${both.length} | ${agree} | ${both.filter(([, m]) => m.pass).length} | ${both.filter(([key]) => second[key].pass).length} | ${strict} |`)
    summary.conditions[condition].meaningPass2 = { judgedTwice: both.length, agree, strict }
  }
}
lines.push('')

// 사례별 정확성
const caseIds = [...new Set(conditions.flatMap((c) => latestByCondition[c].map((r) => r.id)))].sort()
lines.push('### 사례별', '', `| 사례 | ${conditions.join(' | ')} |`, `|---|${conditions.map(() => '---').join('|')}|`)
for (const id of caseIds) {
  const cells = conditions.map((condition) => {
    const runs = latestByCondition[condition].filter((r) => r.id === id).sort((a, b) => a.rep - b.rep)
    return runs.map((r) => {
      const m = meaningByCondition[condition][`${r.id}-r${r.rep}`]
      if (r.status !== 'ok') return `✗실행(${r.status})`
      if (!m?.judged) return '?'
      return m.pass ? '○' : '✗'
    }).join(' ') || '-'
  })
  lines.push(`| \`${id}\` | ${cells.join(' | ')} |`)
}
lines.push('', '○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.', '')

// 실패 이유
lines.push(`### ${CHECK} 실패`, '')
let anyFail = false
for (const condition of conditions) {
  for (const m of Object.values(meaningByCondition[condition]).filter((m) => m.judged && !m.pass)) {
    anyFail = true
    const reasons = [...(m.judge.answer?.fail_reasons ?? []), ...(m.exact?.missing?.length ? [`문자열 누락: ${m.exact.missing.map((s) => `\`${s}\``).join(', ')}`] : [])]
    lines.push(`- ${condition} \`${m.id}\` r${m.rep}: ${reasons.join(' / ').replace(/\n/g, ' ')}`)
  }
}
if (!anyFail) lines.push('- 없음')
lines.push('')

// 품질
const pairDirs = records.dirs('judge/pair')
if (pairDirs.length) lines.push('## 글의 품질: 쌍 비교', '', `두 결과가 모두 ${CHECK}을 통과한 쌍만 비교했다${drafting ? '(실행하지 않은 사람 글 H는 근거 판정 없이 넣었다)' : ''}. 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.`, '')
for (const pairDir of pairDirs) {
  const pairs = listJson(`judge/pair/${pairDir}`)
  const [left, right] = pairDir.split('-vs-')
  const judged = pairs.filter((p) => p.judged)
  const count = (value) => judged.filter((p) => p.result === value).length
  const reused = pairs.some((p) => p.reusedBaseline)
  const consistentRate = judged.length ? judged.filter((p) => p.consistent).length : 0
  const flips = judged.filter((p) => !p.consistent).length
  summary.pairs[pairDir] = { total: pairs.length, judged: judged.length, excluded: pairs.length - judged.length, leftWins: count(left), rightWins: count(right), tie: count('tie'), bothInadequate: count('both_inadequate'), inconsistent: count('inconsistent') }
  lines.push(`### ${left} vs ${right}${reused ? ' (기준선 재사용)' : ''}`, '')
  if (reused) lines.push(`재사용: ${[...new Set(pairs.flatMap((p) => [p.left, p.right]).filter((side) => side.from !== options.out).map((side) => `${side.condition} ← \`${side.from}\``))].join(', ')}`, '')
  lines.push(`쌍(사례 × 회차) ${pairs.length}개 중 비교 ${judged.length}개, 제외 ${pairs.length - judged.length}개(한쪽 이상 ${CHECK} 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: ${consistentRate}/${judged.length}.`, '')
  lines.push(`| 판정 | 쌍 수 |`, '|---|---|', `| ${left} 우세 | ${count(left)} |`, `| ${right} 우세 | ${count(right)} |`, `| 차이 없음 | ${count('tie')} |`, `| 둘 다 부적절 | ${count('both_inadequate')} |`, `| 순서 불일치 | ${flips} |`, '')
  // 사례 단위
  lines.push('사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):', '', '| 사례 | 회차별 결과 |', '|---|---|')
  const byCase = {}
  for (const pair of pairs) (byCase[pair.id] ??= []).push(pair)
  const caseOutcome = { [left]: 0, [right]: 0, mixed: 0, none: 0 }
  for (const [id, list] of Object.entries(byCase).sort()) {
    const cells = list.sort((a, b) => a.rep - b.rep).map((p) => (p.judged ? ({ [left]: `${left} 우세`, [right]: `${right} 우세`, tie: '차이 없음', both_inadequate: '둘 다 부적절', inconsistent: '순서 불일치' }[p.result] ?? p.result) : '제외'))
    lines.push(`| \`${id}\` | ${cells.join(' · ')} |`)
    const decided = list.filter((p) => p.judged && [left, right].includes(p.result)).map((p) => p.result)
    if (decided.length === 0) caseOutcome.none++
    else if (decided.every((r) => r === left)) caseOutcome[left]++
    else if (decided.every((r) => r === right)) caseOutcome[right]++
    else caseOutcome.mixed++
  }
  summary.pairs[pairDir].cases = caseOutcome
  lines.push('', `사례 ${Object.keys(byCase).length}개: 승패가 난 회차가 모두 ${left} 쪽 ${caseOutcome[left]}개, 모두 ${right} 쪽 ${caseOutcome[right]}개, 엇갈림 ${caseOutcome.mixed}개, 승패 없음(차이 없음·불일치·제외만) ${caseOutcome.none}개.`, '')
}

// 시간·비용
lines.push('## 시간·토큰·비용', '', 'CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.', '', '| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |', '|---|---|---|---|---|---|---|')
for (const condition of conditions.filter((c) => manifest.conditions[c].model !== null)) {
  const all = listJson(`runs/${condition}`)
  const inputs = all.map((r) => (r.usage.inputTokens === null ? null : r.usage.inputTokens + (r.usage.cacheCreationInputTokens ?? 0) + (r.usage.cacheReadInputTokens ?? 0)))
  const costs = all.map((r) => r.costUsd)
  lines.push(`| ${condition} | ${all.length} | ${fmt(median(all.map((r) => r.durationMs)) / 1000, 1)} | ${fmt(median(inputs))} | ${fmt(median(all.map((r) => r.usage.outputTokens)))} | ${fmt(median(all.map((r) => r.numTurns)))} | ${fmt(sum(costs.filter((c) => c !== null)), 3)}${costs.some((c) => c === null) ? ` (${costs.filter((c) => c === null).length}건 알 수 없음)` : ''} |`)
  summary.conditions[condition].time = { medianMs: median(all.map((r) => r.durationMs)), medianInput: median(inputs), medianOutput: median(all.map((r) => r.usage.outputTokens)), costUsd: sum(costs.filter((c) => c !== null)) }
}
const judgeCalls = [
  ...conditions.flatMap((c) => listJson(`judge/meaning/${c}`).flatMap((m) => m.judge?.attempts ?? [])),
  ...pairDirs.flatMap((d) => listJson(`judge/pair/${d}`).flatMap((p) => (p.judgments ?? []).flatMap((j) => j.attempts ?? []))),
]
lines.push('', `판정 호출: ${judgeCalls.length}회(재시도 포함), 비용 합 ${fmt(sum(judgeCalls.map((a) => a.costUsd).filter((c) => c !== null)), 3)} USD.`, '')
summary.judgeCalls = judgeCalls.length

writeFileSync(join(dir, 'report.md'), `${lines.join('\n')}\n`)
writeJson(join(dir, 'summary.json'), summary)
console.log(lines.join('\n'))
