# 결과: 2026-10-27-readme

자동 생성 파일이다(`node scripts/eval/report.mjs --out 2026-10-27-readme`). 해석은 따로 쓴 보고서에 있다.

## 조건

| 조건 | 스킬 | 스킬 해시(앞 12자) | 모델 | effort | CLI |
|---|---|---|---|---|---|
| A | 없음 | - | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |
| B | `evals/snapshots/v0.2.1/geulppal` | 6a0e2818b738 | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |
| C | `evals/snapshots/v0.3.0-r2/geulppal` | 8f16b081d476 | claude-sonnet-5-5 | high | 2.1.311 (Claude Code) |
| H | 없음 | - | null | null | null |

## 실행

모든 시도를 센다. 재시도는 원래 시도와 따로 센다.

| 조건 | 시도 | 성공 | 실패 유형 | 재시도 | 스킬 본문 주입 확인 | 참조 문서를 읽은 실행 | 권한 거절 | 새 세션 |
|---|---|---|---|---|---|---|---|---|
| A | 32 | 32 | 없음 | 0 | 해당 없음 (geulppal 목록 노출 0) | - | 0 | 32/32 |
| B | 32 | 32 | 없음 | 0 | 32/32 | 32/32 | 0 | 32/32 |
| C | 32 | 32 | 없음 | 0 | 32/32 | 31/32 | 0 | 32/32 |
| H | 실행 안 함(기준 원문 32건) | - | - | - | - | - | - | - |

시스템 프롬프트(실행 폴더 경로를 지운 것)의 해시 종류: 1개. 1개면 조건 사이에 시스템 프롬프트가 같다. 스킬 목록은 시스템 프롬프트가 아니라 첫 메시지에 붙는다.

## 정확성: 의미 보존

판정 모델의 의미 보존 검사와 문자열 검사(`exact`)를 모두 통과해야 통과다. 분모는 성공한 실행 중 판정한 실행이다.

| 조건 | 판정한 실행 | 통과 | 실패 | 그중 문자열 누락 | 판정 못 함 | 실행 실패로 제외 |
|---|---|---|---|---|---|---|
| A | 32 | 20 | 12 | 0 | 0 | 0 |
| B | 32 | 30 | 2 | 0 | 0 | 0 |
| C | 32 | 31 | 1 | 0 | 0 | 0 |
| H | 32 | 32 | 0 | 0 | 0 | 0 |

### 사례별

| 사례 | A | B | C | H |
|---|---|---|---|---|
| `kcbert-updates-deslop` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `kcbert-updates-polish` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `khaiii-performance-deslop` | ✗ ○ | ○ ✗ | ✗ ○ | ○ ○ |
| `khaiii-performance-polish` | ✗ ✗ | ○ ○ | ○ ○ | ○ ○ |
| `koelectra-data-deslop` | ✗ ✗ | ○ ○ | ○ ○ | ○ ○ |
| `koelectra-data-polish` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `korpora-intro-deslop` | ✗ ✗ | ✗ ○ | ○ ○ | ○ ○ |
| `korpora-intro-polish` | ✗ ✗ | ○ ○ | ○ ○ | ○ ○ |
| `open-korean-text-intro-deslop` | ✗ ○ | ○ ○ | ○ ○ | ○ ○ |
| `open-korean-text-intro-polish` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `py-hanspell-intro-deslop` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `py-hanspell-intro-polish` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `toss-ky-deslop` | ✗ ✗ | ○ ○ | ○ ○ | ○ ○ |
| `toss-ky-polish` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `toss-storage-deslop` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |
| `toss-storage-polish` | ○ ○ | ○ ○ | ○ ○ | ○ ○ |

○ 통과 · ✗ 의미 손상 · ✗실행 실행 실패 · ? 판정 못 함. 칸 안의 기호는 회차 순서다.

### 의미 보존 실패

