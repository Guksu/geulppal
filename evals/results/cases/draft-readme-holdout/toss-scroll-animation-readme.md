# `toss-scroll-animation-readme`

[← README 초안 새 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 패키지의 한국어 README를 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `toss/slash` 커밋 `7ca31c3`의 코드(`packages/react/scroll-animation`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 스크롤 진행에 따라 애니메이션을 구현하는 패키지라는 점
- 감싸는 컴포넌트와 훅을 쓰는 순서
- 설정값

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/scroll-animation
>
> 스크롤 위치에 따라 요소의 진행도(progress)를 계산해 주는 React 유틸리티 패키지입니다.
> `<ScrollProgressController>` 안에서 `useScrollProgress`를 사용하면, 요소가 화면에 등장하고 스크롤되는 정도를 0~1 사이의 값으로 받아 자유롭게 애니메이션에 활용할 수 있습니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/scroll-animation
>
> # yarn
> yarn add @toss/scroll-animation
> ```
>
> `react` `^16.8 || ^17.0 || ^18` 버전이 peer dependency로 필요합니다.
>
> ## 빠른 시작
>
> ### 1. `ScrollProgressController`로 감싸기
>
> 스크롤 progress를 사용하려는 컴포넌트들의 상위에 `<ScrollProgressController>`를 배치합니다.
> 이 컴포넌트가 window의 크기와 스크롤 위치를 추적해 하위 컴포넌트에 전달합니다.
>
> ```tsx
> import { ScrollProgressController } from '@toss/scroll-animation';
>
> function App() {
>   return (
>     <ScrollProgressController>
>       <Page />
>     </ScrollProgressController>
>   );
> }
> ```
>
> ### 2. `useScrollProgress`로 progress 사용하기
>
> ```tsx
> import { useScrollProgress } from '@toss/scroll-animation';
>
> function FadeIn() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({
>     triggerHook: 'onEnter',
>     duration: '50vh',
>     clip: true,
>   });
>
>   return (
>     <div ref={ref} style={{ opacity: scrollYProgress }}>
>       스크롤하면 서서히 나타납니다.
>     </div>
>   );
> }
> ```
>
> ### 3. 기본 제공 컴포넌트 `ScrollRevealAnimation`
>
> 스크롤 시 아래에서 위로 올라오며 나타나는 효과가 필요하다면 `ScrollRevealAnimation`을 바로 사용할 수 있습니다.
> `<div>`의 모든 속성을 그대로 전달할 수 있고, `style`을 넘기면 기본 스타일(`transform`, `opacity`)보다 우선 적용됩니다.
>
> ```tsx
> import { ScrollProgressController, ScrollRevealAnimation } from '@toss/scroll-animation';
>
> function App() {
>   return (
>     <ScrollProgressController>
>       <ScrollRevealAnimation>
>         <h1>스크롤하면 나타나는 제목</h1>
>       </ScrollRevealAnimation>
>     </ScrollProgressController>
>   );
> }
> ```
>
> ## API
>
> ### `<ScrollProgressController>`
>
> window의 `width`, `height`, `scrollX`, `scrollY`를 `resize`/`scroll` 이벤트에 맞춰 갱신하고, `ScrollProgressContext`로 하위에 제공합니다.
> 이벤트는 `requestAnimationFrame`으로 throttle 됩니다.
>
> | Props      | 타입        | 설명                                |
> | ---------- | ----------- | ----------------------------------- |
> | `children` | `ReactNode` | progress를 사용하는 컴포넌트 트리   |
>
> ### `useScrollProgress<T extends HTMLElement>(options?)`
>
> `ref`가 연결된 요소가 화면 안에서 얼마나 스크롤되었는지 계산합니다.
> 반드시 `<ScrollProgressController>`의 하위에서 사용해야 하며, 그렇지 않으면 development 환경에서 에러가 발생합니다.
>
> ```ts
> const { ref, scrollXProgress, scrollYProgress } = useScrollProgress<HTMLDivElement>(options);
> ```
>
> #### Options
>
> | 옵션          | 타입                                                  | 기본값      | 설명                                                              |
> | ------------- | ----------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
> | `triggerHook` | `'onEnter'` \| `'onCenter'` \| `'onLeave'` \| `number` | `'onCenter'` | 요소가 뷰포트에 얼마나 등장했을 때 progress가 시작될지 결정합니다. |
> | `duration`    | `string` \| `number`                                  | `'100%'`    | trigger가 시작된 후 progress가 진행될 스크롤 거리입니다.           |
> | `clip`        | `boolean`                                             | `false`     | `true`이면 progress를 0~1 사이로 제한합니다.                       |
>
> **`triggerHook`**
>
> 0과 1 사이의 숫자로 지정하며, 아래 alias를 사용할 수 있습니다.
>
> | alias       | 값  | 의미                                   |
> | ----------- | --- | -------------------------------------- |
> | `onEnter`   | 1   | 요소가 화면에 등장하기 시작할 때       |
> | `onCenter`  | 0.5 | 요소의 상단이 화면 중앙에 도달했을 때  |
> | `onLeave`   | 0   | 요소가 화면에서 벗어나기 시작할 때     |
>
> **`duration`**
>
> | 예시                 | 의미                                       |
> | -------------------- | ------------------------------------------ |
> | `200` (숫자)         | 200px만큼 스크롤할 때까지                  |
> | `'200%'`             | 요소 크기의 2배만큼 스크롤할 때까지        |
> | `'150vh'`            | window 높이의 1.5배만큼 스크롤할 때까지    |
> | `'50vw'`             | window 너비의 0.5배만큼 스크롤할 때까지    |
>
> 지원하지 않는 형식(예: `'200px'` 문자열)을 넘기면 `console.error`를 출력하고 요소 크기(`100%`)를 기준으로 계산합니다. 픽셀 단위는 숫자로 전달해 주세요.
>
> **`clip`**
>
> `false`이면 요소가 화면을 벗어난 뒤에도 progress가 0보다 작거나 1보다 큰 값으로 계속 계산됩니다.
>
> #### 반환값
>
> | 값                | 타입                | 설명                                 |
> | ----------------- | ------------------- | ------------------------------------ |
> | `ref`             | `RefObject<T>`      | progress를 계산할 요소에 연결합니다. |
> | `scrollXProgress` | `number`            | 가로 방향 스크롤 progress            |
> | `scrollYProgress` | `number`            | 세로 방향 스크롤 progress            |
>
> > 첫 렌더링 시점에는 `ref`가 아직 연결되기 전이므로 progress는 `0`입니다.
>
> ### `<ScrollRevealAnimation>`
>
> 스크롤하면 요소가 아래에서 위로 100px 이동하며 투명도 0 → 1로 나타나는 컴포넌트입니다.
> 내부적으로 `useScrollProgress({ triggerHook: 0.6, duration: '20vh', clip: true })`를 사용합니다.
>
> `HTMLAttributes<HTMLDivElement>`의 모든 props를 받습니다.
>
> ### `ScrollProgressContext`
>
> `ScrollProgressController`가 제공하는 React Context이며, 값은 다음과 같은 형태입니다.
>
> ```ts
> interface WindowScrollPosition {
>   width: number; // window.innerWidth
>   height: number; // window.innerHeight
>   scrollX: number; // window.scrollX
>   scrollY: number; // window.scrollY
> }
> ```
>
> ### `clipProgress(progress)`
>
> 값을 0~1 사이로 제한합니다.
>
> ```ts
> clipProgress(1.5); // 1
> clipProgress(-0.2); // 0
> clipProgress(0.3); // 0.3
> ```
>
> ### `sliceProgress({ progress, start?, end?, clip? })`
>
> 전체 progress 중 일부 구간만 잘라내어 0~1 사이의 값으로 변환합니다.
> 하나의 progress로 여러 단계의 애니메이션을 구성할 때 유용합니다.
>
> | 옵션       | 타입      | 기본값 | 설명                                    |
> | ---------- | --------- | ------ | --------------------------------------- |
> | `progress` | `number`  | -      | 자르기 전의 progress                    |
> | `start`    | `number`  | `0`    | 구간의 시작                             |
> | `end`      | `number`  | `1`    | 구간의 끝                               |
> | `clip`     | `boolean` | `true` | 결과를 0~1 사이로 제한할지 여부         |
>
> ```ts
> // 0.5 ~ 0.9 구간에서 0.6은 25% 진행된 상태
> sliceProgress({ progress: 0.6, start: 0.5, end: 0.9 }); // 0.25
> ```
>
> ```tsx
> function Steps() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({ duration: '200vh', clip: true });
>
>   // 앞 절반 구간에서는 나타나고, 뒤 절반 구간에서는 이동
>   const opacity = sliceProgress({ progress: scrollYProgress, start: 0, end: 0.5 });
>   const translateX = sliceProgress({ progress: scrollYProgress, start: 0.5, end: 1 }) * 200;
>
>   return <div ref={ref} style={{ opacity, transform: `translateX(${translateX}px)` }} />;
> }
> ```
>
> ## 주의사항
>
> - `useScrollProgress`는 `<ScrollProgressController>` 안에서만 사용할 수 있습니다.
> - `ScrollProgressController`의 초기 window 크기는 `480 x 800`으로 가정하며, 마운트 직후 실제 값으로 갱신됩니다.
> - 브라우저의 `window`를 사용하므로 SSR 환경에서는 이벤트 리스너가 클라이언트에서만 등록됩니다.
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE) 파일을 확인해 주세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/scroll-animation
>
> 스크롤 위치에 따라 요소의 진행도(progress)를 0~1 사이 값으로 계산해 주는 React 라이브러리입니다. 이 값으로 `opacity`나 `transform` 같은 스타일을 직접 계산해 스크롤 애니메이션을 만들 수 있습니다. 스크롤하면 아래에서 떠오르며 나타나는 `ScrollRevealAnimation` 컴포넌트도 들어 있습니다.
>
> \[toss/slash](https://github.com/toss/slash) 저장소의 패키지입니다.
>
> ## 설치
>
> ```bash
> yarn add @toss/scroll-animation
> # 또는
> npm install @toss/scroll-animation
> ```
>
> React 16.8 이상(`^16.8 || ^17.0 || ^18`)이 필요합니다.
>
> ## 사용법
>
> 스크롤 정보를 쓰는 컴포넌트를 `ScrollProgressController`로 감쌉니다. 컨트롤러는 창의 크기와 스크롤 위치를 추적해 하위 컴포넌트에 전달합니다.
>
> ### 스크롤하면 나타나는 요소
>
> `ScrollRevealAnimation`으로 감싼 요소는 스크롤에 따라 아래에서 위로 올라오며 서서히 나타납니다. `div`의 속성을 그대로 받습니다.
>
> ```tsx
> import { ScrollProgressController, ScrollRevealAnimation } from '@toss/scroll-animation';
>
> function Page() {
>   return (
>     <ScrollProgressController>
>       <ScrollRevealAnimation>
>         <h2>스크롤하면 나타납니다</h2>
>       </ScrollRevealAnimation>
>     </ScrollProgressController>
>   );
> }
> ```
>
> 내부적으로는 `triggerHook: 0.6`, `duration: '20vh'`, `clip: true`로 계산한 진행도를 씁니다. 진행도가 0에서 1로 가는 동안 `opacity`는 0에서 1로, 세로 위치는 100px 아래에서 제자리로 바뀝니다. `style`로 `transform`이나 `opacity`를 넘기면 이 값을 덮어씁니다.
>
> ### 직접 애니메이션 만들기
>
> `useScrollProgress`는 `ref`와 진행도를 돌려줍니다. `ref`를 진행도를 측정할 요소에 연결합니다. 이 훅은 `ScrollProgressController`의 하위 컴포넌트에서만 쓸 수 있습니다.
>
> ```tsx
> import { ScrollProgressController, useScrollProgress } from '@toss/scroll-animation';
>
> function FadeIn({ children }: { children: React.ReactNode }) {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({
>     triggerHook: 'onEnter',
>     duration: '50vh',
>     clip: true,
>   });
>
>   return (
>     <div ref={ref} style={{ opacity: scrollYProgress }}>
>       {children}
>     </div>
>   );
> }
>
> function Page() {
>   return (
>     <ScrollProgressController>
>       <FadeIn>내용</FadeIn>
>     </ScrollProgressController>
>   );
> }
> ```
>
> ## API
>
> ### `<ScrollProgressController>`
>
> 창의 너비·높이와 스크롤 위치(`scrollX`, `scrollY`)를 `ScrollProgressContext`로 내려줍니다. `scroll`과 `resize` 이벤트를 듣고, 값은 `requestAnimationFrame`으로 프레임마다 한 번씩 갱신합니다. 스크롤할 때마다 컨텍스트 값이 바뀌므로 `useScrollProgress`를 쓰는 컴포넌트는 그때마다 다시 렌더링됩니다.
>
> ### `useScrollProgress(options?)`
>
> 요소가 화면에 있을 때 스크롤이 얼마나 진행됐는지 계산합니다.
>
> ```ts
> const { ref, scrollXProgress, scrollYProgress } = useScrollProgress<HTMLDivElement>(options);
> ```
>
> | 옵션 | 타입 | 기본값 | 설명 |
> |---|---|---|---|
> | `triggerHook` | `'onEnter' \| 'onCenter' \| 'onLeave' \| number` | `'onCenter'` | 요소가 뷰포트의 어느 지점에 닿았을 때 진행도가 시작할지 정합니다. 0~1 사이 숫자는 뷰포트 위쪽을 0, 아래쪽을 1로 본 위치입니다. |
> | `duration` | `number \| string` | `'100%'` | 시작한 뒤 얼마나 스크롤해야 진행도가 1이 될지 정합니다. |
> | `clip` | `boolean` | `false` | `true`면 진행도를 0~1 사이로 제한합니다. `false`면 요소가 화면을 벗어난 뒤에도 0보다 작거나 1보다 큰 값을 계속 계산합니다. |
>
> `triggerHook`의 별칭은 다음과 같습니다.
>
> - `onEnter`: 요소가 화면에 들어오기 시작할 때 (`1`)
> - `onCenter`: 요소의 윗부분이 화면 가운데에 닿았을 때 (`0.5`)
> - `onLeave`: 요소가 화면에서 벗어나기 시작할 때 (`0`)
>
> `duration`에는 다음 값을 쓸 수 있습니다.
>
> - 숫자: 그 값만큼(px) 스크롤할 때까지
> - `'%'`: 요소 크기 기준. `'200%'`는 요소 크기의 2배만큼 스크롤할 때까지입니다. 세로 진행도는 요소의 높이, 가로 진행도는 요소의 너비를 기준으로 합니다.
> - `'vw'`, `'vh'`: 창 너비·높이 기준. `'150vh'`는 창 높이의 1.5배만큼 스크롤할 때까지입니다.
>
> 그 밖의 형식을 넘기면 `console.error`로 오류를 출력하고 요소 크기를 `duration`으로 씁니다.
>
> 반환값은 다음과 같습니다.
>
> - `ref`: 진행도를 측정할 요소에 연결합니다.
> - `scrollYProgress`: 세로 스크롤 진행도
> - `scrollXProgress`: 가로 스크롤 진행도
>
> 첫 렌더링에는 요소를 아직 측정할 수 없어 두 진행도가 모두 0입니다. `ScrollProgressController` 밖에서 호출하면 `NODE_ENV`가 `development`일 때는 오류를 던지고, 그 외에는 0을 돌려줍니다.
>
> ### `<ScrollRevealAnimation>`
>
> 위에서 설명한 대로 스크롤하면 아래에서 올라오며 나타나는 `div`입니다. 옵션은 받지 않습니다. 다른 값이 필요하면 `useScrollProgress`로 직접 만드세요.
>
> ### `ScrollProgressContext`
>
> `ScrollProgressController`가 내려주는 컨텍스트입니다. 값은 `{ width, height, scrollX, scrollY }`이고, 컨트롤러 밖에서는 `undefined`입니다.
>
> ### `clipProgress(progress)`
>
> 값을 0~1 사이로 제한합니다.
>
> ```ts
> clipProgress(1.4); // 1
> clipProgress(-0.2); // 0
> ```
>
> ### `sliceProgress({ progress, start?, end?, clip? })`
>
> 진행도의 `start`~`end` 구간만 잘라 0~1 사이 값으로 바꿉니다. `start`의 기본값은 `0`, `end`의 기본값은 `1`이고, `clip`의 기본값은 `true`입니다.
>
> ```ts
> // 진행도 0.5~0.9 구간에서 0.6은 25% 진행된 값이므로 0.25
> sliceProgress({ progress: 0.6, start: 0.5, end: 0.9 }); // 0.25
> ```
>
> 한 요소의 진행도를 여러 구간으로 나눠 서로 다른 애니메이션에 쓸 때 유용합니다.
>
> ## 개발
>
> ```bash
> yarn test       # 테스트
> yarn typecheck  # 타입 검사
> yarn build      # 빌드
> ```
>
> ## 라이선스
>
> MIT © Viva Republica, Inc.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/scroll-animation
>
> 스크롤 위치에 따라 요소의 애니메이션을 진행하는 React 라이브러리입니다. 요소가 화면에서 얼마나 스크롤됐는지를 0에서 1 사이의 `progress` 값으로 계산해 주므로, 이 값을 `opacity`나 `transform` 같은 스타일에 연결하면 됩니다.
>
> ```tsx
> import { ScrollProgressController, ScrollRevealAnimation } from '@toss/scroll-animation';
>
> function App() {
>   return (
>     <ScrollProgressController>
>       <ScrollRevealAnimation>스크롤하면 아래에서 떠오릅니다.</ScrollRevealAnimation>
>     </ScrollProgressController>
>   );
> }
> ```
>
> ## 설치
>
> ```sh
> yarn add @toss/scroll-animation
> ```
>
> React 16.8 이상(`react@^16.8 || ^17.0 || ^18`)이 필요합니다.
>
> ## 사용 방법
>
> ### 1. `ScrollProgressController`로 감싸기
>
> `ScrollProgressController`는 `window`의 크기와 스크롤 위치를 추적해 하위 컴포넌트에 전달합니다. 스크롤 애니메이션을 쓰는 컴포넌트는 모두 이 컴포넌트 안에 있어야 합니다. 스크롤과 리사이즈 이벤트는 `requestAnimationFrame`으로 묶어서 처리합니다.
>
> ```tsx
> <ScrollProgressController>
>   <App />
> </ScrollProgressController>
> ```
>
> ### 2. 기본 효과: `ScrollRevealAnimation`
>
> 스크롤하면 요소가 아래에서 위로 올라오며 나타나는 효과를 바로 쓸 수 있는 컴포넌트입니다. `div`로 렌더링되며 `div`의 속성과 `children`을 그대로 받습니다. 전달한 `style`은 기본 스타일(`transform`, `opacity`) 위에 덮어씁니다.
>
> 요소의 상단이 화면 높이의 60% 지점에 닿으면 시작해 20vh만큼 스크롤하는 동안 진행되고, 최대 100px 아래에서 제자리로 올라오며 투명도가 0에서 1로 바뀝니다. 이 값은 고정이어서 바꿀 수 없습니다. 값을 바꾸려면 아래의 `useScrollProgress`로 직접 만드세요.
>
> ### 3. 직접 만들기: `useScrollProgress`
>
> `ref`를 요소에 연결하면 그 요소의 스크롤 진행도를 `scrollXProgress`(가로)와 `scrollYProgress`(세로)로 돌려줍니다.
>
> ```tsx
> import { useScrollProgress } from '@toss/scroll-animation';
>
> function Title() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLHeadingElement>({
>     triggerHook: 'onEnter',
>     duration: '50vh',
>     clip: true,
>   });
>
>   return (
>     <h1 ref={ref} style={{ opacity: scrollYProgress }}>
>       제목
>     </h1>
>   );
> }
> ```
>
> `useScrollProgress`는 `ScrollProgressController` 안에서만 쓸 수 있습니다. `NODE_ENV`가 `development`일 때 바깥에서 호출하면 에러가 발생합니다. 그 외 환경에서는 에러 없이 진행도로 0을 돌려줍니다. 요소가 아직 렌더링되지 않은 첫 렌더링에서도 진행도는 0입니다.
>
> #### 옵션
>
> | 옵션 | 타입 | 기본값 | 설명 |
> | --- | --- | --- | --- |
> | `triggerHook` | `'onEnter' \| 'onCenter' \| 'onLeave' \| number` | `'onCenter'` | 요소의 상단이 화면의 어느 지점에 닿았을 때 진행도가 0이 될지 정합니다. 0과 1 사이의 숫자로, 화면 위쪽 끝(0)에서 아래쪽 끝(1) 방향의 비율입니다. `'onEnter'`는 `1`, `'onCenter'`는 `0.5`, `'onLeave'`는 `0`과 같습니다. |
> | `duration` | `string \| number` | `'100%'` | 진행도가 0에서 1이 될 때까지 스크롤하는 거리입니다. |
> | `clip` | `boolean` | `false` | `true`이면 진행도를 0과 1 사이로 제한합니다. `false`이면 요소가 화면을 벗어나도 0보다 작거나 1보다 큰 값이 계속 계산됩니다. |
>
> `duration`은 다음 형식을 받습니다.
>
> - 숫자: 픽셀 단위 거리입니다. `200`이면 200px를 스크롤하는 동안 진행됩니다.
> - `'%'`: 요소 크기에 대한 비율입니다. `'200%'`는 요소 크기의 2배입니다. 세로 진행도는 요소의 높이, 가로 진행도는 요소의 너비를 기준으로 합니다.
> - `'vw'`, `'vh'`: 화면 너비 또는 높이에 대한 비율입니다. `'150vh'`는 화면 높이의 1.5배입니다.
>
> 그 외 형식을 넘기면 `console.error`로 오류를 출력하고 요소 크기(`'100%'`와 같은 값)를 사용합니다. 요소의 크기가 0이거나 `duration`이 `0`이면 거리를 1px로 계산합니다.
>
> ### 4. 진행도 가공: `sliceProgress`, `clipProgress`
>
> `progress` 값을 다루는 함수 두 개도 함께 내보냅니다.
>
> `clipProgress(progress)`는 값을 0과 1 사이로 제한합니다.
>
> `sliceProgress({ progress, start, end, clip })`는 `progress`의 일부 구간만 잘라 0에서 1 사이 값으로 바꿉니다. 하나의 진행도로 여러 동작을 시차를 두고 진행할 때 씁니다. `start`의 기본값은 `0`, `end`의 기본값은 `1`이고, `clip`의 기본값은 `true`입니다.
>
> ```tsx
> import { sliceProgress } from '@toss/scroll-animation';
>
> // start 0.5, end 0.9 구간에서 progress 0.6은 25% 진행된 지점이므로 0.25를 반환합니다.
> const opacity = sliceProgress({ progress: 0.6, start: 0.5, end: 0.9 });
> ```
>
> `end`가 `0`이면 `1`을, `start`가 `end` 이상이면 `start / end`를 반환합니다.
>
> ## 알아 둘 점
>
> - `useScrollProgress`는 `window`의 스크롤만 추적합니다. 스크롤 가능한 다른 요소 안에서의 스크롤은 반영되지 않습니다.
> - 스크롤하는 동안 `ScrollProgressController`의 값이 갱신되므로, 하위에서 `useScrollProgress`를 쓰는 컴포넌트는 그때마다 다시 렌더링됩니다.
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

## 2회차

### 글빨 없음 — ○ 근거 판정 통과

> # @toss/scroll-animation
>
> 스크롤 위치에 따라 진행되는 애니메이션을 React에서 쉽게 만들 수 있게 도와주는 패키지입니다.
>
> 요소가 화면에 등장한 정도를 `0`~`1` 사이의 progress 값으로 계산해 주기 때문에, 이 값을 `transform`, `opacity` 등에 연결하기만 하면 스크롤 연동 애니메이션을 만들 수 있습니다.
>
> ## 설치
>
> ```bash
> # npm
> npm install @toss/scroll-animation
>
> # yarn
> yarn add @toss/scroll-animation
> ```
>
> `react` 16.8 이상(`^16.8 || ^17.0 || ^18`)이 peer dependency로 필요합니다.
>
> ## 빠르게 시작하기
>
> 1. 스크롤 progress를 사용할 영역을 `<ScrollProgressController>`로 감쌉니다.
> 2. 그 안에서 `useScrollProgress`를 호출하고, 반환된 `ref`를 애니메이션할 요소에 연결합니다.
>
> ```tsx
> import { ScrollProgressController, useScrollProgress } from '@toss/scroll-animation';
>
> function FadeIn() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({
>     triggerHook: 'onCenter',
>     duration: '30vh',
>     clip: true,
>   });
>
>   return (
>     <div ref={ref} style={{ opacity: scrollYProgress }}>
>       스크롤하면 서서히 나타납니다.
>     </div>
>   );
> }
>
> export function App() {
>   return (
>     <ScrollProgressController>
>       <FadeIn />
>     </ScrollProgressController>
>   );
> }
> ```
>
> > `<ScrollProgressController>`는 window의 스크롤·리사이즈 이벤트를 한 번만 구독하고, 그 값을 하위의 모든 `useScrollProgress`가 공유하도록 합니다. 요소마다 이벤트 리스너를 등록하지 않으므로, 애니메이션할 요소가 많아도 부담이 적습니다.
>
> ## API
>
> ### `<ScrollProgressController>`
>
> window의 크기와 스크롤 위치를 추적해 하위 컴포넌트에 제공하는 Provider입니다. `useScrollProgress`와 `<ScrollRevealAnimation>`은 반드시 이 컴포넌트의 하위에서 사용해야 합니다.
>
> | Props      | 타입        | 설명                |
> | ---------- | ----------- | ------------------- |
> | `children` | `ReactNode` | 하위에 렌더링할 요소 |
>
> 스크롤 이벤트는 `requestAnimationFrame`으로 throttle되어 처리됩니다.
>
> ### `useScrollProgress(options?)`
>
> `ref`로 연결한 요소가 화면 안에서 얼마나 스크롤되었는지 계산합니다.
>
> ```ts
> const { ref, scrollXProgress, scrollYProgress } = useScrollProgress<HTMLElement>(options);
> ```
>
> #### Options
>
> | 옵션          | 타입                                            | 기본값        | 설명                                                    |
> | ------------- | ----------------------------------------------- | ------------- | ------------------------------------------------------- |
> | `triggerHook` | `'onEnter' \| 'onCenter' \| 'onLeave' \| number` | `'onCenter'`  | 요소가 뷰포트에 얼마나 등장했을 때 progress를 시작할지 결정합니다. |
> | `duration`    | `string \| number`                              | `'100%'`      | trigger가 시작된 후 progress가 진행될 스크롤 거리입니다.  |
> | `clip`        | `boolean`                                       | `false`       | `true`이면 progress를 `0`~`1` 사이로 제한합니다.          |
>
> **`triggerHook`**
>
> `0`과 `1` 사이의 숫자로 지정하거나, 아래 alias를 사용할 수 있습니다.
>
> | alias      | 값    | 의미                                         |
> | ---------- | ----- | -------------------------------------------- |
> | `onEnter`  | `1`   | 요소가 화면에 등장하기 시작할 때               |
> | `onCenter` | `0.5` | 요소의 상단이 화면 중앙에 도달했을 때          |
> | `onLeave`  | `0`   | 요소가 화면에서 벗어나기 시작할 때             |
>
> **`duration`**
>
> | 예시              | 의미                                       |
> | ----------------- | ------------------------------------------ |
> | `200` (숫자)      | 200px를 스크롤하는 동안 진행                |
> | `'200%'`          | 요소 크기의 2배만큼 스크롤하는 동안 진행     |
> | `'150vh'`         | window 높이의 1.5배만큼 스크롤하는 동안 진행 |
> | `'50vw'`          | window 너비의 0.5배만큼 스크롤하는 동안 진행 |
>
> 문자열은 `%`, `vw`, `vh` 단위만 지원하며, px 값은 숫자로 전달해야 합니다. 지원하지 않는 형식을 넘기면 `console.error`를 출력하고 요소 크기를 기준으로 계산합니다.
>
> **`clip`**
>
> `false`(기본값)이면 요소가 화면을 벗어난 뒤에도 progress가 `0`보다 작거나 `1`보다 큰 값으로 계속 계산됩니다. 일반적인 등장 애니메이션에는 `clip: true`를 권장합니다.
>
> #### 반환값
>
> | 값                | 타입                | 설명                                |
> | ----------------- | ------------------- | ----------------------------------- |
> | `ref`             | `RefObject<T>`      | 애니메이션할 요소에 연결할 ref        |
> | `scrollXProgress` | `number`            | 가로 스크롤 progress                 |
> | `scrollYProgress` | `number`            | 세로 스크롤 progress                 |
>
> > 요소가 마운트되기 전(`ref.current`가 없을 때)과 첫 렌더링에서는 progress가 `0`입니다.
>
> ### `<ScrollRevealAnimation>`
>
> 요소가 아래에서 위로 올라오며 서서히 나타나는 등장 애니메이션을 바로 사용할 수 있는 컴포넌트입니다. `<div>`를 렌더링하며 `div`의 모든 HTML 속성을 그대로 전달할 수 있습니다.
>
> ```tsx
> import { ScrollProgressController, ScrollRevealAnimation } from '@toss/scroll-animation';
>
> function Page() {
>   return (
>     <ScrollProgressController>
>       <ScrollRevealAnimation>
>         <h1>스크롤하면 나타나는 제목</h1>
>       </ScrollRevealAnimation>
>     </ScrollProgressController>
>   );
> }
> ```
>
> 내부적으로는 `triggerHook: 0.6`, `duration: '20vh'`, `clip: true`로 `useScrollProgress`를 호출하고, progress에 따라 `translateY`(100px → 0)와 `opacity`(0 → 1)를 적용합니다. 전달한 `style`은 기본 스타일 위에 덮어씌워집니다.
>
> ### `ScrollProgressContext`
>
> `<ScrollProgressController>`가 제공하는 Context입니다. 값은 아래 형태의 `WindowScrollPosition`이며, 컨트롤러 바깥에서는 `undefined`입니다.
>
> ```ts
> interface WindowScrollPosition {
>   width: number; // window.innerWidth
>   height: number; // window.innerHeight
>   scrollX: number; // window.scrollX
>   scrollY: number; // window.scrollY
> }
> ```
>
> > 개발 환경(`NODE_ENV === 'development'`)에서 `<ScrollProgressController>` 밖에서 `useScrollProgress`를 사용하면 에러가 발생합니다.
>
> ### 유틸리티
>
> #### `clipProgress(progress)`
>
> 값을 `0`~`1` 사이로 제한합니다.
>
> ```ts
> clipProgress(-0.3); // 0
> clipProgress(0.4); // 0.4
> clipProgress(1.7); // 1
> ```
>
> #### `sliceProgress({ progress, start?, end?, clip? })`
>
> 전체 progress 중 `start`~`end` 구간만 잘라내어 다시 `0`~`1` 사이의 값으로 변환합니다. 하나의 스크롤 구간에서 여러 애니메이션을 순차적으로 진행할 때 유용합니다.
>
> | 옵션       | 타입      | 기본값 | 설명                                |
> | ---------- | --------- | ------ | ----------------------------------- |
> | `progress` | `number`  | -      | 자르기 전의 progress                 |
> | `start`    | `number`  | `0`    | 구간의 시작                          |
> | `end`      | `number`  | `1`    | 구간의 끝                            |
> | `clip`     | `boolean` | `true` | 결과를 `0`~`1` 사이로 제한할지 여부   |
>
> ```ts
> // 0.5 ~ 0.9 구간에서 progress가 0.6이면 25% 진행된 것
> sliceProgress({ progress: 0.6, start: 0.5, end: 0.9 }); // 0.25
> ```
>
> 다음은 하나의 `scrollYProgress`로 두 개의 애니메이션을 나누어 진행하는 예시입니다.
>
> ```tsx
> function Sequence() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({ duration: '100vh' });
>
>   const fadeIn = sliceProgress({ progress: scrollYProgress, start: 0, end: 0.5 });
>   const slideUp = sliceProgress({ progress: scrollYProgress, start: 0.5, end: 1 });
>
>   return (
>     <div ref={ref} style={{ opacity: fadeIn, transform: `translateY(${(1 - slideUp) * 40}px)` }}>
>       ...
>     </div>
>   );
> }
> ```
>
> ## 개발
>
> ```bash
> yarn test       # 테스트 실행
> yarn typecheck  # 타입 검사
> yarn build      # dist, esm 빌드
> ```
>
> ## 변경 내역
>
> \[CHANGELOG.md](./CHANGELOG.md)를 참고하세요.
>
> ## 라이선스
>
> MIT © Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE) 파일을 확인하세요.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # @toss/scroll-animation
>
> 스크롤 위치에 맞춰 React 요소를 움직이는 라이브러리입니다. 요소가 화면에서 얼마나 스크롤됐는지를 숫자(progress)로 계산해 주므로, 이 값을 `transform`이나 `opacity` 같은 스타일에 연결해 쓸 수 있습니다.
>
> ## 설치
>
> ```bash
> npm install @toss/scroll-animation
> # 또는
> yarn add @toss/scroll-animation
> ```
>
> peer dependency로 React `^16.8 || ^17.0 || ^18`이 필요합니다.
>
> ## 사용법
>
> 스크롤을 추적할 영역을 `ScrollProgressController`로 감싸고, 그 안에서 `useScrollProgress`를 호출합니다. 훅이 돌려주는 `ref`를 애니메이션할 요소에 연결합니다.
>
> ```tsx
> import { ScrollProgressController, useScrollProgress } from '@toss/scroll-animation';
>
> function FadeIn() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({
>     triggerHook: 'onEnter',
>     duration: '50vh',
>     clip: true,
>   });
>
>   return (
>     <div ref={ref} style={{ opacity: scrollYProgress }}>
>       스크롤하면 서서히 나타납니다.
>     </div>
>   );
> }
>
> export function Page() {
>   return (
>     <ScrollProgressController>
>       <FadeIn />
>     </ScrollProgressController>
>   );
> }
> ```
>
> `ScrollProgressController`는 `window`의 스크롤과 크기 변화를 감지해 하위 트리에 전달합니다. 이벤트는 `requestAnimationFrame`으로 모아서 처리합니다. `useScrollProgress`는 이 컨텍스트에 의존하므로 반드시 `ScrollProgressController` 안에서 호출해야 합니다. `NODE_ENV`가 `development`일 때는 밖에서 호출하면 에러가 발생하고, 그 외 환경에서는 progress가 0으로 고정됩니다.
>
> 요소가 처음 렌더링될 때는 `ref`가 아직 연결되지 않아 progress가 0입니다. 값은 컨트롤러가 첫 스크롤 위치를 읽은 뒤부터 계산됩니다.
>
> ## API
>
> ### `<ScrollProgressController>`
>
> 스크롤 위치를 하위 컴포넌트에 제공합니다. `children`만 받습니다.
>
> ### `useScrollProgress(options?)`
>
> `ref` 요소의 스크롤 진행도를 계산합니다. 반환값은 다음과 같습니다.
>
> | 값 | 설명 |
> |---|---|
> | `ref` | 진행도를 측정할 요소에 연결합니다. |
> | `scrollYProgress` | 세로 스크롤 진행도 |
> | `scrollXProgress` | 가로 스크롤 진행도 |
>
> 옵션은 모두 선택입니다.
>
> | 옵션 | 타입 | 기본값 | 설명 |
> |---|---|---|---|
> | `triggerHook` | `'onEnter' \| 'onCenter' \| 'onLeave' \| number` | `'onCenter'` | 요소가 화면에 얼마나 들어왔을 때 progress를 시작할지 정합니다. 0과 1 사이의 숫자로 지정하며, 0이면 화면 위쪽 끝, 1이면 아래쪽 끝입니다. |
> | `duration` | `string \| number` | `'100%'` | trigger가 시작된 뒤 얼마나 스크롤해야 progress가 1이 되는지 정합니다. |
> | `clip` | `boolean` | `false` | `true`이면 progress를 0과 1 사이로 제한합니다. `false`이면 범위를 벗어난 값도 그대로 반환합니다. |
>
> `triggerHook`의 별칭은 다음 값과 같습니다.
>
> - `onEnter`: 요소가 화면에 등장하기 시작할 때 (`1`)
> - `onCenter`: 요소의 상단이 화면 중앙에 닿았을 때 (`0.5`)
> - `onLeave`: 요소가 화면에서 벗어나기 시작할 때 (`0`)
>
> `duration`은 다음 형식을 지원합니다.
>
> | 값 | 의미 |
> |---|---|
> | `200` 또는 숫자 | 해당 px만큼 스크롤할 때까지 |
> | `'200%'` | 요소 크기의 2배만큼 스크롤할 때까지 |
> | `'150vh'` | 화면 높이의 1.5배만큼 스크롤할 때까지 |
> | `'150vw'` | 화면 너비의 1.5배만큼 스크롤할 때까지 |
>
> 지원하지 않는 문자열을 넘기면 `console.error`로 알리고 요소 크기를 기준으로 계산합니다. 숫자 `0`이나 크기가 0인 요소는 길이를 1로 계산합니다.
>
> ### `<ScrollRevealAnimation>`
>
> 스크롤하면 아래에서 위로 올라오며 나타나는 `div`입니다. `useScrollProgress`를 `triggerHook: 0.6`, `duration: '20vh'`, `clip: true`로 호출해, progress에 따라 `opacity`를 0에서 1로, `translateY`를 100px에서 0으로 바꿉니다. `div`의 속성을 모두 받으며, 넘긴 `style`이 기본 스타일보다 우선합니다. 이 컴포넌트도 `ScrollProgressController` 안에서 사용해야 합니다.
>
> ```tsx
> <ScrollProgressController>
>   <ScrollRevealAnimation>
>     <h2>스크롤하면 나타나는 제목</h2>
>   </ScrollRevealAnimation>
> </ScrollProgressController>
> ```
>
> ### `ScrollProgressContext`
>
> `ScrollProgressController`가 값을 제공하는 React 컨텍스트입니다. 값은 창 크기와 스크롤 위치(`width`, `height`, `scrollX`, `scrollY`)입니다.
>
> ### `clipProgress(progress)`
>
> 값을 0과 1 사이로 제한합니다.
>
> ### `sliceProgress({ progress, start?, end?, clip? })`
>
> progress의 `start`부터 `end`까지를 0에서 1로 다시 환산합니다. `start`의 기본값은 `0`, `end`는 `1`, `clip`은 `true`입니다.
>
> ```ts
> sliceProgress({ progress: 0.6, start: 0.5, end: 0.9 }); // 0.25
> ```
>
> 하나의 progress로 여러 단계의 애니메이션을 나눠 쓸 때 유용합니다.
>
> ```tsx
> const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({ duration: '100vh' });
> const opacity = sliceProgress({ progress: scrollYProgress, start: 0, end: 0.5 });
> const translateY = sliceProgress({ progress: scrollYProgress, start: 0.5, end: 1 }) * 100;
> ```
>
> ## 라이선스
>
> MIT License. © 2021 Viva Republica, Inc. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # @toss/scroll-animation
>
> React에서 요소가 화면 안에서 얼마나 스크롤됐는지를 0~1 사이의 숫자(progress)로 계산해 주는 패키지입니다. 이 값을 `opacity`나 `transform`에 연결하면 스크롤에 맞춰 움직이는 애니메이션을 만들 수 있습니다. 스크롤 이벤트는 `window` 기준으로 감지합니다.
>
> 요소가 아래에서 올라오며 나타나는 효과는 `ScrollRevealAnimation`으로 바로 쓸 수 있습니다.
>
> ```tsx
> import { ScrollProgressController, ScrollRevealAnimation } from '@toss/scroll-animation';
>
> function App() {
>   return (
>     <ScrollProgressController>
>       <ScrollRevealAnimation>스크롤하면 아래에서 올라오며 나타납니다.</ScrollRevealAnimation>
>     </ScrollProgressController>
>   );
> }
> ```
>
> ## 설치
>
> ```bash
> npm install @toss/scroll-animation
> # 또는
> yarn add @toss/scroll-animation
> ```
>
> `react` 16.8 이상(`^16.8 || ^17.0 || ^18`)이 필요합니다.
>
> ## 사용법
>
> 스크롤 progress를 쓰는 컴포넌트는 반드시 `ScrollProgressController` 안에 있어야 합니다. `ScrollProgressController`가 `window`의 크기와 스크롤 위치를 한 번만 감지해 하위 컴포넌트에 전달합니다. 스크롤과 리사이즈 이벤트는 `requestAnimationFrame`으로 묶어 처리합니다.
>
> ### ScrollRevealAnimation
>
> 자식 요소를 스크롤에 맞춰 나타나게 하는 `div`입니다. 뷰포트 높이의 60% 지점에 요소 상단이 닿을 때부터 뷰포트 높이의 20%만큼 스크롤하는 동안, 요소가 100px 아래에서 제자리로 올라오며 투명도가 0에서 1로 바뀝니다.
>
> `div`의 속성을 그대로 받습니다. `style`로 넘긴 `transform`과 `opacity`는 기본 효과보다 우선합니다.
>
> ### useScrollProgress
>
> 애니메이션을 직접 만들 때 씁니다. 반환된 `ref`를 대상 요소에 연결하면 그 요소의 progress를 돌려줍니다.
>
> ```tsx
> import { ScrollProgressController, useScrollProgress } from '@toss/scroll-animation';
>
> function Banner() {
>   const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>({
>     triggerHook: 'onEnter',
>     duration: '50vh',
>     clip: true,
>   });
>
>   return (
>     <div ref={ref} style={{ opacity: scrollYProgress }}>
>       배너
>     </div>
>   );
> }
>
> function App() {
>   return (
>     <ScrollProgressController>
>       <Banner />
>     </ScrollProgressController>
>   );
> }
> ```
>
> 반환값은 다음과 같습니다.
>
> - `ref`: progress를 계산할 요소에 연결합니다.
> - `scrollYProgress`: 세로 스크롤 progress입니다.
> - `scrollXProgress`: 가로 스크롤 progress입니다.
>
> 요소의 위치는 스크롤이나 리사이즈로 컨텍스트가 갱신될 때 읽습니다. 첫 렌더링과 `ScrollProgressController` 밖에서는 두 값이 모두 0입니다. 다만 `NODE_ENV`가 `development`이면 `ScrollProgressController` 밖에서 호출할 때 에러가 발생합니다.
>
> 옵션은 모두 생략할 수 있습니다.
>
> | 옵션 | 기본값 | 설명 |
> | --- | --- | --- |
> | `triggerHook` | `'onCenter'` | progress가 0에서 시작하는 지점입니다. 뷰포트 상단을 0, 하단을 1로 한 0~1 사이 숫자로, 요소 상단이 이 지점에 닿는 순간 시작합니다. `'onEnter'`(1), `'onCenter'`(0.5), `'onLeave'`(0)를 쓸 수도 있습니다. |
> | `duration` | `'100%'` | 시작 후 progress가 1이 될 때까지 스크롤할 거리입니다. px 단위의 숫자(`200`), 요소 크기에 대한 `'%'`, 뷰포트 너비·높이에 대한 `'vw'`·`'vh'` 문자열을 쓸 수 있습니다. 다른 형식이면 `console.error`를 출력하고 요소 크기를 사용합니다. |
> | `clip` | `false` | `true`이면 값을 0~1 사이로 제한합니다. `false`이면 시작 전에는 0보다 작은 값, 끝난 뒤에는 1보다 큰 값이 됩니다. |
>
> ### sliceProgress와 clipProgress
>
> 한 progress를 여러 구간으로 나눠 쓸 때 사용하는 함수입니다.
>
> `sliceProgress`는 progress 중 `start`부터 `end`까지를 0~1로 환산합니다. 예를 들어 `start: 0.5`, `end: 0.9`일 때 `progress: 0.6`은 0.5와 0.9 사이에서 25% 진행된 값이므로 `0.25`를 반환합니다. `start`와 `end`의 기본값은 0과 1, `clip`의 기본값은 `true`입니다. `end`가 0이면 `1`을, `start`가 `end` 이상이면 `start / end`를 반환합니다.
>
> ```tsx
> const { ref, scrollYProgress } = useScrollProgress<HTMLDivElement>();
>
> const titleProgress = sliceProgress({ progress: scrollYProgress, start: 0, end: 0.5 });
> const imageProgress = sliceProgress({ progress: scrollYProgress, start: 0.5, end: 1 });
> ```
>
> `clipProgress(progress)`는 값을 0~1 사이로 제한합니다.
>
> ### ScrollProgressContext
>
> `ScrollProgressController`가 하위에 전달하는 컨텍스트입니다. 값은 `window`의 `width`, `height`, `scrollX`, `scrollY`(`innerWidth`, `innerHeight`, `scrollX`, `scrollY`)이며, 마운트 후 처음 측정하기 전에는 480×800, 스크롤 0으로 가정합니다.
>
> ## 라이선스
>
> MIT. 자세한 내용은 \[LICENSE](./LICENSE)를 확인하세요.

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

X는 표와 예제(Steps 예제 포함)가 많아 API 레퍼런스로는 충실하다. 하지만 `ScrollRevealAnimation`을 두 번 설명하고 사용 제약도 두 번 적으며, triggerHook을 옵션 표와 alias 표로 겹쳐 정리한다. 굵은 라벨과 표가 이어지는 부분에서는 설명도 끊긴다. Y는 맨 앞에 바로 쓸 수 있는 예제를 두고, 기본 컴포넌트를 쓰다가 직접 만드는 단계로 자연스럽게 이어 준다. 'window 스크롤만 추적', '스크롤마다 리렌더링'처럼 실제로 필요한 주의점도 짚는다. Y에도 내부 경계 동작을 설명하는 군더더기가 조금 있어서 차이는 크지 않지만, 그대로 올리기에는 Y가 조금 낫다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 글빨 0.4.0 우세

X가 더 낫습니다. 같은 기능을 더 자연스러운 한국어 문장으로 설명하고, triggerHook과 duration을 정확하게 풀어 썼으며, 반복이나 불필요한 표 없이 적당한 분량으로 정리했습니다. Y에도 npm 설치 명령과 sliceProgress 다단계 예제처럼 쓸모 있는 내용이 있습니다. 하지만 제약을 여러 번 되풀이하고, 표를 지나치게 많이 쓰고, Context 인터페이스나 초기 480x800 같은 내부 세부까지 넣어서 문서가 불필요하게 무거워졌습니다.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

X도 단계별 시작 안내와 표로 정리한 API 레퍼런스가 있어 충분히 쓸 만합니다. 다만 같은 옵션을 표로 두 번 풀어 쓰고, 사용자에게 필요 없는 개발 명령 섹션을 넣어 분량이 늘었습니다. Y는 첫 사용 예제를 맨 앞에 두었고, 옵션 설명을 표 하나에 모았으며, 개념을 이어지는 문장으로 설명해 같은 정보를 더 짧고 읽기 좋게 전달합니다. 몇몇 내부 세부 사항은 흠이지만, 그대로 올릴 README로는 Y가 조금 낫습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 글빨 0.4.0 우세

X는 작은 패키지에 맞는 분량으로 첫 사용 예, 필수 조건, 옵션 동작을 이어지는 설명으로 전달한다. Y는 타입 정보가 충실하지만 홍보성 수식, 표의 중복, 요청하지 않은 개발·변경 내역 섹션 때문에 문서가 부풀었다. 찾기 쉬움은 비슷하고 과장·반복, 흐름, 절제에서 X가 앞선다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 차이 없음

Y는 맨 앞의 빠른 예제, 단계별 흐름, window 전용이라는 주의점이 좋습니다. X는 Context까지 포함한 완전한 API 레퍼런스와 컨트롤러로 감싼 완결된 예제가 좋습니다. 두 결과의 군더더기(X의 개발 섹션, Y의 sliceProgress 특수한 경우 설명)도 비슷한 수준이어서 어느 쪽도 분명히 낫지 않습니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

두 결과 모두 설치 방법, 핵심 API, 옵션 표, 라이선스를 갖춘 쓸 만한 README입니다. 차이는 구성과 분량에서 납니다. X는 첫 사용 예를 맨 앞에 두고 단계별로 이어지도록 짰으며, window 스크롤만 추적한다는 실제 사용 제약도 알려 줍니다. Y는 레퍼런스로서 더 촘촘하고 `ScrollProgressContext`도 다룹니다. 하지만 사용법과 API 절에서 같은 내용(ScrollRevealAnimation, 재렌더링)을 반복하고, 사용자에게 필요 없는 개발 명령 절을 붙였습니다. 차이가 크지는 않지만 그대로 올릴 글로는 X가 조금 낫습니다.

</details>

<details><summary>2회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

두 결과 모두 정확하고 쓸 만한 README입니다. 그래도 Y가 조금 낫습니다. 첫 화면에 가장 간단한 사용 예를 두었고, 옵션을 표 하나에 정리해 X처럼 별칭 목록과 duration 표를 따로 둔 중복이 없습니다. 동작 설명도 문장으로 자연스럽게 이어져 처음 읽는 사람이 이해하기 쉽습니다. Y에도 기본 크기 480×800 같은 내부 세부 사항이 일부 들어 있지만, 전체적으로 읽기 쉽고 찾기 쉬운 쪽은 Y입니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 차이 없음

X는 첫 화면의 바로 쓰는 예시와 간결한 옵션 표가 장점이지만, 경계 사례처럼 내부 구현에 가까운 세부 설명이 섞여 있습니다. Y는 API 참조가 체계적이고 타입을 적어 두었지만, triggerHook 설명과 Controller 안에서 써야 한다는 요구 사항을 되풀이해 문서가 다소 부풀었습니다. 장단점이 기준별로 엇갈려 어느 쪽도 분명히 낫다고 하기 어렵습니다.

</details>

