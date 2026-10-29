# `toss-sentry-readme`

[← README 초안 2차 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/common/sentry`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 브라우저와 Node.js에서 쓰는 Sentry 모듈이라는 점
- 초기화와 사용 예
- 설치 방법

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ✗ 근거 판정 실패

> # @toss/sentry
>
> Node.js, 브라우저, Next.js 환경에서 같은 방식으로 \[Sentry](https://sentry.io)를 사용할 수 있게 해 주는 isomorphic Sentry 패키지입니다.
>
> 실행 환경에 따라 알맞은 구현이 자동으로 선택되므로, 코드에서는 `import { Sentry } from '@toss/sentry'` 한 줄만 쓰면 됩니다.
>
> | 환경 | 사용하는 구현 |
> | --- | --- |
> | Node.js | `@sentry/node` |
> | 브라우저 | `window.Sentry` (lazy loading된 Sentry 객체)를 감싼 래퍼 |
> | Next.js | `@sentry/nextjs` (`@toss/sentry/nextjs`) |
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/sentry
>
> # yarn
> yarn add @toss/sentry
> ```
>
> Next.js나 React와 함께 사용한다면 `next`, `react`(`^16.8 || ^17 || ^18`)가 필요합니다. 두 패키지 모두 peer dependency이며 필수는 아닙니다(optional).
>
> ## 사용법
>
> ### Node.js / 브라우저
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({
>   dsn: 'https://<key>@<organization>.ingest.sentry.io/<project>',
> });
>
> try {
>   doSomething();
> } catch (error) {
>   Sentry.captureException(error);
> }
> ```
>
> 번들러가 `browser` 조건을 따라 브라우저용 구현을, Node.js에서는 `@sentry/node` 구현을 자동으로 가져옵니다.
>
> ### Next.js
>
> `@toss/sentry/nextjs`에서 `Sentry`와 `withSentryConfig`를 가져올 수 있습니다.
>
> ```ts
> // next.config.js
> import { withSentryConfig } from '@toss/sentry/nextjs';
>
> const nextConfig = {
>   // ...
> };
>
> export default withSentryConfig(nextConfig, {
>   // Sentry 웹팩 플러그인 옵션
> });
> ```
>
> ```ts
> import { Sentry } from '@toss/sentry/nextjs';
>
> Sentry.captureMessage('Hello, Sentry!');
> ```
>
> ## 브라우저 환경 동작 방식
>
> 브라우저에서는 `window.Sentry`에 로드된 Sentry 객체를 사용합니다. Sentry를 lazy loading하면 로드 전후로 `window.Sentry`가 다른 객체로 바뀌기 때문에, 이 패키지는 **함수를 호출할 때마다** `window.Sentry`를 새로 참조합니다. 덕분에 오래된 Sentry 객체를 참조해서 에러가 나는 문제를 피할 수 있습니다.
>
> 브라우저용 `Sentry`가 지원하는 메서드는 다음과 같습니다.
>
> - `init`
> - `captureException`
> - `captureEvent`
> - `captureMessage`
> - `withScope`
> - `configureScope`
> - `addBreadcrumb`
> - `setUser`
> - `setTags` / `setTag`
> - `setExtras` / `setExtra`
> - `setContext`
> - `onLoad`
>
> ### 주의 사항
>
> - `window.Sentry`가 아직 없으면 메서드를 호출해도 아무 일도 일어나지 않고 `undefined`를 반환합니다. 에러는 발생하지 않습니다.
> - 이때 개발 환경(`NODE_ENV !== 'production'`)에서는 `console.warn`으로 경고가 출력됩니다. toss-frontend에서 Next.js로 개발 중이라면 `_document.tsx`에서 `TossDocument`를 사용하고 있는지 확인하세요.
> - 위에 나열되지 않은 `@sentry/browser`의 API는 브라우저용 `Sentry`에 포함되어 있지 않습니다.
>
> ## 개발
>
> ```bash
> yarn test       # 테스트 실행 (jest)
> yarn typecheck  # 타입 체크
> yarn build      # CJS(dist) 및 ESM(esm) 빌드
> ```
>
> `src/testing`에는 `sentry-testkit`으로 Sentry 전송을 가짜로 대체하는 테스트 유틸리티(`useFakeSentry`, `sentryServer`, `FAKE_DSN`)가 있습니다. 이 유틸리티는 패키지의 `exports`에 포함되어 있지 않아, 패키지 내부 테스트용으로만 사용됩니다.
>
> ## 라이선스
>
> \[LICENSE](./LICENSE) 파일을 참고하세요.
>
> ## 변경 내역
>
> \[CHANGELOG.md](./CHANGELOG.md)를 참고하세요.

**근거 판정 실패 이유(판정 모델)**

- Next.js 예제의 주석은 withSentryConfig 두 번째 인자를 'Sentry 웹팩 플러그인 옵션'이라고 설명한다. 하지만 작업 폴더에는 그 인자의 의미를 뒷받침하는 근거가 없다(option 종류 unsupported 주장, 금지 변경 위반).

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/sentry
>
> Node.js, 브라우저, Next.js에서 같은 import 경로로 Sentry를 쓰게 해 주는 패키지입니다. 실행 환경에 맞는 Sentry SDK(`@sentry/node`, `@sentry/nextjs`)를 내보내고, 브라우저 번들에서는 `window.Sentry`를 호출하는 객체를 내보냅니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: '<DSN>' });
> Sentry.captureException(new Error('hello'));
> ```
>
> ## 설치
>
> ```bash
> yarn add @toss/sentry
> ```
>
> `react`(`^16.8 || ^17 || ^18`)와 `next`는 선택적 peer dependency입니다. `@sentry/browser`, `@sentry/nextjs`, `@sentry/node`는 `^6.18.1` 버전이 함께 설치됩니다.
>
> ## 사용
>
> ### Node.js
>
> `@toss/sentry`를 불러오면 `@sentry/node`의 `Sentry`를 그대로 받습니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: '<DSN>' });
>
> await Sentry.captureException(new Error('hello'));
> ```
>
> ### 브라우저
>
> 번들러가 `browser` 조건으로 패키지를 해석하면 같은 `import { Sentry } from '@toss/sentry'`가 브라우저용 `Sentry`로 연결됩니다. 이 객체는 Sentry를 직접 들고 있지 않고, 메서드를 호출할 때마다 `window.Sentry`의 같은 이름 메서드를 호출합니다. Sentry를 lazy loading하면 `window.Sentry`가 로딩 전후로 다른 객체가 되므로, 처음에 한 번 참조해 두면 오래된 객체를 쓰게 되기 때문입니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.setTag('page', 'home');
> Sentry.captureMessage('결제 화면 진입');
> ```
>
> 브라우저용 `Sentry`가 제공하는 메서드는 다음 14개입니다.
>
> `init`, `captureException`, `captureEvent`, `captureMessage`, `withScope`, `configureScope`, `addBreadcrumb`, `setUser`, `setTags`, `setTag`, `setExtras`, `setExtra`, `setContext`, `onLoad`
>
> `window.Sentry`가 없으면 호출은 아무 일도 하지 않고 `undefined`를 반환합니다. `NODE_ENV`가 `production`이 아닐 때는 콘솔에 경고를 남깁니다. toss-frontend에서 Next.js로 개발한다면 `_document.tsx`에서 `TossDocument`를 쓰고 있는지 확인하세요.
>
> ### Next.js
>
> `@toss/sentry/nextjs`는 `@sentry/nextjs`의 `Sentry`와 `withSentryConfig`를 내보냅니다.
>
> ```ts
> import { Sentry, withSentryConfig } from '@toss/sentry/nextjs';
> ```
>
> 번들러가 `browser` 조건으로 해석하는 클라이언트 번들에서는 이 경로도 위의 브라우저용 `Sentry`로 연결되며, 이 번들은 `Sentry`만 내보냅니다.
>
> ## 개발
>
> ```bash
> yarn test       # jest
> yarn typecheck  # tsc --noEmit
> yarn build      # dist(CommonJS)와 esm 출력 생성
> ```
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.1 — ○ 근거 판정 통과

