/**
 * 평가 스크립트 공통 — 격리된 claude -p 실행, 스트림 해석, 해시, 경로 지우기, 동시 실행.
 *
 * 격리: 실행마다 임시 HOME·CLAUDE_CONFIG_DIR·작업 폴더를 새로 만든다. 사용자 설정·전역 스킬·플러그인·MCP·이전 대화가
 * 섞이지 않게 하고, 사용자의 전역 설정 파일은 건드리지 않는다. 환경 변수는 실행과 인증에 필요한 것만 넘긴다(값은 기록하지 않는다).
 */
import { spawn, execFileSync } from 'node:child_process'
import { createHash, randomUUID } from 'node:crypto'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = fileURLToPath(new URL('../../..', import.meta.url)).replace(/\/$/, '')

// 넘기는 환경 변수 — 실행 경로, 프록시·인증서, API 주소, 인증 토큰(있을 때만). 이름만 기록한다
export const ENV_KEEP = [
  'PATH', 'LANG', 'LC_ALL', 'TERM',
  'HTTPS_PROXY', 'https_proxy', 'NO_PROXY', 'no_proxy',
  'SSL_CERT_FILE', 'NODE_EXTRA_CA_CERTS', 'NODE_OPTIONS', 'REQUESTS_CA_BUNDLE', 'CURL_CA_BUNDLE',
  'ANTHROPIC_BASE_URL', 'ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN',
]

export const sha256 = (data) => createHash('sha256').update(data).digest('hex')

const walk = (dir) =>
  readdirSync(dir)
    .sort()
    .flatMap((name) => (statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)]))

/** 폴더 해시 — 상대 경로와 내용으로 만든다. 스킬 스냅샷을 구별할 때 쓴다 */
export const treeHash = (dir) => {
  const hash = createHash('sha256')
  for (const file of walk(dir)) {
    hash.update(`${relative(dir, file)}\0`)
    hash.update(readFileSync(file))
    hash.update('\0')
  }
  return hash.digest('hex')
}

export const fileHash = (file) => sha256(readFileSync(file))

export const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'))
export const writeJson = (file, value) => {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

export const cliVersion = (claude = 'claude') => {
  try {
    return execFileSync(claude, ['--version'], { encoding: 'utf8' }).trim()
  } catch {
    return null
  }
}

/** 실행 하나의 격리 공간 — 이름에 조건·사례 정보를 넣지 않는다 */
export const makeSandbox = () => {
  const base = mkdtempSync(join(tmpdir(), 'run-'))
  for (const name of ['home', 'config', 'work']) mkdirSync(join(base, name))
  const env = Object.fromEntries(ENV_KEEP.filter((key) => process.env[key] !== undefined).map((key) => [key, process.env[key]]))
  env.HOME = join(base, 'home')
  env.CLAUDE_CONFIG_DIR = join(base, 'config')
  return {
    base,
    work: join(base, 'work'),
    config: join(base, 'config'),
    env,
    envNames: Object.keys(env).sort(),
    cleanup: () => rmSync(base, { recursive: true, force: true }),
  }
}

/** 스킬을 프로젝트 스킬로 설치한다(.claude/skills/geulppal). 스킬이 없는 조건도 빈 .claude 폴더를 둔다 */
export const installSkill = (work, skillDir) => {
  mkdirSync(join(work, '.claude'), { recursive: true })
  if (skillDir) cpSync(skillDir, join(work, '.claude', 'skills', 'geulppal'), { recursive: true })
}

export const runClaude = ({ claude = 'claude', args, cwd, env, timeoutMs }) =>
  new Promise((done) => {
    const started = Date.now()
    const child = spawn(claude, args, { cwd, env, stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      child.kill('SIGTERM')
      setTimeout(() => child.kill('SIGKILL'), 5000)
    }, timeoutMs)
    child.stdout.on('data', (chunk) => (stdout += chunk))
    child.stderr.on('data', (chunk) => (stderr += chunk))
    child.on('close', (code, signal) => {
      clearTimeout(timer)
      done({ code, signal, timedOut, stdout, stderr, wallMs: Date.now() - started })
    })
    child.on('error', (error) => {
      clearTimeout(timer)
      done({ code: 127, signal: null, timedOut, stdout, stderr: `${stderr}\n${error}`, wallMs: Date.now() - started })
    })
  })

/** stream-json 출력 해석 — 시작 정보, 결과, 도구 호출, 사용량 제한 */
export const parseStream = (stdout) => {
  const events = []
  for (const line of stdout.split('\n')) {
    if (!line.trim()) continue
    try {
      events.push(JSON.parse(line))
    } catch {
      events.push({ type: 'unparsed', line: line.slice(0, 500) })
    }
  }
  const init = events.find((e) => e.type === 'system' && e.subtype === 'init') ?? null
  const result = [...events].reverse().find((e) => e.type === 'result') ?? null
  const toolUses = events
    .filter((e) => e.type === 'assistant')
    .flatMap((e) => e.message?.content ?? [])
    .filter((block) => block.type === 'tool_use')
    .map((block) => ({ name: block.name, input: block.input }))
  const rateLimits = events.filter((e) => e.type === 'rate_limit_event').map((e) => e.rate_limit_info)
  const models = [...new Set(events.filter((e) => e.type === 'assistant').map((e) => e.message?.model).filter(Boolean))]
  return { events, init, result, toolUses, rateLimits, models }
}

/** 이 실행의 대화 기록(jsonl) — 임시 CLAUDE_CONFIG_DIR 안에만 있다 */
export const findTranscript = (configDir, sessionId) => {
  const projects = join(configDir, 'projects')
  if (!existsSync(projects)) return null
  for (const folder of readdirSync(projects)) {
    const file = join(projects, folder, `${sessionId}.jsonl`)
    if (existsSync(file)) return file
  }
  return null
}

export const readTranscript = (file) =>
  readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      try {
        return JSON.parse(line)
      } catch {
        return { type: 'unparsed' }
      }
    })

