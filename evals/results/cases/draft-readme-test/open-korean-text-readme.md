# `open-korean-text-readme`

[← README 초안 확인용 목록](README.md) · 새 글 작성 · README 초안 · 한국어

## 요청

> 이 라이브러리의 한국어 README를 써 줘.

## 메모

> (없음)

작성 모델은 작업 폴더에서 `open-korean-text/open-korean-text` 커밋 `95bf003`의 코드(`build.sbt`, `pom.xml`, `LICENSE`, `examples`, `src/main/scala`, `src/main/java`, `src/test/scala`, `src/test/java`, README·설명 문서 제외)를 읽고 README를 파일로 썼습니다.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**다뤄야 할 내용** (통과 조건에는 넣지 않음)

- 정규화·토큰화·어근화·어구 추출 기능
- Scala 또는 Java에서 쓰는 예
- 의존성 추가 방법

**있으면 안 되는 변경**

- 작업 폴더의 코드나 메모로 확인되지 않는 기능·옵션·지원 버전·플랫폼·의존성·성능 수치·벤치마크를 사실처럼 쓰기
- 코드에 없는 함수·클래스·명령·설정 키·패키지 이름 쓰기
- 메모의 수치나 측정 조건을 바꾸기(원문에 없는 단위나 조건을 붙이는 것 포함)

**메모**: 원문 없이 새로 쓰는 사례. must_preserve는 독자에게 필요한 내용(다뤄야 할 내용)이고 판정의 통과 조건에는 넣지 않는다. 사실 근거는 evals/judge/draft-claims.md로 본다.

</details>

## 1회차

### 글빨 없음 — ○ 근거 판정 통과