> # @toss/sentry
>
> Node.js, 브라우저, Next.js에서 같은 `import { Sentry } from '@toss/sentry'`로 Sentry를 쓰는 패키지입니다. 번들러와 런타임이 `package.json`의 `exports` 조건에 따라 환경에 맞는 구현을 골라 줍니다.
>
> | 환경 | `Sentry`가 가리키는 것 |
> | --- | --- |
> | Node.js (`@toss/sentry`) | `@sentry/node` |
> | Node.js (`@toss/sentry/nextjs`) | `@sentry/nextjs` |
> | 브라우저 | 호출할 때마다 `window.Sentry`를 찾아 넘겨 주는 객체 |
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: 'YOUR_DSN' });
> Sentry.captureException(new Error('hello'));
> ```
>
> ## 설치
>
> ```sh
> yarn add @toss/sentry
> ```
>
> `@sentry/node`, `@sentry/browser`, `@sentry/nextjs`, `@sentry/types`(모두 `^6.18.1`)는 이 패키지의 의존성이라 따로 설치하지 않아도 됩니다. `next`와 `react`(`^16.8 || ^17 || ^18`)는 선택 peer 의존성입니다.
>
> ## 사용
>
> ### Node.js
>
> `@sentry/node`를 그대로 내보냅니다. `init`, `captureException` 같은 함수를 `@sentry/node`와 같은 방식으로 호출하면 됩니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: 'YOUR_DSN' });
> await Sentry.captureException(new Error('hello'));
> ```
>
> ### Next.js
>
> `@toss/sentry/nextjs`는 `@sentry/nextjs`의 `Sentry`와 `withSentryConfig`를 내보냅니다.
>
> ```ts
> import { Sentry, withSentryConfig } from '@toss/sentry/nextjs';
> ```
>
> 번들러가 `browser` 조건을 따르면 클라이언트 번들에서는 이 경로도 아래 브라우저용 객체로 연결됩니다. 이때 `withSentryConfig`는 내보내지 않습니다. 설정 파일(`next.config.js` 등)처럼 서버에서 실행되는 코드에서 가져오세요.
>
> ### 브라우저
>
> 브라우저용 `Sentry`는 Sentry를 직접 불러오지 않습니다. 페이지에 이미 올라와 있는 `window.Sentry`에 호출을 넘겨 줍니다. Sentry를 지연 로딩하면 `window.Sentry`가 로딩 전후로 다른 객체가 되므로, 함수를 부를 때마다 `window.Sentry`를 새로 참조합니다. 코드에서는 `Sentry`를 변수에 복사하지 않고 `@toss/sentry`에서 가져다 쓰면 됩니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: 'YOUR_DSN' });
> Sentry.setUser({ id: '1234' });
> Sentry.captureMessage('hello');
> ```
>
> 사용할 수 있는 함수는 다음과 같습니다.
>
> `init`, `captureException`, `captureEvent`, `captureMessage`, `withScope`, `configureScope`, `addBreadcrumb`, `setUser`, `setTags`, `setTag`, `setExtras`, `setExtra`, `setContext`, `onLoad`
>
> 이 목록에 없는 함수는 브라우저용 객체에 정의되어 있지 않습니다.
>
> `window.Sentry`가 없으면 호출은 아무 일도 하지 않고 `undefined`를 반환합니다. `NODE_ENV`가 `production`이 아닐 때는 콘솔에 경고도 남깁니다. toss-frontend에서 Next.js로 개발 중이라면 `_document.tsx`에서 `TossDocument`를 쓰고 있는지 확인하세요.
>
> ## 라이선스
>
> MIT

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # @toss/sentry
>
> Node.js, 브라우저, Next.js 어디서든 같은 방식으로 `Sentry`를 불러와 쓸 수 있게 해 주는 아이소모픽(isomorphic) Sentry 래퍼입니다.
>
> 실행 환경에 따라 `@sentry/node`, `@sentry/nextjs`, 또는 `window.Sentry`로 자동 연결되므로, 공통 코드에서 환경별 분기 없이 `import { Sentry } from '@toss/sentry'` 한 줄로 사용할 수 있습니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/sentry
> # 또는
> npm install @toss/sentry
> ```
>
> Next.js나 React와 함께 사용한다면 해당 패키지도 설치되어 있어야 합니다. 둘 다 선택적 peer dependency입니다.
>
> | 패키지  | 버전                  | 필수 여부 |
> | ------- | --------------------- | --------- |
> | `next`  | `*`                   | 선택      |
> | `react` | `^16.8 \|\| ^17 \|\| ^18` | 선택      |
>
> ## 사용법
>
> ### Node.js / 공용 코드
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: 'https://<key>@<org>.ingest.sentry.io/<project>' });
>
> try {
>   doSomething();
> } catch (error) {
>   Sentry.captureException(error);
> }
> ```
>
> ### Next.js
>
> Next.js 프로젝트에서는 `@toss/sentry/nextjs`를 사용합니다. `@sentry/nextjs`의 `Sentry`와 `withSentryConfig`를 함께 내보냅니다.
>
> ```ts
> // next.config.js
> import { withSentryConfig } from '@toss/sentry/nextjs';
>
> export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
> ```
>
> ```ts
> import { Sentry } from '@toss/sentry/nextjs';
>
> Sentry.captureMessage('Hello, Sentry!');
> ```
>
> ## 환경별 동작
>
> 번들러와 런타임이 `package.json`의 `exports` 조건(`browser`, `import`, `require`)에 따라 알맞은 구현을 선택합니다.
>
> | 환경                  | 사용되는 구현                                      |
> | --------------------- | -------------------------------------------------- |
> | Node.js (CJS / ESM)   | `@sentry/node`                                     |
> | Next.js (`/nextjs`)   | `@sentry/nextjs`                                   |
> | 브라우저 (`browser`)  | `window.Sentry`를 호출 시점마다 참조하는 프록시 객체 |
>
> ### 브라우저에서의 동작
>
> 브라우저 빌드는 Sentry를 직접 번들에 포함하지 않고 `window.Sentry`를 사용합니다. Sentry가 지연 로딩(lazy loading)되면 로딩 전후로 `window.Sentry` 객체가 바뀌기 때문에, 이 패키지는 값을 미리 캡처해 두지 않고 **메서드를 호출할 때마다** `window.Sentry`를 새로 참조합니다.
>
> 브라우저에서 지원하는 메서드는 다음과 같습니다.
>
> - `init`
> - `captureException`, `captureEvent`, `captureMessage`
> - `withScope`, `configureScope`
> - `addBreadcrumb`
> - `setUser`, `setTag`, `setTags`, `setExtra`, `setExtras`, `setContext`
> - `onLoad`
>
> 주의할 점은 다음과 같습니다.
>
> - `window.Sentry`가 아직 없으면 메서드 호출은 에러 없이 무시되고(`undefined` 반환), 개발 모드(`NODE_ENV !== 'production'`)에서는 콘솔에 경고가 출력됩니다.
> - toss-frontend에서 Next.js로 개발 중이라면 `_document.tsx`에서 `TossDocument`를 사용하고 있는지 확인하세요. 이 경고가 뜨는 가장 흔한 원인입니다.
>
> ## 개발
>
> ```bash
> yarn build       # CJS(dist)와 ESM(esm) 빌드
> yarn test        # Jest 테스트 실행
> yarn typecheck   # 타입 검사
> ```
>
> `src/testing`에는 \[`sentry-testkit`](https://github.com/zivl/sentry-testkit) 기반의 테스트 도구(`useFakeSentry`, `sentryServer`, `FAKE_DSN`)가 있습니다. 실제 Sentry 서버로 전송하지 않고 캡처된 리포트를 검증할 수 있습니다. 다만 이 모듈은 패키지의 공개 `exports`에 포함되어 있지 않고, 이 패키지 내부 테스트용으로 사용됩니다.
>
> ```ts
> import { Sentry } from './index.node';
> import { sentryServer } from './testing';
> import { FAKE_DSN } from './testing/constants';
>
> Sentry.init({ dsn: FAKE_DSN });
> await Sentry.captureException(new Error('hello'));
>
> expect(sentryServer.reports()).toHaveLength(1);
> ```
>
> ## 의존성
>
> - `@sentry/browser`, `@sentry/node`, `@sentry/nextjs`, `@sentry/types`: `^6.18.1`
> - `sentry-testkit`: `^3.3.7`
>
> ## 변경 내역
>
> \[CHANGELOG.md](./CHANGELOG.md)를 참고하세요.
>
> ## 라이선스
>
> \[LICENSE](./LICENSE) 파일을 참고하세요.

**근거 판정 실패 이유(판정 모델)**

- sentry-testkit 외부 링크(https://github.com/zivl/sentry-testkit)는 작업 폴더에서 근거를 찾을 수 없는 unsupported link 주장임

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/sentry
>
> Node.js, 브라우저, Next.js에서 같은 `import { Sentry } from '@toss/sentry'`로 Sentry를 쓰게 해 주는 패키지입니다. 실행 환경에 맞는 Sentry 객체를 번들러와 런타임이 알아서 골라 줍니다.
>
> - Node.js에서는 `@sentry/node`를 그대로 내보냅니다.
> - 브라우저에서는 `window.Sentry`에 호출을 넘기는 객체를 내보냅니다.
> - `@toss/sentry/nextjs`에서는 `@sentry/nextjs`와 `withSentryConfig`를 내보냅니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: 'YOUR_DSN' });
> Sentry.captureException(new Error('hello'));
> ```
>
> ## 설치
>
> ```bash
> yarn add @toss/sentry
> # 또는
> npm install @toss/sentry
> ```
>
> `@sentry/browser`, `@sentry/nextjs`, `@sentry/node`, `@sentry/types`는 `^6.18.1`로 이 패키지의 `dependencies`에 들어 있어 따로 설치하지 않아도 됩니다. `next`와 `react`(`^16.8 || ^17 || ^18`)는 선택 peer dependency입니다.
>
> ## 사용
>
> ### Node.js
>
> `@sentry/node`의 모든 export를 `Sentry`로 묶어 내보냅니다. 사용법은 `@sentry/node`와 같습니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: 'YOUR_DSN' });
>
> await Sentry.captureException(new Error('hello'));
> ```
>
> ### 브라우저
>
> 브라우저 번들에서는 `import { Sentry } from '@toss/sentry'`가 `window.Sentry`로 호출을 넘기는 객체로 해석됩니다. 호출할 때마다 `window.Sentry`를 새로 읽으므로, Sentry를 지연 로딩해서 `window.Sentry`가 로딩 전후로 다른 객체가 되어도 오래된 객체를 참조하지 않습니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.setUser({ id: '1234' });
> Sentry.captureMessage('결제 화면 진입');
> ```
>
> 이 패키지는 `window.Sentry`를 만들지 않습니다. 호출 시점에 `window.Sentry`가 없으면 다음과 같이 동작합니다.
>
> - 호출은 에러 없이 `undefined`를 반환하고 아무것도 전송되지 않습니다.
> - `NODE_ENV`가 `production`이 아니면 `console.warn`으로 경고를 남깁니다. toss-frontend에서 Next.js로 개발 중이라면 `_document.tsx`에서 `TossDocument`를 쓰고 있는지 확인하라는 안내가 함께 나옵니다.
>
> `window.Sentry`로 넘기는 메서드는 다음 14개입니다. 이 목록에 없는 `Sentry`의 다른 멤버는 브라우저 번들에서 제공하지 않습니다.
>
> `init`, `captureException`, `captureEvent`, `captureMessage`, `withScope`, `configureScope`, `addBreadcrumb`, `setUser`, `setTags`, `setTag`, `setExtras`, `setExtra`, `setContext`, `onLoad`
>
> 타입은 `@sentry/browser`의 타입을 따릅니다.
>
> ### Next.js
>
> `@toss/sentry/nextjs`는 `@sentry/nextjs`의 `Sentry`와 `withSentryConfig`를 내보냅니다.
>
> ```js
> // next.config.js
> const { withSentryConfig } = require('@toss/sentry/nextjs');
>
> const nextConfig = {};
>
> module.exports = withSentryConfig(nextConfig);
> ```
>
> ```ts
> import { Sentry } from '@toss/sentry/nextjs';
>
> Sentry.captureException(new Error('hello'));
> ```
>
> `withSentryConfig`는 `@sentry/nextjs`의 `Sentry.withSentryConfig`이므로 인자는 `@sentry/nextjs` 문서를 따릅니다. 브라우저 번들에서는 `@toss/sentry/nextjs`도 위의 `window.Sentry` 객체 하나만 내보내며, `withSentryConfig`는 없습니다.
>
> ## 라이선스
>
> MIT

