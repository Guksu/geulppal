# 결과: 2026-10-27-round2

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-27-round2`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| B2 | `evals/snapshots/v0.2.0-r2/geulppal` | c823da79c250 | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| B2 | 38 | 38 | 없음 | 0 | 38/38 | 19/38 | 0 | 38/38 |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 의미 보존

판정 모델의 의미 보존 검사와 문자열 검사(`exact`)를 모두 통과해야 통과다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| B2 | 38 | 36 | 2 | 0 | 0 | 0 |

### 사례별

| 사례 | B2 |
|---|---|
| `already-good-intro` | ○ ○ |
| `benchmark-scope` | ○ ○ |
| `draft-from-facts` | ✗ ○ |
| `english-readme-slop` | ○ ○ |
| `english-terms-and-list` | ○ ○ |
| `missing-evidence` | ○ ○ |
| `necessary-contrast` | ○ ○ |
| `personal-blog-voice` | ○ ○ |
| `polite-email-noop` | ○ ○ |
| `pr-body-mixed-terms` | ○ ✗ |
| `pr-technical-literals` | ○ ○ |
| `proposal-cost-exceptions` | ○ ○ |
| `quotation-and-opinion` | ○ ○ |
| `readme-long-repetition` | ○ ○ |
| `readme-rewrite` | ○ ○ |
| `review-only` | ○ ○ |
| `source-as-data` | ○ ○ |
| `summary-request` | ○ ○ |
| `uncertainty-and-plan` | ○ ○ |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 의미 보존 실패

- B2 `draft-from-facts` r1: 본문의 '메모를 한곳에 모으고', '모아 둔 메모'는 원문에 없는 수집·저장 기능을 덧붙인 것이다. 원문은 저장 방식을 제공하지 않는다고 했으므로 새 사실을 만든 것이고, '저장 기능 추가' 금지에도 걸린다.
- B2 `pr-body-mixed-terms` r2: debounce 항목에서 원문에 없는 '매 입력마다 API 요청이 나가던'이라는 이전 동작을 덧붙였다. / 원문의 '문제를 해결했습니다'라는 완료 서술을 '문제를 줄입니다'로 약하게 바꿨다.

## 글의 품질: 쌍 비교

두 결과가 모두 의미 보존을 통과한 쌍만 비교했다. 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### A vs B2 (기준선 재사용)

재사용: A ← `2026-10-27-dev`

쌍(사례 × 회차) 38개 중 비교 27개, 제외 11개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 20/27.

| 판정 | 쌍 수 |
|---|---|
| A 우세 | 2 |
| B2 우세 | 13 |
| 차이 없음 | 5 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 7 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `already-good-intro` | 차이 없음 · 차이 없음 |
| `benchmark-scope` | A 우세 · 순서 불일치 |
| `draft-from-facts` | 제외 · A 우세 |
| `english-readme-slop` | B2 우세 · B2 우세 |
| `english-terms-and-list` | B2 우세 · 차이 없음 |
| `missing-evidence` | 제외 · B2 우세 |
| `necessary-contrast` | 순서 불일치 · B2 우세 |
| `personal-blog-voice` | 제외 · 제외 |
| `polite-email-noop` | B2 우세 · B2 우세 |
| `pr-body-mixed-terms` | 제외 · 제외 |
| `pr-technical-literals` | 제외 · 제외 |
| `proposal-cost-exceptions` | 제외 · 제외 |
| `quotation-and-opinion` | B2 우세 · 순서 불일치 |
| `readme-long-repetition` | B2 우세 · 차이 없음 |
| `readme-rewrite` | B2 우세 · B2 우세 |
| `review-only` | 순서 불일치 · 차이 없음 |
| `source-as-data` | B2 우세 · B2 우세 |
| `summary-request` | 순서 불일치 · 제외 |
| `uncertainty-and-plan` | 순서 불일치 · 순서 불일치 |

사례 19개: 승패가 난 회차가 모두 A 쪽 2개, 모두 B2 쪽 9개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 8개.

### B0 vs B2 (기준선 재사용)

재사용: B0 ← `2026-10-27-dev`

쌍(사례 × 회차) 38개 중 비교 35개, 제외 3개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 24/35.

| 판정 | 쌍 수 |
|---|---|
| B0 우세 | 3 |
| B2 우세 | 11 |
| 차이 없음 | 10 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 11 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `already-good-intro` | 차이 없음 · 차이 없음 |
| `benchmark-scope` | B0 우세 · 순서 불일치 |
| `draft-from-facts` | 제외 · B2 우세 |
| `english-readme-slop` | B2 우세 · B2 우세 |
| `english-terms-and-list` | B2 우세 · 차이 없음 |
| `missing-evidence` | B2 우세 · 제외 |
| `necessary-contrast` | 차이 없음 · B2 우세 |
| `personal-blog-voice` | 순서 불일치 · 순서 불일치 |
| `polite-email-noop` | 차이 없음 · 차이 없음 |
| `pr-body-mixed-terms` | 순서 불일치 · 제외 |
| `pr-technical-literals` | B0 우세 · 순서 불일치 |
| `proposal-cost-exceptions` | 차이 없음 · 순서 불일치 |
| `quotation-and-opinion` | 순서 불일치 · B2 우세 |
| `readme-long-repetition` | B2 우세 · B2 우세 |
| `readme-rewrite` | B2 우세 · 순서 불일치 |
| `review-only` | 순서 불일치 · B0 우세 |
| `source-as-data` | 차이 없음 · 차이 없음 |
| `summary-request` | 순서 불일치 · 차이 없음 |
| `uncertainty-and-plan` | 순서 불일치 · B2 우세 |

사례 19개: 승패가 난 회차가 모두 B0 쪽 3개, 모두 B2 쪽 9개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 7개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| B2 | 38 | 5.1 | 20,594 | 496 | 2 | 2.007 |

판정 호출: 162회(재시도 포함), 비용 합 6.189 USD.

