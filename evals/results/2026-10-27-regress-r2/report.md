# 결과: 2026-10-27-regress-r2

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-27-regress-r2`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| C2 | `evals/snapshots/v0.3.0-r2/geulppal` | 8f16b081d476 | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| C2 | 24 | 24 | 없음 | 0 | 24/24 | 16/24 | 0 | 24/24 |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 의미 보존

판정 모델의 의미 보존 검사와 문자열 검사(`exact`)를 모두 통과해야 통과다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| C2 | 24 | 21 | 3 | 1 | 0 | 0 |

### 사례별

| 사례 | C2 |
|---|---|
| `blog-half-marathon-retro-ko` | ○ ○ |
| `column-preventive-maintenance-ko` | ○ ○ |
| `diagnose-youth-rent-press-release-ko` | ○ ○ |
| `draft-pool-closure-notice-ko` | ○ ○ |
| `email-conference-speakers-ko` | ○ ○ |
| `en-docs-tile-seeding` | ○ ○ |
| `noop-publisher-submission-guide-ko` | ○ ✗ |
| `pr-image-cache-ko-en` | ○ ✗ |
| `product-pet-feeder-ko` | ○ ○ |
| `proposal-warehouse-picking-ko` | ○ ○ |
| `readme-pgsnap-ko` | ○ ○ |
| `summarize-music-festival-minutes-ko` | ✗ ○ |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 의미 보존 실패

- C2 `noop-publisher-submission-guide-ko` r2: 문자열 누락: `[투고] 작품 제목_이름`, `봄날책방`
- C2 `pr-image-cache-ko-en` r2: 보존 항목 'iOS는 무관해서 테스트하지 않았다는 점'이 본문에서 빠졌다(메모에서 뺐다고 밝혔지만 본문에는 없다).
- C2 `summarize-music-festival-minutes-ko` r1: 분량 조건 위반: 제목 줄과 번호 항목 5줄을 합쳐 6줄로, 요청한 '5줄 이내'를 넘었다.

## 글의 품질: 쌍 비교

두 결과가 모두 의미 보존을 통과한 쌍만 비교했다. 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### B2 vs C2 (기준선 재사용)

재사용: B2 ← `2026-10-27-holdout`

쌍(사례 × 회차) 24개 중 비교 16개, 제외 8개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 13/16.

| 판정 | 쌍 수 |
|---|---|
| B2 우세 | 4 |
| C2 우세 | 3 |
| 차이 없음 | 6 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 3 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `blog-half-marathon-retro-ko` | 순서 불일치 · 차이 없음 |
| `column-preventive-maintenance-ko` | 차이 없음 · B2 우세 |
| `diagnose-youth-rent-press-release-ko` | 제외 · 제외 |
| `draft-pool-closure-notice-ko` | C2 우세 · C2 우세 |
| `email-conference-speakers-ko` | 제외 · 제외 |
| `en-docs-tile-seeding` | C2 우세 · 순서 불일치 |
| `noop-publisher-submission-guide-ko` | B2 우세 · 제외 |
| `pr-image-cache-ko-en` | 제외 · 제외 |
| `product-pet-feeder-ko` | B2 우세 · 순서 불일치 |
| `proposal-warehouse-picking-ko` | 차이 없음 · 차이 없음 |
| `readme-pgsnap-ko` | 차이 없음 · 차이 없음 |
| `summarize-music-festival-minutes-ko` | 제외 · B2 우세 |

사례 12개: 승패가 난 회차가 모두 B2 쪽 4개, 모두 C2 쪽 2개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 6개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| C2 | 24 | 17.5 | 32,765 | 1,976 | 2 | 1.929 |

판정 호출: 56회(재시도 포함), 비용 합 3.623 USD.

