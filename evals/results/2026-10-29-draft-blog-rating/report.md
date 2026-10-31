# 사람 블라인드 비교

자동 생성 파일이다(`node scripts/eval/rating.mjs score`). 평가자는 저장소 소유자 한 명이고, 어느 쪽이 어떤 조건인지 모르는 상태로 골랐다.

## 그룹별

| 비교 | 결과 |
|---|---|
| H-vs-0.4.3 | 사람 글 5, 비슷함 1 |
| A-vs-0.4.3 | 글빨 없음 2, 글빨 0.4.3 2, 비슷함 1 |
| F-vs-0.4.3 | 비슷함 4 |

## 쌍별

| 쌍 | 비교 | 사례 | 사람 | 판정 모델 | 메모 |
|---|---|---|---|---|---|
| p01 | H-vs-0.4.3 | `market-online-blog` r1 | 사람 글 | 사람 글 |  |
| p02 | A-vs-0.4.3 | `ev-charging-style` r1 | 글빨 없음 | 차이 없음 |  |
| p03 | A-vs-0.4.3 | `gov24-newbie-style` r1 | 글빨 0.4.3 | 차이 없음 |  |
| p04 | H-vs-0.4.3 | `ev-charging-style` r1 | 비슷함 | 글빨 0.4.3 |  |
| p05 | H-vs-0.4.3 | `national-park-blog` r1 | 사람 글 | 글빨 0.4.3 |  |
| p06 | H-vs-0.4.3 | `subway-air-blog` r1 | 사람 글 | 사람 글 |  |
| p07 | A-vs-0.4.3 | `subway-air-blog` r2 | 글빨 없음 | 글빨 없음 |  |
| p08 | F-vs-0.4.3 | `vaccine-center-essay` r2 | 비슷함 | 글빨 0.4.3 |  |
| p09 | H-vs-0.4.3 | `weather-station-blog` r2 | 사람 글 | 엇갈림 |  |
| p10 | A-vs-0.4.3 | `national-park-blog` r1 | 비슷함 | 글빨 없음 |  |
| p11 | F-vs-0.4.3 | `market-online-blog` r1 | 비슷함 | 차이 없음 |  |
| p12 | A-vs-0.4.3 | `school-zone-style` r1 | 글빨 0.4.3 | 글빨 없음 |  |
| p13 | H-vs-0.4.3 | `gov24-newbie-style` r2 | 사람 글 | 글빨 0.4.3 |  |
| p14 | F-vs-0.4.3 | `school-zone-style` r1 | 비슷함 | 엇갈림 |  |
| p15 | F-vs-0.4.3 | `subway-air-blog` r1 | 비슷함 | 글빨 0.4.1 |  |
