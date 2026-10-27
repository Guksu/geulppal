#!/usr/bin/env node
/**
 * 구조 검사 — 모델을 부르지 않는다. 평가 자료·스킬·문서 링크·스냅샷 해시·공개 결과의 경로 노출을 확인한다.
 *
 *   node scripts/eval/check.mjs
 *
 * 실패하면 exit 1. 실제 모델 평가를 통과했다는 뜻이 아니다.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { ROOT, readJson, treeHash } from './lib/common.mjs'

const errors = []
const notes = []
const TASKS = ['rewrite', 'draft', 'diagnose', 'summarize', 'noop-check']

const checkCases = (file) => {
  const path = join(ROOT, file)
  if (!existsSync(path)) return
  const cases = readJson(path)
  const ids = new Set()
  for (const item of cases) {
    const where = `${file} ${item.id ?? '(id 없음)'}`
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.id ?? '')) errors.push(`${where}: id 형식`)
    if (ids.has(item.id)) errors.push(`${where}: id 중복`)
    ids.add(item.id)
    if (!TASKS.includes(item.task)) errors.push(`${where}: task는 ${TASKS.join('·')} 중 하나`)
    for (const key of ['request', 'input']) if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(`${where}: ${key} 없음`)
    for (const key of ['must_preserve', 'must_not', 'exact']) if (!Array.isArray(item[key])) errors.push(`${where}: ${key}는 배열`)
    if (Array.isArray(item.must_preserve) && item.must_preserve.length === 0) errors.push(`${where}: must_preserve가 비어 있음`)
    // 문자열 검사는 원문에 있는 문자열만 요구한다 — 원문에 없는 내용을 보존하라고 요구하지 않는다
    for (const literal of item.exact ?? []) if (!item.input.includes(literal)) errors.push(`${where}: exact "${literal}"가 input에 없음`)
  }
  notes.push(`${file}: 사례 ${cases.length}개`)
}

const frontmatter = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return null
  const fields = {}
  const lines = match[1].split('\n')
  for (let i = 0; i < lines.length; i++) {
    const field = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!field) continue
    let value = field[2]
    if (value === '>-' || value === '|') {
      const block = []
      while (i + 1 < lines.length && /^\s+/.test(lines[i + 1])) block.push(lines[++i].trim())
      value = block.join(value === '>-' ? ' ' : '\n')
    }
    fields[field[1]] = value
  }
  return fields
}

const checkSkill = (dir) => {
  const skillFile = join(dir, 'SKILL.md')
  const label = relative(ROOT, dir)
  if (!existsSync(skillFile)) return errors.push(`${label}: SKILL.md 없음`)
  const fields = frontmatter(readFileSync(skillFile, 'utf8'))
  if (!fields) return errors.push(`${label}: frontmatter 없음`)
  if (fields.name !== 'geulppal') errors.push(`${label}: name이 geulppal이 아님`)
  if (!fields.description) errors.push(`${label}: description 없음`)
  else if (fields.description.length > 1024) errors.push(`${label}: description ${fields.description.length}자(1024자 초과)`)
}

const checkLinks = (file) => {
  const text = readFileSync(join(ROOT, file), 'utf8').replace(/```[\s\S]*?```/g, '')
  // 역슬래시로 막은 링크(\[텍스트](대상))는 링크가 아니므로 건너뛴다
  for (const match of text.matchAll(/(?<!\\)\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
    const target = match[1].split('#')[0]
    if (!target || /^[a-z]+:/i.test(match[1])) continue
    if (!existsSync(resolve(dirname(join(ROOT, file)), target))) errors.push(`${file}: 링크 대상 없음 ${match[1]}`)
  }
}

const walk = (dir) => (existsSync(dir) ? readdirSync(dir).flatMap((name) => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)])) : [])

// 평가 자료
checkCases('evals/cases.json')
checkCases('evals/holdout/cases.json')
const trigger = readJson(join(ROOT, 'evals/trigger/queries.json'))
const triggerIds = [...trigger.should, ...trigger.should_not].map((q) => q.id)
if (new Set(triggerIds).size !== triggerIds.length) errors.push('evals/trigger/queries.json: id 중복')
if (trigger.should.length < 8 || trigger.should_not.length < 6) errors.push('evals/trigger/queries.json: should 8개·should_not 6개 이상 필요')
for (const query of [...trigger.should, ...trigger.should_not]) if (/\/geulppal|geulppal|글빨/.test(query.prompt)) errors.push(`트리거 요청 ${query.id}: 스킬 이름을 직접 언급함`)
for (const file of ['evals/judge/meaning.md', 'evals/judge/quality.md']) if (!existsSync(join(ROOT, file))) errors.push(`${file} 없음`)

// 스킬과 스냅샷
checkSkill(join(ROOT, 'skills/geulppal'))
const hashesFile = join(ROOT, 'evals/snapshots/hashes.json')
const hashes = existsSync(hashesFile) ? readJson(hashesFile) : {}
for (const version of existsSync(join(ROOT, 'evals/snapshots')) ? readdirSync(join(ROOT, 'evals/snapshots')).filter((name) => statSync(join(ROOT, 'evals/snapshots', name)).isDirectory()) : []) {
  const dir = join(ROOT, 'evals/snapshots', version, 'geulppal')
  checkSkill(dir)
  const actual = treeHash(dir)
  if (hashes[version]?.treeSha256 !== actual) errors.push(`evals/snapshots/${version}: 해시가 hashes.json과 다름(${actual.slice(0, 12)})`)
}
const current = treeHash(join(ROOT, 'skills/geulppal'))
const matching = Object.entries(hashes).filter(([, value]) => value.treeSha256 === current).map(([version]) => version)
notes.push(`skills/geulppal 해시 ${current.slice(0, 12)} — 같은 스냅샷: ${matching.join(', ') || '없음'}`)

// 문서 링크
for (const file of ['README.md', 'skills/geulppal/SKILL.md', 'skills/geulppal/references/document-types.md', 'skills/geulppal/references/editing-examples.md', 'evals/README.md', 'research/findings.md']) {
  if (existsSync(join(ROOT, file))) checkLinks(file)
}
for (const file of walk(join(ROOT, 'evals/results')).filter((f) => f.endsWith('.md'))) checkLinks(relative(ROOT, file))

// 실행 결과 묶음
for (const name of existsSync(join(ROOT, 'evals/results')) ? readdirSync(join(ROOT, 'evals/results')).filter((n) => statSync(join(ROOT, 'evals/results', n)).isDirectory() && n !== 'cases') : []) {
  const file = join(ROOT, 'evals/results', name, 'records.json')
  if (!existsSync(file)) {
    errors.push(`evals/results/${name}: records.json 없음`)
    continue
  }
  const bundle = readJson(file)
  if (bundle.format !== 'geulppal-eval-records/1' || bundle.count !== Object.keys(bundle.records ?? {}).length) errors.push(`evals/results/${name}/records.json: 형식이나 기록 수가 맞지 않음`)
  const stray = readdirSync(join(ROOT, 'evals/results', name)).filter((n) => statSync(join(ROOT, 'evals/results', name, n)).isDirectory())
  if (stray.length) errors.push(`evals/results/${name}: 묶지 않은 기록 폴더 ${stray.join(', ')}(records.mjs pack으로 묶는다)`)
}

// 공개 결과의 로컬 경로·인증 정보
const LEAK = [/\/Users\/[A-Za-z]/, /\/home\/[a-z]+\//, /\/tmp\/run-/, /sk-ant-[A-Za-z0-9]/, /CLAUDE_CODE_OAUTH_TOKEN=/, /ANTHROPIC_API_KEY=/]
for (const file of walk(join(ROOT, 'evals/results'))) {
  const text = readFileSync(file, 'utf8')
  for (const pattern of LEAK) if (pattern.test(text)) errors.push(`${relative(ROOT, file)}: 공개하면 안 되는 문자열(${pattern})`)
}

for (const note of notes) console.log(note)
if (errors.length) {
  for (const error of errors) console.error(`오류: ${error}`)
  process.exit(1)
}
console.log('구조 검사 통과')
