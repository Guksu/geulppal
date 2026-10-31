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

사례 16개(개발용 6개, 확인용 10개)는 스킬 0.5.0을 커밋한 뒤, 실행 결과를 보기 전에 [`spec.json`](spec.json)에 썼다.

두 가지를 본다.

1. **쓰기**: 같은 질문에 글빨 없음, 0.4.3, 0.5.0이 쓴 답변에서 멈칫할 곳이 얼마나 남는지.
2. **다듬기**: 글빨 없이 쓴 답변(1회차)을 "내용은 그대로 두고 자연스럽게 다듬어 줘"라고 다시 맡겼을 때, 멈칫할 곳이 고쳐졌는지와 뜻이 그대로인지(`polish-cases.json`, [의미 보존 판정](../judge/meaning.md)).

## 판정

[`korean-natural.md`](../judge/korean-natural.md): 판정 모델이 결과 글을 읽고 한국어 개발자가 멈칫할 곳을 종류(낱말대로 옮긴 말, 설명 없는 이름, 명사 나열, 기호로 대신한 설명, 번역투, 그 밖의 어색함)와 정도(뜻을 짐작하기 어려움 / 뜻은 통하지만 쓰지 않는 말)로 표시한다. 업계에서 그대로 쓰는 외래어, 코드 이름, 취향 차이는 표시하지 않는다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다. 이 스킬이 고치려는 표현이 남았는지 보는 근거로만 쓰고, 예시와 함께 보고한다.

판정 모델의 표시가 사람의 감각과 맞는지는 저장소 소유자에게 짧은 문장 몇 개만 확인받는다. 긴 글 전체를 비교하는 블라인드 평가는 하지 않는다.

```bash
node scripts/eval/natural.mjs build --dir evals/korean-natural
node scripts/eval/run.mjs --out <이름> --condition A --skill none --cases evals/korean-natural/cases.json --reps 2
node scripts/eval/judge.mjs natural --out <이름> --condition A
node scripts/eval/natural.mjs polish --dir evals/korean-natural --from <이름> --condition A
node scripts/eval/natural.mjs summary --out <이름>
```
