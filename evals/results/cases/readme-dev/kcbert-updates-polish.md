# `kcbert-updates-polish`

[← 사람이 쓴 README: 개발용 목록](README.md) · 수정 · README · 한국어

## 요청

> README 맨 위 업데이트 내역이야. 읽기 쉽게 정리해 줘.

## 원문

> # KcBERT: Korean comments BERT
>
> ** Updates on 2022.11.07 **
>
> - KcELECTRA v2022 학습에 사용한, 확장된 텍스트 데이터셋(v2022.3Q)를 공개합니다.
> - https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
> - 기존 11GB -> 신규 45GB, 기존 0.9억건 -> 신규 3.4억건으로 기존 v1 데이터셋 대비 약 4배 증가한 데이터셋입니다.
>
> ** Updates on 2022.10.08 **
>
> - KcELECTRA-base-v2022 (구 dev) 모델 이름이 변경되었습니다.
> - 기존 KcELECTRA-base(v2021) 대비 대부분의 downstream task에서 ~1%p 수준의 성능 향상이 있습니다.
>
> ** Updates on 2022.09.14 **
>
> - emoji의 v2.0.0 업데이트됨에 따라 Preprocessing 코드가 일부 변경되었습니다.
>
> ** Updates on 2021.04.07 **
>
> - KcELECTRA가 릴리즈 되었습니다!🤗
> - KcELECTRA는 보다 더 많은 데이터셋, 그리고 더 큰 General vocab을 통해 KcBERT 대비 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 아래 깃헙 링크에서 직접 사용해보세요!
> - https://github.com/Beomi/KcELECTRA
>
> ** Updates on 2021.03.14 **
>
> - KcBERT Paper 인용 표기를 추가하였습니다.(bibtex)
> - KcBERT-finetune Performance score를 본문에 추가하였습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**남아야 할 것**

- 2022.11.07: KcELECTRA v2022 학습에 쓴 확장 데이터셋(v2022.3Q) 공개와 릴리스 링크
- 2022.11.07: 11GB에서 45GB로, 0.9억 건에서 3.4억 건으로 v1 대비 약 4배라는 수치
- 2022.10.08: KcELECTRA-base-v2022(구 dev)로 이름이 바뀌었고, KcELECTRA-base(v2021) 대비 대부분의 downstream task에서 ~1%p 수준 향상
- 2022.09.14: emoji v2.0.0 업데이트로 전처리 코드 일부 변경
- 2021.04.07: KcELECTRA 릴리즈, 더 많은 데이터와 더 큰 General vocab으로 KcBERT 대비 모든 태스크에서 더 높은 성능을 보인다는 작성자의 설명, KcELECTRA 링크
- 2021.03.14: 논문 인용 표기(bibtex)와 finetune 성능 점수 추가
- 날짜별로 어떤 변경이 있었는지 구분

**있으면 안 되는 변경**

- 날짜·수치·이름을 바꾸거나 다른 날짜의 변경과 섞기
- '대부분의 downstream task'를 '모든 태스크'로, '~1%p 수준'을 확정 수치로 바꾸기
- 링크 대상 바꾸기
- 원문에 없는 기능·수치·지원 범위·사용 경험·평가 추가
- 코드 블록·명령·패키지 이름·설정값·링크 대상 바꾸기

**글자 그대로 남아야 할 문자열**: `https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q`, `https://github.com/Beomi/KcELECTRA`, `KcELECTRA-base-v2022`, `v2022.3Q`

**메모**: ChatGPT 공개(2022-11-30) 전에 사람이 쓴 오픈소스 README의 발췌다. 필요한 곳만 고치고 기술 표기, 수치와 측정 조건, 한계와 고지, 작성자의 판단 표시를 유지하는지 본다.

</details>

## 1회차

### 글빨 없음 — ○ 의미 보존 통과

