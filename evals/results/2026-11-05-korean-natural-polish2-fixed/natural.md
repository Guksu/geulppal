# 한국어 독자가 멈칫하는 곳

자동 생성 파일이다(`node scripts/eval/natural.mjs summary --out 2026-11-05-korean-natural-polish2-fixed`). 판정 모델이 [korean-natural.md](../../judge/korean-natural.md) 기준으로 표시한 곳을 모았다. 표시한 곳의 수는 글의 품질 점수나 AI 작성 확률이 아니다.

| 조건 | 판정한 결과 | 표시 없는 결과 | 표시한 곳(major) | literal | coined | noun_chain | symbol | translationese | awkward | 글에 없는 인용 |
|---|---|---|---|---|---|---|---|---|---|---|
| A | 24 | 3 | 43(0) | 16 | 0 | 2 | 2 | 2 | 21 | 0 |
| N4 | 24 | 10 | 24(0) | 5 | 0 | 0 | 1 | 3 | 15 | 0 |
| N5 | 24 | 9 | 25(1) | 4 | 0 | 0 | 1 | 1 | 19 | 0 |

표시한 곳은 같은 표현이 여러 번 나와도 한 번으로 센다. "글에 없는 인용"은 판정 모델이 적은 문자열이 결과에 그대로 없는 경우다.

