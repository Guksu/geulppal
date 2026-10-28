# README 초안 평가

글빨의 주 용도는 원문을 다듬는 일보다, 원문 없이 "README를 써 줘", "보고서를 써 줘"처럼 글을 새로 쓰는 일이다. 앞의 평가([사람이 쓴 README](../human-readme/README.md) 등)는 모두 원문이 있는 수정 사례였다. 여기서는 작성 모델에게 저장소 코드만 주고(일부 사례는 메모도) README를 처음부터 쓰게 한다.

## 만드는 방법

- **작업 폴더 자료**: ChatGPT 공개일(2022-11-30) 전 커밋에서 저장소 코드를 꺼내 작성 모델의 작업 폴더에 둔다. README와 설명 문서는 뺀다. 작성 모델은 Read·Glob·Grep으로 코드를 보고 Write·Edit로 파일을 쓴다. 쓰기는 작업 폴더 안에서만 자동으로 허용한다(`acceptEdits`).
- **결과**: 작성 모델이 작업 폴더에 새로 쓰거나 고친 마크다운 파일(여럿이면 `README.md`)을 결과로 판정한다. 파일을 쓰지 않았으면 마지막 답을 결과로 본다. 마지막 답은 `reply`로 따로 남긴다.
- **메모**: 코드에 없는 내용(성능 수치, 학습 조건 등)이 README에 필요한 사례는 사람 README에서 사실만 뽑아 짧은 메모로 준다(`khaiii-readme`, `koelectra-readme`).
- **기준 조건 H**: 같은 커밋에서 사람이 쓴 README. 작성 모델에게 주지 않고 품질 비교에만 쓴다.

명령은 다음과 같다.

```bash
node scripts/eval/draft.mjs build --dir evals/draft-readme          # 작업 폴더 자료, sources.json, cases.json
node scripts/eval/run.mjs --cases evals/draft-readme/cases.json --out <이름> --condition A --skill none
node scripts/eval/human.mjs reference --dir evals/draft-readme --out <이름>
node scripts/eval/judge.mjs meaning --out <이름> --condition C        # 조건마다(H 제외)
node scripts/eval/judge.mjs pair --out <이름> --left H --right C --reference-pass
```

작업 폴더 자료는 커밋하지 않는다. `draft.mjs`가 공개 저장소를 `evals/runs/fixtures/`에 부분 복제하고 같은 파일을 다시 꺼낸다. 사례에 적힌 `fixture.sha256`과 꺼낸 파일의 해시가 다르면 `run.mjs`는 실행하지 않는다.

## 판정

원문이 없으므로 "원문의 뜻을 지켰는가" 대신 "쓴 내용에 근거가 있는가"를 본다([`draft-claims.md`](../judge/draft-claims.md)). 판정 모델도 같은 작업 폴더를 읽을 수 있다.

1. 결과에서 설치 명령, 함수 이름과 인자, 옵션, 지원 버전, 수치, 기능 목록 같은 구체적인 주장을 뽑는다.
2. 주장마다 코드나 메모에서 근거를 찾아 `supported`·`unsupported`·`contradicted`로 적는다.
3. 근거와 어긋나는 주장이 있거나, 근거 없는 구체적 주장이 있으면 통과하지 못한다.

`must_preserve`(다뤄야 할 내용)는 있는지 없는지만 적고 통과 조건에는 넣지 않는다. 품질은 기존과 같이 순서를 바꿔 두 번 묻는 짝 비교로 본다. 사람 README(H)는 근거 판정을 거치지 않으므로 `--reference-pass`로 비교 대상에 넣는다.

## 자료

| 사례 | 저장소 | 사람 README 마지막 수정 | 라이선스 | 메모 | 나눔 |
|---|---|---|---|---|---|
| `py-hanspell-readme` | ssut/py-hanspell | 2020-06-03 | MIT | 없음 | 개발용 |
| `toss-ky-readme` | toss/slash (`packages/common/ky`) | 2022-11-01 | MIT | 없음 | 개발용 |
| `korpora-readme` | ko-nlp/Korpora | 2021-01-13 | CC-BY-4.0 | 없음 | 개발용 |
| `khaiii-readme` | kakao/khaiii (파이썬 부분) | 2019-06-24 | Apache-2.0 | 있음 | 개발용 |
| `toss-storage-readme` | toss/slash (`packages/common/storage`) | 2022-10-14 | MIT | 없음 | 확인용 |
| `toss-hangul-readme` | toss/slash (`packages/common/hangul`) | 2022-10-13 | MIT | 없음 | 확인용 |
| `open-korean-text-readme` | open-korean-text/open-korean-text | 2018-07-31 | Apache-2.0 | 없음 | 확인용 |
| `koelectra-readme` | monologg/KoELECTRA (`finetune`, `pretrain`) | 2021-11-02 | Apache-2.0 | 있음 | 확인용 |
| `toss-date-readme` | toss/slash (`packages/common/date`) | 2022-10-28 | MIT | 없음 | 새 확인용 |
| `toss-use-funnel-readme` | toss/slash (`packages/react/use-funnel`) | 2022-10-08 | MIT | 없음 | 새 확인용 |
| `toss-use-query-param-readme` | toss/slash (`packages/react/use-query-param`) | 2022-10-08 | MIT | 없음 | 새 확인용 |
| `toss-scroll-animation-readme` | toss/slash (`packages/react/scroll-animation`) | 2022-10-08 | MIT | 없음 | 새 확인용 |
| `kobert-transformers-readme` | monologg/KoBERT-Transformers | 2021-06-16 | Apache-2.0 | 없음 | 새 확인용 |

개발용 4개로 스킬을 고쳤다. 확인용 4개는 기준선 실행에서 결과와 판정 이유를 이미 읽었으므로, 개선을 마친 뒤 처음 보는 사례 5개(새 확인용, `split: holdout`)를 따로 만들었다. 새 확인용 사례는 0.4.0 후보를 만든 뒤에 추가했고 어떤 조건으로도 미리 실행하지 않았다.

커밋, 꺼낸 경로와 뺀 파일, 기준 README 주소는 [`sources.json`](sources.json)에 있다. 각 저장소의 라이선스 사본은 [`licenses/`](licenses/)에 그대로 두었다. 기준 README의 저작권은 각 저장소의 저작권자에게 있고, 각 라이선스 조건에 따라 평가 자료로 쓴다. Korpora는 한국어 부분(1–192줄)만 기준으로 쓴다.

저장소는 [사람이 쓴 README](../human-readme/README.md)와 겹친다. 그쪽은 README 발췌를 다듬는 사례이고, 여기는 README 없이 새로 쓰는 사례다. 사람 README가 실제 좋은 README라는 보장은 없다. 짧은 패키지 README(toss)는 설명 몇 줄뿐이다.

## 파일

| 파일 | 내용 |
|---|---|
| [`spec.json`](spec.json) | 자료마다 커밋, 꺼낼 경로, 요청문, 메모, 다뤄야 할 내용 |
| [`sources.json`](sources.json) | 출처, 이용 조건, 작업 폴더 자료 해시, 기준 README |
| [`cases.json`](cases.json) | 위 파일로 만든 사례 |