> ```markdown
> # KcBERT: Korean comments BERT
>
> ## 📢 Updates
>
> ### 2022.11.07
> - KcELECTRA v2022 학습에 사용한 확장 텍스트 데이터셋(v2022.3Q)을 공개합니다.
>   - 다운로드: https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
> - v1 데이터셋 대비 약 4배 커졌습니다.
>   - 용량: 11GB → **45GB**
>   - 건수: 0.9억 건 → **3.4억 건**
>
> ### 2022.10.08
> - KcELECTRA-base-v2022(구 dev)로 모델 이름이 변경되었습니다.
> - KcELECTRA-base(v2021)보다 대부분의 downstream task에서 성능이 약 1%p 향상되었습니다.
>
> ### 2022.09.14
> - emoji v2.0.0 업데이트에 맞춰 Preprocessing 코드를 일부 변경했습니다.
>
> ### 2021.04.07
> - KcELECTRA가 릴리즈되었습니다! 🤗
> - 더 많은 데이터셋과 더 큰 General vocab을 사용해 KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 사용해 보기: https://github.com/Beomi/KcELECTRA
>
> ### 2021.03.14
> - KcBERT 논문 인용 표기(BibTeX)를 추가했습니다.
> - KcBERT-finetune 성능 점수를 본문에 추가했습니다.
> ```
>
> 바꾼 점은 다음과 같습니다.
> - 원문의 `** Updates on ... **`는 `**` 안쪽에 공백이 있어서 굵게 표시되지 않습니다. 날짜별 `###` 제목으로 바꿨습니다.
> - 링크를 하위 항목으로 묶어, 어떤 내용의 링크인지 바로 알 수 있게 했습니다.
> - 데이터셋 크기 비교는 `기존 → 신규` 형식으로 나눠 적고, 신규 수치는 굵게 표시했습니다.
> - 문장 어미를 "~합니다/되었습니다"로 통일했습니다.
>
> 내용은 바꾸지 않았고, 최신순 정렬도 그대로입니다. 영어 버전이나 더 짧은 요약이 필요하면 말씀해 주세요.

### 글빨 0.2.1 — ○ 의미 보존 통과

> ```markdown
> # KcBERT: Korean comments BERT
>
> **Updates on 2022.11.07**
>
> - KcELECTRA v2022 학습에 사용한 확장 텍스트 데이터셋(v2022.3Q)을 공개합니다. [릴리스 페이지](https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q)에서 받을 수 있습니다.
> - 기존 v1 데이터셋은 11GB, 0.9억 건이었고 신규 데이터셋은 45GB, 3.4억 건으로 약 4배 늘었습니다.
>
> **Updates on 2022.10.08**
>
> - dev 모델의 이름이 KcELECTRA-base-v2022로 바뀌었습니다.
> - 기존 KcELECTRA-base(v2021)보다 대부분의 downstream task에서 성능이 ~1%p 정도 올랐습니다.
>
> **Updates on 2022.09.14**
>
> - emoji v2.0.0 업데이트에 맞춰 Preprocessing 코드를 일부 변경했습니다.
>
> **Updates on 2021.04.07**
>
> - KcELECTRA를 릴리즈했습니다! 🤗
> - KcELECTRA는 더 많은 데이터셋과 더 큰 general vocab을 사용해 KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - [GitHub](https://github.com/Beomi/KcELECTRA)에서 직접 사용해 보세요.
>
> **Updates on 2021.03.14**
>
> - KcBERT 논문 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune 성능 점수를 본문에 추가했습니다.
> ```
>
> 확인이 필요한 부분이 두 가지 있습니다.
> - 2022.10.08 항목의 "(구 dev)"는 "dev 모델의 이름이 바뀌었다"는 뜻으로 읽었습니다. 다른 뜻이면 고쳐 주세요.
> - 2021.04.07 항목의 "모든 태스크에서 더 높은 성능"은 원문 그대로 뒀습니다. 이 README 안에서는 근거를 확인할 수 없습니다.

### 글빨 0.3.0 — ○ 의미 보존 통과

