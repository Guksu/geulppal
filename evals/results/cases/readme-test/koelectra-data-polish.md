# `koelectra-data-polish`

[← 사람이 쓴 README: 확인용 목록](README.md) · 수정 · README · 한국어

## 요청

> README 모델 설명 부분이야. 자연스럽게 다듬어 줘.

## 원문

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`, 즉 generator에서 나온 token을 보고 discriminator에서 "real" token인지 "fake" token인지 판별하는 방법으로 학습을 합니다. 이 방법은 모든 input token에 대해 학습할 수 있다는 장점을 가지며, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습하였고, 이를 통해 나온 `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포하게 되었습니다.
>
> 또한 KoELECTRA는 **Wordpiece 사용**, **모델 s3 업로드** 등을 통해 OS 상관없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용 가능하게 만드는 것**이었고, 이에 Sentencepiece, Mecab을 사용하지 않고 원 논문과 코드에서 사용한 `Wordpiece`를 사용하였습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`의 경우 **약 14G Corpus** (2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`의 경우 **약 20G의 모두의 말뭉치**를 추가적으로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small` 모델의 경우 원 논문에서의 `ELECTRA-Small++`와 **동일한 옵션**을 사용하였습니다.
>
>   - 이는 공식 ELECTRA에서 배포한 Small 모델과 설정이 동일합니다.
>   - 또한 `KoELECTRA-Base`와는 달리, Generator와 Discriminator의 모델 사이즈(=`generator_hidden_size`)가 동일합니다.
>
> - `Batch size`와 `Train steps`을 제외하고는 **원 논문의 Hyperparameter와 동일**하게 가져갔습니다.
>
>   - 다른 hyperparameter를 변경하여 돌려봤지만 원 논문과 동일하게 가져간 것이 성능이 가장 좋았습니다.
>
> - **TPU v3-8**을 이용하여 학습하였고, GCP에서의 TPU 사용법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리하였습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**남아야 할 것**

- ELECTRA는 Replaced Token Detection으로 학습하며, 모든 input token에 대해 학습할 수 있고 BERT 등과 비교해 더 좋은 성능을 보였다는 설명(ELECTRA에 대한 설명)
- KoELECTRA는 34GB의 한국어 텍스트로 학습해 Base와 Small 두 모델을 배포했다는 점
- Wordpiece 사용과 모델 s3 업로드로 OS 상관없이 Transformers만 설치하면 바로 쓸 수 있다는 점
- Transformers만으로 바로 쓰게 하는 것이 가장 큰 목적이어서 Sentencepiece·Mecab 대신 Wordpiece를 썼다는 점과 문서 링크
- 어휘 표: v1·v2 32200, v3 35000, do_lower_case 모두 False
- 데이터: v1·v2는 약 14G 코퍼스(2.6B tokens, 뉴스·위키·나무위키), v3는 약 20G의 모두의 말뭉치를 추가(신문·문어·구어·메신저·웹)
- 사전학습 표의 모든 값(Batch Size, Train Steps, LR, Max Seq Len, Generator Size, Train Time)
- Small은 원 논문의 ELECTRA-Small++와 같은 옵션이고 공식 Small과 설정이 같으며, Base와 달리 Generator와 Discriminator 크기가 같다는 점
- Batch size와 Train steps를 빼면 원 논문 하이퍼파라미터와 같고, 다른 값도 시도했지만 원 논문 값이 가장 좋았다는 점
- TPU v3-8로 학습했고 TPU 사용법 문서 링크

**있으면 안 되는 변경**

- ELECTRA 논문의 결과(BERT보다 좋은 성능)를 KoELECTRA의 측정 결과처럼 쓰기
- v1·v2와 v3의 데이터 구성을 섞거나 34GB를 다른 버전에 붙이기
- 표의 수치를 바꾸거나 빼기
- 원문에 없는 기능·수치·지원 범위·사용 경험·평가 추가
- 코드 블록·명령·패키지 이름·설정값·링크 대상 바꾸기

**글자 그대로 남아야 할 문자열**: `https://openreview.net/pdf?id=r1xMH1BtvB`, `./docs/wordpiece_vocab.md`, `./docs/tpu_training.md`, `ELECTRA-Small++`, `generator_hidden_size`

