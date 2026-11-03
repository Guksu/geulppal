# 어색한 문장 확인

자동 생성 파일이다(`node scripts/eval/natural.mjs check-score`). 2026-10-31-korean-natural의 A 결과에서 판정 모델이 멈칫할 곳으로 표시한 문장과 표시하지 않은 문장을 섞어, 저장소 소유자가 어느 쪽인지 모르는 상태로 "어색함/괜찮음"을 골랐다.

| | 사람: 어색함 | 사람: 괜찮음 |
|---|---|---|
| 판정 모델이 표시한 문장 | 4 | 2 |
| 표시하지 않은 문장 | 1 | 3 |

일치 7/10.

| 문장 | 사례 | 판정 모델 | 사람 | 문장 내용 | 판정 모델이 짚은 곳 |
|---|---|---|---|---|---|
| s01 | `koelectra-how` r2 | 표시(awkward) | 어색함 | 태스크 7종과 모델 10종이 조합마다 JSON 하나씩이라 총 80개가 있습니다. | 태스크 7종과 모델 10종이 조합마다 JSON 하나씩이라 총 80개가 있습니다. |
| s02 | `g2pk-how` r1 | 표시 안 함 | 괜찮음 | idioms: `idioms.txt`의 `A===B` 규칙을 정규식으로 치환합니다. |  |
| s03 | `korpora-review` r2 | 표시(literal) | 어색함 | 데이터가 조용히 줄어듭니다. | 데이터가 조용히 줄어듭니다 |
| s04 | `open-korean-text-design` r1 | 표시(literal) | 어색함 | 구현 위생 문제가 보입니다. | 구현 위생 문제가 보입니다. |
| s05 | `toss-ky-how` r1 | 표시(translationese) | 어색함 | 또 `jest.setup.ts`가 `@testing-library/jest-dom`을 import하는데, 이 패키지는 `devDependencies`에 그것을 명시하지 않았습니다. | 이 패키지는 `devDependencies`에 그것을 명시하지 않았습니다 |
| s06 | `hangul-js-failure` r1 | 표시 안 함 | 괜찮음 | `join('')`으로 합치면 복원됩니다. |  |
| s07 | `toss-sentry-review` r1 | 표시(coined) | 괜찮음 | 원하시면 1번(Proxy 전환)과 2번(큐잉과 경고 1회화)부터 바로 수정하겠습니다. | 경고 1회화 |
| s08 | `khaiii-plan` r1 | 표시(literal) | 괜찮음 | git 저장소가 아니라서 변경 이력과 회귀 기준을 확인할 수 없습니다. | 회귀 기준 |
| s09 | `kobert-transformers-plan` r1 | 표시 안 함 | 어색함 | 공백 정규화 (`remove_space` True/False) |  |
| s10 | `toss-scroll-animation-plan` r2 | 표시 안 함 | 괜찮음 | 이 항목은 팀 의견을 먼저 물어보는 편이 좋습니다. |  |
