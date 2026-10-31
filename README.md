# geulppal · 글빨

A Claude skill that turns Claude's Korean into the Korean people actually use. It fixes English expressions translated word for word, such as `조용한 실패` for "silent failure", names coined during a task and used without explanation, explanations written as strings of nouns or arrows, translationese and hype. It keeps facts, numbers, conditions and the author's voice. It focuses on Korean text such as Claude's replies and task reports, READMEs, PR descriptions and commit messages, and can also cut hype and repetition in English text.

I built it because every time Claude answered in Korean, I had to reread and fix phrases that sounded like translated English and sentences that read awkwardly.

[한국어](README.ko.md) · [Installation](#installation) · [Benchmark](evals/results/README.md) · [Evaluation reports](evals/results/REPORT.md): [2nd](evals/results/REPORT-human.md) · [3rd](evals/results/REPORT-readme.md) · [4th](evals/results/REPORT-draft-readme.md) · [5th](evals/results/REPORT-draft-memo.md) · [6th](evals/results/REPORT-draft-blog.md) · [7th](evals/results/REPORT-draft-fiction.md)

> **Before** 설정 파일이 없으면 이 함수는 조용히 실패합니다. 환경 변수가 진실의 원천이고, 테스트는 행복한 경로만 다룹니다.
> ("Without a config file this function fails silently. The environment variables are the source of truth, and the tests cover only the happy path.")
>
> **After** 설정 파일이 없으면 이 함수는 오류를 내지 않고 넘어갑니다. 기준이 되는 값은 환경 변수에 있고, 테스트는 문제가 없을 때의 흐름만 다룹니다.
> (The same content, with each English idiom replaced by the behavior or state it refers to.)

This is an illustrative example, not a benchmark result. Terms readers already use, such as 캐시 (cache), 렌더링 (rendering) or 롤백 (rollback), are not forced into native words. The skill does not turn "under review" into "done", and it does not invent facts to make text sound specific. Sentences that are already natural and accurate stay as they are. It does not detect AI-written text or promise to pass AI detectors.

## Evaluation so far

Up to 0.4, the evaluations measured whether geulppal changes the meaning of a text when it edits, and whether it invents content that is not in the material when it writes. They did not measure the Korean wording that 0.5.0 now focuses on (word-for-word translations, unexplained names, awkward sentence structure). None of the 1,318 Korean results from those evaluations contained expressions like `조용한 실패`. A separate evaluation built from real Claude replies is planned.

| What was measured | Without geulppal | With geulppal |
|---|---|---|
| Kept facts and conditions when polishing 16 human-written READMEs | 20/32 | 31/32 (0.3) |
| Same, when polishing 9 other human-written texts | 8/18 | 16/18 (0.3) |
| Wrote only claims backed by the code when writing a README from code (4 unseen cases) | 2/8 | 8/8 (0.4.1) |
| Wrote only claims backed by the memo when writing a work document from a memo (5 unseen cases) | 4/10 | 9/10 (0.4.1) |
| Wrote only experiences found in the input when writing a blog post (12 unseen cases) | 6/24 | 22/24 (0.4.3) |
| Kept the requested conditions when writing a short story (8 unseen cases) | 12/16 | 10/16 (0.4.3) |

- Without geulppal, Claude often turned hearsay ("it is said to be possible") into a plain statement ("it is possible") or added promises and experiences that were not in the original.
- In a blind comparison by the repository owner, 16 of 22 pairs of polished texts were rated "about the same". Accuracy improved, but there is no evidence yet that the text reads better.
- From 0.5.0, the content rules for writing from scratch (reading the code, links, numbers in memos, personal experiences) live in [document types](skills/geulppal/references/document-types.md). The results above come from versions that had these rules in the main file, and were not measured again after the move.
- With geulppal, a run cost about 1.5 to 2.5 times as much as without it.

The samples are small, and the blind comparisons had a single rater. [Method, per-case results and limitations](evals/results/README.md) (in Korean)

## Installation

**Claude Code**: copy the skill folder. To use it in every project, put it in your personal skills folder. To use it in one project, put it in that project's `.claude/skills/`.

```bash
git clone https://github.com/Guksu/geulppal.git
mkdir -p ~/.claude/skills
cp -r geulppal/skills/geulppal ~/.claude/skills/geulppal
```

If you already have a skill with the same name, compare them first.

**Claude web and desktop**: zip the `skills/geulppal/` folder and upload it. The zip must contain `geulppal/SKILL.md`.

```bash
cd geulppal/skills && zip -r geulppal.zip geulppal
```

[Where Claude Code looks for skills](https://code.claude.com/docs/en/skills) · [Creating a skill zip](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

Only the three files in `skills/geulppal/` (about 34 KB) are installed. The evaluation data and scripts are not.

## Try it

After installing, ask Claude something like this:

> /geulppal 방금 한 작업을 한국어로 정리해 줘. ("Summarize what you just did, in Korean.")

> /geulppal 이 PR 설명에서 영어를 그대로 옮긴 말과 어색한 문장을 고쳐 줘. ("Fix the word-for-word English and awkward sentences in this PR description.")

> /geulppal 이 저장소의 README를 한국어로 써 줘. ("Write a Korean README for this repository.")

When you ask for text to paste, you get only the finished text. It adds a short note only when something needs checking, such as a fact missing from the material (whether a package is published, a number without a unit).

Without `/geulppal`, requests such as "make it sound natural", "fix the translationese" or "make it less AI-sounding" can also lead Claude to pick the skill. The automatic selection results below were measured with the 0.2.1 description. The description was revised after seeing these requests, so they are not an independent result, and they were not measured again after the description changed in 0.5.0. [Automatic selection results](evals/results/2026-10-27-trigger/trigger-v0.2.1.md) (in Korean)

| Request | Runs that picked the skill |
|---|---|
| Writing requests | 23 of 24 |
| Code, lookup and AI-detection requests | 0 of 20 |

## What's inside

- [SKILL.md](skills/geulppal/SKILL.md): where Korean readers stumble (word-for-word translations, unfamiliar names, sentence structure, translationese), hype and repetition, keeping the meaning, and output format
- [Document types](skills/geulppal/references/document-types.md): content rules for writing from scratch, and guidance for READMEs, PRs, proposals, blog posts and emails
- [Sentence examples](skills/geulppal/references/editing-examples.md): sentences to fix and sentences to leave alone
- [Research notes](research/findings.md): guidance taken from earlier README edits, public skills and writing resources
- [Korean sources](research/korean-sources.md): guidance from the National Institute of Korean Language's special issue on translationese and other sources, and the human-written evaluation texts
- [Evaluation method](evals/README.md): evaluation cases, judging rules, scripts and how to rerun them

The skill instructions and evaluation data are written in Korean.

## Feedback

If geulppal leaves an awkward phrase, especially one that reads like English translated word for word, or changes the meaning of your text, please [open an issue](https://github.com/Guksu/geulppal/issues) with the original, your request and the result. Reports like these can be added as evaluation cases.

## License

[MIT](LICENSE) © 2026 Guksu
