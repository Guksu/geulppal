# `en-docs-tile-seeding`

[← 처음 보는 사례 목록](README.md) · 수정 · 기술 문서 · 영어

## 요청

> Can you tighten up this section of our docs? It feels bloated.

## 원문

> ## Seeding the tile cache
>
> It is important to note that seeding is a crucial step that plays a vital role in ensuring a smooth experience for your users. In today's fast-paced world, nobody wants to wait for map tiles to load. Seeding pre-renders tiles ahead of time so that they are served from the cache instead of being rendered on demand. In other words, seeding means rendering tiles before users request them.
>
> To seed tiles, run the following command:
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> The `--zoom` option takes a range of zoom levels. The `--bbox` option takes the bounding box in the order `minLon,minLat,maxLon,maxLat`. If `--bbox` is omitted, the layer's full extent is used, which can take a very long time for global layers.
>
> By default, `geotile seed` uses 4 worker processes. You can change this with `--workers`. Please be aware that each worker uses roughly 600 MB of memory. This figure was measured on our reference setup (raster layers, 256px tiles, PNG output) and may be considerably higher for vector layers with many features.
>
> Existing tiles are skipped by default. To overwrite them, pass `--force`. Note that `--force` does not delete tiles outside the bounding box; it only re-renders tiles inside it.
>
> ### Limitations
>
> There are a number of limitations that you should be aware of:
>
> - Seeding vector layers above zoom 16 is not supported.
> - Seeding cannot be resumed after interruption yet. If the process stops, you need to run it again; already rendered tiles will be skipped unless `--force` is set.
> - The S3 storage backend is experimental for seeding and has only been tested with AWS S3, not with S3-compatible services such as MinIO.
>
> In conclusion, seeding is a powerful feature that can dramatically improve the performance of your map application. By following the steps above, you will be well on your way to delivering a blazing-fast map experience.

<details><summary>평가 기준 (작성 모델에는 보여 주지 않음)</summary>

**남아야 할 것**

- 시딩은 요청 전에 타일을 미리 렌더링해 캐시에서 제공하는 것이라는 정의
- 예시 명령 전체
- --zoom은 줌 레벨 범위를 받는다는 점
- --bbox 좌표 순서 minLon,minLat,maxLon,maxLat
- --bbox를 생략하면 레이어 전체 범위를 쓰고, 전 지구 레이어에서는 매우 오래 걸릴 수 있다는 점
- 기본 워커 4개와 --workers로 변경 가능
- 워커당 약 600 MB가 기준 환경(래스터 레이어, 256px 타일, PNG 출력)에서 측정한 값이고 피처가 많은 벡터 레이어에서는 훨씬 클 수 있다는 점
- 기존 타일은 기본적으로 건너뛰고 --force로 덮어쓴다는 점
- --force는 bbox 밖 타일을 지우지 않고 안쪽만 다시 렌더링한다는 대조
- 한계 세 가지: 벡터 레이어 줌 16 초과 미지원, 중단 후 재개 불가(다시 실행하면 기존 타일은 --force가 없으면 건너뜀), S3 백엔드는 실험 단계이며 AWS S3에서만 테스트했고 MinIO 같은 S3 호환 서비스에서는 테스트하지 않음

**있으면 안 되는 변경**

- 명령, 옵션 이름, 좌표, 좌표 순서 표기 바꾸기
- 600 MB 수치에서 측정 조건을 빼거나 벡터 레이어 단서 삭제
- --force가 bbox 밖 타일을 지운다고 쓰거나 이 대조를 삭제하기
- 재개 기능이나 MinIO 지원이 있거나 곧 추가된다고 쓰기
- 세 가지 한계 중 하나를 빼거나 원문에 없는 한계, 옵션 추가
- 원문에 없는 성능 주장이나 수치를 새로 넣기

**글자 그대로 남아야 할 문자열**: `geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70`, `geotile seed`, `--zoom`, `--bbox`, `minLon,minLat,maxLon,maxLat`, `--workers`, `--force`, `MinIO`

