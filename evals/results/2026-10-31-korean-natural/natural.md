# 한국어 독자가 멈칫하는 곳

자동 생성 파일이다(`node scripts/eval/natural.mjs summary --out 2026-10-31-korean-natural`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.

| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | literal | coined | noun_chain | symbol | translationese | awkward | 글에 없는 인용 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 32 | 3 | 74(3) | 36 | 2 | 4 | 1 | 4 | 27 | 0 |
| I | 32 | 1 | 68(1) | 33 | 0 | 1 | 0 | 3 | 31 | 0 |
| N1 | 32 | 6 | 50(0) | 28 | 3 | 1 | 0 | 1 | 17 | 0 |

표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.

## A

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-how` r1 | awkward | minor | 내부용 함수라서 `g2pk/` 안에서 실행할 때만 동작합니다 | '내부용 함수'라는 사실이 '현재 디렉터리가 g2pk/일 때만 동작한다'의 이유처럼 이어져서 인과 관계가 어색합니다. 실제 원인은 상대 경로로 파일을 여는 것입니다. | 상대 경로로 열기 때문에 `g2pk/` 안에서 실행할 때만 동작합니다. 내부용 함수라 지금은 문제가 드러나지 않을 수 있습니다 |
| `hangul-js-failure` r1 | literal | minor | 조용히 `''` 반환 | 'silently returns'를 글자대로 옮긴 말이라 한국어 문장에서는 어색합니다. | 에러 없이 `''` 반환 |
| `hangul-js-failure` r1 | awkward | minor | 수정은 정규식 특수문자를 이스케이프하고, `indexOf` 루프로 바꾸는 편이 안전합니다. | '수정은'이라는 주어가 '~하는 편이 안전합니다'라는 서술어와 맞지 않습니다. | 정규식 특수문자를 이스케이프하고 `indexOf` 루프로 바꾸는 편이 안전합니다. |
| `hangul-js-failure` r1 | awkward | minor | 프로토타입 키에 걸립니다 | '걸린다'만으로는 무엇이 잘못되는지 바로 알기 어렵습니다. 프로토타입 키가 해시 조회에 잡힌다는 뜻이 드러나지 않습니다. | 프로토타입에서 물려받은 키도 조회에 잡힙니다 |
| `hangul-js-failure` r1 | awkward | minor | 빈 문자열의 `*All` 함수가 `true`를 반환합니다. | '빈 문자열의 함수'로 읽혀서 빈 문자열을 넣었을 때라는 뜻이 바로 들어오지 않습니다. | `*All` 함수는 빈 문자열을 받으면 `true`를 반환합니다. |
| `hangul-js-failure` r2 | literal | minor | 조용히 빈 값을 돌려줍니다 | 'silently'를 그대로 옮긴 표현입니다. 뜻은 통하지만 한국어로는 '에러 없이'나 '아무 경고 없이'라고 쓰는 편이 자연스럽습니다. 표 칸의 '조용히 잘못된 결과가 나옵니다'와 '깨진 결과를 조용히 만들 수 있는'에도 같은 표현이 나옵니다. | 에러 없이 빈 값을 돌려줍니다 |
| `hangul-js-failure` r2 | literal | minor | 공개 API 경계에서 | 'API boundary'를 낱말대로 옮긴 말이라 '경계'가 무엇을 가리키는지 잠깐 생각하게 됩니다. | 외부에 공개된 함수의 입구에서 |
| `khaiii-plan` r1 | awkward | minor | 이 디렉터리는 전체 저장소의 일부(`src/main/python/khaiii`)만 있습니다. | 주어 '이 디렉터리는'과 서술어 '~만 있습니다'가 맞지 않습니다. 디렉터리에 무엇이 들어 있다는 뜻인지, 디렉터리 자체가 저장소의 일부라는 뜻인지 다시 읽게 됩니다. | 이 디렉터리에는 전체 저장소 중 일부(`src/main/python/khaiii`)만 있습니다. |
| `khaiii-plan` r1 | literal | minor | 회귀 기준 | regression baseline을 그대로 옮긴 말이라 무엇을 확인할 수 없다는 건지 바로 와닿지 않습니다. | git 저장소가 아니라서 변경 이력도, 회귀 테스트에서 비교할 이전 동작도 확인할 수 없습니다. |
| `khaiii-plan` r1 | noun_chain | minor | `close` 이후 `__del__`의 이중 호출 안전성도 확인합니다 | '이중 호출 안전성'처럼 명사를 이어 붙여서 무엇이 두 번 호출되는지, 무엇이 안전해야 하는지 풀어서 읽어야 합니다. | `close`를 호출한 뒤 `__del__`에서 다시 닫아도 문제가 없는지도 확인합니다 |
| `khaiii-plan` r2 | awkward | minor | `make`로 만든 패치를 `apply`에 다시 적용했을 때 원본에서 수정본이 복원되는지 보는 왕복 테스트 | 원본에 패치를 적용해 수정본을 만드는 일에 '복원'을 썼고, 'apply에 다시 적용'은 같은 말을 되풀이해서 무엇을 확인하는지 다시 읽게 됩니다. | `make`로 만든 패치를 원본에 `apply`하면 수정본과 똑같아지는지 확인하는 왕복 테스트 |
| `khaiii-plan` r2 | noun_chain | minor | 비트 합성 값 | 명사 세 개가 이어져 있어 무엇을 어떻게 합성한 값인지 바로 알기 어렵습니다. | 문자와 태그를 비트로 합친 결과값 |
| `kobert-transformers-plan` r2 | literal | minor | 에러를 로그만 남기고 `None`을 반환하는 경로 | code path를 그대로 옮긴 '경로'입니다. 디렉터리와 저장 위치를 다루는 문맥이라 파일 경로로 잘못 읽힐 수 있습니다. | 에러를 로그로만 남기고 `None`을 반환하는 경우 |
| `kobert-transformers-plan` r2 | literal | minor | 단언을 추가합니다 | assertion을 '단언'으로 옮겼습니다. 한국어 개발자는 보통 assert나 검증이라고 말합니다. | assert(검증)를 추가합니다 |
| `koelectra-how` r2 | awkward | minor | 태스크 7종과 모델 10종이 조합마다 JSON 하나씩이라 총 80개가 있습니다. | '태스크 7종과 모델 10종이'가 주어인데 '조합마다 JSON 하나씩이라'와 맞물리지 않아서, 무엇이 무엇마다 하나씩인지 다시 읽게 됩니다. | 태스크 7종과 모델 10종의 조합마다 JSON이 하나씩 있어서 총 80개입니다. |
| `koelectra-how` r2 | awkward | minor | 전체(131개 파일 중)를 읽은 것 | '전체'와 '131개 파일 중'이 나란히 있어서 131개 파일을 모두 읽었다는 뜻으로 잘못 읽힐 수 있습니다. 실제 뜻은 파일 131개 가운데 아래 파일들은 처음부터 끝까지 읽었다는 것입니다. | 전체 131개 파일 가운데 끝까지 읽은 것 |
| `korpora-review` r1 | awkward | minor | 위의 기본 패턴이 거기에도 반복될 가능성이 큽니다. | 이 문장은 리뷰 항목이 나오기 전에 있어서 '위'에 가리킬 내용이 없습니다. '기본 패턴'이 무엇인지도 설명하지 않아 독자가 무엇을 말하는지 알 수 없습니다. | 아래에서 지적한 문제(다운로드·해제 로직, 파싱 오류 등)가 이 파일들에도 똑같이 있을 가능성이 큽니다. |
| `korpora-review` r1 | literal | minor | 맨몸 `except:`가 모든 오류를 삼키고 | bare except를 낱말대로 옮긴 말입니다. 한국어 개발자는 '맨몸'이라는 말을 쓰지 않습니다. | 예외 타입을 지정하지 않은 `except:`가 모든 오류를 삼키고 |
| `korpora-review` r1 | literal | minor | 조용히 아무 일도 하지 않습니다. | 'silently do nothing'을 그대로 옮긴 표현입니다. 실제로 하려는 말은 '알림 없이 넘어간다'입니다. | 아무 메시지 없이 그냥 넘어갑니다. |
| `korpora-review` r1 | awkward | minor | `Korpora.load('modu_news', force_download=True)`는 `NotImplementedError`입니다. | 호출이 예외 그 자체라고 말하는 문장이라 주어와 서술어가 맞지 않습니다. | `Korpora.load('modu_news', force_download=True)`를 호출하면 `NotImplementedError`가 납니다. |
| `korpora-review` r2 | literal | minor | 데이터가 조용히 줄어듭니다 | 영어 'silently'를 낱말대로 옮겼습니다. 한국어로는 '알림 없이', '모르는 사이에'라고 씁니다. | 데이터가 알림 없이 줄어듭니다 |
| `korpora-review` r2 | literal | minor | 조용히 걸러내서 | 'silently filter'를 직역한 표현입니다. | 아무 안내 없이 걸러내서 |
| `korpora-review` r2 | literal | minor | 베어 `except:` | 'bare'를 음차한 말이라서 한국어 글 안에서 뜻이 바로 들어오지 않습니다. | 예외 타입을 지정하지 않은 `except:` |
| `korpora-review` r2 | coined | minor | 비경량 모드 | 어떤 모드를 말하는지 설명 없이 만든 이름처럼 보입니다. 코드의 옵션 이름과 어떻게 이어지는지 드러나지 않습니다. | 경량(lightweight) 옵션을 끈 경우 |
| `korpora-review` r2 | awkward | minor | 네트워크에 가지 않고 | '네트워크에 가다'는 한국어로 어색한 결합입니다. | 네트워크 요청 없이 |
| `open-korean-text-design` r1 | awkward | major | 지식 이식이 쉽습니다. | '지식 이식'이 무슨 뜻인지 바로 와닿지 않습니다. 뒤에 오는 설명(사전이 텍스트 파일이라 누구나 기여할 수 있다)과도 잘 이어지지 않아서, 독자가 영어 원문을 짐작해 봐야 합니다. | 사전을 고치고 보태기 쉽습니다. |
| `open-korean-text-design` r1 | literal | minor | 구현 위생 문제가 보입니다. | 영어 'code hygiene'을 낱말대로 옮긴 말입니다. 한국어 개발자는 이 말을 '위생'이라고 하지 않습니다. | 구현상 손볼 곳이 보입니다. |
| `open-korean-text-design` r2 | awkward | major | 정규화가 사전 휘발성에 의존 | '사전 휘발성'이 무슨 뜻인지 알 수 없습니다. 이어지는 설명(`sliding` 후 `replaceAll`을 쓰는 단순 방식)과도 이어지지 않아 독자가 뜻을 짐작하지 못합니다. | 오타 교정이 단순 문자열 치환에 의존 |
| `open-korean-text-design` r2 | literal | minor | 구어체 내성 | robustness를 '내성'으로 옮긴 말입니다. 한국어 개발자는 텍스트 처리 맥락에서 '내성'이라고 쓰지 않습니다. | 구어체 처리 능력 |
| `open-korean-text-design` r2 | literal | minor | 테스트 간 상태가 새어 나갈 수 있습니다 | state leak을 낱말대로 옮긴 표현이라 어색합니다. | 한 테스트에서 바꾼 상태가 다른 테스트에 영향을 줄 수 있습니다 |
| `py-hanspell-failure` r1 | literal | minor | 조용히 `result=False`로 들어갑니다 | 영어 'silently'를 낱말대로 옮긴 말입니다. 예외나 경고 없이 실패값이 들어간다는 뜻인데 한국어로는 바로 와닿지 않습니다. | 예외 없이 `result=False`로 들어갑니다 |
| `py-hanspell-failure` r1 | awkward | minor | 닫히지 않은 `<br>` 외의 태그가 있으면 | '닫히지 않은'이 `<br>`에 걸리는지 '태그'에 걸리는지 바로 읽히지 않아서, 독자가 문장을 다시 읽게 됩니다. | `<br>` 말고도 닫는 태그가 없는 태그가 있으면 |
| `py-hanspell-failure` r1 | awkward | minor | `words` 경로에도 | '경로'가 파일 경로로 읽힐 수 있습니다. 실제 뜻은 `words`를 만드는 코드입니다. | `words`를 만드는 코드에도 |
| `py-hanspell-failure` r2 | literal | minor | 조용히 실패 값을 돌려줍니다 | 영어 'fail silently'의 'silently'를 낱말대로 옮긴 표현입니다. 한국어로는 '예외나 알림 없이'라고 씁니다. 뒤에 나오는 '조용히 잘못 잘리고'도 같은 경우입니다. | 예외 없이 실패 값을 돌려줍니다 |
| `toss-date-failure` r1 | literal | minor | 조용히 0으로 바꿉니다 | 영어 'silently'를 낱말대로 옮긴 표현입니다. 한국어로는 '에러 없이', '아무 표시 없이'라고 씁니다. | 에러 없이 0으로 바꿉니다 |
| `toss-date-failure` r1 | literal | minor | 조용히 넘어가고 | 이것도 'silently'를 낱말대로 옮긴 말이라 한국어 개발자 글에서는 어색하게 읽힙니다. | 에러 없이 넘어가고 |
| `toss-date-failure` r2 | literal | minor | 조용히 `false`를 반환합니다 | 영어 'silently return/fail'을 낱말대로 옮긴 표현입니다. 한국어 개발자는 '에러 없이', '아무 경고 없이'라고 씁니다. 3번 항목 제목 '조용히 통과시킵니다'도 같은 경우입니다. | 에러 없이 `false`를 반환합니다 / Invalid Date를 에러 없이 통과시킵니다 |
| `toss-date-failure` r2 | awkward | minor | 옵션 처리가 얕습니다 | '얕다'를 처리 방식에 쓰면 무엇이 부족하다는 뜻인지 바로 읽히지 않습니다. 'shallow'를 떠올리게 합니다. | 옵션 처리가 허술합니다 |
| `toss-hangul-failure` r1 | literal | minor | 에러 없이 조용히 틀리는 경우 | 영어 'fail silently'를 낱말대로 옮긴 표현입니다. 뜻은 통하지만 한국어 개발자가 '조용히 틀린다'라고 말하지는 않습니다. 본문의 '검색 결과가 조용히 틀립니다'도 같은 표현입니다. | 에러 없이 틀린 결과가 나오는 경우 / 검색 결과가 오류 없이 틀리게 나옵니다 |
| `toss-hangul-failure` r1 | noun_chain | minor | 점진적 입력 자동완성 | 명사를 이어 붙여서 무엇이 점진적인지, 입력과 자동완성이 어떤 관계인지 바로 읽히지 않습니다. | 글자를 입력하는 도중에 결과를 보여 주는 자동완성 |
| `toss-hangul-failure` r1 | literal | minor | 이 부분을 지켜 주는 테스트 | 영어 'guard'를 옮긴 듯한 표현이라 테스트가 무엇을 하는지 분명하지 않습니다. | 이 순서를 검증하는 테스트 |
| `toss-hangul-failure` r2 | literal | minor | 조용히 틀린 결과가 나오거나 | 영어 'silently wrong/fail silently'를 그대로 옮긴 표현이다. 뜻은 통하지만 한국어로는 '에러 없이'나 '티 나지 않게'가 더 자연스럽다. 소제목 '에러 없이 조용히 틀리는 곳'과 '분해 결과가 조용히 틀어집니다'에서도 같은 식으로 쓰였다. | 에러 없이 틀린 결과가 나오거나 |
| `toss-ky-how` r1 | awkward | minor | 이 패키지는 `toss/slash` 모노레포 안에서만 단독으로 빌드와 타입체크가 됩니다 | '모노레포 안에서만'과 '단독으로'가 한 문장에서 부딪칩니다. 그래서 단독으로 빌드할 수 있다는 말인지 없다는 말인지 다시 읽게 됩니다. | 이 패키지만 따로 떼어서는 빌드와 타입체크를 할 수 없고, `toss/slash` 모노레포 안에서만 할 수 있습니다 |
| `toss-ky-how` r1 | translationese | minor | 이 패키지는 `devDependencies`에 그것을 명시하지 않았습니다 | 영어 대명사 'it'을 그대로 옮긴 '그것'이라 문장이 무거워집니다. | 이 패키지의 `devDependencies`에는 이 의존성이 없습니다 |
| `toss-ky-how` r1 | translationese | minor | 브라우저와 React Native는 이미 `fetch` 등을 갖고 있습니다 | 'have'를 옮긴 '갖고 있다'입니다. 한국어 개발자라면 보통 '제공한다'나 '내장돼 있다'라고 씁니다. | 브라우저와 React Native에는 이미 `fetch` 등이 내장돼 있습니다 |
| `toss-ky-how` r2 | awkward | minor | 저장소 일부만 보입니다. | 누구에게 보인다는 것인지 주체가 빠져 있습니다. 글쓴이가 작업할 때 접근한 범위를 말하는 것인데, 처음 읽는 팀원은 바로 알아듣기 어렵습니다. | 이 디렉터리는 모노레포의 일부만 담고 있습니다. |
| `toss-scroll-animation-plan` r1 | awkward | minor | 빈 분기를 확인합니다 | '빈 분기'는 테스트가 닿지 않은 분기라는 뜻이 바로 읽히지 않고, 내용이 비어 있는 분기로 오해할 수 있습니다. | 테스트되지 않은 분기를 확인합니다 |
| `toss-scroll-animation-plan` r2 | symbol | minor | 스크롤 → 갱신 흐름을 end-to-end로 한 번 검증합니다 | 설명 문장에서 화살표가 서술어를 대신해, 무엇이 무엇을 일으키는지 문장으로 이어지지 않습니다. | 스크롤하면 값이 갱신되는 흐름을 처음부터 끝까지 한 번 검증합니다 |
| `toss-scroll-animation-plan` r2 | awkward | minor | 이 순서는 현재 구현에서 `...style`이 뒤에 있기 때문입니다. | 주어 '이 순서는'과 서술어 '~때문입니다'가 맞지 않습니다. | 현재 구현에서 `...style`을 뒤에 펼치기 때문입니다. |
| `toss-scroll-animation-plan` r2 | awkward | minor | JSDoc은 `200px` 형식을 지원한다고 적혀 있습니다. | 'JSDoc은 ~ 적혀 있습니다'에서는 주어와 서술어가 맞지 않습니다. 'JSDoc에는'이라고 써야 자연스럽습니다. | JSDoc에는 `200px` 형식을 지원한다고 적혀 있습니다. |
| `toss-sentry-review` r1 | literal | minor | 에러 모니터링 도구가 조용히 꺼지는 것이 가장 위험한 실패 방식입니다 | 'fail silently'와 'failure mode'를 낱말대로 옮겨서 영어 원문을 떠올려야 자연스럽게 읽힙니다. 같은 표현이 '에러가 조용히 사라집니다'에도 나옵니다. | 에러 모니터링 도구가 아무 알림 없이 꺼지는 것이 가장 위험한 경우입니다 |
| `toss-sentry-review` r1 | literal | minor | `window.Sentry`가 생기면 재생하는 방식 | 'replay'를 '재생'으로 옮겼는데, 호출을 다시 실행한다는 뜻이 바로 읽히지 않습니다. | `window.Sentry`가 생기면 쌓아 둔 호출을 다시 실행하는 방식 |
| `toss-sentry-review` r1 | literal | minor | 커버리지가 매우 얇습니다 | 'thin coverage'를 그대로 옮긴 표현입니다. 한국어로는 커버리지가 '얇다'고 하지 않습니다. | 테스트 커버리지가 매우 부족합니다 |
| `toss-sentry-review` r1 | coined | minor | 경고 1회화 | '1회화'는 글쓴이가 만든 명사형이라 뜻이 바로 들어오지 않습니다. | 경고를 한 번만 출력하도록 변경 |
| `toss-sentry-review` r2 | literal | minor | Sentry가 없을 때 호출이 조용히 사라집니다 | 영어 'silently dropped'를 낱말 그대로 옮긴 표현입니다. 한국어 개발자라면 '아무 경고 없이'처럼 씁니다. | Sentry가 없으면 호출이 아무 경고 없이 무시됩니다 |
| `toss-sentry-review` r2 | awkward | minor | 번들 구성이 부적절합니다 | 이 항목은 의존성, exports 같은 package.json 설정을 다룹니다. 그래서 '번들 구성'이라는 제목은 내용과 맞지 않습니다. | 패키지 설정(package.json)에 문제가 있습니다 |
| `toss-storage-design` r1 | literal | minor | 폴백 때문에 조용히 실패합니다. | 영어 'fail silently'를 낱말대로 옮긴 말입니다. 뜻은 짐작되지만 한국어 개발자가 평소에 쓰는 표현은 아닙니다. | 폴백 때문에 실패해도 아무 신호가 없습니다. |
| `toss-storage-design` r1 | awkward | minor | 결과 타입이 유니온으로 퍼집니다 | distributive 동작을 '퍼진다'로 옮겨 어떤 동작인지 바로 떠오르지 않습니다. 앞에서 '분배 조건부 타입'이라고 했으니 '분배'로 맞추는 편이 자연스럽습니다. | 결과 타입도 유니온 멤버마다 나뉘어 유니온이 됩니다 |
| `toss-storage-design` r2 | literal | minor | `MemoStorage` 폴백은 조용히 데이터를 잃습니다. | 영어 'silently lose data'를 낱말대로 옮긴 표현이라 한국어로는 어색합니다. | `MemoStorage`로 폴백되면 데이터가 사라져도 알 수 없습니다. |
| `toss-storage-design` r2 | translationese | minor | 오염된 데이터에 견고합니다 | 'robust against corrupted data'를 그대로 옮겨서 '~에 견고하다'라는 어색한 구조가 됐습니다. | 데이터가 깨져 있어도 앱이 멈추지 않습니다 |
| `toss-storage-design` r2 | awkward | minor | `TypedStorage`는 반복 코드를 없애려는 것입니다. | 주어 'TypedStorage'와 서술어 '없애려는 것입니다'가 맞지 않습니다. | `TypedStorage`는 반복 코드를 없애려고 만든 것입니다. |
| `toss-use-funnel-design` r1 | literal | major | 진실의 원천이 둘 | 영어 'source of truth'를 글자대로 옮긴 말이라, 원문을 떠올려야 뜻이 들어옵니다. | 상태의 기준이 되는 곳이 둘 |
| `toss-use-funnel-design` r1 | literal | minor | 잘못된 설정은 `assert`로 일찍, 명확한 메시지와 함께 실패합니다. | 영어 'fail early'를 그대로 옮긴 말입니다. 주어인 '설정'과 서술어 '실패합니다'도 잘 맞지 않습니다. | 잘못된 설정은 `assert`가 초기에 걸러내고 명확한 오류 메시지를 보여 줍니다. |
| `toss-use-funnel-design` r1 | translationese | minor | 한 훅에서 점진적으로 쓸 수 있습니다 | 영어 'incrementally adopt'를 옮긴 듯한 표현입니다. 무엇이 점진적인지 한 번에 읽히지 않습니다. | 한 훅으로 모두 처리하고, 필요할 때 `withState`만 덧붙이면 됩니다 |
| `toss-use-funnel-design` r2 | literal | minor | URL이 스텝의 단일 진실 공급원이고 | 영어 'single source of truth'를 낱말 그대로 옮긴 말이라, 영어 원문을 떠올려야 뜻이 잡힌다. | 스텝은 URL만 보고 정하고 |
| `toss-use-funnel-design` r2 | awkward | minor | `assert`가 던져지므로 | 던져지는 것은 assert가 아니라 assert가 일으키는 에러다. 주어와 서술어가 맞지 않는다. | `assert`에서 에러가 발생하므로 |
| `toss-use-funnel-design` r2 | noun_chain | minor | 교체 방식 상태 갱신 | 명사가 이어 붙어 있어 무엇을 무엇으로 바꾼다는 뜻인지 한 번에 읽히지 않는다. | 상태를 병합하지 않고 통째로 바꾸는 방식 |
| `toss-use-query-param-review` r1 | literal | minor | 같은 거짓말을 합니다 | 타입이 실제와 다르다는 뜻의 영어 표현 'lies'를 그대로 옮겨서 한국어 기술 문장에서는 어색합니다. | 실제 값과 맞지 않는 타입을 선언합니다 |
| `toss-use-query-param-review` r1 | awkward | minor | throw가 그대로 터집니다 | 'throw'를 주어로 쓰고 '터집니다'를 붙여서 말이 어색합니다. | 던진 promise를 잡을 곳이 없어 오류가 납니다 |
| `toss-use-query-param-review` r1 | literal | minor | 테스트 간에 상태가 새어 나갈 수 있습니다 | 'state leaks between tests'를 낱말대로 옮겼습니다. | 앞 테스트의 mock 상태가 다음 테스트에 남을 수 있습니다 |
| `toss-use-query-param-review` r1 | awkward | minor | 지원하지 않는 거라면 의도적인지 확인하세요 | 지원하지 않는다고 가정해 놓고 그게 의도인지 확인하라고 해서 앞뒤 논리가 꼬여 있습니다. 문장을 다시 읽게 됩니다. | Next 13 이상을 지원하지 않는 것이 의도인지 확인하세요 |
| `toss-use-query-param-review` r2 | literal | minor | 같은 거짓말입니다 | 영어의 'the types lie'를 그대로 옮긴 표현입니다. 한국어 개발 글에서는 타입이 '거짓말한다'고 잘 쓰지 않습니다. | 같은 문제로 타입이 실제 값과 다릅니다 |
| `toss-use-query-param-review` r2 | literal | minor | 테스트도 이 문제를 알고 있습니다 | 테스트를 사람처럼 '알고 있다'고 쓴 영어식 의인화입니다. 테스트 코드가 이 경우를 고려했다는 뜻이 바로 읽히지 않습니다. | 테스트 코드에도 이 경우가 반영되어 있습니다 |
| `toss-use-query-param-review` r2 | literal | minor | 테스트가 잘못된 계약을 고정함 | 'lock in the wrong contract'를 그대로 옮긴 표현입니다. '계약을 고정한다'는 한국어로 어색해서 잘못된 동작을 기준으로 삼는다는 뜻이 바로 오지 않습니다. | 테스트가 실제와 다른 동작을 기대값으로 삼음 |

## I

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-how` r1 | awkward | minor | 5단계 전후의 개별 규칙 함수 | 본문에서 special 규칙은 6단계인데 '5단계 전후'라고 써서, 독자가 어느 단계를 말하는지 처리 순서를 다시 확인하게 됩니다. | 6단계에서 적용하는 개별 규칙 함수 |
| `g2pk-how` r1 | awkward | minor | 이 표지는 6단계의 규칙이 "어간인지, 관형형 어미인지, 조사인지"를 구별하는 데 쓰고, 6단계가 끝나면 지웁니다. | 주어는 '이 표지는'인데 서술어가 '쓰고', '지웁니다'처럼 능동형이라 주어와 서술어가 맞지 않습니다. | 6단계의 규칙은 이 표지로 어간인지, 관형형 어미인지, 조사인지를 구별하고, 6단계가 끝나면 표지를 지웁니다. |
| `g2pk-how` r2 | literal | minor | 꼬리표 | 형태소 분석에서 쓰는 tag를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '태그'나 '품사 태그'라고 부르기 때문에, 처음 읽을 때 무엇을 가리키는지 잠깐 생각하게 됩니다. | 태그 (예: 형태소 태그 붙이기, 태그를 지웁니다) |
| `g2pk-how` r2 | noun_chain | minor | 패키지 저장소 배포 여부를 확인할 수 없어 | 명사 네 개가 이어져서 PyPI 같은 저장소에 패키지가 올라가 있는지를 말한다는 것이 바로 읽히지 않습니다. | PyPI 같은 패키지 저장소에 올라가 있는지 확인할 수 없어 |
| `hangul-js-failure` r1 | literal | minor | 조용히 넘어갑니다 | 영어 'silently ignore/fail'을 낱말대로 옮긴 표현이라 한국어 문장으로는 어색합니다. | 예외 없이 빈 문자열을 돌려줍니다 |
| `hangul-js-failure` r1 | literal | minor | 조용히 틀린 값이 나오는 경우 | 'silently wrong'을 직역했습니다. 한국어 개발자라면 '오류 없이 틀린 값이 나오는 경우'처럼 씁니다. | 오류 없이 틀린 값이 나오는 경우 |
| `hangul-js-failure` r2 | literal | minor | 조용히 틀린 결과가 나옵니다 | 영어 'silently'를 낱말대로 옮긴 표현입니다. 한국어 개발자는 '예외나 경고 없이'라고 씁니다. | 예외나 경고 없이 틀린 결과가 나옵니다 |
| `khaiii-plan` r1 | literal | minor | 단계마다 현재 동작을 그대로 고정하는 테스트부터 씁니다 | 'pin down current behavior'를 낱말대로 옮긴 표현입니다. '동작을 고정한다'가 무엇을 하는 테스트인지 바로 읽히지 않습니다. | 단계마다 지금 코드가 하는 동작을 그대로 기대값으로 삼는 테스트부터 씁니다 |
| `khaiii-plan` r1 | awkward | minor | 소스가 `src/main/python`이라 맞춘 제안입니다. | '맞춘 제안'에서 무엇을 무엇에 맞췄는지 빠져 있어 문장을 다시 읽게 됩니다. | 소스가 `src/main/python`에 있으니 구조를 맞추자는 제안입니다. |
| `khaiii-plan` r2 | literal | minor | `Morph.parse`와 `to_str`이 서로 왕복되는지 확인합니다. | round-trip을 낱말대로 옮긴 '왕복되는지'라서 무엇을 확인하는지 바로 읽히지 않습니다. | `to_str`로 만든 문자열을 `Morph.parse`로 다시 읽으면 원래 값이 나오는지 확인합니다. |
| `khaiii-plan` r2 | awkward | minor | 받침이 있는 음절과 없는 음절이 각각 3개, 2개 튜플로 나뉘는지 확인합니다. | '3개, 2개 튜플로 나뉜다'는 말이 무엇이 몇 개인지 분명하지 않아 다시 읽게 됩니다. | 받침이 있는 음절은 자모 3개짜리 튜플로, 없는 음절은 2개짜리 튜플로 분해되는지 확인합니다. |
| `khaiii-plan` r2 | awkward | minor | 테스트가 현재 동작과 다르게 실패하면 | 테스트가 현재 동작과 '다르게' 실패한다는 말은 뜻이 맞지 않습니다. 기대값이 현재 동작과 달라 실패하는 경우를 말하려던 것으로 보입니다. | 테스트의 기대값이 현재 동작과 달라서 실패하면 |
| `khaiii-plan` r2 | awkward | minor | 2단계 이후에도 코드 수정은 이번 계획에 넣지 않았습니다. | 왜 '2단계 이후'를 기준으로 삼는지 알 수 없어 다시 읽게 됩니다. 계획 전체에 코드 수정이 없다는 뜻으로 보입니다. | 이번 계획에는 어느 단계에도 코드 수정을 넣지 않았습니다. |
| `kobert-transformers-plan` r1 | awkward | minor | 새 테스트마다 어떤 동작을 고정하는지 이름에 드러납니다. | 앞으로 할 일을 적는 마무리 단계인데, 문장은 이미 그렇다는 사실처럼 끝납니다. 앞 문장들과 서술 방식이 어긋납니다. | 새 테스트 이름에는 어떤 동작을 고정하는지 드러나게 합니다. |
| `kobert-transformers-plan` r1 | literal | minor | 이름이 말하는 클래스 | 영어 'the class its name says'를 그대로 옮긴 말투입니다. 한국어로는 이름이 말한다고 하지 않습니다. | 이름에 맞는 클래스 |
| `kobert-transformers-plan` r2 | literal | minor | 특성 확인 테스트 | characterization test를 낱말대로 옮긴 말로, 한국어 개발자가 흔히 쓰는 용어가 아닙니다. 괄호 안 설명이 있어 뜻은 짐작할 수 있습니다. | 현재 동작 고정 테스트(실행해서 값을 확인한 뒤 고정) |
| `koelectra-how` r1 | literal | minor | 이 값이 모델·설정·토크나이저 클래스를 고르는 열쇠입니다 | 영어 'key'를 '열쇠'로 그대로 옮겼습니다. 한국어 개발자는 이 자리에 '기준'이나 '키'를 씁니다. | 이 값을 기준으로 모델·설정·토크나이저 클래스를 고릅니다 |
| `koelectra-how` r1 | awkward | minor | `model_type`을 클래스에 이어 줍니다 | 딕셔너리가 키를 클래스에 대응시킨다는 뜻인데, '이어 준다'는 이런 뜻으로 쓰지 않는 말이라 읽다가 멈칫합니다. | `model_type`별로 쓸 클래스를 지정합니다 |
| `koelectra-how` r2 | awkward | minor | 설정 파일에 `generator_hidden_size`를 따로 주면 생성기 크기는 판별기 대비 그 비율이 됩니다. | '그 비율'이 무엇을 가리키는지 바로 읽히지 않습니다. 설정값 자체가 비율이라는 뜻을 다시 읽어야 알 수 있습니다. | 설정 파일의 `generator_hidden_size` 값은 판별기 대비 생성기 크기의 비율입니다. |
| `korpora-review` r1 | literal | minor | 필터에서 조용히 빠져서 | 영어 silently를 그대로 옮긴 표현입니다. 한국어에서는 '경고 없이'나 '아무 메시지 없이'라고 씁니다. | 필터에서 아무 메시지 없이 빠져서 |
| `korpora-review` r1 | literal | minor | 배너를 출력하지 않는 경로를 둡니다 | code path를 옮긴 '경로'가 파일 경로로 읽힐 수 있습니다. | 배너를 출력하지 않는 분기를 둡니다 |
| `korpora-review` r1 | awkward | minor | `AttributeError`를 맞습니다 | 오류를 '맞는다'는 말은 문맥에 맞지 않습니다. 보통 '오류가 난다'고 씁니다. | `train.texts`에서 `AttributeError`가 납니다 |
| `korpora-review` r2 | literal | minor | 맨 `except:`가 | bare except를 낱말대로 옮긴 말입니다. 한국어 개발자는 이렇게 부르지 않아서 '맨'이 무슨 뜻인지 잠깐 멈칫하게 됩니다. | 예외 타입 없이 쓴 `except:`가 |
| `korpora-review` r2 | awkward | minor | `except:` 없이도 `try/finally`는 필요합니다. | 8번 항목에는 앞에서 except 이야기가 나오지 않습니다. 그래서 '없이도'가 무엇을 받는지 알 수 없어 문장을 다시 읽게 됩니다. | 작업 디렉터리를 되돌리려면 `try/finally`로 감싸야 합니다. |
| `open-korean-text-design` r1 | literal | minor | 용언은 활용형을 미리 펼쳐 둡니다 | 영어 expand를 그대로 옮긴 '펼쳐 두다'는 한국어 개발자가 활용형을 미리 만들어 두는 일을 말할 때 잘 쓰지 않습니다. | 용언은 활용형을 미리 만들어 사전에 넣어 둡니다 |
| `open-korean-text-design` r1 | awkward | minor | 설계 문서나 커밋 기록은 없습니다 | 저장소에 문서와 커밋 기록이 없다는 말로도 읽혀서, 글쓴이가 그것을 보지 못했다는 뜻으로 바로 읽히지 않습니다. | 설계 문서나 커밋 기록은 보지 못했습니다 |
| `open-korean-text-design` r2 | literal | minor | 품사 열 패턴을 트라이로 표현했습니다 | POS sequence를 '품사 열'로 직역했습니다. '열'만으로는 무엇을 가리키는지 바로 들어오지 않습니다. | 품사 순서 패턴을 트라이로 표현했습니다 |
| `open-korean-text-design` r2 | translationese | minor | `addWordsToDictionary`가 그것을 직접 수정합니다 | 영어 대명사 it을 옮긴 '그것'이라 문장이 무거워집니다. | `addWordsToDictionary`가 이 싱글턴을 직접 수정합니다 |
| `open-korean-text-design` r2 | awkward | minor | 사전에 없는 용언은 명사로 잘못 붙을 수 있습니다 | '붙다'가 문맥에 맞지 않습니다. 하려는 말은 명사로 잘못 분석된다는 뜻입니다. | 사전에 없는 용언은 명사로 잘못 분석될 수 있습니다 |
| `open-korean-text-design` r2 | awkward | minor | 표기가 정리되지 않은 곳이 있습니다. | 본문은 오래된 주석 이야기인데 '표기'라는 낱말이 내용과 맞지 않습니다. | 코드와 맞지 않는 오래된 주석이 있습니다. |
| `py-hanspell-failure` r1 | literal | minor | 500자 초과 입력이 조용히 실패합니다 | 영어 'fail silently'를 낱말대로 옮긴 말이라, 한국어 개발자가 쓰는 표현은 아닙니다. | 500자를 넘는 입력은 알림 없이 실패합니다 |
| `py-hanspell-failure` r1 | literal | minor | 서버 태그가 바뀌면 조용히 틀립니다 | 'silently wrong'을 옮긴 표현이라, '조용히 틀린다'가 무슨 뜻인지 바로 읽히지 않습니다. | 서버 태그가 바뀌면 예외 없이 잘못된 결과가 나옵니다 |
| `py-hanspell-failure` r1 | translationese | minor | 응답 형식에 강하게 의존합니다 | 'depends heavily on'을 옮긴 구조라 문장이 무겁습니다. | 응답 형식이 조금만 바뀌어도 깨집니다 |
| `py-hanspell-failure` r2 | literal | minor | 이 테스트는 조용히 통과하면서 아무것도 검증하지 못합니다 | 영어 'pass silently'를 낱말대로 옮긴 표현입니다. 한국어 개발자는 '조용히 통과한다'고 잘 말하지 않습니다. | 이 테스트는 아무것도 검증하지 못한 채 통과합니다 |
| `py-hanspell-failure` r2 | awkward | minor | 다른 오류는 모두 예외로 오르는데 | '예외로 오르다'는 쓰지 않는 말이라 어색합니다. 보통 '예외가 발생하다'나 '예외로 올라오다'라고 씁니다. | 다른 오류는 모두 예외가 발생하는데 |
| `py-hanspell-failure` r2 | awkward | minor | 리스트만 분기하므로 | '리스트를 분기한다'는 말이 무엇을 나누는지 바로 읽히지 않습니다. 입력 타입이 리스트일 때만 따로 처리한다는 뜻을 풀어 써야 합니다. | 리스트일 때만 따로 처리하므로 |
| `py-hanspell-failure` r2 | translationese | minor | 키 접근이 방어되지 않습니다. | 'unguarded key access'를 옮긴 피동 표현이라 무겁습니다. | 키가 있는지 확인하지 않고 바로 접근합니다. |
| `toss-date-failure` r1 | literal | minor | 조용히 돌려줍니다 | 영어 'silently returns'를 낱말대로 옮긴 표현이다. 한국어로는 '오류 없이 돌려준다'고 쓰는 편이 자연스럽다. | 오류 없이 돌려줍니다 |
| `toss-date-failure` r2 | awkward | major | UTC보다 늦은 한국(KST)에서는 문제가 없지만, UTC보다 이른 시간대에서는 | KST는 UTC보다 시각이 앞서는데(UTC+9) '늦은'이라고 써서, 어느 쪽 시간대가 문제인지 반대로 읽힐 수 있습니다. | UTC보다 시각이 앞선 한국(UTC+9)에서는 문제가 없지만, 미주처럼 UTC보다 뒤처진 시간대(UTC-)에서는 |
| `toss-date-failure` r2 | awkward | minor | 위 2번과 이어지면 | 두 문제가 함께 일어나는 경우를 '이어지면'이라고 표현해 뜻이 바로 들어오지 않습니다. | 위 2번 문제와 겹치면 |
| `toss-hangul-failure` r1 | literal | minor | 오류 없이 조용히 틀립니다 | 영어 'fail silently'를 낱말대로 옮긴 말입니다. 앞에 '오류 없이'가 이미 있어서 '조용히'는 같은 뜻을 되풀이합니다. | 오류 없이 결과만 틀어집니다 |
| `toss-hangul-failure` r2 | literal | minor | 오류 없이 조용히 틀린 결과가 나오는 경우 | 'silently'를 그대로 옮긴 '조용히'입니다. 한국어에서는 '오류 없이'만으로 뜻이 전달됩니다. 뒤에 나오는 '조용히 엉뚱한 모음을 돌려줍니다'도 같은 경우입니다. | 오류 없이 틀린 결과가 나오는 경우 / 아무 오류 없이 엉뚱한 모음을 돌려줍니다 |
| `toss-hangul-failure` r2 | literal | minor | 외부에서는 `josa.pick`을 통해서만 만납니다 | 'encounter'를 그대로 옮겨 오류를 '만난다'고 썼습니다. 한국어 개발자는 오류를 '겪는다'나 '난다'고 말합니다. | 외부에서는 `josa.pick`을 쓸 때만 이 오류가 납니다 |
| `toss-hangul-failure` r2 | literal | minor | 음절 경계를 가로질러 일치합니다 | 'match across syllable boundaries'를 낱말대로 옮긴 표현입니다. | 음절이 나뉘는 자리를 넘어서도 일치합니다 |
| `toss-hangul-failure` r2 | awkward | minor | 입력 타입 검증이나 `normalize('NFC')`를 호출하는 쪽에서 해 주세요 | '호출하는 쪽'이 normalize를 호출하는 쪽인지 라이브러리를 호출하는 쪽인지 헷갈립니다. 또 'normalize를 ~에서 해 주세요'처럼 목적어와 서술어가 잘 맞지 않습니다. | 입력 타입 검증과 `normalize('NFC')` 정규화는 이 함수들을 호출하는 쪽에서 해 주세요 |
| `toss-ky-how` r2 | awkward | minor | 모놈레포 | '모노레포'를 잘못 쓴 말이라 처음 보는 독자는 다른 용어인지 잠깐 멈칫합니다. | 모노레포 |
| `toss-scroll-animation-plan` r1 | awkward | minor | 0단계에서 환경이 안 돌면 | '돈다'는 테스트나 명령에 쓰는 말인데 여기서는 '환경'을 주어로 받아 주어와 서술어가 조금 어긋납니다. | 0단계에서 테스트가 실행되지 않으면 |
| `toss-scroll-animation-plan` r2 | awkward | minor | `console.error`는 spy로 가립니다. | '가린다'는 무엇을 가리는지 바로 와닿지 않습니다. spy로 감시하면서 출력을 막는다는 뜻으로 읽으려면 한 번 더 생각해야 합니다. | `console.error`는 spy로 바꿔 출력이 나오지 않게 합니다. |
| `toss-sentry-review` r1 | literal | minor | 조용히 실패하고 | 영어 'fail silently'를 낱말대로 옮긴 표현입니다. 한국어 문장으로는 어색합니다. | `window.Sentry`가 없으면 아무 알림 없이 동작하지 않고 |
| `toss-sentry-review` r2 | literal | minor | `window.Sentry`가 없으면 모든 호출이 조용히 무시됩니다. | 영어 'silently ignored'를 낱말대로 옮긴 표현입니다. 뜻은 통하지만 한국어로는 '아무 경고 없이 무시된다'라고 쓰는 편이 자연스럽습니다. | `window.Sentry`가 없으면 모든 호출이 아무 경고 없이 무시됩니다. |
| `toss-storage-design` r1 | literal | minor | 안전하고 타입 있게 쓰려는 | 'typed'를 낱말대로 옮긴 표현이라 '타입 있게'가 한국어로는 어색합니다. | 안전하고 타입 안전하게 쓰려는 |
| `toss-storage-design` r1 | literal | minor | 메모리로 조용히 바꿉니다 | 'silently'를 그대로 옮긴 '조용히'입니다. 호출하는 쪽에 알리지 않는다는 뜻이 바로 읽히지 않습니다. | 호출하는 쪽에 알리지 않고 메모리 저장소로 바꿉니다 |
| `toss-storage-design` r1 | awkward | minor | `get()`/`set()`이 타입으로 맞춰집니다 | '타입으로 맞춰진다'는 말로는 반환값과 인자의 타입이 `T`로 정해진다는 뜻이 바로 전달되지 않습니다. | `get()`의 반환값과 `set()`의 인자 타입이 `T`로 정해집니다 |
| `toss-storage-design` r2 | literal | minor | 폴백이 조용합니다. | 영어 'silent fallback'을 낱말대로 옮긴 표현이라 한국어로는 어색합니다. 뒤 문장을 읽어야 '알림 없이 바뀐다'는 뜻이 확실해집니다. | 메모리 저장소로 바뀌어도 알려 주지 않습니다. |
| `toss-use-funnel-design` r1 | awkward | minor | `Funnel`의 `assert`가 던져서 페이지가 에러가 됩니다 | '던져서'에 목적어가 없고, '페이지가 에러가 됩니다'는 주어와 서술어가 맞지 않습니다. | `Funnel`의 `assert`에서 에러가 나서 페이지가 깨집니다 |
| `toss-use-funnel-design` r1 | awkward | minor | `withState`가 이 문제를 풀려고 있는 것으로 보입니다 | '풀려고 있는'은 '이 문제를 풀려고 만든 것'이라는 뜻을 담기에 문장 구성이 어색합니다. | `withState`는 이 문제를 풀려고 만든 것으로 보입니다 |
| `toss-use-funnel-design` r1 | literal | minor | 스토리지 교체 지점이 열려 있습니다 | '확장 지점이 열려 있다'라는 영어식 표현을 그대로 옮겨서 한국어로 바로 읽히지 않습니다. | 스토리지를 다른 구현으로 바꿀 수 있습니다 |
| `toss-use-funnel-design` r2 | literal | minor | URL을 상태의 원천으로 삼는 쪽은 | 영어 'source of truth'를 낱말대로 옮긴 표현입니다. 한국어 개발자는 보통 이렇게 말하지 않습니다. | URL을 기준으로 상태를 관리하는 방식은 |
| `toss-use-funnel-design` r2 | awkward | minor | `assert`가 던져 에러가 납니다 | '던져'의 목적어가 빠져 있어 무엇을 던지는지 바로 읽히지 않습니다. '던져'와 '에러가 납니다'가 같은 내용을 두 번 말하기도 합니다. | `assert`에서 에러가 납니다 |
| `toss-use-funnel-design` r2 | awkward | minor | `deepEqual`이 영영 맞지 않아 | 맞거나 틀리는 쪽은 함수가 아니라 비교 결과입니다. 그래서 주어와 서술어가 어긋납니다. | `deepEqual` 비교가 끝내 일치하지 않아 |
| `toss-use-query-param-review` r1 | literal | minor | 어느 쪽이든 그 규칙을 테스트로 고정해야 합니다 | 영어 'pin down with tests'를 그대로 옮긴 표현이라 한국어로는 조금 어색합니다. | 어느 쪽이든 그 규칙을 테스트로 확인해 두어야 합니다 |
| `toss-use-query-param-review` r1 | literal | minor | 타입을 `string \| string[]`로 열어 두면 됩니다 | 'open up the type'을 옮긴 말이어서, 타입을 넓힌다는 뜻이 바로 읽히지 않습니다. | 타입을 `string \| string[]`로 넓히면 됩니다 |
| `toss-use-query-param-review` r1 | awkward | minor | 렌더링 중에 `parser`가 예외를 던지면 컴포넌트가 에러 경계까지 올라갑니다 | 에러 경계까지 올라가는 것은 컴포넌트가 아니라 예외입니다. 주어와 서술어가 맞지 않습니다. | 렌더링 중에 `parser`가 예외를 던지면 그 예외가 가장 가까운 에러 경계(Error Boundary)까지 전파됩니다 |
| `toss-use-query-param-review` r1 | awkward | minor | 이때 Promise를 던지면 서버 렌더링이 Suspense를 지원하는 환경이어야 합니다 | '서버 렌더링이 ~ 환경이어야'는 주어와 서술어가 맞지 않습니다. | 이때 Promise를 던지려면 서버 렌더링 환경이 Suspense를 지원해야 합니다 |
| `toss-use-query-param-review` r2 | awkward | minor | 형을 우회하는 | 요즘 개발 문서에서는 type을 '형'이라고 잘 쓰지 않고, 문장 앞부분에서 쓴 '타입'과도 표기가 다릅니다. | 타입 검사를 우회하는 |
| `toss-use-query-param-review` r2 | literal | minor | 같은 문제의 신호입니다 | 영어 'a sign of the same problem'을 그대로 옮긴 표현이라 한국어로 쓰면 어색합니다. | 같은 문제 때문입니다 |
| `toss-use-query-param-review` r2 | literal | minor | 실제로는 일어나지 않는 상황을 고정하는 테스트입니다 | 'pin/lock in behavior'를 낱말대로 옮긴 '고정하는'이라 무엇을 고정한다는 것인지 바로 읽히지 않습니다. | 실제로는 일어나지 않는 상황을 기대값으로 못 박는 테스트입니다 |
| `toss-use-query-param-review` r2 | awkward | minor | 13에서만 돕니다 | '돌다'를 활용한 '돕니다'가 '돕다(help)'로 먼저 읽혀서 문장을 다시 읽게 됩니다. | 13에서만 돌아갑니다 |

## N1

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-how` r2 | awkward | minor | 단어 한두 개가 아니라 소리의 환경을 조건으로 하는 규칙입니다. | '소리의 환경'은 음운론 용어 '음운 환경'을 풀어 쓴 말입니다. 이 말과 '~을 조건으로 하는'이 함께 쓰여 문장을 한 번 더 읽어야 뜻이 들어옵니다. | 특정 단어가 아니라 앞뒤에 어떤 소리가 오는지에 따라 적용되는 규칙입니다. |
| `hangul-js-failure` r1 | literal | minor | 데이터가 조용히 바뀝니다 | 영어 'silently'를 낱말대로 옮긴 말입니다. 한국어 개발자라면 '알리지 않고'나 '오류 없이'라고 씁니다. | 오류 없이 데이터가 바뀝니다 |
| `hangul-js-failure` r1 | awkward | minor | 이 함수만 `typeof null === 'object'`라서 `null.join`을 부릅니다 | '이 함수만'이 주어인데 서술어 '`typeof null === 'object'`라서'와 맞지 않습니다. 함수가 무엇을 검사하는지가 빠져서 문장을 다시 읽게 됩니다. | 이 함수만 `typeof`가 `'object'`인지로 배열을 판단하는데, `typeof null`도 `'object'`라서 `null.join`을 부릅니다 |
| `hangul-js-failure` r2 | literal | minor | `.`은 모든 글자와 맞습니다. | 정규식의 match를 '맞다'로 그대로 옮겼습니다. 한국어 개발자는 보통 '매칭된다'나 '일치한다'고 씁니다. 같은 항목의 '빈 문자열과도 맞는', '빈 문자열이 맞았을 때'도 마찬가지입니다. | `.`은 모든 글자에 매칭됩니다. |
| `hangul-js-failure` r2 | awkward | minor | 함수마다 반응이 다릅니다. | 함수가 입력을 처리하는 방식을 '반응'이라고 하면 문맥에 맞지 않습니다. 보통 '동작'이라고 씁니다. | 함수마다 동작이 다릅니다. |
| `khaiii-plan` r1 | awkward | minor | 정수 키로 되짚으면 항목이 나옵니다 | '되짚다'는 다시 따져 본다는 뜻입니다. 정수 ID로 항목을 거꾸로 찾는다는 뜻으로는 잘 쓰지 않아서 독자가 한 번 더 읽게 됩니다. | 정수 키로 조회하면 원래 항목이 나옵니다 |
| `khaiii-plan` r2 | literal | minor | `align()`은 쉬운 경로부터 봅니다 | 영어의 'easy path/happy path'를 그대로 옮긴 표현이라 '경로'가 무엇을 가리키는지 잠깐 생각하게 됩니다. | `align()`은 쉬운 경우부터 봅니다 |
| `khaiii-plan` r2 | coined | minor | 가운데 규칙 | 앞뒤를 정렬한 뒤 남은 가운데 부분에 적용하는 규칙을 글쓴이가 따로 붙인 이름입니다. 처음 나올 때 무엇을 뜻하는지 설명이 없습니다. | 앞뒤를 정렬하고 남은 가운데 부분에 적용하는 규칙 |
| `kobert-transformers-plan` r1 | literal | minor | 테스트용 토크나이저를 세우는 fixture | set up을 낱말대로 옮긴 '세우다'입니다. 한국어 개발자는 fixture가 객체를 '세운다'고 말하지 않습니다. | 테스트용 토크나이저를 만드는 fixture |
| `kobert-transformers-plan` r1 | literal | minor | 실행하는 목표를 추가합니다 | Makefile의 target을 '목표'로 옮겨서 Makefile 문맥에서 바로 읽히지 않습니다. 보통은 '타깃'이라고 씁니다. | 실행하는 타깃을 추가합니다 |
| `kobert-transformers-plan` r2 | literal | minor | 얇은 항목 | 영어 'thin'을 그대로 옮긴 말로 보입니다. 한국어 개발자는 간단한 확인 항목을 '얇다'고 하지 않아서 무슨 뜻인지 잠깐 생각하게 됩니다. | 간단한 확인 항목 |
| `kobert-transformers-plan` r2 | awkward | minor | 공용 준비물 만들기 | fixture를 '준비물'이라고 부르는 경우는 드물어 어색합니다. 본문에서 fixture라고 다시 설명해서 뜻은 통합니다. | 공용 fixture 만들기 |
| `koelectra-how` r1 | awkward | minor | 모델별 JSON이 하나씩, 열 개씩 들어 있습니다 | '하나씩'과 '열 개씩'이 한 구에 붙어 있어서 폴더마다 파일이 몇 개인지 다시 읽게 됩니다. | 모델마다 JSON이 하나씩, 폴더마다 열 개가 들어 있습니다 |
| `koelectra-how` r1 | literal | minor | 쓸 클래스를 고르는 열쇠입니다 | 딕셔너리의 key를 '열쇠'로 옮겼습니다. 개발자는 '키'라고 씁니다. | 쓸 클래스를 고르는 키입니다 |
| `koelectra-how` r1 | literal | minor | 예시(`InputExample`)로 만듭니다 | 학습 데이터 단위인 example을 '예시'로 옮겼습니다. 한국어 개발자는 보통 '샘플'이나 '예제'라고 합니다. | 샘플(`InputExample`)로 만듭니다 |
| `koelectra-how` r1 | literal | minor | 특징 캐시 파일 | feature를 '특징'으로 옮겼습니다. 이 맥락에서는 '피처'라고 쓰는 게 자연스럽습니다. | 피처 캐시 파일 |
| `koelectra-how` r1 | literal | minor | SQuAD v1 처리기 | processor를 '처리기'로 옮겼습니다. 앞에서 Processor라고 썼던 것과도 표기가 다릅니다. | SQuAD v1 프로세서 |
| `koelectra-how` r1 | awkward | minor | 이 저장소의 한국어 흐름에서 쓰는지는 | '한국어 흐름'이 무엇을 가리키는지 바로 알기 어렵습니다. | 이 저장소의 한국어 사전 학습 과정에서 쓰는지는 |
| `koelectra-how` r2 | awkward | minor | 시험 데이터 | test set을 '시험 데이터'로 옮겼는데, 한국어 개발자는 보통 '테스트 데이터'라고 합니다. '시험'이라는 말이 문맥에서 잠깐 낯설게 읽힙니다. | 테스트 데이터 |
| `koelectra-how` r2 | coined | minor | 가리기·되살리기·샘플링 같은 텐서 처리 | '되살리기'는 글쓴이가 붙인 이름으로 보이고 설명이 없습니다. 가린 토큰을 다시 채우는 처리인지, 마스크를 푸는 처리인지 바로 알기 어렵습니다. | 토큰 가리기(마스킹), 가린 자리 채우기, 샘플링 같은 텐서 처리 |
| `korpora-review` r1 | literal | minor | 맨몸 `except:`가 오류를 삼킵니다 | bare except를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 'bare except'라고 하거나 '예외 타입 없는 `except:`'라고 씁니다. | 예외 타입을 지정하지 않은 `except:`가 오류를 삼킵니다 |
| `korpora-review` r1 | literal | minor | 설치된 것만 조용히 처리하고 | 'silently'를 그대로 옮긴 표현이라 '조용히 처리한다'가 무슨 뜻인지 바로 읽히지 않습니다. | 설치된 것만 별다른 안내 없이 처리하고 |
| `korpora-review` r1 | literal | minor | 환경 표식(`; python_version < "3.7"`) | environment marker를 '표식'으로 옮겼는데, 업계에서 흔히 쓰는 말이 아닙니다. 보통 '환경 마커'라고 합니다. | 환경 마커(`; python_version < "3.7"`) |
| `korpora-review` r2 | literal | minor | 맨몸 `except:` | 'bare except'를 낱말대로 옮긴 말입니다. 한국어 개발자는 이 말을 거의 쓰지 않아서 독자가 영어 원문을 떠올려야 뜻을 압니다. | 예외 종류를 지정하지 않은 `except:` |
| `open-korean-text-design` r1 | literal | minor | 품질이 사전에 묶여 있습니다 | 영어 'bound to the dictionary'를 낱말 그대로 옮긴 느낌입니다. 한국어로는 품질이 사전에 '달려 있다'고 합니다. | 품질이 사전에 달려 있습니다 |
| `open-korean-text-design` r1 | awkward | minor | 위치별 후보를 5개(`TOP_N_PER_STATE`)로 묶어 계산량을 억제합니다 | 상한을 둔다는 뜻으로 '묶어'를 쓰고 계산량을 '억제'한다고 해서 낱말이 문맥에 맞지 않습니다. | 위치별 후보를 5개(`TOP_N_PER_STATE`)로 제한해 계산량을 줄입니다 |
| `py-hanspell-failure` r1 | literal | minor | 빈 패키지 이름이 요구 사항에 들어갑니다 | `install_requires`/requirements를 낱말 그대로 옮긴 '요구 사항'은 의존성 목록이라는 뜻으로 바로 읽히지 않습니다. | 빈 패키지 이름이 의존성 목록(`install_requires`)에 들어갑니다 |
| `toss-date-failure` r1 | literal | minor | 오류 없이 그대로 흘러갑니다 | 영어 'flow through'를 낱말대로 옮긴 표현입니다. 뜻은 통하지만 한국어 개발자는 값이 다음 계산으로 '흘러간다'고 잘 쓰지 않습니다. | 오류 없이 그대로 다음 계산으로 넘어갑니다 |
| `toss-date-failure` r2 | awkward | minor | 0 검사를 지나가고 | '0 검사'가 무엇을 검사하는지 바로 안 읽힙니다. 거리가 0 이하인지 확인하는 조건이라는 점을 독자가 앞 문장에서 짐작해야 합니다. | `distance <= 0`일 때 0을 돌려주는 조건에 걸리지 않고 |
| `toss-date-failure` r2 | coined | minor | 조건 함수에서 난 오류가 | '조건 함수'가 `getDateDistanceText`의 어떤 인자나 내부 함수를 가리키는지 설명이 없어서, 처음 보는 독자는 무엇인지 알 수 없습니다. | 인자로 넘긴 조건 함수(또는 실제 매개변수 이름)에서 난 오류가 |
| `toss-hangul-failure` r2 | awkward | minor | `!`로 타입 검사만 넘겼기 때문에 | '타입 검사를 넘기다'는 한국어에서 잘 쓰지 않는 조합입니다. '건너뛰었다'로 읽힐 수도 있고 '통과시켰다'로 읽힐 수도 있어서 독자가 잠깐 멈칫합니다. | `!`로 타입 검사만 통과시켰기 때문에 |
| `toss-ky-how` r2 | literal | minor | 이름 붙은 export | named export를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 'named export'라고 그대로 쓰거나 '이름 있는 내보내기'라고 씁니다. | 기본 export와 named export 모두 같습니다. |
| `toss-scroll-animation-plan` r1 | awkward | minor | 한 프레임 안의 이벤트가 한 번만 호출됩니다 | 호출되는 것은 이벤트가 아니라 콜백입니다. 주어와 서술어가 맞지 않습니다. | 한 프레임 안에서 이벤트가 여러 번 나도 콜백은 한 번만 호출됩니다 |
| `toss-scroll-animation-plan` r1 | awkward | minor | 조합 테스트라서 | '조합 테스트'는 한국어 개발자가 쓰는 말이 아닙니다. 보통 '통합 테스트'라고 합니다. | 통합 테스트라서 |
| `toss-scroll-animation-plan` r2 | literal | minor | 가장 싸게 쓸 수 있어서 | 'cheap to write'를 낱말대로 옮긴 표현으로, 테스트 작성 비용을 '싸다'로 말하는 것이 한국어로는 어색하다. | 가장 적은 노력으로 작성할 수 있어서 |
| `toss-scroll-animation-plan` r2 | awkward | minor | 컴포넌트 안에서 감싸 렌더링하는 작은 테스트용 컴포넌트 | '컴포넌트'가 한 구 안에 두 번 나오고, 무엇을 무엇으로 감싸는지 바로 읽히지 않는다. | 훅을 감싸 렌더링하는 작은 테스트용 컴포넌트 |
| `toss-scroll-animation-plan` r2 | noun_chain | minor | 1단계의 두 가지 의도 확인이 필요합니다. | 명사가 이어져 있어 무엇을 확인해야 하는지 한 번 더 따져 봐야 한다. | 1단계에서 말한 두 동작이 의도된 것인지 확인해 주셔야 합니다. |
| `toss-sentry-review` r1 | literal | minor | 소비자는 쓰지 않는 환경의 SDK까지 설치합니다 | 패키지를 가져다 쓰는 쪽을 뜻하는 영어 consumer를 그대로 옮겼습니다. 한국어 개발 문서에서는 '패키지 사용자'나 '사용하는 쪽'이라고 씁니다. | 패키지 사용자는 쓰지 않는 환경의 SDK까지 설치합니다 |
| `toss-sentry-review` r1 | awkward | minor | 의존성 구성이 무겁고 맞지 않습니다. | '맞지 않습니다'만으로는 무엇과 맞지 않는지 알 수 없습니다. 독자는 아래 목록을 읽고 나서야 뜻을 짐작합니다. | 의존성이 무겁고 일부는 잘못된 위치에 들어가 있습니다. |
| `toss-sentry-review` r2 | literal | minor | `captureException`이 조용히 사라집니다 | 영어 'fail silently'를 낱말대로 옮긴 표현입니다. 한국어 개발자라면 '아무 알림 없이 버려진다'처럼 씁니다. | `captureException` 호출이 아무 알림 없이 버려집니다 |
| `toss-sentry-review` r2 | translationese | minor | 앞의 것은 제거하고 뒤의 것은 `devDependencies`에 있으니 그대로 두면 됩니다 | 영어 'the former / the latter'를 옮긴 구조입니다. 독자가 앞 문장으로 돌아가 무엇을 가리키는지 다시 확인해야 합니다. | `@sentry/types`는 제거하고, `wait-for-expect`는 이미 `devDependencies`에 있으니 그대로 두면 됩니다 |
| `toss-storage-design` r1 | literal | minor | `Result<T>`가 유니온 타입에서 갈라집니다. | 조건부 타입이 유니온에 분배된다(distributes over union)는 뜻을 '갈라진다'로 옮겨서, 무엇이 어떻게 갈라지는지 바로 알기 어렵습니다. | `Result<T>`는 조건부 타입이라 유니온 타입의 각 멤버에 따로 적용됩니다. |
| `toss-storage-design` r1 | awkward | minor | 확장 방식이 하위 클래스 하나씩입니다. | '방식이 하위 클래스 하나씩'은 주어와 서술어가 잘 맞지 않고 너무 줄여 써서, 다시 읽어야 뜻이 들어옵니다. | 새 동작이 필요할 때마다 하위 클래스를 하나씩 추가해야 하는 구조입니다. |
| `toss-use-funnel-design` r1 | literal | minor | 비동기 인터페이스의 장점이 아직 밖으로 드러나지 않습니다. | 'not exposed'를 옮긴 듯한 '밖으로 드러나다'가 공개 API에서 쓸 수 없다는 뜻으로 바로 읽히지 않습니다. | 그래서 저장소 인터페이스를 비동기로 만든 이점을 사용하는 쪽에서는 아직 누릴 수 없습니다. |
| `toss-use-funnel-design` r2 | literal | minor | `withState`를 안 써도 비용을 냅니다. | 'pay the cost'를 그대로 옮긴 표현입니다. 한국어로 '비용을 낸다'고 하면 돈을 내는 장면이 먼저 떠오릅니다. | `withState`를 안 써도 그 비용을 떠안습니다. |
| `toss-use-query-param-review` r1 | literal | minor | 타입이 거짓말을 합니다 | 영어 표현 'the type lies'를 낱말대로 옮겨서 한국어 문서에서는 비유가 어색하게 읽힙니다. | 타입이 실제 값과 맞지 않습니다 |
| `toss-use-query-param-review` r1 | literal | minor | 프라미스가 바로 풀립니다 | resolve를 '풀리다'로 옮긴 표현이라 한국어 개발자가 잘 쓰지 않습니다. 보통은 'resolve된다'나 '이행된다'라고 씁니다. | 프라미스가 바로 resolve됩니다 |
| `toss-use-query-param-review` r2 | literal | minor | 파서가 없을 때 반환 타입이 거짓말입니다. | 영어 'the type lies'를 그대로 옮긴 표현이라 한국어 기술 문서에서는 낯섭니다. | 파서가 없을 때 반환 타입이 실제 값과 다릅니다. |
| `toss-use-query-param-review` r2 | literal | minor | 테스트가 현실과 다른 상황을 고정합니다. | 'pin/lock in'을 옮긴 '고정합니다'라서 무엇을 고정한다는 건지 한 번 더 생각해야 합니다. | 테스트가 실제로는 일어나지 않는 상황을 기대값으로 삼고 있습니다. |
| `toss-use-query-param-review` r2 | awkward | minor | 메모할 값이 없습니다 | memoize를 '메모하다'로 줄여 써서 '메모를 적는다'는 뜻으로 잘못 읽힐 수 있습니다. | 메모이제이션할 값이 없습니다 |
