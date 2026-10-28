# 사람 블라인드 비교

자동 생성 파일이다(`node scripts/eval/rating.mjs score`). 평가자는 저장소 소유자 한 명이고, 어느 쪽이 어떤 조건인지 모르는 상태로 골랐다.

## 그룹별

| 비교 | 결과 |
|---|---|
| A-vs-0.3.0 | 비슷함 10, 글빨 0.3.0 1 |
| B-vs-0.3.0 | 글빨 0.2.1 1, 글빨 0.3.0 1, 비슷함 2 |
| H-vs-0.3.0 | 사람 원문 1, 글빨 0.3.0 2, 비슷함 4 |

## 쌍별

| 쌍 | 비교 | 사례 | 사람 | 판정 모델 | 메모 |
|---|---|---|---|---|---|
| p01 | A-vs-0.3.0 | `entry-quarantine-2022-polish` r1 | 비슷함 | 글빨 0.3.0 |  |
| p02 | B-vs-0.3.0 | `entry-quarantine-2022-deslop` r2 | 글빨 0.2.1 | 글빨 0.3.0 |  |
| p03 | H-vs-0.3.0 | `doc24-review-2021-deslop` r1 | 사람 원문 | 사람 원문 |  |
| p04 | H-vs-0.3.0 | `dmz-center-2022-deslop` r2 | 글빨 0.3.0 | 글빨 0.3.0 |  |
| p05 | B-vs-0.3.0 | `tour-flight-2021-polish` r2 | 글빨 0.3.0 | 차이 없음 |  |
| p06 | A-vs-0.3.0 | `reporter-recruit-2020-deslop` r1 | 글빨 0.3.0 | 글빨 없음 |  |
| p07 | H-vs-0.3.0 | `scholarship-news-2021-deslop` r1 | 글빨 0.3.0 | 글빨 0.3.0 |  |
| p08 | B-vs-0.3.0 | `support-fund-qa-2021-polish` r2 | 비슷함 | 엇갈림 |  |
| p09 | B-vs-0.3.0 | `dmz-center-2022-polish` r1 | 비슷함 | 엇갈림 |  |
| p10 | A-vs-0.3.0 | `support-fund-qa-2021-deslop` r1 | 비슷함 | 엇갈림 |  |
| p11 | A-vs-0.3.0 | `olympics-home-2022-polish` r1 | 비슷함 | - |  |
| p12 | A-vs-0.3.0 | `support-fund-qa-2021-polish` r2 | 비슷함 | 글빨 없음 |  |
| p13 | H-vs-0.3.0 | `entry-quarantine-2022-deslop` r1 | 비슷함 | 글빨 0.3.0 |  |
| p14 | A-vs-0.3.0 | `scholarship-news-2021-deslop` r2 | 비슷함 | - |  |
| p15 | H-vs-0.3.0 | `reporter-recruit-2020-deslop` r1 | 비슷함 | 사람 원문 |  |
| p16 | A-vs-0.3.0 | `reporter-recruit-2020-polish` r1 | 비슷함 | 글빨 0.3.0 |  |
| p17 | A-vs-0.3.0 | `entry-quarantine-2022-deslop` r2 | 비슷함 | 엇갈림 |  |
| p18 | A-vs-0.3.0 | `scholarship-news-2021-polish` r2 | 비슷함 | - |  |
| p19 | A-vs-0.3.0 | `doc24-review-2021-polish` r2 | 비슷함 | - |  |
| p20 | H-vs-0.3.0 | `support-fund-qa-2021-deslop` r2 | 비슷함 | 글빨 0.3.0 |  |
| p21 | H-vs-0.3.0 | `relief-fund-2020-deslop` r1 | 비슷함 | 엇갈림 |  |
| p22 | A-vs-0.3.0 | `hangang-water-2018-polish` r2 | 비슷함 | - |  |
