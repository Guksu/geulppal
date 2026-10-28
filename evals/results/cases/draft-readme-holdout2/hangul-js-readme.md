# `hangul-js-readme`

[← README 초안 2차 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 라이브러리 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `e-/Hangul.js` 커밋 `376441b`의 코드(`.`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 한글 자모를 분리·조합하는 라이브러리라는 점
- 설치·불러오는 방법
- 주요 함수와 사용 예

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # Hangul.js
>
> 한글(Korean alphabet)을 다루기 위한 간단한 자바스크립트 라이브러리입니다.
> 한글 문자열을 자모 단위로 분해하고, 자모를 다시 조합하며, 자모 단위로 검색할 수 있습니다.
>
> - 외부 의존성이 없습니다.
> - 브라우저(전역 변수), AMD, CommonJS(Node.js) 환경을 모두 지원합니다.
> - TypeScript 타입 정의(`hangul.d.ts`)를 포함합니다.
> - MIT 라이선스
>
> ## 설치
>
> ### npm
>
> ```bash
> npm install hangul-js
> ```
>
> ### Bower
>
> ```bash
> bower install hangul-js
> ```
>
> ### 직접 사용
>
> `hangul.js` 파일을 내려받아 `<script>` 태그로 불러오면 전역 객체 `Hangul`을 사용할 수 있습니다.
>
> ```html
> <script src="hangul.js"></script>
> <script>
>   console.log(Hangul.disassemble('가나다'));
> </script>
> ```
>
> ## 사용법
>
> ```js
> // Node.js (CommonJS)
> var Hangul = require('hangul-js');
> ```
>
> ```ts
> // TypeScript (esModuleInterop 사용 시)
> import Hangul from 'hangul-js';
>
> // TypeScript (esModuleInterop 미사용 시)
> import Hangul = require('hangul-js');
> ```
>
> AMD 환경에서는 `hangul.js`를 모듈로 등록해 `define`/`require`로 불러올 수 있습니다.
>
> ### 분해와 조합
>
> ```js
> Hangul.disassemble('가나다');
> // ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']
>
> Hangul.disassemble('가나다', true);
> // [['ㄱ', 'ㅏ'], ['ㄴ', 'ㅏ'], ['ㄷ', 'ㅏ']]   (글자별로 묶어서 반환)
>
> Hangul.disassemble('짧은');
> // ['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']   (겹받침도 분해)
>
> Hangul.disassemble('의사');
> // ['ㅇ', 'ㅡ', 'ㅣ', 'ㅅ', 'ㅏ']                (복합 모음도 분해)
>
> Hangul.disassembleToString('가나다');
> // 'ㄱㅏㄴㅏㄷㅏ'
>
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']);
> // '가나다'
>
> Hangul.assemble(['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']);
> // '짧은'
>
> Hangul.assemble(['ㅇ', 'ㅗ', 'ㅌ', 'ㅏ']);
> // '오타'
>
> Hangul.assemble(['ㄱ', 'ㅅ']);
> // 'ㄳ'
> ```
>
> - 한글이 아닌 문자(영문, 숫자, 특수문자 등)는 분해/조합 시 그대로 유지됩니다.
> - `assemble`은 문자열도 받을 수 있으며, 이 경우 먼저 분해한 뒤 다시 조합합니다.
> - `disassemble(null)`은 `Arguments cannot be null` 에러를 던집니다.
>
> ### 검색
>
> 자모 단위로 검색하기 때문에, 아직 완성되지 않은 글자도 찾을 수 있습니다.
>
> ```js
> Hangul.search('도우미', '도움');   // 0   (도우미 → ㄷㅗㅇㅜㅁㅣ, 도움 → ㄷㅗㅇㅜㅁ)
> Hangul.search('달걀', '닭');       // 0
> Hangul.search('도우미', 'ㅜㅁ');   // 3
> Hangul.search('달맞이', 'ㄹ마');   // 2
> Hangul.search('달맞이', 'ㅁㅈ');   // -1  (찾지 못한 경우)
> ```
>
> 같은 검색어로 여러 문자열을 반복해서 검색할 때는 `Searcher`를 사용합니다.
> (주의: `Searcher`는 생성자에 넘긴 문자열을 *검색 대상*이 아니라 *검색어*로 사용합니다.)
>
> ```js
> var searcher = new Hangul.Searcher('닭');
>
> searcher.search('달걀');    // 0
> searcher.search('달구지');  // 0
> searcher.search('닮은');    // -1
> ```
>
> `rangeSearch`는 일치하는 부분이 원본 문자열의 어느 글자 범위에 해당하는지 `[시작, 끝]` 글자 인덱스(양 끝 포함)의 배열로 돌려줍니다.
>
> ```js
> Hangul.rangeSearch('도우미 도움', '도움');
> // [[0, 2], [4, 5]]
> ```
>
> > `rangeSearch`는 검색어를 분해한 뒤 정규식으로 만들어 사용하므로, 검색어에 정규식 특수문자가 들어 있으면 의도와 다르게 동작할 수 있습니다.
>
> ### 문자 판별
>
> 단일 문자(또는 첫 글자)를 검사하는 함수와, 문자열 전체를 검사하는 `~All` 함수가 있습니다.
>
> | 함수 | 문자열 전체 검사 | 설명 |
> | --- | --- | --- |
> | `isHangul(c)` | `isHangulAll(str)` | 완성된 한글 음절(가~힣)인지 확인 |
> | `isComplete(c)` | `isCompleteAll(str)` | `isHangul`과 동일 |
> | `isConsonant(c)` | `isConsonantAll(str)` | 자음(ㄱ, ㄳ 등 겹자음 포함)인지 확인 |
> | `isVowel(c)` | `isVowelAll(str)` | 모음(ㅏ, ㅘ 등 복합 모음 포함)인지 확인 |
> | `isCho(c)` | `isChoAll(str)` | 초성으로 쓸 수 있는 자음인지 확인 |
> | `isJong(c)` | `isJongAll(str)` | 종성(받침)으로 쓸 수 있는 자음인지 확인 |
>
> ```js
> Hangul.isComplete('한');     // true
> Hangul.isComplete('ㄱ');     // false
> Hangul.isConsonant('ㄱ');    // true
> Hangul.isConsonant('한');    // false
> Hangul.isVowel('ㅙ');        // true
> Hangul.isCho('ㄸ');          // true
> Hangul.isJong('ㄸ');         // false (ㄸ은 받침이 될 수 없음)
> ```
>
> ### 받침 확인
>
> 조사 선택(은/는, 이/가 등)에 활용할 수 있습니다.
>
> ```js
> Hangul.endsWithConsonant('각');      // true
> Hangul.endsWithConsonant('가');      // false
> Hangul.endsWithConsonant('abc각');   // true
> Hangul.endsWithConsonant('abc');     // false
>
> Hangul.endsWith('ㄱ', 'ㄱ');         // true
> Hangul.endsWith('가', 'ㄱ');         // false
> ```
>
> `endsWith(string, target)`은 문자열을 분해했을 때 마지막 자모가 `target`과 같은지 확인합니다.
>
> ## API 요약
>
> | 함수 | 별칭 | 반환값 |
> | --- | --- | --- |
> | `disassemble(str, grouped?)` | `d` | `string[]` 또는 `string[][]` (`grouped`가 참일 때) |
> | `disassembleToString(str)` | `ds` | `string` |
> | `assemble(arr)` | `a` | `string` |
> | `search(a, b)` | | `number` (찾지 못하면 `-1`) |
> | `rangeSearch(haystack, needle)` | | `number[][]` |
> | `new Searcher(str)` / `.search(str)` | | `number` |
> | `endsWithConsonant(str)` | | `boolean` |
> | `endsWith(str, target)` | | `boolean` |
> | `isHangul` / `isComplete` / `isConsonant` / `isVowel` / `isCho` / `isJong` | | `boolean` |
> | `isHangulAll` / `isCompleteAll` / `isConsonantAll` / `isVowelAll` / `isChoAll` / `isJongAll` | | `boolean` |
>
> ## 개발
>
> ```bash
> npm install
> npm test        # jshint + qunit
> npx grunt       # jshint, uglify(hangul.min.js 생성), qunit
> ```
>
> 브라우저 테스트는 `test/index.html`, 사용 예시는 `examples/` 디렉터리에서 확인할 수 있습니다.
>
> ## 라이선스
>
> \[MIT](LICENSE) © Jaemin Jo

### 글빨 0.4.0 — ○ 근거 판정 통과

> # Hangul.js
>
> 한글 문자열을 초성·중성·종성 자모로 분해하고 다시 조립하는 JavaScript 라이브러리입니다. 분해한 자모를 기준으로 문자열을 검색하거나 글자 종류를 판별하는 함수도 있습니다.
>
> 한글 한 글자(음절)는 초성, 중성, 종성이 모여 만들어집니다. 이 라이브러리는 `의`의 `ㅢ`나 `닭`의 `ㄺ`처럼 겹모음·겹받침도 낱자로 나눕니다.
>
> ```js
> var Hangul = require('hangul-js');
>
> Hangul.disassemble('가나다');
> // ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']
>
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']);
> // '가나다'
> ```
>
> ## 설치
>
> ```sh
> npm install hangul-js
> ```
>
> 브라우저에서는 `hangul.js`를 불러오면 전역 변수 `Hangul`로 쓸 수 있습니다. AMD 로더가 있으면 AMD 모듈로 등록됩니다. 브라우저 예제는 \[`examples/index.html`](examples/index.html)에 있습니다.
>
> ```html
> <script src="hangul.js"></script>
> ```
>
> ## 사용법
>
> ### 분해와 조립
>
> `Hangul.disassemble(str)`은 문자열을 자모 배열로 바꿉니다. 한글이 아닌 문자는 그대로 둡니다. `null`을 넘기면 `Arguments cannot be null` 오류가 발생합니다.
>
> 두 번째 인자로 `true`를 주면 글자별로 묶은 이차원 배열을 돌려줍니다.
>
> ```js
> Hangul.disassemble('짧은', true);
> // [['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ'], ['ㅇ', 'ㅡ', 'ㄴ']]
> ```
>
> `Hangul.assemble(arr)`는 자모 배열을 문자열로 조립합니다. 문자열을 넘기면 먼저 분해한 뒤 조립합니다. 글자로 합쳐질 수 없는 자모는 낱자로 남습니다.
>
> ```js
> Hangul.assemble(['ㅇ', 'ㅗ', 'ㅌ', 'ㅏ']);
> // '오타'
>
> Hangul.assemble(['ㅈ', 'ㅅ', 'ㅏ']);
> // 'ㅈ사'
> ```
>
> `Hangul.disassembleToString(str)`은 분해한 자모를 이어 붙인 문자열을 돌려줍니다. 문자열이 아닌 값을 넘기면 빈 문자열을 돌려줍니다.
>
> 짧게 쓸 수 있는 별칭이 있습니다.
>
> | 함수 | 별칭 |
> |---|---|
> | `disassemble` | `d` |
> | `disassembleToString` | `ds` |
> | `assemble` | `a` |
>
> ### 자모 단위 검색
>
> `Hangul.search(a, b)`는 `a`에서 `b`를 찾아 위치를 돌려주고, 없으면 `-1`을 돌려줍니다. 두 문자열을 자모로 분해해서 비교하므로 완성되지 않은 글자로도 찾을 수 있습니다. 돌려주는 위치는 `a`의 글자 위치가 아니라 분해한 자모열에서의 위치입니다.
>
> ```js
> Hangul.search('달걀', '닭');     // 0
> Hangul.search('도우미', '도움'); // 0
> Hangul.search('달맞이', 'ㄹ마'); // 2
> Hangul.search('도우미', 'ㅜㅁ'); // 3
> Hangul.search('달맞이', 'ㅁㅈ'); // -1
> ```
>
> `'닭'`을 분해한 `ㄷㅏㄹㄱ`이 `'달걀'`의 자모열 `ㄷㅏㄹㄱㅏㄹ`의 앞부분과 일치하므로 첫 예제는 `0`입니다.
>
> `new Hangul.Searcher(str)`는 찾을 문자열을 미리 분해해 둡니다. 같은 검색어로 여러 문자열을 검사할 때 씁니다. 생성자에 넣는 문자열이 찾을 대상이고, `search()`에 넘기는 문자열이 검색 대상입니다. `Hangul.search(a, b)`와 인자의 역할이 반대입니다.
>
> ```js
> var searcher = new Hangul.Searcher('닭');
>
> searcher.search('달걀');   // 0
> searcher.search('달구지'); // 0
> searcher.search('닮은');   // -1
> ```
>
> `Hangul.rangeSearch(haystack, needle)`은 일치한 부분이 걸친 글자의 범위를 `[시작, 끝]` 배열로 모아 돌려줍니다. 인덱스는 `haystack`의 글자 위치이고 끝 글자를 포함합니다. 일치하는 곳이 없거나 `needle`이 빈 문자열이면 빈 배열입니다.
>
> ```js
> var text = '간장공장공장장';
>
> Hangul.rangeSearch(text, '공장');  // [[2, 3], [4, 5]]
> Hangul.rangeSearch(text, 'ㅇ공ㅈ'); // [[1, 3], [3, 5]]
> Hangul.rangeSearch(text, '');      // []
> ```
>
> `needle`을 정규식으로 만들어 검색하고 대소문자는 구분하지 않습니다. `.`, `(`처럼 정규식에서 뜻이 있는 문자가 들어올 수 있다면 미리 이스케이프하세요.
>
> ### 글자 판별
>
> 한 글자를 검사하는 함수는 문자열을 받으면 첫 글자만 검사합니다. `...All` 함수는 문자열의 모든 글자가 조건을 만족해야 `true`이고, 문자열이 아닌 값에는 `false`를 돌려줍니다. 빈 문자열은 `true`입니다.
>
> | 한 글자 | 문자열 전체 | `true`인 경우 |
> |---|---|---|
> | `isComplete(c)` | `isCompleteAll(str)` | 완성된 한글 음절(`한`). `ㄱ`, `ㅙ`는 `false` |
> | `isHangul(c)` | `isHangulAll(str)` | `isComplete`와 같은 동작 |
> | `isConsonant(c)` | `isConsonantAll(str)` | 자음(`ㄱ`, 겹받침 `ㄳ` 포함) |
> | `isVowel(c)` | `isVowelAll(str)` | 모음(`ㅙ` 포함) |
> | `isCho(c)` | `isChoAll(str)` | 초성이 될 수 있는 자음. `ㄸ`은 `true`, `ㄳ`은 `false` |
> | `isJong(c)` | `isJongAll(str)` | 종성이 될 수 있는 자음. `ㄳ`은 `true`, `ㄸ`은 `false` |
>
> ```js
> Hangul.isComplete('한');       // true
> Hangul.isVowel('ㅙ');          // true
> Hangul.isChoAll('ㄸㄲㅆ');     // true
> Hangul.isJongAll('ㄱㄸ');      // false
> ```
>
> ### 끝소리 검사
>
> `Hangul.endsWithConsonant(str)`은 마지막 글자가 받침이 있는 한글이거나 자음이면 `true`를 돌려줍니다. 받침이 없는 글자와 한글이 아닌 글자는 `false`입니다.
>
> ```js
> Hangul.endsWithConsonant('각');    // true
> Hangul.endsWithConsonant('가');    // false
> Hangul.endsWithConsonant('abc각'); // true
> Hangul.endsWithConsonant('abc');   // false
> ```
>
> 조사를 고를 때 이렇게 쓸 수 있습니다.
>
> ```js
> var josa = Hangul.endsWithConsonant(word) ? '은' : '는';
> ```
>
> `Hangul.endsWith(str, target)`은 `str`을 분해했을 때 마지막 자모가 `target`과 같은지 검사합니다.
>
> ```js
> Hangul.endsWith('각', 'ㄱ'); // true
> Hangul.endsWith('가', 'ㅏ'); // true
> Hangul.endsWith('가', 'ㄱ'); // false
> ```
>
> ## TypeScript
>
> 타입 정의(`hangul.d.ts`)가 패키지에 들어 있습니다. 다만 `endsWith`는 선언되어 있지 않고, `assemble`은 배열만 받는 것으로 선언되어 있습니다(실제로는 문자열도 받습니다).
>
> ## 개발
>
> 의존 패키지를 설치한 뒤 `npm test`를 실행하면 JSHint 검사와 QUnit 테스트(`test/index.html`)가 돌아갑니다. 기본 Grunt 작업(`grunt`)은 검사와 테스트에 더해 `hangul.min.js`를 만듭니다.
>
> ## 라이선스
>
> \[MIT](LICENSE)

### 글빨 0.4.1 — ○ 근거 판정 통과

> # Hangul.js
>
> 한글을 다루는 자바스크립트 라이브러리입니다. 완성된 글자를 초성·중성·종성 자모로 쪼개고, 자모를 다시 글자로 합칩니다. 자모 단위로 문자열을 검색하거나 글자의 종류를 확인하는 함수도 있습니다.
>
> ```js
> Hangul.disassemble('가나다');
> // ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']
>
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']);
> // '가나다'
> ```
>
> ## 설치와 불러오기
>
> ```
> npm install hangul-js
> ```
>
> Node.js에서는 `require`로 불러옵니다.
>
> ```js
> var Hangul = require('hangul-js');
> ```
>
> 브라우저에서는 `hangul.js`를 스크립트로 불러오면 전역 변수 `Hangul`이 생깁니다. AMD 로더가 있으면 AMD 모듈로 불러올 수 있습니다.
>
> ```html
> <script src="hangul.js"></script>
> ```
>
> 타입 정의는 `hangul.d.ts`에 있습니다.
>
> ## 사용법
>
> ### 자모 분해와 조합
>
> `disassemble`은 문자열을 자모 배열로 쪼갭니다. 겹받침과 겹모음도 낱낱의 자모로 풀립니다.
>
> ```js
> Hangul.disassemble('짧은');
> // ['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']
>
> Hangul.disassemble('의사');
> // ['ㅇ', 'ㅡ', 'ㅣ', 'ㅅ', 'ㅏ']
> ```
>
> 두 번째 인자로 `true`를 주면 글자별로 묶은 배열을 돌려줍니다.
>
> ```js
> Hangul.disassemble('비행', true);
> // [['ㅂ', 'ㅣ'], ['ㅎ', 'ㅐ', 'ㅇ']]
> ```
>
> 한글이 아닌 문자는 그대로 남습니다. `disassembleToString`은 쪼갠 자모를 배열이 아니라 하나의 문자열로 이어 돌려줍니다. 문자열이 아닌 값을 넘기면 빈 문자열을 돌려줍니다.
>
> `assemble`은 자모 배열을 글자로 합칩니다. 자모를 이어 붙인 문자열을 넘겨도 됩니다. 합칠 수 없는 자모는 그대로 남습니다.
>
> ```js
> Hangul.assemble(['ㅂ', 'ㅣ', 'ㅎ', 'ㅐ', 'ㅇ']);
> // '비행'
>
> Hangul.assemble(['ㅈ', 'ㅅ', 'ㅏ']);
> // 'ㅈ사'
> ```
>
> `disassemble`은 `d`, `disassembleToString`은 `ds`, `assemble`은 `a`라는 짧은 이름으로도 쓸 수 있습니다.
>
> ### 검색
>
> `search(a, b)`는 `a`에서 `b`를 찾아 위치를 돌려줍니다. 찾지 못하면 `-1`입니다. 둘 다 자모로 쪼갠 뒤 비교하므로 글자 중간에서도 일치합니다.
>
> ```js
> Hangul.search('도우미', '도움');   // 0
> Hangul.search('달걀', '닭');       // 0
> Hangul.search('도우미', 'ㅜㅁ');   // 3
> Hangul.search('달맞이', 'ㅁㅈ');   // -1
> ```
>
> `Searcher`는 생성할 때 넘긴 문자열을 찾을 패턴으로 쪼개 둡니다. `search`에는 패턴을 찾을 대상 문자열을 넘깁니다.
>
> ```js
> var searcher = new Hangul.Searcher('닭');
>
> searcher.search('달걀');    // 0
> searcher.search('달구지');  // 0
> searcher.search('닮은');    // -1
> ```
>
> `rangeSearch(haystack, needle)`은 일치하는 구간마다 `[시작, 끝]` 배열을 돌려줍니다. 시작과 끝은 `haystack`에서 글자의 위치(0부터)이고, 끝 글자도 구간에 들어갑니다. 일치하는 곳이 없거나 `needle`이 빈 문자열이면 빈 배열입니다.
>
> ```js
> var text = '간장공장공장장';
>
> Hangul.rangeSearch(text, '공장');    // [[2, 3], [4, 5]]
> Hangul.rangeSearch(text, 'ㅇ공ㅈ');  // [[1, 3], [3, 5]]
> Hangul.rangeSearch(text, '갠');      // []
> ```
>
> ### 글자 종류 확인
>
> 글자 하나를 확인하는 함수와, 문자열 전체가 조건을 만족하는지 확인하는 `~All` 함수가 짝을 이룹니다. 글자 하나를 확인하는 함수는 문자열을 넘기면 첫 글자만 검사합니다. `~All` 함수는 문자열이 아닌 값을 넘기면 `false`를 돌려줍니다.
>
> | 함수 | 확인하는 것 |
> |---|---|
> | `isComplete(c)`, `isCompleteAll(str)` | 완성된 글자(가~힣). `ㄱ`이나 `ㅙ`처럼 낱자모는 `false` |
> | `isHangul(c)`, `isHangulAll(str)` | `isComplete`, `isCompleteAll`과 같은 동작 |
> | `isConsonant(c)`, `isConsonantAll(str)` | 자음. `ㄳ` 같은 겹자음도 포함 |
> | `isVowel(c)`, `isVowelAll(str)` | 모음. `ㅙ` 같은 겹모음도 포함 |
> | `isCho(c)`, `isChoAll(str)` | 초성이 될 수 있는 자음. `ㄸ`, `ㅃ`, `ㅉ`은 포함하고 `ㄳ` 같은 겹자음은 제외 |
> | `isJong(c)`, `isJongAll(str)` | 종성이 될 수 있는 자음. `ㄳ` 같은 겹받침은 포함하고 `ㄸ`, `ㅃ`, `ㅉ`은 제외 |
>
> ```js
> Hangul.isComplete('한');          // true
> Hangul.isComplete('ㄱ');          // false
> Hangul.isVowelAll('ㅙㅜ');        // true
> Hangul.isChoAll('ㄱㄴㄳ');        // false
> Hangul.isJongAll('ㄳㅄ');         // true
> ```
>
> ### 받침 확인
>
> `endsWithConsonant`는 문자열이 받침 있는 글자나 자음으로 끝나는지 확인합니다. 문자열 대신 문자열 배열도 받습니다.
>
> ```js
> Hangul.endsWithConsonant('각');   // true
> Hangul.endsWithConsonant('가');   // false
> Hangul.endsWithConsonant('abc');  // false
> ```
>
> `endsWith(string, target)`은 문자열을 자모로 쪼갠 마지막 자모가 `target`인지 확인합니다.
>
> ```js
> Hangul.endsWith('각', 'ㄱ');  // true
> Hangul.endsWith('가', 'ㅏ');  // true
> Hangul.endsWith('가', 'ㄱ');  // false
> ```
>
> ### 활용 예: 된소리로 바꾸기
>
> `disassemble`과 `assemble` 사이에서 자모를 바꾸면 글자를 변환할 수 있습니다. 예사소리와 거센소리를 된소리로 바꾸는 예입니다. 브라우저에서 실행해 볼 수 있는 페이지가 `examples/stronger.html`에 있습니다.
>
> ```js
> function stronger(x) {
>   if (x == 'ㄱ' || x == 'ㅋ') return 'ㄲ';
>   if (x == 'ㄷ' || x == 'ㅌ') return 'ㄸ';
>   if (x == 'ㅂ' || x == 'ㅍ') return 'ㅃ';
>   if (x == 'ㅅ') return 'ㅆ';
>   if (x == 'ㅈ' || x == 'ㅊ') return 'ㅉ';
>   return x;
> }
>
> Hangul.assemble(Hangul.disassemble('도레미파솔라시도').map(stronger));
> // '또레미빠쏠라씨또'
> ```
>
> `examples/index.html`에서는 입력한 문장을 자모로 분해하고 다시 조합해 볼 수 있습니다.
>
> ## 알아 둘 점
>
> - `search`와 `Searcher#search`가 돌려주는 위치는 원래 문자열이 아니라 쪼갠 자모 배열을 이어 붙인 문자열 기준입니다. 원래 문자열의 글자 위치가 필요하면 `rangeSearch`를 쓰세요.
> - 검색할 자모는 쪼갠 순서에서 연속해 있어야 합니다. `'달맞이'`에서 `'ㅁㅈ'`를 찾지 못하는 것이 그 예입니다.
> - `rangeSearch`는 `needle`을 쪼갠 문자열로 정규식(`new RegExp(..., 'gi')`)을 만들어 찾습니다. 그래서 `needle`의 `.`, `(` 같은 정규식 특수 문자는 정규식 문법으로 해석되고, 영문 대소문자는 구분하지 않습니다.
> - `disassemble(null)`은 `Arguments cannot be null` 오류를 던집니다.
> - `hangul.d.ts`에는 `endsWith`의 타입이 선언되어 있지 않습니다.
>
> ## 개발
>
> 의존 패키지를 설치한 뒤 `npm test`를 실행하면 `grunt test`가 JSHint 검사와 QUnit 테스트(`test/index.html`)를 차례로 실행합니다.
>
> ## 라이선스
>
> MIT 라이선스입니다. 저작권 표기는 `Copyright (c) 2012-2020 Jaemin Jo`이고, 전문은 `LICENSE` 파일에 있습니다. 저장소는 https://github.com/e-/Hangul.js 입니다.

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # Hangul.js
>
> 한글(Korean alphabet)을 다루기 위한 간단한 자바스크립트 라이브러리입니다.
> 음절을 자모 단위로 분해하고, 자모를 다시 음절로 조합하며, 초성 검색과 같은 한글 특유의 검색 기능과 글자 종류 판별 기능을 제공합니다.
>
> - 의존성 없음
> - 브라우저(전역 변수 `Hangul`), Node.js(CommonJS), AMD 모두 지원
> - TypeScript 타입 정의(`hangul.d.ts`) 포함
>
> ## 설치
>
> ### npm
>
> ```bash
> npm install hangul-js
> ```
>
> ### Bower
>
> ```bash
> bower install hangul-js
> ```
>
> ### 직접 사용
>
> `hangul.js` 파일을 내려받아 `<script>`로 불러옵니다.
>
> ## 사용법
>
> ### Node.js
>
> ```js
> var Hangul = require('hangul-js');
>
> Hangul.disassemble('가나다');
> // ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']
> ```
>
> ### TypeScript
>
> ```ts
> import Hangul = require('hangul-js');
>
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']); // '가나다'
> ```
>
> ### 브라우저
>
> ```html
> <script src="hangul.js"></script>
> <script>
>   Hangul.disassemble('가나다');
> </script>
> ```
>
> AMD 환경에서는 `define`/`require`를 통해 불러올 수 있습니다.
>
> ## API
>
> ### 분해와 조합
>
> #### `Hangul.disassemble(str[, grouped])` (별칭: `Hangul.d`)
>
> 문자열을 자모 배열로 분해합니다. 겹받침과 복합 모음도 단일 자모로 풀어 줍니다.
> 한글이 아닌 문자는 그대로 유지됩니다. `grouped`가 참이면 음절별로 묶은 2차원 배열을 반환합니다.
> `null`을 넘기면 `Arguments cannot be null` 에러가 발생합니다.
>
> ```js
> Hangul.disassemble('비행');
> // ['ㅂ', 'ㅣ', 'ㅎ', 'ㅐ', 'ㅇ']
>
> Hangul.disassemble('짧은');
> // ['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']   (겹받침 ㄼ → ㄹ, ㅂ)
>
> Hangul.disassemble('의사');
> // ['ㅇ', 'ㅡ', 'ㅣ', 'ㅅ', 'ㅏ']              (복합 모음 ㅢ → ㅡ, ㅣ)
>
> Hangul.disassemble('짧은', true);
> // [['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ'], ['ㅇ', 'ㅡ', 'ㄴ']]
>
> Hangul.disassemble('AB삵e$');
> // ['A', 'B', 'ㅅ', 'ㅏ', 'ㄹ', 'ㄱ', 'e', '$']
> ```
>
> #### `Hangul.disassembleToString(str)` (별칭: `Hangul.ds`)
>
> `disassemble`의 결과를 하나의 문자열로 이어서 반환합니다. 문자열이 아닌 값을 넘기면 빈 문자열을 반환합니다.
>
> ```js
> Hangul.disassembleToString('가나다'); // 'ㄱㅏㄴㅏㄷㅏ'
> ```
>
> #### `Hangul.assemble(arr)` (별칭: `Hangul.a`)
>
> 자모 배열을 음절로 조합합니다. 문자열을 넘기면 먼저 분해한 뒤 다시 조합합니다.
> 조합할 수 없는 자모는 그대로 남습니다.
>
> ```js
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']);
> // '가나다'
>
> Hangul.assemble(['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ', 'ㄱ', 'ㅗ', 'ㄱ', 'ㅣ']);
> // '닭고기'
>
> Hangul.assemble(['ㄱ', 'ㅅ']);       // 'ㄳ'
> Hangul.assemble(['ㅗ', 'ㅐ']);       // 'ㅙ'
> Hangul.assemble(['ㅈ', 'ㅅ', 'ㅏ']); // 'ㅈ사'
> ```
>
> ### 검색
>
> #### `Hangul.search(a, b)`
>
> `a`와 `b`를 각각 자모 단위로 분해한 뒤, `a` 안에서 `b`가 처음 나타나는 위치(자모 기준 인덱스)를 반환합니다. 없으면 `-1`입니다.
> 받침이 다음 글자의 초성처럼 쓰이는 입력 도중의 검색어도 찾을 수 있습니다.
>
> ```js
> Hangul.search('도우미', '도움');   // 0   (도움 → ㄷㅗㅇㅜㅁ, 도우미 → ㄷㅗㅇㅜㅁㅣ)
> Hangul.search('달걀', '닭');      // 0
> Hangul.search('도우미', 'ㅜㅁ');  // 3
> Hangul.search('달맞이', 'ㄹ마');  // 2
> Hangul.search('달맞이', 'ㅁㅈ');  // -1
> ```
>
> #### `Hangul.rangeSearch(haystack, needle)`
>
> `haystack`에서 `needle`과 일치하는 모든 구간을 찾아, **원본 문자열 기준** `[시작 인덱스, 끝 인덱스]` 쌍의 배열로 반환합니다(끝 인덱스 포함). 검색 결과를 하이라이트할 때 유용합니다.
> `needle`이 빈 문자열이면 빈 배열을 반환합니다.
>
> ```js
> var text = '간장공장공장장';
>
> Hangul.rangeSearch(text, '장');      // [[1, 1], [3, 3], [5, 5], [6, 6]]
> Hangul.rangeSearch(text, '공장');    // [[2, 3], [4, 5]]
> Hangul.rangeSearch(text, 'ㅏㅇㄱ');  // [[1, 2], [3, 4]]
> Hangul.rangeSearch(text, 'ㅇ공ㅈ');  // [[1, 3], [3, 5]]
> Hangul.rangeSearch(text, '갠');      // []
> ```
>
> > **참고:** `needle`은 정규식으로 만들어 사용되므로 `.`, `*`, `(` 같은 정규식 특수문자가 포함된 사용자 입력을 넘길 때는 미리 이스케이프하세요. 또한 대소문자를 구분하지 않고 검색합니다.
>
> #### `new Hangul.Searcher(str)`
>
> 검색어를 한 번만 분해해 두고 여러 문자열에 반복 검색할 때 사용합니다. 생성자에 **검색어**를 넘기고, `search()`에 **검색 대상**을 넘깁니다.
> `search()`는 `Hangul.search`와 마찬가지로 일치하는 위치 또는 `-1`을 반환합니다.
>
> ```js
> var searcher = new Hangul.Searcher('닭');
>
> searcher.search('달걀');   // 0
> searcher.search('달구지'); // 0
> searcher.search('닮은');   // -1
> ```
>
> ### 글자 판별
>
> 각 함수는 문자 하나(또는 유니코드 값)를 받아 `boolean`을 반환합니다. `...All` 버전은 문자열의 **모든** 문자가 조건을 만족해야 `true`입니다. 문자열이 아닌 값은 `false`입니다.
>
> | 함수 | `...All` 버전 | 설명 |
> | --- | --- | --- |
> | `isComplete(c)` | `isCompleteAll(str)` | 완성된 음절인가 (`한`: true, `ㄱ`·`ㅙ`·`a`: false) |
> | `isHangul(c)` | `isHangulAll(str)` | 완성된 한글 음절인가 (`isComplete`와 동일) |
> | `isConsonant(c)` | `isConsonantAll(str)` | 자음인가 (`ㄳ` 같은 겹자음 포함) |
> | `isVowel(c)` | `isVowelAll(str)` | 모음인가 (`ㅙ` 같은 복합 모음 포함) |
> | `isCho(c)` | `isChoAll(str)` | 초성으로 쓸 수 있는 자음인가 (`ㄱ`: true, `ㄳ`: false) |
> | `isJong(c)` | `isJongAll(str)` | 종성(받침)으로 쓸 수 있는 자음인가 (`ㄳ`: true, `ㄸ`: false) |
>
> ```js
> Hangul.isComplete('한');      // true
> Hangul.isComplete('ㄱ');      // false
> Hangul.isConsonant('ㄱ');     // true
> Hangul.isConsonant('한');     // false
> Hangul.isVowel('ㅙ');         // true
> Hangul.isHangulAll('한글');   // true
> Hangul.isHangulAll('한글!');  // false
> ```
>
> ### 받침 확인
>
> #### `Hangul.endsWithConsonant(str)`
>
> 문자열이 자음(받침 있는 음절 또는 낱자음)으로 끝나는지 확인합니다. 조사 `은/는`, `이/가`, `을/를` 등을 고를 때 유용합니다.
>
> ```js
> Hangul.endsWithConsonant('각');     // true
> Hangul.endsWithConsonant('가');     // false
> Hangul.endsWithConsonant('abc각');  // true
> Hangul.endsWithConsonant('abc');    // false
>
> function josa(word) {
>   return word + (Hangul.endsWithConsonant(word) ? '은' : '는');
> }
> josa('책');   // '책은'
> josa('나무'); // '나무는'
> ```
>
> #### `Hangul.endsWith(str, target)`
>
> 문자열의 **마지막 자모**가 `target`과 같은지 확인합니다.
>
> ```js
> Hangul.endsWith('각', 'ㄱ');   // true
> Hangul.endsWith('가', 'ㅏ');   // true
> Hangul.endsWith('가', 'ㄱ');   // false
> Hangul.endsWith('abc', 'c');   // true
> ```
>
> ## 개발
>
> ```bash
> npm install
> npm test          # jshint + qunit
> npx grunt         # jshint + uglify(hangul.min.js 생성) + qunit
> ```
>
> 테스트는 `test/index.html`을 브라우저에서 열어서도 실행할 수 있습니다. 예제는 `examples/` 디렉터리에 있습니다.
>
> ## 라이선스
>
> \[MIT](LICENSE) © Jaemin Jo

**근거 판정 실패 이유(판정 모델)**

- 소개 문장의 '초성 검색' 기능 주장이 코드와 어긋난다(contradicted). search, rangeSearch, Searcher는 모두 자모 분해 후 부분 문자열 일치만 하고, 초성만으로 하는 검색은 지원하지 않는다.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # Hangul.js
>
> 한글 문자열을 자음·모음(자모) 단위로 분해하고 다시 조합하는 JavaScript 라이브러리입니다. 자모 단위로 문자열을 검색하거나, 문자가 초성·중성·종성인지 확인하는 함수도 있습니다.
>
> 한글 음절은 초성, 중성, 종성으로 이루어집니다. `disassemble`은 음절을 이 자모로 풀어 주고, `assemble`은 자모 배열을 음절로 합칩니다.
>
> ```js
> Hangul.disassemble('가나다');
> // ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']
>
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']);
> // '가나다'
> ```
>
> ## 설치
>
> ```sh
> npm install hangul-js
> ```
>
> Node.js에서는 `require`로 불러옵니다.
>
> ```js
> var Hangul = require('hangul-js');
> ```
>
> 브라우저에서는 `hangul.js`를 `<script>`로 불러오면 전역 변수 `Hangul`이 생깁니다. AMD 로더가 있으면 `define`으로 등록되고, CommonJS 환경에서는 `module.exports`로 내보냅니다.
>
> ```html
> <script src="hangul.js"></script>
> ```
>
> TypeScript 타입 선언은 `hangul.d.ts`에 있습니다.
>
> ## 사용법
>
> ### 분해와 조합
>
> `disassemble(str, grouped)`는 문자열을 자모 배열로 바꿉니다. 겹받침(`ㄺ`)과 복합 모음(`ㅘ`)은 기본 자모 둘로 나뉘고, 한글이 아닌 문자는 그대로 둡니다. `grouped`를 `true`로 주면 음절별로 묶은 배열을 돌려줍니다. 인자가 `null`이면 `'Arguments cannot be null'` 오류가 납니다.
>
> ```js
> Hangul.disassemble('짧은');
> // ['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']
>
> Hangul.disassemble('닭고기', true);
> // [['ㄷ', 'ㅏ', 'ㄹ', 'ㄱ'], ['ㄱ', 'ㅗ'], ['ㄱ', 'ㅣ']]
> ```
>
> `disassembleToString(str)`은 분해한 자모를 이어 붙인 문자열을 돌려줍니다. 문자열이 아닌 값을 주면 빈 문자열을 돌려줍니다.
>
> `assemble(array)`은 자모 배열을 음절로 조합합니다. 배열 대신 문자열을 주면 먼저 분해한 뒤 조합합니다. 자모의 앞뒤 위치를 보고 받침과 다음 글자의 초성을 가르며, 조합할 수 없는 자모는 그대로 남습니다.
>
> ```js
> Hangul.assemble(['ㅇ', 'ㅗ', 'ㅌ', 'ㅏ']);
> // '오타'
>
> Hangul.assemble(['ㅃ', 'ㅉ', 'ㅏ', 'ㄸ']);
> // 'ㅃ짜ㄸ'
> ```
>
> 짧은 이름도 쓸 수 있습니다: `d`는 `disassemble`, `ds`는 `disassembleToString`, `a`는 `assemble`과 같습니다.
>
> ### 검색
>
> `search(a, b)`는 `a`와 `b`를 모두 분해한 뒤 `a`에서 `b`가 처음 나오는 위치를 돌려줍니다. 없으면 `-1`입니다. 위치는 원래 문자열의 글자 번호가 아니라 분해한 자모 배열의 번호입니다.
>
> ```js
> Hangul.search('도우미', '도움');   // 0
> Hangul.search('도우미', 'ㅜㅁ');   // 3
> Hangul.search('달맞이', 'ㅁㅈ');   // -1
> ```
>
> `Hangul.Searcher`는 찾을 문자열을 한 번만 분해해 두고 여러 문자열에서 검색합니다. 생성자에 찾을 문자열을, `search`에 검색 대상 문자열을 넘깁니다.
>
> ```js
> var searcher = new Hangul.Searcher('닭');
>
> searcher.search('달걀');  // 0
> searcher.search('닮은');  // -1
> ```
>
> `rangeSearch(haystack, needle)`는 `needle`이 나타나는 모든 구간을 `haystack`의 글자 번호 `[시작, 끝]`으로 돌려줍니다. 시작과 끝 글자를 모두 포함하고, 일치하는 곳이 없거나 `needle`이 빈 문자열이면 빈 배열입니다. 음절의 일부만 일치해도 그 음절이 구간에 들어갑니다.
>
> ```js
> var text = '간장공장공장장';
>
> Hangul.rangeSearch(text, '공장');   // [[2, 3], [4, 5]]
> Hangul.rangeSearch(text, 'ㅇ공ㅈ'); // [[1, 3], [3, 5]]
> ```
>
> ### 글자 확인
>
> 아래 함수는 글자 하나를 받아 `true`나 `false`를 돌려줍니다. 문자열을 주면 첫 글자를 검사합니다. 이름 끝에 `All`이 붙은 함수는 문자열의 모든 글자가 조건을 만족하는지 검사하며, 문자열이 아닌 값에는 `false`를 돌려줍니다.
>
> | 함수 | 전체 검사 | 참인 경우 |
> |---|---|---|
> | `isComplete(c)` | `isCompleteAll(str)` | 완성된 음절(`가`~`힣`) |
> | `isHangul(c)` | `isHangulAll(str)` | `isComplete`와 같음 |
> | `isConsonant(c)` | `isConsonantAll(str)` | 자음(`ㄱ`, `ㄳ` 등) |
> | `isVowel(c)` | `isVowelAll(str)` | 모음(`ㅏ`, `ㅙ` 등) |
> | `isCho(c)` | `isChoAll(str)` | 초성으로 쓸 수 있는 자음(`ㄸ`은 참, `ㄳ`은 거짓) |
> | `isJong(c)` | `isJongAll(str)` | 종성으로 쓸 수 있는 자음(`ㄳ`은 참, `ㄸ`은 거짓) |
>
> ```js
> Hangul.isComplete('한');         // true
> Hangul.isComplete('ㄱ');         // false
> Hangul.isConsonantAll('ㅎㄱ');   // true
> Hangul.isCompleteAll('한글a');   // false
> ```
>
> `endsWithConsonant(str)`은 문자열이 받침이 있는 글자나 자음으로 끝나는지 확인합니다. `endsWith(str, target)`은 분해한 문자열의 마지막 자모가 `target`과 같은지 확인합니다.
>
> ```js
> Hangul.endsWithConsonant('각');       // true
> Hangul.endsWithConsonant('abc각');    // true
> Hangul.endsWithConsonant('가');       // false
>
> Hangul.endsWith('가', 'ㅏ');          // true
> Hangul.endsWith('각', 'ㄱ');          // true
> ```
>
> ## 주의할 점
>
> - `rangeSearch`는 `needle`을 정규식 패턴으로 만들어 대소문자를 구분하지 않고 검색합니다. `needle`에 정규식 특수 문자가 있으면 문자 그대로 찾지 않습니다.
> - `search`가 돌려주는 위치는 분해한 자모 기준입니다. 원래 문자열에서 구간을 얻으려면 `rangeSearch`를 쓰세요.
>
> ## 예제
>
> - `examples/index.html`: 입력한 문장을 자모로 분해하고, 자모를 문장으로 조합합니다.
> - `examples/stronger.html`: 문장을 분해해 예사소리와 거센소리를 된소리로 바꾼 뒤 다시 조합합니다.
>
> ## 개발
>
> 테스트는 JSHint와 QUnit을 Grunt로 실행합니다.
>
> ```sh
> npm install
> npm test
> ```
>
> ## 라이선스
>
> MIT 라이선스입니다. 전문은 `LICENSE`에 있습니다.

### 글빨 0.4.1 — ○ 근거 판정 통과

> # Hangul.js
>
> 한글 문자열을 자모 단위로 분해하고 다시 조합하는 JavaScript 라이브러리입니다. 분해한 자모로 문자열을 검색하거나 글자의 종류를 판별하는 함수도 있습니다.
>
> 한글 한 글자는 초성, 중성, 종성이 모여 이루어집니다. 종성의 `ㄼ`이나 중성의 `ㅘ`처럼 자음이나 모음 둘이 합쳐진 경우도 있습니다. `disassemble`은 이런 글자를 단일 자모까지 풀어 줍니다.
>
> ```js
> Hangul.disassemble('짧은');
> // ['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']
>
> Hangul.assemble(['ㅉ', 'ㅏ', 'ㄹ', 'ㅂ', 'ㅇ', 'ㅡ', 'ㄴ']);
> // '짧은'
> ```
>
> ## 설치와 불러오기
>
> ```
> npm install hangul-js
> ```
>
> Node.js에서는 `require`로 불러옵니다.
>
> ```js
> var Hangul = require('hangul-js');
> ```
>
> 브라우저에서는 `hangul.js`를 `<script>`로 불러오면 전역 변수 `Hangul`이 생깁니다. AMD 로더가 있으면 AMD 모듈로 등록됩니다. TypeScript용 타입 정의(`hangul.d.ts`)가 패키지에 들어 있습니다.
>
> ```html
> <script src="hangul.js"></script>
> ```
>
> ## 사용법
>
> ### 분해: `disassemble`
>
> 문자열을 자모 배열로 바꿉니다. 한글이 아닌 문자는 그대로 둡니다. `ㄳ`, `ㅙ` 같은 낱글자 겹자음·복합모음도 단일 자모로 풀립니다.
>
> ```js
> Hangul.disassemble('가나다');
> // ['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']
>
> Hangul.disassemble('ㅙ');
> // ['ㅗ', 'ㅐ']
> ```
>
> 두 번째 인자에 `true`를 주면 글자별로 묶은 배열을 돌려줍니다.
>
> ```js
> Hangul.disassemble('비행', true);
> // [['ㅂ', 'ㅣ'], ['ㅎ', 'ㅐ', 'ㅇ']]
> ```
>
> 문자열 배열을 넘기면 하나로 이어 붙인 뒤 분해합니다. `null`을 넘기면 `Arguments cannot be null` 오류가 납니다. 짧은 이름 `Hangul.d`도 쓸 수 있습니다.
>
> 결과를 배열이 아닌 문자열로 받으려면 `disassembleToString`(별칭 `Hangul.ds`)을 씁니다. `disassemble(...).join('')`과 같은 결과를 돌려주며, 문자열이 아닌 값을 넘기면 빈 문자열을 돌려줍니다.
>
> ### 조합: `assemble`
>
> 자모 배열을 글자로 조합합니다. 문자열을 넘기면 먼저 분해한 뒤 조합합니다. 짧은 이름은 `Hangul.a`입니다.
>
> ```js
> Hangul.assemble(['ㄱ', 'ㅏ', 'ㄴ', 'ㅏ', 'ㄷ', 'ㅏ']);
> // '가나다'
>
> Hangul.assemble(['ㅇ', 'ㅗ', 'ㅌ', 'ㅏ']);
> // '오타'
> ```
>
> 글자로 조합할 수 없는 자모는 낱자모로 남습니다.
>
> ```js
> Hangul.assemble(['ㅈ', 'ㅅ', 'ㅏ']);
> // 'ㅈ사'
> ```
>
> 완성형 한글 11,172자를 모두 `assemble(disassemble(...))`에 통과시켜 원래 문자열과 같은지 테스트합니다.
>
> `disassemble`과 `assemble` 사이에 자모 하나씩 바꾸는 함수를 끼우면 글자를 변형할 수 있습니다. 예를 들어 \[examples/stronger.html](examples/stronger.html)은 예사소리와 거센소리를 된소리로 바꿉니다.
>
> ```js
> function stronger(x) {
>   if (x == 'ㄱ' || x == 'ㅋ') return 'ㄲ';
>   if (x == 'ㄷ' || x == 'ㅌ') return 'ㄸ';
>   if (x == 'ㅂ' || x == 'ㅍ') return 'ㅃ';
>   if (x == 'ㅅ') return 'ㅆ';
>   if (x == 'ㅈ' || x == 'ㅊ') return 'ㅉ';
>   return x;
> }
>
> Hangul.assemble(Hangul.disassemble(input).map(stronger));
> ```
>
> ### 검색: `search`, `Searcher`, `rangeSearch`
>
> `search(a, b)`는 두 문자열을 자모로 분해해서 `a`에서 `b`가 처음 나오는 위치를 돌려줍니다. 없으면 `-1`입니다. 글자 단위가 아니라 자모 단위로 비교하므로, 완성되지 않은 글자나 받침만 있는 검색어로도 찾을 수 있습니다.
>
> ```js
> Hangul.search('도우미', '도움');  // 0
> Hangul.search('달걀', '닭');      // 0
> Hangul.search('도우미', 'ㅜㅁ');  // 3
> Hangul.search('달맞이', 'ㄹ마');  // 2
> Hangul.search('달맞이', 'ㅁㅈ');  // -1
> ```
>
> 반환값은 분해한 자모열 안의 위치입니다. 원래 문자열의 글자 위치가 필요하면 `rangeSearch`를 씁니다.
>
> `Searcher`는 검색어를 한 번만 분해해 두고 여러 문자열에서 찾을 때 씁니다. 생성자에 검색어를 넘기고, `search`에 찾아볼 문자열을 넘깁니다.
>
> ```js
> var searcher = new Hangul.Searcher('닭');
>
> searcher.search('달걀');    // 0
> searcher.search('달구지');  // 0
> searcher.search('닮은');    // -1
> ```
>
> `rangeSearch(haystack, needle)`는 `needle`과 일치하는 구간을 `haystack`의 글자 위치 `[시작, 끝]`(끝 글자 포함)으로 돌려줍니다. 일치하는 곳이 여러 군데면 구간을 모두 담고, 없거나 `needle`이 빈 문자열이면 빈 배열을 돌려줍니다. 구간의 첫 글자와 끝 글자는 일부 자모만 일치해도 포함됩니다.
>
> ```js
> var text = '간장공장공장장';
>
> Hangul.rangeSearch(text, '장');      // [[1, 1], [3, 3], [5, 5], [6, 6]]
> Hangul.rangeSearch(text, '공장');    // [[2, 3], [4, 5]]
> Hangul.rangeSearch(text, 'ㅏㅇㄱ');  // [[1, 2], [3, 4]]
> Hangul.rangeSearch(text, 'ㅇ공ㅈ');  // [[1, 3], [3, 5]]
> Hangul.rangeSearch(text, '갠');      // []
> ```
>
> `rangeSearch`는 `needle`을 분해한 문자열로 대소문자를 구분하지 않는 정규식(`gi`)을 만들어 검색합니다. 정규식에서 의미가 있는 문자(`.`, `*`, `(` 등)가 `needle`에 들어 있으면 문자 그대로 찾지 않습니다.
>
> ### 받침 확인: `endsWithConsonant`, `endsWith`
>
> `endsWithConsonant(string)`은 문자열이 받침이 있는 글자나 자음으로 끝나면 `true`입니다. 배열도 받습니다.
>
> ```js
> Hangul.endsWithConsonant('각');     // true
> Hangul.endsWithConsonant('가');     // false
> Hangul.endsWithConsonant('abc각');  // true
> Hangul.endsWithConsonant('abc');    // false
> ```
>
> `endsWith(string, target)`은 `string`을 분해했을 때 마지막 자모가 `target`이면 `true`입니다.
>
> ```js
> Hangul.endsWith('각', 'ㄱ');  // true
> Hangul.endsWith('가', 'ㅏ');  // true
> Hangul.endsWith('가', 'ㄱ');  // false
> Hangul.endsWith('abc', 'c');  // true
> ```
>
> ### 글자 종류 판별
>
> 글자 하나를 검사하는 함수와, 문자열의 모든 글자를 검사하는 `...All` 함수가 짝을 이룹니다. 글자용 함수에 문자열을 넘기면 첫 글자만 검사합니다. `...All` 함수는 문자열이 아닌 값을 받으면 `false`를 돌려줍니다.
>
> | 함수 | `true`가 되는 경우 |
> |---|---|
> | `isComplete`, `isHangul` / `isCompleteAll`, `isHangulAll` | 완성된 한글 글자(`가`~`힣`) |
> | `isConsonant` / `isConsonantAll` | 자음. `ㄳ` 같은 겹자음 포함 |
> | `isVowel` / `isVowelAll` | 모음. `ㅙ` 같은 복합모음 포함 |
> | `isCho` / `isChoAll` | 초성이 될 수 있는 자음 |
> | `isJong` / `isJongAll` | 종성이 될 수 있는 자음. 겹받침 포함, `ㄸ`·`ㅃ`·`ㅉ` 제외 |
>
> ```js
> Hangul.isComplete('한');          // true
> Hangul.isComplete('ㅙ');          // false
> Hangul.isCompleteAll('한글a');    // false
> Hangul.isConsonantAll('ㅎㄱ');    // true
> Hangul.isVowelAll('ㅙㅜ');        // true
> Hangul.isChoAll('ㄱㄴㄳ');        // false
> Hangul.isJongAll('ㄳㅄ');         // true
> ```
>
> ## 예제
>
> `examples` 폴더에 브라우저에서 열어 볼 수 있는 예제가 있습니다.
>
> - `examples/index.html`: 입력한 문장을 자모로 분해하거나 자모를 문장으로 조합합니다.
> - `examples/stronger.html`: 문장 속 예사소리와 거센소리를 된소리로 바꿉니다.
>
> ## 알려진 한계
>
> - 타입 정의 `hangul.d.ts`에 `endsWith`가 선언되어 있지 않습니다. TypeScript에서 쓰려면 직접 선언을 보태야 합니다.
>
> ## 개발
>
> `npm test`는 `grunt test`를 실행해 jshint와 QUnit 테스트(`test/index.html`)를 돌립니다. `grunt` 기본 작업은 jshint, uglify, qunit을 차례로 실행하며 uglify 단계에서 `hangul.min.js`를 만듭니다.
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](LICENSE)를 참고하세요. 프로젝트 주소는 <https://github.com/e-/Hangul.js>입니다.

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.1 | 글빨 0.4.1 우세 |
| 2 | 글빨 없음 vs 글빨 0.4.1 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.4.0 vs 글빨 0.4.1 | 글빨 0.4.0 우세 |
| 2 | 글빨 0.4.0 vs 글빨 0.4.1 | 차이 없음 |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.1) → 글빨 0.4.1 우세

