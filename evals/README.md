# 평가

글빨을 쓰지 않는 Claude Code(A)와 글빨을 쓰는 Claude Code(B)에 같은 요청을 주고 결과를 비교한다. 정확성(의미 보존), 글의 품질, 자동 선택, 시간·비용을 따로 잰다. 결과 요약과 사례별 결과는 [벤치마크 결과](results/README.md), 실패 분석과 개선 과정은 [평가 보고서](results/REPORT.md)에 있다.

## 자료

| 파일 | 내용 | 성격 |
|---|---|---|
| [`cases.json`](cases.json) | 사례 19개(초기 12개 + 보충 7개) | 개발·회귀용. 9개는 스킬 예문과 같은 상황을 다루고, 모두 스킬을 읽은 사람이 썼다 |
| [`holdout/cases.json`](holdout/cases.json) | 사례 12개 | 최종 후보를 고정한 뒤 별도 세션이 만들었다. 만드는 쪽에는 문서 종류와 평가할 능력만 알려 줬다([생성 기록](holdout/generation.json)) |
| [`human/`](human/README.md) | 2024년 이전에 사람이 쓴 공개 글 10편으로 만든 사례 18개(개발용 9개, 확인용 9개) | 원문은 공공누리 제1유형 정책브리핑 기사. 다듬기(polish)와 AI 티 빼기(deslop) 두 종류 |
| [`human-readme/`](human-readme/README.md) | ChatGPT 공개 전에 사람이 쓴 오픈소스 README 8편으로 만든 사례 16개(개발용 8개, 확인용 8개) | Apache-2.0·MIT·CC-BY-4.0 원문과 라이선스 사본 |
| [`trigger/queries.json`](trigger/queries.json) | 써야 하는 요청 12개, 쓰지 말아야 하는 요청 10개 | 자동 선택 평가용. 스킬 설명을 읽은 사람이 썼다 |
| [`judge/meaning.md`](judge/meaning.md), [`judge/quality.md`](judge/quality.md) | 판정 지침 | 판정 모델의 시스템 프롬프트로 그대로 쓴다 |
| [`judge/slop-check.md`](judge/slop-check.md) | 부풀린 글 검수 지침 | deslop 입력이 원문의 사실을 그대로 담았는지 확인한다 |
| [`CHANGELOG.md`](CHANGELOG.md) | 사례·기준 변경 이력 | |
| [`snapshots/`](snapshots/) | 평가한 스킬 버전의 사본과 해시 | |

사례의 필드: `request`·`input`은 작성 모델에 주는 것, `must_preserve`·`must_not`은 의미 보존 판정에만 쓰는 것, `exact`는 결과에 글자 그대로 남아야 하는 원문 문자열이다. `human/` 밖의 제품·수치·사례는 평가용 가상 자료다.

## 실행 조건

| 항목 | A (글빨 없음) | B (글빨) |
|---|---|---|
| 스킬 | 없음(빈 `.claude/` 폴더) | 작업 폴더의 `.claude/skills/geulppal/` |
| 요청 | `request` + 빈 줄 + `input` | 같은 내용 앞에 `/geulppal ` |
| 그 밖의 조건 | 같음 | 같음 |

두 조건에 공통으로 적용한 조건이다.

- `claude -p`, `--output-format stream-json --verbose`, `--model claude-sonnet-5-5`, `--effort high`, `--setting-sources project`, `--strict-mcp-config`, `--permission-mode dontAsk`, `--tools Read,Glob,Grep,Skill`, `--allowedTools "Read Glob Grep Skill"`, 실행마다 새 `--session-id`
- 실행마다 임시 `HOME`·`CLAUDE_CONFIG_DIR`·작업 폴더를 새로 만든다. 사용자 설정, 전역 스킬, 계정 동기화 스킬·플러그인, MCP, 이전 대화와 메모리가 들어오지 않는다. 사용자의 전역 설정 파일은 수정하지 않는다
- 환경 변수는 실행 경로·프록시·인증서·API 주소·인증 토큰만 넘긴다. 이름은 기록하고 값은 기록하지 않는다
- 작성 모델은 `request`와 `input`만 받는다. 평가 기준과 다른 조건의 결과는 보지 않는다

