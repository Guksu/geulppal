# `toss-date-readme`

[← README 초안 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/common/date`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 날짜 연산 함수를 제공하는 패키지라는 점
- 주요 함수와 사용 예
- 설치 방법

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/date
>
> 날짜를 다룰 때 자주 쓰는 유틸리티 함수 모음입니다. \[date-fns](https://date-fns.org/)를 기반으로 하며, 한국어 표기에 맞춘 포맷팅과 날짜 간격 텍스트 생성 기능을 제공합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/date
>
> # yarn
> yarn add @toss/date
> ```
>
> ## 사용법
>
> ```ts
> import { kstFormat, getDateDistance, getDateDistanceText } from '@toss/date';
>
> kstFormat(new Date('2020-07-01'), 'yyyy년 M월 d일 EEEE'); // '2020년 7월 1일 수요일'
>
> const distance = getDateDistance(new Date('2020-07-01 12:00:00'), new Date('2020-07-02 13:01:01'));
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
>
> getDateDistanceText(distance); // '1일 1시간 1분 1초'
> ```
>
> ## API
>
> ### `kstFormat(date, format)`
>
> date-fns의 `format`을 한국어(`ko`) 로케일로 호출합니다. 요일, 오전/오후 등이 한국어로 표시됩니다.
>
> - `date`: `number | Date`
> - `format`: \[date-fns 포맷 문자열](https://date-fns.org/docs/format)
> - 반환값: `string`
>
> > 한국어 로케일만 적용하며, 시간대를 KST로 변환하지는 않습니다. 실행 환경의 시간대를 그대로 사용합니다.
>
> ```ts
> kstFormat(new Date(2020, 6, 1), 'PPPP'); // '2020년 7월 1일 수요일'
> ```
>
> ### `parseYYYYMMDD(yyyyMMdd)`
>
> `'2020-04-23'` 형식의 문자열을 `Date`로 변환합니다. 유효하지 않은 날짜라면 `Error('Invalid date format')`을 던집니다.
>
> ```ts
> parseYYYYMMDD('2020-04-23'); // Date
> parseYYYYMMDD('2020-13-02'); // Error: Invalid date format
> parseYYYYMMDD('2020-01-32'); // Error: Invalid date format
> ```
>
> ### `getDateDistance(startDate, endDate)`
>
> 두 `Date`의 차이를 일, 시, 분, 초로 나누어 반환합니다. `endDate`가 `startDate`보다 이르거나 같으면 모든 값이 `0`입니다.
>
> ```ts
> getDateDistance(new Date('2020-07-01 12:00:00'), new Date('2020-07-02 13:01:01'));
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
>
> getDateDistance(new Date('2020-07-02 13:01:01'), new Date('2020-07-01 12:00:00'));
> // { days: 0, hours: 0, minutes: 0, seconds: 0 }
> ```
>
> ### `getDateDistanceText(timeUnits, options?)`
>
> `getDateDistance`가 반환한 `TimeUnits`를 `'1일 1시간 1분 1초'` 같은 문자열로 만듭니다. 기본적으로 값이 `0`인 단위는 표시하지 않습니다.
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `separator` | `string` | `' '` | 단위 사이의 구분자 |
> | `days` | `(timeUnits: TimeUnits) => boolean` | `t => t.days > 0` | `true`를 반환하면 '일'을 표시 |
> | `hours` | `(timeUnits: TimeUnits) => boolean` | `t => t.hours > 0` | `true`를 반환하면 '시간'을 표시 |
> | `minutes` | `(timeUnits: TimeUnits) => boolean` | `t => t.minutes > 0` | `true`를 반환하면 '분'을 표시 |
> | `seconds` | `(timeUnits: TimeUnits) => boolean` | `t => t.seconds > 0` | `true`를 반환하면 '초'를 표시 |
>
> ```ts
> const units = { days: 1, hours: 1, minutes: 1, seconds: 1 };
>
> getDateDistanceText(units); // '1일 1시간 1분 1초'
> getDateDistanceText(units, { separator: '.' }); // '1일.1시간.1분.1초'
> getDateDistanceText(units, { days: () => false }); // '1시간 1분 1초'
> getDateDistanceText({ days: 1, hours: 0, minutes: 0, seconds: 1 }); // '1일 1초'
> ```
>
> 조건 함수를 조합하면 큰 단위가 있을 때 작은 단위를 숨기는 식으로 표시를 조절할 수 있습니다.
>
> ```ts
> const options = {
>   minutes: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.minutes > 0,
>   seconds: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.seconds > 0,
> };
>
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, options); // '1일 1시간'
> getDateDistanceText({ days: 0, hours: 0, minutes: 1, seconds: 1 }, options); // '1분 1초'
> ```
>
> ### `isEqualOrBefore(lhs, rhs)` / `isEqualOrAfter(lhs, rhs)`
>
> - `isEqualOrBefore`: `lhs`가 `rhs`와 같거나 이전이면 `true`
> - `isEqualOrAfter`: `lhs`가 `rhs`와 같거나 이후이면 `true`
>
> ```ts
> isEqualOrBefore(new Date('2020-07-01'), new Date('2020-07-01')); // true
> isEqualOrAfter(new Date('2020-07-01'), new Date('2020-07-02')); // false
> ```
>
> ### `roundUpHoursInDays(hours)`
>
> 시간 값을 24의 배수(일 단위)로 올림합니다. 이미 24의 배수라면 그대로 반환합니다.
>
> ```ts
> roundUpHoursInDays(25); // 48
> roundUpHoursInDays(48); // 48
> ```
>
> ### 타입
>
> - `DateFnsDateType`: `number | Date`
> - `TimeUnits`: `{ days: number; hours: number; minutes: number; seconds: number }`
>
> ## 개발
>
> ```bash
> yarn test       # 테스트(jest) 및 타입 검사
> yarn typecheck  # 타입 검사만 실행
> yarn build      # dist(CJS, 타입 선언)와 esm(ESM) 빌드
> ```
>
> ## 변경 내역
>
> 버전별 변경 사항은 \[CHANGELOG.md](./CHANGELOG.md)를 참고하세요.
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE) 파일을 확인하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/date
>
> 날짜 비교, 파싱, 남은 시간 계산, 한국어 표시를 위한 함수 모음입니다. \[date-fns](https://date-fns.org)를 바탕으로 합니다.
>
> ## 설치
>
> ```bash
> npm install @toss/date
> # 또는
> yarn add @toss/date
> ```
>
> `date-fns`(`^2.25.0`)가 의존성으로 함께 설치됩니다.
>
> ## 사용 예시
>
> ```ts
> import { getDateDistance, getDateDistanceText } from '@toss/date';
>
> const distance = getDateDistance(new Date('2020-07-01 12:00:00'), new Date('2020-07-02 13:01:01'));
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
>
> getDateDistanceText(distance);
> // '1일 1시간 1분 1초'
>
> // 일·시간이 있으면 그 단위만, 없으면 분·초만 보여줍니다.
> getDateDistanceText(distance, {
>   minutes: t => t.days === 0 && t.hours === 0 && t.minutes > 0,
>   seconds: t => t.days === 0 && t.hours === 0 && t.seconds > 0,
> });
> // '1일 1시간'
> ```
>
> ## API
>
> ### `kstFormat(date, format)`
>
> date-fns의 `format`에 한국어 로케일을 적용해 날짜를 문자열로 만듭니다. `date`는 `Date` 또는 타임스탬프(`number`)이고, `format`은 \[date-fns 포맷 문자열](https://date-fns.org/docs/format)입니다.
>
> ```ts
> kstFormat(new Date(2022, 10, 16), 'yyyy년 M월 d일 EEEE');
> // '2022년 11월 16일 수요일'
> ```
>
> ### `parseYYYYMMDD(yyyyMMdd)`
>
> `'2020-04-23'` 같은 문자열을 `Date`로 바꿉니다. 올바른 날짜가 아니면 `Invalid date format` 메시지의 `Error`를 던집니다.
>
> ```ts
> parseYYYYMMDD('2020-04-23'); // 2020년 4월 23일의 Date
> parseYYYYMMDD('2020-13-02'); // Error: Invalid date format
> ```
>
> ### `getDateDistance(startDate, endDate)`
>
> 두 `Date`의 차이를 `{ days, hours, minutes, seconds }`로 반환합니다. `endDate`가 `startDate`와 같거나 더 이르면 값이 모두 0입니다.
>
> ### `getDateDistanceText(timeUnits, options?)`
>
> `getDateDistance`가 반환한 값을 `'1일 1시간 1분 1초'` 같은 문자열로 만듭니다. 기본적으로 값이 0보다 큰 단위만 표시합니다.
>
> | 옵션 | 타입 | 기본값 | 설명 |
> |---|---|---|---|
> | `separator` | `string` | `' '` | 단위 사이의 구분자 |
> | `days` | `(timeUnits) => boolean` | `t => t.days > 0` | `true`를 반환하면 일 단위를 표시 |
> | `hours` | `(timeUnits) => boolean` | `t => t.hours > 0` | `true`를 반환하면 시간 단위를 표시 |
> | `minutes` | `(timeUnits) => boolean` | `t => t.minutes > 0` | `true`를 반환하면 분 단위를 표시 |
> | `seconds` | `(timeUnits) => boolean` | `t => t.seconds > 0` | `true`를 반환하면 초 단위를 표시 |
>
> ```ts
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, { separator: '.' });
> // '1일.1시간.1분.1초'
>
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, { days: () => false });
> // '1시간 1분 1초'
> ```
>
> ### `isEqualOrBefore(lhs, rhs)` / `isEqualOrAfter(lhs, rhs)`
>
> `lhs`가 `rhs`와 같거나 이전(이후)이면 `true`를 반환합니다.
>
> ### `roundUpHoursInDays(hours)`
>
> 시간 수를 24의 배수가 되도록 올림합니다. 이미 24의 배수이면 그대로 반환합니다.
>
> ```ts
> roundUpHoursInDays(25); // 48
> roundUpHoursInDays(48); // 48
> ```
>
> ### 타입
>
> - `DateFnsDateType`: `number | Date`
> - `TimeUnits`: `{ days: number; hours: number; minutes: number; seconds: number }`
>
> ## 라이선스
>
> MIT License © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.0 — ✗ 근거 판정 실패

> # @toss/date
>
> 날짜를 한국어로 포맷하고, 두 날짜를 비교하고, 두 날짜 사이의 간격을 "1일 1시간 1분 1초" 같은 문장으로 만드는 함수 모음입니다. 포맷과 비교에는 \[date-fns](https://date-fns.org)를 사용합니다.
>
> ```ts
> import { getDateDistance, getDateDistanceText } from '@toss/date';
>
> const distance = getDateDistance(new Date('2020-07-01 12:00:00'), new Date('2020-07-02 13:01:01'));
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
>
> getDateDistanceText(distance);
> // '1일 1시간 1분 1초'
> ```
>
> ## 설치
>
> ```sh
> npm install @toss/date
> # 또는
> yarn add @toss/date
> ```
>
> ## 사용법
>
> ### 날짜 사이의 간격
>
> #### `getDateDistance(startDate, endDate)`
>
> 두 `Date`의 차이를 `{ days, hours, minutes, seconds }`로 반환합니다. `endDate`가 `startDate`와 같거나 더 이르면 값이 모두 0입니다.
>
> #### `getDateDistanceText(timeUnits, options?)`
>
> `getDateDistance`의 결과 같은 `TimeUnits`를 문자열로 바꿉니다. 기본적으로 값이 0보다 큰 단위만 공백으로 이어 붙입니다.
>
> ```ts
> getDateDistanceText({ days: 1, hours: 0, minutes: 0, seconds: 1 });
> // '1일 1초'
> ```
>
> `options`로 구분자와 단위별 표시 조건을 정할 수 있습니다.
>
> | 옵션 | 설명 | 기본값 |
> | --- | --- | --- |
> | `separator` | 단위 사이에 넣는 문자열 | `' '` |
> | `days` | `true`를 반환하면 일 단위를 표시하는 함수 | `t => t.days > 0` |
> | `hours` | `true`를 반환하면 시간 단위를 표시하는 함수 | `t => t.hours > 0` |
> | `minutes` | `true`를 반환하면 분 단위를 표시하는 함수 | `t => t.minutes > 0` |
> | `seconds` | `true`를 반환하면 초 단위를 표시하는 함수 | `t => t.seconds > 0` |
>
> 각 함수는 `timeUnits`를 인자로 받습니다.
>
> ```ts
> const timeUnits = { days: 1, hours: 1, minutes: 1, seconds: 1 };
>
> getDateDistanceText(timeUnits, { separator: '.' });
> // '1일.1시간.1분.1초'
>
> getDateDistanceText(timeUnits, { days: () => false });
> // '1시간 1분 1초'
> ```
>
> 일이나 시간이 있으면 그 둘만, 없으면 분과 초만 표시하려면 다음처럼 조건을 줍니다.
>
> ```ts
> const options = {
>   days: (t: TimeUnits) => t.days > 0,
>   hours: (t: TimeUnits) => t.hours > 0,
>   minutes: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.minutes > 0,
>   seconds: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.seconds > 0,
> };
>
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, options);
> // '1일 1시간'
>
> getDateDistanceText({ days: 0, hours: 0, minutes: 1, seconds: 1 }, options);
> // '1분 1초'
> ```
>
> ### 날짜 비교
>
> #### `isEqualOrBefore(lhs, rhs)` / `isEqualOrAfter(lhs, rhs)`
>
> `lhs`가 `rhs`와 같거나 이른지(`isEqualOrBefore`), 같거나 늦은지(`isEqualOrAfter`)를 `boolean`으로 반환합니다.
>
> ```ts
> isEqualOrBefore(new Date('2020-07-01'), new Date('2020-07-02'));
> isEqualOrAfter(new Date('2020-07-01'), new Date('2020-07-02'));
> ```
>
> ### 날짜 파싱
>
> #### `parseYYYYMMDD(yyyyMMdd)`
>
> 문자열을 `new Date()`에 넘겨 `Date`를 만듭니다. 유효하지 않은 날짜이면 `Invalid date format` 에러를 던집니다. 함수 이름은 `YYYYMMDD`지만 검사는 `new Date()`가 해석할 수 있는지만 확인하므로, 이 형식이 아닌 문자열도 유효한 날짜로 해석되면 통과합니다.
>
> ```ts
> parseYYYYMMDD('2020-04-23'); // 2020년 4월 23일 Date
>
> parseYYYYMMDD('2020-13-02'); // Error: Invalid date format
> ```
>
> ### 날짜 포맷
>
> #### `kstFormat(date, format)`
>
> date-fns의 `format`에 한국어(`ko`) 로케일을 적용합니다. `date`는 `Date` 또는 타임스탬프(`number`)이고, `format`에는 \[date-fns의 포맷 토큰](https://date-fns.org/docs/format)을 씁니다. 로케일만 적용하며, 시간대는 변환하지 않습니다.
>
> ```ts
> kstFormat(new Date(), 'yyyy-MM-dd');
> ```
>
> ### 시간 단위 올림
>
> #### `roundUpHoursInDays(hours)`
>
> 시간 수를 24의 배수로 올립니다. 이미 24의 배수이면 그대로 반환합니다.
>
> ### 타입
>
> `TimeUnits`(`{ days, hours, minutes, seconds }`)와 `DateFnsDateType`(`number | Date`)을 내보냅니다.
>
> ## 라이선스
>
> MIT

**근거 판정 실패 이유(판정 모델)**

- 외부 링크 https://date-fns.org 와 https://date-fns.org/docs/format 는 작업 폴더나 메모에서 근거를 찾을 수 없는 link 종류 unsupported 주장

## 2회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/date
>
> 날짜를 다룰 때 자주 쓰는 유틸리티 함수 모음입니다. \[date-fns](https://date-fns.org/)를 기반으로 하며, TypeScript 타입을 함께 제공합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/date
>
> # yarn
> yarn add @toss/date
> ```
>
> ## 사용법
>
> ```ts
> import { kstFormat, getDateDistance, getDateDistanceText } from '@toss/date';
> ```
>
> ## API
>
> ### `kstFormat(date, format)`
>
> date-fns의 `format`을 한국어(`ko`) 로케일로 호출합니다. 요일, 오전/오후 같은 텍스트가 한국어로 출력됩니다. `format`에는 \[date-fns 포맷 토큰](https://date-fns.org/docs/format)을 사용합니다.
>
> ```ts
> kstFormat(new Date(2020, 3, 23), 'yyyy년 M월 d일 EEEE');
> // '2020년 4월 23일 목요일'
> ```
>
> > 로케일만 한국어로 지정할 뿐 시간대를 KST로 변환하지는 않습니다. 날짜는 실행 환경의 시간대를 기준으로 포맷됩니다.
>
> ### `parseYYYYMMDD(yyyyMMdd)`
>
> `'2020-04-23'` 형식의 문자열을 `Date`로 변환합니다. 올바르지 않은 날짜라면 `Error('Invalid date format')`을 던집니다.
>
> ```ts
> parseYYYYMMDD('2020-04-23'); // Date
>
> parseYYYYMMDD('2020-13-02'); // Error: Invalid date format
> parseYYYYMMDD('2020-01-32'); // Error: Invalid date format
> ```
>
> ### `getDateDistance(startDate, endDate)`
>
> 두 `Date`의 차이를 `{ days, hours, minutes, seconds }` 객체로 반환합니다. `endDate`가 `startDate`보다 이르거나 같으면 모든 값이 `0`입니다.
>
> ```ts
> getDateDistance(new Date('2020-07-01 12:00:00'), new Date('2020-07-02 13:01:01'));
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
>
> getDateDistance(new Date('2020-07-02 13:01:01'), new Date('2020-07-01 12:00:00'));
> // { days: 0, hours: 0, minutes: 0, seconds: 0 }
> ```
>
> ### `getDateDistanceText(timeUnits, options?)`
>
> `getDateDistance`의 결과(`TimeUnits`)를 `'1일 1시간 1분 1초'` 같은 문장으로 만듭니다. 기본적으로 값이 `0`인 단위는 표시하지 않습니다.
>
> ```ts
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 });
> // '1일 1시간 1분 1초'
>
> getDateDistanceText({ days: 1, hours: 0, minutes: 0, seconds: 1 });
> // '1일 1초'
> ```
>
> #### 옵션
>
> | 옵션        | 타입                                | 기본값             | 설명                                         |
> | ----------- | ----------------------------------- | ------------------ | -------------------------------------------- |
> | `separator` | `string`                            | `' '`              | 단위 사이에 들어가는 구분자                  |
> | `days`      | `(timeUnits: TimeUnits) => boolean` | `t => t.days > 0`  | `true`를 반환하면 '일' 단위를 표시합니다     |
> | `hours`     | `(timeUnits: TimeUnits) => boolean` | `t => t.hours > 0` | `true`를 반환하면 '시간' 단위를 표시합니다   |
> | `minutes`   | `(timeUnits: TimeUnits) => boolean` | `t => t.minutes > 0` | `true`를 반환하면 '분' 단위를 표시합니다   |
> | `seconds`   | `(timeUnits: TimeUnits) => boolean` | `t => t.seconds > 0` | `true`를 반환하면 '초' 단위를 표시합니다   |
>
> 구분자를 바꾸거나 특정 단위를 숨길 수 있습니다.
>
> ```ts
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, { separator: '.' });
> // '1일.1시간.1분.1초'
>
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, { seconds: () => false });
> // '1일 1시간 1분'
> ```
>
> 단위별 조건 함수를 조합하면 '일/시간' 단위가 있을 때는 그것만, 없을 때만 '분/초'를 보여주는 식의 표현도 가능합니다.
>
> ```ts
> const options = {
>   days: (t: TimeUnits) => t.days > 0,
>   hours: (t: TimeUnits) => t.hours > 0,
>   minutes: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.minutes > 0,
>   seconds: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.seconds > 0,
> };
>
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, options); // '1일 1시간'
> getDateDistanceText({ days: 0, hours: 0, minutes: 1, seconds: 1 }, options); // '1분 1초'
> ```
>
> ### `isEqualOrBefore(lhs, rhs)` / `isEqualOrAfter(lhs, rhs)`
>
> - `isEqualOrBefore`: `lhs`가 `rhs`와 같거나 이전이면 `true`
> - `isEqualOrAfter`: `lhs`가 `rhs`와 같거나 이후면 `true`
>
> ```ts
> isEqualOrBefore(new Date('2020-01-01'), new Date('2020-01-01')); // true
> isEqualOrAfter(new Date('2020-01-01'), new Date('2020-01-02')); // false
> ```
>
> ### `roundUpHoursInDays(hours)`
>
> 시간(hour) 값을 24의 배수가 되도록 올림합니다. 이미 24의 배수라면 그대로 반환합니다.
>
> ```ts
> roundUpHoursInDays(25); // 48
> roundUpHoursInDays(48); // 48
> ```
>
> ## 타입
>
> | 타입               | 설명                                                          |
> | ------------------ | ------------------------------------------------------------- |
> | `DateFnsDateType`  | `number \| Date`                                              |
> | `TimeUnits`        | `{ days: number; hours: number; minutes: number; seconds: number }` |
>
> ## 개발
>
> ```bash
> yarn test       # jest 실행 및 타입 검사
> yarn typecheck  # 타입 검사
> yarn build      # dist, esm 빌드
> ```
>
> ## 라이선스
>
> \[LICENSE](./LICENSE) 파일을 참고하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/date
>
> 날짜를 한국어로 포맷하고, 두 날짜의 차이를 일·시간·분·초로 계산해 문자열로 만드는 유틸리티 모음입니다. 내부에서 \[date-fns](https://date-fns.org)를 사용합니다.
>
> ## 설치
>
> ```bash
> npm install @toss/date
> # 또는
> yarn add @toss/date
> ```
>
> ## 사용법
>
> ```ts
> import { getDateDistance, getDateDistanceText } from '@toss/date';
>
> const distance = getDateDistance(new Date('2020-07-01 12:00:00'), new Date('2020-07-02 13:01:01'));
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
>
> getDateDistanceText(distance);
> // '1일 1시간 1분 1초'
> ```
>
> ## API
>
> ### `kstFormat(date, format)`
>
> date-fns의 `format`을 한국어 로케일로 호출합니다. `date`에는 `Date` 또는 타임스탬프(`number`)를 넘기고, `format`에는 date-fns 포맷 문자열을 씁니다. 시간대는 변환하지 않습니다.
>
> ```ts
> kstFormat(new Date(2020, 6, 1), 'yyyy년 M월 d일'); // '2020년 7월 1일'
> ```
>
> ### `parseYYYYMMDD(yyyyMMdd)`
>
> 문자열을 `Date`로 바꿉니다. 유효하지 않은 날짜면 `Error('Invalid date format')`을 던집니다.
>
> ```ts
> parseYYYYMMDD('2020-04-23'); // 2020년 4월 23일의 Date
> parseYYYYMMDD('2020-13-02'); // Error: Invalid date format
> ```
>
> ### `getDateDistance(startDate, endDate)`
>
> 두 `Date`의 차이를 `{ days, hours, minutes, seconds }`로 반환합니다. `endDate`가 `startDate`와 같거나 더 이르면 모든 값이 0입니다.
>
> ### `getDateDistanceText(timeUnits, options?)`
>
> `getDateDistance`가 반환한 값을 `'1일 1시간 1분 1초'` 같은 문자열로 만듭니다. 기본적으로 값이 0보다 큰 단위만 표시합니다.
>
> | 옵션 | 타입 | 기본값 | 설명 |
> |---|---|---|---|
> | `separator` | `string` | `' '` | 단위 사이의 구분자 |
> | `days` | `(timeUnits) => boolean` | `t => t.days > 0` | `true`를 반환하면 일 단위를 표시 |
> | `hours` | `(timeUnits) => boolean` | `t => t.hours > 0` | `true`를 반환하면 시간 단위를 표시 |
> | `minutes` | `(timeUnits) => boolean` | `t => t.minutes > 0` | `true`를 반환하면 분 단위를 표시 |
> | `seconds` | `(timeUnits) => boolean` | `t => t.seconds > 0` | `true`를 반환하면 초 단위를 표시 |
>
> 구분자를 바꾸거나, 조건 함수로 표시할 단위를 직접 정할 수 있습니다.
>
> ```ts
> const timeUnits = { days: 1, hours: 1, minutes: 1, seconds: 1 };
>
> getDateDistanceText(timeUnits, { separator: '.' });
> // '1일.1시간.1분.1초'
>
> getDateDistanceText(timeUnits, { days: () => false });
> // '1시간 1분 1초'
>
> // 일·시간 값이 있으면 그 단위만, 없으면 분·초만 표시
> const options = {
>   minutes: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.minutes > 0,
>   seconds: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.seconds > 0,
> };
> getDateDistanceText(timeUnits, options);
> // '1일 1시간'
> ```
>
> ### `isEqualOrBefore(lhs, rhs)`, `isEqualOrAfter(lhs, rhs)`
>
> `lhs`가 `rhs`와 같거나 이전인지(`isEqualOrBefore`), 같거나 이후인지(`isEqualOrAfter`)를 `boolean`으로 반환합니다.
>
> ### `roundUpHoursInDays(hours)`
>
> 시간을 24의 배수로 올림합니다. 이미 24의 배수면 그대로 반환합니다.
>
> ```ts
> roundUpHoursInDays(25); // 48
> roundUpHoursInDays(48); // 48
> ```
>
> ### 타입
>
> - `DateFnsDateType`: `number | Date`
> - `TimeUnits`: `{ days: number; hours: number; minutes: number; seconds: number }`
>
> ## 개발
>
> ```bash
> yarn test       # jest 실행 후 타입 검사
> yarn typecheck  # 타입 검사만 실행
> yarn build      # dist(CommonJS, 타입 선언)와 esm 출력
> ```
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.0 — ✗ 근거 판정 실패

> # @toss/date
>
> 날짜를 한국어로 포맷하고, 두 날짜의 차이를 `1일 1시간 1분 1초` 같은 문장으로 만들어 주는 함수 모음입니다. 포맷은 \[date-fns](https://date-fns.org)의 `format`에 한국어 로케일을 적용해 처리합니다.
>
> ## 설치
>
> ```sh
> npm install @toss/date
> # 또는
> yarn add @toss/date
> ```
>
> `date-fns`(`^2.25.0`)가 의존성으로 함께 설치됩니다.
>
> ## 사용법
>
> ```ts
> import {
>   kstFormat,
>   parseYYYYMMDD,
>   getDateDistance,
>   getDateDistanceText,
> } from '@toss/date';
> ```
>
> ### 두 날짜의 차이를 문장으로 만들기
>
> `getDateDistance`는 두 `Date`의 차이를 일, 시간, 분, 초로 나누어 돌려줍니다. 끝 날짜가 시작 날짜보다 이르거나 같으면 모든 값이 0입니다.
>
> ```ts
> const startDate = new Date('2020-07-01 12:00:00');
> const endDate = new Date('2020-07-02 13:01:01');
>
> const distance = getDateDistance(startDate, endDate);
> // { days: 1, hours: 1, minutes: 1, seconds: 1 }
> ```
>
> `getDateDistanceText`는 이 값을 문자열로 바꿉니다. 기본 동작은 값이 0보다 큰 단위만 공백으로 이어 붙이는 것입니다.
>
> ```ts
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 });
> // '1일 1시간 1분 1초'
>
> getDateDistanceText({ days: 1, hours: 0, minutes: 0, seconds: 1 });
> // '1일 1초'
> ```
>
> 구분자는 `separator`로 바꿉니다.
>
> ```ts
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, { separator: '.' });
> // '1일.1시간.1분.1초'
> ```
>
> 단위마다 `days`, `hours`, `minutes`, `seconds` 옵션에 `(timeUnits) => boolean` 함수를 넘기면 그 단위를 보여 줄지 직접 정할 수 있습니다. 항상 숨기려면 `() => false`를 넘깁니다.
>
> ```ts
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, { days: () => false });
> // '1시간 1분 1초'
> ```
>
> 조건에는 다른 단위의 값도 쓸 수 있습니다. 아래는 일이나 시간이 있으면 그 두 단위만, 없으면 분과 초만 보여 주는 예입니다.
>
> ```ts
> const options = {
>   days: (t: TimeUnits) => t.days > 0,
>   hours: (t: TimeUnits) => t.hours > 0,
>   minutes: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.minutes > 0,
>   seconds: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.seconds > 0,
> };
>
> getDateDistanceText({ days: 1, hours: 1, minutes: 1, seconds: 1 }, options); // '1일 1시간'
> getDateDistanceText({ days: 0, hours: 0, minutes: 1, seconds: 1 }, options); // '1분 1초'
> ```
>
> `TimeUnits` 타입은 `@toss/date`에서 가져올 수 있습니다.
>
> ### 날짜 포맷
>
> `kstFormat(date, format)`은 `Date` 또는 타임스탬프(`number`)를 한국어 로케일로 포맷합니다. `format`에는 date-fns의 \[포맷 토큰](https://date-fns.org/docs/format)을 씁니다. 시간대는 변환하지 않고 로케일만 적용합니다.
>
> ```ts
> kstFormat(new Date(), 'yyyy년 M월 d일 (EEE)');
> ```
>
> ### 문자열을 Date로 바꾸기
>
> `parseYYYYMMDD`는 `'2020-04-23'` 같은 문자열을 `Date`로 바꿉니다. 올바르지 않은 날짜(`'2020-13-02'`, `'2020-01-32'`)는 `Invalid date format` 에러를 던집니다.
>
> ```ts
> const date = parseYYYYMMDD('2020-04-23');
> date.getFullYear(); // 2020
> date.getMonth(); // 3
> date.getDate(); // 23
>
> parseYYYYMMDD('2020-13-02'); // Error: Invalid date format
> ```
>
> 내부에서 `new Date(문자열)`을 호출해 유효성만 검사하므로, `YYYY-MM-DD`가 아니어도 `Date`가 해석하는 문자열이면 에러 없이 통과합니다.
>
> ### 날짜 비교
>
> `isEqualOrBefore(lhs, rhs)`는 `lhs`가 `rhs`와 같거나 이르면 `true`를, `isEqualOrAfter(lhs, rhs)`는 같거나 늦으면 `true`를 돌려줍니다.
>
> ```ts
> isEqualOrBefore(new Date('2020-07-01'), new Date('2020-07-02'));
> isEqualOrAfter(new Date('2020-07-01'), new Date('2020-07-02'));
> ```
>
> ### 시간을 일 단위로 올림
>
> `roundUpHoursInDays(hours)`는 시간 수를 24의 배수로 올립니다. 이미 24의 배수면 그대로 돌려줍니다.
>
> ```ts
> roundUpHoursInDays(30);
> ```
>
> ## 라이선스
>
> MIT. 저작권은 Viva Republica, Inc에 있습니다. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

**근거 판정 실패 이유(판정 모델)**

- 외부 링크 https://date-fns.org 와 https://date-fns.org/docs/format 는 작업 폴더에서 근거를 찾을 수 없음 (link 종류 unsupported)

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |

