# 사례별 결과: 처음 보는 사례

[← 벤치마크 개요](../../README.md)

스킬 0.2.0을 고정한 뒤 별도 세션이 만든 사례 12개입니다. 사례마다 조건별로 2회씩 실행했습니다.

사례 이름을 누르면 요청, 원문, 조건별 결과, 판정 이유를 볼 수 있습니다. 의미 보존 칸은 조건마다 통과한 회차 수입니다(글빨 없음 · 글빨 0.1.0 · 글빨 0.2.0).

| 사례 | 작업 | 의미 보존 통과<br>(없음 · 0.1.0 · 0.2.0) | 없음 vs 0.2.0 | 0.1.0 vs 0.2.0 | 없음 vs 0.1.0 |
|---|---|---|---|---|---|
| [`readme-pgsnap-ko`](readme-pgsnap-ko.md)<br>README | 수정 | 1/2 · 2/2 · 2/2 | 엇갈림 · 제외 | 같음 · 같음 | 같음 · 제외 |
| [`pr-image-cache-ko-en`](pr-image-cache-ko-en.md)<br>PR 본문 | 수정 | 0/2 · 0/2 · 0/2 | 제외 · 제외 | 제외 · 제외 | 제외 · 제외 |
| [`proposal-warehouse-picking-ko`](proposal-warehouse-picking-ko.md)<br>제안서 일부 | 수정 | 0/2 · 2/2 · 2/2 | 제외 · 제외 | 엇갈림 · 같음 | 제외 · 제외 |
| [`product-pet-feeder-ko`](product-pet-feeder-ko.md)<br>제품 소개글 | 수정 | 2/2 · 2/2 · 2/2 | 엇갈림 · 없음 | 엇갈림 · 0.1.0 | 없음 · 엇갈림 |
| [`draft-pool-closure-notice-ko`](draft-pool-closure-notice-ko.md)<br>시설 휴관 공지 | 새 글 작성 | 2/2 · 1/2 · 2/2 | 엇갈림 · 0.2.0 | 제외 · 0.1.0 | 제외 · 엇갈림 |
| [`en-docs-tile-seeding`](en-docs-tile-seeding.md)<br>기술 문서 | 수정 | 2/2 · 2/2 · 2/2 | 0.2.0 · 엇갈림 | 0.1.0 · 같음 | 0.1.0 · 엇갈림 |
| [`column-preventive-maintenance-ko`](column-preventive-maintenance-ko.md)<br>사보 칼럼 | 수정 | 0/2 · 2/2 · 2/2 | 제외 · 제외 | 엇갈림 · 0.2.0 | 제외 · 제외 |
| [`noop-publisher-submission-guide-ko`](noop-publisher-submission-guide-ko.md)<br>투고 안내문 | 고칠 게 없으면 그대로 | 2/2 · 2/2 · 2/2 | 같음 · 같음 | 0.2.0 · 엇갈림 | 엇갈림 · 엇갈림 |
| [`blog-half-marathon-retro-ko`](blog-half-marathon-retro-ko.md)<br>개인 블로그 회고 | 수정 | 2/2 · 2/2 · 2/2 | 엇갈림 · 0.2.0 | 엇갈림 · 같음 | 없음 · 0.1.0 |
| [`email-conference-speakers-ko`](email-conference-speakers-ko.md)<br>업무 안내 이메일 | 수정 | 0/2 · 1/2 · 0/2 | 제외 · 제외 | 제외 · 제외 | 제외 · 제외 |
| [`diagnose-youth-rent-press-release-ko`](diagnose-youth-rent-press-release-ko.md)<br>보도자료 초안 | 진단만 | 0/2 · 1/2 · 0/2 | 제외 · 제외 | 제외 · 제외 | 제외 · 제외 |
| [`summarize-music-festival-minutes-ko`](summarize-music-festival-minutes-ko.md)<br>회의록 요약 | 요약 | 1/2 · 2/2 · 2/2 | 제외 · 엇갈림 | 엇갈림 · 0.2.0 | 제외 · 엇갈림 |

품질 비교 칸은 회차별 결과입니다. 이름이 적힌 쪽이 우세, `같음`은 차이 없음, `엇갈림`은 순서를 바꾸면 판정이 바뀐 경우, `제외`는 한쪽 이상이 의미 보존에 실패해 비교하지 않은 경우입니다.

자동으로 만든 페이지입니다. 판정은 모두 모델(`claude-opus-5-5`)이 했고 사람의 평가가 아닙니다.
