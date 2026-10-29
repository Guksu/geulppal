# `toss-use-query-param-readme`

[← README 초안 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지 README 써 줘. 한국어로.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/react/use-query-param`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 쿼리 파라미터 값을 다루는 훅이라는 점
- 설치 방법
- 사용 예

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/use-query-param
>
> Next.js의 쿼리 파라미터를 React 훅으로 간편하게 읽을 수 있게 해주는 패키지입니다.
>
> - `useQueryParam`: 쿼리 파라미터 하나를 읽고, 필요하면 원하는 타입으로 변환합니다.
> - `useQueryParams`: 모든 쿼리 파라미터를 객체로 읽습니다.
> - `useNextRouter`: `next/router`의 `useRouter`에 라우터 준비(`isReady`) 대기 기능(Suspense)을 더한 훅입니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/use-query-param
>
> # yarn
> yarn add @toss/use-query-param
> ```
>
> ### Peer Dependencies
>
> | 패키지 | 버전 |
> | --- | --- |
> | `next` | `^11.1 \|\| ^12` |
> | `react` | `^16.8 \|\| ^17 \|\| ^18` |
> | `react-dom` | `^16.8 \|\| ^17 \|\| ^18` |
>
> ## 왜 필요한가요?
>
> Next.js는 자동 정적 최적화(Automatic Static Optimization)가 적용된 페이지에서 첫 렌더링 시 `router.query`를 빈 객체로 돌려줍니다. 라우터가 준비된 뒤(`router.isReady === true`)에야 실제 쿼리 값을 읽을 수 있습니다.
>
> 이 패키지의 훅은 Suspense를 사용해 라우터가 준비될 때까지 렌더링을 잠시 멈출 수 있어서, `isReady`를 직접 확인하는 코드를 줄여 줍니다.
>
> ## 사용법
>
> ### `useQueryParam`
>
> 쿼리 파라미터 하나를 읽습니다. 값이 없으면 `undefined`를 반환합니다.
>
> ```tsx
> import { useQueryParam } from '@toss/use-query-param';
>
> // /products?id=42
> function Product() {
>   const id = useQueryParam('id'); // '42' | undefined
>
>   return <div>상품 번호: {id}</div>;
> }
> ```
>
> `parser` 옵션으로 값을 원하는 타입으로 변환할 수 있습니다. 쿼리 값이 없으면 `parser`는 호출되지 않고 `undefined`가 반환됩니다.
>
> ```tsx
> // /products?id=42
> const id = useQueryParam('id', { parser: Number }); // 42 | undefined
> const tags = useQueryParam('tags', { parser: value => value.split(',') }); // string[] | undefined
> ```
>
> `suspense: true`를 주면 라우터가 준비될 때까지 렌더링을 중단합니다.
>
> ```tsx
> const id = useQueryParam('id', { suspense: true });
> ```
>
> #### 시그니처
>
> ```ts
> function useQueryParam<T = string>(name: string): T | undefined;
> function useQueryParam<T = string>(
>   name: string,
>   options: {
>     parser?: (val: string) => T;
>     suspense?: boolean;
>   }
> ): T | undefined;
> ```
>
> | 옵션 | 타입 | 설명 |
> | --- | --- | --- |
> | `parser` | `(val: string) => T` | 쿼리 문자열 값을 원하는 타입으로 변환하는 함수 |
> | `suspense` | `boolean` | `true`이면 라우터가 준비될 때까지 Suspense로 대기 |
>
> > **참고**: `useQueryParam`의 `suspense`는 명시적으로 `true`를 전달했을 때만 동작합니다. 옵션을 생략하면 대기하지 않으므로, 라우터가 준비되기 전에는 `undefined`가 반환될 수 있습니다.
>
> ### `useQueryParams`
>
> 모든 쿼리 파라미터를 객체로 반환합니다. 각 값은 선택적(`Partial`)입니다.
>
> ```tsx
> import { useQueryParams } from '@toss/use-query-param';
>
> // /search?keyword=react&page=2
> function Search() {
>   const { keyword, page } = useQueryParams<{ keyword: string; page: string }>();
>
>   return (
>     <div>
>       {keyword} / {page}
>     </div>
>   );
> }
> ```
>
> ```ts
> function useQueryParams<T extends { [key: string]: string } = { [key: string]: string }>(): Partial<T>;
> ```
>
> > **참고**: `useQueryParams`는 항상 Suspense를 사용합니다. 라우터가 준비되기 전에는 Promise를 throw하여 렌더링을 중단하므로, 상위에 `<Suspense>`가 필요합니다.
>
> ### `useNextRouter`
>
> `next/router`의 `useRouter`와 같은 라우터 객체를 반환하되, 기본적으로 라우터가 준비될 때까지 Suspense로 대기합니다.
>
> ```tsx
> import { useNextRouter } from '@toss/use-query-param';
>
> function Page() {
>   const router = useNextRouter(); // 라우터가 준비된 상태로 반환됩니다.
>
>   return <div>{router.pathname}</div>;
> }
>
> // 대기하지 않으려면
> const router = useNextRouter({ suspense: false });
> ```
>
> ```ts
> function useNextRouter(options?: { suspense?: boolean }): NextRouter;
> ```
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `suspense` | `boolean` | `true` | `true`이면 `router.isReady`가 될 때까지 Promise를 throw |
>
> ## Suspense와 함께 사용하기
>
> Suspense 대기가 활성화된 훅을 사용하는 컴포넌트는 `<Suspense>` 안에서 렌더링해야 합니다.
>
> ```tsx
> import { Suspense } from 'react';
>
> function Page() {
>   return (
>     <Suspense fallback={<div>로딩 중...</div>}>
>       <Search />
>     </Suspense>
>   );
> }
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
> ## 라이선스
>
> \[LICENSE](./LICENSE) 파일을 참고하세요.
>
> ## 변경 내역
>
> \[CHANGELOG.md](./CHANGELOG.md)를 참고하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/use-query-param
>
> Next.js의 쿼리 파라미터를 읽는 React 훅 모음입니다.
>
> Next.js의 `router.query`는 자동 정적 최적화가 적용된 페이지에서 처음 렌더링할 때 비어 있고, 라우터가 준비된 뒤에 채워집니다. 이 패키지의 훅은 `router.isReady`가 `true`가 될 때까지 React Suspense로 렌더링을 미룰 수 있어서, 값이 비어 있는 첫 렌더링을 직접 처리하지 않아도 됩니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/use-query-param
> # 또는
> npm install @toss/use-query-param
> ```
>
> peer dependency는 다음과 같습니다.
>
> | 패키지 | 버전 |
> | --- | --- |
> | `next` | `^11.1 \|\| ^12` |
> | `react` | `^16.8 \|\| ^17 \|\| ^18` |
> | `react-dom` | `^16.8 \|\| ^17 \|\| ^18` |
>
> ## 사용법
>
> ### `useQueryParam`
>
> 이름이 일치하는 쿼리 파라미터 하나를 읽습니다. 파라미터가 없으면 `undefined`를 반환합니다.
>
> ```tsx
> import { useQueryParam } from '@toss/use-query-param';
>
> // /products?id=123
> function Product() {
>   const id = useQueryParam('id'); // '123'
>
>   return <p>상품 번호: {id}</p>;
> }
> ```
>
> `parser` 옵션으로 값을 변환할 수 있습니다. 파라미터가 없으면 `parser`를 호출하지 않고 `undefined`를 반환합니다.
>
> ```tsx
> const page = useQueryParam('page', { parser: Number }); // 123
> const isAdmin = useQueryParam('admin', { parser: value => value === 'true' });
> ```
>
> `suspense: true`를 주면 라우터가 준비될 때까지 렌더링을 미룹니다.
>
> ```tsx
> const id = useQueryParam('id', { suspense: true });
> ```
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `parser` | `(val: string) => T` | 없음 | 읽은 문자열 값을 변환합니다. |
> | `suspense` | `boolean` | `false` | `true`이면 `router.isReady`가 `true`가 될 때까지 Suspense를 발생시킵니다. |
>
> `suspense`를 켜지 않으면 라우터가 준비되기 전에는 `undefined`가 반환될 수 있습니다.
>
> ### `useQueryParams`
>
> 모든 쿼리 파라미터를 객체로 반환합니다. 이 훅은 항상 라우터가 준비될 때까지 Suspense를 발생시키므로 반드시 `<Suspense>` 안에서 사용해야 합니다. 제네릭으로 파라미터 이름과 타입을 지정할 수 있으며, 반환 타입은 `Partial<T>`입니다.
>
> ```tsx
> import { Suspense } from 'react';
> import { useQueryParams } from '@toss/use-query-param';
>
> // /search?keyword=react&sort=latest
> function SearchResult() {
>   const { keyword, sort } = useQueryParams<{ keyword: string; sort: string }>();
>
>   return (
>     <p>
>       {keyword} / {sort}
>     </p>
>   );
> }
>
> export default function Page() {
>   return (
>     <Suspense fallback={null}>
>       <SearchResult />
>     </Suspense>
>   );
> }
> ```
>
> ### `useNextRouter`
>
> Next.js의 `useRouter`를 감싼 훅입니다. 기본값으로 `router.isReady`가 `false`이면 Suspense를 발생시키고, 준비되면 `router`를 반환합니다. `{ suspense: false }`를 주면 `useRouter`와 같이 바로 `router`를 반환합니다.
>
> ```tsx
> import { useNextRouter } from '@toss/use-query-param';
>
> const router = useNextRouter(); // 기본값은 { suspense: true }
> ```
>
> ## 주의할 점
>
> - `useQueryParam`의 `suspense` 기본값은 `false`이고, `useQueryParams`와 `useNextRouter`는 기본적으로 Suspense를 발생시킵니다. 훅마다 기본 동작이 다릅니다.
> - Suspense를 사용하는 훅은 `<Suspense>` 경계 안에서 호출해야 합니다.
> - `useQueryParam`은 배열 형태의 쿼리 값(`?a=1&a=2`)을 따로 처리하지 않고 `router.query[name]`을 그대로 반환합니다.
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
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/use-query-param
>
> Next.js의 쿼리 파라미터를 React 훅으로 읽습니다. `router.isReady`가 `true`가 될 때까지 React Suspense로 렌더링을 기다리게 할 수 있습니다.
>
> ```tsx
> import { useQueryParam } from '@toss/use-query-param';
>
> function Page() {
>   // /products?page=2 로 접속한 경우
>   const page = useQueryParam('page', { parser: Number });
>   // ...
> }
> ```
>
> ## 설치
>
> ```sh
> npm install @toss/use-query-param
> # 또는
> yarn add @toss/use-query-param
> ```
>
> `next`(11.1 이상 12 이하), `react`, `react-dom`(16.8 이상 18 이하)이 peer dependency입니다.
>
> ## 사용법
>
> ### `useQueryParam(name, options?)`
>
> 이름이 `name`인 쿼리 파라미터 하나를 읽습니다. 파라미터가 없으면 `undefined`를 반환합니다.
>
> ```tsx
> const keyword = useQueryParam('keyword'); // string | undefined
> ```
>
> `parser`를 넘기면 값을 변환해 반환합니다. 파라미터가 없을 때는 `parser`를 호출하지 않고 `undefined`를 반환합니다.
>
> ```tsx
> const page = useQueryParam('page', { parser: Number }); // number | undefined
> const isAdmin = useQueryParam('admin', { parser: value => value === 'true' }); // boolean | undefined
> ```
>
> `suspense: true`를 넘기면 `router.isReady`가 `true`가 될 때까지 컴포넌트가 Suspense 상태로 대기합니다. 위쪽에 `<Suspense>`가 있어야 합니다. `suspense`를 넘기지 않으면 대기하지 않습니다.
>
> ```tsx
> const keyword = useQueryParam('keyword', { suspense: true });
> ```
>
> | 옵션 | 타입 | 설명 |
> | --- | --- | --- |
> | `parser` | `(val: string) => T` | 쿼리 파라미터 값을 변환하는 함수 |
> | `suspense` | `boolean` | `true`이면 `router.isReady`가 될 때까지 Suspense로 대기 |
>
> ### `useQueryParams<T>()`
>
> 모든 쿼리 파라미터를 객체로 반환합니다. 타입 인자로 파라미터의 이름과 타입을 지정할 수 있고, 반환 타입은 `Partial<T>`입니다. 쿼리가 없으면 `undefined`가 반환됩니다.
>
> `useQueryParam`과 달리 항상 `router.isReady`가 `true`가 될 때까지 Suspense로 대기합니다.
>
> ```tsx
> const { page, keyword } = useQueryParams<{ page: string; keyword: string }>();
> ```
>
> ### `useNextRouter(options?)`
>
> `next/router`의 `useRouter`와 같은 라우터 객체를 반환합니다. 옵션을 넘기지 않으면 `suspense`가 `true`로 동작하며, 라우터가 준비될 때까지 Suspense로 대기합니다. `{ suspense: false }`를 넘기면 대기하지 않고 바로 반환합니다.
>
> ```tsx
> const router = useNextRouter();
> ```
>
> ## 라이선스
>
> MIT License. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

## 2회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/use-query-param
>
> Next.js의 쿼리 파라미터를 React 훅으로 간편하게 읽을 수 있게 해 주는 패키지입니다.
>
> `next/router`의 `router.query`는 첫 렌더링 시점(프리렌더링, 자동 정적 최적화 페이지 등)에 비어 있을 수 있습니다. 이 패키지는 `router.isReady`를 확인하고, 필요하면 React Suspense로 라우터가 준비될 때까지 기다리는 기능을 제공합니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/use-query-param
>
> # yarn
> yarn add @toss/use-query-param
> ```
>
> ### Peer Dependencies
>
> | 패키지 | 지원 버전 |
> | --- | --- |
> | `next` | `^11.1 \|\| ^12` |
> | `react` | `^16.8 \|\| ^17 \|\| ^18` |
> | `react-dom` | `^16.8 \|\| ^17 \|\| ^18` |
>
> > Suspense 기능(`suspense` 옵션)을 사용하려면 컴포넌트 상위에 `<Suspense>`가 필요합니다.
>
> ## 사용법
>
> ### `useQueryParam`
>
> 이름이 일치하는 쿼리 파라미터 하나를 읽습니다.
>
> ```tsx
> import { useQueryParam } from '@toss/use-query-param';
>
> // /products?id=123
> function Product() {
>   const id = useQueryParam('id'); // '123' | undefined
>
>   return <div>상품 번호: {id}</div>;
> }
> ```
>
> #### `parser` 옵션으로 값 변환하기
>
> 쿼리 파라미터가 존재할 때만 `parser`가 호출됩니다. 값이 없으면 `undefined`를 그대로 반환합니다.
>
> ```tsx
> // /products?id=123&active=true
> const id = useQueryParam('id', { parser: Number }); // 123
> const active = useQueryParam('active', { parser: value => value === 'true' }); // true
> ```
>
> #### `suspense` 옵션으로 라우터 준비 기다리기
>
> `suspense: true`이면 `router.isReady`가 `true`가 될 때까지 Suspense를 발생시킵니다. 따라서 훅이 반환하는 값은 항상 라우터가 준비된 이후의 값입니다.
>
> ```tsx
> import { Suspense } from 'react';
> import { useQueryParam } from '@toss/use-query-param';
>
> function Product() {
>   const id = useQueryParam('id', { suspense: true });
>
>   return <div>상품 번호: {id}</div>;
> }
>
> export default function Page() {
>   return (
>     <Suspense fallback={<div>로딩 중...</div>}>
>       <Product />
>     </Suspense>
>   );
> }
> ```
>
> ### `useQueryParams`
>
> 모든 쿼리 파라미터를 객체로 읽습니다. 제네릭으로 파라미터 타입을 지정할 수 있으며, 반환 타입은 `Partial<T>`입니다.
>
> ```tsx
> import { useQueryParams } from '@toss/use-query-param';
>
> // /search?keyword=toss&page=1
> function Search() {
>   const { keyword, page } = useQueryParams<{ keyword: string; page: string }>();
>
>   return (
>     <div>
>       {keyword} / {page}
>     </div>
>   );
> }
> ```
>
> > `useQueryParams`는 항상 Suspense 방식으로 동작합니다. 라우터가 준비되지 않았다면 Suspense를 발생시키므로 상위에 `<Suspense>`를 두어야 합니다.
>
> ### `useNextRouter`
>
> `next/router`의 `useRouter`를 감싼 훅으로, 라우터가 준비되지 않았을 때 Suspense를 발생시킬지 선택할 수 있습니다. 위 두 훅이 내부적으로 사용합니다.
>
> ```tsx
> import { useNextRouter } from '@toss/use-query-param';
>
> function Component() {
>   // isReady가 true가 될 때까지 Suspense 발생 (기본값)
>   const router = useNextRouter();
>
>   // Suspense 없이 useRouter와 동일하게 동작
>   const rawRouter = useNextRouter({ suspense: false });
> }
> ```
>
> ## API
>
> ### `useQueryParam<T = string>(name, options?)`
>
> | 인자 | 타입 | 설명 |
> | --- | --- | --- |
> | `name` | `string` | 읽을 쿼리 파라미터 이름 |
> | `options.parser` | `(val: string) => T` | 값을 원하는 타입으로 변환하는 함수 |
> | `options.suspense` | `boolean` | `true`이면 라우터가 준비될 때까지 Suspense 발생 (기본값: `false`) |
>
> **반환값**: `T | undefined`
>
> ### `useQueryParams<T>()`
>
> **반환값**: `Partial<T>` (`T`의 기본값은 `{ [key: string]: string }`)
>
> ### `useNextRouter(options?)`
>
> | 인자 | 타입 | 설명 |
> | --- | --- | --- |
> | `options.suspense` | `boolean` | `true`이면 라우터가 준비될 때까지 Suspense 발생 |
>
> `options`를 생략하면 `{ suspense: true }`가 기본값으로 적용됩니다. 반환값은 `next/router`의 `NextRouter`입니다.
>
> ### 기본 Suspense 동작 정리
>
> | 훅 | 기본 Suspense |
> | --- | --- |
> | `useQueryParam` | 꺼짐 (`suspense: true`로 켜기) |
> | `useQueryParams` | 켜짐 (끌 수 없음) |
> | `useNextRouter` | 켜짐 (`{ suspense: false }`로 끄기) |
>
> ## 주의사항
>
> - `suspense`를 사용하지 않는 `useQueryParam`은 라우터가 준비되기 전에는 `undefined`를 반환할 수 있습니다.
> - `useQueryParam`의 `parser`에는 `router.query` 값(`string`)이 전달됩니다. 같은 이름의 파라미터가 여러 개라서 값이 배열인 경우는 별도로 처리하지 않으므로, 필요하다면 `useNextRouter`로 `router.query`를 직접 다루세요.
>
> ## 개발
>
> ```bash
> yarn test       # 테스트 실행
> yarn typecheck  # 타입 검사
> yarn build      # dist, esm 빌드
> ```
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/use-query-param
>
> Next.js의 쿼리 파라미터를 읽는 React 훅 모음입니다. `next/router`의 `useRouter`를 감싸고, 라우터가 준비될 때까지 Suspense로 기다리는 옵션을 제공합니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/use-query-param
> # 또는
> npm install @toss/use-query-param
> ```
>
> peer dependency는 다음과 같습니다.
>
> | 패키지 | 버전 |
> |---|---|
> | `next` | `^11.1 \|\| ^12` |
> | `react` | `^16.8 \|\| ^17 \|\| ^18` |
> | `react-dom` | `^16.8 \|\| ^17 \|\| ^18` |
>
> ## 사용법
>
> ### `useQueryParam`
>
> 이름으로 쿼리 파라미터 하나를 읽습니다. 값이 없으면 `undefined`를 반환합니다.
>
> ```tsx
> import { useQueryParam } from '@toss/use-query-param';
>
> function Page() {
>   // /products?id=123
>   const id = useQueryParam('id'); // '123'
>
>   return <div>{id}</div>;
> }
> ```
>
> `parser` 옵션으로 값을 원하는 타입으로 바꿀 수 있습니다. 값이 없으면 `parser`를 호출하지 않고 `undefined`를 반환합니다.
>
> ```tsx
> // /products?id=123&visible=true
> const id = useQueryParam('id', { parser: Number }); // 123
> const visible = useQueryParam('visible', { parser: value => value === 'true' }); // true
> ```
>
> `suspense: true`를 주면 `router.isReady`가 `true`가 될 때까지 렌더링을 중단합니다. 라우터가 준비되기 전에는 쿼리 파라미터 값이 없을 수 있으므로, 값이 반드시 필요하면 이 옵션을 사용하고 상위에 `Suspense`를 두세요. 옵션을 주지 않으면 기다리지 않습니다.
>
> ```tsx
> import { Suspense } from 'react';
> import { useQueryParam } from '@toss/use-query-param';
>
> function Product() {
>   const id = useQueryParam('id', { suspense: true });
>
>   return <div>{id}</div>;
> }
>
> function Page() {
>   return (
>     <Suspense fallback={<div>loading...</div>}>
>       <Product />
>     </Suspense>
>   );
> }
> ```
>
> ### `useQueryParams`
>
> 쿼리 파라미터 전체를 객체로 반환합니다. 쿼리 파라미터가 없으면 `undefined`를 반환합니다. 제네릭으로 키를 지정할 수 있으며, 반환 타입은 `Partial<T>`입니다.
>
> ```tsx
> import { useQueryParams } from '@toss/use-query-param';
>
> // /products?id=123&sort=price
> const params = useQueryParams<{ id: string; sort: string }>();
> // { id: '123', sort: 'price' }
> ```
>
> `useQueryParam`과 달리 항상 `router.isReady`가 `true`가 될 때까지 렌더링을 중단하므로, 상위에 `Suspense`가 필요합니다.
>
> ### `useNextRouter`
>
> `useRouter`와 같은 라우터 객체를 반환하는 훅입니다. 인자 없이 호출하면 `router.isReady`가 `true`가 될 때까지 렌더링을 중단합니다. 중단하지 않으려면 `{ suspense: false }`를 넘기세요.
>
> ```tsx
> import { useNextRouter } from '@toss/use-query-param';
>
> const router = useNextRouter(); // 라우터가 준비될 때까지 중단
> const routerNow = useNextRouter({ suspense: false }); // 중단하지 않음
> ```
>
> ## 훅별 기본 동작
>
> | 훅 | `isReady`가 `false`일 때 기본 동작 |
> |---|---|
> | `useQueryParam` | 중단하지 않음 (`suspense: true`로 중단) |
> | `useQueryParams` | 중단함 |
> | `useNextRouter` | 인자 없이 호출하면 중단함 |
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
> MIT License. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/use-query-param
>
> Next.js의 쿼리 파라미터를 읽는 React 훅 모음입니다. 라우터가 준비되기 전(`router.isReady`가 `false`)에는 쿼리 값이 없으므로, 이 패키지는 준비될 때까지 React Suspense로 렌더링을 미루는 방법을 제공합니다.
>
> ```tsx
> import { useQueryParam } from '@toss/use-query-param';
>
> function Page() {
>   const id = useQueryParam('id', { suspense: true });
>
>   return <div>{id}</div>;
> }
> ```
>
> `Page`는 `<Suspense>` 안에서 렌더링해야 합니다. 라우터가 준비되기 전에는 `Suspense`의 `fallback`이 보이고, 준비된 뒤에 `id` 값으로 다시 렌더링됩니다.
>
> ## 설치
>
> ```sh
> yarn add @toss/use-query-param
> ```
>
> `next`(`^11.1 || ^12`), `react`와 `react-dom`(`^16.8 || ^17 || ^18`)이 peer dependency입니다.
>
> ## 사용법
>
> ### `useQueryParam`
>
> 이름이 `name`인 쿼리 파라미터 하나를 읽습니다. 파라미터가 없으면 `undefined`를 반환합니다.
>
> ```tsx
> // URL이 ?foo=bar일 때
> const foo = useQueryParam('foo'); // 'bar'
> ```
>
> `parser`를 넘기면 값이 있을 때 파싱한 결과를 반환합니다. 파라미터가 없으면 `parser`를 호출하지 않고 `undefined`를 반환합니다.
>
> ```tsx
> const page = useQueryParam('page', { parser: Number }); // number | undefined
> const isOpen = useQueryParam('open', { parser: value => value === 'true' }); // boolean | undefined
> ```
>
> 기본값에서는 라우터가 준비되지 않았어도 Suspense를 일으키지 않습니다. 이때는 쿼리 값이 비어 있을 수 있으니, 준비될 때까지 기다리려면 `suspense: true`를 넘기세요.
>
> ```tsx
> const foo = useQueryParam('foo', { suspense: true });
> ```
>
> ### `useQueryParams`
>
> 쿼리 파라미터 전체를 객체로 반환합니다. 제네릭으로 키를 지정할 수 있고, 반환 타입은 `Partial<T>`입니다.
>
> ```tsx
> const { foo, toss } = useQueryParams<{ foo: string; toss: string }>();
> ```
>
> `useQueryParam`과 달리 `suspense` 옵션이 없고 항상 Suspense를 사용합니다. 라우터가 준비되기 전에는 렌더링을 미루므로 `<Suspense>` 안에서 써야 합니다.
>
> ### `useNextRouter`
>
> `next/router`의 `useRouter`를 감싼 훅으로, 앞의 두 훅이 내부에서 사용합니다. `suspense`의 기본값은 `true`입니다. `isReady`가 `false`이면 준비될 때까지 Suspense를 일으키고, 준비된 뒤에 라우터 객체를 반환합니다.
>
> ```tsx
> const router = useNextRouter();
> const routerNow = useNextRouter({ suspense: false }); // 준비 여부와 관계없이 바로 반환
> ```
>
> ## 라이선스
>
> MIT

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 글빨 0.3.0 우세 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

두 결과 모두 세 훅의 동작과 Suspense 조건을 제대로 설명합니다. X에서는 \"왜 필요한가요?\" 섹션과 `<Suspense>` 래핑 예제가 좋은 점입니다. 하지만 X에는 사용자에게 필요 없는 개발 명령 섹션이 있고, 시그니처와 표가 같은 내용을 되풀이하며, 라이선스 종류도 밝히지 않아 작은 패키지에 비해 문서가 부풀어 있습니다. Y는 맨 앞에 바로 쓸 수 있는 예제를 두었고, peer dependency와 MIT 라이선스를 간결하게 알려 주며, 패키지 크기에 맞는 분량으로 정리했습니다. 그래서 그대로 올리기에는 Y가 낫습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 차이 없음

X는 간결하고 반복이 없으며 라이선스를 바로 밝혀서, 작은 패키지에 맞는 분량이다. Y는 '왜 필요한가요?' 절로 언제 이 패키지가 필요한지(isReady 문제)를 설명하고, Suspense로 감싼 컴포넌트 예시까지 보여 주어 처음 보는 독자에게 실질적인 도움을 준다. 하지만 Suspense 안내가 여러 번 되풀이되고, 시그니처와 표가 겹치며, 개발 절처럼 사용자에게 필요 없는 부분이 있어 부풀려졌다. 강점과 약점이 기준마다 엇갈려 어느 쪽도 분명히 낫다고 보기 어렵다.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

두 결과가 다루는 기능 범위는 같다. Y는 첫 사용 예와 Suspense 조건을 맨 앞에 두고, 각 동작을 한 번씩 산문으로 이어서 설명한다. X는 설치·라이선스 정보가 조금 더 자세하지만, 사용법·API 표·정리 표에 같은 내용을 반복하고 요청하지 않은 개발 절까지 넣어 분량이 크다. 그래서 그대로 올릴 README로는 Y가 낫다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 글빨 0.4.0 우세

X는 패키지의 용도, Suspense가 필요한 이유, 설치 방법, 훅 세 개의 차이를 반복 없이 짧고 자연스럽게 전달합니다. Y는 완전한 Suspense 예제와 배열 값 주의사항처럼 쓸모 있는 내용이 있지만, 같은 기본 동작을 사용법, API 표, 요약 표, 주의사항에서 거듭 설명합니다. 요청에 없던 개발 섹션까지 더해 작은 패키지 문서를 부풀렸습니다. 그대로 올릴 README로는 X가 더 낫습니다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.3.0 우세

Y가 더 간결하지만, X는 패키지가 해결하는 문제(첫 렌더링에서 query가 비어 있는 문제)를 설명해 언제 쓰는지 알려 주고, Suspense 경계로 감싼 전체 예제와 배열 쿼리·기본값 차이 같은 실제로 필요한 주의점을 담았다. X에 반복과 개발 섹션 같은 군더더기가 조금 있지만, 독자에게 주는 정보의 가치가 더 크다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.3.0 우세

X는 간결하고, 첫 사용 예가 맨 앞에 있어 바로 시작하기 좋습니다. Y는 이 패키지가 필요한 이유(첫 렌더링에서 query가 비어 있음)를 설명합니다. suspense를 끈 상태에서 준비 전에 undefined가 나올 수 있다는 점과 배열 쿼리 값을 처리하지 않는다는 점도 알려 줘, 독자가 실제로 부딪힐 문제를 미리 알 수 있습니다. useQueryParams 예제에 <Suspense> 경계까지 보여 준 것도 도움이 됩니다. Y에는 주의할 점의 반복과 개발 섹션 같은 군더더기가 있지만 정도가 크지 않고, 정보 가치가 이를 넘어선다고 봤습니다.

</details>

<details><summary>2회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

다루는 내용은 거의 같습니다. Y는 패키지의 핵심 용도(Suspense로 라우터가 준비될 때까지 기다리기)를 맨 앞의 예제로 보여 줍니다. 반복되는 요약 표나 사용자에게 필요 없는 개발 섹션 없이 분량도 패키지 크기에 맞습니다. X는 Suspense 감싸기 예제를 온전히 보여 주는 장점이 있지만, 기본 동작 표에서 앞의 설명을 반복하고 개발 명령 섹션까지 붙여 글이 부풀었습니다. 그래서 그대로 올리기에는 Y가 조금 더 낫다고 봅니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

두 결과 모두 내용은 정확하고 쓸모가 있습니다. Y의 Suspense 감싸기 예시는 친절합니다. 하지만 기본 동작 표가 앞의 설명을 되풀이하고, 요청하지 않은 개발 섹션과 표 형식의 peer dependency 목록 때문에 작은 패키지 문서가 부풀었습니다. X는 핵심 사용 조건(Suspense 안에서 렌더링)을 맨 앞에 두고 같은 정보를 더 간결하고 매끄럽게 전합니다.

</details>