CLI에 함께 들어 있는 기본 스킬(`code-review`, `simplify` 등)과 내장 플러그인 3개는 두 조건에 똑같이 있다. 실행 기록의 `environment`에 모두 남긴다.

B 실행은 대화 기록에서 `/geulppal` 명령 펼침과 설치한 `SKILL.md` 본문 주입을 확인했을 때만 스킬 적용 결과로 센다. 확인되지 않은 실행은 `skill_not_loaded`로 따로 센다. 시스템 프롬프트는 실행 폴더 경로를 지운 뒤 해시로 비교한다.

## 판정

1. **의미 보존(정확성)**: 판정 모델이 결과 하나를 원문·요청·`must_preserve`·`must_not`과 대조한다. 일반 검사 7개(새 사실, 누락, 수치 범위, 상태·확실성, 조건, 표기, 작업 범위)도 함께 본다. 하나라도 걸리면 실패다. `exact` 문자열이 빠지면 판정 모델과 상관없이 실패다.
2. **품질**: 두 결과가 모두 의미 보존을 통과한 쌍만 비교한다. 판정 모델은 원문·요청과 익명 결과 X·Y를 받는다. 스킬 이름, 조건, 원하는 승자는 받지 않는다. 같은 쌍을 순서를 바꿔 두 번 판정한다. 두 판정이 같을 때만 그 판정으로 세고, 다르면 "순서 불일치"로 센다. 판정은 X 우세·Y 우세·차이 없음·둘 다 부적절 중 하나이고, 근거에 두 결과의 문장을 인용한다.
3. **자동 선택**: 스킬을 설치한 새 세션에 `/geulppal` 없이 자연어 요청을 준다. Skill 도구로 geulppal을 부르거나 `SKILL.md`를 읽으면 선택으로 센다. 같은 요청에 대해 단어 겹침 대리 지표도 계산하지만 실제 선택과 따로 보고한다.
4. **시간·비용**: CLI가 보고한 `duration_ms`, 토큰, `total_cost_usd`를 그대로 쓴다. 보고되지 않은 값은 "알 수 없음"으로 둔다.

판정 모델은 `claude-opus-5-5`(`--effort high`)이고, 도구 없이 새 세션에서 돌린다. 작성 모델과 다른 모델이지만 같은 회사의 모델이다. 사람의 평가는 하지 않았다.

금지어 수, 쉼표 수, 글자 수 감소, AI 탐지기 점수는 품질 점수로 쓰지 않는다. 문자열 검사는 코드·명령·링크 대상처럼 글자 그대로 남아야 하는 부분에만 쓴다.

## 다시 돌리기

`claude` CLI가 필요하다. 모든 명령은 저장소 루트에서 실행한다. 실행·판정은 실제 모델을 부르므로 사용량이 든다.

