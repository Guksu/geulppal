# geulppal · 글빨

A Claude skill that cuts hype, repetition and translationese when Claude writes or edits documents. When you give it only code or notes and ask it to write, it sticks to facts found in that material; when it edits, it keeps facts, numbers, conditions and the author's voice. It focuses on Korean writing such as READMEs, PR descriptions, proposals, introductions and emails, and also works on English text.

I built it because every time I asked Claude to write a README or a report, I had to strip out the same modifiers and filler again.

[한국어](README.ko.md) · [Installation](#installation) · [Benchmark](evals/results/README.md) · [Evaluation reports](evals/results/REPORT.md): [2nd](evals/results/REPORT-human.md) · [3rd](evals/results/REPORT-readme.md) · [4th](evals/results/REPORT-draft-readme.md) · [5th](evals/results/REPORT-draft-memo.md) · [6th](evals/results/REPORT-draft-blog.md) · [7th](evals/results/REPORT-draft-fiction.md)

> **Before** NoteBox empowers users to seamlessly leverage tags to unlock effortless note discovery.
>
> **After** NoteBox lets users find notes by tag.

This is an illustrative example, not a benchmark result. The skill keeps numbers, conditions and known limitations. It does not turn "under review" into "done", and it does not invent features or results to make text sound specific. Sentences that are already accurate stay as they are. It does not detect AI-written text or promise to pass AI detectors.

## Benchmark

Claude Code was run with and without geulppal on the same requests, model and settings. Each version was frozen before it was checked on unseen cases, and each case ran twice per condition. A different model from the writer judged the results.

**Writing from scratch**: Claude got only the code of a public repository from before 2022 (README removed) and the request "write a Korean README for this package". The judge model read the same code and checked that every command, function, number and link in the result was backed by it.

| README drafts | Without geulppal | geulppal 0.3 | geulppal 0.4.0 | geulppal 0.4.1 |
|---|---|---|---|---|
| Only claims backed by the code: 4 unseen cases | 3/8 | 6/8 | 7/8 | (not run) |
| Same: 5 cases added after 0.4.0 was frozen | 9/10 | 9/10 | 6/10 | 10/10 (fixed after seeing these) |
| Same: 4 cases added before 0.4.1 was written | 2/8 | (not run) | 8/8 | 8/8 |
| Judge model quality comparison (against 0.4.0) | 0 to 5 | 1 to 5 | | 2 to 7 |
| Blind comparison by a person (against 0.4.0) | 0 to 3 (3 about the same) | 1 to 1 (2 about the same) | | (not done) |

- Without geulppal, READMEs often described behavior opposite to the code (a function that returns the lowest-scored candidates first was described as "highest first") or added external links and supported platforms that the code did not show.
- 0.3 was accurate but sometimes left out usage examples for the features it listed, or why the package exists. 0.4 adds guidance for writing from scratch. In a blind comparison, the repository owner picked the 0.4.0 README over the human-written README from the same commit 8 to 0.
- 0.4.0 sometimes linked to dependency docs that the code never mentions (`date-fns.org`). 0.4.1 only links to addresses found in the material. On the cases written after this fix, 0.4.0 added no such links either, so the difference was not confirmed there, and the judge model slightly preferred 0.4.0 on quality.

When Claude got only a memo and was asked for a press release, notice, report or proposal (13 memos taken from policy news articles published 2018–2022), the gap was larger.

| Documents written from memos | Without geulppal | geulppal 0.4.1 |
|---|---|---|
| Only claims backed by the memo: 8 dev and unseen cases | 5/16 | 15/16 |
| Same: 5 cases unseen until the end | 4/10 | 9/10 |
| Judge model quality comparison | 0 to 6 | |
| Blind comparison by a person | 1 to 3 (1 about the same) | |

- Without geulppal, Claude often wrote planned actions from the memo (`권고·지도할 계획` "plans to recommend and guide") as if they had happened, or added expected benefits that the memo did not mention.
- In a blind comparison of press releases against the original human-written articles, the human articles were picked 2 to 1. The judge model picked the geulppal versions instead.

When Claude got only a writer's memo or one or two lines and was asked for a blog post or essay (16 first-person posts by policy reporters, 2019–2022), invented experiences were the main problem.

| Blog posts and essays | Without geulppal | geulppal 0.4.1 | geulppal 0.4.3 |
|---|---|---|---|
| Only experiences found in the input: 12 unseen cases | 6/24 | 10/16 | 22/24 |
| Same: cases with only one or two lines of input | 0/8 | 0/6 | 8/8 |
| Judge model quality comparison (against 0.4.3) | 4 to 0 | 3 to 1 | |
| Blind comparison by a person (against 0.4.3) | 2 to 2 | 0 to 0 (4 about the same) | |

- Without geulppal, each post added on average 2.6 to 5.8 scenes, inner thoughts or realisations that were not in the memo. With 0.4.3 the average was 0.1.
- Given only one or two lines, 0.4.3 writes a short post from them and asks for the experiences it would need to write more. It invents nothing, but the result is short if you expected a full post.
- The judge model preferred the other versions on quality, mostly because 0.4.3 split short personal stories into many subheadings and lists.
- In a blind comparison against the original human-written posts, the human posts were picked 5 to 0 (1 about the same). 0.4.3 no longer invents experiences, but it does not read as well as a person's own account.

When Claude got only one or two lines or a settings memo (some with the opening of a public-domain Korean short story as a style reference) and was asked for a short story, both versions followed the requested conditions about equally often, and the judge model preferred the geulppal stories.

| Short stories | Without geulppal | geulppal 0.4.3 |
|---|---|---|
| Kept the requested conditions and settings: 8 unseen cases | 12/16 | 10/16 |
| Within the requested length (6 cases that asked for one) | 3/12 | 5/12 |
| Judge model quality comparison | 0 to 10 | |

- The judge model picked 0.4.3 because it showed feelings through actions and objects instead of naming them, and did not close on a moral. There has been no blind comparison by a person yet.
- When the request set no length and gave only one or two lines, 0.4.3 wrote shorter stories than Claude without geulppal (962 characters excluding spaces on average over 6 cases, against 1,618).
- Both versions sometimes dropped a requested dialect or copied sentences from the style reference almost word for word.

**Editing**: Claude was asked to polish human-written and model-written text.

| Results that kept facts, conditions and status | Without geulppal | geulppal 0.2 | geulppal 0.3 | geulppal 0.4 |
|---|---|---|---|---|
| 16 human-written README cases (open-source projects, 2018–2022) | 20/32 | 30/32 | 31/32 | 31/32 (0.4.0) |
| 9 human-written cases (public posts from 2018–2022) | 8/18 | 16/18 | 16/18 | (not run) |
| 12 model-written documents | 12/24 | 18/24 | (not used as unseen cases) | (not run) |

- Without geulppal, Claude often added promises or experiences that were not in the original. It also often turned hearsay ("it is said to be possible") into a plain statement ("it is possible").
- 0.3 still sometimes turns a guess into a statement (`가장 어려울 텐데` "probably the hardest" → `가장 어려운 일은` "the hardest is") or narrows a scope (`온라인으로` "online" → `온라인으로만` "only online"). 0.4 did not change the editing guidance.
- The judge model almost always preferred the edited text over the human-written original. In a blind comparison by the repository owner, 16 of 22 pairs of edited posts were rated "about the same". For editing, geulppal's effect is on accuracy; it does not show that the text reads better.
- With geulppal, a run cost about 1.5 to 1.7 times as much as without it for README drafts, about 2 times for documents written from memos and for blog posts, about 1.5 times for short stories, and about 2.2 to 2.5 times for editing.

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

Only the three files in `skills/geulppal/` (about 25 KB) are installed. The evaluation data and scripts are not.

## Try it

After installing, ask Claude:

> /geulppal Write a README for this repository.

> /geulppal Tighten README.md. Keep the install commands and the known limitations.

> /geulppal Write a short project introduction from the facts below. Start with why I built it.

When you ask for text to paste, it returns only the finished text. It adds a short note only when something needs your input, such as a fact missing from the material (whether the package is published, the unit of a number).

Claude can also pick the skill without `/geulppal`, for requests like "polish this README" or "make it sound less like AI". The skill description was revised after seeing these requests, so this is not an independent result. [Selection results](evals/results/2026-10-27-trigger/trigger-v0.2.1.md) (in Korean)

| Requests | Runs where Claude picked the skill |
|---|---|
| Writing requests | 23 of 24 |
| Code, lookup and AI-detection requests | 0 of 20 |

## What's inside

- [SKILL.md](skills/geulppal/SKILL.md): writing from scratch, meaning preservation, editing decisions, Korean and English style, output format
- [Document types](skills/geulppal/references/document-types.md): READMEs, PRs, proposals, introductions and emails
- [Editing examples](skills/geulppal/references/editing-examples.md): sentences to change and sentences to keep
- [Research notes](research/findings.md): past README edits, public skills and writing guides behind the rules
- [Korean sources](research/korean-sources.md): rules drawn from National Institute of Korean Language articles on translationese, and the human-written evaluation texts
- [Evaluation](evals/README.md): cases, judging criteria, scripts and how to rerun them

The skill instructions and evaluation materials are written in Korean.

## Feedback

If geulppal leaves an awkward sentence or changes the meaning of your text, please [open an issue](https://github.com/Guksu/geulppal/issues) with the original, your request and the result. Reports like these can be added as evaluation cases.

## License

[MIT](LICENSE) © 2026 Guksu
