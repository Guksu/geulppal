#!/usr/bin/env node
/**
 * 실행 기록 묶기·풀기.
 *
 *   node scripts/eval/records.mjs pack --out <이름>     # evals/runs/<이름>/records/의 작업 기록을 evals/results/<이름>/records.json에 합친다
 *   node scripts/eval/records.mjs unpack --out <이름>   # records.json을 작업 기록 파일로 푼다(기록을 파일 단위로 살펴볼 때)
 *   node scripts/eval/records.mjs rescrub --out <이름>  # 원본 출력(evals/runs/<이름>/<조건>/…/output.txt)으로 공개 기록의 output을 다시 만든다
 *
 * run·judge·trigger 명령은 끝날 때 스스로 묶으므로 보통은 부를 필요가 없다.
 * rescrub은 경로 지우기 규칙을 고친 뒤 쓴다. 원본 로그가 없는 기록은 그대로 둔다.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, parseArgs, scrub } from './lib/common.mjs'
import { openRecords, packRecords, unpackRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
if (!['pack', 'unpack', 'rescrub'].includes(mode) || !options.out) {
  console.error('사용법: records.mjs pack|unpack|rescrub --out <이름>')
  process.exit(1)
}
if (mode === 'rescrub') {
  const records = openRecords(options.out)
  let changed = 0
  for (const condition of records.dirs('runs')) {
    for (const name of records.names(`runs/${condition}`)) {
      const record = records.get(`runs/${condition}/${name}`)
      const raw = join(ROOT, 'evals/runs', options.out, condition, name, 'output.txt')
      if (record.reference || !existsSync(raw)) continue
      const output = readFileSync(raw, 'utf8')
      if (scrub(output) === record.output) continue
      records.put(`runs/${condition}/${name}`, { ...record, output: scrub(output), outputHadLocalPath: scrub(output) !== output })
      changed++
    }
  }
  console.log(`${options.out}: output ${changed}개 다시 만듦, 기록 ${packRecords(options.out)}개 묶음`)
} else {
  const count = mode === 'pack' ? packRecords(options.out) : unpackRecords(options.out)
  console.log(`${options.out}: 기록 ${count}개 ${mode === 'pack' ? '묶음' : '풂'}`)
}