- A `khaiii-performance-deslop` r1: 본문 v0.4 속도 표에 원문에 없던 단위 "(단위: 초)"를 넣음. 메모에서 밝혔더라도 확인되지 않은 수치 정보가 본문에 들어감(new_facts, number_scope, must_not 4)
- A `khaiii-performance-polish` r1: v0.3 base 모델 선정 문장에서 원문의 '모델의 크기가 작은 모델'을 'F-Score 95 이상인 모델 중 가장 작은 것'으로 바꿔, 원문에 없는 최상급 비교 주장을 넣었습니다(비교 기준과 확실성 변경).
- A `khaiii-performance-polish` r2: 원문의 '문장 평균 91'을 본문에서 '문장당 평균 91자'로 바꿔, 측정 조건에 원문에 없는 단위를 넣었습니다. 메모에서 밝혔더라도 본문에 넣었으므로 문제입니다. / v0.4 속도 표 머리에 원문에 없는 단위 '(초)'를 단정해서 넣었습니다. / base 모델 선정 기준인 '크기가 작은 모델'을 '가장 작은 것'으로 바꿔 최상급으로 단정했습니다. / v0.4 속도 저하에 붙은 작성자의 완화 표현 '다소'가 빠졌습니다.
- A `koelectra-data-deslop` r1: Vocabulary 절에서 원문의 '가장 큰 목표'를 '목표 중 하나'로 바꿨습니다. 프로젝트 목표의 우선순위가 달라졌고, Wordpiece를 고른 이유도 약해졌습니다.
- A `koelectra-data-deslop` r2: Vocabulary 절에서 원문의 '이번 프로젝트의 가장 큰 목표'가 '목표로 했습니다'로 약해졌습니다. Wordpiece를 고른 근거인 최우선 목표라는 의미가 사라졌으므로 보존 항목이 distorted이고 status_certainty도 problem입니다.
- A `korpora-intro-deslop` r1: 한국어 데이터셋 공개 확대와 한국어 자연어 처리 수준 향상을 바라는 작성자의 희망 문장이 통째로 삭제됨 / 좋은 말뭉치인데도 존재가 널리 알려지지 않는다는 문제와 '무료' 공개라는 조건이 빠짐 / 영어 번역자 두 사람에게 하는 감사 표현('감사드립니다')이 '도와주셨습니다'로 바뀌어 감사가 사라짐
- A `korpora-intro-deslop` r2: 작성자의 희망 가운데 '한국어 자연어 처리 수준이 높아지기를 바란다'는 부분이 빠지고, '데이터셋이 공개되고 활용되기를 바랍니다'로 줄어들었습니다(보존 항목 왜곡, 핵심 정보 누락).
- A `korpora-intro-polish` r1: 소스 설치 코드 블록에 원문에 없는 `cd Korpora` 명령을 추가해 코드·명령을 바꿨음(금지 변경 위반, literals 문제, 설치 명령 보존 항목 왜곡)
- A `korpora-intro-polish` r2: 소스 설치 코드 블록에 원문에 없는 `cd Korpora` 명령을 추가해 명령/코드 블록을 바꿈(금지 변경 위반, literals 문제)
- A `open-korean-text-intro-deslop` r1: 원문 "짧은 트윗부터 긴 글까지 모두 처리할 수 있습니다"를 "트윗 같은 짧은 글을 주로 염두에 두고 만들었습니다"로 바꿨다. 긴 글을 처리할 수 있다는 범위가 사라졌고, 원문에 없는 설계 의도와 지원 범위가 본문에 들어갔다. 메모에서 밝혔더라도 본문에 있으므로 문제다.
- A `toss-ky-deslop` r1: 코드 블록 변경: 원문 shell 예시의 "# -> 가능" 줄을 지우고 "# CJS"/"# ESM" 주석으로 바꿔, 두 방식이 모두 된다는 표시가 예시 안에서 사라졌다. 메모에 되돌려도 된다고 적었지만, 고친 내용은 본문에 그대로 들어가 있다.
- A `toss-ky-deslop` r2: 코드 블록 안의 주석 `# -> 가능`을 `# 가능`으로 바꿨다. 코드 블록 변경 금지 항목을 위반했다(literals 문제).
- B `khaiii-performance-deslop` r2: conditions: '핵심 하이퍼 파라미터는 두 가지'가 '성능에 영향을 주는 하이퍼 파라미터는 두 가지'로 바뀌었다. '핵심'이라는 한정이 빠지면서 성능에 영향을 주는 하이퍼 파라미터가 두 개뿐이라는 뜻으로 넓어졌다.
- B `korpora-intro-deslop` r1: 작성자의 희망 중 '한국어 자연어 처리 수준이 한 단계 도약하기를' 부분이 빠져 데이터셋 공개에 대한 희망만 남음
- C `khaiii-performance-deslop` r1: v0.4 속도 문장에서 원문의 '다소 느려졌습니다'를 '느려졌습니다'로 바꿔 원저자의 정도 표현을 임의로 변경함(보존 항목 distorted, status_certainty problem). 메모에서 밝혔더라도 본문 의미가 바뀌었음.

## 글의 품질: 쌍 비교

두 결과가 모두 의미 보존을 통과한 쌍만 비교했다. 한 쌍을 순서를 바꿔 두 번 판정하고, 두 판정이 같을 때만 그 결과로 센다. 다르면 "순서 불일치"다.

### A vs C

쌍(사례 × 회차) 32개 중 비교 20개, 제외 12개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 18/20.

| 판정 | 쌍 수 |
|---|---|
| A 우세 | 2 |
| C 우세 | 16 |
| 차이 없음 | 0 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 2 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `kcbert-updates-deslop` | C 우세 · C 우세 |
| `kcbert-updates-polish` | A 우세 · C 우세 |
| `khaiii-performance-deslop` | 제외 · C 우세 |
| `khaiii-performance-polish` | 제외 · 제외 |
| `koelectra-data-deslop` | 제외 · 제외 |
| `koelectra-data-polish` | 순서 불일치 · C 우세 |
| `korpora-intro-deslop` | 제외 · 제외 |
| `korpora-intro-polish` | 제외 · 제외 |
| `open-korean-text-intro-deslop` | 제외 · C 우세 |
| `open-korean-text-intro-polish` | A 우세 · C 우세 |
| `py-hanspell-intro-deslop` | C 우세 · C 우세 |
| `py-hanspell-intro-polish` | C 우세 · 순서 불일치 |
| `toss-ky-deslop` | 제외 · 제외 |
| `toss-ky-polish` | C 우세 · C 우세 |
| `toss-storage-deslop` | C 우세 · C 우세 |
| `toss-storage-polish` | C 우세 · C 우세 |

