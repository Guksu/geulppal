# `english-terms-and-list`

[← 개발 사례 목록](README.md) · 수정 · tech-paragraph · 영어

## 요청

> Remove filler from this technical paragraph without changing its meaning.

## 원문

> It is important to note that the export contains three files: orders.csv, refunds.csv, and totals.csv. The leverage field may be empty. We have not tested imports larger than 20 MB.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**남아야 할 것**

- 파일 3개와 각각의 이름
- leverage 필드
- 빈 값 가능
- 20 MB 초과 미검증

**있으면 안 되는 변경**

- 3항 목록 축소
- leverage 이름 치환
- 20 MB 초과를 지원 불가로 단정
- 검증 완료로 변경

**글자 그대로 남아야 할 문자열**: `orders.csv`, `refunds.csv`, `totals.csv`, `leverage`

</details>

## 1회차

### 글빨 없음 — ○ 의미 보존 통과

> The export contains three files: orders.csv, refunds.csv, and totals.csv. The leverage field may be empty. Imports larger than 20 MB are untested.
>
> I only cut "It is important to note that" and reworded the last sentence to be shorter. If you'd rather keep the active voice, "We have not tested imports larger than 20 MB" works too.

### 글빨 0.1.0 — ○ 의미 보존 통과

> The export contains three files: orders.csv, refunds.csv, and totals.csv. The `leverage` field may be empty. We have not tested imports larger than 20 MB.
>
> I removed only "It is important to note that." I kept `leverage` because it's a field name, not filler.

### 글빨 0.2.0 — ○ 의미 보존 통과

> The export contains three files: orders.csv, refunds.csv, and totals.csv. The leverage field may be empty. We have not tested imports larger than 20 MB.

## 2회차

### 글빨 없음 — ○ 의미 보존 통과

> The export contains three files: orders.csv, refunds.csv, and totals.csv. The leverage field may be empty. We have not tested imports larger than 20 MB.
>
> I cut only "It is important to note that". The other sentences had no filler, so I left them as they were.

### 글빨 0.1.0 — ○ 의미 보존 통과

> The export contains three files: orders.csv, refunds.csv, and totals.csv. The leverage field may be empty. We have not tested imports larger than 20 MB.
>
> I removed only "It is important to note that". I kept `leverage` because it names a field.

### 글빨 0.2.0 — ○ 의미 보존 통과

> The export contains three files: orders.csv, refunds.csv, and totals.csv. The `leverage` field may be empty. We have not tested imports larger than 20 MB.

## 품질 비교

두 결과가 모두 의미 보존을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.2.0 | 글빨 0.2.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.2.0 | 차이 없음 |
| 1 | 글빨 0.1.0 vs 글빨 0.2.0 | 글빨 0.2.0 우세 |
| 2 | 글빨 0.1.0 vs 글빨 0.2.0 | 차이 없음 |
| 1 | 글빨 없음 vs 글빨 0.1.0 | 글빨 0.1.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.1.0 | 차이 없음 |

<details><summary>1회차 글빨 없음 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.2.0) → 글빨 0.2.0 우세

Y is better. The request was to remove filler without changing meaning, and Y does exactly that: it drops "It is important to note that" and leaves the rest as written. X also rewrites the last sentence, which had no filler, into a passive form that drops who did the testing. It then adds an unrequested note explaining its edits and offering the original sentence as an alternative. That shows less restraint and a slight drift in voice and meaning.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 없음) → 글빨 0.2.0 우세

The request was to remove filler without changing meaning. X does exactly that: it drops the one filler phrase and leaves everything else alone. Y makes the same cut but also rewrites a sentence that didn't need it and adds meta-commentary nobody asked for. Both extras hurt restraint, and the rewrite also changes the author's voice. X is the better result.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.2.0) → 차이 없음

Both edits make the same cut and leave the paragraph text the same. X adds a short note explaining the change, and Y adds code formatting to one field name. Neither addition was requested, but neither hurts the paragraph, so there is no meaningful difference between them.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 없음) → 차이 없음

Both versions make the same core edit: they remove the opening filler and leave the other sentences unchanged. They differ only in one small unrequested addition each. X adds code formatting around the field name inside the text, and Y adds an explanatory note after the text. The two additions affect the reader about equally, so neither result is clearly better.

</details>

<details><summary>1회차 글빨 0.1.0 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 0.2.0) → 글빨 0.2.0 우세

Both results remove the same filler, and the paragraph itself has the same quality in each. X also adds backticks the user didn't request and an explanation outside the text. Neither is needed for a simple filler-removal request, so Y shows better restraint and is the better result.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 0.1.0) → 글빨 0.2.0 우세

X and Y make the same substantive edit: each deletes only "It is important to note that." Y also wraps the field name in code formatting and adds a meta-comment explaining the edit, and the request asked for neither. X is better because it does exactly what was asked and returns a paragraph the user can use as is.

</details>

<details><summary>2회차 글빨 0.1.0 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 0.2.0) → 차이 없음

두 결과 모두 "It is important to note that"만 정확히 삭제했고, 본문의 의미와 표현을 보존했다. X는 편집 내용을 밝히는 짧은 메모를 덧붙였고, Y는 필드명에 백틱 서식을 넣었다. 둘 다 요청하지 않은 사소한 추가이며, 독자가 받는 정보와 가독성에서 의미 있는 차이를 만들지 않는다.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 0.1.0) → 차이 없음

두 결과 모두 필러 문구만 정확히 지웠고 본문 내용도 같다. 요청에 없던 추가는 양쪽에 하나씩 있다. X는 `leverage`에 백틱을 씌웠는데, 파일명에는 적용하지 않아 일관성이 없다. Y는 본문은 그대로 두었지만 편집 설명 메모를 붙여서 사용자가 그 부분을 지워야 한다. 두 추가 모두 사소하고 서로 비슷한 정도라 어느 쪽도 분명히 낫지 않다.

</details>

<details><summary>1회차 글빨 없음 vs 글빨 0.1.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.1.0) → 글빨 0.1.0 우세

The request was to remove filler without changing meaning. Both results remove "It is important to note that". X goes further and rewrites the last sentence, which had no filler, into the passive "are untested". That drops the first-person voice and changes who is said to have done the testing. X's own note says it "only cut" the phrase, which isn't true. Y keeps the wording exactly as it was apart from the filler. Its only extras are backticks and a short, unnecessary note. On balance, Y follows the request more faithfully.

**2번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 없음) → 글빨 0.1.0 우세

Both cut the actual filler, "It is important to note that." Y also rewrote the last sentence, which had no filler. That change goes beyond the request and loses the author's "We." X keeps the original wording apart from small backticks, so X is slightly better.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.1.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.1.0) → 차이 없음

The edited paragraphs are identical. Each removes only the filler "It is important to note that" and leaves the rest of the original alone. The only difference is the one-sentence note after the edit. Y's note ("names a field") says a bit more about why "leverage" stayed, but that has little effect on what the reader gets, so neither result is clearly better.

**2번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 없음) → 차이 없음

The edited paragraphs are identical, and both cut only the filler phrase. The only difference is the explanatory note after the edit. X's note says why "leverage" was kept, which is slightly more informative, but neither note changes the quality of the edit for the reader.

</details>

