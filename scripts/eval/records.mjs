#!/usr/bin/env node
/**
 * 실행 기록 묶기·풀기.
 *
 *   node scripts/eval/records.mjs pack --out <이름>     # evals/runs/<이름>/records/의 작업 기록을 evals/results/<이름>/records.json에 합친다
 *   node scripts/eval/records.mjs unpack --out <이름>   # records.json을 작업 기록 파일로 푼다(기록을 파일 단위로 살펴볼 때)
 *
 * run·judge·trigger 명령은 끝날 때 스스로 묶으므로 보통은 부를 필요가 없다.
 */
import { parseArgs } from './lib/common.mjs'
import { packRecords, unpackRecords } from './lib/records.mjs'

const options = parseArgs(process.argv.slice(2), {})
const mode = options._[0]
if (!['pack', 'unpack'].includes(mode) || !options.out) {
  console.error('사용법: records.mjs pack|unpack --out <이름>')
  process.exit(1)
}
const count = mode === 'pack' ? packRecords(options.out) : unpackRecords(options.out)
console.log(`${options.out}: 기록 ${count}개 ${mode === 'pack' ? '묶음' : '풂'}`)