사례 16개: 승패가 난 회차가 모두 A 쪽 0개, 모두 C 쪽 9개, 엇갈림 2개, 승패 없음(차이 없음·불일치·제외만) 5개.

### B vs C

쌍(사례 × 회차) 32개 중 비교 29개, 제외 3개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 21/29.

| 판정 | 쌍 수 |
|---|---|
| B 우세 | 3 |
| C 우세 | 8 |
| 차이 없음 | 10 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 8 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `kcbert-updates-deslop` | 순서 불일치 · C 우세 |
| `kcbert-updates-polish` | B 우세 · C 우세 |
| `khaiii-performance-deslop` | 제외 · 제외 |
| `khaiii-performance-polish` | 차이 없음 · 차이 없음 |
| `koelectra-data-deslop` | C 우세 · B 우세 |
| `koelectra-data-polish` | C 우세 · 순서 불일치 |
| `korpora-intro-deslop` | 제외 · 순서 불일치 |
| `korpora-intro-polish` | 순서 불일치 · 순서 불일치 |
| `open-korean-text-intro-deslop` | 차이 없음 · 차이 없음 |
| `open-korean-text-intro-polish` | 차이 없음 · 순서 불일치 |
| `py-hanspell-intro-deslop` | C 우세 · 순서 불일치 |
| `py-hanspell-intro-polish` | C 우세 · B 우세 |
| `toss-ky-deslop` | C 우세 · 차이 없음 |
| `toss-ky-polish` | 차이 없음 · C 우세 |
| `toss-storage-deslop` | 순서 불일치 · 차이 없음 |
| `toss-storage-polish` | 차이 없음 · 차이 없음 |

사례 16개: 승패가 난 회차가 모두 B 쪽 0개, 모두 C 쪽 5개, 엇갈림 3개, 승패 없음(차이 없음·불일치·제외만) 8개.

### H vs C

쌍(사례 × 회차) 32개 중 비교 31개, 제외 1개(한쪽 이상 의미 보존 실패 또는 실행 실패). 순서를 바꿔도 같은 판정: 29/31.

| 판정 | 쌍 수 |
|---|---|
| H 우세 | 0 |
| C 우세 | 29 |
| 차이 없음 | 0 |
| 둘 다 부적절 | 0 |
| 순서 불일치 | 2 |

사례 단위(회차를 합친 것, 사례 하나를 한 번만 센다):

| 사례 | 회차별 결과 |
|---|---|
| `kcbert-updates-deslop` | C 우세 · C 우세 |
| `kcbert-updates-polish` | C 우세 · C 우세 |
| `khaiii-performance-deslop` | 제외 · C 우세 |
| `khaiii-performance-polish` | C 우세 · C 우세 |
| `koelectra-data-deslop` | C 우세 · C 우세 |
| `koelectra-data-polish` | C 우세 · C 우세 |
| `korpora-intro-deslop` | 순서 불일치 · C 우세 |
| `korpora-intro-polish` | C 우세 · C 우세 |
| `open-korean-text-intro-deslop` | C 우세 · C 우세 |
| `open-korean-text-intro-polish` | C 우세 · C 우세 |
| `py-hanspell-intro-deslop` | C 우세 · C 우세 |
| `py-hanspell-intro-polish` | C 우세 · C 우세 |
| `toss-ky-deslop` | C 우세 · 순서 불일치 |
| `toss-ky-polish` | C 우세 · C 우세 |
| `toss-storage-deslop` | C 우세 · C 우세 |
| `toss-storage-polish` | C 우세 · C 우세 |

사례 16개: 승패가 난 회차가 모두 H 쪽 0개, 모두 C 쪽 16개, 엇갈림 0개, 승패 없음(차이 없음·불일치·제외만) 0개.

## 시간·토큰·비용

CLI가 보고한 값이다. 비용은 `total_cost_usd`(API 정가 기준 추정치)이며 구독 사용량과 다를 수 있다. 입력 토큰은 캐시 생성·캐시 읽기를 포함한 합이다.

| 조건 | 실행 | 시간 중앙값(초) | 입력 토큰 중앙값 | 출력 토큰 중앙값 | 턴 중앙값 | 비용 합(USD) |
|---|---|---|---|---|---|---|
| A | 32 | 12.2 | 9,447 | 1,406 | 1 | 1.182 |
| B | 32 | 19.0 | 34,127 | 2,162 | 3 | 2.871 |
| C | 32 | 19.3 | 36,880 | 2,301 | 3 | 3.015 |

판정 호출: 288회(재시도 포함), 비용 합 19.772 USD.