**메모**: 영어 기술 문서에서 상투적인 도입·결론과 같은 말 반복을 걷어내는지 본다. 동시에 명령·옵션 표기, 측정 조건, 필요한 부정 대조(--force의 동작 범위, MinIO 미테스트), 실제 세 항목인 한계 목록을 보존하는지 확인한다.

</details>

## 1회차

### 글빨 없음 — ○ 의미 보존 통과

> Here's a tightened version. I cut the filler intro and the closing paragraph, and I merged the repeated definition of seeding. All the technical details are still there.
>
> ```markdown
> ## Seeding the tile cache
>
> Seeding pre-renders tiles so they're served from the cache instead of being rendered on demand. Users don't wait for tiles to load.
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> - `--zoom` takes a range of zoom levels.
> - `--bbox` takes `minLon,minLat,maxLon,maxLat`. If omitted, the layer's full extent is used, which can take a very long time for global layers.
> - `--workers` sets the number of worker processes (default: 4). Each worker uses roughly 600 MB of memory, measured on our reference setup (raster layers, 256px tiles, PNG output). Vector layers with many features may use considerably more.
> - `--force` re-renders existing tiles, which are skipped by default. It only re-renders tiles inside the bounding box and doesn't delete tiles outside it.
>
> ### Limitations
>
> - Seeding vector layers above zoom 16 is not supported.
> - Seeding cannot be resumed after interruption. Run it again; already rendered tiles are skipped unless `--force` is set.
> - The S3 backend is experimental for seeding. It has only been tested with AWS S3, not S3-compatible services such as MinIO.
> ```
>
> Changes to check:
> - **Options as a list:** I turned the option paragraphs into a bulleted list so they're easier to scan. If you prefer prose, that's easy to revert.
> - **Dropped "yet":** I removed it from "cannot be resumed after interruption yet". If resume support is planned, you may want to keep it.
> - **Cut sentences:** I removed "It is important to note…", "In today's fast-paced world…", "In other words…", "Please be aware…" and the "In conclusion" paragraph. They added no information.

### 글빨 0.1.0 — ○ 의미 보존 통과

> ## Seeding the tile cache
>
> Seeding pre-renders tiles so they are served from the cache instead of being rendered on demand.
>
> To seed tiles, run:
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> `--zoom` takes a range of zoom levels. `--bbox` takes a bounding box as `minLon,minLat,maxLon,maxLat`. If you omit `--bbox`, the layer's full extent is used, which can take a very long time for global layers.
>
> `geotile seed` uses 4 worker processes by default. Change this with `--workers`. Each worker uses roughly 600 MB of memory, measured on our reference setup (raster layers, 256px tiles, PNG output). Vector layers with many features may use considerably more.
>
> Existing tiles are skipped by default. `--force` overwrites them, but it only re-renders tiles inside the bounding box and does not delete tiles outside it.
>
> ### Limitations
>
> - Seeding vector layers above zoom 16 is not supported.
> - Seeding cannot be resumed after interruption yet. If the process stops, run it again. Already rendered tiles are skipped unless `--force` is set.
> - The S3 storage backend is experimental for seeding. It has only been tested with AWS S3, not with S3-compatible services such as MinIO.
>
> I cut the opening filler, the restatement of what seeding means, and the closing summary. The command, options, 600 MB figure with its measurement setup, and all three limitations are unchanged.

### 글빨 0.2.0 — ○ 의미 보존 통과

