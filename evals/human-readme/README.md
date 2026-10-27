# 사람이 쓴 README 평가

[사람이 쓴 글 평가](../human/README.md)의 원문은 정책브리핑 기사여서, 글빨의 주 용도인 README·기술 문서와 장르가 달랐다. 여기서는 ChatGPT 공개일(2022-11-30) 전에 사람이 쓴 한국어 오픈소스 README로 같은 방식의 사례를 만든다.

- **polish**: README 발췌를 그대로 주고 다듬어 달라고 한다.
- **deslop**: 같은 발췌를 스킬 없는 별도 세션이 "더 전문적이고 매력적으로" 고친 글을 주고 AI 티를 빼 달라고 한다. 부풀린 글은 판정 모델이 원문과 대조해 사실이 그대로인 것만 쓴다.

만드는 방법과 비교 조건은 [사람이 쓴 글 평가](../human/README.md)와 같다. 명령은 `node scripts/eval/human.mjs <slop|build|reference> --dir evals/human-readme`이다.

## 원문

| 사례 원문 | 저장소 | 파일의 마지막 수정(2022-11-30 이전) | 라이선스 | 나눔 |
|---|---|---|---|---|
| `khaiii-performance` | kakao/khaiii | 2019-06-24 | Apache-2.0 | 개발용 |
| `py-hanspell-intro` | ssut/py-hanspell | 2020-06-03 | MIT | 개발용 |
| `kcbert-updates` | Beomi/KcBERT | 2022-11-07 | MIT | 개발용 |
| `toss-ky` | toss/slash (`packages/common/ky/README.ko.md`) | 2022-11-01 | MIT | 개발용 |
| `open-korean-text-intro` | open-korean-text/open-korean-text | 2018-07-31 | Apache-2.0 | 확인용 |
| `korpora-intro` | ko-nlp/Korpora | 2021-01-13 | CC-BY-4.0 | 확인용 |
| `koelectra-data` | monologg/KoELECTRA | 2021-11-02 | Apache-2.0 | 확인용 |
| `toss-storage` | toss/slash (`packages/common/storage/README.ko.md`) | 2022-10-14 | MIT | 확인용 |

글마다 2022-11-30 이전 마지막 커밋의 파일을 썼다. 커밋, 원문 주소, 발췌한 줄 범위, 뺀 줄(이미지·배지)은 [`sources.json`](sources.json)에 있다. 각 저장소의 라이선스 사본은 [`licenses/`](licenses/)에 그대로 두었다. 발췌문의 저작권은 각 저장소의 저작권자에게 있고, 각 라이선스 조건에 따라 평가 자료로 쓴다.

2022-11-30 이전 글을 골랐지만, 사람이 썼다고 확인할 방법은 없다. 한국어 NLP 라이브러리가 많아 분야가 치우쳐 있다. PR 본문은 이용 조건이 분명하지 않아 넣지 않았다.

## 파일

| 파일 | 내용 |
|---|---|
| [`sources.json`](sources.json) | 원문 발췌, 출처, 이용 조건 |
| [`spec.json`](spec.json) | 원문마다 요청문과 판정 기준 |
| `slop.json` | deslop 입력. 부풀린 글과 사실 검수 결과 |
| `cases.json` | 위 파일로 만든 사례 |