> ```markdown
> # KcBERT: Korean comments BERT
>
> **Updates on 2022.11.07**
>
> - KcELECTRA v2022 학습에 사용한 확장 텍스트 데이터셋(v2022.3Q)을 공개합니다.
> - 기존 v1 데이터셋보다 약 4배 커졌습니다. 용량은 11GB에서 45GB로, 규모는 0.9억 건에서 3.4억 건으로 늘었습니다.
> - https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
>
> **Updates on 2022.10.08**
>
> - KcELECTRA-base-v2022(구 dev) 모델의 이름이 변경되었습니다.
> - 기존 KcELECTRA-base(v2021)보다 대부분의 downstream task에서 ~1%p 수준으로 성능이 향상되었습니다.
>
> **Updates on 2022.09.14**
>
> - emoji v2.0.0 업데이트에 따라 Preprocessing 코드가 일부 변경되었습니다.
>
> **Updates on 2021.04.07**
>
> - KcELECTRA가 릴리즈 되었습니다!🤗
> - KcELECTRA는 더 많은 데이터셋과 더 큰 General vocab을 사용해 KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 아래 깃헙 링크에서 직접 사용해 보세요!
> - https://github.com/Beomi/KcELECTRA
>
> **Updates on 2021.03.14**
>
> - KcBERT Paper 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune Performance score를 본문에 추가했습니다.
> ```
>
> 원문의 `** Updates on ... **`는 별표 안쪽에 공백이 있어 마크다운에서 굵게 표시되지 않아서 공백을 없앴습니다. 사실과 수치, 링크는 그대로 두었습니다.
>
> 2021.04.07 항목의 "모든 태스크에서 더 높은 성능"은 원문의 주장이라 남겼습니다. 이 문장은 근거가 되는 성능표나 KcELECTRA 저장소 설명과 맞는지 한 번 확인해 보세요.

### 0.3.1 후보 — ○ 의미 보존 통과

> # KcBERT: Korean comments BERT
>
> **Updates on 2022.11.07**
>
> - KcELECTRA v2022 학습에 사용한 확장 텍스트 데이터셋(v2022.3Q)을 공개합니다.
>   https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
> - 기존 v1 데이터셋은 11GB, 0.9억 건이었고 새 데이터셋은 45GB, 3.4억 건으로 약 4배 늘었습니다.
>
> **Updates on 2022.10.08**
>
> - KcELECTRA-base-v2022(구 dev)로 모델 이름을 변경했습니다.
> - 기존 KcELECTRA-base(v2021)보다 대부분의 downstream task에서 성능이 ~1%p 정도 높습니다.
>
> **Updates on 2022.09.14**
>
> - emoji v2.0.0 업데이트에 맞춰 Preprocessing 코드를 일부 변경했습니다.
>
> **Updates on 2021.04.07**
>
> - KcELECTRA를 릴리즈했습니다!🤗
> - KcELECTRA는 더 많은 데이터셋과 더 큰 General vocab을 사용해 KcBERT보다 **모든 태스크에서 높은 성능**을 보입니다.
> - 아래 깃헙 링크에서 직접 사용해 보세요!
>   https://github.com/Beomi/KcELECTRA
>
> **Updates on 2021.03.14**
>
> - KcBERT Paper 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune Performance score를 본문에 추가했습니다.

### 사람 원문 — ○ 의미 보존 통과

> # KcBERT: Korean comments BERT
>
> ** Updates on 2022.11.07 **
>
> - KcELECTRA v2022 학습에 사용한, 확장된 텍스트 데이터셋(v2022.3Q)를 공개합니다.
> - https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
> - 기존 11GB -> 신규 45GB, 기존 0.9억건 -> 신규 3.4억건으로 기존 v1 데이터셋 대비 약 4배 증가한 데이터셋입니다.
>
> ** Updates on 2022.10.08 **
>
> - KcELECTRA-base-v2022 (구 dev) 모델 이름이 변경되었습니다.
> - 기존 KcELECTRA-base(v2021) 대비 대부분의 downstream task에서 ~1%p 수준의 성능 향상이 있습니다.
>
> ** Updates on 2022.09.14 **
>
> - emoji의 v2.0.0 업데이트됨에 따라 Preprocessing 코드가 일부 변경되었습니다.
>
> ** Updates on 2021.04.07 **
>
> - KcELECTRA가 릴리즈 되었습니다!🤗
> - KcELECTRA는 보다 더 많은 데이터셋, 그리고 더 큰 General vocab을 통해 KcBERT 대비 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 아래 깃헙 링크에서 직접 사용해보세요!
> - https://github.com/Beomi/KcELECTRA
>
> ** Updates on 2021.03.14 **
>
> - KcBERT Paper 인용 표기를 추가하였습니다.(bibtex)
> - KcBERT-finetune Performance score를 본문에 추가하였습니다.

## 2회차

### 글빨 없음 — ○ 의미 보존 통과