## A

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `db-index-question-polish` r2 | awkward | minor | 소량 테이블 | '소량'은 보통 데이터나 물량을 말할 때 쓰고, 테이블을 꾸미는 말로는 잘 쓰지 않습니다. 한국어 개발자라면 '작은 테이블'이나 '데이터가 적은 테이블'이라고 쓸 것입니다. | 데이터가 적은 테이블 |
| `docker-volume-question-polish` r1 | literal | minor | 바인드 마운트용 경로를 조용히 만들어 버리지만 | 'silently'를 낱말대로 옮긴 말이다. 뜻은 통하지만 한국어 개발자는 보통 '경고 없이'라고 쓴다. | 바인드 마운트용 경로를 경고 없이 만들어 버리지만 |
| `docker-volume-question-polish` r1 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않도록 | 영어 대명사 'the container's one'을 옮긴 듯한 '컨테이너의 것'이 어색하다. | 호스트 디렉터리가 컨테이너 안의 디렉터리를 덮어쓰지 않도록 |
| `docker-volume-question-polish` r2 | literal | minor | 조용히 만들어 버리지만 | 영어 'silently creates'를 낱말대로 옮긴 말이다. 한국어 개발자는 보통 '경고 없이', '아무 메시지 없이'라고 쓴다. | 경고 없이 만들어 버리지만 |
| `docker-volume-question-polish` r2 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않도록 | '컨테이너의 것'은 영어 대명사 'the container's one'을 옮긴 구조라서 가리키는 대상이 바로 읽히지 않는다. | 호스트의 node_modules가 컨테이너 안의 node_modules를 덮어쓰지 않도록 |
| `git-rebase-question-polish` r1 | literal | minor | 대상 브랜치의 최신 끝으로 | 브랜치의 tip을 그대로 옮긴 표현이라 '최신 끝'이 무엇인지 한 번 더 생각하게 됩니다. 한국어 개발자는 보통 '최신 커밋 위로'라고 씁니다. | 대상 브랜치의 최신 커밋 위로 |
| `git-rebase-question-polish` r2 | literal | minor | 대상 브랜치의 최신 끝으로 | 브랜치의 'tip'을 낱말대로 옮긴 말로 보입니다. '최신 끝'은 한국어 개발자가 잘 쓰지 않는 표현입니다. | 대상 브랜치의 최신 커밋 위로 |
| `git-rebase-question-polish` r2 | literal | minor | force push로 인한 커밋 유실 같은 rebase 사고의 비용이 더 큽니다. | 'cost'를 그대로 옮긴 '사고의 비용'이 어색하고, 무엇에 비해 더 큰지도 문장에 드러나지 않습니다. | force push로 커밋을 잃는 것 같은 rebase 사고가 났을 때 피해가 더 큽니다. |
| `hangul-js-pr-polish` r1 | literal | minor | needle을 이스케이프하지 않고 | 검색 대상 문자열을 가리키는 영어 은어 'needle'을 설명 없이 그대로 썼습니다. 한국어 글에서는 잘 쓰지 않아 잠깐 멈칫할 수 있습니다. | 검색어를 이스케이프하지 않고 |
| `hangul-js-pr-polish` r2 | awkward | minor | `rangeSearch`는 needle을 이스케이프하지 않고 `RegExp`에 넘깁니다. | 검색 대상 문자열을 가리키는 영어 은어 needle을 코드 표기도 설명도 없이 한국어 문장에 그대로 넣었습니다. 한국어 문장에서는 '검색어'라고 쓰는 편이 자연스럽습니다. | `rangeSearch`는 검색어를 이스케이프하지 않고 `RegExp`에 넘깁니다. |
| `js-async-question-polish` r2 | awkward | minor | 비동기(concurrency, 동시성)와 병렬(parallelism, 병렬성)은 서로 다른 개념입니다. | '비동기'라고 써 놓고 괄호에는 concurrency(동시성)를 달았습니다. 두 낱말이 맞지 않아 독자는 무엇과 무엇을 비교하는지 다시 확인하게 됩니다. 아래 표에서는 '동시성'과 '병렬성'을 비교합니다. | 동시성(concurrency)과 병렬성(parallelism)은 서로 다른 개념입니다. |
| `khaiii-report-polish` r1 | literal | minor | 위 항목들을 고정해 둘 단위 테스트가 필요합니다 | 'pin down'이나 'lock in'을 그대로 옮긴 듯한 표현입니다. 무엇을 '고정'하는지 곧바로 와닿지 않습니다. 버그가 다시 생기지 않게 막는다는 뜻으로 읽어야 합니다. | 위 문제들이 다시 생기지 않도록 확인하는 단위 테스트가 필요합니다 |
| `khaiii-report-polish` r1 | noun_chain | minor | 패치 적용 경계 케이스 | 명사 네 개가 이어져 있어 어떤 경계를 확인하는 테스트인지 한 번에 읽히지 않습니다. | 패치를 문장 끝이나 범위 경계에 적용하는 경우 |
| `khaiii-report-polish` r2 | literal | minor | 조용히 버려집니다 | 'silently dropped'를 낱말대로 옮긴 표현이라 한국어 개발자가 쓰는 말투가 아닙니다. | 아무 경고 없이 버려집니다 |
| `khaiii-report-polish` r2 | literal | minor | 위 항목들을 고정할 단위 테스트 | 'pin down'이나 'lock in'을 옮긴 '고정할'이 테스트와 어울리지 않습니다. 무엇을 고정한다는 건지 다시 읽게 됩니다. | 위 문제들이 다시 생기지 않는지 확인할 단위 테스트 |
| `khaiii-report-polish` r2 | noun_chain | minor | dropout 결정성 테스트 | 명사를 늘어놓아 무엇을 검사하는지 바로 읽히지 않습니다. '결정성'은 determinism을 옮긴 말입니다. | 추론 결과가 매번 같은지 확인하는 dropout 테스트 |
| `kobert-onboard-polish` r1 | literal | minor | 조용히 틀린 결과가 나올 수 있습니다 | 영어 'silently'를 그대로 옮긴 말입니다. 한국어 개발자는 보통 '경고 없이'나 '오류 없이'라고 씁니다. | 구조를 바꾸면 경고 없이 틀린 결과가 나올 수 있습니다 |
| `kobert-onboard-polish` r1 | awkward | minor | 디버깅할 때는 이 부분부터 풀어 보세요 | '풀어 보다'가 무엇을 하라는 뜻인지(예외 처리를 걷어 내라는 건지, 분석하라는 건지) 바로 읽히지 않습니다. | 디버깅할 때는 이 `except:`부터 걷어 내고 원래 예외가 보이게 하세요 |
| `kobert-onboard-polish` r1 | awkward | minor | 토크나이저나 vocab을 바꾸는 작업은 `kobert`와 `kobert_hf` 양쪽에 영향이 없는지 확인하세요 | '작업은'이 주제어로 나왔는데 서술어가 '확인하세요'라서 주어와 서술어가 맞지 않습니다. | 토크나이저나 vocab을 바꿨다면 `kobert`와 `kobert_hf` 양쪽에 영향이 없는지 확인하세요 |
| `kobert-onboard-polish` r2 | literal | minor | 조용히 틀린 결과가 나올 수 있습니다 | 영어 'silently'를 낱말대로 옮긴 표현이라 한국어 문장으로는 어색합니다. | 오류 없이 잘못된 결과가 나올 수 있습니다 |
| `lease-question-polish` r1 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빌린 돈을 갚는 '상환'이 아닌데 상환액으로 묶어 불러서 낱말이 맞지 않습니다. | 매달 나가는 주거비(대출 이자나 월세 등) |
| `lease-question-polish` r1 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 금리(%)와 금액(원)을 바로 비교하는 문장이라 무엇과 무엇을 견주는지 다시 읽게 됩니다. '월세 환산액'도 앞에서 설명하지 않은 말입니다. | 전세대출 이자가 비슷한 집 월세보다 적고 |
| `lease-question-polish` r1 | awkward | minor | 월세를 아껴 종잣돈을 모으는 구조가 중요합니다 | 개인 자금 계획에 '구조'라는 말이 어울리지 않아 뜻이 흐릿합니다. | 주거비를 줄여 종잣돈을 모으는 게 중요합니다 |
| `lease-question-polish` r1 | awkward | minor | 이동 가능성이 크다면 | 이사나 이직을 '이동'이라고 뭉뚱그려서 앞 내용과 바로 이어지지 않습니다. | 이사할 가능성이 크다면 |
| `lease-question-polish` r2 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빌린 돈을 갚는 돈이 아닌데 '상환액'에 넣어서 낱말과 뜻이 맞지 않습니다. | 매달 나가는 주거비(대출 이자, 월세 등) |
| `lease-question-polish` r2 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리와 금액인 '월세 환산액'을 바로 비교해서 무엇을 무엇과 견주는지 다시 읽게 됩니다. 부동산 용어를 잘 모르는 독자에게는 '월세 환산액'도 낯섭니다. | 전세대출 이자가 비슷한 집의 월세보다 적고 |
| `lease-question-polish` r2 | awkward | minor | 월세를 아껴 종잣돈을 모으는 구조가 중요합니다 | 개인의 돈 관리를 말하는 자리에 '구조'를 써서 어색합니다. | 주거비를 아껴 종잣돈을 모으는 것이 중요합니다 |
| `lease-question-polish` r2 | awkward | minor | 이동 가능성이 크다면 | 앞에서는 '이직이나 이사'라고 했는데 여기서는 '이동'이라고 해서, 무엇이 움직인다는 뜻인지 바로 안 들어옵니다. | 곧 이사할 가능성이 크다면 |
| `toss-ky-onboard-polish` r1 | literal | minor | esbuild의 `require` 심이 | shim을 '심'으로만 적으면 한국어 낱말로는 뜻이 바로 떠오르지 않습니다. 개발자들은 보통 영어 그대로 쓰거나 원어를 함께 적습니다. | esbuild가 넣는 `require` shim이 |
| `toss-ky-onboard-polish` r1 | awkward | minor | 현재 상태가 통과하는지 확인합니다 | 통과하는 것은 '상태'가 아니라 타입체크와 빌드라서 주어와 서술어가 맞지 않습니다. | 현재 상태에서 문제없이 통과하는지 확인합니다 |
| `toss-sentry-pr-polish` r1 | literal | minor | 소스에서 확인한 테스트 공백을 기준으로 | test gap을 낱말대로 옮긴 말이라 '공백'이 무엇을 가리키는지 잠깐 생각해야 합니다. | 소스를 보고 테스트가 빠진 부분을 기준으로 |
| `toss-sentry-pr-polish` r1 | literal | minor | 테스트만 추가해 해당 부분을 보호합니다 | 테스트로 코드를 '보호한다'는 영어 protect/guard를 그대로 옮긴 표현이고, 한국어 개발자는 보통 이렇게 쓰지 않습니다. | 테스트만 추가해 이 부분의 회귀를 막습니다 |
| `toss-sentry-pr-polish` r1 | awkward | minor | 파일 안의 `FIXME` 주석이 설명하는 핵심 동작입니다. | 같은 목록 항목이 '~한다'체로 쓰였는데 이 문장만 '~입니다'로 끝나 한 설명 안에서 말투가 섞입니다. | 파일 안의 `FIXME` 주석이 설명하는 핵심 동작이다. |
| `toss-sentry-pr-polish` r2 | literal | minor | 테스트 공백 | 'test gap'을 그대로 옮긴 말입니다. 뜻은 짐작되지만 한국어 개발자는 보통 이렇게 쓰지 않습니다. | 소스에서 확인한, 테스트가 없는 부분 |
| `toss-sentry-pr-polish` r2 | literal | minor | 이 부분을 보호합니다 | 'protect against regressions'를 그대로 옮긴 표현입니다. 한국어에서는 '회귀를 막는다'고 하는 편이 자연스럽습니다. | 테스트만 추가해 이 부분에서 회귀가 생기지 않게 합니다 |
| `toss-storage-report-polish` r1 | awkward | minor | 타입이 사실과 달라집니다 | '사실'은 타입과 비교하기에 어색한 말입니다. 타입이 무엇과 어긋나는지 바로 읽히지 않습니다. | 타입과 실제 값이 달라집니다 |
| `toss-storage-report-polish` r2 | awkward | minor | 타입이 사실과 달라집니다 | 달라지는 것은 실제 값인데 '타입'을 주어로 두고 '사실'과 비교해서 어색하다. | 저장된 실제 값이 선언한 타입과 달라집니다 |
| `workout-question-polish` r1 | awkward | minor | 극심한 숨참이 느껴지면 | '숨참'은 명사로 잘 쓰지 않는 말이고, '극심한'과 붙으니 딱딱하고 어색하게 읽힙니다. | 숨이 심하게 차면 |
| `workout-question-polish` r1 | symbol | minor | 주 3회 × 30분은 90분으로 | 설명하는 문장 안에서 곱셈 기호가 서술어 노릇을 해서 문장으로 자연스럽게 이어지지 않습니다. | 주 3회, 한 번에 30분씩 하면 일주일에 90분으로 |
| `workout-question-polish` r2 | awkward | minor | 극심한 숨참이 느껴지면 | '숨참'은 평소에 잘 쓰지 않는 명사형이고, '숨참이 느껴지다'라는 말도 어색합니다. | 숨이 몹시 차면 |
| `workout-question-polish` r2 | symbol | minor | 주 3회 × 30분은 총 90분으로 | 문장 안에서 곱셈 기호 '×'가 말을 대신하고 있습니다. | 주 3회, 한 번에 30분씩 하면 총 90분으로 |
| `workout-question-polish` r2 | awkward | minor | 중강도 유산소 운동 | 운동 용어를 잘 모르는 독자는 '중강도'가 어느 정도인지 바로 알기 어렵습니다. 설명은 아래 강도 항목에 가서야 나옵니다. | 중간 강도(숨이 조금 찰 정도)의 유산소 운동 |
| `workout-question-polish` r2 | awkward | minor | 푸시업 | 일반 독자에게는 '팔굽혀펴기'라는 말이 더 익숙합니다. | 팔굽혀펴기 |