> # Open Korean Text
>
> **Open Korean Text**는 한국어 텍스트를 처리하는 Scala/Java 라이브러리입니다.
> 트위터 등 SNS에서 쓰이는 오타, 줄임말, 인터넷 slang이 섞인 한국어도 안정적으로 다루는 것을 목표로 합니다.
>
> \[Twitter Korean Text](https://github.com/twitter/twitter-korean-text)에서 출발한 오픈소스 프로젝트입니다.
>
> ## 주요 기능
>
> | 기능 | 설명 |
> | --- | --- |
> | **정규화 (Normalization)** | 과도하게 늘어진 자모, 오타, 소리나는 대로 쓴 표현을 표준형에 가깝게 바꿉니다. `그랰ㅋㅋㅋㅋ` → `그래ㅋㅋㅋ` |
> | **토큰화 (Tokenization)** | 텍스트를 형태소 단위로 나누고 품사를 붙입니다. 사전에 없는 단어(미등록어)도 처리하며 표시해 줍니다. |
> | **어간 추출 (Stemming)** | 동사·형용사의 활용형에서 원형을 찾아 줍니다. `착한` → `착하다` |
> | **구(Phrase) 추출** | 토큰에서 명사구와 해시태그를 뽑아 핵심 키워드를 얻습니다. 스팸·욕설 필터링을 선택할 수 있습니다. |
> | **문장 분리** | 입력 텍스트를 문장 단위로 나눕니다. |
> | **역토큰화 (Detokenization)** | 토큰 목록을 자연스러운 띄어쓰기의 문장으로 되돌립니다. |
> | **사용자 사전** | 실행 중에 단어를 추가하거나 제거해 토큰화 결과를 조정합니다. |
>
> ## 요구 사항
>
> - Java 8 이상
> - Scala 2.12 (`scala-library`가 의존성으로 함께 들어옵니다)
>
> ## 설치
>
> ### Maven
>
> ```xml
> <dependency>
>   <groupId>org.openkoreantext</groupId>
>   <artifactId>open-korean-text</artifactId>
>   <version>${open-korean-text.version}</version>
> </dependency>
> ```
>
> `${open-korean-text.version}`에는 \[Maven Central](https://search.maven.org/search?q=g:org.openkoreantext)에 올라온 최신 버전을 넣으세요.
>
> ### sbt
>
> ```scala
> libraryDependencies += "org.openkoreantext" % "open-korean-text" % "최신 버전"
> ```
>
> ## 빠른 시작
>
> ### Scala
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor.KoreanPhrase
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer.KoreanToken
>
> val text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋ"
>
> // 정규화
> val normalized: CharSequence = OpenKoreanTextProcessor.normalize(text)
> println(normalized)
> // 한국어를 처리하는 예시입니다ㅋㅋㅋ
>
> // 토큰화
> val tokens: Seq[KoreanToken] = OpenKoreanTextProcessor.tokenize(normalized)
> println(tokens)
> // List(한국어(Noun: 0, 3), 를(Josa: 3, 1),  (Space: 4, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2),
> //      (Space: 9, 1), 예시(Noun: 10, 2), 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3))
>
> // 공백을 뺀 토큰 문자열만 얻기
> println(OpenKoreanTextProcessor.tokensToStrings(tokens))
> // List(한국어, 를, 처리, 하는, 예시, 입니다, ㅋㅋㅋ)
>
> // 구 추출
> val phrases: Seq[KoreanPhrase] = OpenKoreanTextProcessor.extractPhrases(tokens)
> println(phrases)
> // List(한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2))
> ```
>
> 토큰은 `텍스트(품사: 시작 위치, 길이)` 형태로 출력됩니다. 동사·형용사는 `하는(Verb(하다): 7, 2)`처럼 괄호 안에 원형이 함께 표시됩니다.
>
> ### Java
>
> Java에서는 `OpenKoreanTextProcessorJava`를 사용합니다.
>
> ```java
> import java.util.List;
>
> import org.openkoreantext.processor.KoreanTokenJava;
> import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
> import scala.collection.Seq;
>
> public class Example {
>   public static void main(String[] args) {
>     String text = "착한강아지상을 받은 루루";
>
>     // 토큰화 (scala.collection.Seq를 반환합니다)
>     Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(text);
>
>     // 문자열 목록으로 변환 (기본값: 공백 제외)
>     List<String> words = OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens);
>     System.out.println(words);
>     // [착한, 강아지, 상, 을, 받은, 루루]
>
>     // 품사·원형 정보가 담긴 Java 객체 목록으로 변환
>     List<KoreanTokenJava> javaTokens = OpenKoreanTextProcessorJava.tokensToJavaKoreanTokenList(tokens);
>     System.out.println(javaTokens.get(0).getText());   // 착한
>     System.out.println(javaTokens.get(0).getStem());   // 착하다
>     System.out.println(javaTokens.get(0).getPos());    // Adjective
>
>     // 구 추출 (filterSpam, includeHashtags)
>     List<KoreanPhraseExtractor.KoreanPhrase> phrases =
>         OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
>     System.out.println(phrases);
>   }
> }
> ```
>
> 전체 예제는 \[`examples/`](examples) 디렉터리에 있습니다.
>
> ## 사용법
>
> ### 정규화
>
> ```scala
> OpenKoreanTextProcessor.normalize("그랰ㅋㅋㅋㅋ 샤릉햌ㅋㅋ")
> // 그래ㅋㅋㅋ 사랑해ㅋㅋ
>
> OpenKoreanTextProcessor.normalize("가쟝 용기있는 사람이 머굼 되는거즤")
> // 가장 용기있는 사람이 먹음 되는거지
> ```
>
> ### 토큰화
>
> ```scala
> OpenKoreanTextProcessor.tokenize("착한강아지상을 받은 루루")
> // List(착한(Adjective(착하다): 0, 2), 강아지(Noun: 2, 3), 상(Suffix: 5, 1), 을(Josa: 6, 1),
> //      (Space: 7, 1), 받은(Verb(받다): 8, 2),  (Space: 10, 1), 루루(Noun: 11, 2))
> ```
>
> 사전에 없는 단어는 `후보*(Noun: 3, 2)`처럼 텍스트 뒤에 `*`가 붙고, `KoreanToken.unknown`이 `true`가 됩니다.
>
> #### 후보 N개 보기
>
> `tokenizeTopN`은 점수가 높은 순서로 N개의 분석 후보를 돌려줍니다. 반환 타입은 `Seq[Seq[Seq[KoreanToken]]]`이며, 바깥쪽부터 청크 → 후보 → 토큰 순입니다.
>
> ```scala
> OpenKoreanTextProcessor.tokenizeTopN("대선 후보", 3)
> // 첫 번째 청크("대선")의 후보:
> //   List(대선(Noun: 0, 2))
> //   List(대(Modifier: 0, 1), 선(Noun: 1, 1))
> //   List(대(Verb: 0, 1), 선(Noun: 1, 1))
> ```
>
> #### 토크나이저 프로필
>
> `TokenizerProfile`로 분석 후보를 고르는 점수 가중치를 바꿀 수 있습니다. 점수는 **낮을수록 좋은** 후보입니다. 지정하지 않은 값은 기본값을 씁니다.
>
> ```scala
> import org.openkoreantext.processor.tokenizer.TokenizerProfile
>
> val profile = TokenizerProfile(
>   unknownPosCount = 1.0f,
>   allNoun = 10,
>   preferredPattern = 4
> )
>
> OpenKoreanTextProcessor.tokenize(text, profile)
> OpenKoreanTextProcessor.tokenizeTopN(text, 3, profile)
> ```
>
> > Java용 래퍼(`OpenKoreanTextProcessorJava`)는 현재 `tokenizeTopN`과 프로필 지정 `tokenize`를 제공하지 않습니다.
>
> ### 구 추출
>
> ```scala
> OpenKoreanTextProcessor.extractPhrases(
>   tokens,
>   filterSpam = true,      // 스팸·욕설 용어 제외 (기본값: false)
>   enableHashtags = true   // 해시태그 포함 (기본값: true)
> )
> ```
>
> ```java
> // Java
> String text = "아름다운 트위터를 만들어 보자. 시발 #욕하지_말자";
> Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(text);
>
> OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
> // [아름다운 트위터(Noun: 0, 8), 트위터(Noun: 5, 3), #욕하지_말자(Hashtag: 21, 7)]
>
> OpenKoreanTextProcessorJava.extractPhrases(tokens, false, true);
> // [아름다운 트위터(Noun: 0, 8), 시발(Noun: 18, 2), 트위터(Noun: 5, 3), #욕하지_말자(Hashtag: 21, 7)]
> ```
>
> ### 문장 분리
>
> ```scala
> OpenKoreanTextProcessor.splitSentences("가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!")
> // List(가을이다!(0,5), 남자는 가을을 탄다......(6,22), 그렇지?(23,27), 루루야!(28,32), 버버리코트 사러 가자!!!!(33,48))
> ```
>
> 각 `Sentence`는 `text`, `start`, `end`를 가집니다.
>
> ### 역토큰화
>
> ```scala
> OpenKoreanTextProcessor.detokenize(List("연세", "대학교", "보건", "대학원", "에", "오신", "것", "을", "환영", "합니다", "!"))
> // 연세대학교 보건 대학원에 오신것을 환영합니다!
> ```
>
> ### 사용자 사전
>
> 기본 사전에 없는 단어는 직접 등록해서 쓸 수 있습니다.
>
> ```scala
> import org.openkoreantext.processor.util.KoreanPos
>
> // 명사 추가 (띄어쓰기가 있는 단어는 사용할 수 없습니다)
> OpenKoreanTextProcessor.addNounsToDictionary(Seq("춍춍", "챵챵챵"))
>
> // 품사를 지정해 추가
> OpenKoreanTextProcessor.addWordsToDictionary(KoreanPos.Adverb, Seq("얼렁"))
>
> // 제거
> OpenKoreanTextProcessor.removeWordsFromDictionary(KoreanPos.Noun, Seq("춍춍"))
> ```
>
> 예를 들어 `"춍춍춍춍챵챵챵"`은 등록 전에는 하나의 미등록어로 처리되지만, 위 명사를 등록하면 `[춍춍, 춍춍, 챵챵챵]`으로 나뉩니다.
>
> Java에서는 `KoreanPosJava` enum을 사용합니다.
>
> ```java
> OpenKoreanTextProcessorJava.addNounsToDictionary(Arrays.asList("춍춍", "챵챵챵"));
> OpenKoreanTextProcessorJava.addWordsToDictionary(KoreanPosJava.Adverb, Arrays.asList("얼렁"));
> OpenKoreanTextProcessorJava.removeWordFromDictionary(KoreanPosJava.Noun, Arrays.asList("춍춍"));
> ```
>
> > 사전 변경은 현재 JVM 프로세스의 메모리에만 반영되며 모든 호출에 전역으로 적용됩니다.
> > 영구 저장되지 않으므로 애플리케이션 시작 시 다시 등록해야 합니다.
>
> ### 사전 미리 로드
>
> 사전 리소스는 처음 사용할 때 지연 로드됩니다. 첫 요청의 지연을 피하고 싶다면 시작 시점에 직접 로드하세요.
>
> ```scala
> OpenKoreanTextProcessor.loadResources()
> ```
>
> ```java
> OpenKoreanTextProcessorJava.loadResources();
> ```
>
> ## 품사 태그
>
> `KoreanPos`에 정의된 품사입니다.
>
> **단어 수준**
>
> | 태그 | 설명 |
> | --- | --- |
> | `Noun` | 명사 (명사, 대명사, 고유명사, 수사, 의존명사 등) |
> | `Verb` | 동사 |
> | `Adjective` | 형용사 |
> | `Adverb` | 부사 |
> | `Determiner` | 관형사 |
> | `Exclamation` | 감탄사 |
> | `Conjunction` | 접속사 |
> | `Josa` | 조사 |
> | `Eomi` | 어말어미 |
> | `PreEomi` | 선어말어미 |
> | `Modifier` | 수식어 |
> | `VerbPrefix` | 동사 접두어 |
> | `Suffix` | 접미사 |
> | `Unknown` | 분석하지 못한 문자열 |
>
> **청크 수준 및 기타**
>
> | 태그 | 설명 |
> | --- | --- |
> | `Korean` | 한국어 청크 (분석 대상 후보) |
> | `Foreign` | 한글이 아닌 문자들 |
> | `Number` | 숫자 |
> | `KoreanParticle` | 자음·모음만으로 된 표현 (`ㅋㅋㅋ`, `ㅠㅠ`) |
> | `Alpha` | 알파벳 |
> | `Punctuation` | 문장부호 |
> | `Hashtag` | 해시태그 (`#한국어`) |
> | `ScreenName` | 사용자 이름 (`@name`) |
> | `Email` | 이메일 |
> | `URL` | URL |
> | `CashTag` | 캐시태그 (`$TWTR`) |
> | `Space` | 공백 |
> | `Others` | 그 밖의 문자 |
>
> ## 소스에서 빌드하기
>
> Maven과 JDK 8 이상이 필요합니다.
>
> ```bash
> mvn clean package   # 빌드 및 테스트
> mvn test            # 테스트만 실행
> ```
>
> ## 기여
>
> 버그 제보와 개선 제안은 \[GitHub Issues](https://github.com/open-korean-text/open-korean-text/issues)로 보내 주세요.
> 풀 리퀘스트를 보내기 전에 `mvn test`가 통과하는지 확인해 주세요.
>
> ## 라이선스
>
> 이 프로젝트는 \[Apache License 2.0](LICENSE)을 따릅니다.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # Open Korean Text
>
> Open Korean Text는 한국어 텍스트를 처리하는 Scala/Java 라이브러리입니다. 오타와 신조어, 줄임말이 섞인 SNS 글 같은 비정형 텍스트를 대상으로 정규화, 형태소 분석(토큰화), 어간 추출, 문장 분리, 구(phrase) 추출을 제공합니다.
>
> ```
> 입력:    한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어
> 정규화:  한국어를 처리하는 예시입니다ㅋㅋ #한국어
> 토큰화:  한국어(Noun) 를(Josa) 처리(Noun) 하는(Verb) 예시(Noun) 입니다(Adjective) ㅋㅋㅋ(KoreanParticle) #한국어(Hashtag)
> 구 추출: 한국어, 처리, 처리하는 예시, 예시, #한국어
> ```
>
> ## 기능
>
> | 기능 | 설명 |
> |---|---|
> | 정규화 | `그랰ㅋㅋㅋㅋㅋㅋ`를 `그래ㅋㅋ`로 바꾸는 식으로 오타와 반복 문자를 정리합니다. |
> | 토큰화 | 입력을 품사가 붙은 토큰으로 나눕니다. 각 토큰에는 위치(offset), 길이, 사전에 없는 단어인지 여부가 들어 있습니다. |
> | 상위 N개 후보 | 가장 점수가 좋은 분석 결과 하나가 아니라 상위 `n`개 후보를 받을 수 있습니다. |
> | 토큰화 프로필 | `TokenizerProfile`로 후보를 고르는 가중치를 조정합니다. 값이 낮을수록 좋은 점수입니다. |
> | 구 추출 | 토큰에서 명사구와 해시태그를 뽑습니다. 스팸·슬랭 단어를 걸러낼 수 있습니다. |
> | 문장 분리 | 텍스트를 문장 단위로 나눕니다. |
> | 디토크나이즈 | 단어 목록을 띄어쓰기를 갖춘 문자열로 합칩니다. |
> | 사용자 사전 | 명사를 포함해 품사별로 단어를 추가하거나 제거합니다. |
>
> ## 요구 사항
>
> - Java 1.8 이상
> - Scala 2.12 (pom.xml의 `scala.version`은 2.12.4)
> - 소스에서 빌드하려면 Maven 3.0.4 이상
>
> ## 설치
>
> Maven 의존성은 다음과 같습니다. `버전` 자리에는 사용할 릴리스 버전을 넣으세요.
>
> ```xml
> <dependency>
>   <groupId>org.openkoreantext</groupId>
>   <artifactId>open-korean-text</artifactId>
>   <version>버전</version>
> </dependency>
> ```
>
> 소스에서 빌드하고 테스트하려면 저장소 루트에서 실행합니다.
>
> ```bash
> mvn package
> ```
>
> ## 사용법
>
> ### Scala
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor.KoreanPhrase
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer.KoreanToken
>
> val text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어"
>
> // 정규화
> val normalized: CharSequence = OpenKoreanTextProcessor.normalize(text)
> println(normalized)
> // 한국어를 처리하는 예시입니다ㅋㅋ #한국어
>
> // 토큰화
> val tokens: Seq[KoreanToken] = OpenKoreanTextProcessor.tokenize(normalized)
> println(tokens)
> // List(한국어(Noun: 0, 3), 를(Josa: 3, 1),  (Space: 4, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2),  (Space: 9, 1), 예시(Noun: 10, 2), 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3),  (Space: 18, 1), #한국어(Hashtag: 19, 4))
>
> // 구 추출
> val phrases: Seq[KoreanPhrase] = OpenKoreanTextProcessor.extractPhrases(tokens, filterSpam = true, enableHashtags = true)
> println(phrases)
> // List(한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2), #한국어(Hashtag: 18, 4))
> ```
>
> 토큰 표기의 `(Noun: 0, 3)`은 품사와 원문에서의 시작 위치, 길이입니다. 공백도 `Space` 토큰으로 들어 있어서, 공백을 뺀 문자열 목록이 필요하면 `tokensToStrings`를 씁니다.
>
> ```scala
> OpenKoreanTextProcessor.tokensToStrings(tokens)
> ```
>
> ### Java
>
> Java에서는 `OpenKoreanTextProcessorJava`를 씁니다.
>
> ```java
> import java.util.List;
>
> import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
> import scala.collection.Seq;
>
> String text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어";
>
> // 정규화
> CharSequence normalized = OpenKoreanTextProcessorJava.normalize(text);
>
> // 토큰화
> Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);
> System.out.println(OpenKoreanTextProcessorJava.tokensToJavaKoreanTokenList(tokens));
> // [한국어(Noun: 0, 3), 를(Josa: 3, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2), 예시(Noun: 10, 2),
> // 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3), #한국어(Hashtag: 19, 4)]
>
> // 구 추출
> List<KoreanPhraseExtractor.KoreanPhrase> phrases =
>     OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
> System.out.println(phrases);
> // [한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2), #한국어(Hashtag: 18, 4)]
> ```
>
> `tokensToJavaKoreanTokenList`와 `tokensToJavaStringList`는 기본적으로 공백 토큰을 제외합니다. 공백을 남기려면 두 번째 인자 `keepSpace`에 `true`를 넘기세요.
>
> 전체 예제는 \[`examples/`](examples)에 있습니다.
>
> ### 사용자 사전
>
> 사전에 없는 단어는 직접 추가할 수 있습니다. 띄어쓰기가 있는 단어는 추가할 수 없습니다.
>
> ```scala
> OpenKoreanTextProcessor.addNounsToDictionary(Seq("오픈코리안텍스트"))
> OpenKoreanTextProcessor.addWordsToDictionary(KoreanPos.Noun, Seq("신조어"))
> OpenKoreanTextProcessor.removeWordsFromDictionary(KoreanPos.Noun, Seq("신조어"))
> ```
>
> ### 사전 미리 불러오기
>
> 사전 리소스는 대부분의 API를 처음 호출할 때 불러옵니다. 첫 호출 지연을 피하고 싶으면 `loadResources()`로 미리 불러올 수 있습니다.
>
> ```scala
> OpenKoreanTextProcessor.loadResources()
> ```
>
> ## 기여와 이슈
>
> 버그 제보와 질문은 \[GitHub Issues](https://github.com/open-korean-text/open-korean-text/issues)에 남겨 주세요.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # Open Korean Text
>
> 한국어 텍스트를 처리하는 Scala/Java 라이브러리입니다. 오타와 속어가 섞인 글을 정규화하고, 형태소 단위로 나누어 품사를 붙이고, 문장 분리와 구(phrase) 추출까지 할 수 있습니다.
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
>
> val normalized = OpenKoreanTextProcessor.normalize("그랰ㅋㅋㅋㅋ 샤릉햌ㅋㅋ")
> // 그래ㅋㅋㅋ 사랑해ㅋㅋ
>
> val tokens = OpenKoreanTextProcessor.tokenize(normalized)
> val phrases = OpenKoreanTextProcessor.extractPhrases(tokens)
> ```
>
> ## 제공 기능
>
> | 기능 | 설명 |
> |---|---|
> | 정규화 | `그랰ㅋㅋㅋㅋ`처럼 변형된 표기를 `그래ㅋㅋㅋ`로 바꿉니다. |
> | 토큰화 | 텍스트를 토큰으로 나누고 품사, 위치, 사전에 없는 단어 여부를 붙입니다. 동사·형용사 토큰에는 원형(stem)이 붙습니다. |
> | 문장 분리 | 텍스트를 문장으로 나누고 각 문장의 시작·끝 위치를 돌려줍니다. |
> | 구 추출 | 토큰에서 명사구와 해시태그를 뽑습니다. |
> | 디토큰화 | 단어 목록을 띄어쓰기에 맞게 이어 붙입니다. |
> | 사용자 사전 | 명사나 다른 품사의 단어를 사전에 넣고 뺄 수 있습니다. |
>
> ## 설치
>
> Maven 의존성은 다음과 같습니다.
>
> ```xml
> <dependency>
>   <groupId>org.openkoreantext</groupId>
>   <artifactId>open-korean-text</artifactId>
>   <version>2.1.0</version>
> </dependency>
> ```
>
> `pom.xml`은 Java 1.8, Scala 2.12.4 기준으로 빌드하도록 설정되어 있습니다.
>
> ## 사용법: Scala
>
> 모든 기능은 `OpenKoreanTextProcessor` 객체에 있습니다.
>
> ### 정규화와 토큰화
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor._
>
> val text = normalize("한국어를 처리하는 예시입니닼ㅋㅋㅋㅋ")
> val tokens = tokenize(text)
> println(tokens.mkString("/"))
> // 한국어(Noun: 0, 3)/를(Josa: 3, 1)/ (Space: 4, 1)/처리(Noun: 5, 2)/하는(Verb(하다): 7, 2)/
> // (Space: 9, 1)/예시(Noun: 10, 2)/입니다(Adjective(이다): 12, 3)/ㅋㅋㅋ(KoreanParticle: 15, 3)
> ```
>
> 토큰은 `텍스트(품사: 시작 위치, 길이)` 형식으로 출력됩니다. 동사와 형용사는 품사 뒤 괄호에 원형이 붙고(`Verb(하다)`), 사전에 없는 단어는 텍스트 뒤에 `*`가 붙습니다(`후보*`). 띄어쓰기는 `Space` 토큰으로 들어갑니다. 공백 토큰을 뺀 문자열만 필요하면 `tokensToStrings`를 씁니다.
>
> ```scala
> tokensToStrings(tokenize("사랑해"))
> // List(사랑, 해)
> ```
>
> 품사 목록은 `org.openkoreantext.processor.util.KoreanPos`에 있습니다.
>
> ### 후보 여러 개 받기와 토큰화 설정
>
> `tokenizeTopN`은 분석 후보를 점수가 좋은 순서로 `n`개까지 돌려줍니다. 결과는 텍스트 조각마다 후보 목록을 가진 3중 `Seq`입니다.
>
> ```scala
> tokenizeTopN("대선 후보", 3)
> // 대선:  [대선(Noun)] / [대(Modifier), 선(Noun)] / [대(Verb), 선(Noun)]
> // 공백:  [ (Space)]
> // 후보:  [후보(Noun)] / [후보*(Noun)] / [후(Noun), 보(Verb)]
> ```
>
> 위 출력은 각 후보를 줄여 적은 것입니다. 실제 결과의 각 토큰에는 위치와 길이도 들어 있습니다.
>
> `TokenizerProfile`로 분석 점수의 가중치를 바꿀 수 있습니다. 점수가 낮은 분석이 선택되며, 지정하지 않은 항목은 기본값을 씁니다. `tokenize`와 `tokenizeTopN` 모두 프로필을 받습니다.
>
> ```scala
> import org.openkoreantext.processor.tokenizer.TokenizerProfile
>
> val profile = TokenizerProfile(unknownPosCount = 1.0f, allNoun = 10, preferredPattern = 4)
> tokenize(text, profile)
> tokenizeTopN("대선 후보", 3, profile)
> ```
>
> ### 구 추출
>
> ```scala
> extractPhrases(tokens).mkString("/")
> // 한국어(Noun: 0, 3)/처리(Noun: 5, 2)/처리하는 예시(Noun: 5, 7)/예시(Noun: 10, 2)
> ```
>
> `extractPhrases(tokens, filterSpam = false, enableHashtags = true)`의 두 인자는 다음과 같습니다.
>
> - `filterSpam`: `true`이면 스팸·속어로 분류된 단어를 거릅니다(위 Java 예에서 `시발`이 빠지는 경우).
> - `enableHashtags`: `true`이면 해시태그를 결과에 포함합니다.
>
> ### 문장 분리
>
> ```scala
> splitSentences("가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!").mkString("/")
> // 가을이다!(0,5)/남자는 가을을 탄다......(6,22)/그렇지?(23,27)/루루야!(28,32)/버버리코트 사러 가자!!!!(33,48)
> ```
>
> 각 `Sentence`는 `text`, `start`, `end`를 가집니다.
>
> ### 디토큰화
>
> ```scala
> detokenize(List("연세", "대학교", "보건", "대학원", "에", "오신", "것", "을", "환영", "합니다", "!"))
> // 연세대학교 보건 대학원에 오신것을 환영합니다!
> ```
>
> ### 사용자 사전
>
> ```scala
> import org.openkoreantext.processor.util.KoreanPos
>
> addNounsToDictionary(List("후랴오교"))                    // 명사 추가
> addWordsToDictionary(KoreanPos.Conjunction, List("그란디")) // 품사를 지정해 추가
> removeWordsFromDictionary(KoreanPos.Noun, List("후랴오교")) // 제거
> ```
>
> 세 메서드는 사전이 바뀌었으면 `true`를 돌려줍니다. 띄어쓰기가 있는 단어는 허용되지 않습니다. 사전은 JVM 안에서 하나를 공유하므로 변경 내용이 이후의 모든 호출에 적용됩니다.
>
> ### 사전 미리 불러오기
>
> 사전 자원은 대부분의 메서드에서 처음 쓸 때 불러옵니다. 첫 호출이 느려지는 것을 피하려면 `loadResources()`로 미리 불러옵니다.
>
> ## 사용법: Java
>
> Java에서는 `OpenKoreanTextProcessorJava`를 씁니다. `tokenize`가 돌려주는 `scala.collection.Seq<KoreanToken>`을 `tokensToJavaStringList` 또는 `tokensToJavaKoreanTokenList`로 Java `List`로 바꿉니다. 두 메서드는 `keepSpace` 인자를 받으며, 생략하면 `false`여서 공백 토큰을 뺍니다.
>
> ```java
> import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
> import scala.collection.Seq;
>
> Seq<KoreanTokenizer.KoreanToken> tokens =
>     OpenKoreanTextProcessorJava.tokenize("착한강아지상을 받은 루루");
>
> OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens);
> // [착한, 강아지, 상, 을, 받은, 루루]
>
> OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens, true);
> // [착한, 강아지, 상, 을,  , 받은,  , 루루]
>
> OpenKoreanTextProcessorJava.tokensToJavaKoreanTokenList(tokens);
> // [착한(Adjective(착하다): 0, 2), 강아지(Noun: 2, 3), 상(Suffix: 5, 1), 을(Josa: 6, 1),
> //  받은(Verb(받다): 8, 2), 루루(Noun: 11, 2)]
> ```
>
> `KoreanTokenJava`에서는 `getText()`, `getPos()`, `getStem()`, `getOffset()`, `getLength()`, `isUnknown()`으로 값을 읽습니다. `getPos()`는 `KoreanPosJava` enum을 돌려줍니다.
>
> ### 정규화, 문장 분리, 디토큰화
>
> ```java
> OpenKoreanTextProcessorJava.normalize("힘들겟씀다 그래욬ㅋㅋㅋ");
> // 힘들겠습니다 그래요ㅋㅋㅋ
>
> OpenKoreanTextProcessorJava.splitSentences("가을이다! 남자는 가을을 탄다...... 그렇지?");
> // List<Sentence>
>
> OpenKoreanTextProcessorJava.detokenize(Arrays.asList("늘", "평온", "하게", "누워", "있", "는", "루루"));
> // 늘 평온하게 누워있는 루루
> ```
>
> ### 구 추출
>
> Java에서는 `filterSpam`과 `includeHashtags`를 모두 넘겨야 합니다.
>
> ```java
> Seq<KoreanTokenizer.KoreanToken> tokens =
>     OpenKoreanTextProcessorJava.tokenize("아름다운 트위터를 만들어 보자. 시발 #욕하지_말자");
>
> OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
> // [아름다운 트위터(Noun: 0, 8), 트위터(Noun: 5, 3), #욕하지_말자(Hashtag: 21, 7)]
>
> OpenKoreanTextProcessorJava.extractPhrases(tokens, false, true);
> // [아름다운 트위터(Noun: 0, 8), 시발(Noun: 18, 2), 트위터(Noun: 5, 3), #욕하지_말자(Hashtag: 21, 7)]
> ```
>
> ### 사용자 사전
>
> ```java
> OpenKoreanTextProcessorJava.addNounsToDictionary(Arrays.asList("춍춍", "챵챵챵"));
> // tokenize("춍춍춍춍챵챵챵")의 결과: [춍춍, 춍춍, 챵챵챵]  (추가하기 전에는 [춍춍춍춍챵챵챵])
>
> OpenKoreanTextProcessorJava.addWordsToDictionary(KoreanPosJava.Conjunction, Arrays.asList("그라믄"));
> OpenKoreanTextProcessorJava.removeWordFromDictionary(KoreanPosJava.Noun, Arrays.asList("평창올림픽"));
> ```
>
> 제거 메서드 이름은 `removeWordFromDictionary`(단수)입니다. Java 래퍼에는 `TokenizerProfile`을 받는 `tokenize`, `tokenizeTopN`, `tokensToStrings`가 없습니다. 필요하면 Scala 객체를 직접 호출합니다.
>
> ## 예제
>
> `examples/` 디렉터리에 Scala와 Java 예제 프로젝트가 있습니다.
>
> ## 개발
>
> 테스트는 `mvn test`로 실행합니다. surefire 설정에 JVM 힙 `-Xms1024m -Xmx2048m`이 지정되어 있습니다. 버그 신고와 문의는 \[GitHub Issues](https://github.com/open-korean-text/open-korean-text/issues)에 남겨 주세요.
>
> ## 라이선스
>
> Apache License 2.0입니다. 소스 파일 머리말에는 Copyright 2014 Twitter, Inc.가 적혀 있습니다. 전문은 \[LICENSE](LICENSE)를 참고하세요.

## 2회차

### 글빨 없음 — ✗ 근거 판정 실패

> # Open Korean Text
>
> Open Korean Text는 한국어 처리를 위한 Scala/Java 라이브러리입니다. 트위터, 문자 메시지, 댓글처럼 오타와 줄임말, 신조어가 많은 글에서도 안정적으로 동작하도록 만들어졌습니다.
>
> 원래 Twitter Korean Text로 시작한 프로젝트이며, 현재는 오픈소스 커뮤니티가 `org.openkoreantext` 아래에서 관리합니다.
>
> ## 주요 기능
>
> | 기능 | 설명 |
> | --- | --- |
> | 정규화 (Normalization) | 오타와 반복 표현을 바로잡습니다. `그랰ㅋㅋㅋㅋㅋㅋ` → `그래ㅋㅋ` |
> | 토큰화 (Tokenization) | 문장을 형태소 단위로 나누고 품사를 붙입니다. 사전에 없는 단어는 `unknown`으로 표시합니다. |
> | 어근화 (Stemming) | 동사와 형용사의 활용형에서 원형을 찾습니다. `하는` → `하다` |
> | 구(phrase) 추출 | 토큰에서 명사구와 해시태그를 뽑아 핵심어 후보를 만듭니다. |
> | 문장 분리 | 텍스트를 문장 단위로 나누고 각 문장의 위치를 돌려줍니다. |
> | 디토큰화 (Detokenization) | 토큰 목록을 자연스러운 문장으로 다시 합칩니다. |
> | 사용자 사전 | 명사를 포함한 품사별 단어를 런타임에 추가하거나 제거할 수 있습니다. |
>
> ## 요구 사항
>
> - JDK 8 이상
> - Scala 2.12 (Maven 빌드 기준)
> - 빌드 도구: Maven 3.0.4 이상
>
> ## 설치
>
> Maven 좌표는 다음과 같습니다.
>
> ```xml
> <dependency>
>   <groupId>org.openkoreantext</groupId>
>   <artifactId>open-korean-text</artifactId>
>   <version>버전</version>
> </dependency>
> ```
>
> `버전` 자리에는 \[Maven Central](https://search.maven.org/search?q=g:org.openkoreantext)에 올라온 최신 릴리스 버전을 넣으세요. 이 저장소의 `pom.xml`에 적힌 개발 버전은 `2.3.2-SNAPSHOT`입니다.
>
> ## 빠른 시작
>
> ### Scala
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor.KoreanPhrase
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer.KoreanToken
>
> val text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어"
>
> // 정규화
> val normalized: CharSequence = OpenKoreanTextProcessor.normalize(text)
> println(normalized)
> // 한국어를 처리하는 예시입니다ㅋㅋ #한국어
>
> // 토큰화
> val tokens: Seq[KoreanToken] = OpenKoreanTextProcessor.tokenize(normalized)
> println(tokens)
> // List(한국어(Noun: 0, 3), 를(Josa: 3, 1),  (Space: 4, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2),  (Space: 9, 1), 예시(Noun: 10, 2), 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3),  (Space: 18, 1), #한국어(Hashtag: 19, 4))
>
> // 구 추출
> val phrases: Seq[KoreanPhrase] =
>   OpenKoreanTextProcessor.extractPhrases(tokens, filterSpam = true, enableHashtags = true)
> println(phrases)
> // List(한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2), #한국어(Hashtag: 18, 4))
> ```
>
> ### Java
>
> Java에서는 `OpenKoreanTextProcessorJava`를 사용합니다. Scala 컬렉션을 Java 컬렉션으로 바꿔 주는 메서드가 들어 있습니다.
>
> ```java
> import java.util.List;
>
> import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
> import scala.collection.Seq;
>
> public class Example {
>   public static void main(String[] args) {
>     String text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어";
>
>     // 정규화
>     CharSequence normalized = OpenKoreanTextProcessorJava.normalize(text);
>     System.out.println(normalized);
>     // 한국어를 처리하는 예시입니다ㅋㅋ #한국어
>
>     // 토큰화
>     Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);
>     System.out.println(OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens));
>     // [한국어, 를, 처리, 하는, 예시, 입니, 다, ㅋㅋ, #한국어]
>     System.out.println(OpenKoreanTextProcessorJava.tokensToJavaKoreanTokenList(tokens));
>     // [한국어(Noun: 0, 3), 를(Josa: 3, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2), 예시(Noun: 10, 2),
>     // 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3), #한국어(Hashtag: 19, 4)]
>
>     // 구 추출
>     List<KoreanPhraseExtractor.KoreanPhrase> phrases =
>         OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
>     System.out.println(phrases);
>     // [한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2), #한국어(Hashtag: 18, 4)]
>   }
> }
> ```
>
> 전체 예제는 \[`examples/`](examples) 디렉터리에서 볼 수 있습니다.
>
> ## 사용법
>
> ### 토큰 읽는 법
>
> `tokenize`가 돌려주는 `KoreanToken`은 다음 정보를 가집니다.
>
> | 필드 | 설명 |
> | --- | --- |
> | `text` | 토큰 문자열 |
> | `pos` | 품사 (`KoreanPos`) |
> | `offset`, `length` | 원문에서의 시작 위치와 길이 |
> | `stem` | 동사·형용사의 원형 (없으면 `None`) |
> | `unknown` | 사전에 없는 단어이면 `true` |
>
> `toString` 형식은 `텍스트(품사: 시작위치, 길이)`입니다. 어근이 있으면 `하는(Verb(하다): 7, 2)`처럼 품사 뒤에 괄호로 붙고, 사전에 없는 단어는 `후보*(Noun: 3, 2)`처럼 텍스트 뒤에 `*`가 붙습니다.
>
> Scala의 `tokenize`는 공백도 `Space` 토큰으로 돌려줍니다. 공백을 뺀 문자열 목록이 필요하면 `tokensToStrings`를 쓰세요. Java의 `tokensToJavaStringList`와 `tokensToJavaKoreanTokenList`는 기본적으로 공백을 제외하며, `keepSpace` 인자에 `true`를 주면 포함합니다.
>
> ### 품사 태그
>
> | 구분 | 품사 |
> | --- | --- |
> | 단어 단위 | `Noun`(명사), `Verb`(동사), `Adjective`(형용사), `Adverb`(부사), `Determiner`(관형사), `Exclamation`(감탄사), `Josa`(조사), `Eomi`(어미), `PreEomi`(선어말어미), `Conjunction`(접속사), `Modifier`, `VerbPrefix`(동사 접두사), `Suffix`(접미사), `Unknown` |
> | 청크 단위 | `Korean`, `Foreign`, `Number`(숫자), `KoreanParticle`(ㅋㅋ, ㅎㅎ 같은 자모 표현), `Alpha`(알파벳), `Punctuation`(문장부호), `Hashtag`, `ScreenName`(@계정), `Email`, `URL`, `CashTag` |
> | 기능 | `Space`, `Others` |
>
> ### 상위 N개 후보 보기
>
> `tokenizeTopN`은 점수가 높은 순서대로 N개의 분석 후보를 돌려줍니다. 반환 타입은 `Seq[Seq[Seq[KoreanToken]]]`이고, 바깥쪽부터 차례로 청크, 후보, 토큰입니다.
>
> ```scala
> OpenKoreanTextProcessor.tokenizeTopN("대선 후보", 3)
> ```
>
> ### 토크나이저 튜닝
>
> `TokenizerProfile`로 후보를 고르는 기준의 가중치를 바꿀 수 있습니다. 점수가 낮을수록 좋은 후보입니다.
>
> ```scala
> import org.openkoreantext.processor.tokenizer.TokenizerProfile
>
> val profile = TokenizerProfile(
>   unknownPosCount = 1.0f,
>   allNoun = 10,
>   preferredPattern = 4
> )
>
> OpenKoreanTextProcessor.tokenize("대선 후보", profile)
> ```
>
> `TokenizerProfile`은 Scala 케이스 클래스이며, Java 래퍼(`OpenKoreanTextProcessorJava`)에는 프로파일을 받는 `tokenize`가 없습니다.
>
> ### 사용자 사전
>
> 사전에 없는 고유명사나 신조어는 직접 추가할 수 있습니다. 띄어쓰기가 있는 단어는 추가할 수 없습니다. 각 메서드는 `Boolean`을 돌려줍니다.
>
> ```scala
> import org.openkoreantext.processor.util.KoreanPos
>
> // 명사 추가
> OpenKoreanTextProcessor.addNounsToDictionary(Seq("평창올림픽"))
>
> // 품사를 지정해 추가
> OpenKoreanTextProcessor.addWordsToDictionary(KoreanPos.Conjunction, Seq("그라믄"))
>
> // 제거
> OpenKoreanTextProcessor.removeWordsFromDictionary(KoreanPos.Noun, Seq("평창올림픽"))
> ```
>
> Java에서는 `KoreanPosJava` 열거형을 사용합니다.
>
> ```java
> OpenKoreanTextProcessorJava.addWordsToDictionary(KoreanPosJava.Noun, Arrays.asList("평창올림픽"));
> OpenKoreanTextProcessorJava.removeWordFromDictionary(KoreanPosJava.Noun, Arrays.asList("평창올림픽"));
> ```
>
> 단어를 추가하거나 제거한 뒤에 `tokenize`를 호출해야 변경이 반영됩니다.
>
> ### 문장 분리
>
> ```scala
> OpenKoreanTextProcessor.splitSentences("가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!")
> // 가을이다!(0,5)/남자는 가을을 탄다......(6,22)/그렇지?(23,27)/루루야!(28,32)/버버리코트 사러 가자!!!!(33,48)
> ```
>
> ### 디토큰화
>
> ```scala
> OpenKoreanTextProcessor.detokenize(List("연세", "대학교", "보건", "대학원", "에", "오신", "것", "을", "환영", "합니다", "!"))
> // 연세대학교 보건 대학원에 오신것을 환영합니다!
> ```
>
> ### 사전 미리 불러오기
>
> 사전 파일은 처음 사용할 때 읽어 들이기 때문에 첫 호출이 느릴 수 있습니다. 서버를 시작할 때 미리 불러오려면 `loadResources()`를 호출하세요.
>
> ```scala
> OpenKoreanTextProcessor.loadResources()
> ```
>
> ## API 요약
>
> | Scala (`OpenKoreanTextProcessor`) | Java (`OpenKoreanTextProcessorJava`) |
> | --- | --- |
> | `normalize(text)` | `normalize(text)` |
> | `tokenize(text)`, `tokenize(text, profile)` | `tokenize(text)` |
> | `tokenizeTopN(text, n)`, `tokenizeTopN(text, n, profile)` | 제공하지 않음 |
> | `tokensToStrings(tokens)` | `tokensToJavaStringList(tokens[, keepSpace])` |
> | — | `tokensToJavaKoreanTokenList(tokens[, keepSpace])` |
> | `splitSentences(text)` | `splitSentences(text)` |
> | `extractPhrases(tokens, filterSpam, enableHashtags)` | `extractPhrases(tokens, filterSpam, includeHashtags)` |
> | `detokenize(tokens)` | `detokenize(tokens)` |
> | `addNounsToDictionary(words)` | `addNounsToDictionary(words)` |
> | `addWordsToDictionary(pos, words)` | `addWordsToDictionary(pos, words)` |
> | `removeWordsFromDictionary(pos, words)` | `removeWordFromDictionary(pos, words)` |
> | `loadResources()` | `loadResources()` |
>
> ## 빌드와 테스트
>
> ```bash
> mvn clean package
> mvn test
> ```
>
> 저장소에는 `build.sbt`도 있지만 버전이 오래되었습니다(Scala 2.11, 라이브러리 버전 4.0). 이 문서는 Maven 빌드(`pom.xml`)를 기준으로 합니다.
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)을 따릅니다.