> # KcBERT: Korean comments BERT
>
> ## 📢 업데이트 내역
>
> ### 2022.11.07
> - KcELECTRA v2022 학습에 사용한 **확장 텍스트 데이터셋(v2022.3Q)** 을 공개했습니다.
>   - 다운로드: \[KcBERT v2022.3Q 릴리즈](https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q)
> - 기존 v1 데이터셋보다 약 4배 커졌습니다.
>
> | | 기존 | 신규 |
> |---|---|---|
> | 용량 | 11GB | 45GB |
> | 데이터 수 | 0.9억 건 | 3.4억 건 |
>
> ### 2022.10.08
> - `KcELECTRA-base-v2022`(구 dev)로 모델 이름을 변경했습니다.
> - 기존 KcELECTRA-base(v2021)보다 대부분의 downstream task에서 약 1%p 성능이 향상됐습니다.
>
> ### 2022.09.14
> - emoji v2.0.0 업데이트에 맞춰 Preprocessing 코드를 일부 변경했습니다.
>
> ### 2021.04.07
> - **KcELECTRA를 릴리즈했습니다!** 🤗
> - 더 많은 데이터셋과 더 큰 General vocab을 사용해, KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 사용해 보기: \[github.com/Beomi/KcELECTRA](https://github.com/Beomi/KcELECTRA)
>
> ### 2021.03.14
> - KcBERT Paper 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune Performance score를 본문에 추가했습니다.
>
> ---
>
> 정리하면서 바꾼 부분입니다.
> - `** Updates on ... **`은 `**` 안쪽에 공백이 있어 GitHub에서 볼드로 렌더링되지 않았습니다. 그래서 헤딩(`###`)으로 바꿨습니다.
> - 데이터셋 증가량은 표로 묶었습니다.
> - 맨 위 제목 아래에 `## 📢 업데이트 내역` 섹션 헤더를 새로 넣었습니다. 원문에는 없으니 필요 없으면 빼세요.
>
> README 파일에 직접 반영하려면 파일 경로를 알려 주세요.

### 글빨 0.2.1 — ○ 의미 보존 통과

> ```markdown
> # KcBERT: Korean comments BERT
>
> **Updates on 2022.11.07**
>
> - KcELECTRA v2022 학습에 사용한 확장 데이터셋(v2022.3Q)을 공개합니다. 다운로드: https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
> - 기존 v1 데이터셋은 11GB, 0.9억 건이었고 신규 데이터셋은 45GB, 3.4억 건으로 약 4배 늘었습니다.
>
> **Updates on 2022.10.08**
>
> - KcELECTRA-base-v2022(구 dev)로 모델 이름이 변경되었습니다.
> - 기존 KcELECTRA-base(v2021)보다 대부분의 downstream task에서 ~1%p 성능이 향상되었습니다.
>
> **Updates on 2022.09.14**
>
> - emoji v2.0.0 업데이트에 맞춰 Preprocessing 코드를 일부 변경했습니다.
>
> **Updates on 2021.04.07**
>
> - KcELECTRA를 릴리즈했습니다! 🤗
> - KcELECTRA는 더 많은 데이터셋과 더 큰 General vocab으로 학습해 KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 직접 사용해 보세요: https://github.com/Beomi/KcELECTRA
>
> **Updates on 2021.03.14**
>
> - KcBERT Paper 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune Performance score를 본문에 추가했습니다.
> ```
>
> - 원문의 `** Updates ... **`는 `**` 안쪽에 공백이 있어 마크다운에서 굵게 표시되지 않습니다. 공백을 없앴습니다.
> - 날짜, 수치, 링크 주소, 이름은 그대로 두었습니다.
> - 2021.04.07 항목의 "모든 태스크에서 더 높은 성능"은 원문 주장 그대로 남겼습니다. 이 글만으로는 근거를 확인할 수 없으니, 비교한 태스크 범위와 맞는지 한 번 확인해 보세요.

### 글빨 0.3.0 — ○ 의미 보존 통과

> # KcBERT: Korean comments BERT
>
> ## Updates
>
> **2022.11.07**
>
> - KcELECTRA v2022 학습에 사용한 확장 텍스트 데이터셋(v2022.3Q)을 공개합니다.
> - 기존 v1 데이터셋은 11GB, 0.9억 건이었고, 신규 데이터셋은 45GB, 3.4억 건으로 약 4배 늘었습니다.
> - 다운로드: https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
>
> **2022.10.08**
>
> - KcELECTRA-base-v2022(구 dev)로 모델 이름이 변경되었습니다.
> - 기존 KcELECTRA-base(v2021)보다 대부분의 downstream task에서 ~1%p 수준으로 성능이 향상되었습니다.
>
> **2022.09.14**
>
> - emoji v2.0.0 업데이트에 맞춰 Preprocessing 코드가 일부 변경되었습니다.
>
> **2021.04.07**
>
> - KcELECTRA를 릴리즈했습니다!🤗
> - KcELECTRA는 더 많은 데이터셋과 더 큰 General vocab을 사용해 KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 직접 사용해 보세요: https://github.com/Beomi/KcELECTRA
>
> **2021.03.14**
>
> - KcBERT 논문 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune 성능 점수를 본문에 추가했습니다.

### 0.3.1 후보 — ○ 의미 보존 통과

> ```markdown
> # KcBERT: Korean comments BERT
>
> **Updates on 2022.11.07**
>
> - KcELECTRA v2022 학습에 사용한 확장 텍스트 데이터셋(v2022.3Q)을 공개합니다. ([릴리스 페이지](https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q))
> - 용량은 11GB에서 45GB로, 데이터 수는 0.9억 건에서 3.4억 건으로 늘었습니다. 기존 v1 데이터셋의 약 4배입니다.
>
> **Updates on 2022.10.08**
>
> - KcELECTRA-base-v2022(구 dev) 모델 이름이 변경되었습니다.
> - KcELECTRA-base(v2021)보다 대부분의 downstream task에서 ~1%p 수준으로 성능이 향상되었습니다.
>
> **Updates on 2022.09.14**
>
> - emoji v2.0.0 업데이트에 따라 Preprocessing 코드가 일부 변경되었습니다.
>
> **Updates on 2021.04.07**
>
> - KcELECTRA를 릴리즈했습니다! 🤗
> - KcELECTRA는 더 많은 데이터셋과 더 큰 General vocab을 사용해 KcBERT보다 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 직접 사용해 보세요: https://github.com/Beomi/KcELECTRA
>
> **Updates on 2021.03.14**
>
> - KcBERT Paper 인용 표기(bibtex)를 추가했습니다.
> - KcBERT-finetune Performance score를 본문에 추가했습니다.
> ```
>
> 원문의 사실과 수치, 링크는 그대로 두고 아래만 바꿨습니다.
> - `** Updates ... **`는 `*`와 글자 사이에 공백이 있어 굵게 표시되지 않습니다. 공백을 없앴습니다.
> - 단독 줄이던 v2022.3Q 링크를 첫 항목으로 합쳤습니다.
> - 11GB→45GB와 0.9억→3.4억 건을 한 문장으로 묶었습니다.
>
> 2021.04.07 항목의 "모든 태스크에서 더 높은 성능"은 원문에 근거가 적혀 있지 않아 그대로 뒀습니다. 이 주장을 뒷받침하는 성능 표를 README나 KcELECTRA 저장소에서 한 번 확인해 보세요.

### 사람 원문 — ○ 의미 보존 통과

> # KcBERT: Korean comments BERT
>
> ** Updates on 2022.11.07 **
>
> - KcELECTRA v2022 학습에 사용한, 확장된 텍스트 데이터셋(v2022.3Q)를 공개합니다.
> - https://github.com/Beomi/KcBERT/releases/tag/v2022.3Q
> - 기존 11GB -> 신규 45GB, 기존 0.9억건 -> 신규 3.4억건으로 기존 v1 데이터셋 대비 약 4배 증가한 데이터셋입니다.
>
> ** Updates on 2022.10.08 **
>
> - KcELECTRA-base-v2022 (구 dev) 모델 이름이 변경되었습니다.
> - 기존 KcELECTRA-base(v2021) 대비 대부분의 downstream task에서 ~1%p 수준의 성능 향상이 있습니다.
>
> ** Updates on 2022.09.14 **
>
> - emoji의 v2.0.0 업데이트됨에 따라 Preprocessing 코드가 일부 변경되었습니다.
>
> ** Updates on 2021.04.07 **
>
> - KcELECTRA가 릴리즈 되었습니다!🤗
> - KcELECTRA는 보다 더 많은 데이터셋, 그리고 더 큰 General vocab을 통해 KcBERT 대비 **모든 태스크에서 더 높은 성능**을 보입니다.
> - 아래 깃헙 링크에서 직접 사용해보세요!
> - https://github.com/Beomi/KcELECTRA
>
> ** Updates on 2021.03.14 **
>
> - KcBERT Paper 인용 표기를 추가하였습니다.(bibtex)
> - KcBERT-finetune Performance score를 본문에 추가하였습니다.

## 품질 비교

두 결과가 모두 의미 보존을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.3.0 | 글빨 없음 우세 |
| 2 | 글빨 없음 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 1 | 글빨 0.2.1 vs 글빨 0.3.0 | 글빨 0.2.1 우세 |
| 2 | 글빨 0.2.1 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 1 | 사람 원문 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |
| 2 | 사람 원문 vs 글빨 0.3.0 | 글빨 0.3.0 우세 |

<details><summary>1회차 글빨 없음 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.3.0) → 글빨 없음 우세

