// 모델을 부르지 않는 회귀 테스트: node --test 'scripts/eval/test/*.test.mjs'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { LEGACY_POLISH_REQUEST, POLISH_REQUEST, naturalPrompt, polishStats, toPolishCase } from '../lib/natural.mjs'
import { openRecords } from '../lib/records.mjs'

const answerCase = { id: 'lease-question', task: 'answer', split: 'holdout2', request: '아래 질문에 답해 줘.', input: '전세랑 월세 중에 뭐가 나아?', reader: '개발자가 아닌 사회초년생' }
const record = { id: 'lease-question', rep: 1, output: '  전세는 보증금이 큽니다.\n' }

test('다듬기 사례는 원래 사례의 독자를 옮기고, 개발 답변에 묶인 요청 문구를 쓰지 않는다', () => {
  const item = toPolishCase(record, answerCase, { from: 'run-x', condition: 'A' })
  assert.equal(item.id, 'lease-question-polish')
  assert.equal(item.reader, answerCase.reader)
  assert.equal(item.input, '전세는 보증금이 큽니다.')
  assert.equal(item.request, POLISH_REQUEST)
  assert.doesNotMatch(item.request, /개발 작업/)
  assert.equal(item.origin, 'generated:run-x/runs/A/lease-question-r1')
})

test('독자가 없는 사례에는 reader를 만들지 않는다', () => {
  const { reader, ...noReader } = answerCase
  assert.equal('reader' in toPolishCase(record, noReader, { from: 'run-x', condition: 'A' }), false)
})

test('다듬기 사례의 판정 프롬프트에는 독자가 들어가고 원문은 들어가지 않는다', () => {
  const item = toPolishCase(record, answerCase, { from: 'run-x', condition: 'A' })
  const prompt = naturalPrompt(item, '다듬은 글')
  assert.match(prompt, /## 독자\n\n<<<독자 시작>>>\n개발자가 아닌 사회초년생\n<<<독자 끝>>>/)
  assert.doesNotMatch(prompt, /## 질문/)
  assert.doesNotMatch(prompt, /전세는 보증금이 큽니다/)
  assert.match(prompt, /## 글\n\n<<<글 시작>>>\n다듬은 글\n<<<글 끝>>>/)
})

test('질문에 답하는 사례의 판정 프롬프트에는 질문과 독자가 함께 들어간다', () => {
  const prompt = naturalPrompt(answerCase, '답변')
  assert.match(prompt, /## 질문[\s\S]*전세랑 월세/)
  assert.match(prompt, /## 독자[\s\S]*사회초년생/)
})

test('독자가 없으면 독자 블록을 넣지 않는다', () => {
  const prompt = naturalPrompt({ task: 'rewrite', request: '다듬어 줘', input: '원문' }, '글')
  assert.doesNotMatch(prompt, /## 독자/)
  assert.doesNotMatch(prompt, /원문/)
})

test('이전 다듬기 사례 파일은 이전 요청 문구로 실행한 그대로다', async () => {
  const { readJson, ROOT } = await import('../lib/common.mjs')
  for (const file of ['polish-cases.json', 'polish-holdout-cases.json', 'polish-holdout2-cases.json']) {
    for (const item of readJson(`${ROOT}/evals/korean-natural/${file}`)) assert.equal(item.request, LEGACY_POLISH_REQUEST, `${file} ${item.id}`)
  }
})

// 문서에 적은 수치가 공개 기록(records.json)에서 다시 나오는지 확인한다
test('2차 새 확인용 다듬기 수치를 원시 기록에서 다시 센다', () => {
  const stats = polishStats(openRecords('2026-11-03-korean-natural-holdout2'), openRecords('2026-11-03-korean-natural-polish2'), ['A', 'N3', 'N4'])
  assert.deepEqual(stats.A, { runs: 24, originalMarks: 24, kept: 18, checked: 48, finalMarks: 41, finalJudged: 24, meaningPass: 22, meaningJudged: 24 })
  assert.deepEqual(stats.N3, { runs: 24, originalMarks: 24, kept: 8, checked: 48, finalMarks: 21, finalJudged: 24, meaningPass: 22, meaningJudged: 24 })
  assert.deepEqual(stats.N4, { runs: 24, originalMarks: 24, kept: 8, checked: 48, finalMarks: 28, finalJudged: 24, meaningPass: 23, meaningJudged: 24 })
})

test('첫 새 확인용 다듬기 수치를 원시 기록에서 다시 센다', () => {
  const stats = polishStats(openRecords('2026-11-03-korean-natural-holdout'), openRecords('2026-11-03-korean-natural-polish'), ['A', 'N1', 'N3'])
  assert.deepEqual([stats.A.kept, stats.A.checked, stats.A.finalMarks, stats.A.meaningPass, stats.A.meaningJudged], [19, 34, 38, 12, 16])
  assert.deepEqual([stats.N1.kept, stats.N1.checked, stats.N1.finalMarks, stats.N1.meaningPass], [8, 34, 26, 16])
  assert.deepEqual([stats.N3.kept, stats.N3.checked, stats.N3.finalMarks, stats.N3.meaningPass], [4, 34, 24, 16])
})