### 글빨 0.4.1 — ○ 근거 판정 통과

> # @toss/sentry
>
> Node.js, 브라우저, Next.js에서 같은 import 경로로 Sentry를 쓰기 위한 패키지입니다. Node.js와 Next.js에서는 `@sentry/node`와 `@sentry/nextjs`를 그대로 내보냅니다. 브라우저에서는 `window.Sentry`를 호출 시점마다 찾아 쓰는 래퍼를 내보냅니다.
>
> ```ts
> import { Sentry } from '@toss/sentry';
>
> Sentry.init({ dsn: '<DSN>' });
> Sentry.captureException(new Error('hello'));
> ```
>
> ## 설치
>
> ```sh
> yarn add @toss/sentry
> ```
>
> Sentry는 6.x(`^6.18.1`)를 의존성으로 함께 설치합니다. `next`와 `react`(`^16.8 || ^17 || ^18`)는 필수가 아닌 peer dependency입니다.
>
> ## 사용
>
> ### Node.js와 브라우저
>
> 위 예제의 `@toss/sentry` import를 Node.js와 브라우저에서 모두 씁니다. 번들러가 `browser` 조건을 따르면 같은 import가 브라우저용 코드로 연결됩니다. Node.js에서는 `@sentry/node`가, 브라우저에서는 아래의 래퍼가 `Sentry`가 됩니다.
>
> 브라우저용 `Sentry`는 호출할 때마다 `window.Sentry`를 새로 읽어 같은 이름의 함수를 호출합니다. Sentry를 지연 로딩하면 로딩 전후에 `window.Sentry` 객체가 바뀌기 때문에, `const Sentry = window.Sentry`처럼 한 번만 읽어 두면 오래된 객체를 참조하다 에러가 납니다. 이 래퍼는 그 문제를 피하려고 만들었습니다.
>
> - `window.Sentry`는 이 패키지가 만들어 주지 않으므로 페이지에서 미리 준비되어 있어야 합니다. 값이 없으면 호출은 아무 일도 하지 않고 `undefined`를 반환하며, `NODE_ENV`가 `production`이 아닐 때는 콘솔에 경고를 출력합니다.
> - 래퍼가 연결하는 함수는 `init`, `captureException`, `captureEvent`, `captureMessage`, `withScope`, `configureScope`, `addBreadcrumb`, `setUser`, `setTags`, `setTag`, `setExtras`, `setExtra`, `setContext`, `onLoad`입니다. 그 밖의 `@sentry/browser` 멤버는 브라우저용 `Sentry`에 없습니다. 타입은 `@sentry/browser` 전체 타입(`typeof @sentry/browser`)이므로 타입 검사로는 걸러지지 않습니다.
> - 경고 문구는 toss-frontend에서 Next.js로 개발하는 경우 `_document.tsx`에서 `TossDocument`를 사용하는지 확인하라고 안내합니다.
>
> ### Next.js
>
> ```ts
> import { Sentry, withSentryConfig } from '@toss/sentry/nextjs';
> ```
>
> `Sentry`는 `@sentry/nextjs` 전체이고 `withSentryConfig`는 그 안의 `withSentryConfig`입니다. 사용법은 `@sentry/nextjs`와 같습니다. 번들러가 `browser` 조건을 따르면 이 경로도 브라우저용 `Sentry` 래퍼로 연결되며, 이때는 `withSentryConfig`를 내보내지 않습니다.
>
> ## 라이선스
>
> MIT

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.1 | 비교 안 함(근거 판정 실패) |
| 2 | 글빨 없음 vs 글빨 0.4.1 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.4.0 vs 글빨 0.4.1 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 0.4.0 vs 글빨 0.4.1 | 순서를 바꾸면 판정이 바뀜 |

