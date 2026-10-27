# geulppal · 글빨

A Claude skill that cuts hype, repetition and translationese from documents while keeping facts, numbers, conditions and the author's voice. It focuses on Korean writing such as READMEs, PR descriptions, proposals, introductions and emails, and also works on English text.

I built it because every time I edited a README, I had to strip out the same modifiers and filler again.

[한국어](README.ko.md) · [Installation](#installation) · [Benchmark](evals/results/README.md) · [Evaluation report](evals/results/REPORT.md)

> **Before** NoteBox empowers users to seamlessly leverage tags to unlock effortless note discovery.
>
> **After** NoteBox lets users find notes by tag.

This is an illustrative example, not a benchmark result. The skill keeps numbers, conditions and known limitations. It does not turn "under review" into "done", and it does not invent features or results to make text sound specific. Sentences that are already accurate stay as they are. It does not detect AI-written text or promise to pass AI detectors.

## Benchmark

Claude Code was run with and without geulppal on the same requests, model and settings. After the skill was frozen, a separate session wrote 12 unseen cases, and each case ran twice per condition. A different model from the writer judged the results.

| | Without geulppal | geulppal 0.2 |
|---|---|---|
| Results that kept facts, conditions and status | 12/24 | 18/24 |
| Median time per run | 10.0 s | 14.1 s |

- Without geulppal, Claude often added promises or converted figures that were not in the original. It also often turned an offered condition into a settled one.
- Whether the text reads better could not be confirmed: few pairs were comparable and the judgments often flipped when the order was swapped.
- With geulppal, Claude still sometimes widened a condition: `해외에 계셔서` ("because you are abroad") became `해외 체류 등으로` ("because you are abroad or similar"). In one diagnosis-only request, it also suggested replacement wording.
- geulppal roughly doubled the cost per run.

These are model judgments on a small sample, not human evaluation. [Method, per-case results and limitations](evals/results/README.md) (in Korean)

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

Only the three files in `skills/geulppal/` (about 21 KB) are installed. The evaluation data and scripts are not.

## Try it

After installing, ask Claude:

> /geulppal Tighten README.md. Keep the install commands and the known limitations.

> /geulppal Write a short project introduction from the facts below. Start with why I built it.

When you ask for text to paste, it returns only the finished text. It adds a short note only when something needs your input, such as a fact that was missing from the original.

Claude can also pick the skill without `/geulppal`, for requests like "polish this README" or "make it sound less like AI". The skill description was revised after seeing these requests, so this is not an independent result. [Selection results](evals/results/2026-10-27-trigger/trigger-v0.2.1.md) (in Korean)

| Requests | Runs where Claude picked the skill |
|---|---|
| Writing requests | 23 of 24 |
| Code, lookup and AI-detection requests | 0 of 20 |

## What's inside

- [SKILL.md](skills/geulppal/SKILL.md): meaning preservation, editing decisions, Korean and English style, output format
- [Document types](skills/geulppal/references/document-types.md): READMEs, PRs, proposals, introductions and emails
- [Editing examples](skills/geulppal/references/editing-examples.md): sentences to change and sentences to keep
- [Research notes](research/findings.md): past README edits, public skills and writing guides behind the rules
- [Evaluation](evals/README.md): cases, judging criteria, scripts and how to rerun them

The skill instructions and evaluation materials are written in Korean.

## Feedback

If geulppal leaves an awkward sentence or changes the meaning of your text, please [open an issue](https://github.com/Guksu/geulppal/issues) with the original, your request and the result. Reports like these can be added as evaluation cases.

## License

[MIT](LICENSE) © 2026 Guksu
