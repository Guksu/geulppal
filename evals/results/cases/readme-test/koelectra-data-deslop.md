# `koelectra-data-deslop`

[← 사람이 쓴 README: 확인용 목록](README.md) · 수정 · README · 한국어

## 요청

> README를 AI로 정리했더니 과장된 표현이 많아. 담백하게 고쳐 줘.

## 원문

> # KoELECTRA: 한국어를 위한 더 효율적인 사전학습 언어 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection`이라는 독특한 방식으로 학습하는 모델입니다. generator가 만들어 낸 token을 discriminator가 보고, 각 token이 원래의 **"real"** token인지 generator가 바꿔 넣은 **"fake"** token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리, 이 방법은 **입력된 모든 token으로 학습**할 수 있습니다. 그 결과 BERT 등과 비교했을 때 더 뛰어난 성능을 보였습니다.
>
> **KoELECTRA**는 이 ELECTRA를 한국어에 맞게 학습한 모델입니다. **34GB에 달하는 한국어 text**로 학습했으며, 그 결과물로 `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> KoELECTRA는 사용하기 쉽다는 점도 특징입니다. **Wordpiece**를 사용하고 **모델을 s3에 업로드**해 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 곧바로 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 **`Transformers` 라이브러리만 있으면 누구나 모델을 곧바로 사용할 수 있게 만드는 것**이었습니다. 이를 위해 Sentencepiece나 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - **`v1`, `v2`**: **약 14G Corpus**(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - **`v3`**: 여기에 **약 20G의 모두의 말뭉치**를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 **동일한 옵션**으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 **원 논문의 Hyperparameter를 그대로** 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험해 보았지만, 원 논문과 같은 설정이 가장 좋은 성능을 보였습니다.
>
> ### 학습 환경
>
> 학습에는 **TPU v3-8**을 사용했습니다. GCP에서 TPU를 활용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었으니, 직접 사전학습을 해 보고 싶은 분들께 도움이 되길 바랍니다.

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

**메모**: 사람이 쓴 README를 다른 모델이 '더 전문적이고 매력적으로' 고친 글이다. 덧붙은 과장·반복·형식을 덜어내면서 기술 표기와 사실을 지키는지 본다.

</details>

## 1회차

### 글빨 없음 — ✗ 의미 보존 실패

> # KoELECTRA: 한국어 ELECTRA 사전학습 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만든 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 쓰는 방식과 달리, 입력된 모든 token을 학습에 사용할 수 있습니다. 원 논문에서는 이 방식으로 BERT 등보다 높은 성능을 얻었다고 보고했습니다.
>
> KoELECTRA는 ELECTRA를 한국어 데이터로 학습한 모델입니다. 34GB의 한국어 text로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> Wordpiece를 사용하고 모델을 s3에 올려 두었기 때문에, OS와 관계없이 `Transformers` 라이브러리만 설치하면 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이 프로젝트의 목표 중 하나는 `Transformers` 라이브러리만으로 모델을 사용할 수 있게 하는 것이었습니다. 그래서 Sentencepiece나 Mecab 대신 원 논문과 코드에서 쓴 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14GB 코퍼스(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 위 데이터에 약 20GB의 모두의 말뭉치를 추가했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 같은 옵션으로 학습했습니다.
>
> - 공식 ELECTRA에서 배포한 Small 모델과 같은 설정입니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 같습니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 따랐습니다.
>
> - 다른 hyperparameter로도 여러 번 실험했지만, 원 논문과 같은 설정의 성능이 가장 좋았습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었으니, 직접 사전학습을 해 보려는 분은 참고해 주세요.
>
> ---
>
> **주요 수정 사항**
> - 제목의 "더 효율적인"을 삭제했습니다. 근거를 README에서 확인할 수 없는 표현이라 뺐습니다.
> - "독특한", "뛰어난", "34GB에 달하는", "가장 큰 목표", "곧바로", "누구나", "사용하기 쉽다는 점도 특징" 같은 수식어를 삭제하거나 풀어 썼습니다.
> - 성능 비교 문장은 원 논문의 보고 내용임을 밝히는 형태로 바꿨습니다. 이 프로젝트가 직접 측정한 결과처럼 읽히지 않게 하려는 것입니다.
> - 강조용 볼드와 "그대로", "동일한" 같은 강조 표현을 줄였습니다.
> - "도움이 되길 바랍니다"는 "참고해 주세요"로 바꿨습니다.
> - 수치, 링크, 표는 원문 그대로 두었습니다. 다만 "14G"와 "20G"는 "GB"로 통일했습니다.

**의미 보존 실패 이유(판정 모델)**

- Vocabulary 절에서 원문의 '가장 큰 목표'를 '목표 중 하나'로 바꿨습니다. 프로젝트 목표의 우선순위가 달라졌고, Wordpiece를 고른 이유도 약해졌습니다.

### 글빨 0.2.1 — ○ 의미 보존 통과

> # KoELECTRA: 한국어를 위한 더 효율적인 사전학습 언어 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만들어 낸 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리, 이 방법은 입력된 모든 token으로 학습할 수 있습니다. 그 결과 BERT 등과 비교했을 때 더 나은 성능을 보였습니다.
>
> KoELECTRA는 이 ELECTRA를 한국어에 맞게 학습한 모델입니다. 34GB의 한국어 text로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 모델을 배포합니다.
>
> Wordpiece를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 `Transformers` 라이브러리만 있으면 누구나 모델을 바로 사용할 수 있게 만드는 것이었습니다. 이를 위해 Sentencepiece나 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14G Corpus(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 여기에 약 20G의 모두의 말뭉치를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 같은 옵션으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 그대로 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험해 보았지만, 원 논문과 같은 설정이 가장 좋은 성능을 보였습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 활용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었으니, 직접 사전학습을 해 보려는 분은 참고해 주세요.
>
> ---
>
> 확인할 부분이 두 곳 있습니다.
>
> - 제목의 "더 효율적인"과 "BERT 등과 비교했을 때 더 나은 성능"은 이 문서 안에 근거가 없습니다. 후자는 ELECTRA 논문의 결과일 가능성이 큽니다. 그렇다면 "논문에서 BERT 등보다 나은 성능을 보였다"로 출처를 밝히는 편이 정확합니다. 제목은 앵커와 외부 링크에 영향을 줄 수 있어 그대로 두었습니다.
> - 링크, 표, 코드 표기, 수치는 바꾸지 않았습니다.

### 글빨 0.3.0 — ○ 의미 보존 통과

> # KoELECTRA: 한국어 ELECTRA 사전학습 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만든 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리, 이 방법은 입력된 모든 token으로 학습할 수 있습니다. 그 결과 BERT 등과 비교했을 때 더 나은 성능을 보였습니다.
>
> **KoELECTRA**는 이 ELECTRA를 한국어에 맞게 학습한 모델입니다. 34GB의 한국어 text로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> Wordpiece를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 `Transformers` 라이브러리만 있으면 모델을 바로 사용할 수 있게 하는 것이었습니다. 이를 위해 Sentencepiece나 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14G Corpus(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 여기에 약 20G의 모두의 말뭉치를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 같은 옵션으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 그대로 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험해 보았지만, 원 논문과 같은 설정이 가장 좋은 성능을 보였습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 사용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었습니다. 직접 사전학습을 해 보려는 분은 참고해 주세요.
>
> ---
>
> 바꾼 곳과 확인할 점입니다.
>
> - 제목의 "더 효율적인"은 README 안에 근거가 없어서 뺐습니다. 원래 제목을 쓰려면 되돌리세요.
> - "BERT 등과 비교해 더 뛰어난 성능"은 "더 나은 성능"으로만 낮췄습니다. 이 주장이 ELECTRA 논문에서 온 것인지, KoELECTRA로 직접 비교한 것인지는 README만으로 알 수 없습니다. 근거를 밝혀 두는 편이 좋습니다.
> - 표, 링크, 버전별 수치는 그대로 두었습니다.

### 0.3.1 후보 — ○ 의미 보존 통과

> # KoELECTRA: 한국어를 위한 더 효율적인 사전학습 언어 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만든 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리 입력된 모든 token으로 학습할 수 있고, 그 결과 BERT 등과 비교했을 때 더 나은 성능을 보였습니다.
>
> KoELECTRA는 이 ELECTRA를 한국어로 학습한 모델입니다. 34GB의 한국어 text로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> Wordpiece를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 `Transformers` 라이브러리만 있으면 모델을 바로 사용할 수 있게 하는 것이었습니다. 그래서 Sentencepiece나 Mecab 대신 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14G Corpus(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 여기에 약 20G의 모두의 말뭉치를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 같은 옵션으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 그대로 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험했지만, 원 논문과 같은 설정이 가장 좋은 성능을 보였습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 쓰는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었으니, 직접 사전학습을 해 보려는 분께 도움이 되길 바랍니다.
>
> ---
>
> 확인이 필요한 부분이 두 가지 있습니다.
>
> - 제목의 "더 효율적인"은 근거가 문서에 없어서 그대로 두었습니다. 무엇보다 더 효율적인지 밝히거나 표현을 빼는 것이 좋겠습니다.
> - "BERT 등과 비교했을 때 더 나은 성능"은 ELECTRA 논문의 결과로 읽히는 문장입니다. KoELECTRA 자체의 비교 결과가 아니라면 이 점이 드러나게 쓰는 편이 정확합니다.

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

### 글빨 없음 — ✗ 의미 보존 실패

> # KoELECTRA: 한국어 ELECTRA 사전학습 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만든 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 쓰는 방식과 달리, 입력된 모든 token을 학습에 쓸 수 있습니다. 원 논문에서는 이 방식으로 BERT 등보다 높은 성능을 보고했습니다.
>
> KoELECTRA는 ELECTRA를 한국어로 학습한 모델입니다. 34GB의 한국어 text로 학습했으며, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> Wordpiece를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이 프로젝트는 `Transformers` 라이브러리만으로 모델을 사용할 수 있게 하는 것을 목표로 했습니다. 이를 위해 Sentencepiece나 Mecab 대신 원 논문과 코드에서 쓴 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14GB 말뭉치(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성됩니다.
> - `v3`: 위 데이터에 모두의 말뭉치 약 20GB를 추가했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 같은 옵션으로 학습했습니다.
>
> - 공식 ELECTRA에서 배포한 Small 모델과 같은 설정입니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 같습니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외하면 원 논문의 hyperparameter를 그대로 사용했습니다.
>
> - 다른 hyperparameter로도 여러 번 실험했으나, 원 논문과 같은 설정의 성능이 가장 좋았습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 쓰는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리했으니, 직접 사전학습을 하려는 분들은 참고해 주세요.
>
> ---
>
> **주요 변경 사항**
> - 제목에서 "더 효율적인"을 뺐습니다. 본문에 근거가 없는 표현입니다.
> - "독특한", "뛰어난", "달하는", "곧바로" 같은 수식어와 불필요한 **굵은 글씨**를 걷어냈습니다.
> - "더 뛰어난 성능을 보였습니다"는 "원 논문에서는 … 보고했습니다"로 바꿨습니다. KoELECTRA 자체의 결과가 아니라 논문의 결과라서 출처를 밝혔습니다.
> - "사용하기 쉽다는 점도 특징" 같은 자평 문장은 사실 위주로 줄였습니다.
>
> 원 논문 설정이 가장 좋았다는 문장은 사실 주장이라 그대로 두었습니다. 근거가 없다면 이 문장도 빼는 편이 좋겠습니다.

**의미 보존 실패 이유(판정 모델)**

- Vocabulary 절에서 원문의 '이번 프로젝트의 가장 큰 목표'가 '목표로 했습니다'로 약해졌습니다. Wordpiece를 고른 근거인 최우선 목표라는 의미가 사라졌으므로 보존 항목이 distorted이고 status_certainty도 problem입니다.

### 글빨 0.2.1 — ○ 의미 보존 통과

> # KoELECTRA: 한국어 ELECTRA 사전학습 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만들어 낸 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리 입력된 모든 token으로 학습할 수 있고, ELECTRA 논문은 이 방식이 BERT 등보다 나은 성능을 보였다고 보고했습니다.
>
> KoELECTRA는 이 ELECTRA를 한국어로 학습한 모델입니다. 34GB의 한국어 text로 학습했고, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> Wordpiece를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이 프로젝트의 가장 큰 목표는 `Transformers` 라이브러리만으로 모델을 사용할 수 있게 하는 것이었습니다. 그래서 Sentencepiece나 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고하세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14G Corpus(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 여기에 약 20G의 모두의 말뭉치를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 동일한 옵션으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 그대로 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험해 보았지만, 원 논문과 같은 설정의 성능이 가장 좋았습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 쓰는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었으니, 직접 사전학습을 해 보려는 분은 참고하세요.
>
> ---
>
> 바꾼 곳 중 확인할 것이 두 가지 있습니다.
>
> - 제목의 "더 효율적인"은 이 문서에 근거가 없어 뺐습니다. 이 README를 가리키는 내부 앵커가 있다면 함께 확인해 주세요.
> - BERT보다 낫다는 문장은 이 프로젝트의 측정이 아닌 ELECTRA 논문의 보고로 읽혀서 "논문은 ~보고했습니다"로 귀속했습니다. KoELECTRA 자체의 비교 결과를 뜻한 것이라면 해당 수치와 조건을 알려 주세요.

### 글빨 0.3.0 — ○ 의미 보존 통과

> # KoELECTRA: 한국어를 위한 더 효율적인 사전학습 언어 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만들어 낸 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리, 이 방법은 입력된 모든 token으로 학습할 수 있습니다. 그 결과 BERT 등과 비교했을 때 더 높은 성능을 보였습니다.
>
> KoELECTRA는 이 ELECTRA를 한국어에 맞게 학습한 모델입니다. 34GB의 한국어 text로 학습했으며, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> `Wordpiece`를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 바로 쓸 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 `Transformers` 라이브러리만 있으면 누구나 모델을 바로 사용할 수 있게 만드는 것이었습니다. 이를 위해 Sentencepiece나 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14G Corpus(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 여기에 약 20G의 모두의 말뭉치를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 같은 옵션으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 그대로 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험해 보았지만, 원 논문과 같은 설정이 가장 좋은 성능을 보였습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 활용하는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었으니, 직접 사전학습을 해 보고 싶은 분들께 도움이 되길 바랍니다.
>
> ---
>
> 확인이 필요한 부분이 두 가지 있습니다. 원문에 근거가 없어 그대로 두었습니다.
>
> - 제목의 "더 효율적인"은 무엇과 비교한 것인지 문서에 나오지 않습니다.
> - "BERT 등과 비교했을 때 더 높은 성능"은 ELECTRA 논문의 결과로 보이는데, 수치나 비교 조건이 없습니다.

### 0.3.1 후보 — ○ 의미 보존 통과

> # KoELECTRA: 한국어를 위한 ELECTRA 사전학습 모델
>
> ## 들어가며
>
> \[ELECTRA](https://openreview.net/pdf?id=r1xMH1BtvB)는 `Replaced Token Detection` 방식으로 학습하는 모델입니다. generator가 만들어 낸 token을 discriminator가 보고, 각 token이 원래의 "real" token인지 generator가 바꿔 넣은 "fake" token인지 판별합니다. 일부 token만 학습에 활용하는 방식과 달리, 이 방법은 입력된 모든 token으로 학습할 수 있습니다. 그 결과 BERT 등과 비교했을 때 더 좋은 성능을 보였습니다.
>
> **KoELECTRA**는 이 ELECTRA를 한국어에 맞게 학습한 모델입니다. 34GB의 한국어 text로 학습했으며, `KoELECTRA-Base`와 `KoELECTRA-Small` 두 가지 모델을 배포합니다.
>
> `Wordpiece`를 사용하고 모델을 s3에 올려 두었기 때문에, OS에 관계없이 `Transformers` 라이브러리만 설치하면 바로 사용할 수 있습니다.
>
> ---
>
> ## Vocabulary
>
> - 이번 프로젝트의 가장 큰 목표는 `Transformers` 라이브러리만 있으면 누구나 모델을 바로 사용할 수 있게 만드는 것이었습니다. 이를 위해 Sentencepiece나 Mecab 대신, 원 논문과 코드에서 사용한 `Wordpiece`를 선택했습니다.
> - 자세한 내용은 [[Wordpiece Vocabulary]](./docs/wordpiece_vocab.md)를 참고해 주세요.
>
> |     | Vocab Len | do_lower_case |
> | --- | --------: | ------------: |
> | v1  |     32200 |         False |
> | v2  |     32200 |         False |
> | v3  |     35000 |         False |
>
> ---
>
> ## Data
>
> 학습에 사용한 데이터는 버전별로 다음과 같습니다.
>
> - `v1`, `v2`: 약 14G Corpus(2.6B tokens)를 사용했습니다. 뉴스, 위키, 나무위키로 구성되어 있습니다.
> - `v3`: 여기에 약 20G의 모두의 말뭉치를 추가로 사용했습니다. 신문, 문어, 구어, 메신저, 웹 데이터를 포함합니다.
>
> ---
>
> ## Pretraining Details
>
> | Model        | Batch Size | Train Steps |   LR | Max Seq Len | Generator Size | Train Time |
> | :----------- | ---------: | ----------: | ---: | ----------: | -------------: | ---------: |
> | `Base v1,2`  |        256 |        700K | 2e-4 |         512 |           0.33 |         7d |
> | `Base v3`    |        256 |        1.5M | 2e-4 |         512 |           0.33 |        14d |
> | `Small v1,2` |        512 |        300K | 5e-4 |         512 |            1.0 |         3d |
> | `Small v3`   |        512 |        800K | 5e-4 |         512 |            1.0 |         7d |
>
> ### Small 모델 구성
>
> `KoELECTRA-Small`은 원 논문의 `ELECTRA-Small++`와 동일한 옵션으로 학습했습니다.
>
> - 이 설정은 공식 ELECTRA에서 배포한 Small 모델과 같습니다.
> - `KoELECTRA-Base`와 달리 Generator와 Discriminator의 모델 크기(`generator_hidden_size`)가 동일합니다.
>
> ### Hyperparameter
>
> `Batch size`와 `Train steps`를 제외한 나머지는 원 논문의 Hyperparameter를 그대로 따랐습니다.
>
> - 다른 hyperparameter로도 여러 차례 실험해 보았지만, 원 논문과 같은 설정이 가장 좋은 성능을 보였습니다.
>
> ### 학습 환경
>
> 학습에는 TPU v3-8을 사용했습니다. GCP에서 TPU를 쓰는 방법은 [[Using TPU for Pretraining]](./docs/tpu_training.md)에 정리해 두었습니다. 직접 사전학습을 해 보려는 분은 참고해 주세요.
>
> ---
>
> 확인할 부분:
> - 제목의 "더 효율적인"은 문서 안에 근거가 없어 뺐습니다. 효율성을 비교한 자료가 있다면 그 범위에 맞춰 다시 넣을 수 있습니다.
> - "BERT 등과 비교했을 때 더 좋은 성능"은 원문 주장을 그대로 남겼습니다. 이 문서에서는 근거를 확인할 수 없으니, ELECTRA 논문의 결과인지 KoELECTRA 자체 평가인지 확인해 주세요.

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
| 1 | 글빨 없음 vs 글빨 0.3.0 | 비교 안 함(의미 보존 실패) |
| 2 | 글빨 없음 vs 글빨 0.3.0 | 비교 안 함(의미 보존 실패) |
| 1 | 글빨 0.2.1 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 2 | 글빨 0.2.1 vs 글빨 0.3.0 | 글빨 0.2.1 우세 |
| 1 | 사람 원문 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 2 | 사람 원문 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 1 | 글빨 0.3.0 vs 0.3.1 후보 | 글빨 0.3.0 우세 |
| 2 | 글빨 0.3.0 vs 0.3.1 후보 | 순서를 바꾸면 판정이 바뀜 |

<details><summary>1회차 글빨 0.2.1 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.2.1, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

본문 수정은 두 결과가 거의 같습니다. 차이는 제목에 있습니다. 사용자는 과장된 표현을 담백하게 고쳐 달라고 했는데, 근거 없는 비교 주장인 \"더 효율적인\"은 문서에서 가장 눈에 띄는 과장입니다. Y는 이 표현을 실제로 고치고 무엇을 바꿨는지와 되돌리는 방법을 함께 적었습니다. X는 이 표현을 남겨 둔 채 지적만 했습니다. X 쪽이 손을 덜 댄 장점은 있습니다. 그래도 요청을 더 직접 충족한 쪽은 Y여서 Y가 약간 우세하다고 판단합니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.2.1) → 글빨 0.3.0 우세

요청은 과장을 걷어 내는 것이다. 근거 없는 수식어 가운데 가장 눈에 띄는 것은 제목의 "더 효율적인"이다. X는 이를 빼고 "원래 제목을 쓰려면 되돌리세요"라고 되돌릴 방법도 남겼다. Y는 근거가 없다고 스스로 지적하면서도, 설득력이 약한 앵커 문제를 이유로 제목을 그대로 두었다. 본문은 두 결과가 거의 같다. 그래서 요청을 더 충실히 반영한 X가 조금 낫다. Y가 덜 고친 점과 출처 표기를 구체적으로 제안한 점은 장점이지만, 핵심 과장을 남긴 단점을 넘지는 못한다.

</details>

<details><summary>2회차 글빨 0.2.1 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.2.1, 결과 Y = 글빨 0.3.0) → 글빨 0.2.1 우세

X가 더 낫습니다. 요청의 핵심은 과장된 표현을 담백하게 고치는 것입니다. X는 제목의 근거 없는 \"더 효율적인\"을 빼고, BERT보다 낫다는 주장을 ELECTRA 논문의 보고로 출처를 밝혔으며, 홍보하는 듯한 문장도 정리했습니다. 고친 이유도 끝에 따로 설명했습니다. Y는 말투를 더 잘 지켰지만, 가장 눈에 띄는 과장 두 곳(제목, BERT 비교)을 문제라고 지적만 하고 그대로 두었습니다. 그래서 요청을 절반만 처리한 셈입니다. X가 마지막 문장의 어미를 바꿔 말투가 약간 건조해진 점은 감점 요인이지만, 핵심 요청을 처리한 정도의 차이가 더 큽니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.2.1) → 글빨 0.2.1 우세

요청은 과장된 표현을 담백하게 고쳐 달라는 것입니다. X는 꾸밈말과 볼드를 걷어 냈지만 가장 두드러진 과장인 제목의 "더 효율적인"과 BERT 비교 문장은 손대지 않았습니다. 대신 끝에 확인 사항으로만 남겨 작업을 사용자에게 다시 넘겼습니다. Y는 이 두 곳을 실제로 고쳤습니다. 제목에서 근거 없는 수식어를 뺐고, BERT 비교는 논문의 보고라고 출처를 밝혔습니다. 또 내부 앵커를 확인해 달라고 하고, KoELECTRA 자체의 비교 결과를 뜻한 것이라면 수치와 조건을 알려 달라고 해서 사용자가 판단할 정보를 줬습니다. Y는 필요 이상으로 문장을 손보고 말투를 약간 건조하게 바꿨지만, 요청의 핵심을 더 충실히 해냈기 때문에 Y가 낫습니다.

</details>

<details><summary>1회차 사람 원문 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 사람 원문, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

Y는 원문의 구조와 정중한 말투를 그대로 두고, 근거 없는 과장만 골라 담백하게 고쳤습니다. 손본 표현은 \"더 효율적인\", \"독특한\", \"에 달하는\", \"더 뛰어난\"과 과한 굵은 글씨입니다. X는 과장을 줄이기는 했지만 문서 제목과 'KoELECTRA는 … 한국어에 맞게 학습한 모델' 정의 문장을 빠뜨렸습니다. 요청하지 않은 제목 단계 변경과 불릿 통합 때문에 찾아보기도 어려워졌고, 말투도 원문보다 가벼워졌습니다. Y 끝에 붙은 변경 메모는 약간 덧붙인 것이지만 본문과 분리돼 있고, 근거 확인이 필요한 곳을 짚어 주어 쓸모가 있습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 사람 원문) → 글빨 0.3.0 우세

X는 '독특한', '에 달하는', '누구나', 굵은 글씨 같은 과장 요소만 정확히 덜어 냈습니다. 원문의 구조, 소제목, 문체는 그대로 지켜서 '담백하게'라는 요청을 제대로 따랐습니다. 근거가 불확실한 'BERT 대비 성능' 주장도 짚어 줍니다. Y도 과장 표현을 어느 정도 줄였지만 제목과 소제목을 없애는 등 구조를 크게 바꿨습니다. 이 때문에 정보를 찾기 어려워졌고, 굵은 강조는 여전히 남아 있으며, 메모체가 섞여 문장 흐름도 고르지 않습니다.

</details>

<details><summary>2회차 사람 원문 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 사람 원문, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

두 결과 모두 '독특한', '에 달하는' 같은 과장을 덜어냈다. Y는 원문의 구조와 문장을 유지하면서 과장만 줄였다. X는 제목과 KoELECTRA 정의 문장을 지우고 소제목을 불릿으로 합치는 등 요청하지 않은 구조 변경을 했고, 말투도 '가져갔습니다', '돌려봤지만'처럼 메모체로 바뀌었다. Y의 단점은 끝에 붙인 검토 메모 정도로, X의 손실보다 작다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 사람 원문) → 글빨 0.3.0 우세

X가 더 낫습니다. X는 원문의 구조와 제목을 그대로 두고 과장된 수식어('독특한', '에 달하는', '더 뛰어난')와 굵은 강조만 걷어 내서 요청에 정확히 맞습니다. Y도 일부 과장 표현은 없앴지만 굵은 강조가 남아 있습니다. 게다가 제목과 소제목을 없애고 섹션을 합쳐 문서 구조를 크게 바꿨고, 문장도 투박해졌습니다. X 끝에 붙은 메모는 README 본문에 섞이면 안 되는 내용이라 흠이지만, Y의 구조 손실보다는 작은 문제입니다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 0.3.1 후보: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 0.3.1 후보) → 글빨 0.3.0 우세

본문의 과장 표현 정리는 두 결과가 거의 같다. 가장 눈에 띄는 과장은 제목의 "더 효율적인"이다. X는 이를 빼고 되돌릴 방법을 남겼다. Y는 근거가 없다고 지적하면서도 그대로 두어, 담백하게 고쳐 달라는 요청이 제목에서는 완결되지 않았다. Y는 원문 말투("도움이 되길 바랍니다")를 더 잘 살렸지만, "한국어에 맞게"를 "한국어로"로 바꿔 뜻이 조금 약해졌다. 요청을 실제로 들어준 정도에서 X가 근소하게 앞선다.

**2번째 판정** (결과 X = 0.3.1 후보, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

본문은 두 결과가 거의 같고, 가장 큰 차이는 제목입니다. 제목은 가장 먼저 보이는 과장 표현입니다. Y는 제목의 근거 없는 '더 효율적인'을 빼고 그 사실을 알렸고, X는 그대로 두고 확인만 요청했습니다. 담백하게 고쳐 달라는 요청에는 Y가 더 직접적으로 응했습니다. X는 원문의 말투('도움이 되길 바랍니다')와 표현을 조금 더 지켰지만, 그 차이는 제목 차이보다 작다고 봤습니다.

</details>

<details><summary>2회차 글빨 0.3.0 vs 0.3.1 후보: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 0.3.1 후보) → 차이 없음

두 결과는 과장된 부분을 같은 방식으로 정리했다. 차이는 두 가지다. 첫째, Y는 제목의 "더 효율적인"을 뺐고 X는 남긴 채 확인할 점으로 표시했다. 둘째, Y는 마지막 문장의 "도움이 되길 바랍니다"를 "참고해 주세요"로 바꿨다. Y는 요청을 더 철저히 따랐고 확인 메모도 더 쓸모 있다("ELECTRA 논문의 결과인지 KoELECTRA 자체 평가인지"). X는 원문 말투를 지키고 불필요한 수정을 피했다. 기준별 우열이 엇갈리고 차이가 작아 어느 쪽도 분명히 낫지 않다.

**2번째 판정** (결과 X = 0.3.1 후보, 결과 Y = 글빨 0.3.0) → 0.3.1 후보 우세

본문을 담백하게 다듬은 정도는 두 결과가 거의 같습니다. 가장 큰 차이는 제목입니다. 과장을 덜어 달라는 요청이었는데, 근거 없는 비교 표현 \"더 효율적인\"이 독자가 가장 먼저 보는 제목에 들어 있습니다. X는 이 표현을 빼고 메모로 되돌릴 방법까지 안내했습니다. Y는 그대로 두었는데, 메모에 적은 \"원문에 근거가 없어 그대로 두었습니다\"는 앞뒤가 잘 맞지 않는 설명입니다. Y는 마지막 문단을 건드리지 않아 손댄 범위가 더 작다는 장점이 있지만, 요청의 핵심을 해결한 쪽은 X입니다.

</details>

