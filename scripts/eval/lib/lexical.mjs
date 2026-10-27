/**
 * 단어 겹침 대리 지표 — 요청 문장과 스킬 설명(description)의 겹침을 IDF로 가중해 순위를 매긴다.
 * 모델을 부르지 않는 참고 값이다. 실제 Claude의 스킬 선택 결과와 따로 보고한다.
 *
 * 특징: 공백 단위 단어(가중 3, 끝 조사 하나를 뗀 형태도 포함) + 한글 음절 2-gram(가중 1).
 */
const PARTICLE = /(으로|에서|처럼|까지|부터|하고|을|를|이|가|은|는|로|에|의|도|만|과|와|요)$/
const STOPWORDS = new Set([
  '해줘', '해주세요', '줘', '좀', '이', '그', '이거', '아래', '다음', '있으면', '하고', '같아', '너무',
  'the', 'a', 'an', 'to', 'for', 'of', 'in', 'on', 'and', 'or', 'it', 'is', 'this', 'that', 'our', 'so', 'please',
])

export const features = (text) => {
  const out = new Map()
  const add = (key, weight) => out.set(key, Math.max(out.get(key) ?? 0, weight))
  const tokens = text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter(Boolean)
  for (const token of tokens) {
    if (STOPWORDS.has(token)) continue
    add(`w:${token}`, 3)
    const stem = token.replace(PARTICLE, '')
    if (stem !== token && stem.length >= 2) add(`w:${stem}`, 3)
    if (/[가-힣]/.test(token)) for (let i = 0; i < token.length - 1; i++) add(`b:${token.slice(i, i + 2)}`, 1)
  }
  return out
}

/** docs: { name, description }[] → (query) => { name, score }[] (점수 내림차순) */
export const createRanker = (docs) => {
  const docFeatures = docs.map((doc) => ({ name: doc.name, features: features(doc.description) }))
  const df = new Map()
  for (const doc of docFeatures) for (const key of doc.features.keys()) df.set(key, (df.get(key) ?? 0) + 1)
  const idf = (key) => Math.log((docs.length + 1) / ((df.get(key) ?? 0) + 0.5))
  return (query) => {
    const q = features(query)
    return docFeatures
      .map((doc) => {
        let score = 0
        for (const [key, weight] of q) if (doc.features.has(key)) score += Math.min(weight, doc.features.get(key)) * Math.max(idf(key), 0)
        return { name: doc.name, score }
      })
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  }
}

/** 스킬 목록 첨부(- 이름: 설명 줄들)를 문서 목록으로 */
export const parseListing = (content) =>
  content
    .split('\n')
    .map((line) => line.match(/^- ([^:]+): (.*)$/))
    .filter(Boolean)
    .map((match) => ({ name: match[1].trim(), description: match[2] }))
