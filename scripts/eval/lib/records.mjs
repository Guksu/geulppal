/**
 * 실행 기록 저장소 — 공개 기록은 실행 폴더마다 records.json 하나로 묶는다.
 *
 * 스크립트는 작업 중에 evals/runs/<실행>/records/<경로>.json에 기록을 하나씩 쓴다(커밋하지 않는 곳이라 동시에 돌려도 서로 덮어쓰지 않는다).
 * 명령이 끝나면 packRecords가 기존 records.json과 작업 기록을 합쳐 evals/results/<실행>/records.json을 다시 쓴다.
 * 읽을 때는 records.json 위에 작업 기록을 덮어 읽으므로, 새로 받은 저장소에서는 records.json만으로 집계·판정을 이어 갈 수 있다.
 */
import { existsSync, readdirSync, renameSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { ROOT, readJson, writeJson } from './common.mjs'

export const resultsDir = (run) => join(ROOT, 'evals/results', run)
export const storeDir = (run) => join(ROOT, 'evals/runs', run, 'records')
const bundleFile = (run) => join(resultsDir(run), 'records.json')

const walk = (dir) => (existsSync(dir) ? readdirSync(dir).flatMap((name) => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)])) : [])

/** records.json과 작업 기록을 합친 지도(키: "runs/A/사례-r1-a1" 같은 상대 경로, .json 없음) */
const loadAll = (run) => {
  const map = new Map()
  if (existsSync(bundleFile(run))) for (const [key, value] of Object.entries(readJson(bundleFile(run)).records ?? {})) map.set(key, value)
  for (const file of walk(storeDir(run)).filter((f) => f.endsWith('.json'))) map.set(relative(storeDir(run), file).split(sep).join('/').replace(/\.json$/, ''), readJson(file))
  return map
}

export const openRecords = (run) => {
  const map = loadAll(run)
  const childrenOf = (dir) => [...map.keys()].filter((key) => key.startsWith(`${dir}/`)).map((key) => key.slice(dir.length + 1))
  return {
    run,
    get: (key) => map.get(key) ?? null,
    has: (key) => map.has(key),
    /** dir 바로 아래의 기록(이름순) */
    list: (dir) => childrenOf(dir).filter((rest) => !rest.includes('/')).sort().map((rest) => map.get(`${dir}/${rest}`)),
    /** dir 바로 아래의 기록 이름(이름순) */
    names: (dir) => childrenOf(dir).filter((rest) => !rest.includes('/')).sort(),
    /** dir 바로 아래의 하위 폴더 이름 */
    dirs: (dir) => [...new Set(childrenOf(dir).filter((rest) => rest.includes('/')).map((rest) => rest.split('/')[0]))].sort(),
    put: (key, value) => {
      map.set(key, value)
      writeJson(join(storeDir(run), `${key}.json`), value)
    },
  }
}

/** records.json 다시 쓰기 — 키를 정렬해 같은 내용이면 같은 파일이 되게 하고, 임시 파일을 거쳐 바꿔 넣는다 */
export const packRecords = (run) => {
  const map = loadAll(run)
  const records = Object.fromEntries([...map.keys()].sort().map((key) => [key, map.get(key)]))
  const temp = `${bundleFile(run)}.${process.pid}.tmp`
  writeJson(temp, { format: 'geulppal-eval-records/1', run, count: map.size, records })
  renameSync(temp, bundleFile(run))
  return map.size
}

/** records.json을 작업 기록으로 풀기 — 판정 기록 파일을 직접 고치거나 살펴볼 때 */
export const unpackRecords = (run) => {
  const map = loadAll(run)
  for (const [key, value] of map) writeJson(join(storeDir(run), `${key}.json`), value)
  return map.size
}