> ## Seeding the tile cache
>
> Seeding pre-renders tiles so they are served from the cache instead of being rendered on demand.
>
> To seed tiles, run:
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> `--zoom` takes a range of zoom levels. `--bbox` takes a bounding box in the order `minLon,minLat,maxLon,maxLat`. If you omit `--bbox`, the layer's full extent is used, which can take a very long time for global layers.
>
> `geotile seed` uses 4 worker processes by default. You can change this with `--workers`. Each worker uses roughly 600 MB of memory. We measured this on our reference setup (raster layers, 256px tiles, PNG output). Vector layers with many features may use considerably more.
>
> Existing tiles are skipped by default. Pass `--force` to overwrite them. `--force` only re-renders tiles inside the bounding box. It does not delete tiles outside it.
>
> ### Limitations
>
> - Seeding vector layers above zoom 16 is not supported.
> - Seeding cannot be resumed after interruption yet. If the process stops, run it again. Already rendered tiles are skipped unless `--force` is set.
> - The S3 storage backend is experimental for seeding. It has only been tested with AWS S3, not with S3-compatible services such as MinIO.
>
> I dropped the closing paragraph's claims that seeding "dramatically improves" performance and gives a "blazing-fast" experience. Nothing in the section supports them. If you have benchmark numbers, add them back with the conditions they were measured under.

## 2회차

### 글빨 없음 — ○ 의미 보존 통과

> Here's a tightened version. I cut the filler intro, the repeated definition of seeding, and the closing paragraph. I kept all the technical details: defaults, the memory figure and its caveat, and every limitation.
>
> ```markdown
> ## Seeding the tile cache
>
> Seeding pre-renders tiles so they are served from the cache instead of being rendered on demand.
>
> To seed tiles, run:
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> `--zoom` takes a range of zoom levels. `--bbox` takes a bounding box as `minLon,minLat,maxLon,maxLat`. If you omit `--bbox`, the layer's full extent is used, which can take a very long time for global layers.
>
> `geotile seed` uses 4 worker processes by default; change this with `--workers`. Each worker uses roughly 600 MB of memory, measured on our reference setup (raster layers, 256px tiles, PNG output). Vector layers with many features may use considerably more.
>
> Existing tiles are skipped by default. `--force` overwrites them, but it only re-renders tiles inside the bounding box. It does not delete tiles outside it.
>
> ### Limitations
>
> - Vector layers cannot be seeded above zoom 16.
> - Seeding cannot be resumed after interruption yet. Run it again; already rendered tiles are skipped unless `--force` is set.
> - The S3 storage backend is experimental for seeding. It has been tested only with AWS S3, not with S3-compatible services such as MinIO.
> ```
>
> This takes it from about 330 words to about 190. Two small wording choices to check:
>
> - I dropped "Please be aware that" and "Note that". The facts they introduced now stand on their own.
> - I kept "yet" on the resume limitation, since it signals the limitation may go away. Remove it if you don't want to hint at that.

### 글빨 0.1.0 — ○ 의미 보존 통과

> ## Seeding the tile cache
>
> Seeding renders tiles before users request them, so they are served from the cache instead of being rendered on demand.
>
> To seed tiles, run:
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> `--zoom` takes a range of zoom levels. `--bbox` takes a bounding box in the order `minLon,minLat,maxLon,maxLat`. If you omit `--bbox`, the layer's full extent is used, which can take a very long time for global layers.
>
> By default, `geotile seed` uses 4 worker processes. Change this with `--workers`. Each worker uses roughly 600 MB of memory. We measured this on our reference setup (raster layers, 256px tiles, PNG output). Vector layers with many features may use considerably more.
>
> Existing tiles are skipped by default. Pass `--force` to overwrite them. `--force` only re-renders tiles inside the bounding box and does not delete tiles outside it.
>
> ### Limitations
>
> - Seeding vector layers above zoom 16 is not supported.
> - Seeding cannot be resumed after an interruption yet. Run the command again. Already rendered tiles are skipped unless `--force` is set.
> - The S3 storage backend is experimental for seeding. It has only been tested with AWS S3, not with S3-compatible services such as MinIO.
>
> I made these changes:
> - **Intro:** I cut the "crucial step / fast-paced world" opening and the "in other words" restatement. They said the same thing as the definition, which I kept.
> - **Conclusion:** I removed the closing paragraph. It repeated the intro and made a performance claim the doc doesn't back up.
> - **Limitations lead-in:** I dropped "There are a number of limitations that you should be aware of", since the heading already says it.
> - **Memory note:** I dropped "Please be aware" but kept the 600 MB figure, the setup it was measured on, and the warning about vector layers.
> - **Kept as is:** the command, option names, defaults, and all three limitations.

