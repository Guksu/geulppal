/**
 * 한국어 자연스러움 평가에서 판정 스크립트·사례 생성·테스트가 함께 쓰는 순수 함수.
 * 모델을 부르지 않는다.
 */
import { block } from './common.mjs'

// 다듬기 요청. 개발 답변과 일상 질문의 답변에 함께 쓴다.
// 2026-11-03까지 만든 다듬기 사례(polish-cases.json, polish-holdout-cases.json, polish-holdout2-cases.json)는 이전 요청 문구(LEGACY_POLISH_REQUEST)를 그대로 둔다
export const POLISH_REQUEST = '아래 답변을 내용은 그대로 두고 한국어로 자연스럽게 다듬어 줘. 다듬은 글만 줘.'
export const LEGACY_POLISH_REQUEST = '아래 글은 개발 작업 중에 받은 답변이야. 내용은 그대로 두고 한국어로 자연스럽게 다듬어 줘. 다듬은 글만 줘.'

/** 질문에 답한 결과(record)와 원래 사례(base)로 다듬기 사례를 만든다. 독자(reader)는 그대로 옮긴다 */
export const toPolishCase = (record, base, { from, condition }) => ({
  id: `${record.id}-polish`,
  task: 'rewrite',
  variant: 'polish',
  genre: '답변 다듬기',
  language: 'ko',
  split: base.split,
  source: null,
  origin: `generated:${from}/runs/${condition}/${record.id}-r${record.rep}`,
  overlaps_skill_examples: false,
  request: POLISH_REQUEST,
  input: record.output.trim(),
  ...(base.reader ? { reader: base.reader } : {}),
  must_preserve: ['답변의 사실, 코드 이름, 수치, 조건, 확실성 표시(추측·가능성), 원래 답변에 있던 제안·약속을 그대로 둔다'],
  must_not: ['답변에 없는 사실·권고·평가·마무리 안내를 보태기', '코드 블록·식별자·경로 바꾸기'],
  exact: [],
  notes: `글빨 없는 Claude(${condition})가 쓴 답변을 다듬게 한다. 의미 보존 판정(meaning.md)과 멈칫할 곳 판정(korean-natural.md)을 함께 본다.`,
})

/**
 * 멈칫할 곳 판정(korean-natural.md)에 넘기는 프롬프트.
 * 질문은 질문에 답하는 사례(task: answer)에서만 보여 준다. 다듬기 사례의 input은 원문이라 보여 주지 않는다.
 * 독자(reader)는 사례 종류와 상관없이 있으면 넘긴다.
 */
export const naturalPrompt = (item, output) => {
  const question = item.task === 'answer' && item.input ? [block('질문', item.input)] : []
  const reader = item.reader ? [block('독자', item.reader)] : []
  return [block('요청', item.request), ...question, ...reader, block('글', output)].join('\n\n')
}

/** 조건의 회차별 마지막 시도 */
const latestRuns = (records, condition) => {
  const byKey = new Map()
  for (const record of records.list(`runs/${condition}`)) {
    const key = `${record.id}-r${record.rep}`
    if (!byKey.has(key) || byKey.get(key).attempt < record.attempt) byKey.set(key, record)
  }
  return [...byKey.values()]
}

/**
 * 다듬기 평가 집계. 원시 기록(records.json)만으로 다시 센다.
 * - 원문 표시: 다듬기 입력이 된 답변(1회차)에서 판정 모델이 표시한 곳의 수
 * - 그대로 남은 경우: 원문에서 표시한 문자열이 다듬은 결과에 글자 그대로 남은 횟수. 분모는 원문 표시 수 × 다듬기 회차 수다.
 *   표현이 사라졌다고 그 자리가 자연스러워졌다는 뜻은 아니다
 * - 최종 글 표시: 다듬은 결과를 다시 판정했을 때 표시한 곳의 합(같은 표현은 결과마다 한 번)
 * - 뜻 보존: 의미 보존 판정을 통과한 결과 수 / 판정한 결과 수
 */
export const polishStats = (writing, polish, conditions) => {
  const originals = new Map()
  for (const record of writing.list('judge/natural/A')) if (record.rep === 1 && record.judged) originals.set(record.id, record.spans)
  return Object.fromEntries(conditions.map((condition) => {
    const runs = latestRuns(polish, condition)
    let kept = 0
    let checked = 0
    let originalMarks = 0
    const counted = new Set()
    for (const run of runs) {
      const spans = originals.get(run.id.replace(/-polish$/, ''))
      if (!spans) throw new Error(`${run.id}: 다듬기 입력의 원문 판정이 없다`)
      if (!counted.has(run.id)) { originalMarks += spans.length; counted.add(run.id) }
      for (const span of spans) {
        checked += 1
        if (run.output.includes(span.quote)) kept += 1
      }
    }
    const natural = polish.list(`judge/natural/${condition}`).filter((r) => r.judged)
    const meaning = polish.list(`judge/meaning/${condition}`).filter((r) => r.judged)
    return [condition, {
      runs: runs.length,
      originalMarks,
      kept,
      checked,
      finalMarks: natural.reduce((sum, r) => sum + r.spans.length, 0),
      finalJudged: natural.length,
      meaningPass: meaning.filter((r) => r.pass === true).length,
      meaningJudged: meaning.length,
    }]
  }))
}