```bash
node scripts/eval/check.mjs                                   # 구조 검사(모델 호출 없음)

# 작성: 조건마다 따로. 같은 사례·회차 기록이 있으면 건너뛴다(--retry-failed는 실패한 회차를 새 시도로)
node scripts/eval/run.mjs --out <이름> --condition A  --skill none --reps 2
node scripts/eval/run.mjs --out <이름> --condition B0 --skill evals/snapshots/v0.1.0/geulppal --reps 2

# 판정
node scripts/eval/judge.mjs meaning --out <이름> --condition A
node scripts/eval/judge.mjs meaning --out <이름> --condition B0
node scripts/eval/judge.mjs meaning --out <이름> --condition A --pass 2   # 같은 결과를 한 번 더 판정(일치도 확인, 선택)
node scripts/eval/judge.mjs pair --out <이름> --left A --right B0
# 다른 결과 폴더의 기준선 재사용(입력·모델·환경·설정이 같을 때만): --left-from <다른 이름>
# 판정 지침을 고친 뒤 다시 판정: meaning ... --force / 문자열 검사만 다시 계산: rescore --out <이름> --condition A

node scripts/eval/report.mjs --out <이름>                     # 집계 → evals/results/<이름>/report.md

# 사람이 읽는 사례별 페이지 → evals/results/cases/<이름>/ (모델 호출 없음)
node scripts/eval/render.mjs --name holdout --title "처음 보는 사례" --cases evals/holdout/cases.json \
  --conds A=2026-10-27-holdout,B0=2026-10-27-holdout,B2=2026-10-27-holdout \
  --pairs 2026-10-27-holdout/A-vs-B2,2026-10-27-holdout/B0-vs-B2,2026-10-27-holdout/A-vs-B0

# 자동 선택
node scripts/eval/trigger.mjs --out <이름> --label <이름표> --skill skills/geulppal --reps 2

# 처음 보는 자료 만들기(이미 있으면 --force가 필요하다)
node scripts/eval/holdout.mjs --out evals/holdout/cases.json

# 사람이 쓴 글 사례: 부풀린 글 만들기·검수 → 사례 만들기 → 사람 원문을 기준 조건 H로 넣기
node scripts/eval/human.mjs slop
node scripts/eval/human.mjs build
node scripts/eval/run.mjs --out <이름> --condition A --skill none --cases evals/human/cases.json --reps 2
node scripts/eval/human.mjs reference --out <이름>
node scripts/eval/judge.mjs pair --out <이름> --left H --right A

# 다른 자료 묶음에는 --dir을 준다(예: --dir evals/human-readme)

# 사람 블라인드 비교 페이지 만들기와 집계
node scripts/eval/rating.mjs build --page <html 경로>
node scripts/eval/rating.mjs score --ratings <받은 평가 json>

# 경로 지우기 규칙을 고친 뒤 공개 기록의 output을 원본 로그로 다시 만들기
node scripts/eval/records.mjs rescrub --out <이름>
```

사례 일부만 돌리려면 `--ids a,b`, 다른 사례 파일은 `--cases <파일>`을 준다. 판정 호출이 사용량 제한 등으로 실패해 비어 있는 품질 판정은 같은 명령을 다시 실행하면 다시 판정한다.

기록은 이렇게 남는다.

- `evals/results/<이름>/records.json`: 실행 기록(`runs/`), 판정 근거(`judge/`), 조건 명세(`manifest/`), 자동 선택 기록(`trigger/`)을 한 파일에 묶은 공개 기록이다. 키는 `runs/A/readme-rewrite-r1-a1`처럼 원래의 파일 경로다.
- `evals/results/<이름>/report.md`, `summary.json`: 집계
- `evals/runs/<이름>/`: 원본 로그(스트림·대화 기록·stderr)와 작업 중 기록(`records/`). 커밋하지 않는다.

명령은 작업 중 기록을 `evals/runs/<이름>/records/`에 하나씩 쓰고, 끝날 때 `records.json`에 합친다. 읽을 때는 `records.json` 위에 작업 중 기록을 덮어 읽는다. 그래서 새로 받은 저장소에서도 `records.json`만으로 집계·페이지 생성·추가 판정을 할 수 있다. 기록을 파일 단위로 보려면 `node scripts/eval/records.mjs unpack --out <이름>`으로 푼다.

로컬에서 임시 `HOME`을 쓰면 키체인 로그인을 찾지 못할 수 있다. 그때는 `claude setup-token`으로 만든 토큰을 `CLAUDE_CODE_OAUTH_TOKEN`에, 또는 API 키를 `ANTHROPIC_API_KEY`에 넣고 실행한다. 실행기는 이 두 변수의 값을 기록하지 않는다.
