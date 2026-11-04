# geulppal sentence comparisons

[README](../README.en.md) · [Full guide](guide.en.md) · [한국어](comparisons.md)

## Sentence comparisons

### Polishing Claude Code answers (geulppal 0.5.2)

Claude Code (`claude-sonnet-5-5`) was asked 12 questions in Korean: questions about public repository code (onboarding a new teammate, a report to a team lead, a PR description), development questions without a repository (git, database indexes, async/await, Docker), and questions from people who are not developers (renting with a large deposit versus monthly rent, starting to exercise). The answers, written without geulppal, were then handed back with the request "Keep the content and polish it into natural Korean", once without geulppal and once with geulppal 0.5.2. The cases were written before seeing any results.

Below are sentences the judge model marked as awkward, next to the same spot in the first run polished with 0.5.2. English glosses are rough.

| Case | Answer written without geulppal | Polished with geulppal 0.5.2 |
|---|---|---|
| Report on a morphological analyzer | 마지막 단어 뒤에 넣을 insert 패치는 조용히 버려집니다.<br>("…is silently discarded") | 마지막 단어 뒤에 넣을 insert 패치는 오류 없이 버려집니다.<br>("…is discarded without an error") |
| Report on a storage wrapper | 값이 외부에서 바뀌거나 오염되면 타입이 거짓이 됩니다.<br>("…the type becomes a lie") | 값이 외부에서 바뀌거나 오염되면 타입이 실제 값과 맞지 않게 됩니다.<br>("…the type no longer matches the actual value") |
| Onboarding for a model package | 구조를 바꾸면 조용히 틀린 결과가 나올 수 있습니다.<br>("…can silently give wrong results") | 구조를 바꾸면 오류 없이 틀린 결과가 나올 수 있습니다.<br>("…can give wrong results without an error") |
| Onboarding for a model package | `return_dict`를 건드리면 하위 사용처가 깨집니다.<br>("…downstream usages break") | `return_dict`를 건드리면 이 출력을 쓰는 코드가 깨집니다.<br>("…code that uses this output breaks") |
| PR description for an error-reporting package | 아래 초안은 소스에서 확인한 테스트 공백을 기준으로 썼습니다.<br>("…based on the test gaps…") | 아래 초안은 소스에서 확인한, 테스트가 없는 부분을 기준으로 썼습니다.<br>("…based on the parts without tests…") |
| Onboarding for an HTTP client | ESM 빌드에서는 esbuild의 `require` 심이 던질 수도 있습니다.<br>("…the `require` shim may throw") | ESM 빌드에서는 esbuild가 넣는 `require` 대체 코드(shim)가 오류를 낼 수도 있습니다.<br>("…the replacement code (shim) that esbuild adds may raise an error") |
| Deposit versus monthly rent | 목돈이 부족하거나 이동 가능성이 크다면 월세가 낫습니다.<br>("…if mobility is likely…") | 목돈이 부족하거나 이사할 가능성이 크다면 월세가 낫습니다.<br>("…if you are likely to move house…") |
| Starting to exercise | 운동 중 가슴 통증, 심한 어지럼증, 극심한 숨참이 있으면 바로 중단하세요. | 운동 중에 가슴 통증, 심한 어지럼증, 매우 심한 숨 가쁨이 나타나면 바로 멈추세요. |

Some spots were not fixed.

| Case | Sentence still there after polishing | What the judge pointed out |
|---|---|---|
| PR description for an error-reporting package | 이 PR은 동작을 바꾸지 않고 테스트만 추가해 이 부분을 보호합니다. | `보호합니다` ("protects") reads like English; `회귀를 막습니다` ("prevents regressions") is more natural |
| Onboarding for an HTTP client | `dts.resolve: true`도 같은 전제입니다. | It should say what the shared assumption is |
| PR description for a Hangul library | 현재 동작을 고정하는 테스트를 넣지 않았습니다. | `고정하는` ("pin") reads like English; `현재 동작을 기대값으로 삼는` ("treat the current behavior as the expected value") |

### Polishing without geulppal

With the same request but without geulppal, awkward expressions often stayed or the meaning changed. These come from the earlier unseen set.

| Case | Original answer | Polished without geulppal | What changed |
|---|---|---|---|
| Performance of a pronunciation package | `G2p()` 생성이 느리고 메모리도 씁니다. … 가장 비싼 실수가 됩니다. | `G2p()` 생성이 느리고 메모리도 많이 씁니다. … 가장 비싼 실수가 됩니다. | `많이` ("a lot of") was added, and `가장 비싼 실수` ("the most expensive mistake") stayed |
| Bug in a corpus package | 이 연결은 닫히지 않고, … | 이때 연결은 닫히지 않고, … | `이 연결은` ("this connection") became `이때` ("at this time"), so a problem that always happens reads as if it happened only when a header is missing |

