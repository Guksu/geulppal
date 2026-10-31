#!/usr/bin/env node
/**
 * 소설 사례 — 원문도 사실 근거도 없이 짧은 소설을 쓰는 사례를 만든다.
 *
 *   node scripts/eval/fiction.mjs sources --dir evals/draft-fiction   # 문체 참고 글(저작권이 끝난 근대 단편) 가져오기 → sources.json
 *   node scripts/eval/fiction.mjs build --dir evals/draft-fiction     # cases.json
 *
 * 사례는 spec.json에 직접 쓴다. 입력은 한두 줄 설명, 설정 메모, 문체 참고 글 + 설정 메모 세 가지다.
 * 판정은 요청 조건과 설정을 지켰는지(evals/judge/draft-fiction-check.md)와 분량(`length`, 공백 제외 글자 수)을 본다.
 * 지어낸 장면·대사·감정은 소설에서 문제가 아니다. 품질은 짝 비교와 사람 블라인드 비교로 본다.
 */
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT, parseArgs, readJson, writeJson } from './lib/common.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
if (!['sources', 'build'].includes(mode) || !options.dir) {
  console.error('사용법: fiction.mjs sources | build --dir evals/draft-fiction')
  process.exit(1)
}
const SET = options.dir
const DIR = join(ROOT, SET)
const spec = readJson(join(DIR, 'spec.json'))
const STYLE_HEADER = '[참고 글: 말투와 문장 호흡만 참고. 이 글의 인물·사건·문장은 쓰지 않음]'
const MEMO_HEADER = '[메모]'

// 위키문헌 원문(위키 문법)에서 머리말 틀과 장식 줄을 빼고 본문 앞부분을 문단 단위로 자른다
const wikisourceExcerpt = (raw, maxChars) => {
  const body = raw.replace(/\{\{[\s\S]*?\}\}/g, '').replace(/<[^>]+>/g, '').replace(/🙝🙟/g, '').replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1').replace(/\[\[([^\]]*)\]\]/g, '$1')
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const out = []
  for (const paragraph of paragraphs) {
    if (out.join('\n\n').length + paragraph.length > maxChars && out.length) break
    out.push(paragraph)
  }
  return out.join('\n\n')
}

if (mode === 'sources') {
  const sources = []
  for (const source of spec.sources) {
    let raw = ''
    for (let attempt = 0; attempt < 5 && !raw; attempt++) {
      try {
        raw = execFileSync('curl', ['-sS', '-m', '40', `https://ko.wikisource.org/w/index.php?title=${encodeURIComponent(source.title)}&action=raw`], { encoding: 'utf8' })
      } catch {
        execFileSync('sleep', [String(2 ** attempt)])
      }
    }
    if (!raw.includes('{{머리말')) throw new Error(`${source.id}: 위키문헌 원문을 가져오지 못했다`)
    const text = wikisourceExcerpt(raw, source.max_chars ?? 900)
    sources.push({
      id: source.id,
      title: source.title,
      author: source.author,
      published: source.published,
      author_died: source.author_died,
      url: `https://ko.wikisource.org/wiki/${encodeURIComponent(source.title)}`,
      license: '저작권 보호기간 만료(퍼블릭 도메인)',
      excerpt: { modifications: [`본문 앞부분 발췌(문단 단위, ${source.max_chars ?? 900}자 이내)`] },
      chars: text.length,
      text,
    })
    console.log(`${source.id}: ${text.length}자`)
  }
  writeJson(join(DIR, 'sources.json'), sources)
}

if (mode === 'build') {
  const sources = Object.fromEntries(readJson(join(DIR, 'sources.json')).map((source) => [source.id, source]))
  const cases = spec.cases.map((item) => {
    const style = item.style ? sources[item.style] : null
    if (item.style && !style) throw new Error(`${item.id}: 참고 글 ${item.style}가 없다`)
    const input = style ? `${STYLE_HEADER}\n${style.text}\n\n${MEMO_HEADER}\n${item.input.trim()}` : (item.input ?? '').trim()
    return {
      id: item.id,
      task: 'draft',
      variant: 'fiction',
      genre: item.genre ?? '짧은 소설',
      language: 'ko',
      split: item.split,
      source: null,
      origin: 'authored:evals/draft-fiction/spec.json',
      overlaps_skill_examples: false,
      request: item.request,
      input,
      input_kind: item.input_kind,
      must_preserve: item.conditions,
      must_not: [...(item.must_not ?? []), ...spec.common_must_not],
      exact: [],
      length: item.length,
      ...(style ? { style: { set: SET, source: style.id } } : {}),
      rubrics: spec.rubrics,
      notes: '원문 없이 쓰는 소설. 지어낸 장면·대사·감정은 문제가 아니다. must_preserve는 지켜야 할 요청 조건이고 근거 판정 대신 조건 판정(evals/judge/draft-fiction-check.md)을 한다.',
    }
  })
  writeJson(join(DIR, 'cases.json'), cases)
  const splitCounts = cases.reduce((acc, c) => ({ ...acc, [c.split]: (acc[c.split] ?? 0) + 1 }), {})
  console.log(`사례 ${cases.length}개 → ${SET}/cases.json (${Object.entries(splitCounts).map(([k, v]) => `${k} ${v}`).join(', ')})`)
}
