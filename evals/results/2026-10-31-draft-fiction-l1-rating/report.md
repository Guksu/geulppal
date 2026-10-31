# 사람 블라인드 비교

자동 생성 파일이다(`node scripts/eval/rating.mjs score`). 평가자는 저장소 소유자 한 명이고, 어느 쪽이 어떤 조건인지 모르는 상태로 골랐다.

## 그룹별

| 비교 | 결과 |
|---|---|
| 0.4.3-vs-0.4.6 | 0.4.6 후보 2, 글빨 0.4.3 2, 비슷함 5 |

## 쌍별

| 쌍 | 비교 | 사례 | 사람 | 판정 모델 | 메모 |
|---|---|---|---|---|---|
| p01 | 0.4.3-vs-0.4.6 | `tangerine-style` r1 | 0.4.6 후보 | 차이 없음 |  |
| p02 | 0.4.3-vs-0.4.6 | `umbrella-constraint` r1 | 글빨 0.4.3 | 글빨 0.4.3 |  |
| p03 | 0.4.3-vs-0.4.6 | `elevator-brief` r1 | 0.4.6 후보 | 글빨 0.4.3 |  |
| p04 | 0.4.3-vs-0.4.6 | `bedding-shop-memo` r2 | 글빨 0.4.3 | - |  |
| p05 | 0.4.3-vs-0.4.6 | `bakery-closing-memo` r2 | 비슷함 | - |  |
| p06 | 0.4.3-vs-0.4.6 | `rooster-school-style` r2 | 비슷함 | - |  |
| p07 | 0.4.3-vs-0.4.6 | `night-shift-brief` r2 | 비슷함 | 엇갈림 |  |
| p08 | 0.4.3-vs-0.4.6 | `harbor-dialect-memo` r1 | 비슷함 | 글빨 0.4.3 |  |
| p09 | 0.4.3-vs-0.4.6 | `taxi-style` r1 | 비슷함 | - |  |