요청은 "읽기 쉽게 정리"였다. X는 날짜 제목, 이름 붙은 링크, 기존→신규 수치 비교로 업데이트 내역을 훑어보기 쉽게 만들었다. 중복된 링크 안내 문장을 합쳤고 어색한 "~1%p 수준으로"도 자연스럽게 고쳤다. Y는 손을 덜 대서 원문을 잘 보존했지만, 정리라고 보기에는 개선이 마크다운 굵게 표시 수정 정도에 그친다. 오히려 링크를 공개 문장에서 떼어 놓아 찾기가 조금 불편해졌다. X가 이모지 제목을 더하는 등 약간 과하게 고친 부분은 있지만, 읽기 쉬워진 효과가 그보다 크다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 없음) → 글빨 없음 우세

The user asked to make the update log easier to read. Y labels the links, splits the size figures into before→after lines, and gives each date its own heading, so readers find the information faster. X fixes the bold formatting and smooths the sentences, but keeps the original layout almost unchanged. Y does add things the user didn't ask for (the emoji heading and the closing offer) and slightly changes the \"~1%p\" nuance, but its readability gain is larger, so Y comes out slightly ahead.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

Y가 더 낫습니다. 두 결과 모두 원문 정보를 지키면서 날짜별로 잘 정리했습니다. 깨져 있던 볼드 표기(`** Updates on ... **`)도 둘 다 고쳤습니다. **X의 장점** - 날짜마다 헤딩을 달아 목차에서 찾기 쉽습니다. - 데이터셋 용량과 건수를 표로 묶어 비교하기 쉽습니다. **X의 단점** - 원문에 없던 이모지 섹션 헤더와 볼드를 더해 원래 말투보다 장식이 많아졌습니다. - "약 4배 커졌습니다"라는 문장과 표가 같은 내용을 두 번 보여 줍니다. - 본문 뒤에 편집 설명과 후속 질문이 붙어 있어, README에 그대로 붙여 넣을 수 없습니다. **Y의 장점** - 원문 형식을 덜 바꾸면서 문장을 자연스럽게 다듬었습니다. - 수치를 한 문장에 담아 군더더기가 없습니다. - 바로 쓸 수 있는 README 조각만 내놓았습니다. 찾기 쉬운 정도는 X가 조금 앞서지만, 절제·흐름·말투에서 Y가 낫습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 없음) → 글빨 0.3.0 우세

