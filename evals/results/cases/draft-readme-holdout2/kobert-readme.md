# `kobert-readme`

[← README 초안 2차 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 저장소의 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `SKTBrain/KoBERT` 커밋 `47a69af`의 코드(`.`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 설치 방법
- 모델과 토크나이저를 불러오는 사용 예
- 의존 라이브러리 요구 사항

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ✗ 근거 판정 실패

> # KoBERT
>
> 한국어 BERT 사전학습 모델(KoBERT, Korean BERT pre-trained cased)을 PyTorch, MXNet(GluonNLP), ONNX, Hugging Face Transformers에서 손쉽게 사용할 수 있도록 모델·토크나이저 다운로드와 로딩 코드를 제공하는 저장소입니다.
>
> ## 목차
>
> - \[모델 사양](#모델-사양)
> - \[설치](#설치)
> - \[사용법](#사용법)
>   - \[PyTorch](#pytorch)
>   - \[MXNet (GluonNLP)](#mxnet-gluonnlp)
>   - \[ONNX](#onnx)
>   - \[Hugging Face Transformers](#hugging-face-transformers)
> - \[예제 노트북](#예제-노트북)
> - \[저장소 구조](#저장소-구조)
> - \[참고 사항](#참고-사항)
> - \[라이선스](#라이선스)
>
> ## 모델 사양
>
> | 항목 | 값 |
> | --- | --- |
> | 레이어 수 | 12 |
> | 은닉 차원(hidden units) | 768 |
> | Feed-forward 차원 | 3072 |
> | 어텐션 헤드 수 | 12 |
> | 최대 시퀀스 길이 | 512 |
> | 토크나이저 | SentencePiece (대소문자 구분) |
>
> ## 설치
>
> Python 3.6 이상이 필요합니다.
>
> ### 요구 사항
>
> `requirements.txt`에 명시된 주요 의존성은 다음과 같습니다. 버전 상한이 고정되어 있으므로 최신 버전의 라이브러리와는 호환되지 않을 수 있습니다.
>
> ```
> boto3 <=1.15.18
> gluonnlp >= 0.6.0, <=0.10.0
> mxnet >= 1.4.0, <=1.7.0.post2
> onnxruntime == 1.8.0, <=1.8.0
> sentencepiece >= 0.1.6, <=0.1.96
> torch >= 1.7.0, <=1.10.1
> transformers >= 4.8.1, <=4.8.1
> ```
>
> ### 소스에서 설치
>
> ```bash
> git clone https://github.com/SKTBrain/KoBERT.git
> cd KoBERT
> pip install -r requirements.txt
> pip install .
> ```
>
> ### Hugging Face용 토크나이저만 설치
>
> `kobert_hf/` 디렉터리의 `kobert-tokenizer` 패키지는 `torch`, `transformers`, `sentencepiece`만 필요합니다.
>
> ```bash
> pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'
> ```
>
> ## 사용법
>
> 모델과 토크나이저 파일은 처음 호출할 때 S3에서 내려받아 현재 작업 디렉터리의 `.cache/`(기본값)에 저장됩니다. 이후에는 체크섬을 확인한 뒤 캐시된 파일을 재사용합니다.
>
> ### PyTorch
>
> ```python
> import torch
> from kobert import get_pytorch_kobert_model
>
> input_ids = torch.LongTensor([[31, 51, 99], [15, 5, 0]])
> input_mask = torch.LongTensor([[1, 1, 1], [1, 1, 0]])
> token_type_ids = torch.LongTensor([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_pytorch_kobert_model()
> sequence_output, pooled_output = model(input_ids, input_mask, token_type_ids)
>
> print(pooled_output.shape)   # (2, 768)
> print(sequence_output[0])
> ```
>
> - `get_pytorch_kobert_model(ctx="cpu", cachedir=".cache")`는 `(BertModel, BERTVocab)`을 반환합니다. GPU를 사용하려면 `ctx="cuda"` 등을 전달하세요.
> - 모델은 `eval()` 모드로 반환됩니다.
>
> ### MXNet (GluonNLP)
>
> ```python
> import mxnet as mx
> from kobert import get_mxnet_kobert_model
>
> input_id = mx.nd.array([[31, 51, 99], [15, 5, 0]])
> input_mask = mx.nd.array([[1, 1, 1], [1, 1, 0]])
> token_type_ids = mx.nd.array([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_mxnet_kobert_model(use_decoder=False, use_classifier=False)
> encoder_layer, pooled_output = model(input_id, token_type_ids)
>
> print(pooled_output.shape)
> print(encoder_layer[0])
> ```
>
> - `get_mxnet_kobert_model(use_pooler=True, use_decoder=True, use_classifier=True, ctx=mx.cpu(0), cachedir=".cache")`
> - 사용하지 않는 헤드는 `use_decoder=False`, `use_classifier=False` 등으로 끌 수 있습니다.
>
> ### ONNX
>
> ```python
> import numpy as np
> import onnxruntime
> from kobert import get_onnx_kobert_model
> from kobert.onnx_kobert import make_dummy_input
>
> onnx_path = get_onnx_kobert_model()
> dummy_input = make_dummy_input(max_seq_len=512)
>
> sess = onnxruntime.InferenceSession(onnx_path)
> outputs = sess.run(
>     None,
>     {
>         "input_ids": np.array(dummy_input[0]),
>         "token_type_ids": np.array(dummy_input[1]),
>         "input_mask": np.array(dummy_input[2]),
>         "position_ids": np.array(dummy_input[3]),
>     },
> )
> print(outputs[-2][0])
> ```
>
> `get_onnx_kobert_model()`은 내려받은 `.onnx` 파일의 경로를 반환합니다. 이 ONNX 모델은 onnxruntime 1.8.0 기준으로 변환되었습니다.
>
> ### Hugging Face Transformers
>
> `kobert_tokenizer.KoBERTTokenizer`는 `XLNetTokenizer`를 기반으로 KoBERT에 맞게 특수 토큰(`[CLS]`, `[SEP]`, `[PAD]`, `[UNK]`, `[MASK]`)과 입력 형식을 조정한 토크나이저입니다.
>
> ```python
> from kobert_tokenizer import KoBERTTokenizer
>
> tokenizer = KoBERTTokenizer.from_pretrained("skt/kobert-base-v1")
> print(tokenizer.tokenize("한국어 모델을 공유합니다."))
> ```
>
> 모델은 `transformers`의 `BertModel`로 불러올 수 있습니다.
>
> ```python
> import torch
> from transformers import BertModel
> from kobert_tokenizer import KoBERTTokenizer
>
> tokenizer = KoBERTTokenizer.from_pretrained("skt/kobert-base-v1")
> model = BertModel.from_pretrained("skt/kobert-base-v1")
>
> inputs = tokenizer("한국어 모델을 공유합니다.", return_tensors="pt")
> with torch.no_grad():
>     outputs = model(**inputs)
> print(outputs.last_hidden_state.shape)
> ```
>
> > `skt/kobert-base-v1`은 Hugging Face Hub에 게시된 모델 ID를 가정한 예시이며, 이 저장소의 코드만으로는 확인되지 않습니다. 네트워크 환경에 따라 사용 가능 여부를 확인하세요.
>
> ## 예제 노트북
>
> 네이버 영화 리뷰 감성 분류(NSMC) 예제가 `scripts/NSMC/`에 있습니다.
>
> - `naver_review_classifications_pytorch_kobert.ipynb` — PyTorch 기반
> - `naver_review_classifications_gluon_kobert.ipynb` — GluonNLP(MXNet) 기반
>
> ## 저장소 구조
>
> ```
> KoBERT/
> ├── kobert/                     # 메인 패키지
> │   ├── pytorch_kobert.py       # PyTorch 모델 로더
> │   ├── mxnet_kobert.py         # MXNet(GluonNLP) 모델 로더
> │   ├── onnx_kobert.py          # ONNX 모델 다운로더 및 더미 입력 생성
> │   └── utils/                  # S3 다운로더, 체크섬 검증, 토크나이저 다운로드
> ├── kobert_hf/                  # Hugging Face용 토크나이저 패키지 (kobert-tokenizer)
> │   └── kobert_tokenizer/
> ├── scripts/NSMC/               # 감성 분류 예제 노트북
> ├── requirements.txt
> ├── setup.py
> └── LICENSE
> ```
>
> ## 참고 사항
>
> - 모델 파일은 공개 S3 버킷에서 서명 없이(unsigned) 내려받으며, 다운로드 후 MD5 앞 10자리로 무결성을 검사합니다. 검사에 실패하면 `corrupted file!` 오류가 발생합니다.
> - 캐시 경로 `cachedir`은 현재 작업 디렉터리 기준 상대 경로입니다. 실행 위치가 바뀌면 모델을 다시 내려받습니다.
> - `requirements.txt`의 버전 제약이 엄격하므로, 다른 프로젝트와 함께 쓸 때는 가상환경 사용을 권장합니다.
>
> ## 라이선스
>
> 이 프로젝트는 \[Apache License 2.0](LICENSE)에 따라 배포됩니다.

**근거 판정 실패 이유(판정 모델)**

- 'skt/kobert-base-v1' Hugging Face 모델 ID를 쓴 사용 예는 저장소에서 근거를 찾을 수 없음(unsupported api). 결과 본문도 이 저장소 코드로는 확인되지 않는다고 스스로 밝힘
- 'ONNX 모델은 onnxruntime 1.8.0 기준으로 변환되었다'는 근거가 없음(unsupported version). 파일명은 onnx1.8.0만 가리킴

### 글빨 0.4.0 — ○ 근거 판정 통과

> # KoBERT
>
> KoBERT는 한국어로 사전 학습한 BERT 모델(Korean BERT pre-trained cased)을 PyTorch, MXNet, ONNX로 불러 쓰는 파이썬 패키지입니다. 함수를 호출하면 모델과 토크나이저 파일을 내려받아 캐시하고, 모델과 단어 사전을 돌려줍니다. Hugging Face `transformers`용 토크나이저는 별도 패키지 `kobert-tokenizer`로 들어 있습니다.
>
> ```python
> from kobert import get_pytorch_kobert_model
>
> model, vocab = get_pytorch_kobert_model()
> ```
>
> ## 설치
>
> Python 3.6 이상이 필요합니다.
>
> ```sh
> pip install git+https://github.com/SKTBrain/KoBERT.git@master
> ```
>
> `requirements.txt`에 적힌 `boto3`, `gluonnlp`, `mxnet`, `onnxruntime`, `sentencepiece`, `torch`, `transformers`가 버전 범위와 함께 모두 설치됩니다. PyTorch 모델만 쓰더라도 단어 사전을 `gluonnlp`로 만들기 때문에 `gluonnlp`는 필요합니다.
>
> ## 사용
>
> MXNet 모델은 레이어 12개, 은닉 차원 768, 어텐션 헤드 12개, 최대 길이 512로 구성됩니다(`mxnet_kobert.py`에 적힌 설정).
>
> ### PyTorch
>
> `get_pytorch_kobert_model(ctx="cpu", cachedir=".cache")`는 `transformers`의 `BertModel`(평가 모드)과 `gluonnlp`의 `BERTVocab`을 돌려줍니다. 모델은 `(sequence_output, pooled_output)` 튜플을 반환합니다. GPU를 쓰려면 `ctx`에 `"cuda"` 같은 `torch.device`용 문자열을 넘깁니다.
>
> ```python
> import torch
> from kobert import get_pytorch_kobert_model
>
> model, vocab = get_pytorch_kobert_model()
>
> input_ids = torch.LongTensor([[31, 51, 99], [15, 5, 0]])
> input_mask = torch.LongTensor([[1, 1, 1], [1, 1, 0]])
> token_type_ids = torch.LongTensor([[0, 0, 1], [0, 1, 0]])
> sequence_output, pooled_output = model(input_ids, input_mask, token_type_ids)
> ```
>
> 문장을 토큰으로 나누려면 `get_tokenizer()`가 돌려주는 SentencePiece 파일 경로와 위에서 받은 `vocab`으로 `gluonnlp`의 토크나이저를 만듭니다. 토큰 ID로 바꿔 배치를 만드는 과정은 \[NSMC 예제](#예제)에 있습니다.
>
> ```python
> import gluonnlp as nlp
> from kobert import get_tokenizer
>
> tok = nlp.data.BERTSPTokenizer(get_tokenizer(), vocab, lower=False)
> ```
>
> ### MXNet
>
> `get_mxnet_kobert_model`은 `gluonnlp`의 `BERTModel`과 `BERTVocab`을 돌려줍니다. `use_pooler`, `use_decoder`, `use_classifier`(모두 기본값 `True`)로 포함할 헤드를 고르고, `ctx`의 기본값은 `mx.cpu(0)`입니다. 아래는 풀러만 쓰는 예입니다.
>
> ```python
> import mxnet as mx
> from kobert import get_mxnet_kobert_model
>
> model, vocab = get_mxnet_kobert_model(use_decoder=False, use_classifier=False)
>
> input_id = mx.nd.array([[31, 51, 99], [15, 5, 0]])
> token_type_ids = mx.nd.array([[0, 0, 1], [0, 1, 0]])
> encoder_layer, pooled_output = model(input_id, token_type_ids)
> ```
>
> ### ONNX
>
> `get_onnx_kobert_model(cachedir=".cache")`는 모델 객체가 아니라 내려받은 `.onnx` 파일의 경로를 돌려줍니다. 입력 이름은 `input_ids`, `token_type_ids`, `input_mask`, `position_ids`입니다. 파일 이름에 `onnx1.8.0`이 들어 있고 `requirements.txt`는 `onnxruntime == 1.8.0`으로 고정합니다.
>
> ```python
> import numpy as np
> import onnxruntime
> from kobert import get_onnx_kobert_model
> from kobert.onnx_kobert import make_dummy_input
>
> input_ids, token_type_ids, input_mask, position_ids = make_dummy_input(max_seq_len=512)
> sess = onnxruntime.InferenceSession(get_onnx_kobert_model())
> outputs = sess.run(
>     None,
>     {
>         "input_ids": np.array(input_ids),
>         "token_type_ids": np.array(token_type_ids),
>         "input_mask": np.array(input_mask),
>         "position_ids": np.array(position_ids),
>     },
> )
> ```
>
> `make_dummy_input`은 두 문장을 길이 512로 패딩한 더미 입력을 만듭니다. 실제 입력은 같은 형태로 직접 만듭니다.
>
> ## Hugging Face 토크나이저
>
> `kobert_hf/` 디렉터리의 `kobert-tokenizer` 패키지(0.1)에는 `XLNetTokenizer`를 상속한 `KoBERTTokenizer`가 있습니다. `[CLS]`, `[SEP]`, `[UNK]`, `[PAD]`, `[MASK]` 토큰을 쓰고 대소문자를 구분하며, 한 문장은 `[CLS] X [SEP]`, 문장 쌍은 `[CLS] A [SEP] B [SEP]` 형태로 만듭니다. 숫자 뒤에 붙은 쉼표는 별도 토큰으로 분리합니다.
>
> ```python
> from kobert_tokenizer import KoBERTTokenizer
> ```
>
> 이 패키지는 `torch >= 1.8.1`, `transformers >= 4.8.2`, `sentencepiece >= 0.1.91`이 필요합니다.
>
> ## 모델 내려받기와 캐시
>
> 처음 호출하면 `s3://skt-lsl-nlp-model/KoBERT/` 아래의 파일을 서명 없이(unsigned) 내려받아 현재 작업 디렉터리의 `.cache`(`cachedir`로 바꿀 수 있음)에 저장합니다. 이후에는 캐시 파일의 MD5 앞 10자리가 기대값과 같을 때 다시 받지 않습니다. 내려받은 파일의 체크섬이 맞지 않으면 `corrupted file!`이라는 메시지와 함께 `AssertionError`가 납니다. PyTorch 모델은 받은 zip을 `cachedir`에 풉니다.
>
> ## 예제
>
> `scripts/NSMC/`에 네이버 영화 리뷰(NSMC) 분류를 위한 파인튜닝 노트북이 있습니다.
>
> - \[`naver_review_classifications_pytorch_kobert.ipynb`](scripts/NSMC/naver_review_classifications_pytorch_kobert.ipynb)
> - \[`naver_review_classifications_gluon_kobert.ipynb`](scripts/NSMC/naver_review_classifications_gluon_kobert.ipynb) (MXNet/Gluon)
>
> ## 제한 사항
>
> - `kobert`는 `transformers`를 4.8.1로 고정하고 `kobert-tokenizer`는 4.8.2 이상을 요구하므로, 두 패키지는 같은 환경에 설치할 수 없습니다.
> - `requirements.txt`가 `torch <= 1.10.1`, `mxnet <= 1.7.0.post2`처럼 상한을 둡니다. 상한을 넘는 버전은 `pip install`이 허용하지 않습니다.
>
> ## 라이선스
>
> Apache License 2.0입니다. 자세한 내용은 \[LICENSE](LICENSE)를 보세요.

### 글빨 0.4.1 — ○ 근거 판정 통과

> # KoBERT
>
> KoBERT는 한국어로 사전 학습한 BERT 모델(cased)을 PyTorch, MXNet, ONNX Runtime에서 불러 쓰게 해 주는 파이썬 패키지입니다. 모델과 토크나이저 파일은 호출할 때 내려받아 `.cache` 폴더에 저장하므로, 따로 파일을 받아 둘 필요가 없습니다.
>
> BERT는 문장을 토큰 단위로 읽어 문맥을 반영한 벡터로 바꾸는 모델입니다. 이 벡터 위에 분류기 등을 얹어 문장 분류 같은 작업을 미세 조정(fine-tuning)할 수 있습니다. KoBERT가 제공하는 것은 사전 학습된 모델과 SentencePiece 토크나이저 파일입니다.
>
> ```python
> from kobert import get_pytorch_kobert_model
>
> model, vocab = get_pytorch_kobert_model()
> ```
>
> 저장소에는 패키지 두 개가 들어 있습니다.
>
> | 패키지 | 위치 | 용도 |
> |---|---|---|
> | `kobert` | `kobert/` | PyTorch, MXNet, ONNX용 모델과 토크나이저 파일 내려받기 |
> | `kobert-tokenizer` | `kobert_hf/` | Hugging Face `transformers`와 함께 쓰는 `KoBERTTokenizer` |
>
> ## 설치
>
> Python 3.6 이상이 필요합니다.
>
> ```bash
> pip install git+https://git@github.com/SKTBrain/KoBERT.git@master
> ```
>
> `requirements.txt`가 `boto3`, `gluonnlp`, `mxnet`, `onnxruntime`, `sentencepiece`, `torch`, `transformers`를 모두 설치하도록 정해 두었고, 버전 범위도 지정되어 있습니다. 또 `import kobert`를 하면 `torch`, `transformers`, `mxnet`, `gluonnlp`가 함께 불러와집니다. 쓰지 않는 프레임워크도 설치되어 있어야 합니다.
>
> | 패키지 | 버전 |
> |---|---|
> | boto3 | 1.15.18 이하 |
> | gluonnlp | 0.6.0 이상 0.10.0 이하 |
> | mxnet | 1.4.0 이상 1.7.0.post2 이하 |
> | onnxruntime | 1.8.0 |
> | sentencepiece | 0.1.6 이상 0.1.96 이하 |
> | torch | 1.7.0 이상 1.10.1 이하 |
> | transformers | 4.8.1 |
>
> ## 사용법
>
> 모델 파일은 S3 버킷에서 자격 증명 없이 내려받습니다. 받은 파일은 현재 작업 디렉터리 아래 `.cache`(기본값, `cachedir` 인자로 변경)에 저장하고, 다음 호출부터는 캐시를 씁니다. 내려받은 뒤에는 파일의 MD5 앞 10자리를 확인하며, 일치하지 않으면 `corrupted file!` 오류가 납니다.
>
> ### PyTorch
>
> `get_pytorch_kobert_model(ctx="cpu", cachedir=".cache")`는 `transformers`의 `BertModel`과 `gluonnlp`의 `BERTVocab`을 반환합니다. 모델은 추론 모드(`eval()`)로 `ctx` 장치에 올라가며, 호출하면 `(sequence_output, pooled_output)` 튜플을 반환합니다.
>
> ```python
> import torch
> from kobert import get_pytorch_kobert_model
>
> input_ids = torch.LongTensor([[31, 51, 99], [15, 5, 0]])
> input_mask = torch.LongTensor([[1, 1, 1], [1, 1, 0]])
> token_type_ids = torch.LongTensor([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_pytorch_kobert_model()
> sequence_output, pooled_output = model(input_ids, input_mask, token_type_ids)
> ```
>
> ### MXNet
>
> `get_mxnet_kobert_model(use_pooler=True, use_decoder=True, use_classifier=True, ctx=mx.cpu(0), cachedir=".cache")`는 `gluonnlp`의 `BERTModel`과 `BERTVocab`을 반환합니다. `use_pooler`, `use_decoder`, `use_classifier`로 모델이 가질 출력 층을 고릅니다. 아래처럼 디코더와 분류기를 끄면 호출 결과가 `(encoder_layer, pooled_output)`입니다.
>
> ```python
> import mxnet as mx
> from kobert import get_mxnet_kobert_model
>
> input_id = mx.nd.array([[31, 51, 99], [15, 5, 0]])
> token_type_ids = mx.nd.array([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_mxnet_kobert_model(use_decoder=False, use_classifier=False)
> encoder_layer, pooled_output = model(input_id, token_type_ids)
> ```
>
> MXNet 쪽 모델 정의는 12개 층, 은닉 크기 768, 어텐션 헤드 12개, 최대 길이 512입니다.
>
> ### ONNX
>
> `get_onnx_kobert_model(cachedir=".cache")`는 모델을 내려받고 `.onnx` 파일 경로를 반환합니다. 입력 이름은 `input_ids`, `token_type_ids`, `input_mask`, `position_ids`입니다. 아래 예의 `make_dummy_input`은 `kobert.onnx_kobert`에 있는 시험용 입력 생성 함수로, 길이가 다른 두 문장을 `max_seq_len`에 맞춰 채웁니다.
>
> ```python
> import numpy as np
> import onnxruntime
> from kobert import get_onnx_kobert_model
> from kobert.onnx_kobert import make_dummy_input
>
> onnx_path = get_onnx_kobert_model()
> dummy_input = make_dummy_input(max_seq_len=512)
>
> sess = onnxruntime.InferenceSession(onnx_path)
> outputs = sess.run(
>     None,
>     {
>         "input_ids": np.array(dummy_input[0]),
>         "token_type_ids": np.array(dummy_input[1]),
>         "input_mask": np.array(dummy_input[2]),
>         "position_ids": np.array(dummy_input[3]),
>     },
> )
> ```
>
> ### 토크나이저 파일
>
> `get_tokenizer(cachedir=".cache")`는 SentencePiece 파일을 내려받고 경로를 반환합니다. 모델 함수들도 내부에서 이 함수를 불러 어휘를 만듭니다. `gluonnlp`의 `BERTSPTokenizer`에 이 경로와 모델과 함께 받은 `vocab`을 넘기면 토크나이저를 만들 수 있습니다.
>
> ```python
> import gluonnlp as nlp
> from kobert import get_tokenizer
>
> tokenizer = get_tokenizer()
> tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)
> ```
>
> ### Hugging Face용 토크나이저
>
> `kobert-tokenizer`의 `KoBERTTokenizer`는 `transformers`의 `XLNetTokenizer`를 상속합니다. 특수 토큰은 `[CLS]`, `[SEP]`, `[UNK]`, `[PAD]`, `[MASK]`이고, 패딩은 오른쪽에 붙입니다. 입력은 문장 하나면 `[CLS] X [SEP]`, 문장 쌍이면 `[CLS] A [SEP] B [SEP]` 형태가 됩니다. 숫자 뒤에 쉼표가 붙은 조각(`123,` 등)은 숫자와 쉼표로 나눕니다.
>
> `vocab_file`에는 위의 SentencePiece 파일을 줍니다.
>
> ```python
> from kobert import get_tokenizer
> from kobert_tokenizer import KoBERTTokenizer
>
> tokenizer = KoBERTTokenizer(vocab_file=get_tokenizer())
> ```
>
> `kobert-tokenizer`는 `torch` 1.8.1 이상, `transformers` 4.8.2 이상, `sentencepiece` 0.1.91 이상이 필요합니다. 저장소를 내려받은 뒤 `kobert_hf/` 폴더에서 설치합니다.
>
> ```bash
> cd kobert_hf
> pip install .
> ```
>
> ## 미세 조정 예제
>
> `scripts/NSMC/`에 네이버 영화 리뷰(NSMC) 감성 분류 노트북이 두 개 있습니다.
>
> - `naver_review_classifications_pytorch_kobert.ipynb`: PyTorch
> - `naver_review_classifications_gluon_kobert.ipynb`: Gluon
>
> PyTorch 노트북은 `max_len` 64, `batch_size` 64, 클래스 2개로 분류기를 학습합니다. 학습·평가 데이터는 노트북 안의 `wget` 명령으로 `.cache`에 내려받습니다.
>
> ## 라이선스
>
> Apache License 2.0을 따릅니다. 전문은 `LICENSE` 파일에 있습니다.

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # KoBERT
>
> 한국어 BERT 사전학습 모델(KoBERT, Korean BERT pre-trained cased)을 PyTorch, MXNet(GluonNLP), ONNX, 그리고 Hugging Face Transformers에서 쉽게 불러다 쓸 수 있도록 만든 저장소입니다.
>
> ## 목차
>
> - \[모델 구성](#모델-구성)
> - \[설치](#설치)
> - \[사용법](#사용법)
>   - \[PyTorch](#pytorch)
>   - \[MXNet (GluonNLP)](#mxnet-gluonnlp)
>   - \[ONNX](#onnx)
>   - \[Hugging Face Transformers](#hugging-face-transformers)
> - \[예제: 네이버 영화 리뷰 감성 분류 (NSMC)](#예제-네이버-영화-리뷰-감성-분류-nsmc)
> - \[저장소 구조](#저장소-구조)
> - \[참고 사항](#참고-사항)
> - \[라이선스](#라이선스)
>
> ## 모델 구성
>
> MXNet 구현(`kobert/mxnet_kobert.py`)에 정의된 BERT-base 규모의 구조입니다.
>
> | 항목 | 값 |
> | --- | --- |
> | 레이어 수 | 12 |
> | 은닉 차원 (units) | 768 |
> | 피드포워드 차원 (hidden size) | 3072 |
> | 어텐션 헤드 수 | 12 |
> | 최대 시퀀스 길이 | 512 |
> | 토큰 타입 수 | 2 |
> | 토크나이저 | SentencePiece |
>
> ## 설치
>
> Python 3.6 이상이 필요합니다.
>
> ```bash
> git clone https://github.com/SKTBrain/KoBERT.git
> cd KoBERT
> pip install -r requirements.txt
> pip install .
> ```
>
> `requirements.txt`는 다음 패키지를 특정 버전 범위로 고정하고 있습니다.
>
> | 패키지 | 버전 |
> | --- | --- |
> | boto3 | <= 1.15.18 |
> | gluonnlp | >= 0.6.0, <= 0.10.0 |
> | mxnet | >= 1.4.0, <= 1.7.0.post2 |
> | onnxruntime | == 1.8.0 |
> | sentencepiece | >= 0.1.6, <= 0.1.96 |
> | torch | >= 1.7.0, <= 1.10.1 |
> | transformers | == 4.8.1 |
>
> > `kobert` 패키지는 import 시점에 PyTorch, MXNet, ONNX 모듈을 모두 불러오므로 (`kobert/__init__.py`) 위 의존성이 모두 설치되어 있어야 합니다.
>
> ## 사용법
>
> 모델과 토크나이저 파일은 처음 호출할 때 AWS S3에서 현재 작업 디렉터리 아래의 `.cache/`로 내려받습니다. 이후에는 MD5 체크섬이 일치하면 캐시된 파일을 재사용합니다. 저장 위치는 `cachedir` 인자로 바꿀 수 있습니다.
>
> ### PyTorch
>
> ```python
> import torch
> from kobert import get_pytorch_kobert_model
>
> input_ids = torch.LongTensor([[31, 51, 99], [15, 5, 0]])
> input_mask = torch.LongTensor([[1, 1, 1], [1, 1, 0]])
> token_type_ids = torch.LongTensor([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_pytorch_kobert_model()
> sequence_output, pooled_output = model(input_ids, input_mask, token_type_ids)
> print(pooled_output.shape)
> print(vocab)
> print(sequence_output[0])
> ```
>
> `get_pytorch_kobert_model(ctx="cpu", cachedir=".cache")`는 평가 모드(`eval()`)의 `transformers.BertModel`과 GluonNLP의 `BERTVocab`을 반환합니다. GPU를 쓰려면 `ctx="cuda"`를 전달하세요.
>
> ### MXNet (GluonNLP)
>
> ```python
> import mxnet as mx
> from kobert import get_mxnet_kobert_model
>
> input_id = mx.nd.array([[31, 51, 99], [15, 5, 0]])
> input_mask = mx.nd.array([[1, 1, 1], [1, 1, 0]])
> token_type_ids = mx.nd.array([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_mxnet_kobert_model(use_decoder=False, use_classifier=False)
> encoder_layer, pooled_output = model(input_id, token_type_ids)
> print(pooled_output.shape)
> print(vocab)
> print(encoder_layer[0])
> ```
>
> `get_mxnet_kobert_model(use_pooler=True, use_decoder=True, use_classifier=True, ctx=mx.cpu(0), cachedir=".cache")`로 사용할 헤드와 디바이스를 선택할 수 있습니다.
>
> ### ONNX
>
> ```python
> import numpy as np
> import onnxruntime
> from kobert import get_onnx_kobert_model
> from kobert.onnx_kobert import make_dummy_input
>
> onnx_path = get_onnx_kobert_model()
> dummy_input = make_dummy_input(max_seq_len=512)
>
> sess = onnxruntime.InferenceSession(onnx_path)
> outputs = sess.run(
>     None,
>     {
>         "input_ids": np.array(dummy_input[0]),
>         "token_type_ids": np.array(dummy_input[1]),
>         "input_mask": np.array(dummy_input[2]),
>         "position_ids": np.array(dummy_input[3]),
>     },
> )
> print(outputs[-2][0])
> ```
>
> ONNX 모델은 `onnxruntime==1.8.0` 기준으로 변환된 파일입니다.
>
> ### Hugging Face Transformers
>
> Hugging Face에서 쓰는 토크나이저(`KoBERTTokenizer`)는 `kobert_hf/`에 별도 패키지(`kobert-tokenizer`)로 분리되어 있습니다. `XLNetTokenizer`를 상속하며 `[CLS] X [SEP]` 형식으로 입력을 구성합니다.
>
> ```bash
> pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'
> ```
>
> 의존성은 `torch >= 1.8.1`, `transformers >= 4.8.2`, `sentencepiece >= 0.1.91`입니다.
>
> ```python
> from kobert_tokenizer import KoBERTTokenizer
> from transformers import BertModel
>
> tokenizer = KoBERTTokenizer.from_pretrained("skt/kobert-base-v1")
> model = BertModel.from_pretrained("skt/kobert-base-v1")
>
> text = "한국어 모델을 공유합니다."
> inputs = tokenizer.batch_encode_plus([text], return_tensors="pt")
> out = model(
>     input_ids=inputs["input_ids"],
>     attention_mask=inputs["attention_mask"],
> )
> ```
>
> ## 예제: 네이버 영화 리뷰 감성 분류 (NSMC)
>
> `scripts/NSMC/`에 \[네이버 영화 리뷰 데이터(NSMC)](https://github.com/e9t/nsmc)로 감성 분류를 파인튜닝하는 노트북이 있습니다.
>
> - `naver_review_classifications_pytorch_kobert.ipynb`: PyTorch 버전
> - `naver_review_classifications_gluon_kobert.ipynb`: GluonNLP(MXNet) 버전
>
> ## 저장소 구조
>
> ```
> .
> ├── kobert/                  # KoBERT 로더 패키지
> │   ├── pytorch_kobert.py    # PyTorch 모델 로더
> │   ├── mxnet_kobert.py      # MXNet(GluonNLP) 모델 로더
> │   ├── onnx_kobert.py       # ONNX 모델 로더
> │   └── utils/               # S3 다운로드, 체크섬 검증, 토크나이저 다운로드
> ├── kobert_hf/               # Hugging Face용 KoBERTTokenizer 패키지
> ├── scripts/NSMC/            # 감성 분류 예제 노트북
> ├── requirements.txt
> └── setup.py
> ```
>
> ## 참고 사항
>
> - 모델 가중치는 S3(`s3://skt-lsl-nlp-model/KoBERT/...`)에서 `boto3`로 내려받습니다. 네트워크 접근이 가능해야 하며, 다운로드 후 체크섬이 맞지 않으면 `corrupted file!` 오류가 발생합니다.
> - 캐시 경로는 실행 위치(현재 작업 디렉터리) 기준입니다. 다른 위치에서 실행하면 모델을 다시 내려받습니다.
> - 의존성 상한이 낮게 고정되어 있으므로 최신 PyTorch/Transformers 환경에서는 가상환경을 따로 만들어 설치하는 것을 권장합니다.
>
> ## 라이선스
>
> 이 저장소는 \[Apache License 2.0](LICENSE)을 따릅니다.

**근거 판정 실패 이유(판정 모델)**

- Hugging Face 사용 예의 모델 ID 'skt/kobert-base-v1'이 작업 폴더에서 확인되지 않음 (api, unsupported)
- NSMC 데이터 링크 https://github.com/e9t/nsmc가 저장소에 없음. 노트북은 SKT S3 경로에서 데이터를 받음 (link, unsupported)
- 'ONNX 모델은 onnxruntime==1.8.0 기준으로 변환'이라는 서술은 근거 없는 추정임 (version, unsupported)

### 글빨 0.4.0 — ○ 근거 판정 통과

> # KoBERT
>
> KoBERT는 한국어 BERT 사전 학습 모델(cased)을 내려받아 PyTorch, MXNet(Gluon), ONNX로 불러 쓰는 파이썬 패키지입니다. 토크나이저에 쓰는 SentencePiece 어휘 파일도 함께 내려받습니다. 모델 구성은 12개 레이어, 은닉 크기 768, 어텐션 헤드 12개, 최대 시퀀스 길이 512입니다.
>
> 저장소에는 두 패키지가 들어 있습니다.
>
> | 패키지 | 위치 | 용도 |
> |---|---|---|
> | `kobert` | 저장소 루트 | 모델과 어휘 파일을 내려받고 PyTorch·MXNet·ONNX용으로 불러옵니다. |
> | `kobert-tokenizer` | `kobert_hf/` | Hugging Face `transformers`에서 쓰는 `KoBERTTokenizer`를 제공합니다. |
>
> ## 설치
>
> ```bash
> pip install git+https://git@github.com/SKTBrain/KoBERT.git@master
> ```
>
> Python 3.6 이상이 필요합니다. `requirements.txt`에 PyTorch, MXNet, GluonNLP, ONNX Runtime, `transformers`, `boto3`가 모두 적혀 있어서 `kobert`를 설치하면 이 패키지들이 함께 설치됩니다. 버전 범위는 다음과 같습니다.
>
> ```text
> boto3 <=1.15.18
> gluonnlp >= 0.6.0, <=0.10.0
> mxnet >= 1.4.0, <=1.7.0.post2
> onnxruntime == 1.8.0, <=1.8.0
> sentencepiece >= 0.1.6, <=0.1.96
> torch >= 1.7.0, <=1.10.1
> transformers >= 4.8.1, <=4.8.1
> ```
>
> `kobert-tokenizer`는 `kobert_hf/` 디렉터리에서 설치합니다. 요구 사항은 `torch >= 1.8.1`, `transformers >= 4.8.2`, `sentencepiece >= 0.1.91`입니다.
>
> ```bash
> pip install "git+https://git@github.com/SKTBrain/KoBERT.git@master#subdirectory=kobert_hf"
> ```
>
> ## 사용법
>
> 모델과 어휘 파일은 처음 호출할 때 S3에서 내려받고, 현재 작업 디렉터리의 `.cache`에 저장합니다. 이미 받은 파일은 체크섬이 맞으면 다시 받지 않습니다. 저장 위치는 `cachedir` 인자로 바꿀 수 있습니다. 내려받은 파일의 체크섬이 맞지 않으면 `corrupted file!` 메시지와 함께 `AssertionError`가 발생합니다.
>
> ### PyTorch
>
> `get_pytorch_kobert_model()`은 `transformers`의 `BertModel`과 GluonNLP의 `BERTVocab`을 반환합니다. 모델은 평가 모드로 `ctx`에 지정한 장치(기본값 `"cpu"`)에 올라가 있고, 출력은 `(sequence_output, pooled_output)` 튜플입니다.
>
> ```python
> import torch
> from kobert import get_pytorch_kobert_model
>
> input_ids = torch.LongTensor([[31, 51, 99], [15, 5, 0]])
> input_mask = torch.LongTensor([[1, 1, 1], [1, 1, 0]])
> token_type_ids = torch.LongTensor([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_pytorch_kobert_model()
> sequence_output, pooled_output = model(input_ids, input_mask, token_type_ids)
> ```
>
> ### MXNet
>
> `get_mxnet_kobert_model()`은 GluonNLP의 `BERTModel`과 `BERTVocab`을 반환합니다. `use_pooler`, `use_decoder`, `use_classifier`로 포함할 출력 층을 고르고, `ctx`로 장치를 지정합니다(기본값 `mx.cpu(0)`). 디코더와 분류기를 끄면 `(encoder_layer, pooled_output)`을 얻습니다.
>
> ```python
> import mxnet as mx
> from kobert import get_mxnet_kobert_model
>
> input_id = mx.nd.array([[31, 51, 99], [15, 5, 0]])
> token_type_ids = mx.nd.array([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_mxnet_kobert_model(use_decoder=False, use_classifier=False)
> encoder_layer, pooled_output = model(input_id, token_type_ids)
> ```
>
> ### ONNX
>
> `get_onnx_kobert_model()`은 ONNX 모델을 내려받고 파일 경로를 반환합니다. `requirements.txt`는 ONNX Runtime을 1.8.0으로 고정합니다. 입력 이름은 `input_ids`, `token_type_ids`, `input_mask`, `position_ids`입니다.
>
> ```python
> import numpy as np
> import onnxruntime
> from kobert import get_onnx_kobert_model
> from kobert.onnx_kobert import make_dummy_input
>
> onnx_path = get_onnx_kobert_model()
> input_ids, token_type_ids, input_mask, position_ids = make_dummy_input(max_seq_len=512)
>
> sess = onnxruntime.InferenceSession(onnx_path)
> outputs = sess.run(
>     None,
>     {
>         "input_ids": np.array(input_ids),
>         "token_type_ids": np.array(token_type_ids),
>         "input_mask": np.array(input_mask),
>         "position_ids": np.array(position_ids),
>     },
> )
> ```
>
> ### 토크나이저
>
> `get_tokenizer()`는 SentencePiece 어휘 파일을 내려받고 경로를 반환합니다. 모델과 함께 받은 `vocab`을 GluonNLP의 `BERTSPTokenizer`에 넘기면 문장을 모델 입력으로 바꿀 수 있습니다. 아래 코드는 `scripts/NSMC`의 노트북과 같은 방식입니다.
>
> ```python
> import gluonnlp as nlp
> from kobert import get_pytorch_kobert_model, get_tokenizer
>
> model, vocab = get_pytorch_kobert_model()
> tok = nlp.data.BERTSPTokenizer(get_tokenizer(), vocab, lower=False)
>
> transform = nlp.data.BERTSentenceTransform(tok, max_seq_length=64, pad=True, pair=False)
> token_ids, valid_length, segment_ids = transform(["한국어 문장"])
> ```
>
> ### Hugging Face 토크나이저
>
> `kobert-tokenizer`의 `KoBERTTokenizer`는 `XLNetTokenizer`를 상속하고, 입력을 `[CLS] 문장 [SEP]` 형태로 만듭니다. 쌍 입력은 `[CLS] A [SEP] B [SEP]`입니다. 생성할 때 SentencePiece 어휘 파일 경로를 넘깁니다.
>
> ```python
> from kobert import get_tokenizer
> from kobert_tokenizer import KoBERTTokenizer
>
> tokenizer = KoBERTTokenizer(get_tokenizer())
> tokens = tokenizer.tokenize("한국어 문장")
> ```
>
> ## 미세 조정 예제
>
> `scripts/NSMC`에 네이버 영화 리뷰(NSMC) 감성 분류 노트북이 있습니다. 두 노트북 모두 데이터를 `wget`으로 `.cache`에 받아 학습합니다.
>
> - `naver_review_classifications_pytorch_kobert.ipynb`: PyTorch
> - `naver_review_classifications_gluon_kobert.ipynb`: MXNet Gluon
>
> ## 라이선스
>
> Apache License 2.0입니다. 자세한 내용은 \[LICENSE](LICENSE)를 참고하세요.

### 글빨 0.4.1 — ○ 근거 판정 통과

> # KoBERT
>
> KoBERT는 한국어 BERT 사전학습 모델(cased)입니다. 이 저장소는 모델 파일과 SentencePiece 어휘 파일을 내려받아 PyTorch, MXNet, ONNX Runtime에서 바로 쓸 수 있게 하는 `kobert` 패키지와, Hugging Face `transformers`용 토크나이저인 `kobert-tokenizer` 패키지를 담고 있습니다.
>
> ```python
> from kobert import get_pytorch_kobert_model
>
> model, vocab = get_pytorch_kobert_model()
> ```
>
> 처음 호출하면 모델과 어휘 파일을 현재 작업 디렉터리의 `.cache`에 내려받고, 이후에는 캐시를 씁니다.
>
> ## 모델 구성
>
> MXNet 구현(`kobert/mxnet_kobert.py`)에 적힌 설정은 다음과 같습니다.
>
> | 항목 | 값 |
> |---|---|
> | 레이어 수 | 12 |
> | 은닉 크기(`units`) | 768 |
> | 피드포워드 크기(`hidden_size`) | 3072 |
> | 어텐션 헤드 수 | 12 |
> | 최대 길이 | 512 |
> | 토큰 타입 수 | 2 |
>
> ## 설치
>
> ```bash
> pip install git+https://git@github.com/SKTBrain/KoBERT.git@master
> ```
>
> Python 3.6 이상이 필요합니다. 설치할 때 `requirements.txt`에 적힌 패키지가 모두 설치됩니다.
>
> | 패키지 | 버전 |
> |---|---|
> | boto3 | 1.15.18 이하 |
> | gluonnlp | 0.6.0 이상 0.10.0 이하 |
> | mxnet | 1.4.0 이상 1.7.0.post2 이하 |
> | onnxruntime | 1.8.0 |
> | sentencepiece | 0.1.6 이상 0.1.96 이하 |
> | torch | 1.7.0 이상 1.10.1 이하 |
> | transformers | 4.8.1 |
>
> `kobert/__init__.py`가 PyTorch, MXNet, ONNX 모듈을 모두 불러오므로 `import kobert`를 하려면 위 패키지가 모두 설치되어 있어야 합니다.
>
> ## 사용법
>
> 모델을 받는 함수는 모두 `cachedir`(기본값 `.cache`) 인자로 캐시 위치를 바꿀 수 있습니다. 내려받은 파일은 MD5 앞 10자리로 검사하며, 일치하지 않으면 `corrupted file!` 오류가 납니다. 파일은 `s3://skt-lsl-nlp-model` 버킷에서 받으므로 네트워크 연결이 필요합니다.
>
> ### PyTorch
>
> `get_pytorch_kobert_model(ctx="cpu", cachedir=".cache")`는 `(model, vocab)`을 반환합니다. `model`은 평가 모드(`eval()`)로 `ctx` 장치에 올라간 `transformers.BertModel`이고, `vocab`은 gluonnlp의 `BERTVocab`입니다.
>
> ```python
> import torch
> from kobert import get_pytorch_kobert_model
>
> input_ids = torch.LongTensor([[31, 51, 99], [15, 5, 0]])
> input_mask = torch.LongTensor([[1, 1, 1], [1, 1, 0]])
> token_type_ids = torch.LongTensor([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_pytorch_kobert_model()
> sequence_output, pooled_output = model(input_ids, input_mask, token_type_ids)
> ```
>
> ### MXNet
>
> `get_mxnet_kobert_model(use_pooler=True, use_decoder=True, use_classifier=True, ctx=mx.cpu(0), cachedir=".cache")`도 `(model, vocab)`을 반환합니다. `model`은 gluonnlp의 `BERTModel`입니다. 인자로 pooler, decoder, classifier 헤드를 쓸지 정합니다.
>
> ```python
> import mxnet as mx
> from kobert import get_mxnet_kobert_model
>
> input_id = mx.nd.array([[31, 51, 99], [15, 5, 0]])
> token_type_ids = mx.nd.array([[0, 0, 1], [0, 1, 0]])
>
> model, vocab = get_mxnet_kobert_model(use_decoder=False, use_classifier=False)
> encoder_layer, pooled_output = model(input_id, token_type_ids)
> ```
>
> ### ONNX
>
> `get_onnx_kobert_model(cachedir=".cache")`는 모델 객체가 아니라 내려받은 `.onnx` 파일의 경로를 반환합니다. 추론은 `onnxruntime`으로 직접 실행합니다. 모델의 입력 이름은 `input_ids`, `token_type_ids`, `input_mask`, `position_ids`입니다.
>
> ```python
> import numpy as np
> import onnxruntime
> from kobert import get_onnx_kobert_model
> from kobert.onnx_kobert import make_dummy_input
>
> onnx_path = get_onnx_kobert_model()
> input_ids, token_type_ids, input_mask, position_ids = make_dummy_input(max_seq_len=512)
>
> sess = onnxruntime.InferenceSession(onnx_path)
> outputs = sess.run(
>     None,
>     {
>         "input_ids": np.array(input_ids),
>         "token_type_ids": np.array(token_type_ids),
>         "input_mask": np.array(input_mask),
>         "position_ids": np.array(position_ids),
>     },
> )
> ```
>
> `make_dummy_input`은 문장 두 개를 `max_seq_len`까지 채운 동작 확인용 입력을 만듭니다.
>
> ### 토크나이저
>
> `get_tokenizer(cachedir=".cache")`는 SentencePiece 어휘 파일의 경로를 반환합니다. 모델과 함께 받은 `vocab`을 `gluonnlp`의 `BERTSPTokenizer`에 넘겨 토크나이저를 만듭니다.
>
> ```python
> import gluonnlp as nlp
> from kobert import get_pytorch_kobert_model, get_tokenizer
>
> model, vocab = get_pytorch_kobert_model()
> tok = nlp.data.BERTSPTokenizer(get_tokenizer(), vocab, lower=False)
> ```
>
> 문장을 모델 입력으로 바꾸는 전체 과정은 아래 예제 노트북에 있습니다.
>
> ## Hugging Face 토크나이저
>
> `kobert_hf` 디렉터리는 `kobert-tokenizer` 패키지입니다. `XLNetTokenizer`를 상속한 `KoBERTTokenizer`가 들어 있고, 입력을 `[CLS] 문장 [SEP]`(문장 쌍은 `[CLS] A [SEP] B [SEP]`) 형태로 만듭니다. 이 패키지는 `kobert` 패키지와 별개입니다.
>
> 이 패키지의 `setup.py`는 의존성을 자동으로 설치하지 않으므로 `kobert_hf/requirements.txt`를 먼저 설치합니다(`torch` 1.8.1 이상, `transformers` 4.8.2 이상, `sentencepiece` 0.1.91 이상).
>
> ```bash
> pip install -r kobert_hf/requirements.txt
> pip install ./kobert_hf
> ```
>
> `vocab_file`에 SentencePiece 어휘 파일 경로를 주어 만듭니다. 다음은 `kobert`의 `get_tokenizer()`로 받은 어휘 파일을 쓰는 예입니다.
>
> ```python
> from kobert import get_tokenizer
> from kobert_tokenizer import KoBERTTokenizer
>
> tokenizer = KoBERTTokenizer(vocab_file=get_tokenizer())
> tokens = tokenizer.tokenize("한국어 문장")
> ```
>
> ## 예제
>
> `scripts/NSMC`에 네이버 리뷰 분류 파인튜닝 노트북이 있습니다.
>
> - `naver_review_classifications_pytorch_kobert.ipynb`: PyTorch
> - `naver_review_classifications_gluon_kobert.ipynb`: MXNet(Gluon)
>
> ## 라이선스
>
> Apache License 2.0입니다. 자세한 내용은 \[LICENSE](LICENSE)를 참고하세요.
>
> 프로젝트 주소: https://github.com/SKTBrain/KoBERT

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.1 | 비교 안 함(근거 판정 실패) |
| 2 | 글빨 없음 vs 글빨 0.4.1 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.4.0 vs 글빨 0.4.1 | 글빨 0.4.0 우세 |
| 2 | 글빨 0.4.0 vs 글빨 0.4.1 | 순서를 바꾸면 판정이 바뀜 |

<details><summary>1회차 글빨 0.4.0 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.4.1) → 글빨 0.4.0 우세

X는 설치, 세 가지 프레임워크 사용법, 캐시, 제한 사항, 라이선스를 군더더기 없이 다루고, kobert와 kobert-tokenizer를 같은 환경에 설치할 수 없다는 중요한 점을 알려 준다. Y는 HF 토크나이저 설치법과 생성 예시가 더 친절하지만, 일반적인 BERT 설명과 requirements를 다시 옮긴 버전 표, 노트북 하이퍼파라미터처럼 독자에게 덜 필요한 내용으로 늘어났다. 또 두 패키지를 한 환경에서 함께 쓰는 예시를 보여 주면서 버전 충돌을 알리지 않았다. 이 결함이 Y의 장점보다 크다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

Y가 조금 더 낫다. Y는 반복과 일반론 없이 짧게 쓰면서도 GPU 사용법, 캐시 동작, 패키지 간 transformers 버전 충돌처럼 실제로 쓸 때 필요한 정보를 담았다. X는 패키지 표와 토크나이저 설치법이 있다는 장점이 있다. 하지만 일반적인 BERT 설명과 중복된 버전 표로 분량이 늘었다. 또 `kobert`와 `kobert_tokenizer`를 한 환경에서 함께 쓰는 예제를 보여 주는데, 각 패키지가 요구하는 버전(4.8.1 고정과 4.8.2 이상)과 맞지 않는다. Y도 kobert-tokenizer 설치 방법을 빠뜨렸고 MXNet 설정 문장의 위치가 어색하지만, 전체적으로 그대로 올리기에는 Y가 낫다.

</details>

<details><summary>2회차 글빨 0.4.0 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.4.1) → 글빨 0.4.1 우세

X가 더 간결하고 내부 구현 정보도 적어서 절제 면에서는 X가 낫습니다. 하지만 이 글을 그대로 올렸을 때 독자에게 실제로 도움이 되는 정보는 Y가 더 많이 담고 있습니다. Y는 맨 앞에서 바로 따라 할 수 있는 첫 사용 예를 보여 줍니다. 또 `import kobert`를 하려면 의존 패키지가 모두 설치되어 있어야 한다는 점, 네트워크 연결이 필요하다는 점, `kobert-tokenizer`의 의존성은 자동으로 설치되지 않는다는 점처럼 독자가 실제로 걸려 넘어질 수 있는 부분을 짚어 줍니다. 버전 표도 Y 쪽이 읽기 쉽습니다. 차이가 크지는 않지만 찾기 쉬움과 실용성에서 Y가 앞서므로 Y를 고릅니다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 0.4.0) → 차이 없음

X는 빠른 시작 예제와 HF 패키지 설치 주의라는 실용적인 장점이 있지만, 내부 구현 설명과 표 때문에 글이 무겁다. Y는 패키지를 구분한 표와 이어지는 토크나이저 예제로 읽기 좋고 분량도 절제되어 있다. 그러나 requirements를 그대로 옮긴 어색한 버전 목록과 ONNX 버전 반복이 있고, HF 패키지 의존성 주의가 빠졌다. 기준별로 우열이 엇갈려 어느 쪽도 분명히 낫지 않다.

</details>