**근거 판정 실패 이유(판정 모델)**

- 'tokenizeTopN은 점수가 높은 순서대로 N개의 분석 후보를 돌려준다'는 코드와 어긋난다(contradicted). TokenizerProfile.scala에 'Lower score is better'라고 적혀 있고, KoreanTokenizer는 후보를 score 오름차순으로 정렬한다. 즉 점수가 낮은 후보부터 나온다.

### 글빨 0.3.0 — ○ 근거 판정 통과

> # Open Korean Text
>
> Open Korean Text는 한국어 텍스트를 처리하는 Scala/Java 라이브러리입니다. 오탈자와 속어가 섞인 글도 정규화하고 형태소 단위로 나눌 수 있습니다.
>
> 제공하는 기능은 다음과 같습니다.
>
> - 정규화: `입니닼ㅋㅋㅋㅋㅋ` → `입니다ㅋㅋ`
> - 토큰화와 품사 태깅: 각 토큰의 품사, 위치, 사전에 없는 단어인지 여부를 함께 돌려줍니다.
> - 상위 N개 토큰화 후보 반환
> - 문장 분리
> - 구(phrase) 추출: 명사구와 해시태그를 뽑습니다.
> - 토큰 목록을 문장으로 되돌리는 역토큰화
> - 사용자 사전 추가·삭제
>
> ## 사용 예시
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor.KoreanPhrase
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer.KoreanToken
>
> val text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어"
>
> // 정규화
> val normalized: CharSequence = OpenKoreanTextProcessor.normalize(text)
> println(normalized)
> // 한국어를 처리하는 예시입니다ㅋㅋ #한국어
>
> // 토큰화
> val tokens: Seq[KoreanToken] = OpenKoreanTextProcessor.tokenize(normalized)
> println(tokens)
> // List(한국어(Noun: 0, 3), 를(Josa: 3, 1),  (Space: 4, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2),  (Space: 9, 1), 예시(Noun: 10, 2), 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3),  (Space: 18, 1), #한국어(Hashtag: 19, 4))
>
> // 구 추출
> val phrases: Seq[KoreanPhrase] = OpenKoreanTextProcessor.extractPhrases(tokens, filterSpam = true, enableHashtags = true)
> println(phrases)
> // List(한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2), #한국어(Hashtag: 18, 4))
> ```
>
> 토큰은 `텍스트(품사: 시작 위치, 길이)` 형태로 출력됩니다. 동사와 형용사는 `하는(Verb(하다): 7, 2)`처럼 괄호 안에 원형도 표시합니다.
>
> Java에서는 `OpenKoreanTextProcessorJava`를 사용합니다. `tokenize`는 Scala의 `Seq`를 돌려주므로 `tokensToJavaStringList`나 `tokensToJavaKoreanTokenList`로 Java `List`로 바꿉니다. 이 메서드들은 기본적으로 공백 토큰을 뺍니다. 공백을 남기려면 두 번째 인자 `keepSpace`에 `true`를 넘깁니다.
>
> ```java
> import java.util.List;
>
> import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
> import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor;
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer;
> import scala.collection.Seq;
>
> String text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어";
>
> // 정규화
> CharSequence normalized = OpenKoreanTextProcessorJava.normalize(text);
> System.out.println(normalized);
> // 한국어를 처리하는 예시입니다ㅋㅋ #한국어
>
> // 토큰화
> Seq<KoreanTokenizer.KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize(normalized);
> System.out.println(OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens));
> // [한국어, 를, 처리, 하는, 예시, 입니, 다, ㅋㅋ, #한국어]
> System.out.println(OpenKoreanTextProcessorJava.tokensToJavaKoreanTokenList(tokens));
> // [한국어(Noun: 0, 3), 를(Josa: 3, 1), 처리(Noun: 5, 2), 하는(Verb(하다): 7, 2), 예시(Noun: 10, 2),
> // 입니다(Adjective(이다): 12, 3), ㅋㅋㅋ(KoreanParticle: 15, 3), #한국어(Hashtag: 19, 4)]
>
> // 구 추출
> List<KoreanPhraseExtractor.KoreanPhrase> phrases = OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
> System.out.println(phrases);
> // [한국어(Noun: 0, 3), 처리(Noun: 5, 2), 처리하는 예시(Noun: 5, 7), 예시(Noun: 10, 2), #한국어(Hashtag: 18, 4)]
> ```
>
> 전체 예제는 \[`examples/`](examples)에 있습니다.
>
> ## 설치
>
> Maven 의존성은 다음과 같습니다.
>
> ```xml
> <dependency>
>   <groupId>org.openkoreantext</groupId>
>   <artifactId>open-korean-text</artifactId>
>   <version>사용할 버전</version>
> </dependency>
> ```
>
> `pom.xml`은 Java 1.8 이상, Scala 2.12.4 기준으로 빌드하며 개발 중인 버전은 `2.3.2-SNAPSHOT`입니다. `slf4j-nop`은 `provided` 범위라서 로깅 구현은 사용하는 쪽에서 정해야 합니다.
>
> ## API
>
> Scala는 `OpenKoreanTextProcessor`, Java는 `OpenKoreanTextProcessorJava`에 있습니다. Java 래퍼는 일부 메서드만 제공합니다.
>
> | 기능 | Scala (`OpenKoreanTextProcessor`) | Java (`OpenKoreanTextProcessorJava`) |
> |---|---|---|
> | 정규화 | `normalize(text)` | `normalize(text)` |
> | 토큰화 | `tokenize(text)`, `tokenize(text, profile)` | `tokenize(text)` |
> | 상위 N개 후보 | `tokenizeTopN(text, n)`, `tokenizeTopN(text, n, profile)` | 없음 |
> | 토큰을 문자열로 변환 | `tokensToStrings(tokens)` | `tokensToJavaStringList(tokens)` |
> | 문장 분리 | `splitSentences(text)` | `splitSentences(text)` |
> | 구 추출 | `extractPhrases(tokens, filterSpam, enableHashtags)` | `extractPhrases(tokens, filterSpam, includeHashtags)` |
> | 역토큰화 | `detokenize(tokens)` | `detokenize(tokens)` |
> | 명사 사전에 추가 | `addNounsToDictionary(words)` | `addNounsToDictionary(words)` |
> | 품사별 사전에 추가 | `addWordsToDictionary(pos, words)` | `addWordsToDictionary(pos, words)` |
> | 품사별 사전에서 삭제 | `removeWordsFromDictionary(pos, words)` | `removeWordFromDictionary(pos, words)` |
> | 사전 미리 로드 | `loadResources()` | `loadResources()` |
>
> `extractPhrases`에서 `filterSpam`은 스팸·속어 용어를 걸러내는 옵션으로, 기본값은 `false`입니다. 해시태그를 포함하는 옵션의 기본값은 `true`입니다. Java에서는 두 값을 모두 넘겨야 합니다.
>
> ### 토큰화 설정
>
> `tokenize`와 `tokenizeTopN`은 `TokenizerProfile`을 받을 수 있습니다. 후보를 고르는 점수의 가중치를 담은 case class이며, 점수가 낮을수록 좋은 후보입니다. 인자를 생략하면 `TokenizerProfile.defaultProfile`의 값이 쓰입니다.
>
> ### 사용자 사전
>
> `addNounsToDictionary`와 `addWordsToDictionary`는 메모리에 올라온 사전에 단어를 더합니다. 띄어쓰기가 있는 단어는 추가할 수 없습니다.
>
> 사전은 API를 처음 호출할 때 지연 로드됩니다. 첫 호출을 느리게 만들고 싶지 않다면 시작 시점에 `loadResources()`를 호출합니다.
>
> ### 품사
>
> `KoreanPos`에 정의된 품사는 다음과 같습니다.
>
> - 단어 단위: `Noun`, `Verb`, `Adjective`, `Adverb`, `Determiner`, `Exclamation`, `Josa`, `Eomi`, `PreEomi`, `Conjunction`, `Modifier`, `VerbPrefix`, `Suffix`, `Unknown`, `ProperNoun`
> - 덩어리 단위: `Korean`, `Foreign`, `Number`, `KoreanParticle`, `Alpha`, `Punctuation`, `Hashtag`, `ScreenName`, `Email`, `URL`, `CashTag`
> - 기타: `Space`, `Others`
>
> ## 빌드와 테스트
>
> Maven으로 빌드합니다. 테스트는 JUnit(Java)과 ScalaTest(Scala)로 작성되어 있고, `pom.xml`의 surefire 설정은 테스트 JVM 힙을 `-Xms1024m -Xmx2048m`으로 지정합니다.
>
> ```bash
> mvn test
> ```
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE). 저작권은 Twitter, Inc.(2014)에 있습니다.

### 글빨 0.4.0 — ○ 근거 판정 통과

> # Open Korean Text
>
> Open Korean Text는 한국어 문장을 처리하는 Scala/Java 라이브러리입니다. 오류와 은어가 섞인 글도 토큰으로 나누고, 토큰마다 품사를 붙입니다. 토큰화 외에 정규화, 문장 분리, 구 추출, 토큰 복원 기능이 있습니다.
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
>
> val normalized = OpenKoreanTextProcessor.normalize("그랰ㅋㅋㅋㅋ 샤릉햌ㅋㅋ")
> // 그래ㅋㅋㅋ 사랑해ㅋㅋ
> ```
>
> ## 설치
>
> Maven 저장소 배포 여부는 이 저장소에서 확인할 수 없습니다. 소스에서 직접 설치하려면 저장소 루트에서 다음 명령을 실행합니다.
>
> ```
> mvn install
> ```
>
> 설치한 뒤 프로젝트의 `pom.xml`에 의존성을 추가합니다. 버전은 이 저장소 `pom.xml`에 적힌 값입니다.
>
> ```xml
> <dependency>
>   <groupId>org.openkoreantext</groupId>
>   <artifactId>open-korean-text</artifactId>
>   <version>2.3.2-SNAPSHOT</version>
> </dependency>
> ```
>
> ## 시작하기
>
> 정규화한 문장을 토큰으로 나누고, 토큰에서 명사구를 뽑는 예입니다.
>
> ```scala
> import org.openkoreantext.processor.OpenKoreanTextProcessor
>
> val text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋ"
> val normalized = OpenKoreanTextProcessor.normalize(text)
> val tokens = OpenKoreanTextProcessor.tokenize(normalized)
> println(tokens.mkString("/"))
> // 한국어(Noun: 0, 3)/를(Josa: 3, 1)/ (Space: 4, 1)/처리(Noun: 5, 2)/하는(Verb(하다): 7, 2)/ (Space: 9, 1)/예시(Noun: 10, 2)/입니다(Adjective(이다): 12, 3)/ㅋㅋㅋ(KoreanParticle: 15, 3)
>
> val phrases = OpenKoreanTextProcessor.extractPhrases(tokens)
> println(phrases.mkString("/"))
> // 한국어(Noun: 0, 3)/처리(Noun: 5, 2)/처리하는 예시(Noun: 5, 7)/예시(Noun: 10, 2)
> ```
>
> `examples/` 폴더에 Scala와 Java 예제 파일이 있습니다. 주석에 적힌 출력은 위 결과와 다른 곳이 있으니 직접 실행한 값을 기준으로 삼으세요.
>
> ## 사용법
>
> 아래 메서드는 모두 `OpenKoreanTextProcessor`에 있습니다. Java에서는 \[Java에서 쓰기](#java에서-쓰기)를 참고하세요.
>
> ### 정규화
>
> `normalize(text)`는 구어체 표기를 표준에 가깝게 바꿉니다. 입력과 같은 `CharSequence`를 돌려줍니다.
>
> ```scala
> OpenKoreanTextProcessor.normalize("그랰ㅋㅋㅋㅋ 샤릉햌ㅋㅋ")
> // 그래ㅋㅋㅋ 사랑해ㅋㅋ
> ```
>
> ### 토큰화
>
> `tokenize(text)`는 `Seq[KoreanToken]`을 돌려줍니다. 토큰은 `text(품사: 시작 위치, 길이)` 형태로 출력됩니다.
>
> - 동사와 형용사는 품사 뒤 괄호에 기본형이 붙습니다. 예: `하는(Verb(하다): 7, 2)`
> - 사전에 없는 단어는 텍스트 뒤에 `*`가 붙습니다. 예: `후보*(Noun: 3, 2)`
> - 공백도 `Space` 토큰으로 포함됩니다.
>
> `KoreanToken`의 필드는 `text`, `pos`, `offset`, `length`, `stem`(`Option[String]`), `unknown`(`Boolean`)입니다.
>
> 공백 토큰을 뺀 문자열만 필요하면 `tokensToStrings`를 씁니다.
>
> ```scala
> OpenKoreanTextProcessor.tokensToStrings(OpenKoreanTextProcessor.tokenize("사랑해"))
> // List(사랑, 해)
> ```
>
> ### 후보 여러 개 받기와 프로파일
>
> `tokenizeTopN(text, n)`은 상위 `n`개의 분석 후보를 돌려줍니다. 반환 타입은 `Seq[Seq[Seq[KoreanToken]]]`입니다. 바깥 Seq의 원소는 입력을 나눈 덩어리이고, 그 안의 Seq는 후보, 가장 안쪽 Seq는 후보를 이루는 토큰입니다. `"대선 후보"`를 `n = 3`으로 분석하면 첫 덩어리 `대선`의 후보는 다음과 같습니다.
>
> ```
> List(대선(Noun: 0, 2))
> List(대(Modifier: 0, 1), 선(Noun: 1, 1))
> List(대(Verb: 0, 1), 선(Noun: 1, 1))
> ```
>
> `tokenize`와 `tokenizeTopN`은 `TokenizerProfile`을 추가 인자로 받습니다. 프로파일의 각 항목은 후보의 점수에 반영되는 가중치이고, 점수가 낮을수록 좋은 분석입니다. 모든 항목에 기본값이 있어서 바꿀 항목만 지정하면 됩니다. 기본값과 다른 프로파일을 쓰면 결과가 달라질 수 있습니다.
>
> ```scala
> import org.openkoreantext.processor.tokenizer.TokenizerProfile
>
> val profile = TokenizerProfile(
>   unknownPosCount = 1.0f,
>   allNoun = 10,
>   preferredPattern = 4
> )
> OpenKoreanTextProcessor.tokenize("대선 후보", profile)
> OpenKoreanTextProcessor.tokenizeTopN("대선 후보", 3, profile)
> ```
>
> ### 사용자 사전
>
> 사전에 단어를 더하거나 뺄 수 있습니다. 공백이 들어간 단어는 지원하지 않습니다. 사전은 하나를 공유하므로 변경은 같은 JVM의 이후 모든 호출에 적용됩니다.
>
> ```scala
> import org.openkoreantext.processor.util.KoreanPos
>
> // 명사 추가
> OpenKoreanTextProcessor.addNounsToDictionary(List("후랴오교"))
>
> // 품사를 지정해 추가
> OpenKoreanTextProcessor.addWordsToDictionary(KoreanPos.Conjunction, List("그란디"))
>
> // 제거
> OpenKoreanTextProcessor.removeWordsFromDictionary(KoreanPos.Noun, List("평창올림픽"))
> ```
>
> 세 메서드 모두 `Boolean`을 돌려줍니다. 효과는 토큰화 결과에서 볼 수 있습니다. 테스트에서 `"춍춍춍춍챵챵챵"`은 `춍춍`과 `챵챵챵`을 명사로 추가하기 전에는 `춍춍춍춍챵챵챵` 한 토큰이고, 추가한 뒤에는 `춍춍`, `춍춍`, `챵챵챵`으로 나뉩니다.
>
> ### 문장 분리
>
> `splitSentences(text)`는 `Seq[Sentence]`를 돌려줍니다. 각 문장은 `텍스트(시작, 끝)` 형태로 출력됩니다.
>
> ```scala
> OpenKoreanTextProcessor.splitSentences("가을이다! 남자는 가을을 탄다...... 그렇지? 루루야! 버버리코트 사러 가자!!!!").mkString("/")
> // 가을이다!(0,5)/남자는 가을을 탄다......(6,22)/그렇지?(23,27)/루루야!(28,32)/버버리코트 사러 가자!!!!(33,48)
> ```
>
> ### 구 추출
>
> `extractPhrases(tokens, filterSpam = false, enableHashtags = true)`는 토큰에서 명사구를 뽑아 `Seq[KoreanPhrase]`로 돌려줍니다.
>
> - `filterSpam`: `true`면 스팸·은어 단어를 걸러 냅니다.
> - `enableHashtags`: `true`면 해시태그를 결과에 포함합니다.
>
> ### 토큰 복원
>
> `detokenize(tokens)`는 단어 목록을 문장으로 합칩니다. 조사와 어미 등은 앞 단어에 붙입니다.
>
> ```scala
> OpenKoreanTextProcessor.detokenize(List("늘", "평온", "하게", "누워", "있", "는", "루루"))
> // 늘 평온하게 누워있는 루루
> ```
>
> ### 사전 미리 읽기
>
> 사전은 대부분의 메서드가 처음 호출될 때 읽습니다. 첫 호출의 지연을 미리 치르고 싶다면 `loadResources()`를 호출합니다.
>
> ## Java에서 쓰기
>
> `OpenKoreanTextProcessorJava`가 같은 기능을 정적 메서드로 제공합니다. `tokenize`는 `scala.collection.Seq<KoreanToken>`을 돌려주므로 아래 메서드로 Java 리스트로 바꿔 씁니다.
>
> - `tokensToJavaStringList(tokens)`: 토큰 문자열 목록
> - `tokensToJavaKoreanTokenList(tokens)`: `KoreanTokenJava` 목록
>
> 두 메서드는 두 번째 인자 `keepSpace`를 받으며, 생략하면 `false`여서 공백 토큰을 뺍니다.
>
> ```java
> import org.openkoreantext.processor.OpenKoreanTextProcessorJava;
> import org.openkoreantext.processor.tokenizer.KoreanTokenizer.KoreanToken;
> import scala.collection.Seq;
>
> Seq<KoreanToken> tokens = OpenKoreanTextProcessorJava.tokenize("착한강아지상을 받은 루루");
>
> OpenKoreanTextProcessorJava.tokensToJavaStringList(tokens);
> // [착한, 강아지, 상, 을, 받은, 루루]
>
> OpenKoreanTextProcessorJava.tokensToJavaKoreanTokenList(tokens);
> // [착한(Adjective(착하다): 0, 2), 강아지(Noun: 2, 3), 상(Suffix: 5, 1), 을(Josa: 6, 1), 받은(Verb(받다): 8, 2), 루루(Noun: 11, 2)]
> ```
>
> `KoreanTokenJava`에는 `getText()`, `getStem()`, `getOffset()`, `getLength()`, `getPos()`, `isUnknown()`이 있습니다. 기본형이 없는 토큰의 `getStem()`은 빈 문자열입니다.
>
> 구 추출은 `extractPhrases(tokens, filterSpam, includeHashtags)`로 호출하며 두 불리언 인자를 모두 넘겨야 합니다.
>
> ```java
> Seq<KoreanToken> tokens =
>     OpenKoreanTextProcessorJava.tokenize("아름다운 트위터를 만들어 보자. 시발 #욕하지_말자");
>
> OpenKoreanTextProcessorJava.extractPhrases(tokens, true, true);
> // [아름다운 트위터(Noun: 0, 8), 트위터(Noun: 5, 3), #욕하지_말자(Hashtag: 21, 7)]
>
> OpenKoreanTextProcessorJava.extractPhrases(tokens, false, true);
> // [아름다운 트위터(Noun: 0, 8), 시발(Noun: 18, 2), 트위터(Noun: 5, 3), #욕하지_말자(Hashtag: 21, 7)]
> ```
>
> 사용자 사전은 품사에 `KoreanPosJava` 열거형을 씁니다.
>
> ```java
> import java.util.Arrays;
>
> OpenKoreanTextProcessorJava.addNounsToDictionary(Arrays.asList("춍춍", "챵챵챵"));
> OpenKoreanTextProcessorJava.addWordsToDictionary(KoreanPosJava.Conjunction, Arrays.asList("그라믄"));
> OpenKoreanTextProcessorJava.removeWordFromDictionary(KoreanPosJava.Noun, Arrays.asList("평창올림픽"));
> ```
>
> `normalize`, `splitSentences`, `detokenize`, `loadResources`는 Scala와 같은 이름으로 쓰며, `splitSentences`는 `List<Sentence>`를 돌려줍니다. Java 래퍼에는 `tokenizeTopN`과 `TokenizerProfile`을 받는 `tokenize`가 없습니다.
>
> ## 품사
>
> `KoreanPos`의 값은 세 묶음입니다.
>
> - 단어 수준: `Noun`, `Verb`, `Adjective`, `Adverb`, `Determiner`, `Exclamation`, `Josa`, `Eomi`, `PreEomi`, `Conjunction`, `Modifier`, `VerbPrefix`, `Suffix`, `Unknown`
> - 덩어리 수준: `Korean`, `Foreign`, `Number`, `KoreanParticle`, `Alpha`, `Punctuation`, `Hashtag`, `ScreenName`, `Email`, `URL`, `CashTag`
> - 기능: `Space`, `Others`
>
> `ProperNoun`도 정의되어 있습니다.
>
> ## 요구 사항
>
> - Java 1.8 이상 (`pom.xml`의 컴파일 대상 1.8)
> - Maven 3.0.4 이상 (소스에서 빌드할 때)
> - Scala 2.12.4 (`pom.xml`의 `scala.version`)
>
> ## 라이선스
>
> \[Apache License 2.0](LICENSE)입니다.

## 품질 비교

두 결과가 모두 근거 판정을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.4.0 | 순서를 바꾸면 판정이 바뀜 |
| 2 | 글빨 없음 vs 글빨 0.4.0 | 비교 안 함(근거 판정 실패) |
| 1 | 글빨 0.3.0 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |
| 2 | 글빨 0.3.0 vs 글빨 0.4.0 | 글빨 0.4.0 우세 |

<details><summary>1회차 글빨 없음 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.4.0) → 차이 없음

