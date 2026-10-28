# 사람 블라인드 비교

자동 생성 파일이다(`node scripts/eval/rating.mjs score`). 평가자는 저장소 소유자 한 명이고, 어느 쪽이 어떤 조건인지 모르는 상태로 골랐다.

## 그룹별

| 비교 | 결과 |
|---|---|
| C-vs-0.4.0 | 비슷함 2, 글빨 0.4.0 1, 글빨 0.3.0 1 |
| H-vs-0.4.0 | 글빨 0.4.0 8 |
| A-vs-0.4.0 | 비슷함 3, 글빨 0.4.0 3 |

## 쌍별

| 쌍 | 비교 | 사례 | 사람 | 판정 모델 | 메모 |
|---|---|---|---|---|---|
| p01 | C-vs-0.4.0 | `toss-storage-readme` r2 | 비슷함 | 글빨 0.4.0 |  |
| p02 | H-vs-0.4.0 | `toss-storage-readme` r1 | 글빨 0.4.0 | - |  |
| p03 | C-vs-0.4.0 | `kobert-transformers-readme` r1 | 글빨 0.4.0 | 엇갈림 |  |
| p04 | H-vs-0.4.0 | `koelectra-readme` r2 | 글빨 0.4.0 | - |  |
| p05 | H-vs-0.4.0 | `toss-scroll-animation-readme` r1 | 글빨 0.4.0 | - |  |
| p06 | A-vs-0.4.0 | `open-korean-text-readme` r1 | 비슷함 | 엇갈림 |  |
| p07 | A-vs-0.4.0 | `kobert-transformers-readme` r1 | 글빨 0.4.0 | 엇갈림 |  |
| p08 | A-vs-0.4.0 | `toss-hangul-readme` r1 | 글빨 0.4.0 | 글빨 0.4.0 |  |
| p09 | H-vs-0.4.0 | `kobert-transformers-readme` r1 | 글빨 0.4.0 | - |  |
| p10 | C-vs-0.4.0 | `open-korean-text-readme` r1 | 글빨 0.3.0 | 글빨 0.4.0 |  |
| p11 | H-vs-0.4.0 | `toss-use-query-param-readme` r1 | 글빨 0.4.0 | - |  |
| p12 | A-vs-0.4.0 | `toss-use-query-param-readme` r1 | 비슷함 | 엇갈림 |  |
| p13 | A-vs-0.4.0 | `toss-scroll-animation-readme` r2 | 글빨 0.4.0 | 글빨 0.4.0 |  |
| p14 | H-vs-0.4.0 | `open-korean-text-readme` r1 | 글빨 0.4.0 | - |  |
| p15 | A-vs-0.4.0 | `toss-use-funnel-readme` r1 | 비슷함 | 글빨 0.4.0 |  |
| p16 | C-vs-0.4.0 | `toss-use-query-param-readme` r2 | 비슷함 | 글빨 0.4.0 |  |
| p17 | H-vs-0.4.0 | `toss-hangul-readme` r1 | 글빨 0.4.0 | - |  |
| p18 | H-vs-0.4.0 | `toss-use-funnel-readme` r1 | 글빨 0.4.0 | - |  |
