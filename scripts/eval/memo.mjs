#!/usr/bin/env node
/**
 * 메모로 쓰는 사례 — 공개 기사에서 담당자가 처음 가졌을 법한 사실 메모를 뽑고, 그 메모로 글을 써 달라는 사례를 만든다.
 *
 *   node scripts/eval/memo.mjs sources --dir evals/draft-memo        # 기사 가져오기 → sources.json
 *   node scripts/eval/memo.mjs memo --dir evals/draft-memo [--ids a,b] [--force]   # 메모 만들기와 검수 → memo.json
 *   node scripts/eval/memo.mjs build --dir evals/draft-memo          # cases.json
 *
 * 기사: 대한민국 정책브리핑 정책뉴스(공공누리 제1유형). 본문 텍스트만 쓰고 사진·표·사진 설명은 뺀다.
 * 메모: 스킬 없는 별도 세션이 기사에서 사실만 메모체로 뽑는다. 판정 모델이 기사와 대조해(evals/judge/memo-check.md)
 * 빠지거나 바뀌거나 더해진 사실이 없을 때만 쓴다. 통과하지 못하면 세 번까지 다시 만든다.
 * 작성 모델은 요청과 메모만 받는다. 기사는 품질 비교의 기준 조건 H로만 쓴다(human.mjs reference --dir 같은 폴더).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, cliVersion, parseArgs, pool, readJson, sha256, writeJson } from './lib/common.mjs'
import { callIsolated as callIsolatedBase } from './lib/isolated.mjs'

const options = parseArgs(process.argv.slice(2), {
  'memo-model': 'claude-sonnet-5-5',
  'judge-model': 'claude-opus-5-5',
  effort: 'high',
  concurrency: '4',
  claude: 'claude',
})
const mode = options._[0]
if (!['sources', 'memo', 'build'].includes(mode) || !options.dir) {
  console.error('사용법: memo.mjs sources | memo | build --dir evals/draft-memo')
  process.exit(1)
}
const SET = options.dir
const DIR = join(ROOT, SET)
const spec = readJson(join(DIR, 'spec.json'))
const sourcesFile = join(DIR, 'sources.json')
const memoFile = join(DIR, 'memo.json')
const ids = options.ids ? String(options.ids).split(',') : null
const callIsolated = (call) => callIsolatedBase({ claude: options.claude, effort: options.effort, ...call })

const ENTITIES = { nbsp: ' ', lt: '<', gt: '>', quot: '"', apos: "'", lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', middot: '·', hellip: '…', ndash: '–', mdash: '—', sim: '∼', times: '×', bull: '•', rarr: '→', uarr: '↑', darr: '↓', amp: '&' }
const decode = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (whole, name) => ENTITIES[name.toLowerCase()] ?? whole)

// 정책브리핑 기사 본문: article_body부터 이용 조건 안내 전까지. 사진·표·사진 설명과 스크립트는 뺀다
const articleBody = (html) => {
  const start = html.indexOf('class="article_body"')
  if (start < 0) return ''
  const end = html.indexOf('이 자료는', start)
  let part = html.slice(html.indexOf('>', start) + 1, end > 0 ? end : start + 30000)
  part = part.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<(figure|figcaption|table)[\s\S]*?<\/\1>/g, '')
  part = part.replace(/<br\s*\/?>/g, '\n').replace(/<\/p>/g, '\n').replace(/<[^>]+>/g, '')
  return decode(part).split('\n').map((line) => line.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

const fetchPage = (url) => {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return execFileSync('curl', ['-sS', '-m', '40', '-A', 'Mozilla/5.0', url], { encoding: 'utf8', maxBuffer: 1 << 26 })
    } catch {
      execFileSync('sleep', [String(2 ** attempt)])
    }
  }
  throw new Error(`가져오지 못함: ${url}`)
}

if (mode === 'sources') {
  const sources = []
  for (const source of spec.sources) {
    const html = fetchPage(source.url)
    if (!html.includes('공공누리 제1유형')) throw new Error(`${source.id}: 공공누리 제1유형 표시가 없다`)
    // 제목 끝의 게시판 이름(" - 정책뉴스", " - 정책기자마당" 등)을 뗀다
    const title = decode((html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').split('|')[0].replace(/\s+-\s+[^-]+$/, '').trim())
    const published = html.match(/article:published_time" content="([^"]+)"/)?.[1]?.slice(0, 10) ?? null
    let text = articleBody(html)
    const modifications = ['본문 텍스트만 씀(사진·표·사진 설명 제외)']
    // 기자단 글 끝의 서명과 자기소개는 평가에 쓰지 않는다(spec.strip_byline)
    if (spec.strip_byline) {
      const at = [...text.matchAll(/\n\s*(대한민국\s*)?정책기자단\s*[|｜ ]/g)].at(-1)?.index
      if (at !== undefined) {
        text = text.slice(0, at).trim()
        modifications.push('글쓴이 서명·소개 제외')
      }
    }
    const masked = text.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '(전자우편 주소 생략)')
    if (masked !== text) modifications.push('전자우편 주소 생략')
    text = masked
    sources.push({ id: source.id, split: source.split, url: source.url, title, published, license: '공공누리 제1유형(출처표시)', excerpt: { modifications }, chars: text.length, text })
    console.log(`${source.id}: ${published} ${text.length}자 ${title}`)
  }
  writeJson(sourcesFile, sources)
}

// 자료 묶음마다 spec.memo_request(줄 배열)와 spec.memo_rubric(판정 지침 경로)으로 바꿀 수 있다. 없으면 정책 기사용 기본값
const DEFAULT_MEMO_REQUEST = [
  '아래 정책 기사를, 담당자가 이 기사를 쓰기 전에 가지고 있던 업무 메모로 되돌려 줘.',
  '- 기사에 있는 사실(기관, 날짜·요일·시각, 수치와 단위, 대상, 조건·예외, 절차, 장소, 연락처, 발언한 사람과 발언 요지)을 빠짐없이 짧은 항목으로 적어.',
  '- 기사 문장을 그대로 옮기지 말고 짧은 메모체로 써.',
  '- 기사에 없는 사실, 해석, 평가, 전망은 넣지 마. 발언은 누가 한 말인지 적고 요지만 남겨.',
  '- 범위를 정하는 말(만, 등, 모두)과 확실성(예정, 추진, 검토, 계획)은 기사와 같게 둬.',
  '- 제목, 도입 문장, 마무리 문장 없이 메모만 보내.',
].join('\n')
const MEMO_REQUEST = spec.memo_request ? spec.memo_request.join('\n') : DEFAULT_MEMO_REQUEST

const CHECK_SCHEMA = {
  type: 'object',
  properties: {
    facts: { type: 'array', items: { type: 'object', properties: { fact: { type: 'string' }, status: { type: 'string', enum: ['kept', 'missing', 'changed'] }, evidence: { type: 'string' } }, required: ['fact', 'status', 'evidence'], additionalProperties: false } },
    added: { type: 'array', items: { type: 'string' } },
    verdict: { type: 'string', enum: ['pass', 'fail'] },
    fail_reasons: { type: 'array', items: { type: 'string' } },
  },
  required: ['facts', 'added', 'verdict', 'fail_reasons'],
  additionalProperties: false,
}

const block = (label, text) => `## ${label}\n\n<<<${label} 시작>>>\n${text}\n<<<${label} 끝>>>`

if (mode === 'memo') {
  const sources = readJson(sourcesFile)
  const rubric = readFileSync(join(ROOT, spec.memo_rubric ?? 'evals/judge/memo-check.md'), 'utf8')
  const store = existsSync(memoFile) ? readJson(memoFile) : { items: {} }
  store.about = `메모로 쓰는 사례의 입력. 스킬 없는 별도 세션이 기사에서 뽑은 메모와, 판정 모델이 기사와 대조한 검수 결과. scripts/eval/memo.mjs memo --dir ${SET}으로 만든다.`
  store.request = MEMO_REQUEST
  store.cli = cliVersion(options.claude)
  const targets = sources.filter((source) => (!ids || ids.includes(source.id)) && (options.force || store.items[source.id]?.status !== 'ok'))
  const jobs = targets.map((source) => async () => {
    const attempts = []
    for (let attempt = 1; attempt <= 3; attempt++) {
      const generated = await callIsolated({ prompt: `${MEMO_REQUEST}\n\n${source.text}`, model: options['memo-model'] })
      if (!generated.text.trim()) {
        attempts.push({ attempt, generation: generated.meta, text: '', check: null })
        continue
      }
      const checked = await callIsolated({ prompt: [block('기사', source.text), block('메모', generated.text)].join('\n\n'), model: options['judge-model'], systemPrompt: rubric, schema: CHECK_SCHEMA })
      attempts.push({ attempt, generation: generated.meta, text: generated.text, check: { rubricSha256: sha256(rubric), meta: checked.meta, answer: checked.structured } })
      const verdict = checked.structured?.verdict ?? '판정 실패'
      console.log(`memo ${source.id} a${attempt} — ${verdict}`)
      if (verdict === 'pass') break
    }
    const passed = attempts.find((a) => a.check?.answer?.verdict === 'pass')
    store.items[source.id] = { status: passed ? 'ok' : 'failed', at: new Date().toISOString(), chosenAttempt: passed?.attempt ?? null, text: passed?.text ?? null, attempts }
  })
  await pool(jobs, Number(options.concurrency))
  writeJson(memoFile, store)
  const failed = Object.entries(store.items).filter(([, value]) => value.status !== 'ok').map(([key]) => key)
  console.log(`끝: ${Object.keys(store.items).length - failed.length}개 통과${failed.length ? `, 통과 못 함 ${failed.join(', ')}` : ''}`)
}

const STYLE_HEADER = '[참고 글: 말투와 문단 호흡만 참고. 이 글의 내용은 쓰지 않음]'
const MEMO_HEADER = '[메모]'
const styleText = (style) => {
  const found = readJson(join(ROOT, style.set, 'sources.json')).find((source) => source.id === style.source)
  if (!found) throw new Error(`참고 글 ${style.set} ${style.source}가 없다`)
  return found.text.trim()
}

if (mode === 'build') {
  const sources = readJson(sourcesFile)
  const memo = readJson(memoFile)
  const sourceOf = Object.fromEntries(sources.map((source) => [source.id, source]))
  const cases = []
  for (const item of spec.cases) {
    const source = sourceOf[item.source]
    if (!source) throw new Error(`spec.json 사례 ${item.id}: 자료 ${item.source}가 없다`)
    // 사례에 input(주제와 한두 줄 등)이 있으면 메모 대신 그것을 준다. style이 있으면 다른 사람 글을 문체 참고로 앞에 붙인다
    const memoText = item.input ?? (memo.items[item.source]?.status === 'ok' ? memo.items[item.source].text : null)
    if (memoText === null || memoText === undefined) {
      console.log(`${item.id}: 검수를 통과한 메모가 없어 만들지 않음`)
      continue
    }
    cases.push({
      id: item.id,
      task: 'draft',
      variant: 'memo',
      genre: item.genre,
      language: 'ko',
      split: source.split,
      source: source.id,
      origin: `human:${source.url}`,
      overlaps_skill_examples: false,
      request: item.request,
      input: item.style ? `${STYLE_HEADER}\n${styleText(item.style)}\n\n${MEMO_HEADER}\n${memoText.trim()}` : memoText.trim(),
      ...(item.style ? { style: item.style } : {}),
      ...(spec.rubrics ? { rubrics: spec.rubrics } : {}),
      ...(item.input ? { input_kind: 'brief' } : {}),
      must_preserve: item.must_cover,
      must_not: [...(item.must_not ?? []), ...spec.common_must_not],
      exact: [],
      notes: spec.case_notes ?? '원문 없이 메모로 쓰는 사례. must_preserve는 다뤄야 할 내용이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-memo-claims.md로 본다.',
      ...((spec.reference_genres ?? ['보도자료']).includes(item.genre) && !item.input ? { reference: source.id } : {}),
    })
  }
  writeJson(join(DIR, 'cases.json'), cases)
  const splitCounts = cases.reduce((acc, c) => ({ ...acc, [c.split]: (acc[c.split] ?? 0) + 1 }), {})
  console.log(`사례 ${cases.length}개 → ${SET}/cases.json (${Object.entries(splitCounts).map(([k, v]) => `${k} ${v}`).join(', ')})`)
}