X는 요구 사항, Java 전체 예제, 품사 표 덕분에 처음 보는 사용자가 쓰기에 탄탄합니다. 하지만 버전이 자리표시자이고, 구 추출과 Java 토큰화 내용이 빠른 시작과 사용법에 겹칩니다. Y는 첫 화면에 코드 예제와 실제 버전 번호가 있고, 설명이 문장으로 이어지며, Java 래퍼의 차이(단수형 메서드 이름, 없는 메서드)를 짚어 줍니다. 하지만 surefire 힙 설정 같은 내부 정보를 넣었고 아직 나오지 않은 예제를 \"위\"라고 가리킵니다. 기준별로 엇갈리고 차이가 크지 않아 무승부로 판정합니다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 없음) → 글빨 0.4.0 우세

X는 구체적인 버전 정보와 첫 사용 예를 앞부분에 두었고, 기능마다 한 번씩만 설명한다. Java 래퍼의 차이도 정확하게 짚는다. Y는 빠른 시작이나 Java 전체 클래스 예제처럼 친절한 부분이 있다. 하지만 버전이 자리표시로만 남아 있고, 빠른 시작과 사용법이 겹치며, 긴 품사 표가 들어가 문서가 필요 이상으로 길어졌다. 차이가 크지는 않지만 그대로 올리기에는 X가 낫다.