**메모**: ChatGPT 공개(2022-11-30) 전에 사람이 쓴 오픈소스 README의 발췌다. 필요한 곳만 고치고 기술 표기, 수치와 측정 조건, 한계와 고지, 작성자의 판단 표시를 유지하는지 본다.

</details>

## 1회차

### 글빨 없음 — ○ 의미 보존 통과

> 아래는 다듬은 버전입니다. 내용과 구조는 그대로 두고, 어색한 표현과 반복되는 어미를 정리했습니다.
>
> ---
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습합니다. Generator가 만들어 낸 token을 Discriminator가 "real" token인지 "fake" token인지 판별하는 방법입니다. 이 방법은 모든 input token을 학습에 활용할 수 있다는 장점이 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했으며, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> 또한 **Wordpiece**를 사용하고 **모델을 s3에 업로드**해 두었기 때문에, OS에 상관없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 **`Transformers` 라이브러리만으로 모델을 바로 사용할 수 있게 하는 것**이었습니다. 그래서 Sentencepiece와 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 채택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`에는 뉴스, 위키, 나무위키로 구성된 **약 14GB의 corpus**(2.6B tokens)를 사용했습니다.
> - `v3`에는 여기에 **모두의 말뭉치 약 20GB**(신문, 문어, 구어, 메신저, 웹)를 추가로 사용했습니다.
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 설정**으로 학습했습니다.
>
>   - 이 설정은 공식 ELECTRA가 배포한 Small 모델과도 같습니다.
>   - `KoELECTRA-Base`와 달리, Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 나머지 hyperparameter는 **원 논문과 동일하게** 설정했습니다.
>
>   - 다른 값으로도 실험해 봤지만, 원 논문의 설정이 가장 좋은 성능을 보였습니다.
>
> - 학습에는 **TPU v3-8**을 사용했습니다. GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었습니다.
>
> ---
>
> 주요 수정 사항은 다음과 같습니다.
> - 첫 문단의 "generator에서 나온 token을 보고 discriminator에서…"는 주체를 분명히 해서 "Generator가 만들어 낸 token을 Discriminator가 판별하는"으로 바꿨습니다.
> - "배포하게 되었습니다", "사용하였습니다" 같은 표현은 "배포합니다", "사용했습니다"로 간결하게 정리했습니다.
> - "Wordpiece 사용, 모델 s3 업로드 등을 통해"는 원인과 결과가 드러나도록 풀어 썼습니다.
> - "14G", "20G"는 단위를 `GB`로 통일했습니다.
> - "가져갔습니다"는 "설정했습니다"로 바꿨습니다.
>
> 한 가지 확인이 필요한 부분이 있습니다. 원문의 "Generator Size" 열은 Base가 0.33, Small이 1.0으로 되어 있습니다. 이 값은 Discriminator 대비 Generator hidden size의 비율로 보이는데, 맞다면 표 아래에 한 줄 설명을 덧붙이는 것도 좋겠습니다.

### 글빨 0.2.1 — ○ 의미 보존 통과

> ```markdown
> [ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`으로 학습합니다. generator가 만든 token을 discriminator가 "real" token인지 "fake" token인지 판별하는 방식입니다. 모든 input token으로 학습할 수 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포했습니다.
>
> 또한 **Wordpiece**를 사용하고 **모델을 s3에 업로드**해 두어서, OS와 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece, Mecab 대신 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`는 **약 14G Corpus** (2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`는 여기에 **약 20G의 모두의 말뭉치**를 더해 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 옵션**으로 학습했습니다.
>
>   - 공식 ELECTRA가 배포한 Small 모델과 설정이 같습니다.
>   - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(=`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 hyperparameter는 **원 논문과 동일**합니다.
>
>   - 다른 hyperparameter로도 학습해 봤지만, 원 논문과 같은 설정의 성능이 가장 좋았습니다.
>
> - **TPU v3-8**로 학습했고, GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했습니다.
> ```

### 글빨 0.3.0 — ○ 의미 보존 통과

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습합니다. generator가 만든 token을 discriminator가 "real"인지 "fake"인지 판별하는 방식입니다. 모든 input token으로 학습할 수 있다는 장점이 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> 또한 **Wordpiece를 사용**하고 **모델을 s3에 업로드**해서, OS와 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece와 Mecab을 쓰지 않고, 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`는 **약 14G Corpus** (2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`는 여기에 **약 20G의 모두의 말뭉치**를 추가로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **같은 옵션**을 사용했습니다.
>
>   - 공식 ELECTRA가 배포한 Small 모델과도 설정이 같습니다.
>   - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 사이즈(=`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 나머지는 **원 논문의 Hyperparameter를 그대로** 따랐습니다.
>
>   - 다른 hyperparameter로도 학습해 봤지만, 원 논문과 같은 값일 때 성능이 가장 좋았습니다.
>
> - 학습에는 **TPU v3-8**을 사용했습니다. GCP에서 TPU를 쓰는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했습니다.

### 0.3.1 후보 — ○ 의미 보존 통과

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`, 즉 generator가 만든 token을 보고 discriminator가 "real" token인지 "fake" token인지 판별하는 방법으로 학습합니다. 모든 input token을 학습에 쓸 수 있다는 장점이 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했고, 그 결과로 나온 `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> 또한 **Wordpiece 사용**, **모델 s3 업로드** 등을 통해 OS와 관계없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece, Mecab 대신 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`는 **약 14G Corpus**(2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`는 여기에 **약 20G의 모두의 말뭉치**를 추가로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 옵션**을 사용했습니다.
>
>   - 공식 ELECTRA가 배포한 Small 모델과 설정이 같습니다.
>   - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 사이즈(=`generator_hidden_size`)가 동일합니다.
>
> - `Batch size`와 `Train steps`를 제외한 hyperparameter는 **원 논문과 동일**하게 가져갔습니다.
>
>   - 다른 hyperparameter로 바꿔 돌려봤지만, 원 논문과 같게 설정했을 때 성능이 가장 좋았습니다.
>
> - **TPU v3-8**로 학습했고, GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했습니다.

### 사람 원문 — ○ 의미 보존 통과

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`, 즉 generator에서 나온 token을 보고 discriminator에서 "real" token인지 "fake" token인지 판별하는 방법으로 학습을 합니다. 이 방법은 모든 input token에 대해 학습할 수 있다는 장점을 가지며, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습하였고, 이를 통해 나온 `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포하게 되었습니다.
>
> 또한 KoELECTRA는 **Wordpiece 사용**, **모델 s3 업로드** 등을 통해 OS 상관없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용 가능하게 만드는 것**이었고, 이에 Sentencepiece, Mecab을 사용하지 않고 원 논문과 코드에서 사용한 `Wordpiece`를 사용하였습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`의 경우 **약 14G Corpus** (2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`의 경우 **약 20G의 모두의 말뭉치**를 추가적으로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small` 모델의 경우 원 논문에서의 `ELECTRA-Small++`와 **동일한 옵션**을 사용하였습니다.
>
>   - 이는 공식 ELECTRA에서 배포한 Small 모델과 설정이 동일합니다.
>   - 또한 `KoELECTRA-Base`와는 달리, Generator와 Discriminator의 모델 사이즈(=`generator_hidden_size`)가 동일합니다.
>
> - `Batch size`와 `Train steps`을 제외하고는 **원 논문의 Hyperparameter와 동일**하게 가져갔습니다.
>
>   - 다른 hyperparameter를 변경하여 돌려봤지만 원 논문과 동일하게 가져간 것이 성능이 가장 좋았습니다.
>
> - **TPU v3-8**을 이용하여 학습하였고, GCP에서의 TPU 사용법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리하였습니다.

## 2회차

### 글빨 없음 — ○ 의미 보존 통과

> 아래는 다듬은 버전입니다. 내용과 마크다운 구조는 그대로 두고 문장만 손봤습니다.
>
> ---
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습합니다. generator가 만들어 낸 token을 discriminator가 "real" token인지 "fake" token인지 판별하는 방식입니다. 이 방법은 모든 input token을 학습에 활용할 수 있다는 장점이 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했고, 그 결과물인 `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 공개합니다.
>
> 또한 KoELECTRA는 **Wordpiece를 사용**하고 **모델을 s3에 업로드**해 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 설치하면 모델을 바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece와 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`는 **약 14GB의 corpus**(2.6B tokens)로 학습했습니다. (뉴스, 위키, 나무위키)
> - `v3`는 여기에 **약 20GB의 모두의 말뭉치**를 추가로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 설정**을 사용했습니다.
>
>   - 이는 공식 ELECTRA에서 배포한 Small 모델의 설정과도 같습니다.
>   - 또한 `KoELECTRA-Base`와 달리, Generator와 Discriminator의 모델 크기(=`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 나머지 hyperparameter는 **원 논문과 동일하게** 설정했습니다.
>
>   - 다른 hyperparameter로도 실험해 봤지만, 원 논문 설정이 가장 좋은 성능을 보였습니다.
>
> - 학습에는 **TPU v3-8**을 사용했습니다. GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었습니다.
>
> ---
>
> 주요 변경점은 다음과 같습니다.
> - 수동 표현을 능동으로 바꿨습니다. "generator에서 나온 token을 보고…"는 "generator가 만들어 낸 token을 discriminator가…"로, "배포하게 되었습니다"는 "공개합니다"로 고쳤습니다.
> - 어색한 조사와 명사형 나열을 풀었습니다. "OS 상관없이"는 "OS에 관계없이"로, "Wordpiece 사용, 모델 s3 업로드 등을 통해"는 "Wordpiece를 사용하고 … 업로드해 두었기 때문에"로 바꿨습니다.
> - 표기를 통일했습니다. "14G"와 "20G"는 "14GB"와 "20GB"로, "Train steps을"은 "Train steps를"로 고쳤습니다.
> - 문장이 길게 늘어지는 곳은 나눴습니다. Vocabulary 첫 항목이 그런 경우입니다.
>
> "공개합니다"와 "공개했습니다" 중 어느 쪽이 나은지는 README 전체의 어투에 맞춰 고르시면 됩니다.

### 글빨 0.2.1 — ○ 의미 보존 통과

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`으로 학습합니다. generator에서 나온 token을 보고 discriminator가 "real" token인지 "fake" token인지 판별하는 방식입니다. 이 방법은 모든 input token으로 학습할 수 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포했습니다.
>
> 또한 **Wordpiece 사용**, **모델 s3 업로드** 등을 통해 OS에 관계없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece, Mecab 대신 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`는 **약 14G Corpus** (2.6B tokens)로 학습했습니다. (뉴스, 위키, 나무위키)
> - `v3`는 여기에 **약 20G의 모두의 말뭉치**를 추가로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 옵션**으로 학습했습니다.
>
>   - 공식 ELECTRA에서 배포한 Small 모델과 설정이 같습니다.
>   - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(=`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 Hyperparameter는 **원 논문과 동일**합니다.
>
>   - 다른 hyperparameter로도 학습해 봤지만, 원 논문과 같은 값일 때 성능이 가장 좋았습니다.
>
> - **TPU v3-8**로 학습했고, GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했습니다.

### 글빨 0.3.0 — ○ 의미 보존 통과

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습합니다. generator가 만든 token을 discriminator가 "real" token인지 "fake" token인지 판별하는 방식입니다. 모든 input token으로 학습할 수 있다는 장점이 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포했습니다.
>
> 또한 **Wordpiece를 사용**하고 **모델을 s3에 업로드**해 두었기 때문에, OS와 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece, Mecab 대신 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`에는 **약 14G Corpus** (2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`에는 여기에 **약 20G의 모두의 말뭉치**를 추가로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 옵션**을 사용했습니다.
>
>   - 공식 ELECTRA에서 배포한 Small 모델과 설정이 같습니다.
>   - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(=`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 hyperparameter는 **원 논문과 동일하게** 설정했습니다.
>
>   - 다른 hyperparameter로도 학습해 봤지만, 원 논문과 같게 둔 설정의 성능이 가장 좋았습니다.
>
> - 학습에는 **TPU v3-8**을 사용했습니다. GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했습니다.

### 0.3.1 후보 — ○ 의미 보존 통과

> ```markdown
> [ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`, 즉 generator가 만든 token을 discriminator가 "real" token인지 "fake" token인지 판별하는 방식으로 학습합니다. 이 방식은 모든 input token으로 학습할 수 있다는 장점이 있고, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습했으며, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> 또한 **Wordpiece**를 사용하고 **모델을 s3에 업로드**했기 때문에, OS와 상관없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용할 수 있게 만드는 것**이었습니다. 그래서 Sentencepiece와 Mecab 대신 원 논문과 코드에서 사용한 `Wordpiece`를 사용했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`는 **약 14G Corpus**(2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`는 여기에 **약 20G의 모두의 말뭉치**를 추가로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 옵션**으로 학습했습니다.
>
>   - 공식 ELECTRA에서 배포한 Small 모델과도 설정이 같습니다.
>   - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 사이즈(=`generator_hidden_size`)가 같습니다.
>
> - `Batch size`와 `Train steps`를 제외한 나머지는 **원 논문의 Hyperparameter와 동일**하게 가져갔습니다.
>
>   - 다른 hyperparameter로도 학습해 봤지만, 원 논문과 동일하게 가져간 경우의 성능이 가장 좋았습니다.
>
> - 학습에는 **TPU v3-8**을 사용했습니다. GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했습니다.
> ```
>
> 원문에 없는 내용은 넣지 않았습니다. 링크, 표, 수치는 그대로입니다.

### 사람 원문 — ○ 의미 보존 통과

> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`, 즉 generator에서 나온 token을 보고 discriminator에서 "real" token인지 "fake" token인지 판별하는 방법으로 학습을 합니다. 이 방법은 모든 input token에 대해 학습할 수 있다는 장점을 가지며, BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> KoELECTRA는 **34GB의 한국어 text**로 학습하였고, 이를 통해 나온 `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포하게 되었습니다.
>
> 또한 KoELECTRA는 **Wordpiece 사용**, **모델 s3 업로드** 등을 통해 OS 상관없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ### Vocabulary
>
> - 이번 프로젝트의 가장 큰 목적은 **Transformers 라이브러리만 있으면 모델을 곧바로 사용 가능하게 만드는 것**이었고, 이에 Sentencepiece, Mecab을 사용하지 않고 원 논문과 코드에서 사용한 `Wordpiece`를 사용하였습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md) 참고
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ### Data
>
> - `v1`, `v2`의 경우 **약 14G Corpus** (2.6B tokens)를 사용했습니다. (뉴스, 위키, 나무위키)
> - `v3`의 경우 **약 20G의 모두의 말뭉치**를 추가적으로 사용했습니다. (신문, 문어, 구어, 메신저, 웹)
>
> ### Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> - `KoELECTRA-Small` 모델의 경우 원 논문에서의 `ELECTRA-Small++`와 **동일한 옵션**을 사용하였습니다.
>
>   - 이는 공식 ELECTRA에서 배포한 Small 모델과 설정이 동일합니다.
>   - 또한 `KoELECTRA-Base`와는 달리, Generator와 Discriminator의 모델 사이즈(=`generator_hidden_size`)가 동일합니다.
>
> - `Batch size`와 `Train steps`을 제외하고는 **원 논문의 Hyperparameter와 동일**하게 가져갔습니다.
>
>   - 다른 hyperparameter를 변경하여 돌려봤지만 원 논문과 동일하게 가져간 것이 성능이 가장 좋았습니다.
>
> - **TPU v3-8**을 이용하여 학습하였고, GCP에서의 TPU 사용법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리하였습니다.

## 품질 비교

두 결과가 모두 의미 보존을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.3.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 없음 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 1 | 글빨 0.2.1 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 2 | 글빨 0.2.1 vs 글빨 0.3.0 | 순서를 바꾸면 판정이 바뀜 |
| 1 | 사람 원문 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 2 | 사람 원문 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 1 | 글빨 0.3.0 vs 0.3.1 후보 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 0.3.0 vs 0.3.1 후보 | 순서를 바꾸면 판정이 바뀜 |

<details><summary>1회차 글빨 없음 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.3.0) → 차이 없음

본문만 보면 두 결과 모두 원문을 자연스럽게 다듬었고 품질 차이가 작아 우열을 가리기 어렵습니다. X는 Data 항목을 매끄럽게 읽히도록 고쳐 흐름이 조금 낫습니다. 다만 요청하지 않은 앞뒤 설명을 붙였고 단위도 바꿨습니다. Y는 손을 덜 댄 덕분에 바로 쓸 수 있지만, 원문의 어색한 괄호 배치를 일부 그대로 남겼습니다. 기준별로 장단점이 엇갈려 동률로 판정합니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 없음) → 글빨 0.3.0 우세

두 결과의 본문 품질은 거의 비슷합니다. 둘 다 첫 문단의 긴 문장을 자연스럽게 나눴고, 문체를 '-했습니다'로 통일했으며, 원문의 구조와 표를 그대로 지켰습니다. 차이는 본문 밖에서 생깁니다. Y는 요청하지 않은 머리말과 수정 사항 목록, Generator Size에 관한 제안을 붙였습니다. 그래서 README 일부를 다듬어 달라는 요청에 바로 붙여 넣을 수 있는 결과물이 되지 못했고, 같은 내용을 다시 설명하는 반복도 생겼습니다. X는 필요한 만큼만 고친 본문을 그대로 내놓아 요청에 더 잘 맞습니다.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

문장을 다듬은 수준은 비슷합니다. X는 실험 결과 문장 한 곳이 조금 더 매끄럽습니다. 반면 Y는 원문의 간결한 README 말투와 시제를 유지했고, 수정한 본문만 내놓아 바로 쓸 수 있습니다. X는 요청하지 않은 안내문과 변경점 목록을 덧붙였고, "공개합니다"로 시제를 바꾼 뒤 그 선택을 사용자에게 넘겼습니다. 표기를 바꾸고 높임을 더한 것도 필요 이상의 수정입니다. 차이는 크지 않지만, 덜 바꾸고 바로 쓸 수 있다는 점에서 Y가 조금 낫습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 없음) → 글빨 0.3.0 우세

본문을 다듬은 수준은 비슷하다. 두 결과 모두 첫 문단을 두 문장으로 나눴고, 명사형 나열을 풀었으며, 조사와 문장 끝을 자연스럽게 고쳤다. 차이는 본문 밖에서 생긴다. Y는 요청하지 않은 머리말과 변경점 해설을 붙여서 README에 바로 넣기가 번거롭다. 또 \"공개합니다\"처럼 시제를 바꾸고 나서 그 선택을 사용자에게 다시 묻는다. X는 같은 품질의 본문을 더 절제해서 전달하므로 조금 낫다.

</details>

<details><summary>1회차 글빨 0.2.1 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.2.1, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

두 결과 모두 원문의 어색한 번역투('학습을 합니다', '배포하게 되었습니다')를 비슷한 수준으로 매끄럽게 다듬었습니다. 문장 단위의 품질 차이는 크지 않습니다. 다만 Y가 조금 낫다고 봤습니다. 첫째, X는 결과 전체를 ```markdown 코드 펜스로 감싸서 README에 바로 붙여 넣기 불편합니다. 둘째, X는 '장점을 가지며'를 '학습할 수 있고'로 줄이면서 이것이 장점이라는 원문의 의미가 약해졌습니다. Y는 원문의 프레이밍과 형식을 더 충실히 지켰습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.2.1) → 글빨 0.3.0 우세

문장을 다듬은 수준은 둘이 거의 같습니다. 그런데 Y는 전체를 ```markdown 코드 펜스로 감싸서 README에 그대로 붙이면 코드 블록으로 렌더링됩니다. 또 Y에서는 '장점'이라는 표현이 빠져 ELECTRA 설명의 논리 연결이 약해졌습니다. X는 원문 구조를 지키면서 자연스럽게 다듬었고, 바로 사용할 수 있는 형태입니다.

</details>

<details><summary>2회차 글빨 0.2.1 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.2.1, 결과 Y = 글빨 0.3.0) → 차이 없음

두 결과는 구조와 수정 범위가 거의 같고, 둘 다 원문의 번역투(\"~을 통해 나온\", \"~하게 되었습니다\")를 자연스럽게 다듬었습니다. Y는 s3 관련 문장을 인과 관계로 풀어 더 매끄럽게 만들었고 '장점'이라는 표현도 살렸습니다. 대신 \"같게 둔 설정의 성능\"이 조금 어색합니다. X는 hyperparameter 문장이 더 자연스럽지만 s3 관련 문장은 명사 나열에 가까운 형태로 남았습니다. 이렇게 장단점이 엇갈리고 차이도 작아서 어느 쪽이 분명히 낫다고 보기 어렵습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.2.1) → 글빨 0.3.0 우세

두 결과는 거의 같은 수준으로 다듬어져 있습니다. 차이는 원문에서 가장 어색했던 두 곳에서 납니다. 하나는 s3 업로드 문장이고, 다른 하나는 ELECTRA 설명에서 '방식'과 '방법'이 겹치는 부분입니다. X는 두 곳을 모두 자연스러운 서술형으로 고쳤습니다. Y는 원문을 더 많이 남겨 수정 폭은 작지만, 이 두 곳의 어색함도 그대로 남았습니다. 요청이 "자연스럽게 다듬어 줘"였으니 X가 조금 더 낫습니다.

</details>

<details><summary>1회차 사람 원문 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 사람 원문, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

X는 원문과 완전히 같아서 "자연스럽게 다듬어 줘"라는 요청을 수행하지 않았습니다. Y는 표, 링크, 수치는 그대로 두고 긴 문장을 나눴습니다. 또 "~하게 되었습니다" 같은 군더더기와 겹치는 주어를 정리했고, 어색한 조사("discriminator에서 ... 판별")를 바로잡았습니다. 그 결과 README 말투를 유지하면서도 훨씬 읽기 쉬워졌습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 사람 원문) → 글빨 0.3.0 우세

Y는 원문과 똑같아서 다듬어 달라는 요청을 수행하지 않았습니다. X는 README의 구조와 데이터를 그대로 유지했습니다. 그러면서 긴 문장을 나누고, \"배포하게 되었습니다\", \"동일하게 가져갔습니다\", \"이에\" 같은 어색한 표현을 자연스럽게 고쳤습니다. 원작자의 말투도 살렸으므로 X가 분명히 낫습니다.

</details>

<details><summary>2회차 사람 원문 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 사람 원문, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

X는 원문과 글자 하나까지 같아서 \"자연스럽게 다듬어 달라\"는 요청을 수행하지 않았습니다. Y는 원문의 구조, 수치, 링크, 말투를 지키면서 긴 문장을 나누고 명사 나열을 인과 관계 문장으로 풀었습니다. \"~하게 되었습니다\", \"가져갔습니다\" 같은 어색한 표현도 정리했습니다. 독자가 README를 읽기에 Y가 확실히 낫습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 사람 원문) → 글빨 0.3.0 우세

X가 낫습니다. Y는 원문과 똑같아서 \"자연스럽게 다듬어 줘\"라는 요청을 수행하지 않았습니다. X는 표와 링크, 목록 구조와 문체를 그대로 두고 문장만 손봤습니다. 긴 문장은 나누고, \"배포하게 되었습니다\"나 \"가져갔습니다\" 같은 어색한 표현은 고쳤고, 명사를 나열하던 구절은 인과가 드러나는 문장으로 풀었습니다. 수정 범위도 적당했고, 결과적으로 README 독자가 읽기 쉬워졌습니다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 0.3.1 후보: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 0.3.1 후보) → 글빨 0.3.0 우세

요청은 문장을 자연스럽게 다듬는 것이다. X는 원문에서 가장 어색했던 첫 문장의 '즉' 삽입 구조를 두 문장으로 풀었고, '동일하게 가져갔습니다' 같은 투박한 표현도 '그대로 따랐습니다'로 바꿔 읽기 흐름이 확실히 좋아졌다. Y는 덜 고친 만큼 원문에 충실하지만, 첫 문장의 긴 구조처럼 다듬을 필요가 있는 부분을 상당 부분 그대로 남겼다. 기준별 차이는 작은데, 흐름에서 X가 앞서므로 X를 조금 더 높게 평가한다.

**2번째 판정** (결과 X = 0.3.1 후보, 결과 Y = 글빨 0.3.0) → 차이 없음

둘 다 원문 구조를 지키며 어미와 조사를 자연스럽게 다듬었습니다. 결과 Y는 첫 문장 분리와 Wordpiece·s3 구절을 동사구로 바꾼 덕분에 흐름이 조금 더 매끄럽습니다. 다만 \"등\"을 빠뜨려 의미가 약간 좁아졌습니다. 결과 X는 수정을 절제하면서 의미를 온전히 보존했지만, 나열투가 일부 남았습니다. 장단점이 엇갈리고 차이가 작아서 어느 쪽도 분명히 우세하지 않습니다.

</details>

<details><summary>2회차 글빨 0.3.0 vs 0.3.1 후보: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 0.3.1 후보) → 글빨 0.3.0 우세

문장 다듬기 수준은 비슷하지만 X가 조금 낫습니다. X는 원문에서 가장 어색했던 \"동일하게 가져갔습니다\"를 \"동일하게 설정했습니다\"로 고쳐 문장이 더 자연스럽습니다. 또 요청하지 않은 코드 블록이나 메타 설명 없이 README에 바로 넣을 수 있는 본문만 내놓았습니다. Y는 원문 어휘를 더 많이 남겼지만, 어색한 표현이 그대로 있고 형식도 덧붙였습니다.

**2번째 판정** (결과 X = 0.3.1 후보, 결과 Y = 글빨 0.3.0) → 차이 없음

두 결과 모두 원문의 어색한 표현을 비슷한 수준으로 고쳤습니다. 예를 들어 "generator에서 나온 token을 보고 discriminator에서"를 "generator가 만든 token을 discriminator가"로, "Wordpiece 사용, 모델 s3 업로드 등을 통해"를 인과 관계가 드러나는 문장으로 바꿨습니다. 표, 링크, 구조도 똑같이 지켰습니다. 차이는 세 가지 정도입니다. Y는 첫 문장을 나누고 hyperparameter 문장을 조금 더 매끄럽게 다듬었습니다. X는 작성자 특유의 표현을 더 많이 남겼고, 결과를 코드 블록과 메모와 함께 냈습니다. 이 차이들은 모두 사소해서 어느 한쪽이 분명히 낫다고 보기 어렵습니다.

</details>

