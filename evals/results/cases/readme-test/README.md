# 사례별 결과: 사람이 쓴 README: 확인용

[← 벤치마크 개요](../../README.md)

ChatGPT 공개(2022-11-30) 전에 사람이 쓴 오픈소스 README 발췌입니다. 0.3.0을 고정한 뒤 만든 자료라 모든 조건에 처음 보는 사례이고, 0.3.1 후보(D)를 고칠 때도 보지 않았습니다. 사람 원문(H)은 polish에서는 입력과 같은 글, deslop에서는 부풀리기 전의 원문입니다. 출처와 라이선스는 [sources.json](../../../human-readme/sources.json)에 있습니다.

사례 이름을 누르면 요청, 원문, 조건별 결과, 판정 이유를 볼 수 있습니다. 의미 보존 칸은 조건마다 통과한 회차 수입니다(글빨 없음 · 글빨 0.2.1 · 글빨 0.3.0 · 0.3.1 후보 · 사람 원문).

| 사례 | 작업 | 의미 보존 통과<br>(없음 · 0.2.1 · 0.3.0 · 0.3.1후보 · 사람) | 없음 vs 0.3.0 | 0.2.1 vs 0.3.0 | 사람 vs 0.3.0 | 0.3.0 vs 0.3.1후보 |
|---|---|---|---|---|---|---|
| [`open-korean-text-intro-polish`](open-korean-text-intro-polish.md)<br>README | 수정 | 2/2 · 2/2 · 2/2 · 2/2 · 2/2 | 없음 · 0.3.0 | 같음 · 엇갈림 | 0.3.0 · 0.3.0 | 같음 · 같음 |
| [`open-korean-text-intro-deslop`](open-korean-text-intro-deslop.md)<br>README | 수정 | 1/2 · 2/2 · 2/2 · 1/2 · 2/2 | 제외 · 0.3.0 | 같음 · 같음 | 0.3.0 · 0.3.0 | 제외 · 엇갈림 |
| [`korpora-intro-polish`](korpora-intro-polish.md)<br>README | 수정 | 0/2 · 2/2 · 2/2 · 2/2 · 2/2 | 제외 · 제외 | 엇갈림 · 엇갈림 | 0.3.0 · 0.3.0 | 0.3.1후보 · 엇갈림 |
| [`korpora-intro-deslop`](korpora-intro-deslop.md)<br>README | 수정 | 0/2 · 1/2 · 2/2 · 2/2 · 2/2 | 제외 · 제외 | 제외 · 엇갈림 | 엇갈림 · 0.3.0 | 0.3.1후보 · 엇갈림 |
| [`koelectra-data-polish`](koelectra-data-polish.md)<br>README | 수정 | 2/2 · 2/2 · 2/2 · 2/2 · 2/2 | 엇갈림 · 0.3.0 | 0.3.0 · 엇갈림 | 0.3.0 · 0.3.0 | 엇갈림 · 엇갈림 |
| [`koelectra-data-deslop`](koelectra-data-deslop.md)<br>README | 수정 | 0/2 · 2/2 · 2/2 · 2/2 · 2/2 | 제외 · 제외 | 0.3.0 · 0.2.1 | 0.3.0 · 0.3.0 | 0.3.0 · 엇갈림 |
| [`toss-storage-polish`](toss-storage-polish.md)<br>README | 수정 | 2/2 · 2/2 · 2/2 · 2/2 · 2/2 | 0.3.0 · 0.3.0 | 같음 · 같음 | 0.3.0 · 0.3.0 | 같음 · 같음 |
| [`toss-storage-deslop`](toss-storage-deslop.md)<br>README | 수정 | 2/2 · 2/2 · 2/2 · 2/2 · 2/2 | 0.3.0 · 0.3.0 | 엇갈림 · 같음 | 0.3.0 · 0.3.0 | 같음 · 같음 |

품질 비교 칸은 회차별 결과입니다. 이름이 적힌 쪽이 우세, `같음`은 차이 없음, `엇갈림`은 순서를 바꾸면 판정이 바뀐 경우, `제외`는 한쪽 이상이 의미 보존에 실패해 비교하지 않은 경우입니다.

자동으로 만든 페이지입니다. 판정은 모두 모델(`claude-opus-5-5`)이 했고 사람의 평가가 아닙니다.
