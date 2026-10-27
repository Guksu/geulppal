# 결과: 2026-10-27-regress-dev-r1

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-27-regress-dev-r1`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| C1 | `evals/snapshots/v0.3.0-r1/geulppal` | eccd3fa591e3 | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| C1 | 38 | 38 | 없음 | 0 | 38/38 | 18/38 | 0 | 38/38 |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 의미 보존

판정 모델의 의미 보존 검사와 문자열 검사(`exact`)를 모두 통과해야 통과다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| C1 | 38 | 37 | 1 | 0 | 0 | 0 |

### 사례별

| 사례 | C1 |
|---|---|
| `already-good-intro` | ○ ○ |
| `benchmark-scope` | ○ ○ |
| `draft-from-facts` | ○ ✗ |
| `english-readme-slop` | ○ ○ |
| `english-terms-and-list` | ○ ○ |
| `missing-evidence` | ○ ○ |
| `necessary-contrast` | ○ ○ |
| `personal-blog-voice` | ○ ○ |
| `polite-email-noop` | ○ ○ |
| `pr-body-mixed-terms` | ○ ○ |
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

- C1 `draft-from-facts` r2: CSV 내보내기를 '찾은 메모'를 내보내는 기능으로 좁혀 원문에 없는 기능 연결을 만듦 / '한곳에 모아 두고'라는 표현으로 원문에 없는 저장·수집 기능을 암시함(저장 방식은 제공하지 않는다고 명시됨)

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| C1 | 38 | 7.9 | 21,710 | 463 | 2 | 2.159 |

판정 호출: 38회(재시도 포함), 비용 합 1.367 USD.

