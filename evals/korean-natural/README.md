# 한국어 자연스러움 평가

Claude가 개발 작업 중에 한국어로 쓰는 답변이 한국어 독자에게 바로 읽히는지 본다. 0.4까지의 평가는 뜻을 바꾸지 않는지, 지어내지 않는지를 쟀고 이 부분은 재지 않았다.

## 사례

작업 폴더에 공개 저장소 코드를 넣고 개발자가 흔히 하는 질문을 한국어로 한다. 저장소 코드는 [README 초안 평가](../draft-readme/README.md)와 같은 것(2022-11-30 이전 커밋, README는 뺌)을 쓴다. 질문은 다섯 가지다.

| 질문 | 요청 |
|---|---|
| `how` | 이 패키지가 어떻게 동작하는지 설명해 줘. 처음 보는 팀원이 읽을 거야. |
| `failure` | 이 코드는 입력이 잘못되거나 네트워크·파일 오류가 나면 어떻게 돼? 문제가 될 만한 곳이 있으면 같이 알려 줘. |
| `review` | 이 코드 리뷰해 줘. 고칠 점을 중요한 것부터 알려 줘. |
| `design` | 왜 이렇게 설계했을지, 장단점이 뭔지 설명해 줘. |
| `plan` | 여기에 테스트를 더 붙이려면 어떤 순서로 하면 좋을지 작업 계획을 써 줘. 코드는 아직 고치지 마. |

사례 16개(개발용 6개, 확인용 10개)는 스킬 0.5.0을 커밋한 뒤, 실행 결과를 보기 전에 [`spec.json`](spec.json)에 썼다. 0.5.0 결과를 본 뒤 다음 후보를 만들기 전에, 새 질문 네 가지(`perf` 성능, `upgrade` 최신 버전으로 올리기, `files` 파일별 정리, `bug` 버그가 숨은 곳)로 새 확인용 8개(`split: holdout`)를 더해 커밋했다.

두 가지를 본다.

1. **쓰기**: 같은 질문에 글빨 없음, 0.4.3, 0.5.0이 쓴 답변에서 멈칫할 곳이 얼마나 남는지.
2. **다듬기**: 글빨 없이 쓴 답변(1회차)을 "내용은 그대로 두고 자연스럽게 다듬어 줘"라고 다시 맡겼을 때, 멈칫할 곳이 고쳐졌는지와 뜻이 그대로인지(`polish-cases.json`, [의미 보존 판정](../judge/meaning.md)). 0.5.1에 더한 표 항목 일부는 `polish-cases.json`의 입력이 된 답변에서 본 표현이라, 0.5.1의 다듬기는 새 확인용 질문의 답변으로 만든 `polish-holdout-cases.json`으로 확인한다.

## 판정

[`korean-natural.md`](../judge/korean-natural.md): 판정 모델이 결과 글을 읽고 한국어 개발자가 멈칫할 곳을 종류(낱말대로 옮긴 말, 설명 없는 이름, 명사 나열, 기호로 대신한 설명, 번역투, 그 밖의 어색함)와 정도(뜻을 짐작하기 어려움 / 뜻은 통하지만 쓰지 않는 말)로 표시한다. 업계에서 그대로 쓰는 외래어, 코드 이름, 취향 차이는 표시하지 않는다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다. 이 스킬이 고치려는 표현이 남았는지 보는 근거로만 쓰고, 예시와 함께 보고한다.

판정 모델의 표시가 사람의 감각과 맞는지는 저장소 소유자에게 짧은 문장 몇 개만 확인받는다. 긴 글 전체를 비교하는 블라인드 평가는 하지 않는다.

```bash
node scripts/eval/natural.mjs build --dir evals/korean-natural
node scripts/eval/run.mjs --out <이름> --condition A --skill none --cases evals/korean-natural/cases.json --reps 2
node scripts/eval/judge.mjs natural --out <이름> --condition A
node scripts/eval/natural.mjs polish --dir evals/korean-natural --from <이름> --condition A
node scripts/eval/natural.mjs summary --out <이름>
node scripts/eval/natural.mjs polish-stats --from <답변 이름> --out <다듬기 이름>   # 다듬기 수치를 공개 기록에서 다시 센다
```