## Evaluation summary

| Cases written before seeing any results | Without geulppal | 0.5.1 | 0.5.2 |
|---|---|---|---|
| First unseen set, 8 cases × 2 runs, polishing: the 17 marked places in the originals still present | 19/34 | 4/34 | |
| Same polishing: marked places when the polished text was judged again | 38 | 24 | |
| Same polishing: results that kept the meaning | 12/16 | 16/16 | |
| Second unseen set, 12 cases × 2 runs, polishing: the 24 marked places in the originals still present | 18/48 | 8/48 | 8/48 |
| Same polishing: marked places when the polished text was judged again | 41 | 21 | 28 |
| Same polishing: results that kept the meaning | 22/24 | 22/24 | 23/24 |
| Second unseen set, writing from scratch (1 run): marked places per 1,000 characters | 1.15 | 0.86 | 0.86 |

How these are counted:

- **Still present**: whether each string the judge marked in the polishing input (the first-run answer written without geulppal) appears verbatim in the polished result. The denominator is the number of marks in the originals × 2 polishing runs. A marked expression disappearing does not mean that spot now reads naturally, which is why the marks on the polished text are listed as well.
- **Marked places when judged again**: the same expression counts once per result. This is not a human readability score or a probability of AI authorship.
- The numbers can be recounted from the public records with `node scripts/eval/natural.mjs polish-stats --from 2026-11-03-korean-natural-holdout2 --out 2026-11-03-korean-natural-polish2`, and `node --test 'scripts/eval/test/*.test.mjs'` checks them against the values above.

- The effect was clear for polishing finished answers in both case sets.
- Writing from scratch was mixed: fewer marks on the second set, but no reduction on the first set of 8 (34 marks without geulppal, 36 with 0.5.1).
- 0.5.0 introduced over-translation of technical terms (key → `열쇠`, feature → `특징`); 0.5.2 adds a separate rule not to translate technical names.
- Automatic selection: requests to polish Korean text 18/18, a request to polish English docs 0/2, requests that should not trigger it 0/16.
- After moving the content rules for writing from scratch to a reference file, 4 README drafts were checked again: results with only claims backed by the code were 8/8 with 0.5.2 and 7/8 with 0.4.1.
- Cost (the API list-price estimate the CLI reports) was about 2 to 2.3 times that without geulppal for polishing (2.27 times on the second set) and about 1.2 to 1.8 times for writing. The median polishing time was about 1.5 to 1.7 times longer (9.1 s against 15.6 s on the second set), mostly because reading the skill roughly doubles the input tokens.

More detail (in Korean): [8th evaluation report](../evals/results/REPORT-korean-natural.md) · [Benchmark](../evals/results/README.md) · [Second unseen set, polishing results](../evals/results/2026-11-03-korean-natural-polish2/natural.md) · [Human sentence check](../evals/results/2026-10-31-korean-natural-sentence-check/report.md)

## How it was judged

A judge model (`claude-opus-5-5`) read each text and marked the places where the reader would stumble, by type (word-for-word translation, unexplained name, string of nouns, explanation replaced by symbols, translationese, other awkwardness) and severity. It does not mark loanwords that developers use as they are, code names, or matters of taste. Polished results were also judged separately for whether they kept the original meaning. The number of marked places is not a quality score or a probability of AI authorship. [Judge instructions](../evals/judge/korean-natural.md) (in Korean)

## Limitations

- One judge model made the marks. When the repository owner rated 10 sentences, a mix of ones the judge marked and ones it did not, 7 agreed with the judge. The judge tended to over-mark translated terms that developers actually use, such as `회귀` (regression).
- The case sets are small (8 and 12). The questions were written by the evaluation author (a model).
- Results vary between runs. The same skill also scored differently across CLI versions (0.4.3 on 4 blog cases × 2 runs: 7/8 with 2.1.312, 4/8 with 2.1.314).
- Only Claude Code with `claude-sonnet-5-5` was evaluated.
- Report and blog drafts were not measured again for 0.5.
- In the second set's polishing runs, the two everyday questions (deposit versus rent, exercise) were judged without the reader information, and the polishing request said the text was "an answer received during development work". For each condition, those two cases' 4 results need to be evaluated again under the fixed setup. Leaving them out gives the same direction (still present: 12/36 without geulppal, 4/36 with 0.5.2; meaning kept: 18/20 against 19/20).
- The meaning check passed some results that turned `써 드릴 수 있습니다` ("I can write it") into `써 드리겠습니다` ("I will write it"). It can miss changes in how strong a commitment is.
