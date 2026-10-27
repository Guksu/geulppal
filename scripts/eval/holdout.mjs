#!/usr/bin/env node
/**
 * 처음 보는 평가 자료 만들기 — 도구 없는 별도의 새 세션에게 문서 종류와 평가할 능력만 알려 주고 사례 12개를 받는다.
 *
 *   node scripts/eval/holdout.mjs --out evals/holdout/cases.json [--model claude-opus-5-5]
 *
 * 작성자에게는 스킬 내용, 기존 평가 사례, 스킬 예문을 보여 주지 않는다(--tools ""로 파일도 읽을 수 없다).
 * 받은 요청문과 실행 기록(모델·비용·시각)은 evals/holdout/generation.json에 남긴다.
 */
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { ROOT, cliVersion, makeSandbox, parseArgs, parseStream, runClaude, sha256, usageOf, writeJson } from './lib/common.mjs'

const options = parseArgs(process.argv.slice(2), { model: 'claude-opus-5-5', effort: 'high', claude: 'claude', out: 'evals/holdout/cases.json' })
const outFile = resolve(options.out)
if (existsSync(outFile) && !options.force) {
  console.error(`${options.out}가 이미 있다. 다시 만들려면 --force`)
  process.exit(1)
}

const PROMPT = `글쓰기 보조 도구를 평가할 시험 자료 12개를 만들어 줘. 도구는 사용자가 준 글을 다듬거나, 사용자가 준 사실로 새 글을 쓴다.

평가할 능력:
- 과장, 같은 내용의 반복, 번역투, 형식적인 도입·결론을 줄이는가
- 사실, 수치가 가리키는 대상, 조건, 예외, 불확실성, 계획과 완료의 구분, 작성자의 의도와 말투를 보존하는가
- 인용, 코드, 명령, 링크, 설정 키 같은 표기를 그대로 두는가
- 이미 좋은 글이나 필요한 표현(실제로 필요한 부정·대조, 실제로 세 가지인 목록, 공손한 인사)을 불필요하게 고치지 않는가
- 진단만 하라거나 요약하라는 등 요청한 작업 범위를 지키는가

12개 사례의 종류(한 사례에 하나씩):
1. 한국어 README. 길게(4문단 이상). 설치 명령, 설정 키, 기본값, 알려진 한계를 넣는다
2. 한국어 PR 본문. 한영 기술 용어가 섞이고, 실행한 테스트와 실행하지 않은 테스트가 구분된다
3. 한국어 기획서나 제안서 일부. 측정 기간과 표본이 있는 수치, 비용 조건, 예외, 아직 정하지 않은 사항이 있다
4. 한국어 제품·서비스 소개글. 근거 없는 홍보 문구가 섞여 있다
5. 사실 목록만 주고 새 글(공지, 소개, 릴리스 노트 등)을 써 달라는 요청. 주지 않은 정보가 무엇인지도 사실 목록에 드러나게 한다
6. 영어 기술 문서 일부. 명령·옵션·한계가 있다
7. 여러 문단에 걸쳐 같은 결론이 반복되고, 어느 대상에나 붙일 수 있는 도입과 결론이 있는 한국어 글
8. 이미 잘 쓰인 한국어 글. 사용자는 고칠 곳이 없으면 그대로 두라고 한다
9. 작성자의 개성·의견·유머가 있는 한국어 개인 글(블로그, 회고 등). 사용자는 말투를 유지해 달라고 한다
10. 공손한 한국어 업무 이메일이나 안내문. 인사, 요청 행동, 기한이 있다
11. 문제점 진단만 요청하고 고친 글은 쓰지 말라는 요청
12. 조건과 불확실성이 있는 한국어 회의록이나 보고서를 정해진 분량으로 요약해 달라는 요청

전체에 걸쳐 다음이 각각 두 사례 이상에 나오게 한다: 수치와 측정 범위, 비용, 예외나 적용 조건, 불확실성이나 계획 단계의 표현, 인용문이나 코드·링크·설정 키, 필요한 부정 대조, 실제로 세 항목인 목록.
주제(업종, 분야, 제품)는 사례마다 서로 다르게 한다. 문장 몇 개짜리 짧은 입력만 만들지 말고, 최소 5개 사례는 3문단 이상 또는 600자 이상으로 쓴다. 사례 8, 9의 원문은 실제 사람이 쓴 것처럼 자연스럽고 좋은 글이어야 한다.

각 사례의 필드:
- id: 영문 소문자와 하이픈
- task: rewrite(기존 글 수정), draft(사실로 새 글 작성), diagnose(진단만), summarize(요약), noop-check(고칠 게 없으면 그대로 두라는 요청) 중 하나
- genre, language(ko, en, ko-en 중 하나)
- request: 사용자가 실제로 할 법한 요청문. 평가 기준을 요청문에 적지 않는다
- input: 원문 또는 사실 목록
- must_preserve: 결과에 남아야 하는 핵심 정보. input에 있는 내용만 쓴다. 요약·진단이면 그 작업 범위 안에서 지켜야 할 것만 쓴다
- must_not: 결과에 있으면 안 되는 변경(새 사실 추가, 상태 변경, 조건 삭제, 표기 변경, 범위 이탈 등)
- exact: input에 글자 그대로 들어 있는 문자열 가운데 결과에도 글자 그대로 남아야 하는 것(코드, 명령, 경로, 링크 대상, 설정 키, 인용문 안쪽, 고유 이름). 해당 없거나 진단·요약처럼 원문을 다시 쓰지 않는 작업이면 빈 배열
- notes: 이 사례가 무엇을 시험하는지 한두 문장

특정 문구와 똑같아야만 통과하는 기준은 만들지 않는다. 여러 좋은 결과가 모두 통과할 수 있어야 한다.`

const ITEM = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    task: { type: 'string', enum: ['rewrite', 'draft', 'diagnose', 'summarize', 'noop-check'] },
    genre: { type: 'string' },
    language: { type: 'string', enum: ['ko', 'en', 'ko-en'] },
    request: { type: 'string' },
    input: { type: 'string' },
    must_preserve: { type: 'array', items: { type: 'string' } },
    must_not: { type: 'array', items: { type: 'string' } },
    exact: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
  required: ['id', 'task', 'genre', 'language', 'request', 'input', 'must_preserve', 'must_not', 'exact', 'notes'],
  additionalProperties: false,
}
const SCHEMA = { type: 'object', properties: { cases: { type: 'array', items: ITEM, minItems: 12, maxItems: 12 } }, required: ['cases'], additionalProperties: false }

{
  const box = makeSandbox()
  const args = [
    '-p', PROMPT,
    '--output-format', 'stream-json', '--verbose',
    '--model', options.model,
    '--effort', options.effort,
    '--tools', '',
    '--setting-sources', 'project',
    '--strict-mcp-config',
    '--no-session-persistence',
    '--json-schema', JSON.stringify(SCHEMA),
  ]
  const run = await runClaude({ claude: options.claude, args, cwd: box.work, env: box.env, timeoutMs: 20 * 60 * 1000 })
  box.cleanup()
  const stream = parseStream(run.stdout)
  const cases = stream.result?.structured_output?.cases
  writeJson(join(ROOT, 'evals/holdout/generation.json'), {
    at: new Date().toISOString(),
    model: { requested: options.model, responses: stream.models },
    effort: options.effort,
    cli: cliVersion(options.claude),
    tools: 'none (--tools "")',
    promptSha256: sha256(PROMPT),
    prompt: PROMPT,
    status: cases ? 'ok' : 'error',
    durationMs: stream.result?.duration_ms ?? null,
    usage: usageOf(stream.result),
    costUsd: stream.result?.total_cost_usd ?? null,
  })
  if (!cases) {
    console.error('사례를 받지 못했다', run.stderr.slice(-500), stream.result?.result?.slice?.(0, 500))
    process.exit(1)
  }
  writeJson(outFile, cases.map((item) => ({ ...item, origin: 'holdout-2026-10-27', overlaps_skill_examples: false })))
  console.log(`사례 ${cases.length}개 → ${options.out}`)
}