소개하기 전에 범위를 넓히려고, 다음 후보(0.5.2)를 만들기 전에 2차 새 확인용 12개(`split: holdout2`)를 더해 커밋했다. 저장소 코드에 새 질문 세 가지(새 팀원 안내 `onboard`, 팀장 보고 `report`, PR 설명 `pr`)를 한 6개와, 저장소 없이 묻는 질문 6개(개발 질문 4개, 개발자가 아닌 사람의 일상 질문 2개)다. 일상 질문에는 `reader`로 독자를 적고, 판정 모델은 그 독자를 기준으로 본다.

결과는 [8차 평가 보고서](../results/REPORT-korean-natural.md)에 있다. 다 쓴 답을 다듬게 할 때는 두 새 확인용 묶음 모두에서 효과가 분명했고, 처음부터 쓰게 할 때는 묶음에 따라 엇갈렸다. 2차 새 확인용의 다듬기 사례는 `polish-holdout2-cases.json`이다.

## 다듬기 사례의 독자와 요청 문구 (2026-11-03 고침)

2026-11-03까지 만든 다듬기 사례(`polish-cases.json`, `polish-holdout-cases.json`, `polish-holdout2-cases.json`)는 원래 사례의 `reader`를 옮기지 않았고, 요청 문구가 "아래 글은 개발 작업 중에 받은 답변이야"로 고정돼 있었다. 판정도 질문에 답하는 사례에만 독자를 넘겼다. 이 파일들은 실행한 그대로 두고, 이후에 만드는 다듬기 사례는 독자를 옮기고 개발 답변에 묶이지 않은 요청 문구를 쓴다. 판정은 사례 종류와 상관없이 독자를 넘기고, 다듬기 사례의 원문은 넘기지 않는다.

고친 조건으로 다시 만든 사례는 `polish-holdout2-fixed-cases.json`(입력은 `polish-holdout2-cases.json`과 같음)이다. 2026-11-05에 이 사례로 글빨 없음·0.5.2·0.5.3을 다시 돌렸다([결과](../results/2026-11-05-korean-natural-polish2-fixed/natural.md)). 이전 결과(`2026-11-03-korean-natural-polish2`)의 일상 질문 2개는 개발자 독자를 기준으로 판정한 기록으로 남겨 둔다.

## 원문 보존 확인 사례

[`preserve-cases.json`](preserve-cases.json)은 0.5.3에서 정리한 지침(원문 작성자의 제안·약속·조건은 남기고, 다듬으면서 새 마무리를 붙이지 않는다)을 확인하는 사례 5개다. 0.5.2의 의미 보존 실패(원문 끝 제안 삭제)를 본 뒤 썼고, 2026-11-05에 글빨 없음·0.5.2·0.5.3으로 실행했다([결과](../results/2026-11-05-korean-natural-preserve/report.md), [8차 보고서 8절](../results/REPORT-korean-natural.md)).

| 사례 | 확인할 것 |
|---|---|
| `offer-kept-polish` | 원문 끝의 제안을 남기고, `할 수 있다`를 `하겠다`로 바꾸지 않는다 |
| `condition-kept-polish` | 조건이 붙은 끝 제안(로그를 보내 주면)을 남긴다 |
| `nondev-offer-kept-polish` | 개발자가 아닌 독자에게 쓴 답변에서 말투와 끝 제안을 남긴다. 판정에 독자가 넘어간다 |
| `no-new-closing-polish` | 마무리가 없는 답변에 새 마무리·추가 제안을 붙이지 않는다 |
| `already-natural-noop` | 이미 자연스러운 답변을 그대로 둔다 |

## 후속 계획

- **다시 평가**: 2026-11-05에 실행했다. 원문 보존 사례는 5개뿐이므로, 다음 후보를 만들 때는 개발 답변과 일상 답변을 섞어 처음 보는 사례를 더 만든다.
- **여러 사람의 블라인드 비교**: 최신 버전으로 다듬은 최종 문단과 글빨 없이 다듬은 문단을 한 쌍씩, 3명 이상이 어느 쪽인지 모르는 상태로 "더 자연스러움 / 비슷함"과 "뜻이 바뀜" 여부를 고른다. 한 사람이 1~2분에 끝내도록 쌍은 10개 안팎, 문단은 3~5문장으로 자른다. 평가자 사이 일치도와 판정 모델과의 일치도를 함께 보고한다. 기존 `rating.mjs`와 문장 확인 페이지를 다시 쓸 수 있다.
- **지침 분량 줄이기**: [`research/lightweight-skill.md`](../../research/lightweight-skill.md)의 실험안. 검증 전에는 스킬에 적용하지 않는다.