</details>

<details><summary>1회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

X는 간결하고 도입부가 좋다. 그러나 설치 버전이 자리표시자이고, 기능 표에 든 상위 N개 후보·프로필·문장 분리·디토크나이즈의 사용 예가 없어 독자가 직접 찾아야 한다. Y는 구체적인 버전과 모든 기능의 예제, Java 래퍼와 Scala API의 차이까지 담아 실사용에 더 쓸모 있다. 일부 부수 정보로 분량이 늘었지만 대부분 독자에게 필요한 내용이다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

X는 구체적인 설치 버전과 모든 기능의 사용 예를 담고, Java 래퍼와 Scala API의 차이까지 알려 주어 그대로 올릴 README로 더 쓸모 있다. Y는 첫머리 예시가 깔끔하지만, 기능 표에 적은 기능 일부에 사용법이 없고 버전도 자리표시자로 남겼으며, 예시 출력의 위치와 길이가 서로 맞지 않는다.

</details>

<details><summary>2회차 글빨 0.3.0 vs 글빨 0.4.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.3.0, 결과 Y = 글빨 0.4.0) → 글빨 0.4.0 우세

Y는 첫 사용 예와 버전이 적힌 설치 방법을 앞에 두었고, 메서드마다 예시와 반환 형태를 보여 준다. Java 사용법도 따로 정리해 README로서 더 쓸모 있다. X는 API 표 덕분에 간결하게 훑어보기 좋지만, 설치 버전을 \"사용할 버전\"으로 비워 두었고 Java 예시의 출력이 앞뒤로 맞지 않는다. Y는 분량이 길고 메타 문장이 몇 개 있지만 실제 사용에 필요한 정보가 더 정확하다.

**2번째 판정** (결과 X = 글빨 0.4.0, 결과 Y = 글빨 0.3.0) → 글빨 0.4.0 우세

X는 시작 예, 소스 설치 방법, 기능별 예제와 출력, Java 사용법, 요구 사항, 라이선스를 빠짐없이 갖췄고 예제 출력도 앞뒤가 맞습니다. Y는 더 간결하고 대응 표가 편하지만, 설치 버전을 비워 두었고 같은 예제 안에서 출력이 서로 어긋나 독자가 결과를 믿고 따라 하기 어렵습니다.

</details>