두 결과 모두 날짜별 업데이트를 읽기 쉽게 정리했고, 원문의 깨진 '** Updates on ... **' 표기도 고쳤습니다. 탐색성은 Y가 조금 낫습니다. 헤딩과 표 덕분에 수치를 찾기 쉽기 때문입니다. 다만 Y는 이모지 헤더, 강조, 링크 텍스트를 더했습니다. 본문 뒤에는 수정 설명과 사용자에게 하는 질문까지 붙어 있어 README에 바로 넣을 수 없습니다. X는 원문 내용과 말투를 지키면서 필요한 만큼만 고쳐, 그대로 README 맨 위에 쓸 수 있습니다. 그래서 '읽기 쉽게 정리해 줘'라는 요청에는 X가 더 알맞습니다.

</details>

<details><summary>1회차 글빨 0.2.1 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.2.1, 결과 Y = 글빨 0.3.0) → 글빨 0.2.1 우세

요청이 "읽기 쉽게 정리"였고, X가 그 목적에 더 맞다. 2022.10.08 이름 변경 항목은 Y에서 여전히 헷갈리지만, X는 "dev 모델의 이름이 KcELECTRA-base-v2022로 바뀌었습니다"로 풀어 써서 바로 이해된다. X는 링크도 설명 문장 안에 넣어 정리했다. Y는 원문을 덜 바꾸고 굵게 표시 문제를 설명한 점이 좋지만, 읽기 쉬운 정도에서는 X가 약간 낫다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.2.1) → 글빨 0.2.1 우세

