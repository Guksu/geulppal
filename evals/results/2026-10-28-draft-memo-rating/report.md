# 사람 블라인드 비교

자동 생성 파일이다(`node scripts/eval/rating.mjs score`). 평가자는 저장소 소유자 한 명이고, 어느 쪽이 어떤 조건인지 모르는 상태로 골랐다.

## 그룹별

| 비교 | 결과 |
|---|---|
| A-vs-0.4.1 | 글빨 없음 1, 글빨 0.4.1 3, 비슷함 1 |
| H-vs-0.4.1 | 사람 기사 2, 글빨 0.4.1 1 |

## 쌍별

| 쌍 | 비교 | 사례 | 사람 | 판정 모델 | 메모 |
|---|---|---|---|---|---|
| p01 | A-vs-0.4.1 | `relief-fund-report` r2 | 글빨 없음 | 글빨 0.4.1 |  |
| p02 | H-vs-0.4.1 | `korean-curriculum-press` r2 | 사람 기사 | 사람 기사 |  |
| p03 | A-vs-0.4.1 | `smart-factory-press` r2 | 글빨 0.4.1 | 글빨 0.4.1 |  |
| p04 | H-vs-0.4.1 | `smart-factory-press` r1 | 글빨 0.4.1 | 글빨 0.4.1 |  |
| p05 | A-vs-0.4.1 | `meister-college-press` r1 | 글빨 0.4.1 | 글빨 0.4.1 |  |
| p06 | H-vs-0.4.1 | `meister-college-press` r1 | 사람 기사 | 글빨 0.4.1 |  |
| p07 | A-vs-0.4.1 | `tower-crane-notice` r2 | 비슷함 | 글빨 0.4.1 |  |
| p08 | A-vs-0.4.1 | `avian-flu-notice` r1 | 글빨 0.4.1 | 글빨 0.4.1 |  |
