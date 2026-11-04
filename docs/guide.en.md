# geulppal full guide

A short introduction and installation are in the [README](../README.en.md). This guide covers what geulppal fixes, every install option, how it works, what it does not do, the evaluations, the repository layout and how to contribute.

한국어: [guide.md](guide.md)

Contents: [About](#about) · [What it fixes](#what-it-fixes) · [Installation](#installation) · [Updating](#updating) · [How it works](#how-it-works) · [What it does not do](#what-it-does-not-do) · [Evaluation](#evaluation) · [What's inside](#whats-inside) · [Repository layout](#repository-layout) · [Development](#development) · [Contributing](#contributing)

## About

geulppal turns the Korean that Claude writes (answers, task reports, PR and commit descriptions, documents) into the Korean people actually use. Claude's Korean often mixes in English expressions translated word for word, names coined during a task, and sentences that follow English word order. geulppal finds these spots and fixes them without changing facts, conditions or the author's voice.

The test is simple: would a Korean reader who does not know the English original understand the sentence right away? The expressions in the table below are clues for finding what to fix, not a list of banned words.

## What it fixes

| Korean Claude often writes | With geulppal |
|---|---|
| English expressions translated word for word, such as `조용히 버려집니다` ("is silently discarded") or `조용히 실패합니다` ("fails silently") | Says what actually happens: `오류 없이 버려집니다` ("is discarded without an error") |
| `진실의 원천이 둘` ("two sources of truth"), `커버리지가 얇습니다` ("coverage is thin"), `타입이 거짓말을 합니다` ("the types lie") | `기준이 되는 곳이 둘`, `테스트가 적습니다`, `타입이 실제 값과 맞지 않습니다` |
| Names coined during the task, used without explanation (`스냅샷 게이트에서 드리프트가 잡혀서`, "drift caught at the snapshot gate") | Explains them in plain words the first time |
| Strings of nouns (`입력값 검증 실패 처리 로직 개선`) | Unpacks them with verbs (`입력값 검증에 실패했을 때의 처리를 고쳤다`) |
| Explanations reduced to arrows and colons (`원인: 캐시 키 충돌 → 노출 가능성`) | Full sentences with verbs; tables and list items stay as they are |
| Translationese such as `~을 가지고 있다`, `~에 있어서`, `~되어지다` | `~이 있다`, `~에서`, `~되다` |
| Verbal tics like `결론부터 말하면` ("to start with the conclusion") in every paragraph | Drops the tic and starts with the content |
| Hype and stock figures of speech (`혁신적인`, `판도를 바꾸는`) | Describes the actual behavior and results |
| Over-translating technical names: key → `열쇠` (a key for a lock), feature → `특징` | Keeps technical names the way developers say them (`키`, `피처`) |
| Turning hearsay into fact while polishing (`가능하다고 합니다` → `가능합니다`) | Keeps hearsay, guesses, conditions and scope words (`만`, `등`) as they are |

Before-and-after pairs taken from real results are in [Sentence comparisons](comparisons.en.md).

## Installation

Install once. The evaluations were run in Claude Code only.

### Claude Code

Run in a terminal in your project folder. The [skills CLI](https://skills.sh/docs/cli) puts the skill in `.claude/skills/geulppal/`.

```bash
npx skills add Guksu/geulppal --skill geulppal        # this project only
npx skills add Guksu/geulppal --skill geulppal -g     # every project
```

You can also copy it by hand.

```bash
git clone --depth 1 https://github.com/Guksu/geulppal.git
mkdir -p ~/.claude/skills
cp -R geulppal/skills/geulppal ~/.claude/skills/        # every project
# For one project only, copy it to that project's .claude/skills/
```

If you already have a skill with the same name, compare them first.

### Claude on the web or desktop

Zip the `skills/geulppal/` folder and upload it. The ZIP must contain `geulppal/SKILL.md`.

```bash
git clone --depth 1 https://github.com/Guksu/geulppal.git
cd geulppal/skills && zip -r geulppal.zip geulppal
```

[How to upload a skill ZIP](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

### Other agents

The skills CLI can also install into other agents (`-a <agent>`). geulppal has not been evaluated with them.

Only the three files in `skills/geulppal/` (about 38 KB) are installed. The evaluation data and scripts are not.

## Updating

Check the [change history](https://github.com/Guksu/geulppal/pulls?q=is%3Apr+is%3Amerged) before updating.

- If you used the skills CLI, run `npx skills update geulppal` in the project where you installed it. Add `-g` for a global install.
- If you copied it by hand, fetch the repository again and replace the whole `skills/geulppal/` folder.
- On Claude web or desktop, upload a freshly zipped folder.

## How it works

1. geulppal is a single skill. Once installed, Claude reads only its description at the start of a session.
2. When you ask Claude to polish Korean text, it opens geulppal. To call it directly, start your request with `/geulppal`.
3. Claude reads `SKILL.md` and works in this order:
   - Decide what the sentence actually means: what happens, who does what.
   - Write that in words the reader actually uses. Technical names are not translated.
   - Reread for anything that only makes sense if you know the English original.
   - Check that the result carries the same facts, conditions and certainty as the original.
4. For requests to write from scratch (a README, a report, a blog post), Claude also reads the content rules in [`references/document-types.md`](../skills/geulppal/references/document-types.md). It does not add facts that are not in the material.
5. When you ask for text to paste, you get only the finished text. A short note follows only when something needs checking, such as a fact left blank because the material did not have it.

| Request | What geulppal does |
|---|---|
| "방금 쓴 답을 자연스러운 한국어로 다듬어 줘" ("Polish the answer you just wrote into natural Korean") | Returns the finished text with word-for-word translations, unexplained names and awkward sentences fixed |
| "이 PR 설명 영어 직역 같아. 읽기 좋게 고쳐줘" ("This PR description reads like a literal translation; make it readable") | Polishes the sentences while keeping the same facts and test scope |
| "이 문장 번역투 고쳐줘" ("Fix the translationese in this sentence") | Rewrites expressions such as `~에 있어서` and `~을 가지고 있다` with the same meaning |
| "AI 티 빼줘" ("Make it less AI-sounding") | Removes hype, repetition, formulaic intros and conclusions, and chat-style remarks |
| "이 저장소 README를 한국어로 써 줘" ("Write a Korean README for this repository") | Drafts it using only facts found in the code |

With the 0.5 description, Claude picked the skill in all 18 runs of requests to polish Korean text, and in none of 16 runs of requests such as bug fixes, development questions or AI detection. It did not pick it for the 2 runs of a request to polish an English docs paragraph, so call `/geulppal` directly for English text. [Automatic selection results](../evals/results/2026-11-03-trigger/trigger-v0.5.2.md) (in Korean)

> A **skill** is a set of instructions an AI agent reads when it needs them. geulppal takes up only its description most of the time, and reads its main file and references only when polishing text.

## What it does not do

- It does not detect AI-written text or promise to pass AI detectors.
- It does not mechanically delete particular words or punctuation. Established technical terms (캐시 cache, 렌더링 rendering, 롤백 rollback) stay.
- It does not change code blocks, commands, paths, configuration keys or quotations just to polish the prose.
- Sentences that are already natural and accurate stay as they are. Shortening the text is not the goal.
- Results for writing from scratch were mixed across case sets. Polishing finished text is the recommended use.

## Evaluation

geulppal was compared with and without the skill, using the same requests, model and settings. After freezing each version, it was checked on cases written before seeing any results.

- **Korean wording (0.5.2, 2026-11-03):** On 12 unseen cases, Claude polished answers written without geulppal, twice each. The 24 places marked in the originals were still present in 18 of 48 checks without geulppal and 8 of 48 with 0.5.2. Judging the polished text again found 41 against 28 marked places, and the meaning was kept in 22 against 23 of 24 runs.
- **Checking the judge:** When the repository owner rated 10 sentences, 7 agreed with the judge model's marks.
- **Keeping the meaning (0.3.0, 2026-10-27):** When polishing 16 human-written READMEs, results that kept facts and conditions were 20 of 32 without geulppal and 31 of 32 with geulppal 0.3.0. This was not measured again with the current version.

The current skill is 0.5.3. Unlike 0.5.2, it only clarifies the priority in its instructions so that proposals and promises in the original are not deleted; this change has not been evaluated yet. Method and full results are in [Sentence comparisons](comparisons.en.md), the [benchmark](../evals/results/README.md) (in Korean) and the [evaluation method](../evals/README.md) (in Korean).

## What's inside

```text
skills/geulppal/                    the installed skill
├─ SKILL.md                         where Korean readers stumble · do not translate names · translationese · hype and repetition · keeping the meaning · output format
└─ references/
   ├─ document-types.md             content rules for writing from scratch · guidance for READMEs, PRs, proposals, blog posts, emails
   └─ editing-examples.md           sentences to fix and sentences to leave alone
```

## Repository layout

```text
geulppal/
├─ skills/geulppal/                 the installed skill
├─ docs/                            full guide · sentence comparisons
├─ evals/                           evaluation cases · judge instructions · results · frozen copies of evaluated versions (snapshots/)
├─ scripts/eval/                    run · judge · report · structure-check scripts
├─ research/                        design notes (Korean writing sources, a review of Orwell's rules, and more)
└─ AGENTS.md                        rules for working in this repository
```

## Development

| Command | What it checks |
|---|---|
| `node scripts/eval/check.mjs` | Structure check: evaluation case format, skill description length, document links, hashes of frozen versions, local paths leaking into public results. It does not call a model |
| `node scripts/eval/run.mjs` | Runs cases with `claude -p`, with isolated settings per condition |
| `node scripts/eval/judge.mjs` | Judges meaning, places where readers stumble, and pairwise quality with a judge model |

Runs and judging call real models and use your usage allowance. All commands and how to rerun them are in the [evaluation method](../evals/README.md) (in Korean).

## Contributing

The most useful contribution is a sentence that is still awkward after polishing. [Open an issue](https://github.com/Guksu/geulppal/issues) with the original, your request and the result. It will become an evaluation case for checking the next version.

When changing the skill, follow this order:

1. Add unseen evaluation cases and commit them before changing the skill.
2. After the change, put a copy in `evals/snapshots/` and record its hash.
3. Run the version without geulppal and the previous version with the same CLI version, and compare.
4. Report structure checks and real model runs separately. Never report an evaluation as passed if it was not run.

If you work with a coding agent, [`AGENTS.md`](../AGENTS.md) holds the shared rules.

### Related documents

- [Sentence comparisons](comparisons.en.md): before-and-after pairs from real results, and limitations
- [Benchmark](../evals/results/README.md) (in Korean): summary of evaluation rounds 1 to 8
- [8th evaluation report](../evals/results/REPORT-korean-natural.md) (in Korean): natural Korean in answers
- [Review of Orwell's writing rules](../research/orwell.md) (in Korean)
- [Korean writing sources](../research/korean-sources.md) (in Korean)
