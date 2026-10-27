# 결과: 2026-10-27-holdout

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-27-holdout`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| A | 없음 | - | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |
| B0 | `evals/snapshots/v0.1.0/geulppal` | ef6dd283372a | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |
| B2 | `evals/snapshots/v0.2.0-r2/geulppal` | c823da79c250 | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| A | 24 | 24 | 없음 | 0 | 해당 없음 (geulppal 목록 노출 0) | - | 0 | 24/24 |
| B0 | 24 | 24 | 없음 | 0 | 24/24 | 10/24 | 0 | 24/24 |
| B2 | 24 | 24 | 없음 | 0 | 24/24 | 11/24 | 0 | 24/24 |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 의미 보존

판정 모델의 의미 보존 검사와 문자열 검사(`exact`)를 모두 통과해야 통과다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| A | 24 | 12 | 12 | 0 | 0 | 0 |
| B0 | 24 | 19 | 5 | 0 | 0 | 0 |
| B2 | 24 | 18 | 6 | 0 | 0 | 0 |

같은 결과를 판정 모델로 한 번 더 판정했다(2차). 품질 비교 대상은 1차 판정으로 정했다.

| 조건 | 두 번 판정한 실행 | 판정 일치 | 1차 통과 | 2차 통과 | 둘 다 통과(엄격) |
|---|---|---|---|---|---|
| A | 24 | 21 | 12 | 11 | 10 |
| B0 | 24 | 23 | 19 | 18 | 18 |
| B2 | 24 | 24 | 18 | 18 | 18 |

### 사례별

| 사례 | A | B0 | B2 |
|---|---|---|---|
| `blog-half-marathon-retro-ko` | ○ ○ | ○ ○ | ○ ○ |
| `column-preventive-maintenance-ko` | ✗ ✗ | ○ ○ | ○ ○ |
| `diagnose-youth-rent-press-release-ko` | ✗ ✗ | ✗ ○ | ✗ ✗ |
| `draft-pool-closure-notice-ko` | ○ ○ | ✗ ○ | ○ ○ |
| `email-conference-speakers-ko` | ✗ ✗ | ○ ✗ | ✗ ✗ |
| `en-docs-tile-seeding` | ○ ○ | ○ ○ | ○ ○ |
| `noop-publisher-submission-guide-ko` | ○ ○ | ○ ○ | ○ ○ |
| `pr-image-cache-ko-en` | ✗ ✗ | ✗ ✗ | ✗ ✗ |
| `product-pet-feeder-ko` | ○ ○ | ○ ○ | ○ ○ |
| `proposal-warehouse-picking-ko` | ✗ ✗ | ○ ○ | ○ ○ |
| `readme-pgsnap-ko` | ○ ✗ | ○ ○ | ○ ○ |
| `summarize-music-festival-minutes-ko` | ✗ ○ | ○ ○ | ○ ○ |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 의미 보존 실패

- A `column-preventive-maintenance-ko` r1: 본문에 월평균 환산값(약 17.7시간→약 12.3시간)을 새로 계산해 넣었다. 원문이 그대로 비교하기 어렵다고 한 12개월·6개월 정지 시간을 같은 기준으로 맞춰 '줄었다'고 제시해 금지 변경을 어겼다. / 원문에 없는 수치를 본문에 넣었다. 메모에서 밝혔더라도 본문에 들어간 이상 문제다.
- A `column-preventive-maintenance-ko` r2: 본문에 원문에 없는 월평균 수치(약 17.7시간→약 12.3시간)를 계산해 넣었습니다. 이 때문에 12개월 기록과 6개월 기록을 같은 기준처럼 놓고 감소로 비교하게 되어 '감소율이나 절감액을 새로 계산해 넣기' 금지 항목을 어겼습니다. / 같은 월평균 수치 때문에 '원문에 없는 수치 추가' 금지 항목도 어겼습니다. 메모에서 밝혔어도 수치가 본문에 들어 있으므로 문제입니다.
- A `diagnose-youth-rent-press-release-ko` r1: 원문의 "청년에게 현금으로 지급하는 것이 아니라 임대인 계좌로 직접 지급된다"를 "현금이 아니라 임대인 계좌로 지급"으로 줄여 인용했다. 그 바람에 받는 사람의 대조(청년 대 임대인)가 사라졌다. / 필요한 지급 방식 대조를 "계좌 이체도 현금성 지급"이라는 근거로 "대비가 정확하지 않다"며 문제로 잘못 진단했다.
- A `diagnose-youth-rent-press-release-ko` r2: new_facts: 원문에 연도가 없는데 결과가 '11월 28일은 토요일'이라고 요일을 단정하고, 이를 근거로 마감 시각 문제를 제기했습니다.
- A `email-conference-speakers-ko` r1: 온라인 발표 적용 조건이 '해외에 계셔서'에서 '해외 체류 등으로'로 넓어져, 해외 체류자에게만 허용된 온라인 발표가 다른 사유에도 열린 것처럼 바뀜
- A `email-conference-speakers-ko` r2: 온라인 발표 조건이 넓어졌습니다. 원문은 '해외에 계셔서 현장 참석이 어려우신 경우'로 한정했는데, 결과는 '해외 체류 등으로'라고 써서 해외 체류가 아닌 사유로도 온라인 발표가 가능한 것처럼 읽힙니다.
- A `pr-image-cache-ko-en` r1: 본문에 원문에 없는 주장 "OOM이 주로 발생하는 저사양 기기"를 넣음(new_facts) / 원문의 전체 리뷰 요청("리뷰 부탁드립니다!")이 빠짐(보존 항목 lost, omission)
- A `pr-image-cache-ko-en` r2: new_facts: '리뷰어 참고' 섹션 본문에 원문에 없는 머지 조건('머지 전에 결과를 확인해야 합니다')과 원문에 없는 중점 리뷰 요청(64MB 기본값과 onTrimMemory 때 비우는 비율)을 넣었다.
- A `proposal-warehouse-picking-ko` r1: 2년 계약 10% 할인에서 원문의 '조건 제시받음'이 빠져 확정 조건처럼 읽힘: "2. 계약 기간: 1년 또는 2년(2년 계약 시 라이선스 10% 할인)" / 냉동 구역 판단이 '판단할 필요가 있습니다'에서 '판단하겠습니다'로 바뀌어 필요성 서술이 약속으로 바뀜
- A `proposal-warehouse-picking-ko` r2: 2년 계약 10% 할인에서 원문의 '제시받음'이 빠져, 공급사 제안 단계를 확정된 계약 조건처럼 씀(금지 변경 위반, status_certainty)
- A `readme-pgsnap-ko` r2: 본문 소개문에 원문에 없는 '정기 백업' 기능과 '설정 파일 하나로 처리'한다는 주장을 추가함(메모에서 밝혔어도 본문에 들어갔으므로 문제) / '오래 걸릴 수 있습니다'를 '오래 걸립니다'로 바꿔 가능성 표현을 단정으로 강화함
- A `summarize-music-festival-minutes-ko` r1: 요청은 5줄 이내 요약인데, 결과는 머리 줄 1줄에 번호 항목 5줄이 더해져 6줄이다. 줄 수 제한을 어겼다.
- B0 `diagnose-youth-rent-press-release-ko` r1: 진단에서 원문의 '약 300명으로 예정'을 "300명에게 … 지원하는 사업"으로 확정된 인원처럼 서술해 확실성이 바뀜 / 원문에 3회 나오는 '이번 사업'을 4번 나온다고 잘못 셈
- B0 `draft-pool-closure-notice-ko` r1: new_facts: 본문에 원문에 없는 '확정되면 홈페이지에 안내합니다'라는 공지 약속을 추가했다. 원문은 확정 전에는 '협의 중'이라고만 쓰라고 지시했다.
- B0 `email-conference-speakers-ko` r2: 온라인 발표 적용 조건이 원문의 '해외에 계셔서 현장 참석이 어려우신 경우'에서 "해외 체류 등으로 현장 참석이 어려우시면"으로 바뀌어, 해외 체류가 아닌 사유까지 포함하도록 넓어졌다.
- B0 `pr-image-cache-ko-en` r1: 보존 항목 'iOS는 무관해서 테스트하지 않았다는 점'이 본문에서 빠짐(메모에서는 삭제 사실만 밝힘) / omission: 테스트 범위 정보(iOS 테스트 안 함)가 본문에서 빠짐
- B0 `pr-image-cache-ko-en` r2: 보존 항목인 리뷰 요청('리뷰 부탁드립니다!')이 본문에서 빠짐. 메모에서 직접 붙이라고 안내만 했을 뿐 본문에는 들어 있지 않음
- B2 `diagnose-youth-rent-press-release-ko` r1: 진단만 하라는 요청인데, 6항에서 '예정되어 있으며'를 '예정이며'로 바꾸는 대체 문구를 냈습니다(금지 변경 '대체 문구를 써 주기'에 해당하고 scope 위반입니다).
- B2 `diagnose-youth-rent-press-release-ko` r2: 진단이 원문을 잘못 설명했다. 대상·금액이 2문단에 있는데 "모두 3문단 이후에 나옵니다"라고 했다. / "청년 주거 문제"가 원문에 세 번 나오는데 "네 번"(4문단 두 번)이라고 잘못 셌다. / 원문의 '최대 12개월'을 '12개월'로 적어 지원 기간의 상한 조건을 고정 기간처럼 바꿨다.
- B2 `email-conference-speakers-ko` r1: 온라인 발표 허용 조건이 원문의 '해외에 계셔서 현장 참석이 어려우신 경우'에서 '해외 체류 등으로 현장 참석이 어려우시면'으로 넓어져, 해외 체류가 아닌 다른 사유로도 온라인 발표가 가능한 것처럼 읽힌다.
- B2 `email-conference-speakers-ko` r2: 온라인 발표 조건이 넓어짐: 원문은 '해외에 계셔서 현장 참석이 어려우신 경우'로 한정했는데, 결과는 '해외에 계시는 등 현장 참석이 어려우시면'이라고 써서 해외 체류를 여러 예시 중 하나로 만들었다. 그래서 다른 사유로 현장에 오기 어려운 발표자도 온라인 발표를 할 수 있는 것처럼 읽힌다.
- B2 `pr-image-cache-ko-en` r1: 본문에 원문에 없는 사실 'OOM 발생 여부는 직접 확인하지 않았습니다'를 단정해 추가함(new_facts) / 원문 본문의 기대 'OOM 문제가 해결될 것으로 기대'를 'OOM도 줄어들 것으로 기대'로 약화해 주장의 내용이 바뀜(status_certainty)
- B2 `pr-image-cache-ko-en` r2: 보존 항목 '리뷰 요청'이 빠짐: 결론 섹션을 지우면서 '리뷰 부탁드립니다!'도 함께 사라짐

## 글의 품질: 쌍 비교

두 결과가 모두 의미 보존을 통과한 쌍만 비교했다. 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### A vs B0

쌍(사례 × 회차) 24개 중 비교 11개, 제외 13개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 5/11.

| 판정 | 쌍 수 |
|---|---|
| A 우세 | 2 |
| B0 우세 | 2 |
| 차이 없음 | 1 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 6 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `blog-half-marathon-retro-ko` | A 우세 · B0 우세 |
| `column-preventive-maintenance-ko` | 제외 · 제외 |
| `diagnose-youth-rent-press-release-ko` | 제외 · 제외 |
| `draft-pool-closure-notice-ko` | 제외 · 순서 불일치 |
| `email-conference-speakers-ko` | 제외 · 제외 |
| `en-docs-tile-seeding` | B0 우세 · 순서 불일치 |
| `noop-publisher-submission-guide-ko` | 순서 불일치 · 순서 불일치 |
| `pr-image-cache-ko-en` | 제외 · 제외 |
| `product-pet-feeder-ko` | A 우세 · 순서 불일치 |
| `proposal-warehouse-picking-ko` | 제외 · 제외 |
| `readme-pgsnap-ko` | 차이 없음 · 제외 |
| `summarize-music-festival-minutes-ko` | 제외 · 순서 불일치 |

사례 12개: 승패가 난 회차가 모두 A 쪽 1개, 모두 B0 쪽 1개, 엇갈림 1개, 승패 없음(차이 없음·불일치·제외만) 9개.

### A vs B2

쌍(사례 × 회차) 24개 중 비교 12개, 제외 12개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 6/12.

| 판정 | 쌍 수 |
|---|---|
| A 우세 | 1 |
| B2 우세 | 3 |
| 차이 없음 | 2 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 6 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `blog-half-marathon-retro-ko` | 순서 불일치 · B2 우세 |
| `column-preventive-maintenance-ko` | 제외 · 제외 |
| `diagnose-youth-rent-press-release-ko` | 제외 · 제외 |
| `draft-pool-closure-notice-ko` | 순서 불일치 · B2 우세 |
| `email-conference-speakers-ko` | 제외 · 제외 |
| `en-docs-tile-seeding` | B2 우세 · 순서 불일치 |
| `noop-publisher-submission-guide-ko` | 차이 없음 · 차이 없음 |
| `pr-image-cache-ko-en` | 제외 · 제외 |
| `product-pet-feeder-ko` | 순서 불일치 · A 우세 |
| `proposal-warehouse-picking-ko` | 제외 · 제외 |
| `readme-pgsnap-ko` | 순서 불일치 · 제외 |
| `summarize-music-festival-minutes-ko` | 제외 · 순서 불일치 |

사례 12개: 승패가 난 회차가 모두 A 쪽 1개, 모두 B2 쪽 3개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 8개.

### B0 vs B2

쌍(사례 × 회차) 24개 중 비교 17개, 제외 7개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 11/17.

| 판정 | 쌍 수 |
|---|---|
| B0 우세 | 3 |
| B2 우세 | 3 |
| 차이 없음 | 5 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 6 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `blog-half-marathon-retro-ko` | 순서 불일치 · 차이 없음 |
| `column-preventive-maintenance-ko` | 순서 불일치 · B2 우세 |
| `diagnose-youth-rent-press-release-ko` | 제외 · 제외 |
| `draft-pool-closure-notice-ko` | 제외 · B0 우세 |
| `email-conference-speakers-ko` | 제외 · 제외 |
| `en-docs-tile-seeding` | B0 우세 · 차이 없음 |
| `noop-publisher-submission-guide-ko` | B2 우세 · 순서 불일치 |
| `pr-image-cache-ko-en` | 제외 · 제외 |
| `product-pet-feeder-ko` | 순서 불일치 · B0 우세 |
| `proposal-warehouse-picking-ko` | 순서 불일치 · 차이 없음 |
| `readme-pgsnap-ko` | 차이 없음 · 차이 없음 |
| `summarize-music-festival-minutes-ko` | 순서 불일치 · B2 우세 |

사례 12개: 승패가 난 회차가 모두 B0 쪽 3개, 모두 B2 쪽 3개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 6개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| A | 24 | 10.0 | 9,062 | 1,251 | 1 | 0.884 |
| B0 | 24 | 15.3 | 13,865 | 1,899 | 1 | 1.654 |
| B2 | 24 | 14.1 | 14,593 | 1,892 | 1 | 1.694 |

판정 호출: 152회(재시도 포함), 비용 합 10.577 USD.

