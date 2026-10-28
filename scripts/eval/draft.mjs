#!/usr/bin/env node
/**
 * 초안 사례 — 원문 없이 글을 새로 쓰는 사례를 만든다.
 *
 *   node scripts/eval/draft.mjs build --dir evals/draft-readme
 *
 * spec.json의 자료마다 정해진 커밋에서 작업 폴더 자료(코드 등)를 꺼내고(scripts/eval/lib/fixtures.mjs),
 * 같은 커밋에서 사람이 쓴 글(README 등)을 기준 글로 가져와 sources.json에 둔다. 라이선스 사본은 licenses/에 둔다.
 * cases.json의 사례는 요청과 메모(input, 없을 수 있음)와 작업 폴더 자료를 가리키는 fixture를 가진다.
 * 기준 글은 작성 모델에게 주지 않는다. 품질 비교에서 기준 조건 H로만 쓴다(human.mjs reference --dir 같은 폴더).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, readJson, writeJson } from './lib/common.mjs'
import { ensureFixture, fixtureHash, fixtureStats } from './lib/fixtures.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
if (mode !== 'build' || !options.dir) {
  console.error('사용법: draft.mjs build --dir evals/draft-readme')
  process.exit(1)
}
const SET = options.dir
const DIR = join(ROOT, SET)
const spec = readJson(join(DIR, 'spec.json'))

const repoDir = (repo) => join(ROOT, 'evals/runs/fixtures/repos', repo.replace('/', '_'))
const git = (repo, args) => execFileSync('git', ['-C', repoDir(repo), ...args], { encoding: 'utf8', maxBuffer: 1 << 28, env: { ...process.env, GIT_LFS_SKIP_SMUDGE: '1' } })
const fixtureOf = (source) => ({ repo: source.repo, commit: source.commit, paths: source.fixture.paths, strip: source.fixture.strip, exclude: source.fixture.exclude ?? [] })

const sources = []
const licenseText = {}
mkdirSync(join(DIR, 'licenses'), { recursive: true })
for (const source of spec.sources) {
  const fixture = fixtureOf(source)
  const dir = ensureFixture(fixture)
  const { reference } = source
  let text = git(source.repo, ['show', `${source.commit}:${reference.path}`])
  const modifications = []
  if (reference.lines) {
    const [from, to] = reference.lines
    text = `${text.split('\n').slice(from - 1, to).join('\n')}\n`
    modifications.push(`일부 줄 발췌(줄 범위: ${from}-${to})`)
  }
  // 개인 연락처는 공개 자료에 두지 않는다
  const masked = text.replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '(전자우편 주소 생략)')
  if (masked !== text) modifications.push('전자우편 주소 생략')
  text = masked
  const authors = [...new Set(git(source.repo, ['log', '--format=%an', source.commit, '--', reference.path]).split('\n').filter(Boolean))].sort()
  const lastEdit = git(source.repo, ['log', '-1', '--format=%cs', source.commit, '--', reference.path]).trim()
  const committed = git(source.repo, ['show', '-s', '--format=%cs', source.commit]).trim()
  // 라이선스 사본 — 저장소 하나에 한 파일, 같은 저장소라도 내용이 다르면 자료 id로 따로 둔다
  const license = git(source.repo, ['show', `${source.commit}:${source.license_path}`])
  let licenseFile = `licenses/${source.repo.replace('/', '_')}.txt`
  if (licenseText[licenseFile] !== undefined && licenseText[licenseFile] !== license) licenseFile = `licenses/${source.id}.txt`
  licenseText[licenseFile] = license
  writeFileSync(join(DIR, licenseFile), license)
  const stats = fixtureStats(dir)
  sources.push({
    id: source.id,
    split: source.split,
    repo: source.repo,
    commit: source.commit,
    committed,
    committed_before: '2022-11-30',
    url: `https://github.com/${source.repo}/blob/${source.commit}/${reference.path}`,
    license: source.license,
    license_file: licenseFile,
    reference_path: reference.path,
    readme_last_edit: lastEdit,
    authors_of_file: authors,
    excerpt: { modifications },
    fixture: { ...fixture, sha256: fixtureHash(dir), files: stats.files, bytes: stats.bytes },
    chars: text.length,
    text,
  })
  console.log(`${source.id}: 작업 폴더 파일 ${stats.files}개(${Math.round(stats.bytes / 1024)}KB), 기준 글 ${text.length}자, 마지막 수정 ${lastEdit}`)
}
writeJson(join(DIR, 'sources.json'), sources)

const sourceOf = Object.fromEntries(sources.map((source) => [source.id, source]))
const cases = spec.cases.map((item) => {
  const source = sourceOf[item.source]
  if (!source) throw new Error(`spec.json 사례 ${item.id}: 자료 ${item.source}가 없다`)
  return {
    id: item.id,
    task: 'draft',
    variant: 'draft',
    genre: spec.genre,
    language: 'ko',
    split: source.split,
    source: source.id,
    origin: `human:${source.url}`,
    overlaps_skill_examples: false,
    request: item.request,
    input: item.input ?? '',
    must_preserve: item.must_cover,
    must_not: [...(item.must_not ?? []), ...spec.common_must_not],
    exact: [],
    fixture: { repo: source.fixture.repo, commit: source.fixture.commit, paths: source.fixture.paths, strip: source.fixture.strip, exclude: source.fixture.exclude, sha256: source.fixture.sha256 },
    notes: '원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.',
    reference: source.id,
  }
})
writeJson(join(DIR, 'cases.json'), cases)
console.log(`사례 ${cases.length}개 → ${SET}/cases.json (dev ${cases.filter((c) => c.split === 'dev').length}, test ${cases.filter((c) => c.split === 'test').length})`)
if (!existsSync(join(DIR, 'README.md'))) console.log(`${SET}/README.md가 아직 없다`)
