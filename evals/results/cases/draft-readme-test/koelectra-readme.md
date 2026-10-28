# `koelectra-readme`

[← README 초안 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> KoELECTRA 저장소의 README를 써 줘. 사전학습 관련 내용은 코드에 없어서 아래 메모로 줄게.

## 메모

> - ELECTRA: Replaced Token Detection으로 학습. generator가 만든 token을 discriminator가 real/fake로 판별. 모든 input token에 대해 학습할 수 있고, 논문에서 BERT 등보다 성능이 좋았음
> - KoELECTRA: 34GB 한국어 텍스트로 학습. Base, Small 두 가지 배포. v1, v2, v3 있음
> - Wordpiece 사용, 모델은 Hugging Face에 올려 둠. Transformers만 설치하면 바로 사용(Transformers v2.8.0부터 ElectraModel 지원)
> - vocab: v1·v2 32200, v3 35000, do_lower_case 모두 False
> - 데이터: v1·v2 약 14G 코퍼스(2.6B tokens, 뉴스·위키·나무위키), v3는 약 20G 모두의 말뭉치 추가(신문·문어·구어·메신저·웹)
> - 사전학습: TPU v3-8
>   - Base v1,2: batch 256, 700K steps, lr 2e-4, max seq 512, generator size 0.33, 7일
>   - Base v3: batch 256, 1.5M steps, 나머지 같음, 14일
>   - Small v1,2: batch 512, 300K steps, lr 5e-4, max seq 512, generator size 1.0, 3일
>   - Small v3: batch 512, 800K steps, 나머지 같음, 7일
> - Small은 원 논문의 ELECTRA-Small++와 같은 옵션. batch size와 train steps 빼고 원 논문 하이퍼파라미터와 같음

작성 모델은 작업 폴더에서 `monologg/KoELECTRA` 커밋 `024fbdd`의 코드(`LICENSE`, `finetune`, `pretrain`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 메모의 데이터·어휘·사전학습 수치
- Transformers로 모델을 불러오는 사용 예
- 파인튜닝 스크립트로 평가하는 태스크

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ✗ 근거 판정 실패

> # KoELECTRA
>
> 34GB의 한국어 텍스트로 학습한 \[ELECTRA](https://github.com/google-research/electra) 모델입니다. Base와 Small 두 가지 크기로, v1·v2·v3 세 버전을 배포합니다. 모든 모델은 \[Hugging Face](https://huggingface.co/monologg)에서 받을 수 있습니다.
>
> 이 저장소에는 다음이 들어 있습니다.
>
> | 디렉토리 | 내용 |
> | --- | --- |
> | \[`pretrain/`](pretrain) | TensorFlow 1.x 기반 ELECTRA 사전학습 코드, vocab, 사전학습 config |
> | \[`finetune/`](finetune) | PyTorch + Transformers 기반 다운스트림 task 파인튜닝 코드와 task별 config |
>
> ## ELECTRA 소개
>
> ELECTRA는 **Replaced Token Detection**으로 학습합니다. generator가 마스킹된 자리에 token을 만들어 넣으면, discriminator가 input의 각 token이 원래 token(real)인지 generator가 바꿔 넣은 token(fake)인지 판별합니다.
>
> BERT의 Masked Language Model은 마스킹한 일부 token(보통 15%)에서만 학습 신호를 얻습니다. 반면 ELECTRA는 **모든 input token에 대해 학습**할 수 있습니다. 원 논문에서 BERT 등 기존 모델보다 좋은 성능을 보였습니다. 다운스트림 task에는 discriminator를 사용합니다.
>
> ## 모델
>
> | 모델 | Hugging Face ID |
> | --- | --- |
> | KoELECTRA-Base-v3 | `monologg/koelectra-base-v3-discriminator` |
> | KoELECTRA-Small-v3 | `monologg/koelectra-small-v3-discriminator` |
> | KoELECTRA-Base-v2 | `monologg/koelectra-base-v2-discriminator` |
> | KoELECTRA-Small-v2 | `monologg/koelectra-small-v2-discriminator` |
> | KoELECTRA-Base-v1 | `monologg/koelectra-base-discriminator` |
> | KoELECTRA-Small-v1 | `monologg/koelectra-small-discriminator` |
>
> ### 버전별 차이
>
> | | v1, v2 | v3 |
> | --- | --- | --- |
> | 학습 데이터 | 약 14GB 코퍼스 (2.6B tokens)<br>뉴스, 위키, 나무위키 | v1, v2 코퍼스에 약 20GB의 \[모두의 말뭉치](https://corpus.korean.go.kr/) 추가<br>신문, 문어, 구어, 메신저, 웹 |
> | vocab size | 32,200 | 35,000 |
> | `do_lower_case` | `False` | `False` |
>
> 토크나이저는 Wordpiece를 사용합니다. vocab 파일은 \[`pretrain/vocab.txt`](pretrain/vocab.txt)에 있습니다.
>
> ## 사용법
>
> Transformers만 설치하면 바로 사용할 수 있습니다. Transformers **v2.8.0부터** `ElectraModel`을 지원하므로 그 이상 버전이 필요합니다.
>
> ```python
> from transformers import ElectraModel, ElectraTokenizer
>
> model = ElectraModel.from_pretrained("monologg/koelectra-base-v3-discriminator")
> tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
> ```
>
> 다른 모델은 위 표의 ID로 바꿔 쓰면 됩니다. 이 저장소의 파인튜닝 코드는 `ElectraForSequenceClassification`, `ElectraForTokenClassification`, `ElectraForQuestionAnswering`을 사용합니다.
>
> ## 사전학습
>
> 사전학습은 TPU v3-8에서 진행했습니다. 모든 모델에 `max_seq_length`는 512, `do_lower_case`는 `False`를 썼습니다.
>
> | 모델 | batch size | train steps | learning rate | generator size | 학습 기간 |
> | --- | --- | --- | --- | --- | --- |
> | Base v1, v2 | 256 | 700K | 2e-4 | 0.33 | 7일 |
> | Base v3 | 256 | 1.5M | 2e-4 | 0.33 | 14일 |
> | Small v1, v2 | 512 | 300K | 5e-4 | 1.0 | 3일 |
> | Small v3 | 512 | 800K | 5e-4 | 1.0 | 7일 |
>
> - v3는 데이터가 늘어난 만큼 train steps를 늘렸고, 그 외 설정은 같습니다.
> - Small은 원 논문의 **ELECTRA-Small++** 와 같은 옵션입니다. batch size와 train steps를 제외한 하이퍼파라미터는 원 논문과 같습니다.
>
> ### 직접 사전학습하기
>
> \[`pretrain/`](pretrain)은 Google의 ELECTRA 코드를 바탕으로 합니다. TensorFlow 1.15가 필요합니다.
>
> ```bash
> cd pretrain
> pip3 install -r requirements.txt
> ```
>
> 1. 코퍼스(텍스트 파일)를 tfrecord로 변환합니다. 기본 `--max-seq-length`는 512입니다.
>
>    ```bash
>    python3 build_pretraining_dataset.py \
>      --corpus-dir <corpus_dir> \
>      --vocab-file vocab.txt \
>      --output-dir <data_dir>/pretrain_tfrecords \
>      --max-seq-length 512 \
>      --no-lower-case
>    ```
>
> 2. `config/`의 JSON을 `--hparams`로 넘겨 학습합니다. `<data_dir>`에는 `vocab.txt`와 `pretrain_tfrecords/`가 있어야 합니다. 체크포인트는 `<data_dir>/models/<model-name>`에 저장됩니다.
>
>    ```bash
>    # Base
>    python3 run_pretraining.py --data-dir <data_dir> --model-name koelectra-base --hparams config/base_config.json
>    # Small
>    python3 run_pretraining.py --data-dir <data_dir> --model-name koelectra-small --hparams config/small_config.json
>    ```
>
> \[`config/base_config.json`](pretrain/config/base_config.json)과 \[`config/small_config.json`](pretrain/config/small_config.json)에는 TPU 이름·zone이 들어 있습니다. 본인의 Cloud TPU에 맞게 `tpu_name`, `tpu_zone`을 수정하세요. 이 config의 `vocab_size`는 v1·v2 기준인 32200입니다. v3를 학습하려면 v3 vocab 파일을 쓰고 `vocab_size`를 35000으로 바꿔야 합니다.
>
> ## 파인튜닝
>
> \[`finetune/`](finetune)는 PyTorch와 Transformers 기반입니다. task와 모델별 설정은 `finetune/config/<task>/<model>.json`에 있습니다.
>
> ```bash
> cd finetune
> pip3 install -r requirements.txt   # torch==1.6.0, transformers==3.3.1, seqeval, fastprogress, attrdict
> ```
>
> ### 지원하는 task
>
> | task (`--task`) | 데이터셋 | 유형 | 실행 스크립트 |
> | --- | --- | --- | --- |
> | `nsmc` | \[NSMC](https://github.com/e9t/nsmc) | 감성 분류 | `run_seq_cls.py` |
> | `naver-ner` | \[Naver NER](https://github.com/naver/nlp-challenge) | 개체명 인식 | `run_ner.py` |
> | `paws` | \[PAWS-X (한국어 번역)](https://github.com/google-research-datasets/paws) | 문장 쌍 분류 | `run_seq_cls.py` |
> | `kornli` | \[KorNLI](https://github.com/kakaobrain/KorNLUDatasets) | 자연어 추론 | `run_seq_cls.py` |
> | `korsts` | \[KorSTS](https://github.com/kakaobrain/KorNLUDatasets) | 문장 유사도 (회귀) | `run_seq_cls.py` |
> | `question-pair` | \[Question Pair](https://github.com/songys/Question_pair) | 문장 쌍 분류 | `run_seq_cls.py` |
> | `hate-speech` | \[Korean Hate Speech](https://github.com/kocohub/korean-hate-speech) | 혐오 표현 분류 | `run_seq_cls.py` |
> | `korquad` | \[KorQuAD 1.0](https://korquad.github.io/KorQuad%201.0/) | 질의응답 | `run_squad.py` |
>
> ### 데이터 준비
>
> 데이터는 `data/<task>/` 아래에 둡니다. 파일 이름은 config에 지정된 이름과 같아야 합니다. 예를 들어 `nsmc`는 `data/nsmc/ratings_train.txt`와 `data/nsmc/ratings_test.txt`를 읽습니다. 전처리한 feature는 `data/` 아래에 `cached_*` 파일로 캐시됩니다.
>
> | task | train | dev | test |
> | --- | --- | --- | --- |
> | `nsmc` | `ratings_train.txt` | - | `ratings_test.txt` |
> | `naver-ner` | `train.tsv` | - | `test.tsv` |
> | `paws` | `translated_train.tsv` | `dev_2k.tsv` | `test_2k.tsv` |
> | `kornli` | `multinli.train.ko.tsv` | `xnli.dev.ko.tsv` | `xnli.test.ko.tsv` |
> | `korsts` | `sts-train.tsv` | `sts-dev.tsv` | `sts-test.tsv` |
> | `question-pair` | `train.tsv` | `dev.tsv` | `test.tsv` |
> | `hate-speech` | `train.tsv` | - | `val.tsv` |
> | `korquad` | `KorQuAD_v1.0_train.json` | `KorQuAD_v1.0_dev.json` (predict) | - |
>
> dev 파일이 없는 task는 test 파일로 평가합니다.
>
> ### 실행
>
> `--task`로 task를, `--config_file`로 모델 config를 지정합니다. 학습이 끝나면 체크포인트가 `ckpt/<output_dir>/`에 저장되고, `do_eval`이 켜져 있으면 평가 결과가 같은 디렉토리의 `eval_results.txt`에 기록됩니다.
>
> ```bash
> python3 run_seq_cls.py --task nsmc          --config_file koelectra-base-v3.json
> python3 run_seq_cls.py --task kornli        --config_file koelectra-small-v3.json
> python3 run_ner.py     --task naver-ner     --config_file koelectra-base-v3.json
> python3 run_squad.py   --task korquad       --config_file koelectra-base-v3.json
> ```
>
> config 파일 이름은 `koelectra-{base,small}[-v2|-v3].json` 형식입니다. 버전 접미사가 없는 파일이 v1입니다. 비교용으로 `kobert`, `distilkobert`, `hanbert`, `xlm-roberta` config도 함께 들어 있습니다. `hanbert`는 `HanBert-54kN-torch` 디렉토리를 별도로 준비해야 합니다.
>
> 평가 지표는 task마다 다릅니다.
>
> | task | 지표 |
> | --- | --- |
> | `nsmc`, `paws`, `kornli`, `question-pair` | accuracy |
> | `korsts` | Pearson / Spearman |
> | `naver-ner` | entity-level F1 (seqeval) |
> | `hate-speech` | macro F1 |
> | `korquad` | EM / F1 |
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)

**근거 판정 실패 이유(판정 모델)**

- 작업 폴더와 메모에 없는 외부 링크(google-research/electra, 모두의 말뭉치, 데이터셋 7개 URL)를 근거 없이 넣었음(link 종류 unsupported)

### 글빨 0.3.0 — ○ 근거 판정 통과

> # KoELECTRA
>
> KoELECTRA는 34GB의 한국어 텍스트로 학습한 ELECTRA 모델입니다. Base와 Small 두 크기를 v1, v2, v3 버전으로 배포합니다. 모델은 Hugging Face에 올려 두었고, Transformers만 설치하면 바로 쓸 수 있습니다.
>
> ## ELECTRA
>
> ELECTRA는 Replaced Token Detection(RTD)으로 학습합니다. generator가 입력의 일부 token을 다른 token으로 바꾸면, discriminator가 각 token이 원래 token(real)인지 바뀐 token(fake)인지 판별합니다. 일부 token만 예측하는 Masked Language Model과 달리 모든 input token으로 학습할 수 있습니다. 원 논문에서는 BERT 등보다 성능이 좋았습니다.
>
> ## 모델
>
> | 크기 | 버전 | Hugging Face 모델 |
> |---|---|---|
> | Base | v1 | `monologg/koelectra-base-discriminator` |
> | Base | v2 | `monologg/koelectra-base-v2-discriminator` |
> | Base | v3 | `monologg/koelectra-base-v3-discriminator` |
> | Small | v1 | `monologg/koelectra-small-discriminator` |
> | Small | v2 | `monologg/koelectra-small-v2-discriminator` |
> | Small | v3 | `monologg/koelectra-small-v3-discriminator` |
>
> 토크나이저는 Wordpiece를 쓰며 `do_lower_case`는 모든 버전에서 `False`입니다.
>
> | 버전 | vocab 크기 |
> |---|---|
> | v1, v2 | 32200 |
> | v3 | 35000 |
>
> ## 사용법
>
> Transformers v2.8.0부터 `ElectraModel`을 지원하므로 그 이상 버전을 설치하면 됩니다.
>
> ```python
> from transformers import ElectraModel, ElectraTokenizer
>
> tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
> model = ElectraModel.from_pretrained("monologg/koelectra-base-v3-discriminator")
> ```
>
> ## 사전학습
>
> 모든 모델은 TPU v3-8에서 학습했습니다.
>
> ### 데이터
>
> | 버전 | 데이터 |
> |---|---|
> | v1, v2 | 약 14G 코퍼스(2.6B tokens): 뉴스, 위키, 나무위키 |
> | v3 | v1, v2 데이터에 약 20G의 모두의 말뭉치 추가: 신문, 문어, 구어, 메신저, 웹 |
>
> ### 하이퍼파라미터
>
> | 크기 | 버전 | batch size | train steps | learning rate | max seq length | generator size | 학습 기간 |
> |---|---|---|---|---|---|---|---|
> | Base | v1, v2 | 256 | 700K | 2e-4 | 512 | 0.33 | 7일 |
> | Base | v3 | 256 | 1.5M | 2e-4 | 512 | 0.33 | 14일 |
> | Small | v1, v2 | 512 | 300K | 5e-4 | 512 | 1.0 | 3일 |
> | Small | v3 | 512 | 800K | 5e-4 | 512 | 1.0 | 7일 |
>
> Small은 원 논문의 ELECTRA-Small++와 같은 옵션으로 학습했습니다. batch size와 train steps를 제외한 하이퍼파라미터는 원 논문과 같습니다.
>
> ### 사전학습 코드
>
> `pretrain/`에는 TensorFlow 1.15 기반 사전학습 코드가 있습니다. 설정 파일은 `pretrain/config/base_config.json`과 `pretrain/config/small_config.json`이고, TPU 이름과 zone은 본인 환경에 맞게 고쳐야 합니다. 저장소의 `pretrain/vocab.txt`는 32200개 vocab(v1, v2)이며, v3 vocab(35000)은 포함하지 않았습니다.
>
> ```bash
> cd pretrain
> pip install -r requirements.txt
>
> # 1. 코퍼스를 tfrecord로 변환
> python3 build_pretraining_dataset.py \
>     --corpus-dir CORPUS_DIR \
>     --vocab-file vocab.txt \
>     --output-dir DATA_DIR/pretrain_tfrecords \
>     --max-seq-length 512 \
>     --no-lower-case
>
> # 2. 사전학습 (DATA_DIR에 vocab.txt가 있어야 합니다)
> python3 run_pretraining.py \
>     --data-dir DATA_DIR \
>     --model-name koelectra-base \
>     --hparams config/base_config.json
> ```
>
> ## 파인튜닝
>
> `finetune/`에는 PyTorch 기반 파인튜닝 코드가 있습니다. 같은 설정으로 KoBERT, DistilKoBERT, HanBERT, XLM-RoBERTa도 학습할 수 있도록 `finetune/config/`에 모델별 설정 파일을 두었습니다.
>
> | 태스크 (`--task`) | 스크립트 |
> |---|---|
> | `nsmc`, `kornli`, `paws`, `korsts`, `question-pair`, `hate-speech` | `run_seq_cls.py` |
> | `naver-ner` | `run_ner.py` |
> | `korquad` | `run_squad.py` |
>
> 데이터는 저장소에 없습니다. 설정 파일의 `data_dir`(기본값 `data`) 아래 `<태스크>/` 폴더에 설정 파일에 적힌 파일명으로 두세요. 예를 들어 `nsmc`는 `data/nsmc/ratings_train.txt`와 `data/nsmc/ratings_test.txt`를 읽습니다.
>
> ```bash
> cd finetune
> pip install -r requirements.txt   # torch==1.6.0, transformers==3.3.1 등
>
> python3 run_seq_cls.py --task nsmc --config_file koelectra-base-v3.json
> python3 run_ner.py --task naver-ner --config_file koelectra-base-v3.json
> python3 run_squad.py --task korquad --config_file koelectra-base-v3.json
> ```
>
> `--config_file`에는 `finetune/config/<태스크>/` 안의 파일 이름을 넣습니다. 모델은 파일 이름에 따라 `koelectra-base`, `koelectra-small`, `koelectra-base-v2`, `koelectra-small-v2`, `koelectra-base-v3`, `koelectra-small-v3`에서 고를 수 있습니다.
>
> ## 라이선스
>
> Apache License 2.0을 따릅니다. 자세한 내용은 \[LICENSE](LICENSE)를 참고하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # KoELECTRA
>
> KoELECTRA는 한국어 텍스트로 학습한 ELECTRA 모델입니다. Base와 Small 두 크기로 배포하며 v1, v2, v3 세 버전이 있습니다. 모델은 Hugging Face에 올려 두었고, Transformers만 설치하면 바로 쓸 수 있습니다.
>
> ELECTRA는 Replaced Token Detection으로 학습합니다. generator가 입력 토큰 일부를 다른 토큰으로 바꾸면 discriminator가 각 토큰이 원래 토큰(real)인지 바뀐 토큰(fake)인지 판별합니다. 마스킹된 토큰만 학습하는 방식과 달리 모든 입력 토큰으로 학습할 수 있습니다. ELECTRA 논문에서는 BERT 등보다 성능이 좋았습니다.
>
> ## 모델
>
> | 모델 | Hugging Face 이름 |
> |---|---|
> | KoELECTRA-Base | `monologg/koelectra-base-discriminator` |
> | KoELECTRA-Small | `monologg/koelectra-small-discriminator` |
> | KoELECTRA-Base-v2 | `monologg/koelectra-base-v2-discriminator` |
> | KoELECTRA-Small-v2 | `monologg/koelectra-small-v2-discriminator` |
> | KoELECTRA-Base-v3 | `monologg/koelectra-base-v3-discriminator` |
> | KoELECTRA-Small-v3 | `monologg/koelectra-small-v3-discriminator` |
>
> 이름에 버전이 없는 모델이 v1입니다.
>
> ## 사용법
>
> Transformers v2.8.0부터 `ElectraModel`을 지원하므로 그 이상 버전이 필요합니다.
>
> ```bash
> pip3 install transformers
> ```
>
> 아래 예시는 PyTorch를 사용합니다.
>
> ```python
> import torch
> from transformers import ElectraModel, ElectraTokenizer
>
> name = "monologg/koelectra-base-v3-discriminator"
> tokenizer = ElectraTokenizer.from_pretrained(name, do_lower_case=False)
> model = ElectraModel.from_pretrained(name)
>
> input_ids = torch.tensor([tokenizer.encode("한국어 ELECTRA 모델입니다.")])
> outputs = model(input_ids)
> ```
>
> 모든 버전이 `do_lower_case=False`로 학습되었으니 토크나이저에도 같은 값을 줍니다.
>
> ## 사전학습
>
> ### 토크나이저와 vocab
>
> Wordpiece를 사용합니다. vocab 크기는 v1·v2가 32200, v3가 35000이고, `do_lower_case`는 모두 False입니다.
>
> ### 데이터
>
> KoELECTRA는 34GB 한국어 텍스트로 학습했습니다.
>
> - v1·v2: 약 14G 코퍼스(2.6B tokens). 뉴스, 위키, 나무위키로 구성했습니다.
> - v3: v1·v2 코퍼스에 약 20G의 모두의 말뭉치를 더했습니다. 신문, 문어, 구어, 메신저, 웹 말뭉치입니다.
>
> ### 하이퍼파라미터
>
> TPU v3-8에서 학습했습니다. 표에 없는 항목은 같은 크기의 다른 버전과 같습니다.
>
> | | Base v1, v2 | Base v3 | Small v1, v2 | Small v3 |
> |---|---|---|---|---|
> | batch size | 256 | 256 | 512 | 512 |
> | train steps | 700K | 1.5M | 300K | 800K |
> | learning rate | 2e-4 | 2e-4 | 5e-4 | 5e-4 |
> | max sequence length | 512 | 512 | 512 | 512 |
> | generator size | 0.33 | 0.33 | 1.0 | 1.0 |
> | 학습 기간 | 7일 | 14일 | 3일 | 7일 |
>
> Small은 원 논문의 ELECTRA-Small++와 같은 옵션입니다. batch size와 train steps를 제외한 하이퍼파라미터는 원 논문과 같습니다.
>
> ### 학습 코드
>
> `pretrain/`에 사전학습 코드가 있습니다. TensorFlow 1.15.0이 필요합니다(`pretrain/requirements.txt`).
>
> ```bash
> cd pretrain
>
> # 텍스트 코퍼스를 tfrecord로 변환
> python build_pretraining_dataset.py \
>   --corpus-dir <코퍼스 디렉터리> \
>   --vocab-file vocab.txt \
>   --output-dir <data-dir>/pretrain_tfrecords \
>   --max-seq-length 512
>
> # 학습
> python run_pretraining.py \
>   --data-dir <data-dir> \
>   --model-name <모델 이름> \
>   --hparams config/base_config.json
> ```
>
> `run_pretraining.py`는 `<data-dir>/vocab.txt`와 `<data-dir>/pretrain_tfrecords/pretrain_data.tfrecord*`를 읽습니다. Small은 `config/small_config.json`을 씁니다. 두 설정 파일의 `tpu_name`과 `tpu_zone`은 본인의 TPU에 맞게 바꿔야 합니다.
>
> ## 파인튜닝
>
> `finetune/`에 KoELECTRA를 downstream task에 파인튜닝하는 코드가 있습니다. 다음 task를 지원합니다.
>
> | 스크립트 | task |
> |---|---|
> | `run_seq_cls.py` | `nsmc`, `paws`, `kornli`, `korsts`, `question-pair`, `hate-speech` |
> | `run_ner.py` | `naver-ner` |
> | `run_squad.py` | `korquad` |
>
> 설치와 실행은 `finetune/`에서 합니다.
>
> ```bash
> cd finetune
> pip3 install -r requirements.txt   # torch 1.6.0, transformers 3.3.1 등
>
> python3 run_seq_cls.py --task nsmc --config_file koelectra-base-v3.json
> ```
>
> `--config_file`에는 `config/<task>/` 아래의 파일 이름을 줍니다. 모델마다 파일이 하나씩 있고(`koelectra-base.json`, `koelectra-small-v2.json` 등) KoBERT, DistilKoBERT, HanBERT, XLM-RoBERTa용 설정도 같은 곳에 있습니다.
>
> 데이터는 저장소에 들어 있지 않습니다. `data/<task>/` 아래에 직접 두어야 하며, 파일 이름은 설정 파일의 `train_file`, `dev_file`, `test_file`(korquad는 `train_file`, `predict_file`)을 따릅니다. 예를 들어 nsmc는 `data/nsmc/ratings_train.txt`와 `data/nsmc/ratings_test.txt`입니다. 체크포인트와 평가 결과는 `ckpt/<output_dir>/`에 저장됩니다.
>
> ## 라이선스
>
> Apache License 2.0. 자세한 내용은 \[LICENSE](LICENSE)를 참고하세요.

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # KoELECTRA
>
> 한국어 텍스트로 사전학습한 \[ELECTRA](https://github.com/google-research/electra) 모델입니다. Base와 Small 두 가지 크기로, v1·v2·v3 세 버전을 배포합니다. 모델은 Hugging Face에 올려 두었고, 이 저장소에는 사전학습 코드(`pretrain/`)와 다운스트림 task 파인튜닝 코드(`finetune/`)가 들어 있습니다.
>
> ## ELECTRA 소개
>
> ELECTRA는 **Replaced Token Detection**으로 학습하는 모델입니다. 학습에는 두 모델을 씁니다.
>
> - **Generator**: 입력의 일부를 masking한 뒤, 그 자리를 그럴듯한 token으로 채웁니다.
> - **Discriminator**: 입력의 각 token이 원래 token(real)인지 generator가 바꿔 넣은 token(fake)인지 판별합니다.
>
> BERT의 Masked Language Model은 masking된 일부 token(약 15%)에서만 학습 신호를 얻습니다. ELECTRA의 discriminator는 **모든 input token**에 대해 학습할 수 있습니다. 논문에서는 이 점이 효율적이어서 BERT 등보다 성능이 좋았다고 보고합니다. 사전학습이 끝나면 downstream task에는 discriminator를 사용합니다.
>
> ## 모델
>
> | 모델 | 버전 | Hugging Face | vocab size |
> | --- | --- | --- | --- |
> | Base | v1 | `monologg/koelectra-base-discriminator` | 32200 |
> | Base | v2 | `monologg/koelectra-base-v2-discriminator` | 32200 |
> | Base | v3 | `monologg/koelectra-base-v3-discriminator` | 35000 |
> | Small | v1 | `monologg/koelectra-small-discriminator` | 32200 |
> | Small | v2 | `monologg/koelectra-small-v2-discriminator` | 32200 |
> | Small | v3 | `monologg/koelectra-small-v3-discriminator` | 35000 |
>
> - Tokenizer는 **Wordpiece**를 사용합니다.
> - 모든 버전에서 `do_lower_case=False`입니다.
>
> ## 사전학습 데이터
>
> | 버전 | 데이터 |
> | --- | --- |
> | v1, v2 | 약 14GB 코퍼스 (약 2.6B tokens). 뉴스, 위키, 나무위키 |
> | v3 | v1·v2 데이터에 약 20GB의 \[모두의 말뭉치](https://corpus.korean.go.kr/)를 추가. 신문, 문어, 구어, 메신저, 웹 |
>
> 두 데이터를 합쳐 총 34GB의 한국어 텍스트로 학습했습니다.
>
> ## 사전학습 설정
>
> 모든 모델을 TPU v3-8에서 학습했습니다.
>
> | 모델 | 버전 | Batch size | Train steps | Learning rate | Max seq length | Generator size | 학습 기간 |
> | --- | --- | --- | --- | --- | --- | --- | --- |
> | Base | v1, v2 | 256 | 700K | 2e-4 | 512 | 0.33 | 7일 |
> | Base | v3 | 256 | 1.5M | 2e-4 | 512 | 0.33 | 14일 |
> | Small | v1, v2 | 512 | 300K | 5e-4 | 512 | 1.0 | 3일 |
> | Small | v3 | 512 | 800K | 5e-4 | 512 | 1.0 | 7일 |
>
> Small 모델은 원 논문의 ELECTRA-Small++와 같은 옵션으로 학습했습니다. batch size와 train steps를 제외한 하이퍼파라미터는 원 논문과 같습니다.
>
> ## 사용법
>
> Transformers만 설치하면 바로 사용할 수 있습니다. `ElectraModel`은 Transformers v2.8.0부터 지원합니다.
>
> ```bash
> pip install transformers
> ```
>
> ```python
> from transformers import ElectraModel, ElectraTokenizer
>
> model = ElectraModel.from_pretrained("monologg/koelectra-base-v3-discriminator")
> tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
>
> inputs = tokenizer("한국어 ELECTRA를 공개합니다.", return_tensors="pt")
> outputs = model(**inputs)
> ```
>
> ## 저장소 구조
>
> ```
> .
> ├── pretrain/   # 사전학습 코드 (TensorFlow 1.15, 공식 ELECTRA 코드 기반)
> └── finetune/   # 다운스트림 task 파인튜닝 코드 (PyTorch, Transformers)
> ```
>
> ## 파인튜닝
>
> ### 환경
>
> ```bash
> cd finetune
> pip install -r requirements.txt   # torch==1.6.0, transformers==3.3.1, seqeval, fastprogress, attrdict
> ```
>
> ### 지원 task
>
> | Task | `--task` | 스크립트 | 유형 |
> | --- | --- | --- | --- |
> | NSMC | `nsmc` | `run_seq_cls.py` | 문장 분류 |
> | KorNLI | `kornli` | `run_seq_cls.py` | 문장 쌍 분류 (3 labels) |
> | PAWS (한국어 번역) | `paws` | `run_seq_cls.py` | 문장 쌍 분류 |
> | KorSTS | `korsts` | `run_seq_cls.py` | 문장 쌍 회귀 |
> | Question Pair | `question-pair` | `run_seq_cls.py` | 문장 쌍 분류 |
> | Hate Speech | `hate-speech` | `run_seq_cls.py` | 문장 분류 (3 labels) |
> | Naver NER | `naver-ner` | `run_ner.py` | 개체명 인식 |
> | KorQuAD 1.0 | `korquad` | `run_squad.py` | 질의응답 |
>
> ### 데이터 준비
>
> 데이터는 `data/<task>/` 아래에 둡니다. 파일 이름은 각 task의 config 파일(`train_file`, `dev_file`, `test_file`, `predict_file`)에서 지정합니다. 예를 들어 NSMC는 `data/nsmc/ratings_train.txt`, `data/nsmc/ratings_test.txt`를 사용합니다.
>
> ### 실행
>
> `config/<task>/<model>.json`에 모델과 하이퍼파라미터를 정의해 두었습니다. task와 config 파일 이름을 넘겨 실행합니다.
>
> ```bash
> python3 run_seq_cls.py --task nsmc --config_file koelectra-base-v3.json
> python3 run_ner.py     --task naver-ner --config_file koelectra-base-v3.json
> python3 run_squad.py   --task korquad --config_file koelectra-base-v3.json
> ```
>
> `--config_file`에 쓸 수 있는 모델은 다음과 같습니다.
>
> | 파일 이름 | 모델 |
> | --- | --- |
> | `koelectra-base.json`, `koelectra-base-v2.json`, `koelectra-base-v3.json` | KoELECTRA Base v1, v2, v3 |
> | `koelectra-small.json`, `koelectra-small-v2.json`, `koelectra-small-v3.json` | KoELECTRA Small v1, v2, v3 |
> | `kobert.json`, `distilkobert.json`, `hanbert.json`, `xlm-roberta.json` | 비교용 모델 |
>
> 학습한 checkpoint와 평가 결과는 config의 `ckpt_dir`과 `output_dir` 아래에 저장됩니다.
>
> ## 사전학습 코드
>
> `pretrain/`에는 직접 사전학습을 돌려 볼 수 있는 코드가 있습니다. \[google-research/electra](https://github.com/google-research/electra) 코드를 바탕으로 한국어 설정(vocab 32200, `do_lower_case=False`, `max_seq_length=512`)에 맞게 수정했습니다. TPU 사용을 기본값으로 가정합니다.
>
> ```bash
> cd pretrain
> pip install -r requirements.txt   # tensorflow==1.15.0
> ```
>
> 1. pretraining 데이터(tfrecord)를 만듭니다.
>
>    ```bash
>    python3 build_pretraining_dataset.py \
>      --corpus-dir <corpus 디렉터리> \
>      --vocab-file vocab.txt \
>      --output-dir <data-dir>/pretrain_tfrecords \
>      --max-seq-length 512
>    ```
>
> 2. `<data-dir>`에 `vocab.txt`와 `pretrain_tfrecords/`를 두고 사전학습을 실행합니다.
>
>    ```bash
>    python3 run_pretraining.py \
>      --data-dir <data-dir> \
>      --model-name koelectra-base \
>      --hparams config/base_config.json
>    ```
>
> `config/base_config.json`과 `config/small_config.json`에 TPU 이름, vocab size, train steps 등을 지정합니다. 위 설정표와 맞는지 확인한 뒤 TPU 이름과 zone을 본인 환경에 맞게 바꿔 쓰세요.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다.

**근거 판정 실패 이유(판정 모델)**

- 모두의 말뭉치 링크(https://corpus.korean.go.kr/)가 작업 폴더나 메모에 없다(unsupported link)
- google-research/electra GitHub 링크가 작업 폴더나 메모에 없다(unsupported link)
- 'BERT MLM은 약 15% token에서만 학습 신호를 얻는다'는 수치가 메모나 코드로 뒷받침되지 않는다(unsupported number)

### 글빨 0.3.0 — ✗ 근거 판정 실패

> # KoELECTRA
>
> KoELECTRA는 34GB의 한국어 텍스트로 학습한 ELECTRA 모델입니다. Base와 Small 두 가지 크기로 v1, v2, v3를 배포하고, 모델은 Hugging Face에 올려 두었습니다. Transformers만 설치하면 바로 쓸 수 있습니다.
>
> 이 저장소에는 사전학습 코드(`pretrain/`)와, 한국어 데이터셋으로 파인튜닝하는 코드(`finetune/`)가 있습니다.
>
> ## ELECTRA
>
> \[ELECTRA](https://arxiv.org/abs/2003.10555)는 Replaced Token Detection으로 학습합니다. generator가 만든 token을 discriminator가 진짜(real)인지 가짜(fake)인지 판별하는 방식입니다. 모든 input token으로 학습할 수 있고, 논문에서는 BERT 등보다 성능이 좋았습니다.
>
> ## 모델
>
> | 크기 | 버전 | Hugging Face 모델 ID |
> |---|---|---|
> | Base | v1 | `monologg/koelectra-base-discriminator` |
> | Base | v2 | `monologg/koelectra-base-v2-discriminator` |
> | Base | v3 | `monologg/koelectra-base-v3-discriminator` |
> | Small | v1 | `monologg/koelectra-small-discriminator` |
> | Small | v2 | `monologg/koelectra-small-v2-discriminator` |
> | Small | v3 | `monologg/koelectra-small-v3-discriminator` |
>
> - Wordpiece를 사용하고, `do_lower_case`는 모든 버전에서 `False`입니다.
> - vocab 크기는 v1·v2가 32,200, v3가 35,000입니다.
> - Transformers v2.8.0부터 `ElectraModel`을 지원하므로 그 이상의 버전이 필요합니다. 이 저장소의 파인튜닝 코드는 `transformers==3.3.1`로 작성했습니다.
>
> ## 사용법
>
> ```python
> from transformers import ElectraModel, ElectraTokenizer
>
> model = ElectraModel.from_pretrained("monologg/koelectra-base-v3-discriminator")
> tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
> ```
>
> 다른 모델은 위 표의 ID로 바꾸면 됩니다.
>
> ## 사전학습 정보
>
> ### 데이터
>
> | 버전 | 말뭉치 |
> |---|---|
> | v1·v2 | 약 14G (2.6B tokens). 뉴스, 위키, 나무위키 |
> | v3 | v1·v2 말뭉치에 모두의 말뭉치 약 20G 추가. 신문, 문어, 구어, 메신저, 웹 |
>
> ### 하이퍼파라미터
>
> 학습은 모두 TPU v3-8에서 했습니다. 그 밖의 설정은 표와 같습니다.
>
> | 모델 | batch size | train steps | learning rate | max seq length | generator size | 학습 기간 |
> |---|---|---|---|---|---|---|
> | Base v1·v2 | 256 | 700K | 2e-4 | 512 | 0.33 | 7일 |
> | Base v3 | 256 | 1.5M | 2e-4 | 512 | 0.33 | 14일 |
> | Small v1·v2 | 512 | 300K | 5e-4 | 512 | 1.0 | 3일 |
> | Small v3 | 512 | 800K | 5e-4 | 512 | 1.0 | 7일 |
>
> Small은 원 논문의 ELECTRA-Small++와 같은 옵션입니다. batch size와 train steps를 제외한 하이퍼파라미터는 원 논문과 같습니다.
>
> ## 파인튜닝
>
> `finetune/`에서 PyTorch로 파인튜닝합니다. 실행 환경은 `finetune/requirements.txt`에 있습니다(`torch==1.6.0`, `transformers==3.3.1` 등).
>
> ```bash
> cd finetune
> pip install -r requirements.txt
> ```
>
> 지원하는 태스크와 설정 파일 위치는 다음과 같습니다.
>
> | 종류 | 태스크(`--task`) | 실행 스크립트 |
> |---|---|---|
> | 문장 분류·회귀 | `nsmc`, `kornli`, `paws`, `korsts`, `question-pair`, `hate-speech` | `run_seq_cls.py` |
> | 개체명 인식 | `naver-ner` | `run_ner.py` |
> | 질의응답 | `korquad` | `run_squad.py` |
>
> 데이터셋은 저장소에 없습니다. 태스크별 설정 파일(`config/<task>/<model>.json`)의 `train_file`, `test_file` 등에 적힌 파일을 `data/<task>/` 아래에 두세요. 모델은 `config/<task>/` 안의 `koelectra-base-v3.json`처럼 모델 이름을 딴 파일로 고릅니다. 같은 폴더에서 KoBERT, DistilKoBERT, HanBERT, XLM-RoBERTa 설정도 볼 수 있습니다.
>
> ```bash
> python3 run_seq_cls.py --task nsmc --config_file koelectra-base-v3.json
> python3 run_ner.py --task naver-ner --config_file koelectra-base-v3.json
> python3 run_squad.py --task korquad --config_file koelectra-base-v3.json
> ```
>
> 학습한 체크포인트는 설정 파일의 `ckpt_dir`/`output_dir`(예: `ckpt/koelectra-base-v3-nsmc-ckpt`)에 저장됩니다.
>
> ## 사전학습 실행
>
> `pretrain/`은 Google Research의 ELECTRA 사전학습 코드를 바탕으로 합니다. TensorFlow 1.15.0이 필요하고(`pretrain/requirements.txt`), 위 모델은 TPU로 학습했습니다. `pretrain/vocab.txt`는 v1·v2의 32,200개 vocab입니다.
>
> 1. 텍스트 파일이 든 디렉터리를 tfrecord로 변환합니다.
>
>    ```bash
>    cd pretrain
>    python3 build_pretraining_dataset.py \
>      --corpus-dir <corpus_dir> \
>      --vocab-file vocab.txt \
>      --output-dir <data_dir>/pretrain_tfrecords \
>      --max-seq-length 512 \
>      --num-processes 4 \
>      --no-lower-case
>    ```
>
> 2. `<data_dir>/vocab.txt`에 vocab 파일을 두고 학습을 시작합니다. `config/base_config.json`과 `config/small_config.json`의 TPU 이름·zone 등은 본인 환경에 맞게 고치세요.
>
>    ```bash
>    python3 run_pretraining.py \
>      --data-dir <data_dir> \
>      --model-name koelectra-base \
>      --hparams config/base_config.json
>    ```
>
>    체크포인트는 `<data_dir>/models/<model-name>`에 저장됩니다.
>
> ## 라이선스
>
> Apache License 2.0입니다. 자세한 내용은 \[LICENSE](LICENSE)를 보세요.

**근거 판정 실패 이유(판정 모델)**

- ELECTRA 논문 링크(https://arxiv.org/abs/2003.10555)는 작업 폴더와 메모 어디에도 근거가 없다(link 종류의 unsupported 주장).

### 글빨 0.4.0 — ○ 근거 판정 통과

> # KoELECTRA
>
> KoELECTRA는 34GB 한국어 텍스트로 학습한 ELECTRA 모델입니다. Base와 Small 두 크기로 배포하며 버전은 v1, v2, v3가 있습니다. 모델은 Hugging Face에 올려 두었고, Transformers만 설치하면 바로 쓸 수 있습니다(`ElectraModel`은 Transformers v2.8.0부터 지원합니다).
>
> 이 저장소에는 모델을 내려받아 쓰는 방법과 함께 NSMC, KorQuAD 등에서 파인튜닝하는 코드(`finetune/`), 사전학습 코드(`pretrain/`)가 들어 있습니다.
>
> ## ELECTRA
>
> ELECTRA는 Replaced Token Detection으로 학습합니다. generator가 만든 token을 discriminator가 원래 token(real)인지 바뀐 token(fake)인지 판별하는 방식입니다. 모든 input token에 대해 학습할 수 있습니다. ELECTRA 논문에서는 이 방식으로 BERT 등보다 좋은 성능을 얻었다고 보고했습니다.
>
> ## 사용법
>
> ```python
> from transformers import ElectraModel, ElectraTokenizer
>
> model = ElectraModel.from_pretrained("monologg/koelectra-base-v3-discriminator")
> tokenizer = ElectraTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
>
> input_ids = tokenizer.encode("한국어 문장을 입력합니다.", return_tensors="pt")
> outputs = model(input_ids)
> ```
>
> 사용할 모델은 이름으로 고릅니다. 이 저장소의 파인튜닝 설정에서 쓰는 이름은 다음과 같습니다.
>
> | 버전 | Base | Small |
> |---|---|---|
> | v1 | `monologg/koelectra-base-discriminator` | `monologg/koelectra-small-discriminator` |
> | v2 | `monologg/koelectra-base-v2-discriminator` | `monologg/koelectra-small-v2-discriminator` |
> | v3 | `monologg/koelectra-base-v3-discriminator` | `monologg/koelectra-small-v3-discriminator` |
>
> ## 사전학습 내용
>
> 토크나이저는 Wordpiece를 쓰며, 모든 버전에서 `do_lower_case`는 False입니다.
>
> | 버전 | vocab 크기 | 학습 데이터 |
> |---|---|---|
> | v1, v2 | 32200 | 약 14G 코퍼스(2.6B tokens). 뉴스, 위키, 나무위키 |
> | v3 | 35000 | v1, v2 데이터에 약 20G의 모두의 말뭉치를 추가. 신문, 문어, 구어, 메신저, 웹 |
>
> 학습은 TPU v3-8에서 했습니다. v3는 v1, v2보다 step 수가 많고 학습 기간도 깁니다.
>
> | 모델 | batch size | train steps | learning rate | max seq length | generator size | 학습 기간 |
> |---|---|---|---|---|---|---|
> | Base v1, v2 | 256 | 700K | 2e-4 | 512 | 0.33 | 7일 |
> | Base v3 | 256 | 1.5M | 2e-4 | 512 | 0.33 | 14일 |
> | Small v1, v2 | 512 | 300K | 5e-4 | 512 | 1.0 | 3일 |
> | Small v3 | 512 | 800K | 5e-4 | 512 | 1.0 | 7일 |
>
> Small은 ELECTRA 논문의 ELECTRA-Small++와 같은 옵션으로 학습했습니다. batch size와 train steps를 제외한 하이퍼파라미터는 논문과 같습니다.
>
> ## 파인튜닝
>
> `finetune/`에서 실행합니다. 의존성은 `requirements.txt`에 있고(`torch==1.6.0`, `transformers==3.3.1` 등), `src/utils.py`가 scikit-learn과 scipy도 불러오므로 함께 설치합니다.
>
> ```bash
> cd finetune
> pip install -r requirements.txt
> pip install scikit-learn scipy
> ```
>
> 데이터는 `data/<task>/` 아래에 두고, 설정 파일의 `train_file`·`dev_file`·`test_file` 이름과 맞춥니다. 예를 들어 NSMC는 `data/nsmc/ratings_train.txt`와 `data/nsmc/ratings_test.txt`입니다. 모델별 설정은 `config/<task>/<모델>.json`에 있고, 학습 결과와 체크포인트는 `ckpt/` 아래에 저장됩니다.
>
> | 스크립트 | task |
> |---|---|
> | `run_seq_cls.py` | `nsmc`, `kornli`, `paws`, `korsts`, `question-pair`, `hate-speech` |
> | `run_ner.py` | `naver-ner` |
> | `run_squad.py` | `korquad` |
>
> ```bash
> python3 run_seq_cls.py --task nsmc --config_file koelectra-base-v3.json
> python3 run_ner.py --task naver-ner --config_file koelectra-base-v3.json
> python3 run_squad.py --task korquad --config_file koelectra-base-v3.json
> ```
>
> `--config_file`에는 `koelectra-base`, `koelectra-small`, 각각의 `-v2`·`-v3` 설정이 있습니다. 같은 폴더에 KoBERT, DistilKoBERT, HanBERT, XLM-RoBERTa 설정도 있습니다. 학습률, epoch 수, batch size 등은 설정 파일에서 바꿉니다.
>
> ## 사전학습 코드
>
> `pretrain/`에서 직접 사전학습할 수 있습니다. TensorFlow 1.15.0 기반이며 TPU 학습을 전제로 합니다.
>
> ```bash
> cd pretrain
> pip install -r requirements.txt
> ```
>
> 먼저 텍스트 파일이 든 디렉터리를 tfrecord로 바꿉니다. 스크립트는 코퍼스 파일을 한 줄씩 읽고, `--blanks-separate-docs`를 켜면 빈 줄을 문서 경계로 봅니다.
>
> ```bash
> python3 build_pretraining_dataset.py \
>     --corpus-dir <코퍼스 디렉터리> \
>     --vocab-file vocab.txt \
>     --output-dir <data-dir>/pretrain_tfrecords
> ```
>
> `<data-dir>`에는 `vocab.txt`와 `pretrain_tfrecords/`가 있어야 합니다. 저장소의 `pretrain/vocab.txt`는 32200개 항목입니다.
>
> ```bash
> python3 run_pretraining.py \
>     --data-dir <data-dir> \
>     --model-name electra-base \
>     --hparams config/base_config.json
> ```
>
> `config/base_config.json`과 `config/small_config.json`에 vocab 크기, train steps, batch size, learning rate와 TPU 이름·zone이 들어 있습니다. 본인의 TPU에 맞게 `tpu_name`과 `tpu_zone`을 바꿔야 합니다.
>
> ## 라이선스
>
> Apache License 2.0입니다. `pretrain/`의 일부 파일 머리말에는 Google Research 저작권 표기가 있습니다.

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 차이 없음 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 차이 없음

Y는 설치 명령과 실행 예시, v1 표기, 문단 흐름에서 앞선다. X는 반복이 적고 --no-lower-case, v3 vocab 미포함, 파인튜닝 명령 세 개 같은 실용 정보가 정확하다. 기준별 우열이 엇갈리고 각자 작은 흠이 있어 어느 쪽도 뚜렷하게 낫지 않다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 차이 없음

두 결과 모두 메모 내용을 빠짐없이 담았고, 모델 목록·사용법·사전학습·파인튜닝·라이선스로 구성이 거의 같습니다. X가 나은 점은 설치 명령과 실제로 실행되는 첫 사용 예가 있고 do_lower_case 주의를 사용법에 붙여 놓았다는 것입니다. Y가 나은 점은 v3 vocab이 저장소에 없다는 주의와 `--no-lower-case` 옵션, 파인튜닝 스크립트 세 개의 실행 예가 있다는 것입니다. 이처럼 장단점이 엇갈려서 어느 쪽이 분명히 낫다고 보기 어렵습니다.

</details>

