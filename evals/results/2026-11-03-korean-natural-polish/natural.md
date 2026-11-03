# 한국어 독자가 멈칫하는 곳

자동 생성 파일이다(`node scripts/eval/natural.mjs summary --out 2026-11-03-korean-natural-polish`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.

| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | literal | coined | noun_chain | symbol | translationese | awkward | 글에 없는 인용 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 16 | 4 | 38(2) | 22 | 0 | 1 | 0 | 4 | 11 | 0 |
| N1 | 16 | 4 | 26(3) | 3 | 0 | 0 | 0 | 2 | 21 | 0 |
| N3 | 16 | 4 | 24(2) | 4 | 3 | 3 | 0 | 1 | 13 | 0 |

표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.

## A

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-perf-polish` r1 | literal | minor | 가장 비싼 실수가 됩니다 | 'the most expensive mistake'를 그대로 옮긴 표현입니다. 한국어에서는 실수를 '비싸다'고 하지 않습니다. | 성능을 가장 크게 떨어뜨리는 실수가 됩니다 |
| `g2pk-perf-polish` r1 | translationese | minor | 입력 길이에 대해 제곱으로 늘어나는 곳 | 'quadratic in input length'의 구조를 따라 '~에 대해'를 썼습니다. 한국어 문장으로는 다소 무겁습니다. | 입력 길이의 제곱으로 비용이 늘어나는 곳 |
| `g2pk-perf-polish` r2 | literal | minor | 가장 비싼 실수가 됩니다 | 영어 'the most expensive mistake'를 그대로 옮긴 표현입니다. 비용이 가장 큰 실수라는 뜻은 통하지만 한국어 개발자는 보통 이렇게 쓰지 않습니다. | 성능을 가장 크게 떨어뜨리는 실수가 됩니다 |
| `g2pk-perf-polish` r2 | literal | minor | 고유 음절마다 | 'unique syllables'를 옮긴 말입니다. '고유'가 '그 음절만의 특유한'으로 읽혀 중복을 뺀 음절이라는 뜻이 바로 들어오지 않습니다. | 중복을 뺀 음절마다 |
| `kobert-files-polish` r1 | awkward | minor | `[CLS]`/`[SEP]` 등 BERT식 특수 토큰, 입력 구성, 토큰 타입 ID를 BERT 방식으로 처리하며 | 한 문장 안에 'BERT식'과 'BERT 방식으로'가 겹쳐 나와 군더더기처럼 읽힌다. | `[CLS]`/`[SEP]` 같은 특수 토큰, 입력 구성, 토큰 타입 ID를 BERT 방식으로 처리하며 |
| `kobert-files-polish` r2 | literal | minor | S3 파일을 진행률과 함께 내려받는 | 영어 'download with progress'를 낱말대로 옮겼습니다. 진행률은 내려받는 파일과 '함께' 받는 것이 아니어서 어색하게 읽힙니다. | 진행률을 표시하며 S3 파일을 내려받는 |
| `kobert-files-polish` r2 | awkward | minor | `[CLS]`/`[SEP]` 등 BERT식 특수 토큰, 입력 구성, 토큰 타입 ID를 BERT 방식으로 처리하며 | 한 구 안에 'BERT식'과 'BERT 방식으로'가 겹쳐서, 같은 말이 되풀이되는 것처럼 읽힙니다. | `[CLS]`/`[SEP]` 같은 특수 토큰, 입력 구성, 토큰 타입 ID를 BERT 방식으로 처리하며 |
| `koelectra-upgrade-polish` r1 | literal | minor | 조용히 넘어갑니다 | 영어 'silently'를 낱말대로 옮긴 말이라, 오류나 경고 없이 넘어간다는 뜻으로 바로 읽히지 않습니다. '조용히 로드되지 않습니다', '조용히 틀릴 수 있는 곳'도 같은 표현입니다. | 오류 없이 형태소 분석을 건너뜁니다 / 에러 없이 로드되지 않습니다 / 에러 없이 결과가 틀어질 수 있는 곳 |
| `koelectra-upgrade-polish` r1 | literal | minor | 죽은 설정 | 'dead config'를 그대로 옮긴 말입니다. 한국어 개발자는 보통 이 말을 쓰지 않습니다. | 더 이상 쓰이지 않는 설정 |
| `koelectra-upgrade-polish` r1 | translationese | minor | 에러 없이 평가가 건너뛰어질 수도 있습니다 | '건너뛰어지다'는 영어 피동을 따라 만든 어색한 피동입니다. | 에러 없이 평가를 건너뛸 수도 있습니다 |
| `koelectra-upgrade-polish` r1 | awkward | minor | 이 코드는 3.3.1에서 4.x와 5.x를 거치는 중간 단계 없이 곧바로 건너뛰게 됩니다 | 무엇에서 무엇으로 건너뛰는지 목적지가 빠져 있습니다. 게다가 바로 앞에서 4.x를 목표 버전으로 제시해서, 4.x를 '거치는 중간 단계'라고 한 부분과 어긋나 다시 읽게 됩니다. | 이 코드는 3.3.1에서 최신 버전으로 그 사이 버전을 거치지 않고 한꺼번에 올라가게 됩니다 |
| `koelectra-upgrade-polish` r2 | literal | minor | 조용히 넘어갑니다 | 'fail silently'를 낱말대로 옮긴 표현입니다. 한국어 개발자라면 '오류 없이 넘어갑니다'라고 씁니다. | 오류 없이 형태소 분석을 건너뜁니다 |
| `koelectra-upgrade-polish` r2 | literal | minor | 기존 체크포인트가 조용히 로드되지 않습니다 | 'silently'를 직역한 표현입니다. 에러 없이 로드에서 빠진다는 뜻이 바로 읽히지 않습니다. | 기존 체크포인트 값이 에러 없이 로드되지 않습니다 |
| `koelectra-upgrade-polish` r2 | literal | minor | 조용히 틀릴 수 있는 곳 | 'silently wrong'을 직역한 소제목이라 어색합니다. | 에러 없이 결과가 틀어지는 곳 |
| `koelectra-upgrade-polish` r2 | literal | minor | 죽은 설정 | 'dead config'를 직역한 표현입니다. 설정에는 이 말을 잘 쓰지 않습니다. | 더 이상 쓰이지 않는 설정 |
| `koelectra-upgrade-polish` r2 | translationese | minor | 에러 없이 평가가 건너뛰어질 수도 있습니다 | '건너뛰어지다'는 불필요한 피동이라 어색합니다. | 에러 없이 평가를 건너뛸 수도 있습니다 |
| `koelectra-upgrade-polish` r2 | awkward | minor | OS를 지원 범위로 둘지 정해야 합니다 | 어떤 OS를 가리키는지 분명하지 않고 '지원 범위로 두다'도 어색합니다. | 이 OS들을 지원 대상에 넣을지 정해야 합니다 |
| `koelectra-upgrade-polish` r2 | awkward | minor | 이 흐름은 TF2의 TPU VM 환경과도 잘 맞지 않습니다 | '흐름'이 무엇을 가리키는지 분명하지 않습니다. | 이 Estimator 기반 구조는 TF2의 TPU VM 환경과도 잘 맞지 않습니다 |
| `korpora-bug-polish` r1 | literal | minor | 조용히 제거합니다 | 영어 'silently drop'을 낱말대로 옮긴 말이라, 한국어로는 '아무 알림 없이 버린다'는 뜻이 바로 떠오르지 않습니다. | 경고 없이 목록에서 빼 버립니다 |
| `korpora-bug-polish` r1 | literal | minor | 조용히 틀린 결과를 내는 패턴 | 'fail silently'를 옮긴 표현입니다. 오류 없이 잘못된 결과가 나온다는 뜻이 한국어로 바로 읽히지 않습니다. | 오류 없이 틀린 결과를 내는 코드 |
| `korpora-bug-polish` r1 | awkward | minor | 안내 예외(`NotImplementedError`)도 없이 아무 일 없이 끝납니다 | '~없이'가 한 문장에 두 번 이어지고, '안내 예외'라는 말도 어색합니다. | 지원하지 않는다는 예외(`NotImplementedError`)도 내지 않고 그냥 끝납니다 |
| `korpora-bug-polish` r1 | awkward | minor | 출력 파일이 "한 줄에 한 문장" 형식이 깨지고 | 주어가 '출력 파일이'와 '형식이'로 둘이 겹쳐서 어색합니다. | 출력 파일의 "한 줄에 한 문장" 형식이 깨지고 |
| `korpora-bug-polish` r1 | awkward | minor | 라벨이나 짝이 다른 데이터도 | '짝'이 무엇을 가리키는지(문장 쌍인지, pair 필드인지) 분명하지 않습니다. | 라벨이나 짝을 이루는 문장(pair)이 다른 데이터도 |
| `korpora-bug-polish` r2 | literal | minor | 조용히 제거합니다 | 'silently drops'를 낱말대로 옮긴 표현이라 한국어 문장으로는 어색합니다. | 아무 알림 없이 제거합니다 |
| `korpora-bug-polish` r2 | literal | minor | 조용히 틀린 결과를 내는 패턴 | 'silently wrong'을 직역한 말이라, 오류 없이 잘못된 결과를 낸다는 뜻이 바로 읽히지 않습니다. | 오류 없이 틀린 결과를 내는 패턴 |
| `py-hanspell-upgrade-polish` r1 | literal | minor | `Checked(result=False)`를 조용히 반환합니다 | 'silently return'을 낱말대로 옮긴 말입니다. 한국어 개발자라면 오류를 알리지 않는다고 풀어 씁니다. | 아무 오류도 알리지 않고 `Checked(result=False)`를 반환합니다 |
| `py-hanspell-upgrade-polish` r1 | literal | minor | 따로 표시한 라이브 테스트 | pytest의 'mark'를 '표시한'으로 옮겨서 무엇을 어떻게 표시한다는 것인지 바로 읽히지 않습니다. | 마커로 따로 구분한 라이브 테스트 |
| `py-hanspell-upgrade-polish` r1 | noun_chain | minor | 재현용 고정은 별도의 lock 파일로 분리하는 것이 좋습니다 | '재현용 고정'만 보고는 무엇을 고정하는지 알 수 없어서 문장을 다시 읽게 됩니다. | 설치를 재현하기 위한 버전 고정은 별도의 lock 파일로 분리하는 것이 좋습니다 |
| `py-hanspell-upgrade-polish` r1 | awkward | minor | `test_long_paragraph`에는 단언이 없습니다 | assertion을 '단언'이라고 옮기면 한국어 개발자에게 낯섭니다. 보통 assert문이나 검증 코드라고 합니다. | `test_long_paragraph`에는 assert문이 없습니다 |
| `py-hanspell-upgrade-polish` r2 | literal | minor | 조용히 반환합니다 | 영어 'silently return'을 낱말대로 옮긴 표현이라 한국어 개발자는 이렇게 쓰지 않습니다. 앞에 '예외 없이'가 이미 있어서 뜻도 겹칩니다. | 아무 알림 없이 반환합니다 |
| `toss-use-funnel-bug-polish` r1 | awkward | major | **재발 방지:** 캐시가 살아 있으면 `useState(initialState ?? …)`가 오래된 값으로 초기화됩니다. | 소제목은 '재발 방지'인데 내용은 예방책이 아니라 문제가 어떻게 이어지는지를 설명합니다. 소제목과 내용이 맞지 않아 독자가 헷갈립니다. | **추가 영향:** 캐시가 살아 있으면 `useState(initialState ?? …)`가 오래된 값으로 초기화됩니다. |
| `toss-use-funnel-bug-polish` r1 | literal | minor | 이런 `Step`은 조용히 필터링됩니다. | 'silently filtered'를 낱말대로 옮긴 표현입니다. | 이런 `Step`은 경고 없이 걸러집니다. |
| `toss-use-funnel-bug-polish` r1 | literal | minor | 소비자의 `useEffect` 의존성에 `setStep`을 넣으면 | 'consumer'를 그대로 옮겼습니다. 한국어 개발자는 보통 '사용하는 쪽'이나 '호출하는 쪽'이라고 씁니다. | 사용하는 쪽에서 `useEffect` 의존성에 `setStep`을 넣으면 |
| `toss-use-funnel-bug-polish` r1 | translationese | minor | `QueryClientProvider`와 `Suspense`를 요구받음 | '~를 요구받다'는 영어 피동문을 따른 무거운 표현입니다. | `useFunnel`을 쓰려면 항상 `QueryClientProvider`와 `Suspense`가 필요함 |
| `toss-use-funnel-bug-polish` r1 | literal | minor | 영원히 false가 되어 | 'forever'를 옮긴 과장된 표현입니다. 코드 동작을 설명할 때는 어색합니다. | 계속 false가 되어 |
| `toss-use-funnel-bug-polish` r2 | awkward | major | **재발 방지:** | 이 항목은 오래된 캐시 값으로 상태가 초기화되는 문제를 설명하는데, 소제목은 '재발 방지'여서 내용과 맞지 않습니다. 독자는 해결책이 나올 거라고 기대하게 됩니다. | **추가 문제:** 또는 **영향:** |
| `toss-use-funnel-bug-polish` r2 | literal | minor | 조용히 걸러집니다 | 'silently filtered'를 직역한 표현입니다. | 경고 없이 걸러집니다 |
| `toss-use-funnel-bug-polish` r2 | literal | minor | 영원히 false가 되어 | 'forever false'를 직역한 표현으로, 한국어 기술 문서에서는 이렇게 쓰지 않습니다. | 계속 false가 되어 |

## N1

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-perf-polish` r1 | literal | minor | 가장 비싼 실수가 됩니다 | 영어 'the most expensive mistake'를 그대로 옮긴 표현이라 한국어 기술 글에서는 어색합니다. | 성능을 가장 크게 떨어뜨리는 실수가 됩니다 |
| `g2pk-perf-polish` r1 | awkward | minor | 호출할 때마다 검증이 붙어 있어서 | '검증이 붙어 있다'는 말이 '호출할 때마다'와 잘 맞물리지 않습니다. | 호출할 때마다 검증을 거치므로 |
| `g2pk-perf-polish` r1 | awkward | minor | 2번과 3번 항목(제곱으로 느려지는 곳)을 정리합니다. | 번호 목록 안에서 '2번과 3번'이 진행 순서의 단계를 가리키는지 본문 섹션을 가리키는지 헷갈립니다. 괄호 설명도 3번 섹션에만 맞습니다. | 위 2절(쓰지 않는 문자열 생성)과 3절(제곱으로 느려지는 곳)을 정리합니다. |
| `g2pk-perf-polish` r2 | literal | minor | 가장 비싼 실수가 됩니다 | 영어 'the most expensive mistake'를 낱말대로 옮긴 표현이라 한국어 개발자가 쓰는 말투가 아님 | 성능을 가장 크게 떨어뜨리는 실수가 됩니다 / 가장 큰 손해를 봅니다 |
| `kobert-files-polish` r1 | awkward | minor | MD5 앞 10자리로 검증해 다시 쓰고 | '다시 쓰고'는 캐시된 파일을 재사용한다는 뜻이지만, 파일을 다시 기록한다는 뜻으로도 읽힐 수 있습니다. | MD5 앞 10자리로 검증한 뒤 그 파일을 그대로 쓰고 |
| `kobert-files-polish` r2 | awkward | minor | `[CLS]`/`[SEP]` 등 BERT식 특수 토큰, 입력 구성, 토큰 타입 ID를 BERT 방식으로 처리하며 | 한 문장 안에서 'BERT식'과 'BERT 방식으로'가 겹칩니다. 그래서 무엇을 BERT 방식으로 처리한다는 것인지 다시 읽게 됩니다. | `[CLS]`, `[SEP]` 같은 특수 토큰과 입력 구성, 토큰 타입 ID를 BERT 방식으로 처리하며 |
| `koelectra-upgrade-polish` r1 | awkward | major | 이 코드는 4.x와 5.x 사이의 중간 단계 없이 3.3.1에서 바로 건너뛰게 됩니다. | 무엇이 어디로 건너뛰는지 안 보입니다. '4.x와 5.x 사이의 중간 단계'라는 말 때문에 4.x를 건너뛴다는 건지, 3.3.1에서 5.x로 바로 간다는 건지 알기 어렵습니다. | 이 코드는 3.3.1에서 중간 버전을 거치지 않고 한 번에 크게 올라가게 됩니다. |
| `koelectra-upgrade-polish` r1 | awkward | minor | `tf.nn.dropout(x, 1.0 - dropout_prob)`는 `compat.v1`의 `keep_prob` 의미입니다. | 주어인 함수 호출이 '의미입니다'로 끝나서 주어와 서술어가 맞지 않습니다. 두 번째 인자를 keep_prob로 넘긴다는 뜻이 바로 읽히지 않습니다. | `tf.nn.dropout(x, 1.0 - dropout_prob)`는 두 번째 인자를 `compat.v1`의 `keep_prob`로 넘깁니다. |
| `koelectra-upgrade-polish` r1 | awkward | minor | 순서는 `tf.contrib` 제거, 데이터 API 정리, 의존성 수정이고 Python은 3.11 이하입니다. | 작업 순서와 Python 버전 조건이 한 문장에 억지로 묶여 있어 두 내용의 관계가 어색합니다. | `tf.contrib` 제거, 데이터 API 정리, 의존성 수정 순서로 진행하며, Python은 3.11 이하를 써야 합니다. |
| `koelectra-upgrade-polish` r2 | awkward | major | 이름이 어긋나면 기존 체크포인트가 오류 없이 로드되지 않습니다. | '오류 없이'와 '로드되지 않습니다'가 한 문장에 묶여, 오류 없이는 로드할 수 없다는 뜻인지 오류도 없이 가중치가 빠진다는 뜻인지 헷갈립니다. | 이름이 어긋나면 오류는 나지 않지만 기존 체크포인트의 가중치가 제대로 로드되지 않습니다. |
| `koelectra-upgrade-polish` r2 | awkward | major | 이 코드는 4.x와 5.x 사이의 중간 단계 없이 3.3.1에서 바로 건너뛰게 됩니다. | '4.x와 5.x 사이의 중간 단계'가 무엇을 가리키는지, 어디로 건너뛴다는 것인지가 분명하지 않아 다시 읽어야 합니다. | 이 코드를 바로 최신으로 올리면 3.3.1에서 4.x를 거치지 않고 한 번에 넘어가게 됩니다. |
| `koelectra-upgrade-polish` r2 | translationese | minor | 에러 없이 평가가 건너뛰어질 수 있습니다. | '건너뛰어질'은 피동이 겹쳐 어색합니다. | 에러 없이 평가를 건너뛸 수 있습니다. |
| `koelectra-upgrade-polish` r2 | awkward | minor | 순서는 `tf.contrib` 제거, 데이터 API 정리, 의존성 수정이고 Python은 3.11 이하입니다. | 작업 순서와 Python 버전 조건이 한 문장에 엉켜 있어 문장이 매끄럽게 이어지지 않습니다. | `tf.contrib` 제거, 데이터 API 정리, 의존성 수정 순으로 진행하며, Python은 3.11 이하를 써야 합니다. |
| `korpora-bug-polish` r1 | awkward | minor | `Korpora.fetch(['nsmc','korsts'])`는 `AttributeError`입니다. | 호출이 오류 자체라고 말하는 문장이 되어 주어와 서술어가 어긋납니다. | `Korpora.fetch(['nsmc','korsts'])`를 호출하면 `AttributeError`가 납니다. |
| `korpora-bug-polish` r1 | awkward | minor | 경로가 `namiwiki`로 오타입니다. | '경로가 ~로 오타입니다'는 주어와 서술어가 어긋나 어색합니다. | 경로에 `namiwiki`라는 오타가 있습니다. |
| `korpora-bug-polish` r1 | awkward | minor | 라벨이나 짝이 다른 데이터도 같다고 나옵니다. | '짝'이 pair 텍스트를 가리키는지 바로 알기 어렵습니다. | 라벨이나 쌍을 이루는 문장이 달라도 같은 데이터로 판단합니다. |
| `korpora-bug-polish` r2 | awkward | minor | 라벨이나 짝이 다른 데이터도 같다고 나옵니다 | '짝'이 문장 쌍(pair)을 가리킨다는 것이 바로 드러나지 않아 한 번 더 읽게 됩니다. | 라벨이나 문장 쌍이 다른 데이터도 같다고 판단합니다 |
| `korpora-bug-polish` r2 | awkward | minor | 안내 예외(`NotImplementedError`)도 없이 | '안내 예외'는 개발자가 흔히 쓰는 표현이 아닙니다. 지원하지 않는다는 사실을 알려 주는 예외라는 뜻이 바로 읽히지 않습니다. | 지원하지 않는다는 예외(`NotImplementedError`)도 없이 |
| `py-hanspell-upgrade-polish` r1 | awkward | minor | `requests`를 최신 범위로 업그레이드 | '범위'와 '업그레이드'가 어울리지 않습니다. 버전 범위를 지정한다는 뜻인지, 최신 버전으로 올린다는 뜻인지 바로 알기 어렵습니다. | `requests`를 최신 버전으로 올리고 버전 범위를 지정 |
| `py-hanspell-upgrade-polish` r2 | awkward | minor | `from . import __version__`은 사용하지 않습니다. | 주변 항목이 '~로 바꿉니다' 같은 지시형이라 이 문장도 '쓰지 않겠다'는 방침처럼 읽힙니다. 실제 뜻은 import만 해 두고 어디에서도 쓰지 않는다는 것이라 다시 읽게 됩니다. | `from . import __version__`은 import만 하고 쓰지 않으니 지워도 됩니다. |
| `toss-use-funnel-bug-polish` r1 | awkward | minor | 확신이 높은 순서로 정리했습니다. | '확신이 높다'는 한국어에서 잘 쓰지 않는 조합이고, 무엇에 대한 확신인지도 흐립니다. | 버그일 가능성이 큰 순서로 정리했습니다. |
| `toss-use-funnel-bug-polish` r1 | awkward | minor | `setState`의 updater를 갱신 전 `state`로 한 번, React가 한 번 더 호출함 | 앞부분에는 누가 호출하는지가 빠져 있고 뒷부분의 주어는 React여서, 한 문장 안에서 주어가 어긋나 다시 읽게 됩니다. | `setState`가 updater를 갱신 전 `state`로 한 번 호출하고, React가 한 번 더 호출함 |
| `toss-use-funnel-bug-polish` r1 | literal | minor | 영원히 false가 되어 | 영어 'forever'를 그대로 옮긴 말투라 코드 설명에는 과장되게 읽힙니다. | 계속 false가 되어 |
| `toss-use-funnel-bug-polish` r2 | awkward | minor | 그래서 이 문제가 드러나지 않거나 우연히 통과할 수 있습니다. | '이 문제가'가 '통과할 수 있습니다'의 주어로도 걸려 주어와 서술어가 맞지 않습니다. 통과하는 것은 문제가 아니라 테스트입니다. | 그래서 이 문제가 드러나지 않고 테스트가 우연히 통과할 수 있습니다. |
| `toss-use-funnel-bug-polish` r2 | awkward | minor | `setState`의 updater를 갱신 전 `state`로 한 번, React가 한 번 더 호출함 | 앞 절에는 주어가 없고 뒤 절의 주어는 React여서, 누가 updater를 두 번 호출하는지 다시 읽어야 알 수 있습니다. | `setState`가 updater를 갱신 전 `state`로 한 번 호출하고, React가 한 번 더 호출함 |
| `toss-use-funnel-bug-polish` r2 | translationese | minor | 모든 `useFunnel` 사용자가 `QueryClientProvider`와 `Suspense`를 요구받음 | '요구받다'는 영어 피동(are required to)을 따른 표현입니다. 한국어 개발자라면 주어를 바꿔 능동으로 씁니다. | `useFunnel`을 쓰기만 해도 `QueryClientProvider`와 `Suspense`가 필요함 |

## N3

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `g2pk-perf-polish` r1 | awkward | minor | 서버나 CLI에서 `G2p()`를 요청마다 새로 만들면 가장 손해가 큰 실수입니다. | '~하면'으로 시작한 조건절이 '실수입니다'로 끝나 주어와 서술어가 맞지 않습니다. | 서버나 CLI에서 `G2p()`를 요청마다 새로 만드는 것이 가장 손해가 큰 실수입니다. |
| `g2pk-perf-polish` r2 | literal | minor | 고유 음절마다 | 'unique syllables'를 그대로 옮긴 표현입니다. 이 문맥에서 '고유'라고 하면 '서로 다른'이라는 뜻이 바로 읽히지 않습니다. | 서로 다른 음절마다 |
| `kobert-files-polish` r1 | awkward | minor | MD5 앞 10자리로 검증해 다시 쓰고 | '다시 쓰고'는 '재사용한다'로도 '파일을 새로 쓴다'로도 읽혀서 독자가 문장을 다시 읽게 됩니다. | MD5 앞 10자리로 검증한 뒤 그 파일을 그대로 쓰고 |
| `kobert-files-polish` r2 | awkward | minor | MD5 앞 10자리로 검증해 다시 쓰고 | '다시 쓰고'는 '재사용한다'는 뜻인데, 파일을 다시 기록(덮어쓰기)한다는 뜻으로 잘못 읽힐 수 있습니다. | MD5 앞 10자리로 검증한 뒤 그 파일을 그대로 사용하고 |
| `koelectra-upgrade-polish` r1 | awkward | major | 이 코드는 4.x와 5.x 사이의 중간 단계 없이 3.3.1에서 바로 건너뛰게 됩니다. | '4.x와 5.x 사이의 중간 단계'가 무엇인지, 어디로 건너뛴다는 건지 바로 읽히지 않습니다. 3.3.1에서 최신 버전으로 중간 버전을 거치지 않고 올린다는 뜻을 다시 읽어서 짐작해야 합니다. | 이 코드는 3.3.1에서 중간 버전을 거치지 않고 4.x 후반이나 5.x로 한 번에 올라가게 됩니다. |
| `koelectra-upgrade-polish` r1 | translationese | minor | 에러 없이 평가가 건너뛰어질 수 있습니다. | '건너뛰어지다'라는 피동이 어색합니다. | 에러 없이 평가를 건너뛸 수 있습니다. |
| `koelectra-upgrade-polish` r1 | literal | minor | 새 `PreTrainedTokenizer` 규약에 맞춥니다 | contract나 convention을 옮긴 '규약'은 한국어 개발자가 이런 맥락에서 잘 쓰지 않는 말입니다. | 새 `PreTrainedTokenizer` 인터페이스에 맞춥니다 |
| `koelectra-upgrade-polish` r2 | awkward | major | 이 코드는 4.x와 5.x 사이의 중간 단계 없이 3.3.1에서 바로 건너뛰게 됩니다. | '4.x와 5.x 사이의 중간 단계'가 무엇을 가리키는지 알 수 없습니다. 3.3.1에서 무엇을 건너뛴다는 건지도 문장에서 읽히지 않습니다. | 이 코드는 3.3.1에서 4.x를 거치지 않고 한 번에 올라가야 하는 상황입니다. |
| `koelectra-upgrade-polish` r2 | awkward | minor | 이름이 어긋나면 오류 없이 기존 체크포인트가 로드되지 않습니다. | '오류 없이'와 '로드되지 않습니다'가 한 문장에 붙어 있어 무슨 뜻인지 한 번 더 읽어야 합니다. 오류는 나지 않는데 값이 로드되지 않는다는 뜻이 바로 들어오지 않습니다. | 이름이 어긋나면 오류는 나지 않지만 기존 체크포인트 값이 로드되지 않습니다. |
| `koelectra-upgrade-polish` r2 | awkward | minor | 형태소 분석 없이 오류 없이 넘어갑니다 | '~없이'가 두 번 이어져서 어색하고, 문장이 한 번에 읽히지 않습니다. | 오류도 내지 않고 형태소 분석만 건너뜁니다 |
| `koelectra-upgrade-polish` r2 | awkward | minor | 순서는 `tf.contrib` 제거, 데이터 API 정리, 의존성 수정이고 Python은 3.11 이하입니다. | 작업 순서와 Python 버전 조건이 '~이고'로 한 문장에 묶여 있어, 서로 관계없는 내용이 나란히 놓인 것처럼 읽힙니다. | `tf.contrib` 제거, 데이터 API 정리, 의존성 수정 순서로 진행하며, Python은 3.11 이하를 써야 합니다. |
| `korpora-bug-polish` r1 | coined | minor | 안내 예외(`NotImplementedError`)도 없이 | '안내 예외'는 업계에서 쓰는 말이 아닙니다. 사용자에게 지원하지 않는다고 알려 주는 예외를 가리키는 듯하지만, 읽는 사람이 뜻을 한 번 짐작해야 합니다. | 지원하지 않는다는 예외(`NotImplementedError`)도 없이 |
| `korpora-bug-polish` r1 | awkward | minor | 라벨이나 짝이 다른 데이터도 같다고 나옵니다. | '짝'이 문장 쌍(pair)을 뜻하는지 바로 알기 어렵습니다. 기술 문서에서 이런 뜻으로 '짝'을 쓰는 경우는 드뭅니다. | 라벨이나 문장 쌍이 달라도 같은 데이터로 판단됩니다. |
| `korpora-bug-polish` r1 | coined | minor | 스냅샷에서만 빠진 것일 수도 있습니다. | 앞에서 설명한 적 없는 '스냅샷'이 갑자기 나옵니다. 어떤 스냅샷을 말하는지 알 수 없습니다. | 전달받은 코드 사본에서만 빠진 것일 수도 있습니다. |
| `korpora-bug-polish` r2 | coined | minor | 안내 예외(`NotImplementedError`) | '안내 예외'는 업계에서 쓰는 말이 아니고 글쓴이가 붙인 이름입니다. 무엇을 안내하는 예외인지 바로 알기 어렵습니다. | 지원하지 않는다고 알려 주는 예외(`NotImplementedError`) |
| `korpora-bug-polish` r2 | awkward | minor | 라벨이나 짝이 다른 데이터도 같다고 나옵니다. | '짝'이 문장쌍의 두 번째 문장(pair)을 가리킨다는 것이 바로 읽히지 않습니다. | 라벨이나 쌍을 이루는 문장이 달라도 같은 데이터로 판단합니다. |
| `py-hanspell-upgrade-polish` r1 | literal | minor | `test_long_paragraph`에는 단언이 없습니다 | assertion을 '단언'으로 옮긴 말입니다. 한국어 개발자는 대개 assert문이나 검증 코드라고 하므로 읽다가 잠깐 멈칫할 수 있습니다. | `test_long_paragraph`에는 assert문이 없습니다 |
| `py-hanspell-upgrade-polish` r1 | awkward | minor | 같은 종류의 취약점이 있습니다 | '취약점'은 보통 보안 취약점으로 읽힙니다. 여기서 말하려는 뜻은 응답 형식이 바뀌면 깨지기 쉽다는 것이므로 문맥과 맞지 않습니다. | 같은 이유로 깨지기 쉽습니다 |
| `py-hanspell-upgrade-polish` r1 | noun_chain | minor | 재현용 고정은 별도의 lock 파일로 분리하는 것이 좋습니다 | '재현용 고정'에서 무엇을 고정하는지가 빠져 있어 바로 읽히지 않습니다. | 재현할 수 있도록 정확한 버전은 별도의 lock 파일에 고정하는 것이 좋습니다 |
| `py-hanspell-upgrade-polish` r2 | noun_chain | minor | 재현용 고정은 별도 lock 파일로 분리하는 것이 좋습니다 | '재현용 고정'이 명사로만 이어져 있어서 무엇을 고정한다는 뜻인지(재현을 위해 정확한 버전을 고정한다는 것) 한 번에 읽히지 않습니다. | 재현을 위해 정확한 버전을 고정하는 일은 별도 lock 파일에 맡기는 것이 좋습니다 |
| `py-hanspell-upgrade-polish` r2 | noun_chain | minor | 문자열 치환 파싱도 | 명사 세 개가 붙어 있어서 '문자열 치환으로 하는 파싱'이라는 관계가 바로 드러나지 않습니다. | 문자열을 치환해 파싱하는 부분도 |
| `toss-use-funnel-bug-polish` r1 | awkward | minor | 확신이 높은 것부터 정리했습니다. | '확신'은 보통 '높다'와 함께 쓰지 않습니다. 또 이 문장에서 말하려는 것은 글쓴이의 확신보다 버그일 가능성입니다. | 버그일 가능성이 큰 것부터 정리했습니다. |
| `toss-use-funnel-bug-polish` r2 | literal | minor | `deepEqual(nextStateRef.current, state)`가 영원히 false가 되어 | 영어 'forever false'를 그대로 옮긴 말이다. 조건이 계속 거짓이라는 뜻으로 한국어 개발자는 '영원히'를 잘 쓰지 않는다. | `deepEqual(nextStateRef.current, state)`가 계속 false가 되어 |
| `toss-use-funnel-bug-polish` r2 | awkward | minor | 확신이 높은 순서로 정리했습니다. | 'confidence'를 옮긴 듯한 '확신이 높다'가 어색하고, 무엇의 순서인지 바로 읽히지 않는다. | 버그일 가능성이 높은 순서로 정리했습니다. |