## N4

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `docker-volume-question-polish` r1 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 않도록 지켜 주고 | 영어의 'the container's one'처럼 '것'으로 대상을 받아서, 무엇을 덮어쓰지 않는지 한 번 더 따져 봐야 합니다. | 호스트 디렉터리가 컨테이너 안의 node_modules를 덮어쓰지 않게 해 주고 |
| `docker-volume-question-polish` r2 | translationese | minor | 호스트의 디렉터리가 컨테이너의 것을 덮어쓰지 못하게 막아 주고 | '컨테이너의 것'은 영어 대명사 'the container's one'을 옮긴 말처럼 들립니다. 무엇을 가리키는지 한 번 더 생각하게 됩니다. | 호스트 디렉터리가 컨테이너 안의 node_modules를 덮어쓰지 못하게 막아 주고 |
| `hangul-js-pr-polish` r1 | literal | minor | 그 동작을 고정하는 테스트를 넣지 않았습니다 | 영어 'pin/lock in the behavior'를 낱말대로 옮긴 표현이라 '고정'이 무슨 뜻인지 잠깐 생각하게 됩니다. | 현재 동작을 그대로 기대값으로 삼는 테스트는 넣지 않았습니다 |
| `hangul-js-pr-polish` r2 | literal | minor | 커버리지 공백 보강 | coverage gap을 옮긴 말입니다. 빈 입력과 문자열을 다루는 테스트 이야기와 함께 나오기 때문에 '공백'이 whitespace로 읽힐 수 있습니다. | 테스트가 빠진 부분 보강 |
| `hangul-js-pr-polish` r2 | literal | minor | `rangeSearch`는 needle을 이스케이프하지 않고 | 검색 대상 문자열을 가리키는 영어 은어 needle을 한국어 문장에 그대로 넣었습니다. 한국어 개발자는 보통 '검색어'라고 씁니다. | `rangeSearch`는 검색어를 이스케이프하지 않고 |
| `khaiii-report-polish` r1 | awkward | minor | dropout 결과가 매번 같은지 보는 테스트 | dropout은 원래 매번 다른 결과를 내므로 'dropout 결과가 같은지'는 말이 어긋납니다. 실제로 확인하려는 것은 추론 결과가 매번 같은지입니다. | eval 모드에서 추론 결과가 매번 같은지 확인하는 테스트 |
| `khaiii-report-polish` r2 | awkward | minor | dropout 결과가 매번 같은지 보는 테스트 | 매번 같아야 하는 것은 dropout 결과가 아니라 eval 모드에서 낸 추론 결과입니다. 그래서 무엇을 확인하는 테스트인지 한 번 더 생각하게 됩니다. | eval 모드에서 같은 입력의 추론 결과가 매번 같은지 보는 테스트 |
| `kobert-onboard-polish` r1 | awkward | minor | XLNet의 docstring을 그대로 가져와서 설명과 맞지 않습니다. | 무엇이 무엇과 맞지 않는지 주어가 빠져 있습니다. docstring이 실제 동작과 다르다는 뜻인데, '설명'이 어떤 설명인지 다시 읽어야 압니다. | docstring은 XLNet 것을 그대로 가져와서 실제 동작과 맞지 않습니다. |
| `kobert-onboard-polish` r1 | awkward | minor | 토크나이저나 vocab을 바꾸는 작업은 `kobert`와 `kobert_hf` 양쪽에 영향이 없는지 확인하세요. | 주어처럼 놓인 '작업은'과 서술어 '확인하세요'가 이어지지 않습니다. | 토크나이저나 vocab을 바꿀 때는 `kobert`와 `kobert_hf` 양쪽에 영향이 없는지 확인하세요. |
| `lease-question-polish` r1 | awkward | minor | 월 상환액(이자 + 월세 등) | '상환액'은 빌린 돈을 갚는 금액이라 월세까지 묶으면 낱말이 맞지 않습니다. | 매달 나가는 주거비(대출 이자나 월세 등) |
| `lease-question-polish` r1 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 퍼센트인 금리를 금액인 환산액과 비교하는 문장이라 무엇을 무엇과 견주는지 다시 읽게 됩니다. | 전세대출 이자가 비슷한 집의 월세보다 적고 |
| `lease-question-polish` r1 | awkward | minor | 월세를 아껴 종잣돈을 모으는 구조가 중요합니다 | '구조'가 무엇을 가리키는지 모호해서 생활 조언으로 바로 읽히지 않습니다. | 주거비를 줄여 종잣돈을 모으는 것이 중요합니다 |
| `lease-question-polish` r2 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빚을 갚는 돈이 아닌데 '상환액'으로 묶어 버려서 낱말이 내용과 맞지 않습니다. | 매달 나가는 주거비(대출 이자 + 월세 등) |
| `lease-question-polish` r2 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리를 금액인 '환산액'과 견주고 있어 무엇과 무엇을 비교하라는지 다시 읽게 됩니다. '월세 환산액'도 사회초년생에게는 낯선 말입니다. | 전세대출 이자가 같은 집 월세보다 적고 |
| `lease-question-polish` r2 | awkward | minor | 월세를 아껴 종잣돈을 모으는 구조가 중요합니다 | '구조'가 무엇을 가리키는지 흐릿합니다. 생활비를 짜는 방식을 말하는 문맥에는 잘 어울리지 않습니다. | 주거비를 줄여 종잣돈을 모을 수 있게 지출을 짜는 것이 중요합니다 |
| `toss-ky-onboard-polish` r1 | awkward | minor | `dts.resolve: true`도 같은 전제입니다. | 무엇이 어떤 전제와 같다는 것인지 문장만으로는 바로 읽히지 않습니다. 앞 문장의 '번들된다는 전제'를 가리킨다는 점이 드러나지 않습니다. | `dts.resolve: true`도 이 패키지들의 타입을 선언 파일에 함께 넣는다는 뜻이므로, 같은 점을 주의해야 합니다. |
| `toss-ky-onboard-polish` r2 | awkward | minor | `dts.resolve: true`도 같은 전제입니다. | 무엇이 어떤 전제와 같은지 주어와 서술어가 맞지 않습니다. 앞 문장의 어느 부분을 가리키는지 다시 읽어야 합니다. | `dts.resolve: true` 설정도 이 의존성들이 번들된다는 전제를 따릅니다. |
| `toss-ky-onboard-polish` r2 | literal | minor | esbuild의 `require` 심이 | shim을 '심'으로 음역했습니다. 한국어 문장 안에서 '심'만 보면 낱말로 바로 읽히지 않습니다. | esbuild가 넣는 `require` shim이 |
| `toss-sentry-pr-polish` r2 | literal | minor | 테스트만 추가해 이 부분을 지킵니다 | 영어 'guard/protect this code with tests'를 그대로 옮긴 표현입니다. 테스트가 코드를 '지킨다'고는 한국어로 잘 쓰지 않습니다. 뜻은 통하지만 어색합니다. | 테스트만 추가해 이 부분에 회귀가 생기지 않도록 합니다 |
| `workout-question-polish` r1 | translationese | minor | 5분 정도 준비운동과 정리운동을 포함하세요. | 'include'를 옮긴 듯한 '포함하세요'가 운동 안내 말투와 어울리지 않아요. 언제 하는지(운동 앞뒤)도 드러나지 않아요. | 운동 앞뒤로 5분 정도 준비운동과 정리운동을 하세요. |
| `workout-question-polish` r2 | awkward | minor | 극심한 숨참 | '숨참'은 평소에 쓰지 않는 명사형이라 읽다가 걸립니다. | 숨이 몹시 찰 때 |
| `workout-question-polish` r2 | awkward | minor | 중강도 유산소 운동 | 운동 용어를 모르는 독자에게 '중강도'가 어느 정도인지 바로 와닿지 않습니다. 설명은 아래 항목에 가서야 나옵니다. | 적당히 숨이 찰 정도의 유산소 운동 |
| `workout-question-polish` r2 | symbol | minor | 주 3회 × 30분은 90분이라 | 설명하는 문장 안에서 곱셈 기호가 서술어를 대신하고 있습니다. | 일주일에 3번, 30분씩 하면 90분이라 |
| `workout-question-polish` r2 | awkward | minor | 푸시업 | 일반 독자에게는 '팔굽혀펴기'가 더 익숙한 말입니다. | 팔굽혀펴기 |

