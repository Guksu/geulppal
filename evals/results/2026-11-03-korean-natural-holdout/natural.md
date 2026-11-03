# 한국어 독자가 멈칫하는 곳

자동 생성 파일이다(`node scripts/eval/natural.mjs summary --out 2026-11-03-korean-natural-holdout`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.

| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | literal | coined | noun_chain | symbol | translationese | awkward | 글에 없는 인용 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 16 | 3 | 34(3) | 15 | 0 | 0 | 0 | 1 | 18 | 0 |
| N1 | 16 | 0 | 45(0) | 16 | 0 | 3 | 1 | 2 | 23 | 0 |
| N3 | 16 | 3 | 36(0) | 13 | 0 | 1 | 0 | 2 | 20 | 0 |

표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.

## A

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-perf` r1 | literal | minor | 가장 비싼 실수가 됩니다 | 영어 'the most expensive mistake'를 그대로 옮긴 말이라 한국어로는 조금 어색합니다. | 가장 큰 손해가 됩니다 / 성능을 가장 크게 떨어뜨립니다 |
| `g2pk-perf` r1 | awkward | minor | 2번과 3번 항목(제곱 비용)을 정리합니다 | 본문의 2번(쓰지 않는 문자열 생성)과 3번(제곱 비용)을 가리키는데, 괄호 설명은 3번에만 맞습니다. 게다가 번호를 매긴 진행 순서 목록 안이라서 그 목록의 2·3단계와 헷갈립니다. | 본문 2번(불필요한 문자열 생성)과 3번(제곱 비용) 항목을 정리합니다 |
| `g2pk-perf` r2 | awkward | minor | 각각 `re.sub`를 한 번씩 돕니다 | '돌다'를 활용한 '돕니다'가 '돕다(help)'로도 읽혀 잠깐 멈칫하게 됩니다. 정규식을 '돈다'는 목적어 구성도 어색합니다. | 각각 `re.sub`를 한 번씩 실행합니다 |
| `g2pk-perf` r2 | literal | minor | 헛도는 패스입니다 | 영어 'pass'(순회 한 번)를 그대로 옮긴 말이라 한국어 문장 안에서 어색하게 읽힙니다. | 아무것도 바꾸지 않고 헛도는 셈입니다 |
| `g2pk-perf` r2 | awkward | minor | 리스트에 모았다가 `join`하는 쪽이 안전합니다 | 성능을 다루는 맥락인데 '안전하다'를 써서 무엇이 위험한지 다시 생각하게 됩니다. | 리스트에 모았다가 `join`하는 편이 빠릅니다 |
| `koelectra-upgrade` r1 | literal | minor | 조용히 넘어갑니다 | 'fail silently'를 낱말대로 옮긴 표현입니다. '이름이 어긋나면 기존 체크포인트가 조용히 로드되지 않습니다', 소제목 '조용히 틀릴 수 있는 곳'에도 같은 표현이 나옵니다. | 오류 없이 넘어갑니다 / 오류 없이 로드되지 않습니다 / 오류 없이 결과가 틀릴 수 있는 곳 |
| `koelectra-upgrade` r1 | literal | minor | 죽은 설정 | 'dead config'를 직역한 말이라 한국어 문서에서는 어색합니다. | 더 이상 쓰이지 않는 설정 |
| `koelectra-upgrade` r1 | awkward | minor | 에러 없이 평가가 건너뛰어질 수 있습니다 | '건너뛰어지다'처럼 피동을 겹쳐 쓴 형태가 부자연스럽습니다. | 에러 없이 평가를 건너뛸 수 있습니다 |
| `koelectra-upgrade` r1 | awkward | major | 이 코드는 4.x와 5.x 사이의 중간 단계 없이 3.3.1에서 바로 건너뛰게 됩니다. | 3.3.1에서 무엇으로 건너뛰는지가 빠져 있고, '4.x와 5.x 사이의 중간 단계'가 무엇을 가리키는지도 알기 어려워 문장을 다시 읽게 됩니다. | 이 코드는 3.3.1에서 4.x를 거치지 않고 바로 최신 버전으로 올리게 됩니다. |
| `koelectra-upgrade` r2 | literal | minor | 조용히 달라질 수 있는 곳 | 영어 'silently'를 낱말대로 옮긴 말이라 한국어 문장으로 바로 읽히지 않습니다. | 오류 없이 결과만 달라질 수 있는 곳 / 티 나지 않게 의미가 뒤집히는 자리 |
| `koelectra-upgrade` r2 | awkward | minor | 이 코드는 `args.xxx = ...` 식의 대입을 하지만 속성 접근만 쓰므로 교체는 쉽습니다. | '대입을 하지만 속성 접근만 쓴다'는 앞뒤가 맞지 않는 것처럼 읽혀서 문장을 다시 읽게 됩니다. | 이 코드는 `args.xxx = ...`처럼 속성으로 읽고 쓰기만 하므로 교체는 쉽습니다. |
| `koelectra-upgrade` r2 | awkward | minor | 이 로드들은 에러가 납니다. | '로드'를 복수 명사로 만들어 주어로 쓴 표현이 어색합니다. | 이 파일들을 읽는 부분에서 에러가 납니다. |
| `koelectra-upgrade` r2 | awkward | minor | 이 값에 따라 A는 충분하거나 무의미합니다. | '이 값'이 앞에 나온 계획 여부를 가리키는데, 계획 여부를 '값'이라고 부르면 문맥에 맞지 않습니다. | 이 결정에 따라 A로 충분할 수도 있고, 할 필요가 없을 수도 있습니다. |
| `korpora-bug` r1 | literal | minor | 조용히 제거합니다 | 영어 'silently drop'을 낱말대로 옮긴 말입니다. 3절 제목 '조용히 틀린 결과를 내는 패턴'에도 같은 표현이 나옵니다. | 아무 경고 없이 제거합니다 / 경고 없이 틀린 결과를 내는 패턴 |
| `korpora-bug` r1 | awkward | minor | 출력 파일이 "한 줄에 한 문장" 형식이 깨지고 | '출력 파일이'와 '형식이'가 주어로 겹쳐서 문장이 매끄럽게 이어지지 않습니다. | 출력 파일의 "한 줄에 한 문장" 형식이 깨지고 |
| `korpora-bug` r1 | awkward | minor | 매번 재압축 해제를 합니다 | '재압축'을 '다시 압축한다'는 뜻으로 잘못 읽을 수 있고, 명사를 이어 붙여 표현이 무겁습니다. | 매번 압축을 다시 풉니다 |
| `korpora-bug` r2 | awkward | major | 이 파일에 대한 테스트가 `tests/`에 보이지 않는 점이 이유일 가능성이 큽니다. | 무엇의 이유인지 빠져 있습니다. 앞 문장에 이어 읽으면 테스트가 없어서 TypeError가 난다는 뜻으로 잘못 읽힐 수 있습니다. | 이 파일을 다루는 테스트가 `tests/`에 없어서 이 오류를 아직 아무도 발견하지 못한 것으로 보입니다. |
| `korpora-bug` r2 | literal | minor | 조용히 걸러집니다 | 'silently'를 그대로 옮긴 표현입니다. 한국어로는 '알림 없이', '아무 표시 없이'라고 씁니다. | 에러나 경고 없이 걸러집니다 |
| `korpora-bug` r2 | literal | minor | 말없이 빼 버립니다 | 'silently drop'을 그대로 옮겼습니다. 코드가 '말없이' 무언가를 한다는 말은 한국어에서 어색합니다. | 아무 표시 없이 빼 버립니다 |
| `korpora-bug` r2 | literal | minor | 맨 `except:` | 'bare except'를 낱말대로 옮긴 말이라 무엇을 가리키는지 한 번 더 생각하게 됩니다. | 예외 타입을 지정하지 않은 `except:` |
| `py-hanspell-upgrade` r1 | literal | minor | 조용히 반환합니다 | 영어 'silently return'을 낱말대로 옮긴 표현입니다. 앞의 '예외 없이'와 뜻이 겹치고, 한국어 개발자는 이렇게 쓰지 않습니다. | 예외 없이 `Checked(result=False)`를 그냥 반환합니다 / 아무 알림 없이 `Checked(result=False)`를 반환합니다 |
| `py-hanspell-upgrade` r2 | awkward | minor | 3.10은 2026년 10월에 EOL이 됐으니 최소 지원 버전은 3.10 이상, 현실적으로는 3.11 이상을 고려하세요. | 앞에서는 3.10이 EOL이 됐다고 하고 바로 뒤에서는 최소 지원 버전을 3.10 이상으로 잡으라고 합니다. 이유와 결론이 맞지 않아 독자가 문장을 다시 읽게 됩니다. | 3.10은 2026년 10월에 EOL이 됐으니 최소 지원 버전은 3.11 이상으로 잡는 것을 고려하세요. |
| `toss-date-files` r1 | awkward | minor | 개발 중에는 `src/index.ts`를 바로 가리키고, 배포 때는 `dist/`(CJS)와 `esm/`(ESM)을 가리키도록 `publishConfig`로 바꿉니다. | 무엇이 `src/index.ts`를 가리키는지(진입점 필드) 주어가 빠졌습니다. 그래서 '바꿉니다'의 대상도 바로 읽히지 않습니다. | 진입점(`main` 등)은 개발 중에는 `src/index.ts`를 바로 가리키고, 배포할 때는 `publishConfig`에 적힌 `dist/`(CJS)와 `esm/`(ESM)으로 바뀝니다. |
| `toss-hangul-perf` r1 | literal | minor | 첫 글자에서 실패해도 전체 비용을 냅니다. | 영어 'pay the full cost'를 그대로 옮긴 표현입니다. 한국어 개발자는 '비용을 낸다'고 잘 쓰지 않습니다. | 첫 글자에서 실패해도 문자열 전체를 분해하는 비용이 듭니다. |
| `toss-hangul-perf` r2 | awkward | minor | 알고리즘 복잡도가 터지는 곳 | '복잡도가 터지다'는 구어체 은어여서 존댓말로 쓴 분석 글의 첫 문단에 어울리지 않습니다. 복잡도와 '터지다'를 함께 쓴 것도 어색합니다. | 알고리즘 복잡도가 문제 되는 곳 |
| `toss-use-funnel-bug` r1 | awkward | major | **재발 방지:** 캐시가 살아 있으면 | '재발 방지'라는 항목명 아래에 막는 방법이 아니라 문제가 다시 생기는 조건과 결과가 적혀 있습니다. 독자는 해결책이 나올 거라 기대했다가 내용이 달라 다시 읽게 됩니다. | **다시 마운트할 때:** 캐시가 살아 있으면 |
| `toss-use-funnel-bug` r1 | awkward | minor | `setState`의 updater를 stale `state`로 한 번, React가 한 번 더 호출함 | 앞 절에는 서술어와 주어가 없고 뒤 절의 주어만 'React'라서, 처음 한 번은 누가 호출하는지 바로 읽히지 않습니다. | `setState`가 updater를 오래된 `state`로 한 번 호출하고, React가 한 번 더 호출함 |
| `toss-use-funnel-bug` r1 | translationese | minor | `QueryClientProvider`와 `Suspense`를 요구받음 | '요구받다'는 영어 피동(be required to)을 따른 표현이라, 한국어 개발자는 이렇게 쓰지 않습니다. | 모든 `useFunnel` 사용처에 `QueryClientProvider`와 `Suspense`가 필요함 |
| `toss-use-funnel-bug` r1 | literal | minor | 이런 `Step`은 조용히 필터링됩니다 | 'silently filtered'를 낱말대로 옮긴 말입니다. | 이런 `Step`은 경고 없이 걸러집니다 |
| `toss-use-funnel-bug` r1 | literal | minor | 소비자의 `useEffect` 의존성에 | 'consumer'를 그대로 옮긴 말이라, 라이브러리를 쓰는 쪽 코드라는 뜻이 바로 들어오지 않습니다. | 이 훅을 쓰는 쪽의 `useEffect` 의존성에 |
| `toss-use-funnel-bug` r2 | literal | minor | 스텝 전환을 조용히 막을 수 있습니다 | 'fail silently'를 그대로 옮긴 '조용히'라서 오류 없이 막힌다는 뜻이 바로 읽히지 않습니다. | 오류 없이 스텝 전환을 막을 수 있습니다 |
| `toss-use-funnel-bug` r2 | literal | minor | 배치된 업데이트나 StrictMode에서는 | 'batched updates'를 '배치된'으로 옮겨서 '배치(배열·위치)'로 잘못 읽힐 수 있습니다. | 업데이트가 배칭(일괄 처리)되거나 StrictMode에서는 |
| `toss-use-funnel-bug` r2 | awkward | minor | 146줄의 `deepEqual`이 영영 같아지지 않으면 | 함수인 `deepEqual`이 같아진다는 문장이라 주어와 서술어가 맞지 않습니다. | 146줄의 `deepEqual` 비교가 계속 거짓이면 |
| `toss-use-funnel-bug` r2 | awkward | minor | 사용자가 바꿀 수 있는 URL이 들어오면 `steps`에 있는지 검증하지 않습니다 | '들어오면 검증하지 않는다'로 이어져서 조건과 결과가 어긋나게 읽힙니다. | 사용자가 바꿀 수 있는 URL이 들어와도 그 값이 `steps`에 있는지 검증하지 않습니다 |

## N1

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-perf` r1 | awkward | minor | 겹치지 않는 음절마다 | 고유한(중복 없는) 음절이라는 뜻인데, '겹치지 않는'이라고 하면 위치가 겹치지 않는다는 뜻으로 읽힐 수 있습니다. 바로 뒤에서는 '고유 음절'이라고 써서 같은 대상을 다른 말로 부릅니다. | 중복을 뺀 음절마다 |
| `g2pk-perf` r2 | awkward | minor | 효과 대비 수고는 1번과 2번을 `__init__`에서 한 번만 컴파일하는 방식이 가장 낫습니다 | '수고는'을 주어로 시작했는데 서술어는 '방식이 가장 낫습니다'로 끝나서 주어와 서술어가 맞지 않습니다. | 수고에 비해 효과가 가장 큰 것은 1번과 2번을 `__init__`에서 한 번만 컴파일하는 방식입니다 |
| `g2pk-perf` r2 | noun_chain | minor | 정규식 훑기가 수백 번 일어나고 | '훑다'라는 동작을 '훑기'라는 명사로 바꾼 뒤 '일어나다'를 붙여서, 한국어로 말할 때보다 딱딱하게 읽힙니다. | 정규식으로 문자열을 수백 번 훑게 되고 |
| `kobert-files` r1 | literal | minor | 진행 막대 | progress bar를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '진행률 표시줄'이나 '프로그레스 바'라고 씁니다. | 진행률 표시줄 |
| `kobert-files` r2 | literal | minor | 진행 막대를 출력합니다 | progress bar를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '진행률 표시줄'이나 '프로그레스 바'라고 씁니다. | 진행률 표시줄을 출력합니다 |
| `koelectra-upgrade` r1 | literal | minor | 특성 변환과 평가를 | SQuAD의 feature 변환을 '특성 변환'으로 옮겨서 무엇을 바꾼다는 건지 바로 들어오지 않는다. 이 맥락에서 한국어 개발자는 보통 '피처 변환'이나 '입력 피처 생성'이라고 쓴다. | 예제를 입력 피처로 바꾸는 처리와 평가를 |
| `koelectra-upgrade` r1 | awkward | minor | 두 그룹 모두 `weight_decay`를 직접 넘기고 있어서 | '두 그룹'이 옵티마이저의 파라미터 그룹이라는 설명이 없다. 처음 읽는 독자는 무엇을 가리키는지 다시 생각해야 한다. | 옵티마이저의 두 파라미터 그룹 모두 `weight_decay`를 직접 넘기고 있어서 |
| `koelectra-upgrade` r1 | awkward | minor | TF2 환경에서는 `tf.disable_v2_behavior()` 호출이 없습니다 | 호출이 없는 곳은 코드다. 'TF2 환경에서는'을 앞에 두면 TF2 환경에 그 호출이 없다는 뜻으로 읽힌다. | 코드에 `tf.disable_v2_behavior()` 호출이 없으므로 TF2 환경에서는 |
| `koelectra-upgrade` r1 | noun_chain | minor | 위에서 말한 특성 변환 쪽 제거 때문에 | '특성 변환 쪽 제거'처럼 명사가 이어져서 무엇이 제거된 건지 한 번에 읽히지 않는다. | 위에서 말했듯 transformers에서 SQuAD 피처 변환 함수가 빠졌기 때문에 |
| `koelectra-upgrade` r2 | translationese | minor | 오류 없이 평가가 건너뛰어질 수 있습니다 | '건너뛰다'를 억지로 피동형으로 만들어 문장이 어색합니다. | 오류 없이 평가를 건너뛸 수 있습니다 |
| `koelectra-upgrade` r2 | awkward | minor | `finetune/`을 먼저 올립니다 | '버전을 올린다'는 뜻으로 썼지만, 목적어가 디렉터리라서 '업로드한다'로 잘못 읽힐 수 있습니다. | `finetune/`부터 새 버전에 맞게 고칩니다 |
| `koelectra-upgrade` r2 | translationese | minor | 라이브러리 변경 이력에 대한 제 지식에 따른 것이라 | '~에 대한 ~에 따른' 구조가 겹쳐 문장이 무겁습니다. | 제가 알고 있는 라이브러리 변경 이력을 바탕으로 쓴 것이라 |
| `korpora-bug` r1 | literal | minor | 맨몸 `except:`가 그 예외를 삼키고 | 영어 'bare except'를 낱말대로 옮긴 말입니다. 한국어 개발자는 '맨몸'이라고 하지 않고 '예외 타입 없는 except'라고 하거나 'bare except'를 그대로 씁니다. | 예외 타입을 지정하지 않은 `except:`가 그 예외를 삼키고 |
| `korpora-bug` r1 | awkward | minor | 이 클래스를 다루는 테스트는 목록에 없었습니다. | 앞에서 어떤 '목록'도 소개하지 않았기 때문에 무슨 목록인지 알 수 없습니다. | 이 클래스를 다루는 테스트는 찾지 못했습니다. |
| `korpora-bug` r2 | literal | minor | 문장이 조용히 쪼개지고 | 'silently'를 그대로 옮긴 표현입니다. 한국어 개발자는 보통 '오류 없이', '아무 표시 없이'라고 씁니다. | 문장이 오류 없이 쪼개지고 |
| `korpora-bug` r2 | literal | minor | 맨몸 `except:`가 | 'bare except'를 낱말대로 옮겼습니다. '맨몸'은 이 맥락에서 쓰지 않는 말입니다. | 예외 타입을 지정하지 않은 `except:`가 |
| `korpora-bug` r2 | awkward | minor | URL이 `http://`라 내용 확인 수단이 없습니다. | '내용 확인 수단'만으로는 무결성 검증을 말하는지 바로 알기 어렵습니다. | URL이 `http://`라 받은 파일이 변조되지 않았는지 확인할 방법이 없습니다. |
| `korpora-bug` r2 | awkward | minor | 자동 내려받기 경로는 도달하지 못합니다 | '경로'가 주어라서 '경로가 도달한다'로 읽힙니다. 주어와 서술어가 맞지 않습니다. 실제로는 실행이 그 코드에 도달하지 않는다는 뜻입니다. | 자동으로 내려받는 코드는 실행되지 않습니다 |
| `korpora-bug` r2 | awkward | minor | 사용자가 가장 자주 만날 충돌 | crash를 '충돌'로 옮기면 개발 맥락에서는 conflict로 읽히기 쉽습니다. | 사용자가 가장 자주 만날 오류 |
| `py-hanspell-upgrade` r1 | literal | minor | 모두 수명이 끝난 버전입니다 | end-of-life를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '지원이 종료된'이라고 씁니다. | 모두 지원이 종료된 버전입니다 |
| `py-hanspell-upgrade` r1 | noun_chain | minor | 고정 위치 자르기 | 명사를 늘어놓아 무엇을 어떻게 자르는지 한 번에 읽히지 않습니다. | 고정 인덱스로 문자열을 자르는 방식 |
| `py-hanspell-upgrade` r1 | awkward | minor | 콜백 껍데기 제거 방식 | '껍데기'는 JSONP 콜백 wrapper를 낱말대로 옮긴 표현이고, 앞에 명사가 이어 붙어 무슨 방식인지 바로 읽히지 않습니다. | 콜백 함수 이름과 괄호를 벗겨 내는 방식 |
| `py-hanspell-upgrade` r1 | literal | minor | 핀 고정(`==`) | pin을 음차한 '핀'에 '고정'을 또 붙여 같은 뜻이 겹칩니다. | 버전 고정(`==`) |
| `py-hanspell-upgrade` r1 | awkward | minor | 검증문이 없어서 | assertion을 '검증문'이라고 부르는 경우는 드뭅니다. | assert 문이 없어서 |
| `py-hanspell-upgrade` r1 | awkward | minor | 지금 응답으로 네이버 요청이 되는지 확인합니다 | '지금 응답으로'가 문장 안에서 무엇에 걸리는지 알 수 없어서 다시 읽게 됩니다. | 네이버에 요청을 보내 지금도 예전과 같은 형식으로 응답하는지 확인합니다 |
| `py-hanspell-upgrade` r1 | awkward | minor | 호출 없이 도는 단위 테스트 | 무엇을 호출하지 않는다는 것인지 빠져 있습니다. | 네트워크 호출 없이 실행되는 단위 테스트 |
| `py-hanspell-upgrade` r2 | literal | minor | 맨 `assert`를 쓰고 있습니다 | 영어 'bare assert'를 낱말대로 옮긴 말이라 '맨'이 무슨 뜻인지 잠깐 생각하게 된다. | `assert` 문을 그대로 쓰고 있습니다 |
| `py-hanspell-upgrade` r2 | literal | minor | `[project]` 표 | TOML의 'table'을 '표'로 옮겼다. 한국어 개발자는 보통 '테이블'이나 '섹션'이라고 부른다. | `[project]` 테이블(섹션) |
| `py-hanspell-upgrade` r2 | awkward | minor | 시험 대상은 3.10~3.14 정도로 잡으면 됩니다 | 개발 맥락에서는 'test'를 '테스트'라고 하므로 '시험'이 어색하다. 바로 앞뒤 문장에서는 '테스트'를 쓰고 있어 말도 섞인다. | 테스트할 Python 버전은 3.10~3.14 정도로 잡으면 됩니다 |
| `py-hanspell-upgrade` r2 | awkward | minor | 테스트를 저장된 응답 기반으로 나눕니다 | 무엇을 기준으로 어떻게 나누는지가 압축돼 있어서 바로 읽히지 않는다. | 파싱 테스트는 저장해 둔 응답으로 돌리고, 실제 호출 테스트는 따로 분리합니다 |
| `toss-date-files` r1 | awkward | minor | 결과를 `dist`에 냅니다 | 빌드 결과물을 어디에 두는지 말할 때 '냅니다'는 잘 쓰지 않아 문맥에 맞지 않는 낱말로 읽힙니다. 같은 표현이 tsconfig.esm.json 항목에도 나옵니다. | 결과물을 `dist`에 출력합니다 |
| `toss-date-files` r2 | awkward | minor | 같거나 이전·이후인지 비교하는 | 가운뎃점 때문에 '같거나 이전인지 / 같거나 이후인지'가 아니라 '같은지, 이전인지, 이후인지'로 읽힐 수 있어 독자가 다시 읽게 됩니다. | 한 날짜가 다른 날짜와 같거나 그보다 앞서는지(`isEqualOrBefore`), 같거나 그보다 뒤인지(`isEqualOrAfter`) 확인하는 |
| `toss-hangul-perf` r1 | symbol | minor | 글자 수 × (객체 1개 + 배열 여러 개)가 생기니 | 본문 설명 문장 안에서 곱셈 기호와 괄호 수식이 서술을 대신해 문장 흐름이 끊깁니다. | 글자마다 객체 하나와 배열 여러 개가 생기니 |
| `toss-hangul-perf` r1 | awkward | minor | 내부적으로 문자열을 이어 붙여 두었다가 나중에 합치므로 | '이어 붙이다'와 '합치다'가 같은 뜻으로 읽혀서, 실제 연결을 미뤄 둔다는 설명(rope)이 바로 들어오지 않습니다. | 내부적으로 문자열을 바로 복사하지 않고 조각을 연결만 해 두었다가 나중에 한 번에 합치므로 |
| `toss-hangul-perf` r2 | literal | minor | `disassembleHangulToGroups`(`src/disassembleHangulToGroups.ts:5`) 위에 서 있습니다 | 영어 'built on top of'를 낱말대로 옮긴 표현이라 한국어로는 어색합니다. '이 라이브러리는 모든 함수가'처럼 주어가 겹쳐서 문장도 무겁습니다. | 이 라이브러리의 모든 함수는 글자마다 작은 배열과 객체를 만드는 `disassembleHangulToGroups`(...)를 거칩니다 |
| `toss-hangul-perf` r2 | awkward | minor | 처리 시간이 글자 수에 비례해서 늘고, 긴 텍스트나 큰 목록에서 가장 먼저 눈에 띌 곳입니다. | 앞 절의 주어 '처리 시간이'가 뒤 절의 '눈에 띌 곳입니다'와 맞지 않습니다. 뒤 절에서 무엇이 눈에 띄는지가 빠졌습니다. | 처리 시간이 글자 수에 비례해서 늘어나므로, 긴 텍스트나 큰 목록을 다룰 때 가장 먼저 느려지는 곳입니다. |
| `toss-use-funnel-bug` r1 | literal | minor | 한 번은 렌더 때 닫힌 `state`로 직접 | 영어 'closed-over state'를 그대로 옮긴 '닫힌'이라 클로저를 말하는지 곧바로 알기 어렵다. | 한 번은 렌더 때 클로저에 잡힌 `state`로 직접 |
| `toss-use-funnel-bug` r1 | literal | minor | `deepEqual(nextStateRef.current, state)`가 영원히 거짓이 됩니다 | 'forever false'를 낱말대로 옮긴 말이다. 한국어 개발자는 '영원히'를 이런 자리에 쓰지 않는다. | `deepEqual(nextStateRef.current, state)`가 계속 거짓이 됩니다 |
| `toss-use-funnel-bug` r1 | literal | minor | 이름이 `steps`에 없는 자식도 말없이 걸러져서 | 'silently filtered'를 그대로 옮겼다. | 이름이 `steps`에 없는 자식은 경고 없이 걸러져서 |
| `toss-use-funnel-bug` r1 | awkward | minor | 렌더는 부수 효과가 없어야 하는데 지키지 못하고 있습니다 | 앞 절의 주어는 '렌더'인데 '지키지 못하고 있습니다'의 주어는 코드다. 주어와 서술어가 맞지 않는다. | 렌더 중에는 부수 효과가 없어야 하는데 이 코드는 그 규칙을 어깁니다 |
| `toss-use-funnel-bug` r1 | awkward | minor | `Step`의 `onEnter`가 단계에 들어올 때만 호출되지 않는다 | '때만 ~되지 않는다'는 '들어올 때는 호출되지 않는다'로도 읽힐 수 있어 다시 읽게 된다. | `Step`의 `onEnter`가 단계에 들어올 때 말고도 호출된다 |
| `toss-use-funnel-bug` r2 | literal | minor | 말없이 버린다 | 'silently drops'를 낱말대로 옮긴 표현이라 한국어 개발자는 이렇게 쓰지 않는다. | 오류 없이 버린다 |
| `toss-use-funnel-bug` r2 | awkward | minor | 화면이 내려앉습니다 | 앱이 죽거나 화면이 깨지는 상황을 '내려앉는다'라고 하지 않아 읽다가 멈칫한다. | 화면이 깨집니다 |
| `toss-use-funnel-bug` r2 | awkward | minor | 경로 틀 | route pattern을 '경로 틀'이라고 부르지 않는다. 독자가 무엇을 가리키는지 한 번 더 생각해야 한다. | 경로 패턴 |
| `toss-use-funnel-bug` r2 | literal | minor | 뒤에서 다시 가져옵니다 | 'refetch in the background'를 옮긴 말이다. 보통은 '백그라운드에서'라고 쓴다. | 백그라운드에서 다시 가져옵니다 |

## N3

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-perf` r1 | literal | minor | 고유 음절마다 | unique를 '고유'로 옮겼습니다. 한국어에서 '고유'는 '본래 가진'이라는 뜻으로 먼저 읽혀서, '중복을 뺀 음절'이라는 뜻이 바로 들어오지 않습니다. | 서로 다른 음절마다 |
| `kobert-files` r1 | literal | minor | 진행 막대를 출력합니다 | progress bar를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '진행 표시줄'이나 '프로그레스 바'라고 씁니다. | 진행 표시줄을 출력합니다 |
| `kobert-files` r2 | awkward | minor | `setup.py`가 읽는 `README.md`는 `kobert/`와 `kobert_hf/` 모두 저장소에 없습니다. | '`kobert/`와 `kobert_hf/` 모두'가 어디에 걸리는지 분명하지 않습니다. 두 패키지의 setup.py를 말하는지, 두 디렉터리 안에 README.md가 없다는 뜻인지 다시 읽어야 알 수 있습니다. | 루트 `setup.py`와 `kobert_hf/setup.py`는 둘 다 `README.md`를 읽는데, 이 파일이 저장소에 없습니다. |
| `koelectra-upgrade` r1 | awkward | minor | 그래프 모드가 전제입니다 | '전제'를 서술어 자리에 바로 써서 문장이 어색하게 끊깁니다. 한국어로는 보통 '~을 전제로 한다'라고 씁니다. | 그래프 모드를 전제로 합니다 |
| `koelectra-upgrade` r1 | awkward | minor | KorQuAD(`run_squad.py`)만 별도 작업이 됩니다. | '별도 작업이 됩니다'는 무엇이 필요한지 흐릿하게 전합니다. 이 자리에는 '필요하다'가 자연스럽습니다. | KorQuAD(`run_squad.py`)는 따로 작업해야 합니다. |
| `koelectra-upgrade` r2 | awkward | minor | `run_squad.py:259`의 `for output in outputs`는 모델 출력이 튜플이라는 가정입니다. | 주어인 코드가 '가정'이라는 명사와 바로 이어져 있습니다. 그래서 주어와 서술어가 잘 맞지 않습니다. | `run_squad.py:259`의 `for output in outputs`는 모델 출력이 튜플이라고 가정한 코드입니다. |
| `koelectra-upgrade` r2 | literal | minor | 특징 변환 | SQuAD의 feature conversion을 '특징'으로 낱말대로 옮겼습니다. 한국어 개발자는 보통 '피처 변환'이라고 쓰거나 무엇을 하는 단계인지 풀어서 씁니다. | 피처 변환 |
| `koelectra-upgrade` r2 | literal | minor | 가장 쌉니다 | cheapest를 그대로 옮긴 말입니다. 작업 비용을 말할 때 '싸다'는 어색합니다. | 품이 가장 적게 듭니다 |
| `korpora-bug` r1 | literal | minor | `StopIteration`이 그대로 새어 나옵니다 | 영어 'leaks out'을 낱말대로 옮긴 말입니다. 한국어 개발자는 예외가 '새어 나온다'고 하지 않고 '밖으로 전파된다'나 '호출한 쪽까지 올라간다'고 씁니다. | `StopIteration`이 잡히지 않고 호출한 쪽까지 올라갑니다 |
| `korpora-bug` r1 | noun_chain | minor | 청크 전송 서버에서 걸립니다 | 'chunked transfer'를 명사만 이어 붙여서 무엇을 하는 서버인지 바로 읽히지 않습니다. | 응답을 청크 단위로 나눠 보내는 서버에서 이 문제가 생깁니다 |
| `korpora-bug` r1 | awkward | minor | 코드만으로 틀림이 확정되는 곳 | '틀림이 확정되다'는 한국어에서 잘 쓰지 않는 조합이라 문장을 다시 읽게 됩니다. | 코드만 봐도 틀린 게 분명한 곳 |
| `korpora-bug` r2 | literal | minor | 맨몸 `except:` | bare except를 낱말대로 옮긴 말입니다. 한국어 개발자는 '맨몸'이라는 표현을 쓰지 않습니다. | 예외 타입을 지정하지 않은 `except:` |
| `korpora-bug` r2 | awkward | minor | 같은 말뭉치라도 경로마다 동작이 다릅니다 | 코드 경로(code path)를 뜻하는데, 바로 앞에서 파일을 읽는 이야기를 하고 있어서 파일 경로로 잘못 읽힐 수 있습니다. | 같은 말뭉치라도 어떤 함수로 읽느냐에 따라 동작이 다릅니다 |
| `korpora-bug` r2 | awkward | minor | 왜 이 구역들이 위험하다고 보는가 | 코드의 일부를 가리키면서 '구역'이라는 말을 써서 어색합니다. | 왜 이 부분들이 위험하다고 보는가 |
| `py-hanspell-upgrade` r1 | translationese | minor | 알려지기로는 네이버가 이후 요청 방식을 바꿔서 | 'reportedly'를 옮긴 듯한 표현이라 한국어 문장에서는 어색하다. | 알려진 바로는 네이버가 이후 요청 방식을 바꿔서 |
| `py-hanspell-upgrade` r1 | awkward | minor | 호출한 쪽은 오류 없이 실패한 입력을 구분할 방법이 없습니다. | '오류 없이'가 '구분할'에 걸리는지 '실패한'에 걸리는지 분명하지 않아 다시 읽게 된다. | 예외가 나지 않으므로, 호출한 쪽은 입력이 너무 길어서 실패한 경우를 다른 결과와 구분하기 어렵습니다. |
| `py-hanspell-upgrade` r1 | awkward | minor | 검증문이 없습니다 | assertion을 '검증문'이라고 부르는 일은 드물다. 한국어 개발자는 보통 assert 문이나 검증 코드라고 한다. | assert 문이 없습니다 |
| `py-hanspell-upgrade` r2 | awkward | minor | 쓰지 않는 방향의 키입니다 | deprecated를 옮기려다 '쓰지 않는 방향의'라는 어색한 표현이 됐습니다. 무슨 뜻인지 한 번 더 생각하게 됩니다. | 더 이상 권장하지 않는(deprecated) 키입니다 |
| `py-hanspell-upgrade` r2 | awkward | minor | 다른 포크들은 주소와 요청 방식을 바꿨다고 기억하지만 | 주어가 '포크들은'처럼 읽혀서 포크가 기억한다는 문장이 됐습니다. 기억하는 주체가 글쓴이라는 점이 문장에 드러나지 않습니다. | 제 기억으로는 다른 포크들이 주소와 요청 방식을 바꿨지만 |
| `py-hanspell-upgrade` r2 | translationese | minor | 현대 환경에 걸리는 곳 | modern environment를 그대로 옮긴 말입니다. 한국어 개발자는 보통 '최신 환경'이라고 씁니다. | 최신 환경에서 문제가 되는 곳 |
| `py-hanspell-upgrade` r2 | literal | minor | 정확한 핀은 | pin을 소리 나는 대로 적어 명사로 썼습니다. 한국어 문장에서는 '버전 고정'이라고 하는 편이 바로 읽힙니다. | 정확한 버전 고정은 |
| `py-hanspell-upgrade` r2 | literal | minor | 응답 파싱을 튼튼하게 만듭니다 | robust를 '튼튼하게'로 옮겼는데, 코드를 두고 한국어로 쓸 때는 잘 쓰지 않는 표현입니다. | 응답 형식이 바뀌어도 깨지지 않게 파싱을 고칩니다 |
| `py-hanspell-upgrade` r2 | awkward | minor | 검증문이 하나도 없어서 | '검증문'은 assert 문을 가리키려고 만든 말처럼 보이고, 개발자가 흔히 쓰는 말은 아닙니다. | assert 문이 하나도 없어서 |
| `toss-hangul-perf` r1 | awkward | minor | 목록 수백~수천 개를 | 수를 세는 대상은 목록이 아니라 항목인데, '목록 수백~수천 개'라고 써서 목록이 수백 개라는 뜻처럼 읽힌다. | 항목 수백~수천 개가 든 목록을 |
| `toss-hangul-perf` r1 | awkward | minor | 미리 만든 표를 찾아보면 됩니다 | lookup table을 낱말대로 옮겨서 표 자체를 찾는다는 뜻으로 읽힌다. 뜻은 표에서 값을 찾는다는 것이다. | 미리 만든 표에서 찾으면 됩니다 |
| `toss-hangul-perf` r2 | awkward | minor | `disassembleHangulToGroups`의 할당량 | '할당량'은 보통 정해진 몫(quota)을 뜻합니다. 여기서는 메모리 할당이 많다는 뜻이라 처음 읽을 때 멈칫하게 됩니다. | `disassembleHangulToGroups`의 메모리 할당 |
| `toss-hangul-perf` r2 | awkward | minor | `x`와 `y`를 호출할 때마다 끝까지 분해해서 | 호출하는 대상은 함수인데 문장에서는 인자 `x`와 `y`를 호출하는 것처럼 읽힙니다. 목적어와 서술어가 맞지 않습니다. | 호출할 때마다 `x`와 `y`를 끝까지 분해해서 |
| `toss-hangul-perf` r2 | awkward | minor | 효율 있게 다루는 편이라 | 한국어에서는 '효율 있게'라고 잘 쓰지 않고 보통 '효율적으로'라고 씁니다. | 효율적으로 다루는 편이라 |
| `toss-hangul-perf` r2 | awkward | minor | `hasBatchim`과 직접 호출로 두 번 분해하고 | '직접 호출'이 무엇을 직접 호출한다는 것인지 빠져 있어서 문장을 다시 읽어야 합니다. | `hasBatchim` 안에서 한 번, 분해 함수를 직접 불러 또 한 번, 모두 두 번 분해하고 |
| `toss-use-funnel-bug` r1 | literal | minor | 효과가 다시 실행됩니다 | React의 effect를 '효과'로 옮겨서 일반 낱말처럼 읽힙니다. 한국어 개발자는 보통 '이펙트'라고 씁니다. | 이펙트가 다시 실행됩니다 |
| `toss-use-funnel-bug` r1 | literal | minor | 무한 루프의 씨앗이 될 수 있습니다 | 영어 'seed of'를 낱말대로 옮긴 비유라서 기술 설명에서는 어색합니다. | 무한 루프를 일으킬 수 있습니다 |
| `toss-use-funnel-bug` r1 | literal | minor | 위 1~5번이 모두 이 공백에 있습니다 | 'fall into this gap'을 옮긴 표현이라 '공백에 있다'는 말이 한국어로 바로 읽히지 않습니다. | 위 1~5번은 모두 테스트가 다루지 않는 부분입니다 |
| `toss-use-funnel-bug` r2 | literal | minor | 효과가 다시 실행됩니다 | React의 effect를 낱말대로 '효과'로 옮겼습니다. 한국어 개발자는 보통 '이펙트'라고 하므로 잠깐 무슨 뜻인지 생각하게 됩니다. | 이펙트가 다시 실행됩니다 |
| `toss-use-funnel-bug` r2 | literal | minor | 위 1~4번이 모두 이 빈 곳에 있습니다 | 테스트 커버리지의 gap을 '빈 곳'으로 옮겨서 무엇이 비었다는 뜻인지 곧바로 와닿지 않습니다. | 위 1~4번은 모두 테스트가 다루지 않는 경우입니다 |
| `toss-use-funnel-bug` r2 | awkward | minor | React 17까지는 지원되지 않는 쪽이라 | '~쪽이라'라는 말이 문맥에 맞지 않아 문장을 다시 읽게 됩니다. | React 17까지는 서버 렌더링에서 지원되지 않으므로 |
| `toss-use-funnel-bug` r2 | awkward | minor | 확신하는 순서대로 적었습니다 | 무엇을 얼마나 확신하는지가 빠져 있어서 순서를 정한 기준이 조금 흐립니다. | 확신이 큰 순서대로 적었습니다 |
