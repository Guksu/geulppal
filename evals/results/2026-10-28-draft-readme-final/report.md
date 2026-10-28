# 결과: 2026-10-28-draft-readme-final

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-28-draft-readme-final`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| A | 없음 | - | claude-sonnet-5-5 | high | 2.1.312 (Claude Code) |
| C | `evals/snapshots/v0.3.0-r2/geulppal` | 8f16b081d476 | claude-sonnet-5-5 | high | 2.1.312 (Claude Code) |
| E | `evals/snapshots/v0.4.0-r2/geulppal` | d1d80c32e3ec | claude-sonnet-5-5 | high | 2.1.312 (Claude Code) |
| H | 없음 | - | null | null | null |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| A | 10 | 10 | 없음 | 0 | 해당 없음 (geulppal 목록 노출 0) | - | 0 | 10/10 |
| C | 10 | 10 | 없음 | 0 | 10/10 | 10/10 | 0 | 10/10 |
| E | 18 | 18 | 없음 | 0 | 18/18 | 18/18 | 0 | 18/18 |
| H | 실행 안 함(기준 원문 26건) | - | - | - | - | - | - | - |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 근거 판정

원문 없이 쓴 글이다. 판정 모델이 작업 폴더의 코드와 메모를 읽고 결과의 구체적인 주장마다 근거를 찾는다. 근거와 어긋나는 주장(contradicted)이나 근거를 찾지 못한 구체적 주장(unsupported)이 하나라도 있으면 실패다. 근거를 찾지 못했다는 것이 틀렸다는 뜻은 아니다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| A | 10 | 9 | 1 | 0 | 0 | 0 |
| C | 10 | 9 | 1 | 0 | 0 | 0 |
| E | 18 | 13 | 5 | 0 | 0 | 0 |
| H | 0 | 0 | 0 | 0 | 0 | 0 |

### 사례별

| 사례 | A | C | E | H |
|---|---|---|---|---|
| `khaiii-readme` | - | - | - | ? ? |
| `kobert-transformers-readme` | ○ ✗ | ○ ○ | ○ ✗ | ? ? |
| `koelectra-readme` | - | - | ○ ○ | ? ? |
| `korpora-readme` | - | - | - | ? ? |
| `open-korean-text-readme` | - | - | ○ ○ | ? ? |
| `py-hanspell-readme` | - | - | - | ? ? |
| `toss-date-readme` | ○ ○ | ○ ○ | ✗ ✗ | ? ? |
| `toss-hangul-readme` | - | - | ○ ✗ | ? ? |
| `toss-ky-readme` | - | - | - | ? ? |
| `toss-scroll-animation-readme` | ○ ○ | ○ ○ | ○ ○ | ? ? |
| `toss-storage-readme` | - | - | ○ ○ | ? ? |
| `toss-use-funnel-readme` | ○ ○ | ○ ✗ | ○ ✗ | ? ? |
| `toss-use-query-param-readme` | ○ ○ | ○ ○ | ○ ○ | ? ? |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 근거 판정 실패

- A `kobert-transformers-readme` r2: 외부 링크 https://github.com/SKTBrain/KoBERT 의 근거가 작업 폴더에 없다(link, unsupported). / 외부 링크 https://github.com/huggingface/transformers 의 근거가 작업 폴더에 없다(link, unsupported).
- C `toss-use-funnel-readme` r2: README는 QueryClientProvider와 Suspense가 withState 때문에 필요하다고 설명한다. 하지만 src/useFunnel.tsx 113행을 보면 useFunnel이 withState 호출 여부와 상관없이 항상 useFunnelState를 실행하고, 이 함수가 useQuery({ suspense: true })를 부른다. 그래서 기본 사용법 예제(SignupPage)도 QueryClientProvider와 Suspense 없이는 동작하지 않으며, 한계 설명이 코드와 어긋난다(contradicted).
- E `kobert-transformers-readme` r2: 'DistilKoBERT 입력' 절의 제약(token_type_ids를 DistilBERT 계열 모델에 넘기지 말 것)은 작업 폴더에 근거가 없는 limitation 주장(unsupported)이며, 확인되지 않은 제약을 사실처럼 쓴 금지 변경에 해당함
- E `toss-date-readme` r1: 외부 링크 https://date-fns.org 와 https://date-fns.org/docs/format 는 작업 폴더나 메모에서 근거를 찾을 수 없는 link 종류 unsupported 주장
- E `toss-date-readme` r2: 외부 링크 https://date-fns.org 와 https://date-fns.org/docs/format 는 작업 폴더에서 근거를 찾을 수 없음 (link 종류 unsupported)
- E `toss-hangul-readme` r2: chosungIncludes 설명의 '두 문자열의 공백은 무시합니다'가 코드와 어긋남: src/chosungIncludes.ts에서 isOnlyInitialConsonant(y)가 공백 제거보다 먼저 실행되어, y에 공백이 있으면 false를 반환한다
- E `toss-use-funnel-readme` r2: README는 react-query suspense 읽기와 QueryClientProvider·Suspense 필요 조건이 withState에만 해당하는 것처럼 썼다. 하지만 코드(useFunnel.tsx 113행, 227-234행)를 보면 useFunnel이 withState 사용 여부와 상관없이 useFunnelState(useQuery suspense: true)를 항상 호출한다. 그래서 withState 없이 쓰는 첫 예제도 Provider·Suspense가 없으면 동작하지 않는다.

## 글의 품질: 쌍 비교

두 결과가 모두 근거 판정을 통과한 쌍만 비교했다(실행하지 않은 사람 글 H는 근거 판정 없이 넣었다). 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### A vs E (기준선 재사용)

재사용: A ← `2026-10-28-draft-readme`

쌍(사례 × 회차) 18개 중 비교 8개, 제외 10개(한쪽 이상 근거 판정 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 5/8.

| 판정 | 쌍 수 |
|---|---|
| A 우세 | 0 |
| E 우세 | 5 |
| 차이 없음 | 0 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 3 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `kobert-transformers-readme` | 순서 불일치 · 제외 |
| `koelectra-readme` | 제외 · 제외 |
| `open-korean-text-readme` | 순서 불일치 · 제외 |
| `toss-date-readme` | 제외 · 제외 |
| `toss-hangul-readme` | E 우세 · 제외 |
| `toss-scroll-animation-readme` | E 우세 · E 우세 |
| `toss-storage-readme` | 제외 · 제외 |
| `toss-use-funnel-readme` | E 우세 · 제외 |
| `toss-use-query-param-readme` | 순서 불일치 · E 우세 |

사례 9개: 승패가 난 회차가 모두 A 쪽 0개, 모두 E 쪽 4개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 5개.

### C vs E (기준선 재사용)

재사용: C ← `2026-10-28-draft-readme`

쌍(사례 × 회차) 18개 중 비교 12개, 제외 6개(한쪽 이상 근거 판정 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 7/12.

| 판정 | 쌍 수 |
|---|---|
| C 우세 | 1 |
| E 우세 | 5 |
| 차이 없음 | 1 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 5 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `kobert-transformers-readme` | 순서 불일치 · 제외 |
| `koelectra-readme` | 차이 없음 · 제외 |
| `open-korean-text-readme` | E 우세 · E 우세 |
| `toss-date-readme` | 제외 · 제외 |
| `toss-hangul-readme` | 순서 불일치 · 제외 |
| `toss-scroll-animation-readme` | 순서 불일치 · 순서 불일치 |
| `toss-storage-readme` | 순서 불일치 · E 우세 |
| `toss-use-funnel-readme` | E 우세 · 제외 |
| `toss-use-query-param-readme` | C 우세 · E 우세 |

사례 9개: 승패가 난 회차가 모두 C 쪽 0개, 모두 E 쪽 3개, 엇갈림 1개, 승패 없음(차이 없음·불일치·제외만) 5개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| A | 10 | 29.6 | 71,002 | 4,309 | 14 | 1.147 |
| C | 10 | 35.7 | 97,127 | 4,188 | 17 | 1.504 |
| E | 18 | 48.1 | 142,803 | 6,063 | 19 | 4.238 |

판정 호출: 78회(재시도 포함), 비용 합 11.571 USD.

