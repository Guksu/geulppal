# `toss-storage-readme`

[← README 초안 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/common/storage`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- Web Storage를 쓸 수 없는 환경에서도 에러 없이 쓰게 한다는 점
- 기본 사용 예
- typed 사용 예

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ✗ 근거 판정 실패

> # @toss/storage
>
> `localStorage`와 `sessionStorage`를 안전하고 타입 친화적으로 사용할 수 있게 해 주는 유틸리티 패키지입니다.
>
> - **안전한 폴백**: 브라우저의 쿠키 차단 설정, 사생활 보호 모드, SSR 환경 등으로 스토리지에 접근할 수 없으면 예외를 던지는 대신 메모리 스토리지로 자동 전환합니다.
> - **타입이 있는 스토리지**: 값을 JSON으로 직렬화/역직렬화하고, 제네릭으로 값의 타입을 지정할 수 있습니다.
> - **숫자 전용 헬퍼**: 숫자 값에 대해 `increase()`, `decrease()`를 제공합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/storage
>
> # yarn
> yarn add @toss/storage
> ```
>
> ## 사용법
>
> ### 안전한 스토리지: `safeLocalStorage`, `safeSessionStorage`
>
> `localStorage`/`sessionStorage`를 사용할 수 있는지 확인한 뒤, 사용할 수 없으면 메모리 기반 스토리지로 대체한 객체입니다. 모듈을 불러오는 시점에 한 번 생성됩니다.
>
> ```ts
> import { safeLocalStorage, safeSessionStorage } from '@toss/storage';
>
> safeLocalStorage.set('token', 'abc');
> safeLocalStorage.get('token'); // 'abc'
> safeLocalStorage.remove('token');
> safeLocalStorage.get('token'); // null
>
> safeSessionStorage.set('step', '2');
> ```
>
> 직접 인스턴스를 만들고 싶다면 `generateStorage()`(localStorage), `generateSessionStorage()`(sessionStorage)를 사용할 수 있습니다.
>
> ```ts
> import { generateStorage, generateSessionStorage } from '@toss/storage';
>
> const local = generateStorage();
> const session = generateSessionStorage();
> ```
>
> #### `Storage` 인터페이스
>
> | 메서드 | 설명 |
> | --- | --- |
> | `get(key: string): string \| null` | 키에 저장된 문자열을 반환합니다. 값이 없으면 `null`을 반환합니다. |
> | `set(key: string, value: string): void` | 키에 문자열을 저장합니다. |
> | `remove(key: string): void` | 키에 저장된 값을 삭제합니다. |
>
> ### 타입이 있는 스토리지: `@toss/storage/typed`
>
> 값을 JSON으로 저장하고, 읽을 때 원래 타입으로 복원합니다.
>
> ```ts
> import { createTypedLocalStorage, createTypedSessionStorage } from '@toss/storage/typed';
>
> interface User {
>   id: number;
>   name: string;
> }
>
> const userStorage = createTypedLocalStorage<User>('user');
>
> userStorage.set({ id: 1, name: 'Toss' });
> userStorage.get(); // { id: 1, name: 'Toss' }
> userStorage.clear();
> userStorage.get(); // null
>
> // sessionStorage 기반
> const draftStorage = createTypedSessionStorage<string>('draft');
> ```
>
> #### 초기값
>
> `initialValue`를 지정하면, 해당 키에 저장된 값이 **없을 때만** 초기값이 저장됩니다. 이미 값이 있다면 덮어쓰지 않습니다.
>
> ```ts
> const themeStorage = createTypedLocalStorage<'light' | 'dark'>('theme', {
>   initialValue: 'light',
> });
>
> themeStorage.get(); // 처음에는 'light'
> ```
>
> #### 숫자 스토리지
>
> `initialValue`로 숫자를 넘기면 `increase()`, `decrease()`를 가진 `NumberTypedStorage`가 반환됩니다. 저장된 값이 없으면 `0`에서 시작합니다.
>
> ```ts
> const visitStorage = createTypedLocalStorage('visit-count', { initialValue: 0 });
>
> visitStorage.increase(); // 1
> visitStorage.increase(); // 2
> visitStorage.decrease(); // 1
> visitStorage.get(); // 1
> ```
>
> > **참고**: `NumberTypedStorage`는 런타임에 `initialValue`가 숫자인지로 결정됩니다. `createTypedLocalStorage<number>('count')`처럼 `initialValue` 없이 만들면 타입은 `NumberTypedStorage`로 추론되지만, 실제로는 `increase()`/`decrease()`가 없는 `TypedStorage` 인스턴스가 반환됩니다. 숫자 헬퍼가 필요하면 `initialValue`를 함께 지정하세요.
>
> #### `TypedStorage<T>` API
>
> | 메서드 | 설명 |
> | --- | --- |
> | `get(): T \| null` | 저장된 값을 반환합니다. 값이 없거나 JSON 파싱에 실패하면 `null`을 반환합니다. |
> | `set(next: T): void` | 값을 JSON 문자열로 직렬화하여 저장합니다. |
> | `clear(): void` | 저장된 값을 삭제합니다. |
>
> #### `NumberTypedStorage` API
>
> `TypedStorage<number>`의 모든 메서드에 더해 다음을 제공합니다.
>
> | 메서드 | 설명 |
> | --- | --- |
> | `increase(): void` | 값을 1 증가시킵니다. 값이 없으면 `0`에서 시작합니다. |
> | `decrease(): void` | 값을 1 감소시킵니다. 값이 없으면 `0`에서 시작합니다. |
>
> #### 옵션
>
> | 옵션 | 타입 | 설명 |
> | --- | --- | --- |
> | `initialValue` | `T` | 저장된 값이 없을 때 사용할 초기값입니다. |
> | `storage` | `Storage` | 사용할 스토리지입니다. `TypedStorage`/`NumberTypedStorage`를 직접 생성할 때 지정할 수 있으며, 기본값은 `safeLocalStorage`입니다. `createTypedLocalStorage`, `createTypedSessionStorage`에서는 지정할 수 없습니다. |
>
> `Storage` 인터페이스를 구현한 객체를 직접 넘겨 사용할 수도 있습니다.
>
> ```ts
> import { safeSessionStorage } from '@toss/storage';
> import { TypedStorage } from '@toss/storage/typed';
>
> const storage = new TypedStorage<string>('key', { storage: safeSessionStorage });
> ```
>
> ## 동작 시 유의사항
>
> - 빈 문자열(`''`)은 값이 없는 것(`null`)으로 취급됩니다.
> - 스토리지 사용 가능 여부는 모듈 로드 시점에 한 번만 확인합니다. 메모리 스토리지로 폴백된 경우 데이터는 페이지를 새로고침하면 사라지며, 탭 간에 공유되지도 않습니다.
> - `JSON.stringify`로 직렬화할 수 없는 값(함수, 순환 참조 등)은 저장할 수 없습니다.
>
> ## 라이선스
>
> \[LICENSE](./LICENSE)를 참고하세요.

**근거 판정 실패 이유(판정 모델)**

- '빈 문자열은 null로 취급된다'를 조건 없이 썼지만, LocalStorage/SessionStorage.get은 getItem 결과를 그대로 반환하므로 실제 브라우저 스토리지에서는 ''가 반환된다(contradicted)
- '사생활 보호 모드'에서 폴백된다는 platform 주장이 작업 폴더에서 확인되지 않음(unsupported)

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/storage
>
> `localStorage`와 `sessionStorage`를 안전하게 쓰기 위한 패키지입니다.
>
> - 쿠키 차단 등으로 스토리지에 접근할 수 없으면 예외를 던지는 대신 메모리 스토리지로 대체합니다.
> - `@toss/storage/typed`로 JSON으로 직렬화할 수 있는 값을 타입과 함께 저장하고 읽을 수 있습니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/storage
> # 또는
> npm install @toss/storage
> ```
>
> ## 안전한 스토리지
>
> `safeLocalStorage`와 `safeSessionStorage`는 `get`, `set`, `remove` 세 메서드를 가진 `Storage` 인터페이스를 구현합니다. 값은 문자열만 저장합니다.
>
> ```ts
> import { safeLocalStorage, safeSessionStorage } from '@toss/storage';
>
> safeLocalStorage.set('token', 'abc');
> safeLocalStorage.get('token'); // 'abc'
> safeLocalStorage.get('unknown'); // null
> safeLocalStorage.remove('token');
>
> safeSessionStorage.set('step', '2');
> ```
>
> 모듈을 불러올 때 임시 키를 하나 쓰고 지워 보면서 스토리지를 쓸 수 있는지 확인합니다. 쓸 수 없으면 `Map`을 쓰는 메모리 스토리지로 대체하므로 값은 페이지를 닫으면 사라집니다.
>
> 스토리지를 직접 만들어야 하면 `generateStorage()`(localStorage), `generateSessionStorage()`(sessionStorage)를 호출합니다. 반환값은 `Storage`입니다.
>
> ## 타입이 있는 스토리지
>
> `@toss/storage/typed`의 `createTypedLocalStorage`와 `createTypedSessionStorage`는 키 하나에 묶인 스토리지 객체를 만듭니다. 값은 `JSON.stringify`로 저장하고 `JSON.parse`로 읽습니다.
>
> ```ts
> import { createTypedLocalStorage } from '@toss/storage/typed';
>
> interface User {
>   name: string;
> }
>
> const user = createTypedLocalStorage<User>('user');
>
> user.get(); // 저장된 값이 없으면 null
> user.set({ name: 'toss' });
> user.get(); // { name: 'toss' }
> user.clear(); // 저장된 값 삭제
> ```
>
> 저장된 값을 `JSON.parse`로 읽지 못하면 `get()`은 예외 대신 `null`을 반환합니다.
>
> ### 초기값
>
> `initialValue`를 넘기면 해당 키에 저장된 값이 없을 때만 그 값을 저장합니다. 이미 저장된 값은 덮어쓰지 않습니다.
>
> ```ts
> const theme = createTypedLocalStorage<string>('theme', { initialValue: 'light' });
> ```
>
> ### 숫자 스토리지
>
> `initialValue`가 숫자이면 `increase()`와 `decrease()`가 추가된 `NumberTypedStorage`를 반환합니다. 저장된 값이 없으면 0에서 시작합니다.
>
> ```ts
> const visitCount = createTypedLocalStorage('visit-count', { initialValue: 0 });
>
> visitCount.increase();
> visitCount.get(); // 1
> visitCount.decrease();
> visitCount.get(); // 0
> ```
>
> `NumberTypedStorage`는 `initialValue`가 숫자일 때만 만들어집니다. `createTypedLocalStorage<number>('count')`처럼 초기값 없이 만들면 타입은 `NumberTypedStorage`로 추론되지만 실제 객체는 `TypedStorage`여서 `increase()`와 `decrease()`가 없습니다. 숫자 스토리지에는 초기값을 함께 넘기세요.
>
> ## API
>
> ### `@toss/storage`
>
> | 이름 | 설명 |
> |---|---|
> | `Storage` | `get(key): string \| null`, `set(key, value): void`, `remove(key): void`를 가진 인터페이스 |
> | `safeLocalStorage` | localStorage를 쓸 수 있으면 localStorage, 아니면 메모리 스토리지 |
> | `safeSessionStorage` | sessionStorage를 쓸 수 있으면 sessionStorage, 아니면 메모리 스토리지 |
> | `generateStorage()` | `safeLocalStorage`와 같은 방식으로 `Storage`를 새로 만듭니다. |
> | `generateSessionStorage()` | `safeSessionStorage`와 같은 방식으로 `Storage`를 새로 만듭니다. |
>
> ### `@toss/storage/typed`
>
> | 이름 | 설명 |
> |---|---|
> | `createTypedLocalStorage<T>(key, options?)` | `safeLocalStorage`를 쓰는 `TypedStorage<T>`를 만듭니다. |
> | `createTypedSessionStorage<T>(key, options?)` | `safeSessionStorage`를 쓰는 `TypedStorage<T>`를 만듭니다. |
> | `TypedStorage<T>` | `get(): T \| null`, `set(value: T)`, `clear()` |
> | `NumberTypedStorage` | `TypedStorage<number>`에 `increase()`, `decrease()`를 더한 클래스 |
> | `TypedStorageOptions<T>` | `{ storage?: Storage; initialValue?: T }` |
>
> `TypedStorage`와 `NumberTypedStorage`는 클래스로 직접 만들 수도 있습니다. 이때 `storage`를 생략하면 `safeLocalStorage`를 씁니다. 팩토리 함수에는 `storage` 옵션이 없고, 함수가 정한 스토리지를 사용합니다.
>
> ## 라이선스
>
> MIT License. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/storage
>
> `localStorage`와 `sessionStorage`를 안전하게 쓰는 패키지입니다. 브라우저가 저장소 접근을 막아도 예외 없이 동작하고, 값을 JSON으로 직렬화해 타입이 있는 채로 읽고 쓸 수 있습니다.
>
> ```ts
> import { safeLocalStorage } from '@toss/storage';
> import { createTypedLocalStorage } from '@toss/storage/typed';
>
> safeLocalStorage.set('name', 'toss');
> safeLocalStorage.get('name'); // 'toss'
>
> const visitCount = createTypedLocalStorage('visit-count', { initialValue: 0 });
> visitCount.increase();
> ```
>
> ## 설치
>
> ```sh
> npm install @toss/storage
> # 또는
> yarn add @toss/storage
> ```
>
> ## 왜 필요한가
>
> 사용자가 쿠키를 차단하면 `localStorage`에 접근하는 순간 예외가 발생합니다. 이 패키지는 처음 불러올 때 임시 키를 써서 저장소를 쓸 수 있는지 확인하고, 쓸 수 없으면 메모리에 값을 보관하는 저장소로 대신합니다. 메모리 저장소의 값은 페이지를 닫거나 새로고침하면 사라집니다.
>
> ## 사용법
>
> ### safeLocalStorage, safeSessionStorage
>
> `Storage` 인터페이스는 메서드가 세 개입니다. 값은 문자열이고, 없는 키를 읽으면 `null`이 반환됩니다.
>
> ```ts
> import { safeLocalStorage, safeSessionStorage } from '@toss/storage';
>
> safeLocalStorage.set('token', 'abc');
> safeLocalStorage.get('token'); // 'abc'
> safeLocalStorage.remove('token');
>
> safeSessionStorage.set('step', '2');
> ```
>
> `generateStorage()`와 `generateSessionStorage()`는 같은 방식으로 저장소를 새로 만들어 돌려줍니다. `safeLocalStorage`와 `safeSessionStorage`는 모듈을 불러올 때 이 함수로 만든 인스턴스입니다.
>
> ### 타입이 있는 저장소
>
> `@toss/storage/typed`는 키 하나에 값 하나를 묶어 다룹니다. 값은 `JSON.stringify`로 저장하고 `JSON.parse`로 읽습니다.
>
> ```ts
> import { createTypedLocalStorage, createTypedSessionStorage } from '@toss/storage/typed';
>
> interface Profile {
>   name: string;
> }
>
> const profile = createTypedLocalStorage<Profile>('profile', {
>   initialValue: { name: 'toss' },
> });
>
> profile.get(); // Profile | null
> profile.set({ name: 'slash' });
> profile.clear();
>
> const draft = createTypedSessionStorage<string>('draft');
> ```
>
> - `get()`은 저장된 값이 없거나 JSON으로 읽을 수 없으면 `null`을 반환합니다.
> - `initialValue`는 저장된 값이 없을 때만 기록합니다. 이미 값이 있으면 덮어쓰지 않습니다.
> - 로컬 저장소는 `createTypedLocalStorage`, 세션 저장소는 `createTypedSessionStorage`로 만듭니다.
>
> ### 숫자 저장소
>
> `initialValue`가 숫자이면 `increase()`와 `decrease()`가 있는 `NumberTypedStorage`가 반환됩니다. 저장된 값이 없으면 0에서 시작합니다.
>
> ```ts
> const counter = createTypedLocalStorage('counter', { initialValue: 10 });
>
> counter.increase();
> counter.get(); // 11
>
> counter.decrease();
> counter.get(); // 10
> ```
>
> 숫자 저장소는 `initialValue`의 타입을 보고 정해집니다. 타입만 `number`로 지정하고 `initialValue`를 넘기지 않으면 타입은 `NumberTypedStorage`이지만 실제로는 `increase()`와 `decrease()`가 없는 `TypedStorage`가 만들어집니다.
>
> ### 직접 만들기
>
> `TypedStorage`와 `NumberTypedStorage` 클래스도 내보냅니다. `storage` 옵션에는 `Storage` 인터페이스를 구현한 객체를 넘길 수 있고, 생략하면 `safeLocalStorage`를 씁니다.
>
> ```ts
> import { TypedStorage, NumberTypedStorage } from '@toss/storage/typed';
> import { safeSessionStorage } from '@toss/storage';
>
> const typed = new TypedStorage<string>('key', { storage: safeSessionStorage });
> const count = new NumberTypedStorage('count', { initialValue: 0 });
> ```
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # @toss/storage
>
> 브라우저 스토리지(`localStorage`, `sessionStorage`)를 안전하고 타입 친화적으로 사용할 수 있게 해 주는 유틸리티 패키지입니다.
>
> - **안전한 스토리지**: 쿠키 차단, 사생활 보호 모드 등으로 스토리지에 접근할 수 없는 환경에서도 예외 없이 동작합니다. 사용할 수 없으면 메모리 스토리지로 자동 대체됩니다.
> - **타입이 있는 스토리지**: 값을 JSON으로 직렬화/역직렬화하고, 저장하는 값의 타입을 TypeScript로 보장합니다.
> - **숫자 전용 스토리지**: 숫자 값에는 `increase()`, `decrease()` 메서드를 제공합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/storage
>
> # yarn
> yarn add @toss/storage
> ```
>
> ## 사용법
>
> 이 패키지는 두 개의 엔트리 포인트를 제공합니다.
>
> | 엔트리 포인트          | 내용                                                           |
> | ---------------------- | -------------------------------------------------------------- |
> | `@toss/storage`        | 안전한 스토리지 (`safeLocalStorage`, `safeSessionStorage` 등) |
> | `@toss/storage/typed`  | 타입이 있는 스토리지 (`createTypedLocalStorage` 등)            |
>
> ### 안전한 스토리지
>
> ```ts
> import { safeLocalStorage, safeSessionStorage } from '@toss/storage';
>
> safeLocalStorage.set('key', 'value');
> safeLocalStorage.get('key'); // 'value'
> safeLocalStorage.get('unknown'); // null
> safeLocalStorage.remove('key');
>
> safeSessionStorage.set('key', 'value');
> ```
>
> `localStorage`/`sessionStorage`에 값을 쓰고 지울 수 있는지 먼저 확인한 뒤, 사용할 수 없으면 메모리(`Map`) 기반 스토리지를 돌려줍니다. 이 경우 값은 페이지를 닫거나 새로고침하면 사라집니다.
>
> 직접 스토리지를 생성하고 싶다면 아래 함수를 사용할 수 있습니다.
>
> ```ts
> import { generateStorage, generateSessionStorage } from '@toss/storage';
>
> const localStorage = generateStorage(); // localStorage 또는 메모리 스토리지
> const sessionStorage = generateSessionStorage(); // sessionStorage 또는 메모리 스토리지
> ```
>
> ### 타입이 있는 스토리지
>
> `@toss/storage/typed`의 팩토리 함수로 키마다 하나의 타입이 지정된 스토리지를 만들 수 있습니다. 값은 `JSON.stringify`/`JSON.parse`로 저장하고 읽습니다.
>
> ```ts
> import { createTypedLocalStorage, createTypedSessionStorage } from '@toss/storage/typed';
>
> interface User {
>   name: string;
>   age: number;
> }
>
> const userStorage = createTypedLocalStorage<User>('user');
>
> userStorage.get(); // null
> userStorage.set({ name: 'toss', age: 10 });
> userStorage.get(); // { name: 'toss', age: 10 }
> userStorage.clear();
>
> // sessionStorage를 사용하고 싶다면
> const tokenStorage = createTypedSessionStorage<string>('token');
> ```
>
> #### 초기값
>
> `initialValue`를 지정하면, 해당 키에 저장된 값이 없을 때에만 초기값을 저장합니다. 이미 값이 있다면 덮어쓰지 않습니다.
>
> ```ts
> const themeStorage = createTypedLocalStorage<'light' | 'dark'>('theme', {
>   initialValue: 'light',
> });
>
> themeStorage.get(); // 'light'
> ```
>
> #### 숫자 스토리지
>
> `initialValue`가 `number`이면 `NumberTypedStorage`가 반환되며, `increase()`와 `decrease()`를 사용할 수 있습니다. 저장된 값이 없으면 `0`을 기준으로 계산합니다.
>
> ```ts
> const countStorage = createTypedLocalStorage('visit-count', { initialValue: 0 });
>
> countStorage.increase(); // 1
> countStorage.increase(); // 2
> countStorage.decrease(); // 1
> countStorage.get(); // 1
> ```
>
> > **주의**: `NumberTypedStorage`는 런타임에 `initialValue`가 숫자인지로 결정됩니다. 숫자 타입을 쓰더라도 `initialValue` 없이 생성하면 일반 `TypedStorage`가 반환되어 `increase()`/`decrease()`를 호출할 수 없으니, 숫자 스토리지가 필요하면 `initialValue`를 함께 지정해 주세요.
>
> #### 클래스 직접 사용
>
> 사용할 스토리지를 직접 지정하려면 `TypedStorage`, `NumberTypedStorage` 클래스를 바로 생성할 수도 있습니다. `storage`를 생략하면 `safeLocalStorage`가 사용됩니다.
>
> ```ts
> import { safeSessionStorage } from '@toss/storage';
> import { TypedStorage, NumberTypedStorage } from '@toss/storage/typed';
>
> const storage = new TypedStorage<string[]>('recent-keywords', {
>   storage: safeSessionStorage,
>   initialValue: [],
> });
>
> const counter = new NumberTypedStorage('counter', { initialValue: 0 });
> ```
>
> ## API
>
> ### `@toss/storage`
>
> #### `interface Storage`
>
> | 메서드                                 | 설명                                         |
> | -------------------------------------- | -------------------------------------------- |
> | `get(key: string): string \| null`     | 키에 저장된 값을 반환합니다. 없으면 `null`   |
> | `set(key: string, value: string): void` | 키에 값을 저장합니다.                        |
> | `remove(key: string): void`            | 키에 저장된 값을 삭제합니다.                 |
>
> #### 함수 및 상수
>
> | 이름                       | 설명                                                                     |
> | -------------------------- | ------------------------------------------------------------------------ |
> | `safeLocalStorage`         | `localStorage`를 사용할 수 없으면 메모리 스토리지로 대체되는 `Storage`   |
> | `safeSessionStorage`       | `sessionStorage`를 사용할 수 없으면 메모리 스토리지로 대체되는 `Storage` |
> | `generateStorage()`        | 새로운 `Storage`(localStorage 기반)를 생성합니다.                        |
> | `generateSessionStorage()` | 새로운 `Storage`(sessionStorage 기반)를 생성합니다.                      |
>
> ### `@toss/storage/typed`
>
> #### `createTypedLocalStorage<T>(key, options?)`
>
> #### `createTypedSessionStorage<T>(key, options?)`
>
> 각각 `localStorage`, `sessionStorage` 기반의 타입 스토리지를 생성합니다. `options`에는 `initialValue`를 지정할 수 있습니다. `initialValue`가 숫자이면 `NumberTypedStorage`, 그 외에는 `TypedStorage<T>`를 반환합니다.
>
> #### `TypedStorageOptions<T>`
>
> | 옵션           | 타입      | 설명                                                                     |
> | -------------- | --------- | ------------------------------------------------------------------------ |
> | `storage`      | `Storage` | 사용할 스토리지. 기본값은 `safeLocalStorage` (팩토리 함수에서는 지정 불가) |
> | `initialValue` | `T`       | 저장된 값이 없을 때 최초로 저장할 값                                     |
>
> #### `TypedStorage<T>`
>
> | 메서드               | 설명                                                              |
> | -------------------- | ----------------------------------------------------------------- |
> | `get(): T \| null`   | 저장된 값을 반환합니다. 값이 없거나 파싱에 실패하면 `null`        |
> | `set(next: T): void` | 값을 저장합니다.                                                  |
> | `clear(): void`      | 저장된 값을 삭제합니다.                                           |
>
> #### `NumberTypedStorage`
>
> `TypedStorage<number>`를 상속하며 아래 메서드가 추가됩니다.
>
> | 메서드         | 설명                                           |
> | -------------- | ---------------------------------------------- |
> | `increase()`   | 저장된 값을 1 증가시킵니다. 값이 없으면 `1`    |
> | `decrease()`   | 저장된 값을 1 감소시킵니다. 값이 없으면 `-1`   |
>
> ## 알아두면 좋은 점
>
> - `get()`은 저장된 값이 없거나, 빈 문자열이거나, JSON 파싱에 실패하면 `null`을 반환합니다.
> - 서버 사이드 렌더링 환경에서는 `localStorage`/`sessionStorage`에 접근할 수 없으므로 메모리 스토리지로 대체됩니다. 이 패키지의 스토리지는 모듈이 로드되는 시점에 사용 가능 여부를 한 번 판단합니다.
>
> ## 라이선스
>
> \[LICENSE](./LICENSE) 파일을 참고해 주세요.

**근거 판정 실패 이유(판정 모델)**

- 숫자 스토리지 예제의 `countStorage.increase(); // 1` 등은 increase()/decrease()가 값을 반환하는 것처럼 보이게 한다. 실제로는 void를 반환한다(src/typed/storages/NumberTypedStorage.ts).
- '사생활 보호 모드'에서 메모리 스토리지로 대체된다는 내용은 작업 폴더에 근거가 없다. 코드 주석은 쿠키 차단만 언급한다.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/storage
>
> `localStorage`와 `sessionStorage`를 안전하게 쓰기 위한 패키지입니다.
>
> 브라우저에서 쿠키를 차단하면 `localStorage`에 접근하는 순간 예외가 발생합니다. 이 패키지는 저장소를 쓸 수 있는지 먼저 확인하고, 쓸 수 없으면 메모리 저장소로 대신합니다. 키에 타입을 붙여 JSON 직렬화를 맡기는 `@toss/storage/typed`도 함께 제공합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/storage
>
> # yarn
> yarn add @toss/storage
> ```
>
> ## 안전한 저장소
>
> `safeLocalStorage`와 `safeSessionStorage`는 `get`, `set`, `remove` 세 메서드를 가진 `Storage` 인터페이스를 따릅니다.
>
> ```ts
> import { safeLocalStorage, safeSessionStorage } from '@toss/storage';
>
> safeLocalStorage.set('token', 'abc');
> safeLocalStorage.get('token'); // 'abc'
> safeLocalStorage.get('missing'); // null
> safeLocalStorage.remove('token');
>
> safeSessionStorage.set('step', '2');
> ```
>
> 모듈을 불러올 때 임시 키를 쓰고 지워 보는 방식으로 저장소를 쓸 수 있는지 확인합니다. 쓸 수 없으면 `Map` 기반 메모리 저장소가 대신 동작합니다. 이 경우 값은 페이지를 새로 고치면 사라집니다.
>
> 저장소를 직접 만들 수도 있습니다.
>
> ```ts
> import { generateStorage, generateSessionStorage } from '@toss/storage';
>
> const localStore = generateStorage(); // localStorage 또는 메모리 저장소
> const sessionStore = generateSessionStorage(); // sessionStorage 또는 메모리 저장소
> ```
>
> | 이름 | 설명 |
> | --- | --- |
> | `Storage` | `get(key)`, `set(key, value)`, `remove(key)`를 가진 인터페이스 |
> | `safeLocalStorage` | `localStorage`를 쓸 수 있으면 `localStorage`, 아니면 메모리 저장소 |
> | `safeSessionStorage` | `sessionStorage`를 쓸 수 있으면 `sessionStorage`, 아니면 메모리 저장소 |
> | `generateStorage()` | `safeLocalStorage`와 같은 기준으로 새 저장소를 만듭니다. |
> | `generateSessionStorage()` | `safeSessionStorage`와 같은 기준으로 새 저장소를 만듭니다. |
>
> ## 타입이 있는 저장소
>
> `@toss/storage/typed`는 키 하나에 값 하나를 묶어 다룹니다. 값은 JSON으로 저장하고 읽을 때 되돌립니다.
>
> ```ts
> import { createTypedLocalStorage, createTypedSessionStorage } from '@toss/storage/typed';
>
> interface Settings {
>   theme: 'light' | 'dark';
> }
>
> const settings = createTypedLocalStorage<Settings>('settings', {
>   initialValue: { theme: 'light' },
> });
>
> settings.get(); // { theme: 'light' }
> settings.set({ theme: 'dark' });
> settings.clear();
> settings.get(); // null
>
> const draft = createTypedSessionStorage<string>('draft');
> ```
>
> - `createTypedLocalStorage`는 `safeLocalStorage`에, `createTypedSessionStorage`는 `safeSessionStorage`에 값을 저장합니다.
> - `initialValue`는 저장된 값이 없을 때만 기록합니다. 이미 값이 있으면 덮어쓰지 않습니다.
> - `get()`은 값이 없거나 JSON으로 읽을 수 없으면 `null`을 반환합니다. 빈 문자열로 저장된 값도 `null`로 읽힙니다.
>
> ### 숫자 저장소
>
> `initialValue`가 숫자이면 `increase()`와 `decrease()`가 있는 `NumberTypedStorage`가 반환됩니다. 저장된 값이 없으면 0에서 시작합니다.
>
> ```ts
> import { createTypedLocalStorage } from '@toss/storage/typed';
>
> const visits = createTypedLocalStorage<number>('visits', { initialValue: 0 });
>
> visits.increase(); // 1
> visits.increase(); // 2
> visits.decrease(); // 1
> visits.get(); // 1
> ```
>
> ### 클래스 직접 사용
>
> 팩토리 함수 대신 `TypedStorage`와 `NumberTypedStorage`를 직접 만들 수 있습니다. `storage` 옵션으로 저장소를 지정하며, 생략하면 `safeLocalStorage`를 씁니다.
>
> ```ts
> import { safeSessionStorage } from '@toss/storage';
> import { TypedStorage } from '@toss/storage/typed';
>
> const step = new TypedStorage<number>('step', {
>   storage: safeSessionStorage,
>   initialValue: 1,
> });
> ```
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/storage
>
> `localStorage`와 `sessionStorage`를 예외 없이 쓰게 해 주고, 저장하는 값의 타입을 지켜 주는 패키지입니다.
>
> 브라우저에서 사용자가 쿠키를 차단하면 `localStorage`에 접근하는 순간 예외가 발생합니다. `@toss/storage`는 사용 가능 여부를 먼저 확인하고, 쓸 수 없으면 메모리에 값을 저장하는 저장소로 바꿔 줍니다. 호출하는 쪽에서는 `try/catch` 없이 같은 방식으로 읽고 쓰면 됩니다.
>
> ```ts
> import { createTypedLocalStorage } from '@toss/storage/typed';
>
> const visitCount = createTypedLocalStorage('visit-count', { initialValue: 10 });
>
> visitCount.increase();
> visitCount.get(); // 11
> ```
>
> ## 설치
>
> ```bash
> npm install @toss/storage
> # 또는
> yarn add @toss/storage
> ```
>
> ## 사용법
>
> 패키지는 두 가지 진입점을 제공합니다.
>
> | 진입점 | 내용 |
> |---|---|
> | `@toss/storage` | 예외 없이 쓸 수 있는 문자열 저장소 |
> | `@toss/storage/typed` | JSON으로 직렬화해 타입이 있는 값을 저장하는 저장소 |
>
> ### 안전한 저장소
>
> `safeLocalStorage`와 `safeSessionStorage`는 `get`, `set`, `remove` 세 메서드를 가진 `Storage` 객체입니다. 값은 문자열만 저장하며, 없는 키를 읽으면 `null`을 돌려줍니다.
>
> ```ts
> import { safeLocalStorage, safeSessionStorage } from '@toss/storage';
>
> safeLocalStorage.set('theme', 'dark');
> safeLocalStorage.get('theme');
> safeLocalStorage.remove('theme');
>
> safeSessionStorage.set('step', '2');
> ```
>
> 모듈을 불러올 때 임시 키를 한 번 써 보고 지워서 저장소를 쓸 수 있는지 확인합니다. 이 확인에서 예외가 나면 해당 저장소는 메모리 저장소로 대체되고, 값은 메모리에만 남습니다.
>
> 저장소를 직접 만들어야 하면 `generateStorage()`(localStorage 기반)와 `generateSessionStorage()`(sessionStorage 기반)를 호출합니다. 둘 다 `Storage`를 반환합니다.
>
> ### 타입이 있는 저장소
>
> `createTypedLocalStorage`와 `createTypedSessionStorage`는 키 하나에 묶인 저장소 객체를 만듭니다. 값은 `JSON.stringify`로 저장하고 `JSON.parse`로 읽으므로 객체와 배열도 저장할 수 있습니다.
>
> ```ts
> import { createTypedLocalStorage } from '@toss/storage/typed';
>
> interface Profile {
>   name: string;
> }
>
> const profile = createTypedLocalStorage<Profile>('profile', {
>   initialValue: { name: 'foo' },
> });
>
> profile.set({ name: 'bar' });
> profile.get();
> profile.clear();
> profile.get(); // null
> ```
>
> | 메서드 | 동작 |
> |---|---|
> | `get()` | 저장된 값을 반환합니다. 값이 없거나 JSON으로 읽을 수 없으면 `null`을 반환합니다. |
> | `set(next)` | 값을 저장합니다. |
> | `clear()` | 해당 키를 지웁니다. |
>
> `initialValue`는 키에 저장된 값이 없을 때만 저장됩니다. 이미 값이 있으면 덮어쓰지 않습니다.
>
> `createTypedSessionStorage`는 `sessionStorage`를 쓴다는 점만 다르고 사용법은 같습니다.
>
> ### 숫자 저장소
>
> `initialValue`가 숫자이면 `NumberTypedStorage`가 만들어집니다. `get`, `set`, `clear`에 더해 `increase()`와 `decrease()`로 값을 1씩 바꿀 수 있습니다. 저장된 값이 없으면 0에서 시작합니다.
>
> ```ts
> import { createTypedSessionStorage } from '@toss/storage/typed';
>
> const retryCount = createTypedSessionStorage('retry-count', { initialValue: 10 });
>
> retryCount.increase();
> retryCount.get(); // 11
>
> retryCount.decrease();
> ```
>
> > **주의** 타입 선언은 `T`가 `number`이면 `NumberTypedStorage`를 반환한다고 하지만, 실제로는 `initialValue`가 숫자일 때만 `NumberTypedStorage`가 만들어집니다. `createTypedLocalStorage<number>('count')`처럼 `initialValue` 없이 만들면 `increase()`와 `decrease()`가 없는 `TypedStorage`가 반환되므로 숫자 저장소가 필요하면 `initialValue`를 함께 넘기세요.
>
> ### 저장소 지정하기
>
> `TypedStorage`와 `NumberTypedStorage` 클래스는 `storage` 옵션으로 `Storage` 구현체를 받습니다. 지정하지 않으면 `safeLocalStorage`를 씁니다. `createTyped*Storage` 함수는 이 옵션을 받지 않습니다.
>
> ```ts
> import { safeSessionStorage } from '@toss/storage';
> import { TypedStorage } from '@toss/storage/typed';
>
> const draft = new TypedStorage<string>('draft', { storage: safeSessionStorage });
> ```
>
> ## 라이선스
>
> MIT

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 차이 없음

Y는 첫 사용 예를 앞에 두고 설명이 더 매끄럽게 이어집니다. X는 API 표와 팩토리 함수의 storage 옵션 제약 같은 레퍼런스 정보가 낫습니다. 기준별로 장점이 엇갈리고 두 결과 모두 그대로 올릴 수 있는 수준이어서 어느 쪽도 분명히 낫다고 보기 어렵습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

두 결과는 다루는 정보가 거의 같습니다. 안전한 대체 동작, 타입 있는 저장소, 숫자 저장소와 초기값 없이 만들 때의 타입 함정을 둘 다 설명합니다. X는 맨 앞에 사용 예제를 두고 설명을 이어진 문장으로 써서 짧고 읽기 좋습니다. Y는 '팩토리 함수에는 storage 옵션이 없고'라는 유용한 정보를 하나 더 담았지만, API 표가 본문을 대부분 반복해서 분량에 비해 새로 얻는 정보가 적습니다. 그래서 X가 조금 낫다고 판단했습니다.

</details>

<details><summary>2회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

Y가 조금 낫습니다. 첫 사용 예와 두 진입점 구분을 맨 앞에서 보여 주기 때문입니다. 또 `initialValue` 없이 만들면 타입 선언과 달리 `NumberTypedStorage`가 반환되지 않는다는 점을 '주의'로 알려 주는데, 사용자가 실제로 겪을 수 있는 문제입니다. `createTyped*Storage` 함수가 `storage` 옵션을 받지 않는다는 점을 밝힌 것도 도움이 됩니다. X는 라이선스 표기가 더 자세하고 빈 문자열이 `null`로 읽힌다는 세부 사항을 담았지만, 독자에게 쓸모 있는 정보로 보면 Y 쪽이 더 큽니다. 다만 Y에는 반복되는 부분이 조금 있어서 차이가 크지는 않습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

X는 첫 화면에서 사용 예를 보여 주고, 숫자 저장소의 타입 선언과 실제 동작이 어긋나는 부분을 주의로 짚어 독자의 실수를 막는다. Y는 정확하고 라이선스 표기가 더 충실하지만, 앞에서 설명한 API를 표로 다시 나열한다. 독자에게 필요한 정보를 더 잘 갖춘 쪽은 X다.

</details>

