/**
 * 도구 없는 새 세션 한 번 — 자료를 만들거나 검수할 때 쓴다(부풀린 글, 메모 등). 작성·판정 실행과 같은 격리 공간을 쓴다.
 */
import { makeSandbox, parseStream, runClaude, scrub, usageOf } from './common.mjs'

export const callIsolated = async ({ claude = 'claude', effort = 'high', prompt, model, systemPrompt, schema, timeoutMs = 15 * 60 * 1000 }) => {
  const box = makeSandbox()
  const args = [
    '-p', prompt,
    '--output-format', 'stream-json', '--verbose',
    '--model', model,
    '--effort', effort,
    '--tools', '',
    '--setting-sources', 'project',
    '--strict-mcp-config',
    '--no-session-persistence',
    ...(systemPrompt ? ['--system-prompt', systemPrompt] : []),
    ...(schema ? ['--json-schema', JSON.stringify(schema)] : []),
  ]
  const run = await runClaude({ claude, args, cwd: box.work, env: box.env, timeoutMs })
  box.cleanup()
  const stream = parseStream(run.stdout)
  return {
    text: typeof stream.result?.result === 'string' ? stream.result.result : '',
    structured: stream.result?.structured_output ?? null,
    meta: {
      model,
      responses: Object.keys(stream.result?.modelUsage ?? {}),
      exitCode: run.code,
      durationMs: stream.result?.duration_ms ?? null,
      usage: usageOf(stream.result),
      costUsd: stream.result?.total_cost_usd ?? null,
      error: stream.result && !stream.result.is_error ? null : scrub((stream.result?.result ?? run.stderr ?? '').slice(-500)),
    },
  }
}
