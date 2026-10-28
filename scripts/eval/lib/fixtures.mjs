/**
 * 작업 폴더 자료 — 초안 사례에서 작성 모델에게 줄 저장소 코드를 정해진 커밋에서 꺼낸다.
 *
 * 사례의 `fixture`는 { repo: "owner/name", commit, paths: [...], strip?: "packages/x", exclude: ["정규식", ...] }이다.
 * 공개 저장소를 evals/runs/fixtures/repos/에 부분 복제하고(git clone --filter=blob:none), `git archive`로 paths만 꺼낸 뒤
 * strip 접두어를 떼고 exclude에 맞는 파일(README, 설명 문서, 데이터 등)을 지운다. 결과는 evals/runs/fixtures/<키>/에 두고 다시 쓴다(커밋하지 않음).
 * 같은 사례면 같은 파일이 나오도록 파일 목록과 내용으로 만든 해시를 사례에 적어 두고 확인한다.
 */
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { ROOT, sha256, treeHash } from './common.mjs'

const BASE = join(ROOT, 'evals/runs/fixtures')

export const fixtureKey = (fixture) =>
  `${fixture.repo.replace('/', '_')}@${fixture.commit.slice(0, 12)}-${sha256(JSON.stringify([fixture.paths, fixture.strip ?? '', fixture.exclude ?? []])).slice(0, 8)}`

const walk = (dir) => readdirSync(dir).flatMap((name) => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)]))

/** 꺼낸 폴더 경로. 없으면 만든다 */
export const ensureFixture = (fixture) => {
  const dir = join(BASE, fixtureKey(fixture))
  const ready = `${dir}.ready`
  if (existsSync(ready) && existsSync(dir)) return dir
  const repoDir = join(BASE, 'repos', fixture.repo.replace('/', '_'))
  const env = { ...process.env, GIT_LFS_SKIP_SMUDGE: '1' }
  if (!existsSync(repoDir)) {
    mkdirSync(join(BASE, 'repos'), { recursive: true })
    execFileSync('git', ['clone', '-q', '--filter=blob:none', '--no-checkout', `https://github.com/${fixture.repo}`, repoDir], { env, stdio: 'inherit' })
  }
  try {
    execFileSync('git', ['-C', repoDir, 'cat-file', '-e', `${fixture.commit}^{commit}`], { stdio: 'ignore' })
  } catch {
    execFileSync('git', ['-C', repoDir, 'fetch', '-q', 'origin', fixture.commit], { env, stdio: 'inherit' })
  }
  const temp = `${dir}.tmp`
  rmSync(temp, { recursive: true, force: true })
  mkdirSync(temp, { recursive: true })
  const tar = execFileSync('git', ['-C', repoDir, 'archive', '--format=tar', fixture.commit, '--', ...fixture.paths], { env, maxBuffer: 1 << 30 })
  execFileSync('tar', ['-x', '-C', temp], { input: tar })
  const root = fixture.strip ? join(temp, fixture.strip) : temp
  const patterns = (fixture.exclude ?? []).map((source) => new RegExp(source))
  for (const file of walk(root)) {
    const rel = relative(root, file).split(sep).join('/')
    if (patterns.some((pattern) => pattern.test(rel))) rmSync(file)
  }
  rmSync(dir, { recursive: true, force: true })
  renameSync(root, dir)
  rmSync(temp, { recursive: true, force: true })
  writeFileSync(ready, '')
  return dir
}

/** 꺼낸 파일의 해시 */
export const fixtureHash = (dir) => treeHash(dir)

/** 작업 폴더에 복사한다 */
export const installFixture = (work, dir) => cpSync(dir, work, { recursive: true })

/** 파일 수와 크기 */
export const fixtureStats = (dir) => {
  const files = walk(dir)
  return { files: files.length, bytes: files.reduce((sum, file) => sum + statSync(file).size, 0) }
}

/** 작업 폴더의 파일 해시 목록(.claude 제외) — 실행 전후를 비교해 작성 모델이 쓴 파일을 찾는다 */
export const snapshot = (work) =>
  Object.fromEntries(
    walk(work)
      .map((file) => relative(work, file).split(sep).join('/'))
      .filter((rel) => !rel.startsWith('.claude/'))
      .map((rel) => [rel, sha256(readFileSync(join(work, rel)))]),
  )

/** 실행 뒤 새로 생기거나 바뀐 파일 */
export const changedFiles = (work, before) =>
  Object.entries(snapshot(work))
    .filter(([rel, hash]) => before[rel] !== hash)
    .map(([rel]) => ({ path: rel, isNew: !(rel in before), chars: readFileSync(join(work, rel), 'utf8').length }))
    .sort((a, b) => a.path.localeCompare(b.path))

/** 결과로 볼 파일 — 바뀐 마크다운이 하나면 그것, 여럿이면 최상위 README.md, 그다음 최상위 README*.md */
export const pickDeliverable = (files) => {
  const markdown = files.filter((file) => /\.(md|mdx|markdown)$/i.test(file.path))
  if (markdown.length === 1) return markdown[0]
  return markdown.find((file) => file.path === 'README.md') ?? markdown.find((file) => /^README[^/]*\.md$/i.test(file.path)) ?? null
}
