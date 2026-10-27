# 글빨 · geulppal

Claude가 문서와 글을 쓸 때 과장, 반복, 번역투를 줄이는 스킬입니다. 사실·수치·조건과 작성자의 말투는 그대로 남깁니다. README, PR 본문, 기획서, 소개글, 이메일 같은 한국어 글을 중심으로 하며, 영어 글에도 쓸 수 있습니다.

README를 고칠 때마다 비슷한 수식어와 불필요한 설명을 다시 걷어내야 해서 만들었습니다.

[English](README.md) · [설치](#설치) · [벤치마크](evals/results/README.md) · [평가 보고서](evals/results/REPORT.md)

> **원문** 노트함은 단순한 메모 도구를 넘어 업무 생산성을 혁신하는 강력한 솔루션입니다. 메모에 태그를 붙이고 태그로 검색할 수 있습니다.
>
> **수정안** 노트함은 메모에 태그를 붙이고 태그로 검색하는 도구입니다.

동작을 보여 주려고 만든 예시이며 평가 결과가 아닙니다. 수치와 조건, 알려진 한계는 남깁니다. `검토 중`을 `완료`로 바꾸거나, 구체적으로 보이게 하려고 기능과 성과를 지어내지 않습니다. 이미 정확한 문장은 그대로 둡니다. AI 작성 여부를 판별하거나 탐지기 통과율을 보장하는 기능은 없습니다.

## 벤치마크

Claude Code에서 같은 요청·모델·설정으로 글빨 유무를 비교했습니다. 스킬을 고정한 뒤 별도 세션이 만든 처음 보는 사례 12개를 조건마다 2회씩 실행했습니다. 판정은 작성 모델과 다른 모델이 했습니다.

| | 글빨 없음 | 글빨 0.2 |
|---|---|---|
| 사실·조건·상태를 지킨 결과 | 12/24 | 18/24 |
| 실행당 시간 중앙값 | 10.0초 | 14.1초 |

- 글빨 없이 쓸 때는 원문에 없는 약속이나 환산값을 넣는 경우가 많았습니다. 제안받은 조건을 확정처럼 쓰는 경우도 많았습니다.
- 더 잘 읽히는지는 비교할 수 있는 쌍이 적고 판정이 엇갈려 차이를 확인하지 못했습니다.
- 글빨을 써도 적용 조건을 넓혀 쓰는 오류가 남아 있습니다(`해외에 계셔서` → `해외 체류 등으로`). 진단만 요청했는데 대체 문구를 내는 경우도 있었습니다.
- 글빨을 쓰면 실행당 비용이 약 2배 늘었습니다.

작은 표본을 모델이 판정한 결과이며, 사람의 평가가 아닙니다. [방법·사례별 결과·한계](evals/results/README.md)

## 설치

**Claude Code**: 스킬 폴더를 복사합니다. 모든 프로젝트에서 쓰려면 개인 스킬 폴더에, 한 프로젝트에서만 쓰려면 그 프로젝트의 `.claude/skills/`에 둡니다.

```bash
git clone https://github.com/Guksu/geulppal.git
mkdir -p ~/.claude/skills
cp -r geulppal/skills/geulppal ~/.claude/skills/geulppal
```

같은 이름의 스킬이 이미 있다면 먼저 내용을 비교하세요.

**Claude 웹·데스크톱**: `skills/geulppal/` 폴더를 ZIP으로 묶어 업로드합니다. ZIP을 열었을 때 `geulppal/SKILL.md`가 있어야 합니다.

```bash
cd geulppal/skills && zip -r geulppal.zip geulppal
```

[Claude Code 스킬 위치](https://code.claude.com/docs/en/skills) · [ZIP 작성 안내](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

설치되는 것은 `skills/geulppal/`의 파일 세 개(약 21KB)뿐입니다. 평가 자료와 스크립트는 들어가지 않습니다.

## 첫 요청

설치한 뒤 Claude에 이렇게 요청해 보세요.

> /geulppal README.md의 AI slop을 줄여줘. 설치 명령과 실험 조건은 유지해줘.

> /geulppal 아래 사실을 바탕으로 소개글을 써줘. 만든 이유를 먼저 설명해줘.

붙여 넣을 글을 요청하면 완성문만 돌려줍니다. 원문에 없어 비워 둔 사실처럼 확인할 것이 있을 때만 짧게 알립니다.

`/geulppal` 없이 "README 다듬어줘", "AI 티 빼줘"처럼 요청해도 Claude가 스킬을 고를 수 있습니다. 자동 선택 평가에서는 다음과 같이 골랐습니다. 이 요청들을 본 뒤 스킬 설명을 고쳤기 때문에, 독립 평가 결과는 아닙니다. [자동 선택 결과](evals/results/2026-10-27-trigger/trigger-v0.2.1.md)

| 요청 | 스킬을 고른 실행 |
|---|---|
| 글쓰기 요청 | 24회 중 23회 |
| 코드·조회·AI 작성 판별 요청 | 20회 중 0회 |

## 구성

- [SKILL.md](skills/geulppal/SKILL.md): 의미 보존, 편집 판단, 한국어·영어 문체와 출력 방식
- [문서별 판단](skills/geulppal/references/document-types.md): README·PR·기획서·소개글·이메일 기준
- [문장 예시](skills/geulppal/references/editing-examples.md): 고칠 문장과 유지할 문장
- [조사 기록](research/findings.md): 기존 README 수정, 공개 스킬과 글쓰기 자료에서 채택한 기준
- [평가 방법](evals/README.md): 평가 사례, 판정 기준, 실행 스크립트와 다시 돌리는 방법

스킬 지침과 평가 자료는 한국어로 쓰여 있습니다.

## 피드백

글빨을 써도 어색하게 남은 문장이나 의미가 바뀐 결과가 있으면 [이슈](https://github.com/Guksu/geulppal/issues)로 알려 주세요. 원문과 요청, 결과를 함께 적어 주시면 평가 사례에 반영할 수 있습니다.