### 글빨 0.2.0 — ○ 의미 보존 통과

> ## Seeding the tile cache
>
> Seeding pre-renders tiles so they are served from the cache instead of being rendered on demand, and users don't wait for tiles to load.
>
> To seed tiles, run:
>
>     geotile seed --layer basemap --zoom 0-14 --bbox 126.76,37.41,127.18,37.70
>
> `--zoom` takes a range of zoom levels. `--bbox` takes a bounding box in the order `minLon,minLat,maxLon,maxLat`. If you omit `--bbox`, the layer's full extent is used, which can take a very long time for global layers.
>
> `geotile seed` uses 4 worker processes by default. Change this with `--workers`. Each worker uses roughly 600 MB of memory. We measured this on our reference setup (raster layers, 256px tiles, PNG output). Vector layers with many features may use considerably more.
>
> Existing tiles are skipped by default. Pass `--force` to overwrite them. `--force` only re-renders tiles inside the bounding box and does not delete tiles outside it.
>
> ### Limitations
>
> - Seeding vector layers above zoom 16 is not supported.
> - Seeding cannot be resumed after interruption yet. If the process stops, run it again. Already rendered tiles are skipped unless `--force` is set.
> - The S3 storage backend is experimental for seeding. It has only been tested with AWS S3, not with S3-compatible services such as MinIO.

## 품질 비교

두 결과가 모두 의미 보존을 통과했을 때만 비교했습니다. 판정 모델에는 어느 쪽이 글빨인지 알려 주지 않았고, 순서를 바꿔 두 번 판정했습니다.

| 회차 | 비교 | 결과 |
|---|---|---|
| 1 | 글빨 없음 vs 글빨 0.2.0 | 글빨 0.2.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.2.0 | 순서를 바꾸면 판정이 바뀜 |
| 1 | 글빨 0.1.0 vs 글빨 0.2.0 | 글빨 0.1.0 우세 |
| 2 | 글빨 0.1.0 vs 글빨 0.2.0 | 차이 없음 |
| 1 | 글빨 없음 vs 글빨 0.1.0 | 글빨 0.1.0 우세 |
| 2 | 글빨 없음 vs 글빨 0.1.0 | 순서를 바꾸면 판정이 바뀜 |

<details><summary>1회차 글빨 없음 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.2.0) → 글빨 0.2.0 우세

Both cut the filler and keep the technical details. X scans better, but it reformats the options into a list, adds a benefit sentence, and drops "yet", which changes meaning even though X flags it. Y fixes only the bloat and keeps the original voice, structure and meaning. A few choppy sentences in Y are a smaller cost, so Y fits the request "tighten up" slightly better.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 없음) → 글빨 0.2.0 우세

Both versions remove the filler. X stays close to the source, adds no new claims and changes no meaning. Y is easier to scan because of the option list, but it drops "yet" for no good reason, which changes what the text says, and it adds a new claim, "Users don't wait for tiles to load." Y's change notes help, but they leave the user to judge changes that weren't needed. Overall X is the better tightening.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.2.0) → 차이 없음

두 결과 모두 군더더기 도입부, 반복된 정의, 상투적인 결론을 지웠고 기술 정보는 모두 지켰다. X는 문장 연결이 조금 더 매끄럽고 쓸모 있는 확인 메모를 붙였다. Y는 붙여 넣기 쉬운 문서만 내놓았고 원문 표현을 더 많이 살렸지만, 첫 문장의 연결이 다소 어색하다. 장단점이 엇갈리고 차이가 작아 어느 쪽도 분명히 낫지 않다.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 없음) → 글빨 없음 우세

Both versions cut the filler, repetition and conclusion the same way and keep all technical details. Y reads better because it joins related facts in single sentences where X lists short separate ones, and its first sentence is cleaner. Y's added preface and notes sit outside the doc and help the user check the edit, so they cost little on restraint. Overall Y is somewhat better.