Y는 설명이 문장으로 이어지고, search 위치의 기준, rangeSearch가 대소문자를 구분하지 않는 점, 정규식 특수 문자 문제 같은 실사용 함정을 '알아 둘 점'에 정리했습니다. X는 search 예제에서 3, 2 같은 값을 보여 주면서도 그 위치를 무엇 기준으로 세는지 설명하지 않아 오해할 여지가 있고, 끝의 API 요약표가 앞 내용을 반복합니다. X는 설치 방법(Bower, TypeScript import)이 더 풍부하지만, 전체적으로는 Y가 그대로 올리기에 더 좋은 README입니다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 없음) → 글빨 0.4.1 우세

X는 실수하기 쉬운 동작(search 위치의 기준, 정규식 특수 문자, 대소문자 무시)을 정확히 짚고, 설명이 문장으로 이어진다. Y는 범위가 넓지만 API 요약 표가 앞선 내용을 반복하고, search가 돌려주는 위치의 기준 같은 핵심 동작 설명이 빠졌다.

</details>

<details><summary>1회차 글빨 0.4.0 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.4.1) → 글빨 0.4.0 우세

두 결과 모두 그대로 올려도 될 만한 수준입니다. 그래도 X를 권합니다. X는 주의할 점(search가 돌려주는 위치의 기준, 정규식 특수 문자, null 오류)을 해당 함수 설명 안에 두어서 독자가 필요한 자리에서 바로 읽을 수 있습니다. 시작 예제에 require도 들어 있고, 분량도 라이브러리 크기에 맞습니다. Y는 된소리 예제와 라이선스 세부 사항 같은 덤 정보가 있습니다. 하지만 주의 사항을 끝에 따로 모으고 같은 예를 반복해서 흐름이 덜 매끄럽습니다. 차이는 크지 않지만 X 쪽이 조금 낫습니다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

