# 결과: 2026-10-28-draft-readme

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-28-draft-readme`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| A | 없음 | - | claude-sonnet-5-5 | high | 2.1.312 (Claude Code) |
| C | `evals/snapshots/v0.3.0-r2/geulppal` | 8f16b081d476 | claude-sonnet-5-5 | high | 2.1.312 (Claude Code) |
| H | 없음 | - | null | null | null |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| A | 16 | 16 | 없음 | 0 | 해당 없음 (geulppal 목록 노출 0) | - | 0 | 16/16 |
| C | 16 | 16 | 없음 | 0 | 16/16 | 16/16 | 0 | 16/16 |
| H | 실행 안 함(기준 원문 16건) | - | - | - | - | - | - | - |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 근거 판정

원문 없이 쓴 글이다. 판정 모델이 작업 폴더의 코드와 메모를 읽고 결과의 구체적인 주장마다 근거를 찾는다. 근거와 어긋나는 주장(contradicted)이나 근거를 찾지 못한 구체적 주장(unsupported)이 하나라도 있으면 실패다. 근거를 찾지 못했다는 것이 틀렸다는 뜻은 아니다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| A | 16 | 7 | 9 | 0 | 0 | 0 |
| C | 16 | 13 | 3 | 0 | 0 | 0 |
| H | 8 | 0 | 8 | 0 | 0 | 0 |

### 사례별

| 사례 | A | C | H |
|---|---|---|---|
| `khaiii-readme` | ○ ✗ | ○ ○ | ✗ ? |
| `koelectra-readme` | ✗ ✗ | ○ ✗ | ✗ ? |
| `korpora-readme` | ✗ ✗ | ○ ✗ | ✗ ? |
| `open-korean-text-readme` | ○ ✗ | ○ ○ | ✗ ? |
| `py-hanspell-readme` | ○ ✗ | ○ ○ | ✗ ? |
| `toss-hangul-readme` | ○ ○ | ○ ✗ | ✗ ? |
| `toss-ky-readme` | ○ ○ | ○ ○ | ✗ ? |
| `toss-storage-readme` | ✗ ✗ | ○ ○ | ✗ ? |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 근거 판정 실패

- A `khaiii-readme` r2: 속도 측정 조건 '문장 평균 91'에 메모에 없는 '바이트' 단위를 붙였다(contradicted, 금지 변경 위반).
- A `koelectra-readme` r1: 작업 폴더와 메모에 없는 외부 링크(google-research/electra, 모두의 말뭉치, 데이터셋 7개 URL)를 근거 없이 넣었음(link 종류 unsupported)
- A `koelectra-readme` r2: 모두의 말뭉치 링크(https://corpus.korean.go.kr/)가 작업 폴더나 메모에 없다(unsupported link) / google-research/electra GitHub 링크가 작업 폴더나 메모에 없다(unsupported link) / 'BERT MLM은 약 15% token에서만 학습 신호를 얻는다'는 수치가 메모나 코드로 뒷받침되지 않는다(unsupported number)
- A `korpora-readme` r1: README는 'korpora lmdata가 필요한 말뭉치가 없으면 자동으로 내려받는다'고 했지만, task_lmdata.py check_corpus는 Korpora.exists가 True인 말뭉치만 남기므로 설치되지 않은 말뭉치는 빠진다(contradicted)
- A `korpora-readme` r2: kowikitext의 샘플 형태를 str로 적었으나 korpus_kowiki.py는 SentencePairKorpusData(texts, titles)를 써서 SentencePair를 반환함 (contradicted) / 'korpora lmdata는 필요한 말뭉치가 없으면 먼저 내려받는다'고 썼으나 task_lmdata.py check_corpus는 Korpora.exists가 True인 말뭉치만 사용하고 없는 말뭉치는 제외함 (contradicted, 금지 변경 위반)
- A `open-korean-text-readme` r2: 'tokenizeTopN은 점수가 높은 순서대로 N개의 분석 후보를 돌려준다'는 코드와 어긋난다(contradicted). TokenizerProfile.scala에 'Lower score is better'라고 적혀 있고, KoreanTokenizer는 후보를 score 오름차순으로 정렬한다. 즉 점수가 낮은 후보부터 나온다.
- A `py-hanspell-readme` r2: CheckResult.AMBIGUOUS의 의미를 '표준어 의심'이라고 썼으나 저장소 코드에는 상수명과 purple 태그 매핑만 있어 근거가 없음(unsupported feature 주장)
- A `toss-storage-readme` r1: '빈 문자열은 null로 취급된다'를 조건 없이 썼지만, LocalStorage/SessionStorage.get은 getItem 결과를 그대로 반환하므로 실제 브라우저 스토리지에서는 ''가 반환된다(contradicted) / '사생활 보호 모드'에서 폴백된다는 platform 주장이 작업 폴더에서 확인되지 않음(unsupported)
- A `toss-storage-readme` r2: 숫자 스토리지 예제의 `countStorage.increase(); // 1` 등은 increase()/decrease()가 값을 반환하는 것처럼 보이게 한다. 실제로는 void를 반환한다(src/typed/storages/NumberTypedStorage.ts). / '사생활 보호 모드'에서 메모리 스토리지로 대체된다는 내용은 작업 폴더에 근거가 없다. 코드 주석은 쿠키 차단만 언급한다.
- C `koelectra-readme` r2: ELECTRA 논문 링크(https://arxiv.org/abs/2003.10555)는 작업 폴더와 메모 어디에도 근거가 없다(link 종류의 unsupported 주장).
- C `korpora-readme` r2: Korpora.fetch(['nsmc', 'korsts'])는 코드와 어긋남: loader.py의 fetch가 corpus_name.lower()를 먼저 호출해서 리스트를 넘기면 AttributeError가 남 / 'kcbert, kowikitext, namuwikitext는 용량이 큰 편'이라는 주장은 근거 없음(limitation, unsupported)
- C `toss-hangul-readme` r2: chosungIncludes가 'x와 y의 공백을 무시한다'는 주장이 코드와 어긋남. src/chosungIncludes.ts의 isOnlyInitialConsonant(y)가 공백을 초성으로 보지 않아, y에 공백이 있으면 곧바로 false를 반환함
- H `khaiii-readme` r1: 근거 없는 성능 수치: 기분석 사전 약 8만 엔트리, base 적용 시 약 9.2초·10% 속도 향상 / 근거 없는 실험 설정: win {2,3,4,5,7,10} x emb {20..500}, 60가지 조합과 결과 경향 / 근거 없는 기능: 기분석 사전의 '*' 접두 매칭, 오분석 패치 엔트리 형식 / 근거 없는 링크: 세종계획 URL, 위키 문서 여러 개, CONTRIBUTING.md(폴더에 없음), .github/img 이미지(폴더에 없음)
- H `koelectra-readme` r1: 메모와 코드에 없는 벤치마크 수치 표(Base/Small, 다른 모델과 비교)를 사실처럼 적었다 / Tokenizer 예시의 토큰 ID가 저장소의 vocab.txt와 맞지 않고, v3 vocab은 저장소에 없어 확인할 수 없다 / TFElectraModel·from_pt, generator 모델 ID, Tensorflow-v1 tar.gz 링크, docs/·finetune/README.md·README_EN.md 링크의 근거가 없다 / Updates 이력(torch<=1.4 이슈, tf_model.h5, EnlipleAI vocab), 'OS 상관없이', pooled_output 설명, Citation 정보의 근거가 없다
- H `korpora-readme` r1: Korpora.fetch('all')과 korpora fetch --corpus all이 모든 말뭉치를 내려받는다고 썼지만, loader.py는 modu_/aihub_ 말뭉치를 제외하고 fetch_modu/fetch_aihub는 NotImplementedError를 냄(contradicted) / korpora lmdata가 로컬에 데이터가 없으면 내려받는다고 썼지만, task_lmdata.check_corpus는 이미 있는 말뭉치만 처리함(contradicted) / corpus_list() 출력 예시가 실제 KORPUS_DESCRIPTION과 다름. korean_parallel_koen_news와 aihub_kspon_speech_scripts가 빠짐(contradicted) / aihub.or.kr/aidata/87 링크와 ko-nlp.github.io 문서 링크는 근거가 없음(unsupported link) / 금지 변경 위반: 코드로 확인되지 않는 기능을 사실처럼 씀
- H `open-korean-text-readme` r1: Maven 버전 2.1.0과 Semantic Versioning 1.0.2가 pom.xml의 2.3.2-SNAPSHOT과 어긋남(contradicted) / 성능 수치와 KoNLPy 벤치마크에 근거가 없음(unsupported number) / Heroku Web API 서비스와 다른 언어 래퍼 목록에 근거가 없음(unsupported feature) / docs/contribution-guide.md와 CONTRIBUTING.md 링크가 가리키는 파일이 작업 폴더에 없음 / 금지 변경(근거 없는 성능 수치·기능·버전) 위반
- H `py-hanspell-readme` r1: 변경내역의 '버전 1.1: 처리속도 향상'은 저장소에서 근거를 찾을 수 없는 unsupported 주장이다 / 변경내역의 '버전 1.0: 첫 버전 릴리즈'는 저장소에서 근거를 찾을 수 없는 unsupported 주장이다(setup.py와 __init__.py에는 1.1만 있고 CHANGELOG가 없다) / 확인되지 않는 버전 이력과 성능 개선을 사실처럼 써서 금지 변경을 어겼다
- H `toss-hangul-readme` r1: 함수별 문서 링크(https://slash.page/libraries/common/hangul/src/*.i18n)는 작업 폴더에서 근거를 찾을 수 없는 link 주장이다(unsupported).
- H `toss-ky-readme` r1: 'frontend-libraries 내부에서 Jest 등을 실행할 때 require('ky')가 실행되어 ERR_REQUIRE_ESM 오류' 주장이 작업 폴더로 확인되지 않음(unsupported limitation). 'frontend-libraries'라는 저장소·디렉토리 이름도 폴더에 없음
- H `toss-storage-readme` r1: '브라우저 시크릿 모드나 테스트 환경'에서 Web Storage 접근이 실패한다는 플랫폼 주장은 작업 폴더에서 근거를 찾을 수 없다. 코드 주석에는 쿠키 차단 경우만 있다. / 같은 이유로 확인되지 않는 플랫폼 정보를 사실처럼 쓰지 말라는 금지 변경을 어겼다.

## 글의 품질: 쌍 비교

두 결과가 모두 근거 판정을 통과한 쌍만 비교했다(실행하지 않은 사람 글 H는 근거 판정 없이 넣었다). 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### A vs C

쌍(사례 × 회차) 16개 중 비교 6개, 제외 10개(한쪽 이상 근거 판정 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 5/6.

| 판정 | 쌍 수 |
|---|---|
| A 우세 | 3 |
| C 우세 | 1 |
| 차이 없음 | 1 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 1 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `khaiii-readme` | A 우세 · 제외 |
| `koelectra-readme` | 제외 · 제외 |
| `korpora-readme` | 제외 · 제외 |
| `open-korean-text-readme` | A 우세 · 제외 |
| `py-hanspell-readme` | 순서 불일치 · 제외 |
| `toss-hangul-readme` | C 우세 · 제외 |
| `toss-ky-readme` | 차이 없음 · A 우세 |
| `toss-storage-readme` | 제외 · 제외 |

사례 8개: 승패가 난 회차가 모두 A 쪽 3개, 모두 C 쪽 1개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 4개.

### H vs C

쌍(사례 × 회차) 16개 중 비교 13개, 제외 3개(한쪽 이상 근거 판정 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 13/13.

| 판정 | 쌍 수 |
|---|---|
| H 우세 | 0 |
| C 우세 | 13 |
| 차이 없음 | 0 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 0 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `khaiii-readme` | C 우세 · C 우세 |
| `koelectra-readme` | C 우세 · 제외 |
| `korpora-readme` | C 우세 · 제외 |
| `open-korean-text-readme` | C 우세 · C 우세 |
| `py-hanspell-readme` | C 우세 · C 우세 |
| `toss-hangul-readme` | C 우세 · 제외 |
| `toss-ky-readme` | C 우세 · C 우세 |
| `toss-storage-readme` | C 우세 · C 우세 |

사례 8개: 승패가 난 회차가 모두 H 쪽 0개, 모두 C 쪽 8개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 0개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| A | 16 | 40.7 | 104,236 | 5,368 | 17 | 2.674 |
| C | 16 | 40.7 | 141,158 | 5,649 | 16 | 3.263 |

판정 호출: 78회(재시도 포함), 비용 합 14.308 USD.