</details>

<details><summary>1회차 글빨 0.1.0 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 0.2.0) → 글빨 0.1.0 우세

본문의 압축 정도와 보존된 사실은 거의 같다. X는 600 MB 측정 조건과 `--force` 동작을 한 문장 안에서 자연스럽게 이어 쓴 반면, Y는 같은 내용을 짧은 문장으로 쪼개 조금 끊겨 읽힌다. X의 편집 설명도 실제 삭제 내용과 정확히 맞는다. 차이는 크지 않지만 흐름 면에서 X가 조금 낫다.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 0.1.0) → 글빨 0.1.0 우세

The two results remove the same filler and keep nearly all of the same content. The only real difference is flow. X breaks the 600 MB measurement conditions and the --force caveat into separate short sentences, which reads choppily. Y joins them into single sentences that flow more naturally. The gap is small, but Y is slightly better.

</details>

<details><summary>2회차 글빨 0.1.0 vs 글빨 0.2.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 0.2.0) → 차이 없음

The tightened docs in the two results are nearly the same: same structure, same cuts, same preserved facts. X's intro sentence is slightly smoother, and Y's limitation sentence keeps the condition "If the process stops," so the small differences pull in opposite directions. X's change summary is extra material outside the docs. It could help a reviewer or be seen as unnecessary, but it doesn't change the quality of the docs themselves. Neither result is clearly better.

**2번째 판정** (결과 X = 글빨 0.2.0, 결과 Y = 글빨 0.1.0) → 차이 없음

The two edits are almost the same document. Both cut the same inflated parts and keep every technical detail. Y's opening sentence is slightly smoother. X sticks to the request by returning only the section, while Y adds a change list for the requester. These differences cut in opposite directions and are minor, so neither result is clearly better.

</details>

<details><summary>1회차 글빨 없음 vs 글빨 0.1.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.1.0) → 글빨 0.1.0 우세

Both did what was asked: they cut the filler intro, the repeated definition and the closing paragraph. X's list format makes the options easier to find, but X also made changes that weren't needed. It dropped "yet", which changes the meaning, and dropped the "If the process stops" condition. It also kept one leftover filler sentence, "Users don't wait for tiles to load." Y removed only the bloat and kept the original's structure, tone and meaning, which matches a request to "tighten up". That makes Y the better result overall.

**2번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 없음) → 글빨 0.1.0 우세

Both versions cut the bloat you'd expect to cut: the opening filler, the repeated definition, and the conclusion. X keeps the original prose and voice and only cuts. Y's option list is easier to scan, but you asked for tightening, not a new structure. Y also deletes "yet", which changes what the doc says about future plans. Y does flag both changes, which partly offsets this, but X does what was asked more closely and keeps the meaning intact. X is better overall.

</details>

<details><summary>2회차 글빨 없음 vs 글빨 0.1.0: 판정 이유</summary>

**1번째 판정** (결과 X = 글빨 없음, 결과 Y = 글빨 0.1.0) → 차이 없음

Both versions cut the same bloat (the empty intro, the repeated definition, the limitations lead-in and the closing paragraph) and keep every technical detail. X reads more smoothly in the workers paragraph and the resume limitation, where Y uses a run of short sentences. Y is more restrained: it keeps the original "is not supported" wording, while X rewrote it as "cannot be seeded" and slightly changed the meaning. Each version is better on a different criterion and the differences are small, so neither is clearly better.

**2번째 판정** (결과 X = 글빨 0.1.0, 결과 Y = 글빨 없음) → 글빨 없음 우세

X and Y cut almost the same material and keep the same technical facts, so the edited doc text barely differs. Y comes out slightly ahead for two reasons. First, it joins related points instead of breaking them into short sentences (the memory figure and the rerun-after-interruption item), so it reads more smoothly. Second, its change notes are short and flag one choice the writer may want to decide on (keeping "yet"). X's sentence splitting and its long bolded change list are minor drawbacks by comparison.

</details>

