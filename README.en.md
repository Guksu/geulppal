# geulppal · 글빨

A Claude skill that turns the Korean Claude writes into the Korean people actually use. It fixes English expressions translated word for word, such as `조용한 실패` for "silent failure", names used without explanation, and sentences reduced to strings of nouns or arrows. It keeps facts, numbers, conditions and the author's voice.

I built it because every time Claude answered in Korean, I had to reread and fix phrases that sounded like translated English and sentences that read awkwardly.

[한국어](README.md) · [Installation](#installation) · [Full guide](docs/guide.en.md) · [Sentence comparisons](docs/comparisons.en.md)

| Answer written without geulppal | Polished with geulppal 0.5.3 |
|---|---|
| 마지막 단어 뒤에 넣을 insert 패치는 조용히 버려집니다.<br>("…is silently discarded") | 마지막 단어 뒤에 넣을 insert 패치는 오류 없이 버려집니다.<br>("…is discarded without an error") |
| 값이 외부에서 바뀌거나 오염되면 타입이 거짓이 됩니다.<br>("…the type becomes a lie") | 값이 외부에서 바뀌거나 오염되면 타입이 실제 값과 맞지 않게 됩니다.<br>("…the type no longer matches the actual value") |
| 아래 초안은 소스에서 확인한 테스트 공백을 기준으로 썼습니다.<br>("…based on the test gaps…") | 아래 초안은 소스에서 확인한 테스트가 없는 부분을 기준으로 썼습니다.<br>("…based on the parts without tests…") |
| 구조를 바꾸면 조용히 틀린 결과가 나올 수 있습니다.<br>("…can silently give wrong results") | 구조를 바꾸면 오류 없이 틀린 결과가 나올 수 있습니다.<br>("…can give wrong results without an error") |

The same spots, taken from answers Claude Code wrote in Korean and from the first run polishing those answers with geulppal 0.5.3. These are sentences the judge model marked as awkward. On 12 cases written before seeing any results, each polished twice, the 24 places marked in the originals were still there in 8 of 48 checks (16 without geulppal). Judging the polished text again found 25 marked places (43 without geulppal), and the meaning was kept in all 24 runs (23). The marks come from one judge model, not from people rating readability. Polishing cost about 2.3 times as much and took about 1.7 times as long. [Method, all results and limitations](docs/comparisons.en.md)

## Installation

**Claude Code** — run in a terminal in your project folder. Add `-g` to use it in every project.

```bash
npx skills add Guksu/geulppal --skill geulppal
```

**Claude on the web or desktop** — zip the `skills/geulppal/` folder and upload it.

```bash
git clone --depth 1 https://github.com/Guksu/geulppal.git
cd geulppal/skills && zip -r geulppal.zip geulppal
```

[All install options](docs/guide.en.md#installation) · [Updating](docs/guide.en.md#updating)

## Try it

After Claude answers, ask:

> /geulppal 방금 쓴 답을 자연스러운 한국어로 다듬어 줘. 내용은 그대로 둬.
> ("Polish the answer you just wrote into natural Korean. Keep the content.")

Claude returns the finished text with word-for-word translations and awkward sentences fixed. It adds no facts that were not in the original, and leaves a short note only when something needs checking. Requests such as "fix the translationese" or "make it less AI-sounding" can also lead Claude to pick the skill. For English text, call `/geulppal` directly.

The effect was clearest when Claude polished finished text. Results for writing from scratch were mixed. The skill instructions are written in Korean; [English usage notes](docs/guide.en.md#how-it-works) are in the full guide.

## Follow development

I use geulppal in my own work and will keep fixing it. If a phrase is still awkward after polishing, or the meaning changed, [open an issue](https://github.com/Guksu/geulppal/issues) with the original, your request and the result. Reports like these become evaluation cases for the next version.

[Full guide](docs/guide.en.md) · [Sentence comparisons](docs/comparisons.en.md) · [Benchmark](evals/results/README.md) (in Korean) · [Contributing](docs/guide.en.md#contributing)

[![License: MIT](https://img.shields.io/badge/license-MIT-555555)](LICENSE)

## License

[MIT](LICENSE) © 2026 Guksu
