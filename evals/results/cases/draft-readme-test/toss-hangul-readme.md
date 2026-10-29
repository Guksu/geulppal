# `toss-hangul-readme`

[← README 초안 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지 README 써 줘. 한국어로.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/common/hangul`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 제공하는 주요 함수와 하는 일
- 사용 예

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/hangul
>
> 한글을 다루기 위한 유틸리티 모음입니다. 한글 문자열을 자음·모음 단위로 분해하고, 초성 검색이나 조사 선택처럼 한글 UI를 만들 때 자주 필요한 기능을 제공합니다.
>
> - 외부 의존성이 없습니다.
> - TypeScript 타입을 함께 제공합니다.
> - `sideEffects: false`로 설정되어 있어 트리 쉐이킹이 가능합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/hangul
>
> # yarn
> yarn add @toss/hangul
> ```
>
> ## 사용법
>
> ```typescript
> import { josa, hangulIncludes, chosungIncludes, disassembleHangul, disassembleHangulToGroups } from '@toss/hangul';
> ```
>
> ## API
>
> ### `josa(word, josa)`
>
> 단어의 마지막 글자에 받침이 있는지 보고, 알맞은 조사를 붙인 문자열을 반환합니다.
>
> ```typescript
> josa('샴푸', '이/가'); // '샴푸가'
> josa('칫솔', '이/가'); // '칫솔이'
>
> josa('샴푸', '을/를'); // '샴푸를'
> josa('칫솔', '을/를'); // '칫솔을'
> ```
>
> 지원하는 조사는 다음과 같습니다. 받침이 있으면 `/` 앞의 형태, 없으면 뒤의 형태가 선택됩니다.
>
> | 옵션 | 받침 O | 받침 X |
> | --- | --- | --- |
> | `'이/가'` | 이 | 가 |
> | `'을/를'` | 을 | 를 |
> | `'은/는'` | 은 | 는 |
> | `'으로/로'` | 으로 | 로 |
> | `'와/과'` | 과 | 와 |
> | `'이나/나'` | 이나 | 나 |
> | `'이에/에'` | 이에 | 에 |
>
> 예외 규칙은 다음과 같습니다.
>
> - `'으로/로'`: 받침이 `ㄹ`이면 `로`를 붙입니다. (`josa('지름길', '으로/로')` → `'지름길로'`)
> - `'와/과'`: 받침이 없을 때 `와`, 있을 때 `과`가 붙습니다.
> - 빈 문자열을 넘기면 빈 문자열을 그대로 반환합니다.
> - 마지막 글자가 한글이 아니면 받침이 없는 것으로 취급합니다.
>
> #### `josa.pick(word, josa)`
>
> 단어는 붙이지 않고 조사만 반환합니다. 문장 안에서 조사를 따로 다뤄야 할 때 유용합니다.
>
> ```typescript
> josa.pick('샴푸', '이/가'); // '가'
> josa.pick('칫솔', '이/가'); // '이'
> josa.pick('지름길', '으로/로'); // '로'
>
> `${word}${josa.pick(word, '은/는')} 좋아요`;
> ```
>
> ### `hangulIncludes(x, y)`
>
> `x`가 `y`를 포함하는지 확인합니다. 두 문자열을 자음·모음 단위로 분해한 뒤 비교하기 때문에, 아직 완성되지 않은 글자로도 검색할 수 있습니다.
>
> ```typescript
> hangulIncludes('토스', ''); // true
> hangulIncludes('토스', 'ㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> hangulIncludes('토스', '톱'); // false
> hangulIncludes('토스', '토스'); // true
> ```
>
> > 분해된 자모열을 기준으로 비교하므로, 글자 경계를 넘어 일치하는 경우에도 `true`가 반환됩니다.
> > 예를 들어 `'프론트엔드'`는 `ㅌㅡㅇ`을 포함하므로 `hangulIncludes('프론트엔드', '틍')`은 `true`입니다.
>
> ### `chosungIncludes(x, y)`
>
> `x`의 초성에 `y`가 포함되는지 확인합니다. `y`가 초성으로만 이루어진 경우에만 동작하며, 그 외에는 `false`를 반환합니다. 공백은 무시하고 비교합니다.
>
> ```typescript
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('프론트엔드', 'ㅍㅌ'); // false (초성이 연속되지 않음)
> chosungIncludes('프론트엔드', '푸롴트'); // false (초성만 입력되지 않음)
> ```
>
> ### `disassembleHangul(str)`
>
> 문자열을 자음·모음 단위로 분해해 하나의 문자열로 반환합니다. 겹받침과 이중 모음도 낱개의 자모로 풀어집니다. 한글이 아닌 문자는 그대로 유지됩니다.
>
> ```typescript
> disassembleHangul('값'); // 'ㄱㅏㅂㅅ'
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
> disassembleHangul('ㄵ'); // 'ㄴㅈ'
> disassembleHangul('ㅘ'); // 'ㅗㅏ'
> ```
>
> ### `disassembleHangulToGroups(str)`
>
> `disassembleHangul`과 같지만, 글자 단위로 묶인 `string[][]`를 반환합니다. 어느 글자에서 나온 자모인지 알아야 할 때 사용합니다.
>
> ```typescript
> disassembleHangulToGroups('값'); // [['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ']]
>
> disassembleHangulToGroups('토스 짱');
> // [['ㅌ', 'ㅗ'], ['ㅅ', 'ㅡ'], [' '], ['ㅉ', 'ㅏ', 'ㅇ']]
> ```
>
> ## 개발
>
> ```bash
> yarn test       # 테스트 실행 (jest)
> yarn typecheck  # 타입 검사
> yarn build      # dist(CommonJS + 타입), esm(ES Module) 빌드
> ```
>
> ## 라이선스
>
> \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/hangul
>
> 한글 문자열을 자모 단위로 분해하고, 초성 검색과 조사 붙이기를 하는 함수 모음입니다.
>
> ```ts
> import { chosungIncludes, hangulIncludes, josa } from '@toss/hangul';
>
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> josa('칫솔', '이/가'); // '칫솔이'
> ```
>
> ## 설치
>
> ```sh
> npm install @toss/hangul
> # 또는
> yarn add @toss/hangul
> ```
>
> ## 함수
>
> | 함수 | 용도 |
> |---|---|
> | \[`disassembleHangul`](#disassemblehangul) | 문자열을 자모로 분해한 문자열 |
> | \[`disassembleHangulToGroups`](#disassemblehangultogroups) | 글자별로 자모를 묶은 배열 |
> | \[`hangulIncludes`](#hangulincludes) | 자모 단위 부분 문자열 검색 |
> | \[`chosungIncludes`](#chosungincludes) | 초성 검색 |
> | \[`josa`](#josa) | 단어 뒤에 맞는 조사 붙이기 |
>
> ### disassembleHangul
>
> 문자열을 자모로 분해해 하나의 문자열로 돌려줍니다. 한글이 아닌 문자는 그대로 둡니다.
>
> ```ts
> disassembleHangul('값'); // 'ㄱㅏㅂㅅ'
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
> ```
>
> 글자 하나로 쓰인 겹자음과 겹모음도 분해합니다. ㅆ, ㅉ 같은 쌍자음은 분해하지 않습니다.
>
> ```ts
> disassembleHangul('ㄵ'); // 'ㄴㅈ'
> disassembleHangul('ㅘ'); // 'ㅗㅏ'
> ```
>
> ### disassembleHangulToGroups
>
> `disassembleHangul`과 같지만 글자별로 자모를 묶어 `string[][]`로 돌려줍니다. 한글이 아닌 문자는 그 문자 하나로 된 묶음이 됩니다.
>
> ```ts
> disassembleHangulToGroups('값이 비싸다');
> // [
> //   ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'],
> //   ['ㅇ', 'ㅣ'],
> //   [' '],
> //   ['ㅂ', 'ㅣ'],
> //   ['ㅆ', 'ㅏ'],
> //   ['ㄷ', 'ㅏ'],
> // ]
> ```
>
> ### hangulIncludes
>
> `hangulIncludes(x, y)`는 `x`에 `y`가 들어 있는지 자모 단위로 확인합니다. 아직 입력 중인 글자도 일치로 봅니다. 예를 들어 `토스`를 분해하면 `ㅌㅗㅅㅡ`이고 `톳`을 분해하면 `ㅌㅗㅅ`이므로 `톳`이 일치합니다.
>
> ```ts
> hangulIncludes('토스', 'ㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> hangulIncludes('토스', '톱'); // false
> hangulIncludes('프론트엔드', '틍'); // true
> ```
>
> 분해한 자모열에서 찾기 때문에 글자 경계와 상관없이 일치할 수 있습니다. `프론트엔드`에서 `틍`이 일치하는 것은 `트엔`이 `ㅌㅡㅇㅔㄴ`으로 분해되기 때문입니다.
>
> ### chosungIncludes
>
> `chosungIncludes(x, y)`는 `x`의 초성에 `y`가 들어 있는지 확인합니다. `y`는 초성으로만 이루어져 있어야 하며, 그렇지 않으면 `false`를 돌려줍니다. `x`의 공백은 무시합니다.
>
> ```ts
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('프론트엔드', 'ㅍㅌ'); // false, 초성이 연속하지 않음
> chosungIncludes('프론트엔드', '푸롴트'); // false, 초성만 입력하지 않음
> ```
>
> ### josa
>
> `josa(word, 조사)`는 단어의 마지막 글자에 받침이 있는지에 따라 알맞은 조사를 붙여 돌려줍니다. 조사 인자는 다음 중 하나입니다.
>
> `'이/가'`, `'을/를'`, `'은/는'`, `'으로/로'`, `'와/과'`, `'이나/나'`, `'이에/에'`
>
> ```ts
> josa('샴푸', '이/가'); // '샴푸가'
> josa('칫솔', '이/가'); // '칫솔이'
> josa('내부', '으로/로'); // '내부로'
> josa('바깥', '으로/로'); // '바깥으로'
> josa('지름길', '으로/로'); // '지름길로', ㄹ 받침은 '로'
> ```
>
> 단어를 붙이지 않고 조사만 필요하면 `josa.pick`을 씁니다.
>
> ```ts
> josa.pick('샴푸', '을/를'); // '를'
> josa.pick('칫솔', '을/를'); // '을'
> ```
>
> 빈 문자열을 넘기면 `josa`는 빈 문자열을 그대로 돌려줍니다.
>
> ## 개발
>
> ```sh
> yarn test       # jest
> yarn typecheck  # tsc --noEmit
> yarn build      # dist, esm 생성
> ```
>
> ## 라이선스
>
> MIT License. Copyright (c) 2021 Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/hangul
>
> 한글 문자열을 초성·중성·종성 단위로 나누고, 그 단위로 검색하고, 단어 끝 받침에 맞는 조사를 붙이는 함수 모음입니다.
>
> ```ts
> import { chosungIncludes, hangulIncludes, josa } from '@toss/hangul';
>
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> josa('칫솔', '을/를'); // '칫솔을'
> ```
>
> ## 설치
>
> ```sh
> yarn add @toss/hangul
> # 또는
> npm install @toss/hangul
> ```
>
> ## 사용법
>
> 완성형 한글은 초성, 중성, 종성(받침)으로 이루어져 있습니다. 이 패키지는 글자를 이 자모들로 나눈 뒤 비교하므로, 글자가 아직 완성되지 않았거나 초성만 입력된 문자열도 검색에 쓸 수 있습니다.
>
> ### 초성으로 검색하기: `chosungIncludes(x, y)`
>
> `x`의 초성을 이어 붙인 문자열 안에 `y`가 들어 있으면 `true`를 반환합니다. `y`는 초성으로만 이루어져 있어야 하고, 하나라도 다른 글자가 있으면 `false`입니다.
>
> ```ts
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('프론트엔드', 'ㅍㅌ'); // false: 초성이 이어지지 않음
> chosungIncludes('프론트엔드', '푸롴트'); // false: 초성만 입력하지 않음
> ```
>
> `x`의 공백은 비교 전에 제거합니다. `y`에 공백이 있으면 초성만 입력한 것이 아니므로 `false`입니다.
>
> ### 자모 단위로 검색하기: `hangulIncludes(x, y)`
>
> `x`와 `y`를 자모로 풀어 쓴 뒤, `x` 안에 `y`가 들어 있는지 확인합니다. 마지막 글자를 입력하는 중이어도 일치합니다.
>
> ```ts
> hangulIncludes('토스', 'ㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> hangulIncludes('토스', '톱'); // false
> hangulIncludes('프론트엔드', '틍'); // true
> hangulIncludes('토스', ''); // true
> ```
>
> ### 자모로 분해하기: `disassembleHangul(str)`, `disassembleHangulToGroups(str)`
>
> `disassembleHangul`은 문자열을 자모를 이어 붙인 문자열로 바꿉니다. `disassembleHangulToGroups`는 글자마다 자모 배열을 만들고, 이를 모은 이차원 배열을 반환합니다.
>
> ```ts
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
>
> disassembleHangulToGroups('값이 비싸다');
> // [
> //   ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'],
> //   ['ㅇ', 'ㅣ'],
> //   [' '],
> //   ['ㅂ', 'ㅣ'],
> //   ['ㅆ', 'ㅏ'],
> //   ['ㄷ', 'ㅏ'],
> // ]
> ```
>
> 겹받침(`ㄵ`)과 겹모음(`ㅘ`)은 낱자모로 나뉩니다. 한글 낱자모를 그대로 넣어도 같은 규칙으로 나뉩니다. 한글이 아닌 글자는 나누지 않고 한 글자씩 그대로 둡니다.
>
> ```ts
> disassembleHangul('값'); // 'ㄱㅏㅂㅅ'
> disassembleHangul('ㄵ'); // 'ㄴㅈ'
> disassembleHangul('ㅘ'); // 'ㅗㅏ'
> ```
>
> ### 조사 붙이기: `josa(word, josa)`, `josa.pick(word, josa)`
>
> `josa`는 단어 뒤에 알맞은 조사를 붙인 문자열을, `josa.pick`은 조사만 반환합니다. 단어 마지막 글자에 받침이 있는지로 고릅니다.
>
> ```ts
> josa('샴푸', '이/가'); // '샴푸가'
> josa('칫솔', '이/가'); // '칫솔이'
>
> josa.pick('샴푸', '을/를'); // '를'
> josa.pick('칫솔', '을/를'); // '을'
> ```
>
> 선택할 수 있는 조사는 `'이/가'`, `'을/를'`, `'은/는'`, `'으로/로'`, `'와/과'`, `'이나/나'`, `'이에/에'`입니다.
>
> ```ts
> josa('바깥', '으로/로'); // '바깥으로'
> josa('내부', '으로/로'); // '내부로'
> josa('샴푸', '와/과'); // '샴푸와'
> josa('칫솔', '와/과'); // '칫솔과'
> josa('샴푸', '이나/나'); // '샴푸나'
> josa('칫솔', '이나/나'); // '칫솔이나'
> ```
>
> `'으로/로'`는 `ㄹ` 받침 뒤에서 받침이 없을 때와 같이 `로`를 붙입니다.
>
> ```ts
> josa('지름길', '으로/로'); // '지름길로'
> ```
>
> 마지막 글자가 완성형 한글이 아니면 받침이 없는 것으로 봅니다. 빈 문자열을 `josa`에 넘기면 빈 문자열을 그대로 반환합니다.
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

## 2회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/hangul
>
> 한글을 다루기 위한 가벼운 유틸리티 모음입니다. 한글 글자를 자음·모음 단위로 분해하고, 초성 검색과 자모 단위 부분 검색을 하고, 단어의 받침에 맞는 조사를 골라 줍니다.
>
> - 외부 런타임 의존성이 없습니다.
> - TypeScript 타입을 제공합니다.
> - `sideEffects: false`로 선언되어 있어 트리 쉐이킹이 가능합니다.
> - CommonJS(`dist/index.js`)와 ESM(`esm/index.mjs`)을 모두 지원합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/hangul
>
> # yarn
> yarn add @toss/hangul
> ```
>
> ## 빠른 시작
>
> ```typescript
> import { josa, chosungIncludes, hangulIncludes, disassembleHangul } from '@toss/hangul';
>
> josa('칫솔', '을/를'); // '칫솔을'
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> hangulIncludes('프론트엔드', '플'); // true
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
> ```
>
> ## API
>
> | 함수 | 설명 |
> | --- | --- |
> | \[`josa`](#josaword-josa) | 단어 뒤에 받침 유무에 맞는 조사를 붙입니다. |
> | \[`josa.pick`](#josapickword-josa) | 조사만 골라서 반환합니다. |
> | \[`chosungIncludes`](#chosungincludesx-y) | 문자열에 초성 검색어가 포함되어 있는지 확인합니다. |
> | \[`hangulIncludes`](#hangulincludesx-y) | 자모 단위로 분해해서 부분 문자열 포함 여부를 확인합니다. |
> | \[`disassembleHangul`](#disassemblehangulstr) | 한글을 자모로 분해해 하나의 문자열로 반환합니다. |
> | \[`disassembleHangulToGroups`](#disassemblehangultogroupsstr) | 한글을 글자별 자모 배열로 분해합니다. |
>
> ### `josa(word, josa)`
>
> 단어 뒤에 알맞은 조사를 붙여 반환합니다. 빈 문자열이 들어오면 그대로 반환합니다.
>
> ```typescript
> josa('샴푸', '이/가'); // '샴푸가'
> josa('칫솔', '이/가'); // '칫솔이'
>
> josa('샴푸', '와/과'); // '샴푸와'
> josa('칫솔', '와/과'); // '칫솔과'
>
> josa('내부', '으로/로'); // '내부로'
> josa('바깥', '으로/로'); // '바깥으로'
> josa('지름길', '으로/로'); // '지름길로' (ㄹ 받침은 '로'를 사용)
> ```
>
> 지원하는 조사 옵션은 다음과 같습니다.
>
> `'이/가'` · `'을/를'` · `'은/는'` · `'으로/로'` · `'와/과'` · `'이나/나'` · `'이에/에'`
>
> ### `josa.pick(word, josa)`
>
> 단어는 붙이지 않고 조사만 반환합니다. 문장을 직접 조립할 때 유용합니다.
>
> ```typescript
> josa.pick('샴푸', '이/가'); // '가'
> josa.pick('칫솔', '을/를'); // '을'
> josa.pick('지름길', '으로/로'); // '로'
> ```
>
> ### `chosungIncludes(x, y)`
>
> `x`에 초성 검색어 `y`가 포함되어 있으면 `true`를 반환합니다. `y`가 초성으로만 이루어져 있지 않으면 항상 `false`입니다. 공백은 무시하고 비교합니다.
>
> ```typescript
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('프론트엔드', 'ㅍㅌ'); // false (연속되지 않음)
> chosungIncludes('프론트엔드', '푸롴트'); // false (초성만 입력하지 않음)
> ```
>
> ### `hangulIncludes(x, y)`
>
> 두 문자열을 모두 자모 단위로 분해한 뒤 `x`가 `y`를 포함하는지 확인합니다. 아직 입력 중인 글자(예: 받침이 없는 글자)도 검색에 활용할 수 있습니다.
>
> ```typescript
> hangulIncludes('토스', ''); // true
> hangulIncludes('토스', 'ㅌ'); // true
> hangulIncludes('토스', '톳'); // true  ('토스' -> 'ㅌㅗㅅㅡ' 안에 'ㅌㅗㅅ'이 있음)
> hangulIncludes('토스', '톱'); // false
>
> hangulIncludes('프론트엔드', '프로'); // true
> ```
>
> ### `disassembleHangul(str)`
>
> 한글을 자음·모음으로 분해해 하나의 문자열로 반환합니다. 겹받침과 복합 모음도 낱자로 풀리며, 한글이 아닌 문자는 그대로 유지됩니다.
>
> ```typescript
> disassembleHangul('값'); // 'ㄱㅏㅂㅅ'
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
> disassembleHangul('토스 짱'); // 'ㅌㅗㅅㅡ ㅉㅏㅇ'
> disassembleHangul('ㄵ'); // 'ㄴㅈ'
> disassembleHangul('ㅘ'); // 'ㅗㅏ'
> ```
>
> ### `disassembleHangulToGroups(str)`
>
> `disassembleHangul`과 같지만 글자별로 묶인 `string[][]`를 반환합니다. 공백이나 영문자 같은 한글 외 문자는 그 문자 하나를 담은 배열이 됩니다.
>
> ```typescript
> disassembleHangulToGroups('값이 비싸다');
> // [
> //   ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'],
> //   ['ㅇ', 'ㅣ'],
> //   [' '],
> //   ['ㅂ', 'ㅣ'],
> //   ['ㅆ', 'ㅏ'],
> //   ['ㄷ', 'ㅏ'],
> // ]
> ```
>
> ## 개발
>
> ```bash
> yarn test        # 테스트 실행 (jest)
> yarn typecheck   # 타입 검사
> yarn build       # dist(CJS, 타입 선언), esm 빌드
> ```
>
> 이 패키지는 \[toss/slash](https://github.com/toss/slash) 모노레포의 일부이며, `@toss/rollup-config`는 워크스페이스 의존성이므로 모노레포 루트에서 설치해야 빌드할 수 있습니다.
>
> ## 변경 내역
>
> \[CHANGELOG.md](./CHANGELOG.md)를 참고하세요.
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

### 글빨 0.3.0 — ✗ 근거 판정 실패

> # @toss/hangul
>
> 한글 문자열을 자모 단위로 분해하고, 분해한 결과로 검색하거나 받침에 맞는 조사를 고르는 함수 모음입니다.
>
> ```typescript
> import { chosungIncludes, hangulIncludes, josa } from '@toss/hangul';
>
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> josa('칫솔', '을/를'); // '칫솔을'
> ```
>
> ## 설치
>
> ```bash
> yarn add @toss/hangul
> # 또는
> npm install @toss/hangul
> ```
>
> ## 함수
>
> | 함수 | 용도 |
> |---|---|
> | \[`disassembleHangul`](#disassemblehangul) | 문자열을 자모로 분해해 하나의 문자열로 반환 |
> | \[`disassembleHangulToGroups`](#disassemblehangultogroups) | 문자열을 글자별 자모 배열로 반환 |
> | \[`hangulIncludes`](#hangulincludes) | 자모 단위로 부분 문자열 포함 여부 확인 |
> | \[`chosungIncludes`](#chosungincludes) | 초성만으로 포함 여부 확인 |
> | \[`josa`](#josa) | 단어의 받침에 맞는 조사 선택 |
>
> ### disassembleHangul
>
> ```typescript
> disassembleHangul(str: string): string
> ```
>
> 문자열의 한글을 자모로 분해해 이어 붙인 문자열을 반환합니다. 한글이 아닌 문자와 공백은 그대로 둡니다.
>
> ```typescript
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
> disassembleHangul('ㄵ'); // 'ㄴㅈ'
> disassembleHangul('ㅘ'); // 'ㅗㅏ'
> ```
>
> ### disassembleHangulToGroups
>
> ```typescript
> disassembleHangulToGroups(str: string): string[][]
> ```
>
> 글자 하나를 자모 배열 하나로 분해해, 글자 순서대로 담은 배열을 반환합니다.
>
> ```typescript
> disassembleHangulToGroups('값이 비싸다');
> // [
> //   ['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ'],
> //   ['ㅇ', 'ㅣ'],
> //   [' '],
> //   ['ㅂ', 'ㅣ'],
> //   ['ㅆ', 'ㅏ'],
> //   ['ㄷ', 'ㅏ'],
> // ]
> ```
>
> ### hangulIncludes
>
> ```typescript
> hangulIncludes(x: string, y: string): boolean
> ```
>
> `x`와 `y`를 각각 자모로 분해한 뒤, `x`가 `y`를 포함하는지 확인합니다. 마지막 글자를 아직 다 입력하지 않은 검색어도 찾을 수 있습니다.
>
> ```typescript
> hangulIncludes('토스', 'ㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> hangulIncludes('토스', '톱'); // false
> hangulIncludes('프론트엔드', '플'); // true
> ```
>
> ### chosungIncludes
>
> ```typescript
> chosungIncludes(x: string, y: string): boolean
> ```
>
> `y`가 초성으로만 이루어졌을 때, `x`의 초성에 `y`가 포함되는지 확인합니다. `y`에 초성이 아닌 글자가 있으면 `false`를 반환합니다. `x`와 `y`의 공백은 무시합니다.
>
> ```typescript
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('프론트엔드', 'ㅍㅌ'); // false, 초성이 이어지지 않음
> chosungIncludes('프론트엔드', '푸롴트'); // false, 초성만 입력하지 않음
> ```
>
> ### josa
>
> ```typescript
> josa(word: string, josa: JosaOption): string
> josa.pick(word: string, josa: JosaOption): string
> ```
>
> `word`의 마지막 글자에 받침이 있는지 보고 알맞은 조사를 고릅니다. `josa`는 단어 뒤에 조사를 붙여 반환하고, `josa.pick`은 조사만 반환합니다.
>
> `JosaOption`은 다음 중 하나입니다.
>
> `'이/가'` `'을/를'` `'은/는'` `'으로/로'` `'와/과'` `'이나/나'` `'이에/에'`
>
> ```typescript
> josa('샴푸', '이/가'); // '샴푸가'
> josa('칫솔', '이/가'); // '칫솔이'
> josa.pick('칫솔', '을/를'); // '을'
> ```
>
> `'으로/로'`는 `ㄹ` 받침 뒤에서 `로`를 고릅니다.
>
> ```typescript
> josa('바깥', '으로/로'); // '바깥으로'
> josa('지름길', '으로/로'); // '지름길로'
> ```
>
> `'와/과'`는 받침이 없으면 `와`, 있으면 `과`를 고릅니다.
>
> ```typescript
> josa('샴푸', '와/과'); // '샴푸와'
> josa('칫솔', '와/과'); // '칫솔과'
> ```
>
> `word`가 빈 문자열이면 `josa`는 조사를 붙이지 않고 빈 문자열을 반환합니다.
>
> ## 개발
>
> ```bash
> yarn test       # 테스트
> yarn typecheck  # 타입 검사
> yarn build      # dist, esm 빌드
> ```
>
> ## 라이선스
>
> MIT License. Copyright (c) 2021 Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

**근거 판정 실패 이유(판정 모델)**

- chosungIncludes가 'x와 y의 공백을 무시한다'는 주장이 코드와 어긋남. src/chosungIncludes.ts의 isOnlyInitialConsonant(y)가 공백을 초성으로 보지 않아, y에 공백이 있으면 곧바로 false를 반환함

### 글빨 0.4.0 — ✗ 근거 판정 실패

> # @toss/hangul
>
> 한글 문자열을 다루는 TypeScript 함수 모음입니다. 단어의 받침에 맞춰 조사를 붙이고, 글자를 자음·모음으로 분해해서 비교하고, 초성만으로 검색할 수 있습니다.
>
> ```ts
> import { josa, chosungIncludes } from '@toss/hangul';
>
> josa('칫솔', '이/가'); // '칫솔이'
> josa('샴푸', '이/가'); // '샴푸가'
>
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> ```
>
> ## 설치
>
> ```sh
> yarn add @toss/hangul
> # 또는
> npm install @toss/hangul
> ```
>
> CommonJS와 ES 모듈 빌드, 타입 선언을 함께 제공합니다.
>
> ## 사용법
>
> ### 조사 붙이기: `josa`
>
> `josa(word, 조사)`는 단어 마지막 글자의 받침 유무에 따라 알맞은 조사를 붙인 문자열을 돌려줍니다. 조사는 `'이/가'`처럼 받침이 있을 때와 없을 때의 형태를 `/`로 이어 넘깁니다.
>
> ```ts
> import { josa } from '@toss/hangul';
>
> josa('칫솔', '을/를'); // '칫솔을'
> josa('샴푸', '을/를'); // '샴푸를'
>
> josa('칫솔', '은/는'); // '칫솔은'
> josa('샴푸', '은/는'); // '샴푸는'
> ```
>
> 넘길 수 있는 조사는 `'이/가'`, `'을/를'`, `'은/는'`, `'으로/로'`, `'와/과'`, `'이나/나'`, `'이에/에'`입니다.
>
> `'으로/로'`는 `ㄹ` 받침으로 끝나는 단어에 `'로'`를 붙입니다.
>
> ```ts
> josa('바깥', '으로/로'); // '바깥으로'
> josa('내부', '으로/로'); // '내부로'
> josa('지름길', '으로/로'); // '지름길로'
> ```
>
> `'와/과'`는 받침이 없으면 `'와'`, 있으면 `'과'`를 붙입니다.
>
> ```ts
> josa('샴푸', '와/과'); // '샴푸와'
> josa('칫솔', '와/과'); // '칫솔과'
> ```
>
> 단어는 그대로 두고 조사만 필요하면 `josa.pick`을 씁니다.
>
> ```ts
> josa.pick('샴푸', '이/가'); // '가'
> josa.pick('칫솔', '이/가'); // '이'
> ```
>
> 마지막 글자가 완성된 한글이 아니면 받침이 없는 것으로 봅니다. 빈 문자열을 `josa`에 넘기면 빈 문자열을 그대로 돌려줍니다.
>
> ### 초성으로 검색하기: `chosungIncludes`
>
> `chosungIncludes(x, y)`는 `y`가 초성으로만 이루어져 있고 `x`의 초성 열에 들어 있으면 `true`를 돌려줍니다. 두 문자열의 공백은 무시합니다. `y`에 초성이 아닌 글자가 있으면 `false`입니다.
>
> ```ts
> import { chosungIncludes } from '@toss/hangul';
>
> chosungIncludes('프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('00프론트엔드', 'ㅍㄹㅌ'); // true
> chosungIncludes('프론트엔드', 'ㅍㅌ'); // false
> chosungIncludes('프론트엔드', '푸롴트'); // false (초성만 입력하지 않음)
> ```
>
> `'ㅍㅌ'`가 `false`인 까닭은 `'프론트엔드'`의 초성 열이 `'ㅍㄹㅌㅇㄷ'`이어서 `ㅍ` 바로 뒤에 `ㅌ`가 오는 구간이 없기 때문입니다.
>
> ### 자음·모음 단위로 포함 여부 확인하기: `hangulIncludes`
>
> `hangulIncludes(x, y)`는 두 문자열을 자음·모음으로 분해한 뒤 `x`가 `y`를 포함하는지 확인합니다. 그래서 `'토스'`에 `'톳'`이 들어 있는 것처럼, 글자 전체가 아니라 자모 일부만 겹쳐도 포함으로 봅니다.
>
> ```ts
> import { hangulIncludes } from '@toss/hangul';
>
> hangulIncludes('토스', 'ㅌ'); // true
> hangulIncludes('토스', '톳'); // true
> hangulIncludes('토스', '톱'); // false
> hangulIncludes('프론트엔드', '프로'); // true
> ```
>
> 빈 문자열은 어떤 문자열에도 포함됩니다.
>
> ```ts
> hangulIncludes('토스', ''); // true
> ```
>
> ### 자음·모음으로 분해하기: `disassembleHangul`, `disassembleHangulToGroups`
>
> `disassembleHangul`은 문자열을 자음과 모음이 이어진 문자열로 바꿉니다. 겹받침과 이중모음도 낱자로 풀립니다. 한글이 아닌 글자와 공백은 그대로 남습니다.
>
> ```ts
> import { disassembleHangul } from '@toss/hangul';
>
> disassembleHangul('값'); // 'ㄱㅏㅂㅅ'
> disassembleHangul('값이 비싸다'); // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
> disassembleHangul('ㄵ'); // 'ㄴㅈ'
> disassembleHangul('ㅘ'); // 'ㅗㅏ'
> ```
>
> `disassembleHangulToGroups`는 같은 결과를 글자별 배열로 돌려줍니다. 반환 타입은 `string[][]`입니다.
>
> ```ts
> import { disassembleHangulToGroups } from '@toss/hangul';
>
> disassembleHangulToGroups('토스 짱');
> // [['ㅌ', 'ㅗ'], ['ㅅ', 'ㅡ'], [' '], ['ㅉ', 'ㅏ', 'ㅇ']]
> ```
>
> ## 라이선스
>
> MIT. 저작권은 Viva Republica, Inc에 있습니다.

**근거 판정 실패 이유(판정 모델)**

- chosungIncludes 설명의 '두 문자열의 공백은 무시합니다'가 코드와 어긋남: src/chosungIncludes.ts에서 isOnlyInitialConsonant(y)가 공백 제거보다 먼저 실행되어, y에 공백이 있으면 false를 반환한다

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

Y는 첫 사용 예를 앞에 두고 라이선스 종류를 밝힙니다. 함수 설명이 문장으로 자연스럽게 이어지고 필요 없는 섹션도 없습니다. X는 조사 표가 유용하지만 import만 있는 사용법 섹션, '와/과' 규칙의 앞뒤 불일치와 중복, 요청하지 않은 개발 섹션, 종류가 빠진 라이선스 안내가 아쉽습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 글빨 0.4.0 우세

X는 맨 앞에서 무엇을 하는지와 첫 사용 예를 함께 보여 줍니다. 각 함수 설명도 문장으로 자연스럽게 이어지고 반복이 없습니다. Y는 '사용법'이 import 한 줄뿐이고, 조사 표와 예외 목록이 겹치며, 독자에게 필요 없는 개발 섹션이 있습니다. Y의 `hangulIncludes` 경계 일치 설명은 장점이지만 전체 우위를 뒤집을 정도는 아닙니다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.3.0 우세

둘 다 충실하지만, X는 hangulIncludes가 글자 경계를 넘어서도 일치한다는 점을 '틍' 예시로 분명히 설명한다. Y는 '입력 중인 마지막 글자'라는 설명만 있어 같은 예시가 오해를 부를 수 있다. Y는 공백 처리와 완성형이 아닌 마지막 글자 처리 같은 세부를 더 다루지만, 조사 예시를 늘어놓은 부분이 다소 장황하다. 차이가 크지는 않아 X가 약간 우세하다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 차이 없음

둘 다 시작 예시, 설치, 함수별 설명, 라이선스를 잘 갖춘 README다. X는 문단 흐름과 절제가 조금 낫다. Y는 함수 표로 찾아가기 쉽고, `틍`이 일치하는 이유와 쌍자음 처리처럼 독자가 헷갈릴 만한 부분을 더 설명한다. 기준별 차이가 작고 엇갈려서 어느 한쪽이 분명히 낫다고 보기 어렵다.

</details>