const textOf = (content) =>
  typeof content === 'string' ? content : (content ?? []).map((block) => block.text ?? (typeof block.content === 'string' ? block.content : '')).join('\n')

/**
 * 스킬 로딩 확인 — 대화 기록에서 /geulppal 명령 펼침과 SKILL.md 본문 주입을 찾는다.
 * 스킬 목록(skill_listing)에 geulppal이 보였는지, 참조 문서를 Read로 읽었는지도 함께 남긴다.
 */
export const skillEvidence = ({ transcript, skillDir, toolUses, base }) => {
  const users = transcript.filter((entry) => entry.type === 'user')
  const commandExpanded = users.some((entry) => textOf(entry.message?.content).includes('<command-name>/geulppal</command-name>'))
  const injected = users.find((entry) => textOf(entry.message?.content).includes('Base directory for this skill:') && textOf(entry.message?.content).includes('geulppal'))
  let bodyMatches = null
  if (injected && skillDir) {
    const skillText = readFileSync(join(skillDir, 'SKILL.md'), 'utf8')
    const body = skillText.replace(/^---[\s\S]*?\n---\n/, '').trim()
    bodyMatches = textOf(injected.message?.content).includes(body.slice(0, 2000))
  }
  const listing = transcript.filter((entry) => entry.type === 'attachment' && entry.attachment?.type === 'skill_listing').map((entry) => entry.attachment.content ?? '')
  const listedGeulppal = listing.some((content) => /(^|\n)- geulppal:/.test(content))
  const skillToolCalls = toolUses.filter((use) => use.name === 'Skill').map((use) => use.input?.skill ?? use.input?.command ?? JSON.stringify(use.input))
  const referenceReads = toolUses
    .filter((use) => use.name === 'Read' && typeof use.input?.file_path === 'string' && use.input.file_path.includes('/skills/geulppal/'))
    .map((use) => use.input.file_path.replace(/^.*\/skills\/geulppal\//, ''))
  const snapshot = transcript.find((entry) => entry.type === 'attachment' && entry.attachment?.type === 'prompt_snapshot')
  const systemPrompt = snapshot ? JSON.stringify(snapshot.attachment.systemPrompt ?? '') : null
  return {
    commandExpanded,
    skillBodyInjected: Boolean(injected),
    skillBodyMatchesInstalled: bodyMatches,
    listedGeulppal,
    skillToolCalls,
    referenceReads,
    // 실행 폴더 경로(그대로 쓴 것과 '-'로 바꾼 것)를 지운 시스템 프롬프트 해시 — 조건 사이에 시스템 프롬프트가 같은지 비교한다
    systemPromptHash: systemPrompt ? sha256(systemPrompt.split(base).join('<RUN>').split(base.replace(/[/.]/g, '-')).join('<RUN>')) : null,
  }
}

/** 공개 기록에서 로컬 경로를 지운다. URL 안의 경로(`…/ko/home/`)는 로컬 경로가 아니므로 남긴다 */
export const scrub = (text) =>
  typeof text === 'string'
    ? text
        .replace(/(?<![\w.-])\/(?:private\/)?(?:tmp|var\/folders)\/[^\s"'`)\]]*/g, '<tmp>')
        .replace(/(?<![\w.-])\/(?:Users|home)\/[^\s"'`)\]]*/g, '<home>')
    : text

export const usageOf = (result) => {
  const usage = result?.usage ?? {}
  return {
    inputTokens: usage.input_tokens ?? null,
    cacheCreationInputTokens: usage.cache_creation_input_tokens ?? null,
    cacheReadInputTokens: usage.cache_read_input_tokens ?? null,
    outputTokens: usage.output_tokens ?? null,
    thinkingTokens: usage.output_tokens_details?.thinking_tokens ?? null,
  }
}

/** 동시 실행 — 작업 함수 배열을 limit개씩 */
export const pool = async (jobs, limit) => {
  const results = new Array(jobs.length)
  let next = 0
  const worker = async () => {
    while (next < jobs.length) {
      const index = next++
      results[index] = await jobs[index]()
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, jobs.length) }, worker))
  return results
}

export const parseArgs = (argv, defaults) => {
  const options = { ...defaults, _: [] }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (!arg.startsWith('--')) {
      options._.push(arg)
      continue
    }
    const key = arg.slice(2)
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) options[key] = true
    else {
      options[key] = next
      i++
    }
  }
  return options
}

export const newSessionId = () => randomUUID()
