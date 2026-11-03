# 한국어 독자가 멈칫하는 곳

자동 생성 파일이다(`node scripts/eval/natural.mjs summary --out 2026-11-03-korean-natural-polish2`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.

| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | literal | coined | noun_chain | symbol | translationese | awkward | 글에 없는 인용 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 24 | 4 | 41(0) | 16 | 1 | 3 | 2 | 3 | 16 | 0 |
| N3 | 24 | 10 | 21(0) | 5 | 0 | 2 | 2 | 3 | 9 | 0 |
| N4 | 24 | 7 | 28(0) | 6 | 0 | 0 | 2 | 3 | 17 | 0 |

표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.

## A

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `docker-volume-question-polish` r1 | literal | minor | 조용히 만들어 버리지만 | 영어 'silently creates'를 그대로 옮긴 말이다. 한국어 개발자는 보통 '경고 없이'라고 쓴다. | 아무 경고 없이 만들어 버리지만 |
| `docker-volume-question-polish` r1 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않도록 | '컨테이너의 것'은 영어 'the container's (one)'를 따라 쓴 대명사 표현이라 한 번에 읽히지 않는다. | 호스트 디렉터리가 컨테이너 안의 node_modules를 덮어쓰지 않도록 |
| `docker-volume-question-polish` r1 | symbol | minor | **소스 코드를 실시간으로 편집하고 반영**하고 싶다면 → **바인드 마운트** | 조건절까지 문장으로 쓰다가 화살표가 서술어를 대신한다. 세 번째 항목은 '~입니다'로 끝나서 같은 목록 안에서 문체도 섞인다. | 소스 코드를 실시간으로 편집하고 반영하려면 바인드 마운트를 쓰세요. |
| `docker-volume-question-polish` r2 | literal | minor | 조용히 만들어 버리지만 | 영어 'silently creates'를 낱말대로 옮긴 표현입니다. 한국어 개발자라면 '경고 없이' 또는 '알리지 않고'라고 씁니다. | 경고 없이 만들어 버리지만 |
| `docker-volume-question-polish` r2 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않도록 | '컨테이너의 것'은 영어 'the container's'를 따른 대명사 표현이라 한국어로는 무겁게 읽힙니다. | 호스트 디렉터리가 컨테이너 안의 node_modules를 덮어쓰지 않도록 |
| `git-rebase-question-polish` r1 | literal | minor | 대상 브랜치의 최신 끝으로 | 브랜치 끝의 커밋을 가리키는 영어 'tip'을 낱말대로 옮긴 말로 보입니다. 한국어 개발자는 보통 '최신 커밋 위로'라고 씁니다. | 대상 브랜치의 최신 커밋 위로 |
| `git-rebase-question-polish` r2 | literal | minor | 대상 브랜치의 최신 끝으로 | 브랜치 tip을 낱말대로 옮긴 말이라 '끝'이 무엇을 가리키는지 잠깐 생각하게 된다. | 대상 브랜치의 최신 커밋 위로 |
| `git-rebase-question-polish` r2 | awkward | minor | rebase 사고(force push로 인한 커밋 유실 등)의 비용이 더 큽니다 | 무엇보다 비용이 더 큰지 비교 대상이 없어 문장이 매끄럽게 끝나지 않는다. | rebase로 사고가 나면(force push로 커밋이 사라지는 등) 얻는 이득보다 피해가 더 큽니다 |
| `hangul-js-pr-polish` r1 | literal | minor | 고정(pin)하는 테스트 | 영어 'pin the behavior'를 그대로 옮긴 말이라 괄호 속 영어를 봐야 뜻이 잡힙니다. | 현재 동작을 그대로 확인하는 테스트 |
| `hangul-js-pr-polish` r1 | coined | minor | needle을 이스케이프 없이 | 'needle'이 코드 표기 없이 나와서, 매개변수 이름인지 영어 관용어(haystack/needle)인지 바로 알기 어렵습니다. | 검색어(`needle`)를 이스케이프하지 않고 |
| `hangul-js-pr-polish` r1 | noun_chain | minor | 별칭 동일성 | 명사 두 개만 붙여 놓아서 무엇이 무엇과 같은지 확인한다는 뜻이 바로 읽히지 않습니다. | `ds`가 `disassembleToString`과 같은 함수인지 |
| `hangul-js-pr-polish` r2 | literal | minor | needle을 이스케이프하지 않고 | 검색 대상 문자열을 needle이라고 부르는 영어 관용 표현(needle/haystack)을 그대로 썼습니다. 한국어 문장에서는 무엇을 가리키는지 한 번에 읽히지 않습니다. | 검색어를 이스케이프하지 않고 |
| `khaiii-report-polish` r1 | literal | minor | 조용히 버려집니다 | 영어 'silently dropped'를 낱말대로 옮긴 말입니다. 한국어 개발자는 보통 '오류나 경고 없이 버려진다'처럼 씁니다. | 아무 경고 없이 버려집니다 |
| `khaiii-report-polish` r1 | awkward | minor | 위 항목들을 고정해 둘 단위 테스트 | '고정해 둔다'가 무엇을 하는지 바로 안 읽힙니다. 수정한 동작이 다시 깨지지 않게 막는다는 뜻으로 보입니다. | 위 항목들이 다시 깨지지 않도록 확인하는 단위 테스트 |
| `khaiii-report-polish` r1 | noun_chain | minor | dropout 결정성 테스트 | 명사를 늘어놓기만 해서 무엇을 확인하는 테스트인지 바로 알기 어렵습니다. 'determinism test'를 그대로 옮긴 느낌도 있습니다. | 추론 결과가 매번 같은지 확인하는 dropout 테스트 |
| `khaiii-report-polish` r2 | literal | minor | 조용히 버려집니다 | 영어 'silently dropped'를 낱말 그대로 옮긴 표현입니다. 한국어 개발자는 보통 '경고 없이', '아무 오류 없이'라고 씁니다. | 아무 경고 없이 버려집니다 |
| `khaiii-report-polish` r2 | literal | minor | 위 항목들을 고정할 단위 테스트가 필요합니다 | '고정할'은 'pin down/lock in'을 옮긴 말로 보입니다. 테스트가 무엇을 고정한다는 뜻인지 바로 읽히지 않습니다. | 위 항목들이 다시 깨지지 않도록 확인하는 단위 테스트가 필요합니다 |
| `khaiii-report-polish` r2 | noun_chain | minor | dropout 결정성 테스트 | 명사를 이어 붙여 무엇을 확인하는 테스트인지 한 번 더 생각해야 합니다. 같은 입력이면 같은 결과가 나오는지 확인한다는 뜻입니다. | 추론 결과가 매번 같은지 확인하는 테스트 |
| `kobert-onboard-polish` r1 | literal | minor | 조용히 틀린 결과가 나올 수 있습니다 | 영어 'silently'를 낱말대로 옮긴 표현이라 한국어 문장으로는 어색합니다. 바로 앞에서 '에러 없이 넘어갑니다'라고 이미 말했습니다. | 오류 없이 틀린 결과가 나올 수 있습니다 |
| `kobert-onboard-polish` r2 | literal | minor | 조용히 틀린 결과가 나올 수 있습니다 | 영어 'silently'를 낱말대로 옮긴 표현입니다. 뜻은 통하지만 한국어 개발자는 이렇게 잘 쓰지 않습니다. | 아무 경고 없이 틀린 결과가 나올 수 있습니다 |
| `kobert-onboard-polish` r2 | literal | minor | 하위 사용처가 깨집니다 | 'downstream callers'를 옮긴 말이라 '하위 사용처'가 무엇을 가리키는지 한 번 더 생각하게 됩니다. | 이 출력을 받아 쓰는 코드가 깨집니다 |
| `lease-question-polish` r1 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 갚는 돈이 아닌데 '상환액'에 넣어서 낱말이 문맥과 맞지 않습니다. | 월 고정 주거비(대출 이자 + 월세 등) |
| `lease-question-polish` r1 | awkward | minor | 월세를 아껴 종잣돈을 모으는 구조가 중요합니다 | 개인 지출 계획에 '구조'를 쓰니 어색합니다. 무엇의 구조인지 바로 읽히지 않습니다. | 주거비를 아껴 종잣돈을 모을 수 있는지가 중요합니다 |
| `lease-question-polish` r1 | awkward | minor | 이동 가능성이 크다면 | 앞에서는 '이직이나 이사'라고 했는데 여기서는 '이동'으로 뭉뚱그렸습니다. 주거를 옮긴다는 뜻으로 '이동'을 쓰면 어색합니다. | 이사할 가능성이 크다면 |
| `lease-question-polish` r2 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 갚는 돈이 아닌데 '상환액'에 넣어서 낱말이 내용과 맞지 않습니다. | 월 주거비(이자 + 월세 등) |
| `lease-question-polish` r2 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리와 금액인 환산액을 바로 비교해서 다시 읽게 됩니다. | 전세대출 이자가 비슷한 집의 월세보다 적고 |
| `lease-question-polish` r2 | literal | minor | 월세나 보증금이 작은 반전세가 유연합니다 | 'flexible'을 그대로 옮긴 느낌입니다. 집을 두고 '유연하다'는 말은 잘 쓰지 않습니다. | 월세나 보증금이 작은 반전세가 옮기기 편합니다 |
| `lease-question-polish` r2 | awkward | minor | 월세를 아껴 종잣돈을 모으는 구조가 중요합니다 | '구조'는 문맥에 맞지 않는 낱말입니다. 바로 뒤에서 전세와 월세를 비교하라고 하는데 '월세를 아껴'라고 해서 뜻이 흐려집니다. | 주거비를 줄여 종잣돈을 모으는 것이 중요합니다 |
| `toss-ky-onboard-polish` r1 | awkward | minor | `ky-universal`이 top-level await를 사용해서 CJS로 변환할 수 없기 때문이며, 그 이유는 파일 상단 주석에 적혀 있습니다. | '~때문이며' 바로 뒤에 '그 이유는'이 또 나와 이유를 두 번 말하는 문장이 됩니다. 그래서 잠깐 다시 읽게 됩니다. | `ky-universal`은 top-level await를 사용해서 CJS로 변환할 수 없기 때문입니다. 이 내용은 파일 상단 주석에 적혀 있습니다. |
| `toss-ky-onboard-polish` r2 | translationese | minor | `dts.resolve: true`도 같은 전제에 기반합니다. | 'is based on the same assumption'을 그대로 옮긴 말이라 무겁습니다. 무엇이 어떤 전제를 따르는지도 바로 읽히지 않습니다. | `dts.resolve: true` 설정도 이 패키지들이 번들된다는 전제를 따릅니다. |
| `toss-ky-onboard-polish` r2 | awkward | minor | `jsdom` 환경은 Node 전역이 실제 Node와 달라서 | 주어 '`jsdom` 환경은'에 맞는 서술어가 없고, 'Node 전역이 실제 Node와' 다르다는 비교가 꼬여 있어 다시 읽게 됩니다. | `jsdom` 환경에서는 전역 객체가 실제 Node와 달라서 |
| `toss-sentry-pr-polish` r1 | literal | minor | 소스에서 확인한 테스트 공백을 기준으로 | 'test gap'을 낱말대로 옮긴 표현입니다. 한국어 개발자는 '테스트 공백'이라고 잘 쓰지 않아서 읽다가 잠깐 멈추게 됩니다. | 소스에서 확인한, 테스트가 빠진 부분을 기준으로 |
| `toss-sentry-pr-polish` r1 | awkward | minor | 따라서 lazy loading 전후로 `window.Sentry`가 교체되어도 새 객체의 메서드를 호출한다. 파일 안의 `FIXME` 주석이 설명하는 핵심 동작입니다. | 같은 목록 항목 안에서 '~한다'와 '~입니다'가 섞여 있어 말투가 흔들립니다. | 따라서 lazy loading 전후로 `window.Sentry`가 교체되어도 새 객체의 메서드를 호출한다(파일 안의 `FIXME` 주석이 설명하는 핵심 동작). |
| `toss-sentry-pr-polish` r2 | literal | minor | 소스에서 확인한 테스트 공백 | test gap을 그대로 옮긴 말이라 한국어 개발자는 '테스트 공백'이라고 잘 쓰지 않습니다. | 소스에서 확인한, 테스트가 없는 부분 |
| `toss-sentry-pr-polish` r2 | literal | minor | 테스트만 추가해 이 부분을 보호합니다 | 테스트가 코드를 '보호한다'는 영어식 표현(protect)을 그대로 옮겼습니다. | 테스트만 추가해 이 부분의 회귀를 막습니다 |
| `toss-sentry-pr-polish` r2 | awkward | minor | 새 객체를 호출합니다 | 호출하는 대상은 객체가 아니라 객체의 메서드라서 낱말이 맞지 않습니다. | 새 객체의 메서드를 호출합니다 |
| `toss-storage-report-polish` r1 | awkward | minor | 타입이 사실과 달라집니다 | 타입이 '사실'과 다르다는 말은 어색합니다. 여기서 말하려는 것은 선언한 타입과 실제로 저장된 값이 맞지 않는다는 점입니다. | 선언한 타입과 실제 값이 달라집니다 |
| `toss-storage-report-polish` r2 | awkward | minor | 타입이 사실과 달라집니다 | '사실'은 타입과 비교하기에 맞지 않는 말입니다. 무엇과 어긋난다는 건지 바로 읽히지 않습니다. | 선언된 타입과 실제 값이 달라집니다 |
| `workout-question-polish` r1 | awkward | minor | 극심한 숨참이 느껴지면 | '숨참'은 '숨차다'를 억지로 명사로 만든 말이라 평소에 쓰지 않고 어색하게 읽힙니다. | 숨이 몹시 차면 |
| `workout-question-polish` r1 | symbol | minor | 주 3회 × 30분은 90분이라 | 문장으로 설명하는 자리인데 곱셈 기호가 서술어 역할을 대신하고 있습니다. | 주 3회, 30분씩 하면 일주일에 90분이라 |
| `workout-question-polish` r2 | awkward | minor | 극심한 숨참이 느껴지면 | '숨참'은 거의 쓰지 않는 명사형이다. '극심한'과 붙어 있어서 어색하다. | 숨이 심하게 차면 |

## N3

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `db-index-question-polish` r2 | awkward | minor | B-Tree 인덱스는 페이지 분할(page split)이나 재정렬이 일어날 수 있습니다. | 'B-Tree 인덱스는'을 주어로 두고 서술어를 '일어날 수 있습니다'로 맺어서 주어와 서술어가 잘 맞지 않습니다. 페이지 분할은 인덱스 '안에서' 일어나는 일이라 장소를 나타내는 조사가 어울립니다. | B-Tree 인덱스에서는 페이지 분할(page split)이나 재정렬이 일어날 수 있습니다. |
| `docker-volume-question-polish` r2 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않게 막아 주고 | 영어의 'the container's'를 '컨테이너의 것'으로 옮긴 대명사 구조라서, 무엇을 가리키는지 한 번 더 생각하게 됩니다. | 호스트의 node_modules가 컨테이너 안의 node_modules를 덮어쓰지 않게 막아 주고 |
| `git-rebase-question-polish` r2 | awkward | minor | 써 드릴 수 있습니다. | 본문은 모두 '~다' 평서체로 쓰다가 마지막 문장만 '~습니다' 높임체로 바뀌어 한 글 안에서 말투가 섞인다. | 마지막 문장을 본문 말투에 맞추거나, 본문 전체를 한 가지 말투로 통일한다. 예: '…알려 주면 그에 맞춰 규칙 문구를 구체적으로 써 줄 수 있다.' |
| `hangul-js-pr-polish` r1 | literal | minor | 현재 동작을 고정하는(pin) 테스트 | pin을 그대로 옮긴 '고정하는'이라서 괄호 속 영어를 보고 나서야 뜻이 잡힙니다. | 현재 동작을 그대로 기대값으로 삼는 테스트 |
| `hangul-js-pr-polish` r1 | literal | minor | needle을 이스케이프하지 않고 | 검색어를 뜻하는 영어 은어 needle을 코드 표기도 설명도 없이 썼습니다. 한국어 글에서는 잘 쓰지 않는 말입니다. | 검색어를 이스케이프하지 않고 |
| `hangul-js-pr-polish` r2 | literal | minor | 현재 동작을 고정하는 테스트 | 영어 'pin the current behavior'를 옮긴 표현입니다. 뜻은 짐작할 수 있지만, 한국어 개발자는 보통 이렇게 말하지 않습니다. | 현재 동작을 그대로 정답으로 삼는 테스트 |
| `khaiii-report-polish` r1 | literal | minor | 라이브러리를 찾는 대체 경로가 동작하지 않습니다 | fallback path를 옮긴 말이라 '경로'가 파일 경로로 읽힐 수 있습니다. 실제로는 라이브러리를 다시 찾는 방법(로직)을 가리킵니다. | 기본 위치에서 라이브러리를 못 찾았을 때 다시 찾는 로직이 동작하지 않습니다 |
| `khaiii-report-polish` r1 | noun_chain | minor | 패치 적용의 경계 케이스 테스트 | '의'로 명사를 이어 붙여서 무엇을 테스트하는지 한 번에 읽히지 않습니다. | 패치를 적용할 때 경계 케이스를 다루는 테스트 |
| `khaiii-report-polish` r2 | noun_chain | minor | dropout 결정성 테스트 | '결정성'은 determinism을 옮긴 말이라 명사가 이어지면서 무엇을 확인하는 테스트인지 바로 읽히지 않습니다. | 추론 결과가 매번 같은지 확인하는 테스트 |
| `khaiii-report-polish` r2 | awkward | minor | 파일 핸들을 닫지 않는 곳이 여러 곳입니다 | '곳이 여러 곳입니다'처럼 같은 말이 겹쳐서 문장이 어색합니다. | 파일 핸들을 닫지 않는 곳이 여럿 있습니다 |
| `kobert-onboard-polish` r2 | awkward | minor | 12층, 768 units 등 | layer를 '층'으로 옮기고 바로 옆에 영어 'units'를 그대로 써서 한 괄호 안에 번역어와 영어가 섞였다. 한국어 개발자는 보통 '레이어 12개, 히든 크기 768'처럼 쓴다. | 레이어 12개, 히든 크기 768 등 |
| `lease-question-polish` r1 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리를 금액인 월세 환산액과 견주고 있어서, 무엇과 무엇을 비교하는지 다시 읽게 됩니다. | 전세대출 이자가 월세보다 적고 |
| `lease-question-polish` r1 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빚을 갚는 돈이 아닌데 '상환액'에 넣어서 낱말이 문맥에 맞지 않습니다. | 월 주거비(이자 + 월세 등) |
| `lease-question-polish` r2 | symbol | minor | **전세 = 보증금 × 대출금리(또는 보증금을 다른 데 썼을 때의 수익률)**가 실질 비용입니다. | `=` 기호로 쓴 식을 문장 주어로 쓰고 바로 뒤에 '~가 실질 비용입니다'를 붙였다. '전세가 ~가 실질 비용'처럼 읽혀 문장이 어긋난다. | 전세의 실질 비용은 **보증금 × 대출금리**(또는 보증금을 다른 데 썼을 때 얻을 수익률)입니다. |
| `lease-question-polish` r2 | awkward | minor | 월 상환액(이자 + 월세 등)이 | 월세는 갚는 돈이 아니라서 '상환액'에 넣으면 낱말이 맞지 않는다. | 매달 나가는 주거비(대출 이자, 월세 등)가 |
| `toss-ky-onboard-polish` r2 | awkward | minor | `dts.resolve: true`도 같은 전제입니다. | '같은 전제'가 무엇을 가리키는지(의존성이 번들된다는 가정) 바로 이어지지 않습니다. 설정이 '전제이다'라고 해서 주어와 서술어도 어긋납니다. | `dts.resolve: true`도 이 패키지들이 번들된다는 가정에 맞춘 설정입니다. |
| `toss-ky-onboard-polish` r2 | awkward | minor | 폴리필 목적의 side-effect import는 동작하지 않는다고 보세요. | 바로 앞 문장은 '부수효과'라고 쓰고 이 문장은 'side-effect'라고 써서, 한 설명 안에서 같은 개념을 가리키는 말이 섞였습니다. | 폴리필만 하려고 export 없이 import하는 방식은 동작하지 않는다고 보세요. |
| `toss-sentry-pr-polish` r1 | literal | minor | 소스에서 확인한 테스트 공백을 기준으로 썼습니다 | 영어 test gap을 그대로 옮긴 말이라 한국어 문장에서 조금 어색합니다. 한국어 개발자라면 '테스트가 빠진 부분'이라고 쓸 가능성이 높습니다. | 소스에서 확인한 테스트가 빠진 부분을 기준으로 썼습니다 |
| `toss-storage-report-polish` r1 | translationese | minor | 선택적으로 validator 옵션을 추가하길 권합니다. | 'optionally'를 옮긴 '선택적으로'가 '추가 여부를 골라도 된다'로도, '선택 옵션으로 추가하라'로도 읽혀 잠깐 멈칫합니다. | 값을 검증하는 validator를 선택 옵션으로 받게 하길 권합니다. |
| `workout-question-polish` r2 | symbol | minor | 주 3회 × 30분은 90분이라 | 설명하는 문장 안에서 곱셈 기호 ×가 '30분씩 하면'이라는 서술어를 대신하고 있다. | 주 3회, 30분씩 하면 90분이라 |
| `workout-question-polish` r2 | translationese | minor | 5분 정도 준비운동과 정리운동을 포함하세요 | 영어 'include'를 옮긴 말투다. 한국어로는 운동을 '포함한다'보다 '한다'고 쓰는 게 자연스럽다. | 앞뒤로 5분 정도 준비운동과 정리운동을 하세요 |

## N4

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `db-index-question-polish` r1 | awkward | minor | 소량 테이블 | '소량'은 보통 물건이나 데이터의 양을 말할 때 쓰고 테이블을 꾸미는 말로는 잘 쓰지 않습니다. 한국어 개발자라면 '작은 테이블'이나 '행이 적은 테이블'이라고 씁니다. | 행이 적은 테이블 |
| `docker-volume-question-polish` r1 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않게 막아 주고 | 영어 'the container's one'을 옮긴 듯한 '컨테이너의 것'이 조금 무겁습니다. 무엇을 가리키는지도 바로 드러나지 않습니다. | 호스트 디렉터리가 컨테이너 안의 node_modules를 덮어쓰지 않게 막아 주고 |
| `docker-volume-question-polish` r2 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않게 막아 주고 | 영어 대명사 'the container's one'을 옮긴 듯한 '컨테이너의 것'이 조금 어색합니다. | 호스트 디렉터리가 컨테이너 안의 node_modules를 덮어쓰지 않게 막아 주고 |
| `git-rebase-question-polish` r1 | awkward | minor | 커밋 단위를 유지한 채 선형 히스토리가 된다 | 무엇이 선형 히스토리가 되는지 주어가 없습니다. 바로 앞 항목의 'PR 하나가 커밋 하나가 된다'와 구조가 달라서 다시 읽게 됩니다. | PR의 커밋을 그대로 유지하면서 히스토리가 일직선으로 남는다 |
| `git-rebase-question-polish` r1 | awkward | minor | force push로 커밋이 유실되는 것과 같은 rebase 사고는 피해가 더 크다 | 무엇보다 피해가 더 큰지 비교 대상이 없어 '더'가 어디에 걸리는지 바로 읽히지 않습니다. | rebase 사고(force push로 커밋이 사라지는 일 등)는 merge 사고보다 피해가 크다 |
| `git-rebase-question-polish` r2 | literal | minor | 대상 브랜치의 최신 끝으로 | 브랜치의 tip을 낱말대로 옮긴 말이라 '끝'이 무엇을 가리키는지 잠깐 생각하게 된다. | 대상 브랜치의 최신 커밋 위로 |
| `hangul-js-pr-polish` r1 | literal | minor | 현재 동작을 고정하는 테스트 | 영어 'pin the current behavior'를 낱말대로 옮긴 말이다. 뜻은 짐작되지만 한국어 개발자가 흔히 쓰는 표현은 아니다. | 현재 동작을 그대로 기대값으로 삼는 테스트 |
| `hangul-js-pr-polish` r2 | literal | minor | 현재 동작을 고정하는 테스트 | pin the current behavior를 낱말대로 옮긴 말입니다. '고정'만 보고는 현재 동작이 바뀌지 않도록 막아 두는 테스트라는 뜻이 바로 떠오르지 않습니다. | 현재 동작을 그대로 기대값으로 삼는 테스트 |
| `hangul-js-pr-polish` r2 | literal | minor | 전체 11,172자 왕복 테스트 | round-trip test를 '왕복'으로 옮겼습니다. 분해한 뒤 다시 조합하는 테스트라는 뜻이 한 번에 읽히지 않습니다. | 11,172자 전체를 분해했다가 다시 조합하는 테스트 |
| `khaiii-report-polish` r1 | literal | minor | 마지막 단어 뒤에 넣을 insert 패치는 오류 없이 버려집니다 | 'silently dropped'를 낱말대로 옮긴 표현이라, '오류 없이'가 정상 처리라는 뜻인지 아무 알림 없이 버려진다는 뜻인지 바로 읽히지 않습니다. | 마지막 단어 뒤에 넣을 insert 패치는 아무 경고 없이 버려집니다 |
| `khaiii-report-polish` r1 | awkward | minor | dropout이 매번 같은 결과를 내는지 보는 테스트 | 결과를 내는 것은 dropout이 아니라 추론입니다. 그래서 주어와 서술어가 잘 맞지 않습니다. | 같은 입력으로 추론했을 때 결과가 매번 같은지 보는 테스트 |
| `khaiii-report-polish` r2 | awkward | minor | 위 항목들을 잡아 둘 단위 테스트가 필요합니다 | 테스트가 무엇을 '잡아 두는지' 분명하지 않습니다. 버그를 다시 잡아낸다는 뜻인지, 고친 상태를 고정한다는 뜻인지 다시 읽어야 알 수 있습니다. | 위 문제가 다시 생기지 않는지 확인할 단위 테스트가 필요합니다 |
| `kobert-onboard-polish` r1 | awkward | minor | `pytorch_kobert.py`는 `expanduser`를 따로 쓰지만 `download()`는 쓰지 않습니다. | '쓰지 않습니다'의 목적어가 `expanduser`인지 `download()`인지 헷갈립니다. `pytorch_kobert.py`가 `download()`를 쓰지 않는다고 잘못 읽힐 수 있습니다. | `pytorch_kobert.py`는 경로에 `expanduser`를 적용하지만, `download()`는 적용하지 않습니다. |
| `kobert-onboard-polish` r1 | awkward | minor | 디버깅할 때는 이 부분부터 풀어 보세요 | '풀어 보세요'가 무엇을 하라는 말인지 바로 와닿지 않습니다. 예외 처리를 좁히거나 원래 예외를 드러내라는 뜻으로 보입니다. | 디버깅할 때는 이 `except:`부터 고쳐서 원래 예외가 보이게 하세요 |
| `kobert-onboard-polish` r1 | translationese | minor | 두 패키지가 같은 vocab(sentencepiece)을 가정하는데 | '~을 가정하다'는 영어 assume을 그대로 옮긴 말투입니다. 한국어 개발 문서라면 '전제로 하다'를 더 자연스럽게 씁니다. | 두 패키지 모두 같은 vocab(sentencepiece)을 쓴다는 전제로 짜여 있는데 |
| `lease-question-polish` r1 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빌린 돈을 갚는 '상환'이 아닌데, 괄호 안에 월세가 함께 들어 있어 낱말이 내용과 맞지 않습니다. | 월 주거비(이자 + 월세 등) |
| `lease-question-polish` r1 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리를 금액인 환산액과 견주고 있어서, 무엇을 비교하라는 것인지 다시 읽게 됩니다. | 전세대출 이자가 같은 조건의 월세보다 싸고 |
| `lease-question-polish` r2 | symbol | minor | **전세 = 보증금 × 대출금리(또는 보증금을 다른 데 썼을 때의 수익률)**가 실질 비용입니다. | '전세 ='라는 등호식에 '~가 실질 비용입니다'라는 서술어가 붙어 있습니다. 그래서 무엇이 주어인지 한 번에 읽히지 않습니다. | 전세의 실질 비용은 보증금 × 대출금리(또는 보증금을 다른 데 썼을 때의 수익률)입니다. |
| `lease-question-polish` r2 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빚을 갚는 돈이 아닌데 '상환액'에 넣어서 낱말이 내용과 맞지 않습니다. | 매달 나가는 주거비(대출 이자, 월세 등) |
| `toss-ky-onboard-polish` r1 | awkward | minor | `dts.resolve: true`도 같은 전제입니다. | 앞 문장의 무엇이 '같은 전제'인지 바로 이어지지 않아서, 번들링된다는 가정을 말하는지 확인하려고 앞 문장을 다시 읽게 됩니다. | `dts.resolve: true`도 이 의존성들의 타입이 선언 파일에 함께 들어간다는 전제로 둔 설정입니다. |
| `toss-ky-onboard-polish` r1 | awkward | minor | `fetch` 래퍼가 걸어 두는 `highWaterMark`(10MB)는 | 옵션 값에 '걸어 둔다'는 말은 잘 쓰지 않습니다. 보통 '설정한다'나 '지정한다'고 씁니다. | `fetch` 래퍼가 설정하는 `highWaterMark`(10MB)는 |
| `toss-ky-onboard-polish` r1 | awkward | minor | 폴리필을 노린 side-effect import는 | '노린'은 이 문맥에서 어색합니다. 폴리필을 적용하려는 목적이라는 뜻이 바로 읽히지 않습니다. | 폴리필만 적용하려고 쓰는 side-effect import는 |
| `toss-ky-onboard-polish` r2 | awkward | minor | `dts.resolve: true`도 같은 전제입니다. | 무엇이 어떤 전제를 따른다는 것인지 문장만 보고는 알기 어렵습니다. 앞 문장에서 '전제'라는 말을 쓰지 않았으므로 '같은 전제'가 무엇을 가리키는지 다시 읽어야 합니다. | `dts.resolve: true` 설정도 이 의존성들이 결과물에 포함된다는 전제로 되어 있습니다. |
| `toss-sentry-pr-polish` r1 | awkward | minor | `window.Sentry`가 있으면 그 객체를 그대로 반환한다. | 같은 PR 설명에서 '변경 내용' 목록만 '~한다'로 끝나고, 본문과 '변경하지 않은 것' 목록은 '~습니다'로 끝나 말투가 섞여 있습니다. | PR 설명 전체를 한 말투로 맞춥니다. 예: '`window.Sentry`가 있으면 그 객체를 그대로 반환합니다.' 아니면 목록을 모두 '~함'처럼 짧은 형태로 통일합니다. |
| `toss-sentry-pr-polish` r2 | literal | minor | 이 PR은 동작을 바꾸지 않고 테스트만 추가해서 이 부분을 지킵니다. | 영어 'guard/protect this'를 그대로 옮긴 표현입니다. 테스트로 무엇을 '지킨다'는 것인지 바로 와닿지 않습니다. | 이 PR은 동작을 바꾸지 않고 테스트만 추가해 이 부분의 회귀를 막습니다. |
| `toss-sentry-pr-polish` r2 | awkward | minor | `sentryServer`는 모듈 하나에서 공유됩니다. | 모듈 스코프에서 하나의 인스턴스를 여러 테스트가 함께 쓴다는 뜻인데, '모듈 하나에서 공유된다'라고 쓰면 무엇을 누가 공유하는지 흐릿합니다. | `sentryServer`는 모듈 수준에서 인스턴스 하나를 모든 테스트가 함께 씁니다. |
| `workout-question-polish` r1 | awkward | minor | 이만큼만 해도 건강에 도움이 커요 | '도움이 크다'는 한국어에서 잘 쓰지 않는 결합이라 읽을 때 살짝 걸린다. | 이만큼만 해도 건강에 큰 도움이 돼요 |
| `workout-question-polish` r1 | symbol | minor | 주 3회 × 30분은 90분이라 | 문장 안에서 곱셈 기호가 서술을 대신하고 있다. | 주 3회씩 30분이면 일주일에 90분이라 |