둘 다 굵은 글씨 서식을 고쳤고, 수치와 링크를 보존하면서 문장을 다듬었습니다. Y는 "읽기 쉽게"라는 요청에 더 잘 맞습니다. 맨 URL 대신 용도가 드러나는 인라인 링크를 썼고, "(구 dev)"를 "dev 모델의 이름이 KcELECTRA-base-v2022로 바뀌었습니다"로 풀어 무엇이 무엇으로 바뀌었는지 분명히 했습니다. 이 해석이 맞는지도 사용자에게 확인을 요청했습니다. X는 원문을 덜 건드린 장점이 있지만, URL만 있는 불릿과 모호한 이름 변경 문장이 그대로 남았습니다.

</details>

<details><summary>2회차 글빨 0.2.1 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.2.1, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

Y가 조금 더 낫습니다. 두 결과 모두 깨진 굵은 글씨 표기를 고쳤고 수치 문장도 비슷하게 잘 다듬었습니다. 차이는 정리 방식에서 납니다. Y는 \"Updates on\"을 \"## Updates\" 제목 하나로 묶어 반복을 줄였고, 다운로드 링크를 별도 항목으로 빼서 날짜와 링크를 찾기 쉽게 했습니다. 요청한 \"읽기 쉽게 정리\"에 더 직접 맞는 결과입니다. X에서 굵은 글씨 표기를 고친 이유를 설명한 메모는 쓸모가 있습니다. 하지만 성능 주장을 확인하라는 조언은 요청 범위를 벗어나고, 코드 블록으로 감싼 것도 꼭 필요하지는 않았습니다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.2.1) → 글빨 0.3.0 우세

두 결과 모두 사실을 지키면서 문장을 잘 다듬었다. X는 업데이트 내역을 하나의 섹션으로 묶고 날짜만 남겼으며, 링크를 따로 떼어 내 더 읽기 쉽게 만들었다. Y는 원문 표현을 더 많이 남긴 점은 좋지만, 첫 항목에서 링크를 문장에 붙여 읽기가 무거워졌고 요청하지 않은 근거 확인 권고까지 덧붙였다. 차이는 크지 않지만 X가 조금 낫다.

</details>

<details><summary>1회차 사람 원문 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 사람 원문, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

X는 원문과 똑같아 읽기 쉽게 정리해 달라는 요청을 수행하지 않았다. Y는 굵게 표시 오류를 고치고, 링크를 설명 뒤로 옮기고, 데이터셋 증가를 요약 뒤 세부 순으로 풀고, \"보다 더\"·\"업데이트됨에 따라\" 같은 어색한 표현을 다듬었다. 원문의 말투와 구조, 사실은 그대로 유지했다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 사람 원문) → 글빨 0.3.0 우세

사용자는 정리를 요청했는데 Y는 원문과 완전히 같아 요청을 수행하지 않았습니다. X는 굵게 표시되지 않던 제목을 고치고, 링크를 설명 뒤로 옮기고, 어색한 문장을 다듬어 실제로 읽기 쉬워졌습니다. 말투와 사실은 그대로 유지했습니다.

</details>

<details><summary>2회차 사람 원문 vs 글빨 0.3.0: 판정 이유</summary>

**1번째 판정** (결과 X = 사람 원문, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

X는 원문과 똑같아서 '읽기 쉽게 정리해 달라'는 요청을 충족하지 못했다. Y는 깨진 강조 표기를 고쳐 날짜를 찾기 쉽게 했고, 링크에 용도를 붙였다. 화살표가 이어지던 데이터 크기 문장도 자연스러운 문장으로 바꿨다. 내용은 늘리거나 줄이지 않고 원문의 말투도 대체로 유지했다.

**2번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 사람 원문) → 글빨 0.3.0 우세

Y는 원문과 똑같아 '읽기 쉽게 정리'라는 요청을 수행하지 않았다. X는 렌더링되지 않던 제목 형식을 고치고 날짜 제목을 정리했으며, 링크에 용도를 붙이고 어색한 표현과 중복을 다듬었다. 사실 정보와 원문 작성자의 말투는 그대로 지켰다.

</details>

