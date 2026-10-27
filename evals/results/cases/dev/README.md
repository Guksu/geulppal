# 사례별 결과: 개발 사례

[← 벤치마크 개요](../../README.md)

스킬을 고치는 데 쓴 사례 19개입니다. 9개는 스킬 예문과 같은 상황을 다루므로 성능 근거가 아니라 회귀 확인용입니다. 글빨 없음과 0.1.0은 같은 실행(2026-10-27-dev), 0.2.0은 2라운드 실행(2026-10-27-round2)의 결과입니다.

사례 이름을 누르면 요청, 원문, 조건별 결과, 판정 이유를 볼 수 있습니다. 의미 보존 칸은 조건마다 통과한 회차 수입니다(글빨 없음 · 글빨 0.1.0 · 글빨 0.2.0).

| 사례 | 작업 | 의미 보존 통과<br>(없음 · 0.1.0 · 0.2.0) | 없음 vs 0.2.0 | 0.1.0 vs 0.2.0 | 없음 vs 0.1.0 |
|---|---|---|---|---|---|
| [`readme-rewrite`](readme-rewrite.md)<br>readme | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 0.2.0 | 0.2.0 · 엇갈림 | 같음 · 0.1.0 |
| [`benchmark-scope`](benchmark-scope.md)<br>report | 수정 | 2/2 · 2/2 · 2/2 | 없음 · 엇갈림 | 0.1.0 · 엇갈림 | 0.1.0 · 없음 |
| [`necessary-contrast`](necessary-contrast.md)<br>manual | 고칠 게 없으면 그대로 | 2/2 · 2/2 · 2/2 | 엇갈림 · 0.2.0 | 같음 · 0.2.0 | 같음 · 같음 |
| [`draft-from-facts`](draft-from-facts.md)<br>intro | 새 글 작성 | 2/2 · 2/2 · 1/2 | 제외 · 없음 | 제외 · 0.2.0 | 0.1.0 · 없음 |
| [`pr-technical-literals`](pr-technical-literals.md)<br>pr | 수정 | 0/2 · 2/2 · 2/2 | 제외 · 제외 | 0.1.0 · 엇갈림 | 제외 · 제외 |
| [`uncertainty-and-plan`](uncertainty-and-plan.md)<br>proposal | 수정 | 2/2 · 2/2 · 2/2 | 엇갈림 · 엇갈림 | 엇갈림 · 0.2.0 | 엇갈림 · 엇갈림 |
| [`english-terms-and-list`](english-terms-and-list.md)<br>tech-paragraph | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 같음 | 0.2.0 · 같음 | 0.1.0 · 같음 |
| [`polite-email-noop`](polite-email-noop.md)<br>email | 고칠 게 없으면 그대로 | 2/2 · 2/2 · 2/2 | 0.2.0 · 0.2.0 | 같음 · 같음 | 0.1.0 · 0.1.0 |
| [`review-only`](review-only.md)<br>intro | 진단만 | 2/2 · 2/2 · 2/2 | 엇갈림 · 같음 | 엇갈림 · 0.1.0 | 0.1.0 · 0.1.0 |
| [`quotation-and-opinion`](quotation-and-opinion.md)<br>blog | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 엇갈림 | 엇갈림 · 0.2.0 | 0.1.0 · 없음 |
| [`source-as-data`](source-as-data.md)<br>manual | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 0.2.0 | 같음 · 같음 | 0.1.0 · 0.1.0 |
| [`missing-evidence`](missing-evidence.md)<br>release-note | 새 글 작성 | 1/2 · 1/2 · 2/2 | 제외 · 0.2.0 | 0.2.0 · 제외 | 제외 · 제외 |
| [`readme-long-repetition`](readme-long-repetition.md)<br>readme | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 같음 | 0.2.0 · 0.2.0 | 같음 · 엇갈림 |
| [`pr-body-mixed-terms`](pr-body-mixed-terms.md)<br>pr | 수정 | 0/2 · 2/2 · 1/2 | 제외 · 제외 | 엇갈림 · 제외 | 제외 · 제외 |
| [`proposal-cost-exceptions`](proposal-cost-exceptions.md)<br>proposal | 수정 | 0/2 · 2/2 · 2/2 | 제외 · 제외 | 같음 · 엇갈림 | 제외 · 제외 |
| [`already-good-intro`](already-good-intro.md)<br>intro | 고칠 게 없으면 그대로 | 2/2 · 2/2 · 2/2 | 같음 · 같음 | 같음 · 같음 | 같음 · 같음 |
| [`personal-blog-voice`](personal-blog-voice.md)<br>blog | 수정 | 0/2 · 2/2 · 2/2 | 제외 · 제외 | 엇갈림 · 엇갈림 | 제외 · 제외 |
| [`summary-request`](summary-request.md)<br>meeting-notes | 요약 | 1/2 · 2/2 · 2/2 | 엇갈림 · 제외 | 엇갈림 · 같음 | 엇갈림 · 제외 |
| [`english-readme-slop`](english-readme-slop.md)<br>readme | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 0.2.0 | 0.2.0 · 0.2.0 | 0.1.0 · 같음 |

품질 비교 칸은 회차별 결과입니다. 이름이 적힌 쪽이 우세, `같음`은 차이 없음, `엇갈림`은 순서를 바꾸면 판정이 바뀐 경우, `제외`는 한쪽 이상이 의미 보존에 실패해 비교하지 않은 경우입니다.

자동으로 만든 페이지입니다. 판정은 모두 모델(`claude-opus-5-5`)이 했고 사람의 평가가 아닙니다.