## N5

| 사례 | 종류 | 정도 | 표현 | 이유 | 고칠 방향 |
|---|---|---|---|---|---|
| `db-index-question-polish` r1 | awkward | minor | B-Tree 인덱스는 페이지 분할(page split)이나 재정렬이 일어날 수 있습니다. | 주어 '인덱스는'과 서술어 '일어날 수 있습니다'가 맞지 않습니다. 인덱스가 일어나는 것처럼 읽힙니다. | B-Tree 인덱스에서는 페이지 분할(page split)이나 재정렬이 일어날 수 있습니다. |
| `docker-volume-question-polish` r2 | translationese | minor | 호스트의 것이 컨테이너의 것을 덮어쓰지 않게 보호하고 | 영어의 'the host's one / the container's one'을 그대로 옮긴 듯한 '~의 것'이 두 번 이어집니다. 그래서 무엇을 가리키는지 한 번 더 따져 보게 됩니다. | 호스트의 node_modules가 컨테이너 안의 node_modules를 덮어쓰지 않게 막아 주고 |
| `git-rebase-question-polish` r2 | awkward | minor | rebase 사고(force push로 커밋이 유실되는 일 등)의 피해가 더 크다. | 무엇보다 피해가 더 큰지 비교 대상이 없어, 앞 문장과 어떻게 이어지는지 다시 읽게 된다. | 숙련도가 낮은 사람이 rebase를 하다 사고를 내면(force push로 커밋을 잃는 등) 피해가 크기 때문이다. |
| `hangul-js-pr-polish` r1 | awkward | minor | `rangeSearch`는 needle을 이스케이프 없이 `RegExp`에 넘깁니다. | 코드 표기가 아닌 영어 낱말 'needle'이 한국어 문장에 그대로 들어가 있습니다. 문맥상 뜻은 통하지만, 한국어로 쓴 설명이라면 보통 '검색어'라고 씁니다. | `rangeSearch`는 검색어를 이스케이프하지 않고 그대로 `RegExp`에 넘깁니다. |
| `hangul-js-pr-polish` r2 | literal | minor | 그 동작을 고정하는 테스트를 넣지 않았습니다 | 영어 'pin/lock in the behavior'를 낱말대로 옮긴 말이라, 독자가 무슨 뜻인지 한 번 더 생각하게 됩니다. | 현재 동작을 정답으로 삼는 테스트는 넣지 않았습니다 |
| `hangul-js-pr-polish` r2 | awkward | minor | `isConsonant`에 `ㄳ` 같은 겹받침 자모를 추가합니다. | 테스트에 입력을 추가한다는 뜻인데, 문장만 보면 함수 자체에 무언가를 추가하는 것처럼 읽힙니다. | `isConsonant` 테스트에 `ㄳ` 같은 겹받침 자모를 추가합니다. |
| `khaiii-report-polish` r2 | awkward | minor | dropout이 매번 같은 결과를 내는지 보는 테스트 | dropout은 원래 무작위로 동작하므로 '매번 같은 결과를 내는지'라는 주어·서술어 조합이 어색합니다. 실제로 확인하려는 것은 추론 결과가 매번 같은지입니다. | eval 모드에서 같은 입력의 추론 결과가 매번 같은지 보는 테스트 |
| `kobert-onboard-polish` r1 | awkward | major | `pytorch_kobert.py`는 `expanduser`를 따로 쓰지만 `download()`는 쓰지 않습니다. | 'download()는 쓰지 않습니다'가 'pytorch_kobert.py가 download()를 쓰지 않는다'는 뜻으로 읽힐 수 있습니다. 실제로는 download()가 expanduser를 쓰지 않는다는 뜻입니다. | `pytorch_kobert.py`는 경로에 `expanduser`를 따로 적용하지만, `download()`는 `expanduser`를 적용하지 않습니다. |
| `kobert-onboard-polish` r1 | awkward | minor | 디버깅할 때는 이 부분부터 풀어 보세요. | 무엇을 '풀라'는 것인지 분명하지 않습니다. 예외 처리를 고치라는 뜻이 바로 읽히지 않습니다. | 디버깅할 때는 이 `except:`부터 고쳐서 원래 예외가 보이게 하세요. |
| `kobert-onboard-polish` r1 | awkward | minor | 토크나이저나 vocab을 바꾸는 작업은 `kobert`와 `kobert_hf` 양쪽에 영향이 없는지 확인하세요. | '작업은'이 주어처럼 나오는데 '확인하세요'와 맞지 않습니다. | 토크나이저나 vocab을 바꿀 때는 `kobert`와 `kobert_hf` 양쪽에 영향이 없는지 확인하세요. |
| `kobert-onboard-polish` r2 | awkward | minor | 모든 로더가 멈춥니다 | 버킷이 사라지면 다운로드가 실패해 로드가 안 되는 상황입니다. 그런데 "멈춘다"고 쓰면 응답 없이 멈추는(hang) 것으로 읽힐 수 있습니다. | 모든 로더가 모델을 받지 못해 실패합니다 |
| `lease-question-polish` r1 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 갚는 돈이 아니므로 '상환액'으로 묶으면 낱말이 맞지 않습니다. | 매달 나가는 주거비(대출 이자 + 월세 등) |
| `lease-question-polish` r1 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리를 금액인 '환산액'과 견주고 있습니다. '월세 환산액'이 무엇을 가리키는지도 바로 알기 어렵습니다. | 전세대출 이자가 비슷한 집의 월세보다 싸고 |
| `lease-question-polish` r2 | awkward | minor | 월 상환액(이자 + 월세 등) | 월세는 빌린 돈을 갚는 돈이 아닌데 '상환액'으로 묶여 있어 낱말이 문맥과 맞지 않습니다. | 매달 나가는 주거비(대출 이자나 월세 등) |
| `lease-question-polish` r2 | awkward | minor | 전세대출 금리가 월세 환산액보다 낮고 | 비율인 금리를 금액인 '환산액'과 견주고 있습니다. 게다가 '월세 환산액'이 무엇인지 본문에 설명이 없어서 사회초년생 독자가 무엇과 무엇을 비교하라는 건지 다시 읽게 됩니다. | 전세대출 이자가 비슷한 집의 월세보다 적고 |
| `toss-ky-onboard-polish` r1 | awkward | minor | `dts.resolve: true`도 같은 전제입니다. | '같은 전제'가 앞 문장의 무엇(의존성이 번들된다는 점)을 가리키는지 바로 안 읽혀서 문장을 다시 읽게 됩니다. | `dts.resolve: true`도 의존성을 결과물에 포함한다는 전제로 설정되어 있습니다. |
| `toss-ky-onboard-polish` r1 | literal | minor | esbuild의 `require` 심 | shim을 '심'으로만 적어서 한국어 낱말 '심'과 헷갈립니다. 개발자는 보통 영어 그대로 쓰거나 풀어서 씁니다. | esbuild가 넣는 `require` shim |
| `toss-ky-onboard-polish` r1 | awkward | minor | 폴리필을 설치할 목적으로 부수효과만 가져오는 import는 동작하지 않는다고 보세요. | '부수효과만 가져오는 import'는 side-effect import를 그대로 옮긴 표현이라 무엇을 가리키는지 한 번 더 생각해야 합니다. | 폴리필만 설치하려고 `import '@toss/ky'`처럼 쓰면 동작하지 않는다고 보세요. |
| `toss-ky-onboard-polish` r2 | awkward | minor | esbuild의 `require` 심이 예외를 던질 수도 있습니다 | shim을 '심'으로만 음차하면 한국어 문장 안에서 낱말로 바로 읽히지 않습니다. 개발자는 보통 '심(shim)'이나 'shim'으로 씁니다. | esbuild가 넣는 `require` shim이 예외를 던질 수도 있습니다 |
| `toss-ky-onboard-polish` r2 | awkward | minor | 전역이 없는 Node 버전(16 등)에서 직접 확인합니다 | '전역이 없는'이 무엇이 없다는 뜻인지 바로 안 읽힙니다. 앞에서 말한 fetch 같은 전역 객체가 기본으로 없다는 뜻입니다. | `fetch` 같은 전역 객체가 기본으로 없는 Node 버전(16 등)에서 직접 확인합니다 |
| `toss-sentry-pr-polish` r1 | awkward | minor | 소스에서 확인한 테스트가 없는 부분을 기준으로 | 관형절 두 개가 겹쳐서 '소스에서 확인한 테스트'로 잘못 끊어 읽을 수 있고, 다시 읽어야 뜻이 잡힙니다. | 소스를 살펴보고 테스트가 없는 부분을 찾아 그 부분을 기준으로 |
| `toss-sentry-pr-polish` r2 | literal | minor | 소스에서 확인한 테스트 공백을 바탕으로 | 'test gap'을 낱말대로 옮긴 말이라 '공백'이 무엇을 가리키는지 한 번 더 생각하게 됩니다. | 소스에서 확인한, 테스트가 빠진 부분을 바탕으로 |
| `toss-sentry-pr-polish` r2 | literal | minor | 테스트만 추가해 이 부분을 지킵니다 | 'guard'를 옮긴 '지킵니다'는 한국어 개발자가 테스트를 두고 잘 쓰지 않는 말입니다. | 테스트만 추가해 이 부분의 회귀를 막습니다 |
| `workout-question-polish` r2 | symbol | minor | 주 3회 × 30분은 90분이라 | 설명하는 문장 안에서 곱셈 기호가 서술어 역할을 합니다. 일반 독자에게는 문장으로 풀어 쓴 쪽이 더 자연스럽게 읽힙니다. | 주 3회, 한 번에 30분씩 하면 일주일에 90분이라 |
| `workout-question-polish` r2 | awkward | minor | 극심한 숨 가쁨이 나타나면 | '숨 가쁨'처럼 상태를 명사로 바꿔 '나타나면'과 이으면 딱딱하게 들립니다. 평소에는 이렇게 말하지 않습니다. | 숨이 너무 가빠지면 |
