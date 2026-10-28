# 결과: 2026-10-28-draft-readme-f1

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-28-draft-readme-f1`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| F1 | `evals/snapshots/v0.4.1-r1/geulppal` | 350015b62468 | claude-sonnet-5-5 | high | 2.1.312 (Claude Code) |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| F1 | 18 | 18 | 없음 | 0 | 18/18 | 18/18 | 0 | 18/18 |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 근거 판정

원문 없이 쓴 글이다. 판정 모델이 작업 폴더의 코드와 메모를 읽고 결과의 구체적인 주장마다 근거를 찾는다. 근거와 어긋나는 주장(contradicted)이나 근거를 찾지 못한 구체적 주장(unsupported)이 하나라도 있으면 실패다. 근거를 찾지 못했다는 것이 틀렸다는 뜻은 아니다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| F1 | 18 | 15 | 3 | 0 | 0 | 0 |

### 사례별

| 사례 | F1 |
|---|---|
| `khaiii-readme` | ✗ ○ |
| `kobert-transformers-readme` | ○ ○ |
| `korpora-readme` | ✗ ✗ |
| `py-hanspell-readme` | ○ ○ |
| `toss-date-readme` | ○ ○ |
| `toss-ky-readme` | ○ ○ |
| `toss-scroll-animation-readme` | ○ ○ |
| `toss-use-funnel-readme` | ○ ○ |
| `toss-use-query-param-readme` | ○ ○ |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 근거 판정 실패

- F1 `khaiii-readme` r1: 'C++로 만든 공유 라이브러리'라는 주장(종류: dependency)은 작업 폴더와 메모에 근거가 없다(unsupported). 확인되지 않은 의존성을 사실처럼 쓴 것이라 금지 변경에도 해당한다.
- F1 `korpora-readme` r1: Korpora.fetch(['nsmc', 'korsts']) 예시는 코드와 어긋난다. loader.py의 fetch가 맨 처음 corpus_name.lower()를 불러서 리스트를 넘기면 AttributeError가 난다. / '모두의 말뭉치에서 force_download=True를 주면 NotImplementedError가 납니다'는 modu_news에만 맞는다. 다른 modu_* 클래스는 force_download를 ModuKorpus에 넘기지 않으므로 오류가 나지 않는다.
- F1 `korpora-readme` r2: 의존성 목록(numpy, tqdm, requests, openpyxl)에 requirements.txt에 있는 dataclasses>=0.6이 빠져 있음 / CustomLabeledSentenceKorpus 등 Custom*Korpus는 인자 없이 super().__init__()를 부르는데 Korpus.__init__는 description과 license가 필수라 TypeError가 남. README의 사용 예와 'ValueError가 난다'는 설명이 코드와 어긋남

## 글의 품질: 쌍 비교

두 결과가 모두 근거 판정을 통과한 쌍만 비교했다(실행하지 않은 사람 글 H는 근거 판정 없이 넣었다). 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### E vs F1 (기준선 재사용)

재사용: E ← `2026-10-28-draft-readme-final`

쌍(사례 × 회차) 10개 중 비교 6개, 제외 4개(한쪽 이상 근거 판정 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 5/6.

| 판정 | 쌍 수 |
|---|---|
| E 우세 | 2 |
| F1 우세 | 2 |
| 차이 없음 | 1 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 1 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `kobert-transformers-readme` | F1 우세 · 제외 |
| `toss-date-readme` | 제외 · 제외 |
| `toss-scroll-animation-readme` | 차이 없음 · 순서 불일치 |
| `toss-use-funnel-readme` | E 우세 · 제외 |
| `toss-use-query-param-readme` | F1 우세 · E 우세 |

사례 5개: 승패가 난 회차가 모두 E 쪽 1개, 모두 F1 쪽 1개, 엇갈림 1개, 승패 없음(차이 없음·불일치·제외만) 2개.

### E2 vs F1 (기준선 재사용)

재사용: E2 ← `2026-10-28-draft-readme-e2`

쌍(사례 × 회차) 8개 중 비교 5개, 제외 3개(한쪽 이상 근거 판정 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 3/5.

| 판정 | 쌍 수 |
|---|---|
| E2 우세 | 2 |
| F1 우세 | 0 |
| 차이 없음 | 1 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 2 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `khaiii-readme` | 제외 · E2 우세 |
| `korpora-readme` | 제외 · 제외 |
| `py-hanspell-readme` | 순서 불일치 · 순서 불일치 |
| `toss-ky-readme` | 차이 없음 · E2 우세 |

사례 4개: 승패가 난 회차가 모두 E2 쪽 2개, 모두 F1 쪽 0개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 2개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| F1 | 18 | 52.2 | 128,921 | 5,733 | 16 | 3.723 |

판정 호출: 40회(재시도 포함), 비용 합 5.645 USD.