두 결과는 구성과 정확도가 비슷합니다. Y는 search 위치 기준, Searcher 인자 역할, 정규식 이스케이프, TypeScript 선언 차이처럼 헷갈리기 쉬운 점을 해당 함수 옆에서 바로 설명합니다. 조사 선택 예도 있어 쓰임새를 알기 쉽습니다. X는 이런 주의 사항을 끝에 모아 두어 예제를 읽을 때 바로 이해하기 어렵습니다. 대신 X의 라이선스 정보가 더 자세합니다.

</details>

<details><summary>2회차 글빨 0.4.0 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.4.1) → 차이 없음

X는 간결하고 분량이 알맞으며, 판별 함수 표와 주의 사항을 깔끔하게 정리했다. Y는 함수별 구성과 예시가 더 풍부하고, stronger 변형 예제 코드와 d.ts 누락 경고처럼 실제로 도움이 되는 정보가 있다. 다만 테스트 범위나 grunt 작업 순서 같은 내부 정보가 섞여 조금 길다. 기준별로 우위가 엇갈리고 둘 다 그대로 올릴 수 있는 수준이라 어느 쪽이 분명히 낫다고 보기 어렵다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 0.4.0) → 차이 없음

두 README 모두 용도, 설치, API, 예제, 라이선스를 갖춰 그대로 올려도 될 수준이다. X는 예제가 더 많고 TypeScript 관련 한계를 알려 줘 실용 정보가 조금 더 많은 대신, 테스트·빌드 같은 내부 세부를 담았다. Y는 더 간결하지만 '주의할 점'에서 검색 위치 설명을 되풀이한다. 기준별 우열이 엇갈리고 그 차이도 작아서 어느 쪽이 분명히 낫다고 보기 어렵다.

</details>