<details><summary>1회차 글빨 0.4.0 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.4.1) → 글빨 0.4.1 우세

두 글은 구성과 내용이 거의 같다. 다만 Y는 첫머리 표로 환경별 연결 대상을 바로 보여 준다. 또 클라이언트 번들에서 withSentryConfig를 내보내지 않는다는 점을 알려 주고 어디서 가져와야 하는지까지 안내한다. 브라우저 객체를 변수에 복사하지 말라는 행동 지침도 준다. 실제 사용자에게 더 쓸모 있는 쪽은 Y다. X의 개발 섹션은 사용자 README에서는 부차적이다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 0.4.0) → 차이 없음

X는 환경 표와 withSentryConfig 사용 위치, 정의되지 않은 함수에 대한 주의 등 실용 정보가 조금 더 많고 개발 섹션 같은 군더더기가 없다. Y는 섹션 순서와 설명 흐름이 더 자연스럽다. 두 글 모두 그대로 올릴 수 있는 수준이고, 기준별 우열이 엇갈려 차이가 크지 않다.

</details>

<details><summary>2회차 글빨 0.4.0 vs 글빨 0.4.1: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.4.1) → 글빨 0.4.1 우세

Y가 더 낫다. 두 결과 모두 요청을 충족한다. Y는 반복이 적고, 브라우저 래퍼를 만든 이유를 연결된 설명으로 전한다. 또 타입은 `@sentry/browser` 전체를 따르지만 실제로는 메서드 14개만 있어 타입 검사로 걸러지지 않는다는 실용적인 함정을 짚는다. X에는 next.config.js 예제처럼 독자에게 쓸모 있는 부분이 있다. 그러나 도입부 목록과 각 섹션, 예제가 같은 내용을 되풀이해 Y보다 덜 간결하다.

**2번째 판정** (결과 X = 글빨 0.4.1, 결과 Y = 글빨 0.4.0) → 차이 없음

X는 간결하고 정확하며, 래퍼가 왜 필요한지와 타입 함정을 잘 설명합니다. Y는 Next.js 설정 예제와 브라우저 사용 예가 있어 실용적이지만 반복이 있고, Node 예제의 await가 어색합니다. 기준별 장단점이 엇갈려 어느 쪽도 분명히 낫다고 보기 어렵습니다.

</details>

