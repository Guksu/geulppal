# 한국어 독자가 멈칫하는 곳

자동 생성 파일이다(`node scripts/eval/natural.mjs summary --out 2026-10-31-korean-natural-polish`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.

| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | literal | coined | noun_chain | symbol | translationese | awkward | 글에 없는 인용 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 32 | 2 | 73(5) | 36 | 1 | 4 | 0 | 4 | 28 | 0 |

표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.

## A

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-how-polish` r2 | literal | minor | 전체 파이프라인을 조율합니다 | orchestrate를 그대로 옮긴 말이라 코드가 하는 일을 설명하는 말로는 어색합니다. | 전체 처리 단계를 순서대로 호출합니다 |
| `g2pk-how-polish` r2 | awkward | minor | 내부용 함수라서 `g2pk/` 안에서 실행할 때만 동작합니다 | '내부용 함수'라는 이유와 'g2pk/ 안에서만 동작한다'는 결과가 이어지지 않아 다시 읽게 됩니다. | 내부용 함수이긴 하지만, 이 때문에 `g2pk/` 디렉터리 안에서 실행할 때만 제대로 동작합니다 |
| `hangul-js-failure-polish` r1 | literal | minor | 조용히 | 'silently'를 그대로 옮긴 말입니다. '에러 없이'라는 뜻이 바로 읽히지 않습니다. | 에러 없이 `''`을 반환합니다 / 에러 없이 `[]`나 `''`를 반환하고 넘어가고 |
| `hangul-js-failure-polish` r1 | awkward | minor | 프로토타입 키에 걸립니다 | '걸린다'가 무엇에 걸린다는 뜻인지 모호합니다. 프로토타입 키가 조회 결과에 섞여 들어온다는 뜻이 바로 읽히지 않습니다. | 프로토타입에서 물려받은 키(`constructor` 등)도 조회됩니다 |
| `hangul-js-failure-polish` r1 | awkward | minor | `grouped=true`나 `rangeSearch` 인덱스는 코드 포인트가 아니라 UTF-16 단위 기준입니다 | `grouped=true`와 '인덱스'를 같은 주어로 묶어서 `grouped=true`도 인덱스처럼 읽힙니다. 주어와 서술어가 맞지 않습니다. | `grouped=true`일 때의 묶음과 `rangeSearch`가 돌려주는 인덱스는 코드 포인트가 아니라 UTF-16 단위를 기준으로 합니다 |
| `hangul-js-failure-polish` r2 | literal | minor | 조용히 `''` 반환 | 'silently return'을 낱말대로 옮긴 표현입니다. 한국어 개발자는 '에러 없이 반환한다'고 씁니다. 표의 다른 칸에서도 '에러 없이 `[]` 반환'이라고 썼으므로 표현이 맞지 않습니다. | 에러 없이 `''` 반환 |
| `hangul-js-failure-polish` r2 | translationese | minor | 빈 문자열에 대한 `*All` 함수가 `true`를 반환합니다. | '빈 문자열에 대한'이 함수를 꾸미는 것처럼 읽혀서, 빈 문자열을 넣으면 true가 나온다는 뜻이 바로 들어오지 않습니다. | `*All` 함수에 빈 문자열을 넣으면 `true`를 반환합니다. |
| `hangul-js-failure-polish` r2 | awkward | minor | `grouped=true`나 `rangeSearch` 인덱스는 코드 포인트가 아니라 UTF-16 단위 기준입니다. | `grouped=true`라는 옵션 자체가 주어가 되어 '~기준입니다'와 맞지 않습니다. 무엇이 UTF-16 단위로 나뉘는지가 흐립니다. | `grouped=true`일 때의 결과와 `rangeSearch`가 돌려주는 인덱스는 코드 포인트가 아니라 UTF-16 단위로 계산됩니다. |
| `khaiii-plan-polish` r1 | noun_chain | minor | `KhaiiiApi`의 라이브러리 탐색 실패 시 `KhaiiiExcept`, `open` 실패(handle < 0), `close` 이후 `__del__`의 이중 호출 안전성도 확인합니다. | 명사구만 이어 놓아서, 확인할 것이 무엇이 일어나는지인지 바로 읽히지 않습니다. 특히 '`__del__`의 이중 호출 안전성'은 명사가 겹쳐 있어 다시 읽게 됩니다. | `KhaiiiApi`가 라이브러리를 찾지 못하면 `KhaiiiExcept`를 내는지, `open`이 실패할 때(handle < 0)는 어떻게 동작하는지, `close`를 부른 뒤 `__del__`이 다시 호출돼도 문제가 없는지도 확인합니다. |
| `khaiii-plan-polish` r1 | literal | minor | `ParseError` 경로 | 'error path'를 그대로 옮긴 말입니다. 한국어로는 '오류가 나는 경우'라고 하는 편이 자연스럽습니다. | `ParseError`가 나는 경우 |
| `khaiii-plan-polish` r2 | literal | minor | `ParseError` 경로 | 영어 'error path'를 낱말대로 옮긴 말입니다. 예외가 나는 경우라는 뜻은 통하지만, 한국어 개발자는 '경로'보다 '경우'나 '상황'이라고 씁니다. | `ParseError`가 나는 경우 |
| `kobert-transformers-plan-polish` r1 | noun_chain | minor | `-m "not network"` 기본 실행과 network 테스트 별도 실행으로 나눕니다 | '기본 실행', '별도 실행'처럼 명사구를 이어 붙여서, 무엇을 어떻게 나누는지 한 번에 읽히지 않습니다. | 기본으로는 `-m "not network"`로 실행하고, network 테스트는 따로 실행하도록 나눕니다 |
| `koelectra-how-polish` r1 | literal | minor | TSV의 컬럼 위치를 알고 있습니다 | 영어 'knows the column positions'를 그대로 옮겨 클래스를 사람처럼 표현했습니다. 한국어 개발 문서에서는 이렇게 쓰지 않습니다. | TSV에서 어느 컬럼을 읽을지 정해 둡니다 |
| `koelectra-how-polish` r1 | literal | minor | 모르는 키를 넘기면 | 'unknown key'를 낱말대로 옮겼습니다. 한국어 개발자는 보통 '정의되지 않은 키'나 '알 수 없는 키'라고 씁니다. '모르는 과제가 들어오면'도 같은 경우입니다. | 정의되지 않은 키를 넘기면 |
| `koelectra-how-polish` r2 | awkward | minor | 특히 `attrdict`는 최신 Python에서 문제가 알려져 있습니다. | '문제가 알려져 있다'는 주어와 서술어가 잘 맞지 않습니다. 한국어로는 '문제가 있는 것으로 알려져 있다'라고 써야 자연스럽습니다. | 특히 `attrdict`는 최신 Python에서 문제가 있는 것으로 알려져 있습니다. |
| `koelectra-how-polish` r2 | literal | minor | TSV 컬럼 위치를 알고 있습니다 | 영어 'knows the column positions'를 그대로 옮겨서 클래스가 무언가를 '알고 있다'고 썼습니다. 한국어 개발 문서에서는 이렇게 쓰지 않고 '정의한다'나 '지정한다'라고 씁니다. | TSV에서 읽을 컬럼 위치를 정의합니다 |
| `korpora-review-polish` r1 | awkward | minor | 위에서 본 기본 패턴이 이 파일들에도 반복될 가능성이 큽니다. | 글 첫머리라 아직 아무 패턴도 보여 주지 않았는데 '위에서 본'이라고 해서 무엇을 가리키는지 알 수 없습니다. | 아래에서 설명할 문제들이 이 파일들에도 똑같이 있을 가능성이 큽니다. |
| `korpora-review-polish` r1 | literal | minor | 맨몸 `except:`가 | 'bare except'를 낱말 그대로 옮긴 말입니다. 한국어 개발자는 '맨몸'이라고 하지 않습니다. | 예외 타입을 지정하지 않은 `except:`가 |
| `korpora-review-polish` r1 | literal | minor | 아무 일도 하지 않고 조용히 넘어갑니다. | 'silently'를 직역한 표현입니다. 뒤 문장과 겹치기도 합니다. | 아무 안내 없이 아무 일도 하지 않습니다. |
| `korpora-review-polish` r1 | awkward | minor | 1번은 바로 잡혔을 것입니다 | '바로잡다(고치다)'로 잘못 읽힐 수 있습니다. 실제 뜻은 '곧바로 발견됐다'입니다. | 1번 버그는 곧바로 드러났을 것입니다 |
| `korpora-review-polish` r2 | literal | minor | 맨몸 `except:` | bare except를 낱말대로 옮긴 말입니다. 한국어 개발자는 '맨몸'이라는 표현을 쓰지 않습니다. | 예외 타입을 지정하지 않은 `except:` |
| `korpora-review-polish` r2 | awkward | minor | 위에서 본 기본 패턴이 이 파일들에서도 반복될 가능성이 큽니다. | 이 문장 앞에는 아직 아무 항목도 나오지 않았습니다. 그래서 '위에서 본'이 무엇을 가리키는지 알 수 없습니다. | 아래에서 지적한 패턴이 이 파일들에도 반복될 가능성이 큽니다. |
| `open-korean-text-design-polish` r1 | awkward | major | 지식 이식이 쉽습니다. | '지식 이식'은 개발 문맥에서 쓰는 말이 아닙니다. 뒤 문장을 읽기 전에는 사전에 기여하기 쉽다는 뜻인지 알기 어렵습니다. | 사전을 고치고 보태기 쉽습니다. |
| `open-korean-text-design-polish` r1 | literal | minor | 구현 위생 문제가 보입니다. | code hygiene을 낱말 그대로 옮긴 말이라 한국어 개발자가 쓰는 표현이 아닙니다. | 구현에서 손볼 곳도 보입니다. |
| `open-korean-text-design-polish` r2 | literal | minor | 지식 이식이 쉽습니다. | knowledge transfer를 낱말대로 옮긴 말입니다. 사전 파일에 누구나 기여할 수 있다는 뜻이 바로 떠오르지 않습니다. | 사전을 고치기 쉽습니다. |
| `open-korean-text-design-polish` r2 | literal | minor | 구현 위생 문제가 보입니다. | code hygiene을 그대로 옮긴 표현입니다. 한국어 개발자는 '위생'이라는 말을 이런 뜻으로 쓰지 않습니다. | 구현이 깔끔하지 않은 곳이 있습니다. |
| `py-hanspell-failure-polish` r1 | literal | minor | 500자 초과 항목은 리스트 안에 조용히 `result=False`로 들어갑니다. | 'silently'를 낱말대로 옮긴 '조용히'입니다. 한국어로는 '오류 없이', '알림 없이'라고 쓰는 편이 더 자연스럽습니다. | 500자 초과 항목은 아무 오류 없이 `result=False`로 리스트에 들어갑니다. |
| `py-hanspell-failure-polish` r1 | literal | minor | 오류 경로를 검증하는 테스트는 하나도 없습니다. | 'error path'를 그대로 옮긴 말입니다. 한국어로는 '오류 상황'이나 '실패하는 경우'라고 더 자주 씁니다. | 오류 상황을 검증하는 테스트는 하나도 없습니다. |
| `py-hanspell-failure-polish` r1 | awkward | minor | `html.unescape`와 `<br>` 처리를 `words` 경로에도 일관되게 적용합니다. | '`words` 경로'라고 하면 파일 경로로 읽힐 수 있습니다. `words`를 만드는 코드를 가리킨다는 점이 바로 드러나지 않습니다. | `html.unescape`와 `<br>` 처리를 `words`를 만드는 코드에도 똑같이 적용합니다. |
| `py-hanspell-failure-polish` r2 | literal | minor | 리스트 안에 조용히 `result=False`로 들어갑니다 | 영어 'silently'를 그대로 옮겨서 '조용히'가 '오류 없이', '알리지 않고'라는 뜻으로 바로 읽히지 않습니다. | 리스트 안에 아무 오류 없이 `result=False`로 들어갑니다 |
| `py-hanspell-failure-polish` r2 | awkward | minor | 닫히지 않은 `<br>` 외의 태그가 있으면 | '닫히지 않은'이 `<br>`을 꾸미는지, 그 밖의 태그를 꾸미는지 헷갈려서 다시 읽게 됩니다. | `<br>`이 아닌 태그가 닫히지 않은 채 있으면 |
| `toss-date-failure-polish` r1 | literal | minor | `getDateDistance`가 `Invalid Date`를 조용히 넘깁니다 | 영어 'silently pass/ignore'를 낱말대로 옮긴 표현입니다. 뜻은 통하지만 한국어 개발자가 평소에 쓰는 말투는 아닙니다. | `getDateDistance`는 `Invalid Date`가 들어와도 에러 없이 그대로 처리합니다 |
| `toss-date-failure-polish` r2 | literal | minor | 조용히 넘어갑니다 | 영어 'silently pass/ignore'를 낱말대로 옮긴 표현이라, 한국어 개발자는 '에러 없이 넘어간다'처럼 씁니다. | 에러 없이 넘어갑니다 |
| `toss-hangul-failure-polish` r1 | literal | minor | 조용히 틀리는 | 영어 'silently wrong'을 낱말대로 옮긴 말이라 한국어 문장으로는 어색합니다. | 에러 없이 잘못된 결과가 나오는 / 결과가 티 나지 않게 틀어지는 |
| `toss-hangul-failure-polish` r1 | noun_chain | minor | 점진적 입력 자동완성 | 명사를 이어 붙인 구라서 '입력하는 도중에 결과를 보여 주는 자동완성'이라는 뜻이 바로 읽히지 않습니다. | 글자를 입력하는 도중에 후보를 보여 주는 자동완성 |
| `toss-hangul-failure-polish` r2 | literal | minor | 조용히 틀리는 | 영어 'silently wrong'을 낱말대로 옮긴 표현입니다. 한국어 개발자는 보통 '오류 없이 잘못된 결과를 낸다'처럼 씁니다. | 에러 없이 잘못된 결과가 나오는 경우 / 검색 결과가 잘못 나옵니다 |
| `toss-hangul-failure-polish` r2 | awkward | minor | JS 호출자나 `any`로 들어온 값이 있으면 | 'JS 호출자'와 '`any`로 들어온 값'을 나란히 놓아서 '호출자가 있으면'으로도 읽힙니다. 주어 구조가 어긋나 문장을 다시 읽게 됩니다. | JS에서 호출하거나 `any` 타입으로 값이 들어오면 |
| `toss-hangul-failure-polish` r2 | noun_chain | minor | 점진적 입력 자동완성 | 명사 세 개가 이어져 있어서 무엇이 무엇을 꾸미는지 바로 읽히지 않습니다. | 글자를 입력하는 도중에 결과를 보여 주는 자동완성 |
| `toss-ky-how-polish` r1 | awkward | major | 이 패키지는 `toss/slash` 모노레포 안에서만 단독으로 빌드와 타입체크를 할 수 있습니다 | '모노레포 안에서만'과 '단독으로'가 서로 반대되는 말이라서, 단독으로 빌드할 수 있다는 건지 없다는 건지 헷갈립니다. | 이 패키지만 따로 떼어서는 빌드하거나 타입체크할 수 없고, `toss/slash` 모노레포 안에서만 할 수 있습니다 |
| `toss-ky-how-polish` r2 | awkward | major | 이 패키지는 `toss/slash` 모노레포 안에서만 단독으로 빌드와 타입체크를 할 수 있습니다 | '안에서만'과 '단독으로'가 서로 반대되는 뜻이라, 모노레포 밖에서 단독으로 빌드할 수 없다는 뜻인지 바로 알기 어렵습니다. | 이 패키지는 단독으로는 빌드하거나 타입체크할 수 없고, `toss/slash` 모노레포 안에서만 할 수 있습니다 |
| `toss-ky-how-polish` r2 | awkward | minor | 하지만 이 패키지는 top-level `await`을 사용해서 CJS로 바로 변환할 수 없습니다. | 앞 문단에서 '이 패키지'는 `@toss/ky`를 가리켰는데, 여기서는 `ky-universal`을 가리킵니다. 독자가 어느 패키지 이야기인지 헷갈릴 수 있습니다. | 하지만 `ky-universal`은 top-level `await`을 사용해서 CJS로 바로 변환할 수 없습니다. |
| `toss-scroll-animation-plan-polish` r1 | awkward | major | 아래쪽 테스트는 위쪽 동작을 믿고 작성할 수 있습니다. | '아래쪽/위쪽'이 문서에서의 위치인지 의존 계층인지 모호합니다. 뒤 단계 테스트가 앞 단계의 동작을 전제한다는 뜻을 바로 알기 어렵습니다. | 뒤 단계 테스트는 앞 단계에서 검증한 동작을 전제로 작성할 수 있습니다. |
| `toss-scroll-animation-plan-polish` r1 | awkward | minor | 정상적으로 기동하는지 | '기동'은 일본어식 표현이라 테스트 실행을 말할 때는 잘 쓰지 않습니다. | 정상적으로 실행되는지 |
| `toss-scroll-animation-plan-polish` r1 | awkward | minor | 빈 분기를 확인합니다 | '빈 분기'는 내용이 없는 분기로 읽힐 수 있습니다. 여기서는 테스트가 거치지 않은 분기를 말합니다. | 테스트가 닿지 않은 분기를 확인합니다 |
| `toss-scroll-animation-plan-polish` r1 | literal | minor | 에러 경로로 갑니다 | 'error path'를 낱말대로 옮긴 표현이라 한국어로는 어색합니다. | 에러 처리 분기로 빠집니다 |
| `toss-scroll-animation-plan-polish` r1 | translationese | minor | 선호가 있으신가요? | 'Do you have a preference'를 직역한 구조입니다. | 원하시는 방식이 있으신가요? |
| `toss-scroll-animation-plan-polish` r2 | awkward | minor | 아래쪽 테스트는 위쪽 동작을 믿고 작성할 수 있습니다. | '아래쪽'과 '위쪽'이 문서 안의 위치를 말하는지 의존 관계를 말하는지 바로 알기 어렵습니다. '위쪽 동작을 믿는다'는 표현도 어색합니다. | 뒤 단계 테스트는 앞 단계에서 검증한 동작을 전제로 작성할 수 있습니다. |
| `toss-scroll-animation-plan-polish` r2 | literal | minor | `px` 문자열은 에러 경로로 갑니다 | 영어 'error path'를 그대로 옮긴 표현입니다. | `px` 문자열은 에러 처리 분기로 빠집니다 |
| `toss-scroll-animation-plan-polish` r2 | awkward | minor | 비어 있는 분기를 확인합니다 | 커버리지 맥락에서는 '비어 있는'이 아니라 '테스트되지 않은' 분기라고 해야 뜻이 바로 통합니다. | 테스트가 닿지 않은 분기를 확인합니다 |
| `toss-scroll-animation-plan-polish` r2 | translationese | minor | 선호가 있으신가요? | 'Do you have a preference'를 옮긴 듯한 구조입니다. | 원하시는 방식이 있으신가요? |
| `toss-sentry-review-polish` r1 | literal | minor | 조용히 꺼지는 것은 가장 위험한 실패 방식입니다 | 'fail silently'와 'failure mode'를 낱말대로 옮긴 표현이라 한국어로는 어색합니다. | 아무 알림 없이 꺼지는 것이 가장 위험한 경우입니다 |
| `toss-sentry-review-polish` r1 | literal | minor | 재생하는 방식 | 'replay'를 그대로 옮겼습니다. 큐에 쌓아 둔 호출에 '재생'이라는 말은 잘 쓰지 않습니다. | 다시 실행하는 방식 |
| `toss-sentry-review-polish` r1 | literal | minor | 커버리지가 매우 얇습니다 | 'thin coverage'를 그대로 옮겼습니다. 한국어로는 커버리지가 '부족하다'고 말합니다. | 테스트 커버리지가 매우 부족합니다 |
| `toss-sentry-review-polish` r1 | literal | minor | 소비자는 | 'consumer'를 옮긴 말입니다. 한국어 개발자는 패키지를 '사용하는 쪽'이라고 부르는 경우가 많습니다. | 패키지를 사용하는 쪽은 |
| `toss-sentry-review-polish` r1 | awkward | minor | 큐잉과 경고 1회화 | '1회화'는 억지로 만든 명사형이라 어색하고, 무엇을 하겠다는 뜻인지 바로 읽히지 않습니다. | 로드 전 호출을 큐에 쌓고 경고를 한 번만 출력하도록 |
| `toss-sentry-review-polish` r2 | literal | minor | 에러 모니터링 도구가 조용히 꺼지는 것은 가장 위험한 실패 방식입니다 | 'fail silently'와 'failure mode'를 낱말대로 옮겨서 영어 원문이 먼저 떠오릅니다. | 에러 모니터링 도구가 아무 알림 없이 꺼지는 것이 가장 위험합니다 |
| `toss-sentry-review-polish` r2 | literal | minor | 커버리지가 매우 얇습니다 | 'thin coverage'를 그대로 옮긴 말입니다. 한국어로는 커버리지가 '낮다'거나 '부족하다'고 씁니다. | 테스트 커버리지가 매우 낮습니다 |
| `toss-sentry-review-polish` r2 | coined | minor | 경고 1회화 | '경고를 한 번만 출력하기'를 글쓴이가 줄여 만든 명사여서 바로 읽히지 않습니다. | 경고를 한 번만 출력하도록 수정 |
| `toss-sentry-review-polish` r2 | awkward | minor | `getSentry()`의 결과만 막아 줍니다 | 옵셔널 체이닝이 무엇을 '막는지' 분명하지 않아 다시 읽게 됩니다. | `getSentry()`의 결과가 없을 때만 대비합니다 |
| `toss-storage-design-polish` r1 | literal | minor | 폴백 때문에 조용히 실패합니다. | 영어 'fail silently'를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '오류 없이 실패한다'나 '실패해도 알 수 없다'고 씁니다. | 폴백 때문에 실패해도 드러나지 않습니다. |
| `toss-storage-design-polish` r2 | literal | minor | 폴백 때문에 조용히 실패합니다. | 영어 'fail silently'를 낱말대로 옮긴 표현이라, 한국어 개발자가 평소에 쓰는 말이 아닙니다. | 폴백 때문에 실패해도 알 수 없습니다. |
| `toss-storage-design-polish` r2 | awkward | minor | 모듈 로드 시점에 결정됩니다. | 무엇이 결정되는지 주어가 빠져 있어, 다음 문장까지 읽어야 뜻을 알 수 있습니다. | 어떤 저장소를 쓸지가 모듈 로드 시점에 결정됩니다. |
| `toss-use-funnel-design-polish` r1 | literal | minor | 진실의 원천이 둘 | 'source of truth'를 낱말대로 옮긴 말이라 한국어 문장으로는 어색합니다. 바로 뒤 문장 덕분에 뜻은 짐작할 수 있습니다. | 상태를 보관하는 곳이 둘 |
| `toss-use-funnel-design-polish` r1 | awkward | minor | 잘못된 설정은 `assert`로 일찍, 명확한 메시지와 함께 실패합니다. | '설정은 … 실패합니다'에서 주어와 서술어가 맞지 않습니다. 'fail fast'를 그대로 옮긴 문장 구조이기도 합니다. | 설정이 잘못되면 `assert`가 명확한 메시지와 함께 바로 오류를 냅니다. |
| `toss-use-funnel-design-polish` r2 | literal | major | 진실의 원천이 둘 | 'source of truth'를 낱말대로 옮긴 말이라 영어 원문을 떠올려야 뜻이 잡힙니다. | 상태를 보관하는 곳이 두 군데 |
| `toss-use-funnel-design-polish` r2 | translationese | minor | 잘못된 설정은 `assert`로 일찍, 명확한 메시지와 함께 실패합니다. | 'fail early with a clear message' 구조를 그대로 따랐습니다. '설정이 실패한다'는 주어와 서술어도 맞지 않습니다. | 설정이 잘못되면 `assert`가 초기에 명확한 오류 메시지를 냅니다. |
| `toss-use-funnel-design-polish` r2 | awkward | minor | 함수형 업데이트는 `next(state)`와 React가 넘기는 `prev`의 두 경로로 호출될 수 있어 | '두 경로로 호출된다'가 무엇이 어떤 값으로 호출된다는 뜻인지 바로 읽히지 않아 다시 읽게 됩니다. | 함수형 업데이트 함수가 `next(state)`로 호출될 때도 있고 React가 넘기는 `prev`로 호출될 때도 있어 |
| `toss-use-funnel-design-polish` r2 | awkward | minor | 취약점이 있습니다 | '취약점'은 보통 보안 취약점을 뜻합니다. 여기서는 설계상 약점을 말하는 것이라 문맥에 맞지 않습니다. | 약점이 있습니다 |
| `toss-use-query-param-review-polish` r1 | awkward | minor | throw가 그대로 터집니다 | 동작 이름인 throw를 주어로 써서 '터진다'와 맞지 않습니다. 실제로 터지는 것은 throw된 promise나 오류입니다. | throw된 promise를 받아 줄 곳이 없어 오류가 납니다 |
| `toss-use-query-param-review-polish` r1 | literal | minor | 테스트 간에 상태가 새어 나갈 수 있습니다 | 영어 'leak between tests'를 낱말대로 옮긴 표현이어서 약간 어색합니다. | 앞 테스트의 mock 상태가 다음 테스트에 남을 수 있습니다 |
| `toss-use-query-param-review-polish` r2 | literal | minor | 같은 거짓말을 합니다 | 영어의 'the type lies'를 낱말대로 옮긴 표현입니다. 한국어 개발자는 타입이 '거짓말을 한다'고 잘 말하지 않습니다. | 같은 문제가 있습니다(실제 값과 타입이 다릅니다) |
| `toss-use-query-param-review-polish` r2 | literal | minor | 테스트 간에 상태가 새어 나갈 수 있습니다 | 'leak between tests'를 그대로 옮긴 표현입니다. 한국어에서는 상태가 '남는다'거나 '영향을 준다'고 씁니다. | 이전 테스트의 mock 상태가 다음 테스트에 남을 수 있습니다 |
| `toss-use-query-param-review-polish` r2 | awkward | minor | throw가 그대로 터집니다 | 'throw'와 '터지다'가 어울리지 않습니다. 무엇이 어디까지 전파되는지도 흐릿합니다. | 던진 promise를 받아 줄 곳이 없어 에러가 납니다 |
