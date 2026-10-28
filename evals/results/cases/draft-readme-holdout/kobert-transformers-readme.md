# `kobert-transformers-readme`

[← README 초안 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 저장소의 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `monologg/KoBERT-Transformers` 커밋 `4e0a00e`의 코드(`.`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 설치 방법
- 모델과 토크나이저를 불러오는 사용 예
- 의존 라이브러리 버전 요구 사항

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # KoBERT-Transformers
>
> 🤗 \[Transformers](https://github.com/huggingface/transformers)에서 **KoBERT**와 **DistilKoBERT**를 간편하게 사용할 수 있도록 도와주는 라이브러리입니다.
>
> - KoBERT 전용 토크나이저(`KoBertTokenizer`, SentencePiece 기반)를 제공합니다.
> - 사전학습된 모델(`monologg/kobert`, `monologg/kobert-lm`, `monologg/distilkobert`)을 한 줄로 불러오는 헬퍼 함수를 제공합니다.
>
> ## 요구 사항
>
> - Python >= 3.6
> - `torch>=1.1.0`
> - `transformers>=3,<5`
> - `sentencepiece>=0.1.91`
>
> ## 설치
>
> ```bash
> pip install kobert-transformers
> ```
>
> 소스에서 직접 설치하려면 다음과 같이 합니다.
>
> ```bash
> git clone https://github.com/monologg/KoBERT-Transformers.git
> cd KoBERT-Transformers
> pip install .
> ```
>
> ## 사용법
>
> ### 토크나이저
>
> ```python
> from kobert_transformers import get_tokenizer
>
> tokenizer = get_tokenizer()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> # ['[CLS]', '▁한국', '어', '▁모델', '을', '▁공유', '합니다', '.', '[SEP]']
>
> tokenizer.convert_tokens_to_ids(tokens)
> # [2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]
> ```
>
> `KoBertTokenizer`를 직접 불러올 수도 있습니다.
>
> ```python
> from kobert_transformers.tokenization_kobert import KoBertTokenizer
>
> tokenizer = KoBertTokenizer.from_pretrained("monologg/kobert")
> ```
>
> ### 모델
>
> ```python
> from kobert_transformers import get_kobert_model, get_distilkobert_model
>
> model = get_kobert_model()
> model.eval()
>
> input_ids = tokenizer.batch_encode_plus(["한국어 모델을 공유합니다."], return_tensors="pt")["input_ids"]
> outputs = model(input_ids)
> sequence_output = outputs[0]  # (batch_size, sequence_length, hidden_size)
> ```
>
> 제공하는 함수는 다음과 같습니다.
>
> | 함수 | 반환 클래스 | 사전학습 모델 |
> | --- | --- | --- |
> | `get_kobert_model()` | `BertModel` | `monologg/kobert` |
> | `get_kobert_lm()` | `BertForMaskedLM` | `monologg/kobert-lm` |
> | `get_distilkobert_model()` | `DistilBertModel` | `monologg/distilkobert` |
> | `get_distilkobert_lm()` | `DistilBertForMaskedLM` | `monologg/distilkobert` |
>
> > 모델 가중치는 처음 호출할 때 Hugging Face에서 내려받으므로 인터넷 연결이 필요합니다.
>
> ## 토크나이저 사양
>
> | 항목 | 값 |
> | --- | --- |
> | 어휘 크기 (`vocab_size`) | 8002 |
> | 최대 입력 길이 (`model_max_length`) | 512 |
> | `[UNK]` / `[PAD]` / `[CLS]` / `[SEP]` / `[MASK]` ID | 0 / 1 / 2 / 3 / 4 |
> | `do_lower_case` | `False` |
>
> 입력 형식은 BERT와 동일합니다.
>
> - 문장 하나: `[CLS] X [SEP]`
> - 문장 쌍: `[CLS] A [SEP] B [SEP]`
>
> ## 개발
>
> ```bash
> pip install -r requirements.txt -r requirements-dev.txt
>
> make style    # black, isort, flake8 적용
> make quality  # 포맷/린트 검사만 수행
> make test     # pytest 실행
> ```
>
> 테스트는 사전학습 모델과 토크나이저를 내려받기 때문에 네트워크 연결이 필요합니다.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다.
>
> ## 참고
>
> - 저자: Jangwon Park
> - 저장소: <https://github.com/monologg/KoBERT-Transformers>

### 글빨 0.3.0 — ○ 근거 판정 통과

> # KoBERT-Transformers
>
> KoBERT와 DistilKoBERT를 🤗 Transformers에서 불러 쓰기 위한 라이브러리입니다. 모델과 토크나이저를 한 줄로 가져오는 함수를 제공합니다.
>
> ## 제공하는 것
>
> | 함수 | 반환 | 불러오는 모델 |
> |---|---|---|
> | `get_kobert_model()` | `BertModel` | `monologg/kobert` |
> | `get_kobert_lm()` | `BertForMaskedLM` | `monologg/kobert-lm` |
> | `get_distilkobert_model()` | `DistilBertModel` | `monologg/distilkobert` |
> | `get_distilkobert_lm()` | `DistilBertForMaskedLM` | `monologg/distilkobert` |
> | `get_tokenizer()` | `KoBertTokenizer` | `monologg/kobert` |
>
> `KoBertTokenizer`는 SentencePiece 기반 토크나이저입니다. `kobert_transformers.tokenization_kobert`에 있으며, `monologg/kobert`, `monologg/kobert-lm`, `monologg/distilkobert`의 어휘 파일을 등록해 두었습니다.
>
> ## 설치
>
> Python 3.6 이상이 필요합니다. 의존성은 다음과 같습니다.
>
> - `torch>=1.1.0`
> - `transformers>=3,<5`
> - `sentencepiece>=0.1.91`
>
> GitHub 저장소에서 설치합니다.
>
> ```bash
> pip install git+https://github.com/monologg/KoBERT-Transformers
> ```
>
> ## 사용법
>
> ```python
> from kobert_transformers import get_kobert_model, get_tokenizer
>
> model = get_kobert_model()
> tokenizer = get_tokenizer()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> # ['[CLS]', '▁한국', '어', '▁모델', '을', '▁공유', '합니다', '.', '[SEP]']
>
> ids = tokenizer.convert_tokens_to_ids(tokens)
> # [2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]
> ```
>
> 위 토큰과 id는 `tests/test_tokenizer.py`에서 확인하는 값입니다.
>
> ### 토크나이저 정보
>
> - 어휘 크기는 8002입니다.
> - 특수 토큰과 id는 `[UNK]` 0, `[PAD]` 1, `[CLS]` 2, `[SEP]` 3, `[MASK]` 4입니다.
> - 최대 입력 길이는 512 토큰입니다.
> - `do_lower_case`는 `False`가 기본값입니다.
> - 특수 토큰을 붙인 입력 형식은 단일 문장이 `[CLS] X [SEP]`, 문장 쌍이 `[CLS] A [SEP] B [SEP]`입니다.
>
> ## 개발
>
> 개발 도구는 `requirements-dev.txt`에 있습니다.
>
> ```bash
> pip install -r requirements-dev.txt
>
> make style    # black, isort, flake8 실행
> make quality  # 같은 도구를 검사 모드로 실행
> make test     # pytest 실행
> ```
>
> `tests/`는 `monologg/*` 모델과 토크나이저 파일을 내려받으므로 네트워크 연결이 필요합니다.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다. `tokenization_kobert.py`는 Google AI, Google Brain, Carnegie Mellon University 저자들과 HuggingFace Inc. 팀의 코드를 바탕으로 하며, 파일 상단에 해당 저작권 표기가 있습니다.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # KoBERT-Transformers
>
> 한국어 BERT 모델 KoBERT와 경량화 모델 DistilKoBERT를 \[Hugging Face Transformers](https://github.com/huggingface/transformers)에서 바로 불러 쓰게 해 주는 패키지입니다. 모델을 불러오는 함수 네 개와 KoBERT 토크나이저를 제공합니다.
>
> SentencePiece 기반 토크나이저 `KoBertTokenizer`도 이 패키지에 들어 있어서, 모델과 토크나이저를 한 패키지에서 가져올 수 있습니다.
>
> ```python
> from kobert_transformers import get_kobert_model, get_tokenizer
>
> tokenizer = get_tokenizer()
> model = get_kobert_model()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> # ['[CLS]', '▁한국', '어', '▁모델', '을', '▁공유', '합니다', '.', '[SEP]']
> ```
>
> ## 설치
>
> ```bash
> pip install kobert-transformers
> ```
>
> 필요한 환경은 다음과 같습니다.
>
> - Python 3.6 이상
> - `torch>=1.1.0`
> - `transformers>=3,<5`
> - `sentencepiece>=0.1.91`
>
> 테스트는 Transformers 3.0 이상 5.0 미만에서 확인합니다. 의존 패키지는 설치할 때 함께 설치됩니다. `sentencepiece`가 없으면 토크나이저를 쓸 수 없고, 설치하라는 경고가 출력됩니다.
>
> ## 사용법
>
> ### 토크나이저
>
> `get_tokenizer()`는 `monologg/kobert`의 토크나이저를 불러옵니다. 인자는 없습니다.
>
> ```python
> from kobert_transformers import get_tokenizer
>
> tokenizer = get_tokenizer()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> input_ids = tokenizer.convert_tokens_to_ids(tokens)
> # [2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]
> ```
>
> 특수 토큰과 ID는 다음과 같습니다.
>
> | 토큰 | ID |
> |---|---|
> | `[UNK]` | 0 |
> | `[PAD]` | 1 |
> | `[CLS]` | 2 |
> | `[SEP]` | 3 |
> | `[MASK]` | 4 |
>
> 어휘 크기는 8002이고 최대 입력 길이는 512 토큰입니다. 입력에는 문장 하나라면 `[CLS] X [SEP]`, 문장 쌍이라면 `[CLS] A [SEP] B [SEP]` 형식으로 특수 토큰이 붙습니다. 그래서 특수 토큰을 뺀 길이는 문장 하나에 510 토큰, 문장 쌍은 합쳐서 509 토큰까지입니다.
>
> ### 모델
>
> | 함수 | 반환 클래스 | 불러오는 모델 |
> |---|---|---|
> | `get_kobert_model()` | `BertModel` | `monologg/kobert` |
> | `get_kobert_lm()` | `BertForMaskedLM` | `monologg/kobert-lm` |
> | `get_distilkobert_model()` | `DistilBertModel` | `monologg/distilkobert` |
> | `get_distilkobert_lm()` | `DistilBertForMaskedLM` | `monologg/distilkobert` |
>
> 모델은 `from_pretrained`로 불러오므로 반환값은 Transformers의 해당 클래스 인스턴스입니다. 입력 ID를 모델에 넣는 방법도 Transformers와 같습니다.
>
> ```python
> import torch
> from kobert_transformers import get_kobert_model, get_tokenizer
>
> tokenizer = get_tokenizer()
> model = get_kobert_model()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> input_ids = torch.tensor([tokenizer.convert_tokens_to_ids(tokens)])
>
> outputs = model(input_ids)
> ```
>
> DistilKoBERT도 같은 방식으로 씁니다. 토크나이저는 `get_tokenizer()`를 그대로 사용합니다.
>
> ```python
> from kobert_transformers import get_distilkobert_model
>
> model = get_distilkobert_model()
> ```
>
> ## 개발
>
> 개발 도구는 `requirements-dev.txt`에 있습니다.
>
> ```bash
> pip install -r requirements-dev.txt
>
> make style    # black, isort, flake8 실행
> make quality  # 같은 도구로 검사만 실행
> make test     # pytest 실행
> ```
>
> 테스트는 토크나이저와 모델 네 종류를 `from_pretrained`로 불러옵니다.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # KoBERT-Transformers
>
> \[KoBERT](https://github.com/SKTBrain/KoBERT)와 DistilKoBERT를 \[🤗 Transformers](https://github.com/huggingface/transformers) 라이브러리에서 바로 사용할 수 있게 해 주는 패키지입니다.
>
> - `KoBertTokenizer`: KoBERT용 SentencePiece 기반 토크나이저
> - 모델 로딩 헬퍼: KoBERT, KoBERT-LM, DistilKoBERT, DistilKoBERT-LM
> - 모델 가중치는 Hugging Face Hub의 `monologg/*` 저장소에서 내려받습니다.
>
> ## 요구 사항
>
> - Python >= 3.6
> - `torch >= 1.1.0`
> - `transformers >= 3, < 5`
> - `sentencepiece >= 0.1.91`
>
> > **참고** `transformers` 5 버전 이상은 지원하지 않습니다. 테스트에서도 이 범위를 확인합니다.
>
> ## 설치
>
> ```bash
> pip install kobert-transformers
> ```
>
> 소스에서 설치하려면 다음과 같이 합니다.
>
> ```bash
> git clone https://github.com/monologg/KoBERT-Transformers.git
> cd KoBERT-Transformers
> pip install .
> ```
>
> ## 사용법
>
> ### 모델 불러오기
>
> ```python
> import torch
>
> from kobert_transformers import get_kobert_model
>
> model = get_kobert_model()
> model.eval()
>
> input_ids = torch.LongTensor([[2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]])
> attention_mask = torch.LongTensor([[1, 1, 1, 1, 1, 1, 1, 1, 1]])
>
> sequence_output, pooled_output = model(input_ids, attention_mask=attention_mask)[:2]
> ```
>
> `input_ids`는 위 토크나이저 예시의 결과와 같습니다. 반환 형식은 설치된 `transformers` 버전에 따라 달라질 수 있습니다.
>
> 제공하는 함수와 반환 모델은 다음과 같습니다.
>
> | 함수 | 반환 클래스 | Hub 모델 이름 |
> | --- | --- | --- |
> | `get_kobert_model()` | `BertModel` | `monologg/kobert` |
> | `get_kobert_lm()` | `BertForMaskedLM` | `monologg/kobert-lm` |
> | `get_distilkobert_model()` | `DistilBertModel` | `monologg/distilkobert` |
> | `get_distilkobert_lm()` | `DistilBertForMaskedLM` | `monologg/distilkobert` |
>
> ### 토크나이저 사용하기
>
> ```python
> from kobert_transformers import get_tokenizer
>
> tokenizer = get_tokenizer()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> # ['[CLS]', '▁한국', '어', '▁모델', '을', '▁공유', '합니다', '.', '[SEP]']
>
> tokenizer.convert_tokens_to_ids(tokens)
> # [2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]
> ```
>
> `get_tokenizer()`는 `KoBertTokenizer.from_pretrained("monologg/kobert")`와 같습니다. `KoBertTokenizer`를 직접 쓰려면 다음처럼 가져옵니다.
>
> ```python
> from kobert_transformers.tokenization_kobert import KoBertTokenizer
>
> tokenizer = KoBertTokenizer.from_pretrained("monologg/kobert")
> ```
>
> 토크나이저 설정은 다음과 같습니다.
>
> | 항목 | 값 |
> | --- | --- |
> | 어휘 크기 | 8002 |
> | 최대 길이 | 512 (단일 문장 510, 문장 쌍 509) |
> | `[UNK]` / `[PAD]` / `[CLS]` / `[SEP]` / `[MASK]` ID | 0 / 1 / 2 / 3 / 4 |
> | 입력 형식 | 단일 문장 `[CLS] X [SEP]`, 문장 쌍 `[CLS] A [SEP] B [SEP]` |
>
> ## 개발
>
> 개발용 의존성을 설치합니다.
>
> ```bash
> pip install -r requirements.txt -r requirements-dev.txt
> ```
>
> `Makefile`에 자주 쓰는 명령이 있습니다.
>
> ```bash
> make style    # black, isort로 포맷 적용 후 flake8 실행
> make quality  # 포맷 검사만 수행 (수정하지 않음)
> make test     # pytest 실행
> ```
>
> > 테스트는 Hugging Face Hub에서 모델과 토크나이저를 내려받으므로 네트워크 연결이 필요합니다.
>
> ## 프로젝트 구조
>
> ```
> kobert_transformers/
> ├── __init__.py              # 공개 API와 __version__
> ├── load_model.py            # 모델 로딩 함수
> ├── tokenization_kobert.py   # KoBertTokenizer
> ├── utils.py                 # get_tokenizer
> └── version.txt
> tests/
> ├── test_model.py
> └── test_tokenizer.py
> ```
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다. `tokenization_kobert.py`는 Google AI, Google Brain, Carnegie Mellon University, HuggingFace Inc. 팀의 코드를 바탕으로 작성되었습니다.

**근거 판정 실패 이유(판정 모델)**

- 외부 링크 https://github.com/SKTBrain/KoBERT 의 근거가 작업 폴더에 없다(link, unsupported).
- 외부 링크 https://github.com/huggingface/transformers 의 근거가 작업 폴더에 없다(link, unsupported).

### 글빨 0.3.0 — ○ 근거 판정 통과

> # KoBERT-Transformers
>
> KoBERT와 DistilKoBERT를 \[Hugging Face Transformers](https://github.com/huggingface/transformers)에서 불러 쓰게 해 주는 라이브러리입니다. 모델 로딩 함수와 SentencePiece 기반 `KoBertTokenizer`를 제공합니다.
>
> ## 제공하는 것
>
> | 함수 | 반환 클래스 | 불러오는 모델 |
> |---|---|---|
> | `get_kobert_model()` | `BertModel` | `monologg/kobert` |
> | `get_kobert_lm()` | `BertForMaskedLM` | `monologg/kobert-lm` |
> | `get_distilkobert_model()` | `DistilBertModel` | `monologg/distilkobert` |
> | `get_distilkobert_lm()` | `DistilBertForMaskedLM` | `monologg/distilkobert` |
> | `get_tokenizer()` | `KoBertTokenizer` | `monologg/kobert` |
>
> 모델과 토크나이저 파일은 처음 호출할 때 내려받습니다.
>
> ## 설치
>
> Python 3.6 이상이 필요합니다. 의존 패키지는 다음과 같습니다.
>
> - `torch>=1.1.0`
> - `transformers>=3,<5`
> - `sentencepiece>=0.1.91`
>
> ```bash
> pip install kobert-transformers
> ```
>
> ## 사용법
>
> ```python
> import torch
> from kobert_transformers import get_kobert_model, get_tokenizer
>
> model = get_kobert_model()
> tokenizer = get_tokenizer()
>
> input_ids = torch.tensor([tokenizer.encode("한국어 모델을 공유합니다.")])
> outputs = model(input_ids)
> ```
>
> 토크나이저는 문장을 다음과 같이 나눕니다.
>
> ```python
> >>> tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> ['[CLS]', '▁한국', '어', '▁모델', '을', '▁공유', '합니다', '.', '[SEP]']
> >>> tokenizer.convert_tokens_to_ids(_)
> [2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]
> ```
>
> ### 토크나이저 정보
>
> - 어휘 크기는 8002이고 최대 입력 길이는 512 토큰입니다.
> - 특수 토큰과 ID는 `[UNK]` 0, `[PAD]` 1, `[CLS]` 2, `[SEP]` 3, `[MASK]` 4입니다.
> - `[CLS]`와 `[SEP]`를 붙이는 형식은 문장 하나일 때 `[CLS] X [SEP]`, 문장 쌍일 때 `[CLS] A [SEP] B [SEP]`입니다.
>
> ## 개발
>
> 개발 도구를 설치한 뒤 `make`로 검사합니다.
>
> ```bash
> pip install -r requirements-dev.txt
> make style    # black, isort, flake8 실행
> make quality  # 같은 도구로 검사만 수행
> make test     # pytest 실행
> ```
>
> 테스트는 Hugging Face에서 모델과 토크나이저를 내려받으므로 네트워크 연결이 필요합니다.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다. 작성자는 Jangwon Park입니다.

### 글빨 0.4.0 — ✗ 근거 판정 실패

> # KoBERT-Transformers
>
> KoBERT와 DistilKoBERT를 \[Hugging Face Transformers](https://github.com/huggingface/transformers)에서 바로 불러 쓰게 해 주는 패키지입니다. 모델을 불러오는 함수 네 개와 KoBERT 토크나이저(`KoBertTokenizer`)를 제공합니다.
>
> ```python
> from kobert_transformers import get_kobert_model, get_tokenizer
>
> tokenizer = get_tokenizer()
> model = get_kobert_model()
>
> inputs = tokenizer("한국어 모델을 공유합니다.", return_tensors="pt")
> outputs = model(**inputs)
> ```
>
> ## 설치
>
> 요구 사항은 Python 3.6 이상, `torch>=1.1.0`, `transformers>=3,<5`, `sentencepiece>=0.1.91`입니다. 패키지를 설치하면 이 의존성도 함께 설치됩니다.
>
> ```bash
> git clone https://github.com/monologg/KoBERT-Transformers.git
> cd KoBERT-Transformers
> pip install .
> ```
>
> ## 사용법
>
> ### 모델 불러오기
>
> | 함수 | 반환 클래스 | 모델 이름 |
> |---|---|---|
> | `get_kobert_model()` | `BertModel` | `monologg/kobert` |
> | `get_kobert_lm()` | `BertForMaskedLM` | `monologg/kobert-lm` |
> | `get_distilkobert_model()` | `DistilBertModel` | `monologg/distilkobert` |
> | `get_distilkobert_lm()` | `DistilBertForMaskedLM` | `monologg/distilkobert` |
>
> 각 함수는 위 모델 이름으로 `from_pretrained`를 호출합니다.
>
> ```python
> from kobert_transformers import get_distilkobert_lm, get_distilkobert_model, get_kobert_lm, get_kobert_model
>
> model = get_kobert_model()
> lm_model = get_kobert_lm()
> distil_model = get_distilkobert_model()
> distil_lm_model = get_distilkobert_lm()
> ```
>
> ### 토크나이저
>
> `get_tokenizer()`는 `monologg/kobert`의 `KoBertTokenizer`를 반환합니다. SentencePiece 기반이고, 문장 앞뒤에 `[CLS]`와 `[SEP]`를 붙여 `[CLS] X [SEP]` 형태로 만듭니다. 문장 쌍은 `[CLS] A [SEP] B [SEP]`입니다.
>
> ```python
> from kobert_transformers import get_tokenizer
>
> tokenizer = get_tokenizer()
>
> tokens = tokenizer.tokenize("[CLS] 한국어 모델을 공유합니다. [SEP]")
> # ['[CLS]', '▁한국', '어', '▁모델', '을', '▁공유', '합니다', '.', '[SEP]']
>
> tokenizer.convert_tokens_to_ids(tokens)
> # [2, 4958, 6855, 2046, 7088, 1050, 7843, 54, 3]
> ```
>
> 어휘 크기는 8002이고 최대 입력 길이는 512입니다. 특수 토큰과 id는 다음과 같습니다.
>
> | 토큰 | id |
> |---|---|
> | `[UNK]` | 0 |
> | `[PAD]` | 1 |
> | `[CLS]` | 2 |
> | `[SEP]` | 3 |
> | `[MASK]` | 4 |
>
> ### DistilKoBERT 입력
>
> 토크나이저가 돌려주는 `token_type_ids`를 DistilBERT 계열 모델에 넘기지 마세요. `input_ids`와 `attention_mask`만 전달합니다.
>
> ```python
> inputs = tokenizer("한국어 모델을 공유합니다.", return_tensors="pt")
> outputs = distil_model(inputs["input_ids"], attention_mask=inputs["attention_mask"])
> ```
>
> ## 개발
>
> 개발 도구를 설치하고 `Makefile`의 명령으로 포맷, 검사, 테스트를 실행합니다. 테스트는 모델과 토크나이저를 내려받아 실행하며, 설치된 `transformers`가 3.0 이상 5.0 미만인지도 확인합니다.
>
> ```bash
> pip install -r requirements-dev.txt
> make style    # black, isort, flake8 적용
> make quality  # 적용 없이 검사만
> make test     # pytest
> ```
>
> ## 라이선스
>
> Apache License 2.0입니다. 자세한 내용은 \[LICENSE](LICENSE)를 참고하세요.

**근거 판정 실패 이유(판정 모델)**

- 'DistilKoBERT 입력' 절의 제약(token_type_ids를 DistilBERT 계열 모델에 넘기지 말 것)은 작업 폴더에 근거가 없는 limitation 주장(unsupported)이며, 확인되지 않은 제약을 사실처럼 쓴 금지 변경에 해당함

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 없음 우세

X가 조금 낫습니다. Y는 빠른 시작 예제를 맨 앞에 두었고, 510/509 토큰 계산처럼 쓸모 있는 설명을 문장으로 이어서 썼습니다. 그러나 소개 문단이 같은 내용을 반복하고, 같은 토크나이즈 코드가 세 번 나오며, 버전 범위도 두 번 적혀 있습니다. 첫 실행 때 인터넷이 필요하다는 중요한 주의도 빠졌습니다. X는 더 간결하면서도 소스 설치와 네트워크 주의까지 담고 있어 그대로 올리기에 더 알맞습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 차이 없음

X는 앞부분의 첫 사용 예, 입력 길이 설명, DistilKoBERT가 같은 토크나이저를 쓴다는 안내가 좋지만, 같은 내용과 예제가 반복된다. Y는 네트워크 필요 조건, 소스 설치, 토크나이저 직접 사용법을 알려 주지만, 설명이 목록과 표 위주이고 약간 덧붙인 부분이 있다. 장단점이 엇갈려 어느 쪽도 분명히 우세하지 않다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.3.0 우세

X는 작은 래퍼 라이브러리에 필요한 정보, 즉 함수 표·설치·사용 예·토크나이저 정보·개발·라이선스를 반복 없이 간결하게 담았습니다. 테스트에 네트워크가 필요하다는 점과 저작권 표기 같은 실용적인 주의도 들어 있습니다. Y는 모델 추론 예와 DistilKoBERT 사용 예가 추가로 쓸모 있지만, 같은 토크나이즈 예제를 세 번 반복하고 의존성과 토크나이저 소개도 되풀이해 분량이 불필요하게 늘었습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 차이 없음

X는 첫 사용 예와 모델 실행 예제, DistilKoBERT 사용법을 갖춰 실제 사용에 더 도움이 되고 문장 흐름도 좋다. 다만 예제와 소개가 중복된다. Y는 함수 표로 간결하게 정리하고 네트워크 필요 같은 주의를 적었지만, 모델 실행 예제가 없고 내부 정보가 조금 섞여 있다. 기준별 우열이 엇갈리고 차이도 크지 않아 동률로 판단한다.

</details>

