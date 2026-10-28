# `toss-use-funnel-readme`

[← README 초안 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지 README를 한국어로 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/react/use-funnel`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 퍼널 스텝을 관리하는 훅이라는 점
- 처음 설정하고 스텝을 정의하는 예
- API

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/use-funnel
>
> Next.js에서 여러 단계(스텝)로 이루어진 퍼널(Funnel) 화면을 선언적으로 만들 수 있게 해 주는 React Hook입니다.
>
> 현재 스텝은 URL의 쿼리 파라미터에 저장됩니다. 그래서 스텝마다 브라우저 히스토리가 쌓이고, 뒤로 가기·앞으로 가기와 새로고침에도 같은 스텝이 유지됩니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/use-funnel
>
> # yarn
> yarn add @toss/use-funnel
> ```
>
> ### Peer Dependencies
>
> | 패키지 | 버전 |
> | --- | --- |
> | `next` | `>=11` |
> | `react` | `^16.0.0 \|\| ^17.0.0` |
> | `react-dom` | `^16.0.0 \|\| ^17.0.0` |
> | `react-query` | `^3` |
>
> ## 사전 준비
>
> `useFunnel`은 내부에서 `react-query`의 `useQuery`를 `suspense: true`로 사용합니다. 따라서 `useFunnel`을 호출하는 컴포넌트는 항상 아래 두 가지 안쪽에서 렌더되어야 합니다.
>
> - `QueryClientProvider`
> - `Suspense`
>
> ```tsx
> import { Suspense } from 'react';
> import { QueryClient, QueryClientProvider } from 'react-query';
>
> const queryClient = new QueryClient();
>
> function App({ children }) {
>   return (
>     <QueryClientProvider client={queryClient}>
>       <Suspense fallback={null}>{children}</Suspense>
>     </QueryClientProvider>
>   );
> }
> ```
>
> ## 사용법
>
> ### 기본 사용
>
> 스텝 이름 목록을 `as const`로 넘기면, `Step`의 `name`과 `setStep`의 인자가 해당 이름들로 타입 추론됩니다.
>
> ```tsx
> import { useFunnel } from '@toss/use-funnel';
>
> const steps = ['약관동의', '정보입력', '완료'] as const;
>
> function SignUpPage() {
>   const [Funnel, setStep] = useFunnel(steps, { initialStep: '약관동의' });
>
>   return (
>     <Funnel>
>       <Funnel.Step name="약관동의">
>         <button onClick={() => setStep('정보입력')}>다음</button>
>       </Funnel.Step>
>       <Funnel.Step name="정보입력">
>         <button onClick={() => setStep('완료')}>가입하기</button>
>       </Funnel.Step>
>       <Funnel.Step name="완료">
>         <p>가입이 완료되었습니다.</p>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> `setStep('정보입력')`을 호출하면 URL이 `?funnel-step=정보입력`으로 바뀝니다.
>
> ### 스텝과 상태를 함께 관리하기: `withState`
>
> `withState`를 쓰면 스텝 전환과 퍼널 상태 갱신을 한 번에 할 수 있습니다. 상태 갱신이 끝난 뒤에 스텝이 전환되므로, 다음 스텝은 항상 갱신된 상태를 보고 렌더됩니다.
>
> ```tsx
> function Page() {
>   const [Funnel, state, setState] = useFunnel(['시작', '다음'] as const, {
>     initialStep: '시작',
>   }).withState<{ count?: number }>({});
>
>   return (
>     <Funnel>
>       <Funnel.Step name="시작">
>         <button onClick={() => setState({ step: '다음', count: 1 })}>확인</button>
>       </Funnel.Step>
>       <Funnel.Step name="다음">
>         <span>{state.count}</span>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> - `setState`에 `step`을 포함하면 상태가 반영된 후 해당 스텝으로 이동합니다.
> - `step`은 상태 타입에 직접 정의할 수 없습니다. `withState`의 제네릭에는 `step`을 제외한 상태만 지정하세요.
> - 상태는 `sessionStorage`에 저장되어 새로고침해도 유지됩니다. 저장 키는 `use-funnel-state__{basePath}{pathname}` 형태입니다.
> - `setState`에는 객체 또는 함수를 넘길 수 있습니다.
>
> ## API
>
> ### `useFunnel(steps, options?)`
>
> ```ts
> const [Funnel, setStep] = useFunnel(steps, options);
> const [Funnel, state, setState] = useFunnel(steps, options).withState(initialState);
> ```
>
> #### 파라미터
>
> | 이름 | 타입 | 설명 |
> | --- | --- | --- |
> | `steps` | `readonly [string, ...string[]]` | 퍼널을 구성하는 스텝 이름 목록입니다. 비어 있으면 에러가 발생합니다. |
> | `options.stepQueryKey` | `string` | 현재 스텝을 저장할 쿼리 파라미터 키입니다. 기본값은 `'funnel-step'`입니다. |
> | `options.initialStep` | `Steps[number]` | 쿼리 파라미터에 스텝이 없을 때 렌더할 스텝입니다. |
> | `options.onStepChange` | `(name: Steps[number]) => void` | `setStep`으로 스텝이 바뀔 때 호출됩니다. |
>
> 쿼리 파라미터에도 `initialStep`에도 스텝 정보가 없으면 에러가 발생합니다.
>
> #### 반환값
>
> | 이름 | 설명 |
> | --- | --- |
> | `Funnel` | 퍼널 컴포넌트입니다. 자식으로 `Funnel.Step`을 받아 현재 스텝에 해당하는 것만 렌더합니다. |
> | `setStep(step, options?)` | 스텝을 전환합니다. |
> | `state`, `setState` | `withState`를 사용할 때만 반환됩니다. |
>
> ### `setStep(step, options?)`
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `stepChangeType` | `'push' \| 'replace'` | `'push'` | `push`는 히스토리를 쌓고, `replace`는 현재 히스토리를 교체합니다. |
> | `preserveQuery` | `boolean` | `true` | 스텝 외의 기존 쿼리 파라미터를 유지할지 여부입니다. |
>
> URL 변경은 `router.push` / `router.replace`의 `shallow: true` 옵션으로 이루어지므로 `getServerSideProps` 등이 다시 실행되지 않습니다.
>
> ```ts
> // 히스토리를 남기지 않고 이동
> setStep('완료', { stepChangeType: 'replace' });
>
> // 다른 쿼리 파라미터는 버리고 스텝만 남김
> setStep('완료', { preserveQuery: false });
> ```
>
> ### `Funnel.Step`
>
> | Prop | 타입 | 설명 |
> | --- | --- | --- |
> | `name` | `Steps[number]` | 스텝 이름입니다. `steps`에 포함된 값이어야 합니다. |
> | `onEnter` | `() => void` | 해당 스텝이 렌더되어 진입했을 때 호출됩니다. |
> | `children` | `ReactNode` | 스텝에서 보여줄 내용입니다. |
>
> `Funnel`의 자식 중 `steps`에 없는 이름을 가진 `Step`은 무시됩니다. 현재 스텝에 해당하는 `Funnel.Step`이 없으면 에러가 발생합니다.
>
> ## 서버 사이드 렌더링
>
> 쿼리 파라미터가 없는 첫 진입 시에도 SSR에서 에러가 나지 않도록 `initialStep`을 지정하는 것을 권장합니다.
>
> ## 개발
>
> ```bash
> yarn test        # 테스트 실행
> yarn typecheck   # 타입 검사
> yarn build       # 빌드
> ```
>
> ## 라이선스
>
> \[LICENSE](./LICENSE) 파일을 참고하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/use-funnel
>
> 여러 단계로 나뉜 화면(퍼널)을 Next.js에서 구현하는 React 훅입니다. 현재 스텝을 URL 쿼리 파라미터에 저장하므로 스텝을 바꾸면 브라우저 히스토리에 기록되고, 새로고침해도 같은 스텝이 열립니다. `withState`를 쓰면 스텝 사이에서 공유하는 상태도 함께 관리할 수 있습니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/use-funnel
> ```
>
> peer dependency는 다음과 같습니다.
>
> | 패키지 | 버전 |
> | --- | --- |
> | `next` | `>=11` |
> | `react`, `react-dom` | `^16.0.0 \|\| ^17.0.0` |
> | `react-query` | `^3` |
>
> `useFunnel`은 내부에서 `react-query`의 `useQuery`를 `suspense: true`로 호출합니다. 사용하는 컴포넌트 위에 `QueryClientProvider`와 `Suspense`가 있어야 합니다.
>
> ## 사용법
>
> ```tsx
> import { useFunnel } from '@toss/use-funnel';
>
> const steps = ['이름', '주소', '완료'] as const;
>
> function SignUp() {
>   const [Funnel, setStep] = useFunnel(steps, { initialStep: '이름' });
>
>   return (
>     <Funnel>
>       <Funnel.Step name="이름">
>         <button onClick={() => setStep('주소')}>다음</button>
>       </Funnel.Step>
>       <Funnel.Step name="주소">
>         <button onClick={() => setStep('완료')}>다음</button>
>       </Funnel.Step>
>       <Funnel.Step name="완료">
>         <h1>가입이 끝났습니다</h1>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> `setStep('주소')`를 호출하면 URL이 `?funnel-step=주소`로 바뀌고 `주소` 스텝이 렌더됩니다. `Funnel`은 현재 스텝과 이름이 같은 `Funnel.Step` 하나만 렌더합니다. `steps`에 없는 이름의 `Funnel.Step`은 무시하고, 현재 스텝에 해당하는 `Funnel.Step`이 없으면 에러가 납니다.
>
> ### 스텝 변경 방식
>
> `setStep`의 두 번째 인자로 변경 방식을 정합니다.
>
> ```tsx
> setStep('주소', { stepChangeType: 'replace', preserveQuery: false });
> ```
>
> | 옵션 | 기본값 | 설명 |
> | --- | --- | --- |
> | `stepChangeType` | `'push'` | `'push'`는 히스토리에 새 항목을 추가하고, `'replace'`는 현재 항목을 바꿉니다. 두 경우 모두 `shallow` 라우팅입니다. |
> | `preserveQuery` | `true` | 스텝 외의 기존 쿼리 파라미터를 유지할지 정합니다. |
>
> ### `useFunnel` 옵션
>
> | 옵션 | 기본값 | 설명 |
> | --- | --- | --- |
> | `initialStep` | 없음 | 쿼리 파라미터에 스텝이 없을 때 렌더할 스텝입니다. 지정하지 않았는데 쿼리 파라미터도 없으면 에러가 납니다. |
> | `stepQueryKey` | `'funnel-step'` | 현재 스텝을 저장할 쿼리 파라미터 이름입니다. |
> | `onStepChange` | 없음 | `setStep`을 호출할 때 새 스텝 이름을 받아 실행됩니다. |
>
> `Funnel.Step`에는 `onEnter`를 넘길 수 있습니다. 해당 스텝이 렌더될 때 실행됩니다.
>
> ### 스텝 사이에서 상태 공유하기: `withState`
>
> `useFunnel(...)`이 반환한 값에서 `withState(initialState)`를 호출하면 `[Funnel, state, setState]`를 받습니다.
>
> ```tsx
> function Order() {
>   const [Funnel, state, setState] = useFunnel(['시작', '다음'] as const).withState<{ count?: number }>({});
>
>   return (
>     <Funnel>
>       <Funnel.Step name="시작">
>         <button onClick={() => setState({ step: '다음', count: 1 })}>확인</button>
>       </Funnel.Step>
>       <Funnel.Step name="다음">
>         <span>{state.count}</span>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> - `setState`에 `step`을 넣으면 상태 갱신이 끝난 뒤에 스텝이 바뀝니다. 다음 스텝은 갱신된 상태를 받은 채로 렌더됩니다.
> - `setState`는 객체와 함수를 모두 받으며, 객체를 넘기면 이전 상태에 병합하지 않고 그 값으로 바꿉니다.
> - 상태는 `sessionStorage`에 `use-funnel-state__{basePath}{pathname}` 키로 저장되므로 같은 탭에서 새로고침해도 유지됩니다.
> - `state` 타입에는 `step`을 정의할 수 없습니다.
>
> ## 개발
>
> ```bash
> yarn test       # jest
> yarn typecheck  # tsc --noEmit
> yarn build      # dist, esm 생성
> ```
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/use-funnel
>
> 여러 단계로 이어지는 화면(가입, 신청, 결제 등)을 Next.js에서 만들 때 쓰는 React 훅입니다. 현재 단계를 URL 쿼리 스트링에 저장하므로 브라우저의 뒤로 가기·앞으로 가기로 단계 사이를 오갈 수 있습니다. 단계마다 입력한 값은 `withState`로 함께 관리할 수 있습니다.
>
> ```tsx
> import { useFunnel } from '@toss/use-funnel';
>
> const steps = ['terms', 'profile', 'done'] as const;
>
> function SignupPage() {
>   const [Funnel, setStep] = useFunnel(steps, { initialStep: 'terms' });
>
>   return (
>     <Funnel>
>       <Funnel.Step name="terms">
>         <button onClick={() => setStep('profile')}>동의하고 계속하기</button>
>       </Funnel.Step>
>       <Funnel.Step name="profile">
>         <button onClick={() => setStep('done')}>가입하기</button>
>       </Funnel.Step>
>       <Funnel.Step name="done">가입이 끝났습니다.</Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> URL이 `?funnel-step=profile`이면 `profile` 단계만 렌더링됩니다. 쿼리 파라미터가 없으면 `initialStep`의 단계를 렌더링합니다.
>
> ## 설치
>
> ```sh
> yarn add @toss/use-funnel
> # 또는
> npm install @toss/use-funnel
> ```
>
> peer dependency로 `next`(>=11), `react`, `react-dom`(`^16.0.0 || ^17.0.0`), `react-query`(`^3`)가 필요합니다.
>
> ## 사용 전에 준비할 것
>
> `useFunnel`은 내부에서 react-query의 `useQuery`를 suspense 모드로 호출합니다. 이 훅을 쓰는 컴포넌트의 상위에 `QueryClientProvider`와 `Suspense`가 있어야 합니다.
>
> ```tsx
> import { Suspense } from 'react';
> import { QueryClient, QueryClientProvider } from 'react-query';
>
> const queryClient = new QueryClient();
>
> function App({ children }) {
>   return (
>     <QueryClientProvider client={queryClient}>
>       <Suspense fallback={null}>{children}</Suspense>
>     </QueryClientProvider>
>   );
> }
> ```
>
> ## 사용법
>
> ### 단계 정의와 이동
>
> `useFunnel(steps, options?)`에 단계 이름 배열을 넘기면 `[Funnel, setStep]`을 돌려줍니다. 단계 이름 배열은 비어 있으면 안 되고, 타입 추론을 위해 `as const`로 선언합니다.
>
> - `Funnel`: 현재 단계의 `Funnel.Step`만 렌더링하는 컴포넌트입니다. 현재 단계에 해당하는 `Funnel.Step`이 자식에 없으면 에러가 납니다.
> - `setStep(step, options?)`: 현재 단계를 바꿉니다. 라우터의 shallow 라우팅으로 URL을 갱신합니다.
>
> ```tsx
> setStep('profile'); // 히스토리에 쌓으며 이동 (기본값)
> setStep('profile', { stepChangeType: 'replace' }); // 현재 히스토리 항목을 교체
> setStep('profile', { preserveQuery: false }); // 다른 쿼리 파라미터를 버리고 단계만 남김
> ```
>
> `setStep`의 두 번째 인자:
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `stepChangeType` | `'push' \| 'replace'` | `'push'` | 히스토리에 새 항목을 쌓을지, 현재 항목을 교체할지 정합니다. |
> | `preserveQuery` | `boolean` | `true` | 현재 URL의 다른 쿼리 파라미터를 유지할지 정합니다. |
>
> ### useFunnel 옵션
>
> ```tsx
> const [Funnel, setStep] = useFunnel(steps, {
>   initialStep: 'terms',
>   stepQueryKey: 'step',
>   onStepChange: name => console.log(name),
> });
> ```
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `initialStep` | 단계 이름 | 없음 | 쿼리 파라미터에 단계가 없을 때 렌더링할 단계입니다. 쿼리 파라미터도 `initialStep`도 없으면 에러가 납니다. |
> | `stepQueryKey` | `string` | `'funnel-step'` | 현재 단계를 저장할 쿼리 파라미터 이름입니다. |
> | `onStepChange` | `(name) => void` | 없음 | `setStep`을 호출할 때 이동할 단계 이름과 함께 호출됩니다. |
>
> ### 단계에 진입할 때 실행하기
>
> `Funnel.Step`의 `onEnter`는 해당 단계가 렌더링될 때 실행됩니다. `onEnter`가 바뀌면 다시 실행되므로, 렌더링마다 새 함수를 만들지 않도록 `useCallback` 등으로 고정해서 넘기세요.
>
> ```tsx
> <Funnel.Step name="done" onEnter={sendCompleteLog}>
>   가입이 끝났습니다.
> </Funnel.Step>
> ```
>
> ### 단계와 상태를 함께 관리하기
>
> `useFunnel(steps).withState(initialState)`는 `[Funnel, state, setState]`를 돌려줍니다. 상태는 현재 경로(`basePath`와 `pathname`)를 키로 `sessionStorage`에 저장됩니다.
>
> `setState`에 `step`을 함께 넘기면 상태가 갱신된 뒤에 단계가 바뀝니다. 다음 단계가 렌더링되는 시점에는 `state`에 새 값이 들어 있습니다.
>
> ```tsx
> function SignupPage() {
>   const [Funnel, state, setState] = useFunnel(['name', 'confirm'] as const).withState<{ name?: string }>({});
>
>   return (
>     <Funnel>
>       <Funnel.Step name="name">
>         <NameForm onSubmit={name => setState({ step: 'confirm', name })} />
>       </Funnel.Step>
>       <Funnel.Step name="confirm">
>         <Confirm name={state.name} />
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> - `setState`에 객체를 넘기면 상태를 그 값으로 바꿉니다. 기존 값과 합치지 않습니다.
> - 함수를 넘기면 현재 상태를 받아 다음 상태를 반환합니다. 이때 반환값에 `step`을 포함해야 합니다.
> - 상태 타입에는 `step` 키를 넣을 수 없습니다.
> - `withState`로 바꾼 단계는 `stepChangeType: 'push'`, `preserveQuery: true`로 이동합니다.
>
> ## 개발
>
> ```sh
> yarn test       # jest
> yarn typecheck  # tsc --noEmit
> yarn build      # dist, esm 디렉터리 생성
> ```
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 참고하세요.

## 2회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/use-funnel
>
> Next.js에서 여러 단계로 이뤄진 화면 흐름(퍼널)을 선언적으로 만들 수 있게 해 주는 React 훅입니다.
>
> 현재 스텝은 URL의 쿼리 파라미터에 저장됩니다. 그래서 새로고침해도 같은 스텝이 유지되고, 브라우저의 뒤로 가기·앞으로 가기도 스텝 이동으로 동작합니다.
>
> ## 설치
>
> ```bash
> # yarn
> yarn add @toss/use-funnel
>
> # npm
> npm install @toss/use-funnel
> ```
>
> ### Peer Dependencies
>
> | 패키지 | 버전 |
> | --- | --- |
> | `next` | `>=11` |
> | `react` | `^16.0.0 \|\| ^17.0.0` |
> | `react-dom` | `^16.0.0 \|\| ^17.0.0` |
> | `react-query` | `^3` |
>
> ## 사용법
>
> ### 기본 사용
>
> `useFunnel`에 스텝 이름 배열을 넘기면 퍼널 컴포넌트와 스텝을 이동하는 `setStep` 함수를 반환합니다.
> 스텝 이름이 타입으로 추론되도록 배열에는 `as const`를 붙여 주세요.
>
> ```tsx
> import { useFunnel } from '@toss/use-funnel';
>
> const steps = ['정보입력', '약관동의', '완료'] as const;
>
> function SignUpPage() {
>   const [Funnel, setStep] = useFunnel(steps, { initialStep: '정보입력' });
>
>   return (
>     <Funnel>
>       <Funnel.Step name="정보입력">
>         <button onClick={() => setStep('약관동의')}>다음</button>
>       </Funnel.Step>
>       <Funnel.Step name="약관동의">
>         <button onClick={() => setStep('완료')}>동의하고 가입하기</button>
>       </Funnel.Step>
>       <Funnel.Step name="완료">
>         <h1>가입이 완료되었어요</h1>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> `setStep('약관동의')`를 호출하면 URL이 `?funnel-step=약관동의`로 바뀌고 해당 스텝이 렌더링됩니다.
>
> ### 퍼널 상태와 함께 사용하기: `withState`
>
> 스텝을 이동하면서 입력값 같은 상태도 함께 다루려면 `withState`를 사용합니다.
> `setState`에 `step`을 함께 넘기면, **상태 갱신이 끝난 뒤에** 스텝이 이동합니다. 다음 스텝이 렌더링될 때 필요한 상태가 항상 준비되어 있다는 뜻입니다.
>
> ```tsx
> function OrderPage() {
>   const [Funnel, state, setState] = useFunnel(['시작', '다음'] as const).withState<{ count?: number }>({});
>
>   return (
>     <Funnel>
>       <Funnel.Step name="시작">
>         <button onClick={() => setState({ step: '다음', count: 1 })}>확인</button>
>       </Funnel.Step>
>       <Funnel.Step name="다음">
>         <p>count: {state.count}</p>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> - 상태는 `sessionStorage`에 저장되어 새로고침 후에도 복원됩니다.
> - 저장 키는 `use-funnel-state__{basePath}{pathname}` 형식이라 페이지(경로)마다 따로 관리됩니다.
> - `initialState`에는 `step` 키를 사용할 수 없습니다.
>
> ### 쿼리 파라미터가 없을 때 시작 스텝 지정하기
>
> URL에 스텝 쿼리 파라미터가 없으면 `initialStep`으로 지정한 스텝이 렌더링됩니다.
> 둘 다 없으면 에러가 발생하니, 쿼리 없이 진입할 수 있는 페이지라면 `initialStep`을 꼭 지정해 주세요.
>
> ```tsx
> const [Funnel, setStep] = useFunnel(steps, { initialStep: '정보입력' });
> ```
>
> ### 스텝 진입 · 변경 감지하기
>
> ```tsx
> const [Funnel, setStep] = useFunnel(steps, {
>   onStepChange: name => console.log(`${name} 스텝으로 이동`),
> });
>
> <Funnel.Step name="완료" onEnter={() => console.log('완료 스텝에 진입')}>
>   ...
> </Funnel.Step>
> ```
>
> - `onStepChange`: `setStep`으로 스텝을 바꿀 때 호출됩니다.
> - `onEnter`: 해당 `Funnel.Step`이 렌더링되어 진입했을 때 호출됩니다.
>
> ## 필수 환경 설정
>
> 내부에서 `react-query`의 `useQuery`를 `suspense: true`로 사용해 저장된 상태를 불러옵니다.
> `useFunnel`을 쓰는 컴포넌트는 반드시 **`QueryClientProvider`와 `Suspense` 안쪽**에서 렌더링해야 합니다.
>
> ```tsx
> import { Suspense } from 'react';
> import { QueryClient, QueryClientProvider } from 'react-query';
>
> const queryClient = new QueryClient();
>
> <QueryClientProvider client={queryClient}>
>   <Suspense fallback={null}>
>     <SignUpPage />
>   </Suspense>
> </QueryClientProvider>;
> ```
>
> ## API
>
> ### `useFunnel(steps, options?)`
>
> | 파라미터 | 타입 | 설명 |
> | --- | --- | --- |
> | `steps` | `readonly [string, ...string[]]` | 퍼널을 구성하는 스텝 이름 목록. 비어 있으면 에러가 발생합니다. |
> | `options.initialStep` | `Steps[number]` | 쿼리 파라미터에 스텝이 없을 때 렌더링할 스텝 |
> | `options.stepQueryKey` | `string` | 현재 스텝을 저장할 쿼리 키 (기본값: `'funnel-step'`) |
> | `options.onStepChange` | `(name: Steps[number]) => void` | `setStep` 호출 시 실행되는 콜백 |
>
> **반환값:** `[Funnel, setStep]` 튜플이며, `withState` 메서드가 함께 붙어 있습니다.
>
> ### `setStep(step, options?)`
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `stepChangeType` | `'push' \| 'replace'` | `'push'` | `push`는 히스토리를 쌓고, `replace`는 현재 히스토리를 교체합니다. |
> | `preserveQuery` | `boolean` | `true` | 스텝 외의 기존 쿼리 파라미터를 유지할지 여부 |
>
> 이동은 `router.push` / `router.replace`를 `shallow: true`로 호출해서 처리하므로 데이터 페칭 함수가 다시 실행되지 않습니다.
>
> ### `useFunnel(steps, options?).withState(initialState)`
>
> **반환값:** `[Funnel, state, setState]`
>
> - `state`: 현재 퍼널 상태
> - `setState(next)`: 상태를 갱신합니다. 객체 또는 함수를 넘길 수 있고, `step`을 포함하면 상태 갱신 후 해당 스텝으로 이동합니다.
>
> ### `<Funnel>`
>
> `useFunnel`이 반환하는 컴포넌트입니다. 현재 스텝과 이름이 같은 `Funnel.Step` 하나만 렌더링합니다.
> 현재 스텝에 해당하는 `Funnel.Step`이 없으면 에러가 발생합니다.
>
> ### `<Funnel.Step>`
>
> | Props | 타입 | 설명 |
> | --- | --- | --- |
> | `name` | `Steps[number]` | 스텝 이름 |
> | `onEnter` | `() => void` | 스텝에 진입했을 때 호출되는 콜백 |
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
> \[LICENSE](./LICENSE) 파일을 참고해 주세요.
>
> ## 변경 내역
>
> \[CHANGELOG.md](./CHANGELOG.md)를 참고해 주세요.

### 글빨 0.3.0 — ✗ 근거 판정 실패

> # @toss/use-funnel
>
> 여러 단계로 이어지는 화면(퍼널)의 현재 스텝을 Next.js 라우터의 query string으로 관리하는 React 훅입니다. 스텝이 URL에 남기 때문에 브라우저의 뒤로 가기·앞으로 가기로 스텝을 오갈 수 있고, 특정 스텝의 URL을 그대로 열 수도 있습니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/use-funnel
> # 또는
> npm install @toss/use-funnel
> ```
>
> peer dependencies는 다음과 같습니다.
>
> | 패키지 | 버전 |
> | --- | --- |
> | `next` | `>=11` |
> | `react` | `^16.0.0 \|\| ^17.0.0` |
> | `react-dom` | `^16.0.0 \|\| ^17.0.0` |
> | `react-query` | `^3` |
>
> ## 사용법
>
> 스텝 이름 배열을 `useFunnel`에 넘기면 `[Funnel, setStep]`을 돌려줍니다. `Funnel` 안에는 `Funnel.Step`을 스텝 수만큼 두고, 현재 스텝에 해당하는 것 하나만 렌더됩니다.
>
> ```tsx
> import { useFunnel } from '@toss/use-funnel';
>
> const steps = ['시작', '정보입력', '완료'] as const;
>
> function SignupPage() {
>   const [Funnel, setStep] = useFunnel(steps, { initialStep: '시작' });
>
>   return (
>     <Funnel>
>       <Funnel.Step name="시작">
>         <button onClick={() => setStep('정보입력')}>다음</button>
>       </Funnel.Step>
>       <Funnel.Step name="정보입력">
>         <button onClick={() => setStep('완료')}>제출</button>
>       </Funnel.Step>
>       <Funnel.Step name="완료">가입이 끝났습니다.</Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> 현재 스텝은 `funnel-step` 쿼리 파라미터에서 읽습니다. `/signup?funnel-step=정보입력`으로 접속하면 `정보입력` 스텝이 렌더됩니다. 쿼리 파라미터가 없으면 `initialStep`의 스텝을 렌더하고, `initialStep`도 없으면 에러가 발생합니다.
>
> `steps`는 비어 있으면 안 됩니다. `Funnel`의 자식 중 `steps`에 없는 `name`을 가진 것은 무시하고, 현재 스텝에 해당하는 `Funnel.Step`이 없으면 에러가 발생합니다.
>
> ## API
>
> ### `useFunnel(steps, options?)`
>
> | 옵션 | 타입 | 설명 |
> | --- | --- | --- |
> | `initialStep` | `Steps[number]` | 쿼리 파라미터가 없을 때 렌더할 스텝 |
> | `stepQueryKey` | `string` | 현재 스텝을 저장할 쿼리 파라미터 이름. 기본값은 `'funnel-step'` |
> | `onStepChange` | `(name: Steps[number]) => void` | `setStep`을 호출할 때, 라우터가 이동하기 전에 호출됩니다 |
>
> ### `setStep(step, options?)`
>
> 스텝을 바꾸려고 URL을 이동합니다. 이동은 Next.js의 shallow routing으로 처리합니다.
>
> | 옵션 | 타입 | 설명 |
> | --- | --- | --- |
> | `stepChangeType` | `'push' \| 'replace'` | 히스토리에 쌓을지(`push`), 현재 항목을 교체할지(`replace`). 기본값은 `'push'` |
> | `preserveQuery` | `boolean` | 현재 URL의 다른 쿼리 파라미터를 유지할지 여부. 기본값은 `true` |
>
> ### `Funnel.Step`
>
> | prop | 설명 |
> | --- | --- |
> | `name` | `steps`에 있는 스텝 이름 |
> | `onEnter` | 이 스텝이 렌더될 때 호출하는 함수. `onEnter`가 바뀌면 다시 호출되므로 매 렌더마다 새로 만들지 않는 편이 좋습니다 |
>
> ### `useFunnel(steps, options?).withState(initialState)`
>
> 스텝과 함께 쓸 상태를 관리합니다. `[Funnel, state, setState]`를 돌려줍니다.
>
> `setState`에 `step`을 함께 넘기면 상태가 갱신된 뒤에 스텝이 바뀝니다. 다음 스텝이 새 상태를 필요로 할 때 상태가 반영되기 전에 스텝이 먼저 넘어가는 일을 막습니다.
>
> ```tsx
> function FunnelPage() {
>   const [Funnel, state, setState] = useFunnel(['시작', '다음'] as const).withState<{ count?: number }>({});
>
>   return (
>     <Funnel>
>       <Funnel.Step name="시작">
>         <button onClick={() => setState({ step: '다음', count: 1 })}>확인</button>
>       </Funnel.Step>
>       <Funnel.Step name="다음">{state.count}</Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> 상태는 페이지 경로(`basePath`와 `pathname`)별로 `sessionStorage`에 저장합니다. `withState`는 `react-query`의 `useQuery`를 suspense 모드로 사용하므로, 컴포넌트 위에 `QueryClientProvider`와 `Suspense`가 있어야 합니다.
>
> ## 개발
>
> ```bash
> yarn test       # jest
> yarn typecheck  # tsc --noEmit
> yarn build      # dist와 esm 생성
> ```
>
> ## 라이선스
>
> MIT License. Copyright (c) 2021 Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

**근거 판정 실패 이유(판정 모델)**

- README는 QueryClientProvider와 Suspense가 withState 때문에 필요하다고 설명한다. 하지만 src/useFunnel.tsx 113행을 보면 useFunnel이 withState 호출 여부와 상관없이 항상 useFunnelState를 실행하고, 이 함수가 useQuery({ suspense: true })를 부른다. 그래서 기본 사용법 예제(SignupPage)도 QueryClientProvider와 Suspense 없이는 동작하지 않으며, 한계 설명이 코드와 어긋난다(contradicted).

### 글빨 0.4.0 — ✗ 근거 판정 실패

> # @toss/use-funnel
>
> 여러 스텝으로 나뉜 화면 흐름(퍼널)을 Next.js 페이지 안에서 구현하는 React 훅입니다. 현재 스텝을 URL 쿼리 파라미터에 저장하므로 스텝을 바꾸면 브라우저 히스토리에 기록이 남습니다. 스텝 사이에서 공유할 상태는 `withState`로 함께 관리합니다.
>
> ```tsx
> import { useFunnel } from '@toss/use-funnel';
>
> const steps = ['입력', '확인'] as const;
>
> function SignupPage() {
>   const [Funnel, setStep] = useFunnel(steps, { initialStep: '입력' });
>
>   return (
>     <Funnel>
>       <Funnel.Step name="입력">
>         <button onClick={() => setStep('확인')}>다음</button>
>       </Funnel.Step>
>       <Funnel.Step name="확인">
>         <button onClick={() => setStep('입력')}>이전</button>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> `?funnel-step=확인`으로 접근하면 `확인` 스텝이 바로 렌더됩니다. 쿼리 파라미터가 없으면 `initialStep`의 스텝을 렌더합니다.
>
> ## 설치
>
> ```sh
> yarn add @toss/use-funnel
> ```
>
> peer dependency는 다음과 같습니다.
>
> | 패키지 | 버전 |
> |---|---|
> | `next` | `>=11` |
> | `react` | `^16.0.0 \|\| ^17.0.0` |
> | `react-dom` | `^16.0.0 \|\| ^17.0.0` |
> | `react-query` | `^3` |
>
> ## 사용법
>
> ### 스텝 정의와 이동
>
> `useFunnel(steps, options?)`는 `[Funnel, setStep]`을 반환합니다. `steps`는 `as const`로 넘기면 스텝 이름이 타입으로 검사됩니다. `steps`는 비어 있으면 안 됩니다.
>
> - `Funnel`: 현재 스텝에 해당하는 `Funnel.Step` 하나만 렌더하는 컴포넌트입니다. `steps`에 없는 이름의 `Funnel.Step`은 무시합니다.
> - `setStep(step, options?)`: 쿼리 파라미터를 바꿔 스텝을 이동합니다. 이동에는 Next.js 라우터의 shallow 라우팅을 씁니다.
>
> `useFunnel`의 `options`:
>
> | 옵션 | 설명 |
> |---|---|
> | `initialStep` | 쿼리 파라미터에 스텝이 없을 때 렌더할 스텝입니다. |
> | `stepQueryKey` | 현재 스텝을 저장할 쿼리 키입니다. 기본값은 `'funnel-step'`입니다. |
> | `onStepChange` | `setStep`을 호출할 때 이동할 스텝 이름과 함께 호출됩니다. |
>
> `setStep`의 `options`:
>
> | 옵션 | 설명 |
> |---|---|
> | `stepChangeType` | `'push'`(기본값) 또는 `'replace'`입니다. `'replace'`는 히스토리를 쌓지 않고 현재 항목을 바꿉니다. |
> | `preserveQuery` | 스텝 외의 기존 쿼리를 유지할지 정합니다. 기본값은 `true`입니다. |
>
> ```tsx
> setStep('확인', { stepChangeType: 'replace', preserveQuery: false });
> ```
>
> ### 스텝 진입 시 실행
>
> `Funnel.Step`에 `onEnter`를 넘기면 해당 스텝이 렌더된 뒤 호출됩니다.
>
> ```tsx
> <Funnel.Step name="확인" onEnter={() => console.log('확인 스텝 진입')}>
>   ...
> </Funnel.Step>
> ```
>
> ### 스텝 사이에서 상태 공유
>
> `useFunnel(...).withState(initialState)`는 `[Funnel, state, setState]`를 반환합니다.
>
> `setState`에 `step`을 함께 넘기면 상태가 갱신된 뒤에 그 스텝으로 이동합니다. 다음 스텝이 갱신된 상태를 읽어도 값이 비어 있는 순간이 없습니다. 이때 이동은 `setStep`의 기본 옵션(`push`, 쿼리 유지)으로 이뤄집니다.
>
> ```tsx
> function FunnelPage() {
>   const [Funnel, state, setState] = useFunnel(['시작', '다음'] as const).withState<{ count?: number }>({});
>
>   return (
>     <Funnel>
>       <Funnel.Step name="시작">
>         <button onClick={() => setState({ step: '다음', count: 1 })}>확인</button>
>       </Funnel.Step>
>       <Funnel.Step name="다음">
>         <span>{state.count}</span>
>       </Funnel.Step>
>     </Funnel>
>   );
> }
> ```
>
> 상태는 페이지 경로(`basePath`와 `pathname`)별로 `sessionStorage`에 저장됩니다. `withState`는 이 값을 `react-query`의 suspense 모드로 읽으므로, 컴포넌트를 `QueryClientProvider`와 `Suspense` 안에 두어야 합니다.
>
> ## 주의할 점
>
> - `Funnel`을 렌더할 때 쿼리 파라미터에 스텝이 없고 `initialStep`도 없으면 에러가 발생합니다.
> - 현재 스텝 이름과 일치하는 `Funnel.Step`이 없어도 에러가 발생합니다.
> - `setState`는 전달한 값을 기존 상태와 병합하지 않고 그 값으로 교체합니다. 유지할 값이 있으면 함께 넘기거나, 현재 상태를 인자로 받는 함수 형태로 씁니다.
>
> ## 라이선스
>
> MIT

**근거 판정 실패 이유(판정 모델)**

- README는 react-query suspense 읽기와 QueryClientProvider·Suspense 필요 조건이 withState에만 해당하는 것처럼 썼다. 하지만 코드(useFunnel.tsx 113행, 227-234행)를 보면 useFunnel이 withState 사용 여부와 상관없이 useFunnelState(useQuery suspense: true)를 항상 호출한다. 그래서 withState 없이 쓰는 첫 예제도 Provider·Suspense가 없으면 동작하지 않는다.

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

Y는 첫 문단 바로 뒤에 예제를 두어 처음 보는 독자가 빨리 파악할 수 있다. 표는 필요한 곳에만 쓰고 사용법을 따라 주의점(setState 객체를 기존 상태와 합치지 않음, onEnter 고정 권고)을 이어서 설명한다. X는 충실하지만 표가 많고 일부 내용이 반복되며, 내부 저장 키나 근거가 약한 SSR 섹션이 들어 있다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 글빨 0.4.0 우세

X는 도입에서 바로 예제와 동작을 보여 주고 MIT 라이선스를 밝힙니다. setState가 값을 합치지 않는다는 점, 함수형 setState에서 step을 반환해야 한다는 점, onEnter에 useCallback이 필요하다는 점처럼 실사용에 필요한 주의점을 이어지는 문장으로 설명합니다. Y는 API 표가 유용하지만 사용법과 API 섹션에서 같은 내용을 반복합니다. 내부 저장 키 형식과 근거가 약한 SSR 섹션을 넣었고, 라이선스 종류는 밝히지 않았습니다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

두 글은 범위와 결론이 거의 같습니다. Y는 처음 보는 독자가 바로 쓸 수 있게 사용 예를 맨 앞에 두었습니다. 놓치면 에러가 나는 Provider/Suspense 설정도 코드로 보여 줍니다. 또 `onEnter`에 `useCallback`을 쓰라는 주의처럼 실제로 필요한 정보를 더 담았습니다. `setStep` 예시와 표가 조금 겹치지만, 늘어난 분량의 대부분이 독자에게 유용합니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

구성과 문체는 둘이 비슷합니다. X를 고른 이유는 세 가지입니다. 첫째, 사용 전에 꼭 필요한 Provider·Suspense 설정을 코드로 보여 줍니다. 둘째, `onEnter`를 고정해서 넘기라는 주의를 적었습니다. 셋째, `setState`에 함수를 넘길 때 `step`을 반환값에 넣어야 한다는 점처럼 실제 사용에서 걸릴 수 있는 부분을 짚어 줍니다. Y는 간결하지만 이런 시작 조건과 주의점을 한 줄로 넘기거나 빠뜨렸습니다.

</details>

