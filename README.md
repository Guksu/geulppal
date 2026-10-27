# 글빨 · geulppal

Claude가 문서와 글을 쓸 때 과장, 반복, 번역투를 줄이도록 돕는 스킬입니다. 한국어를 중심으로 README, 기술 설명, PR 본문, 기획서, 소개글을 다룹니다. 영어 글에도 사용할 수 있습니다.

README를 고칠 때마다 비슷한 수식어와 불필요한 설명을 다시 걷어내야 해서 만들었습니다. 기존 글을 다듬거나 새 글을 작성할 때 사용할 수 있습니다.

## 편집 예시

아래는 동작을 설명하기 위해 만든 예시입니다. 실제 모델 평가 결과는 아닙니다.

**원문**

> 노트함은 단순한 메모 도구를 넘어 업무 생산성을 혁신하는 강력한 솔루션입니다. 메모에 태그를 붙이고 태그로 검색할 수 있습니다.

**수정안**

> 노트함은 메모에 태그를 붙이고 태그로 검색하는 도구입니다.

수치와 조건, 알려진 한계는 남깁니다. `검토 중`을 `완료`로 바꾸거나, 구체적으로 보이게 하려고 기능과 성과를 지어내지 않습니다. 이미 정확한 문장은 그대로 둘 수 있습니다.

## 설치와 사용

Claude Code에서는 [스킬 폴더](skills/geulppal)를 `~/.claude/skills/geulppal/`에 복사합니다. 특정 프로젝트에서만 쓰려면 해당 프로젝트의 `.claude/skills/geulppal/`에 둡니다. 같은 이름의 스킬이 있다면 먼저 내용을 비교하세요.

설치한 다음 다음처럼 요청할 수 있습니다.

```text
/geulppal README.md의 AI slop을 줄여줘. 설치 명령과 실험 조건은 유지해줘.
```

```text
/geulppal 아래 사실을 바탕으로 소개글을 써줘. 만든 이유를 먼저 설명해줘.
```

Claude 웹·데스크톱에 올릴 때는 `skills/geulppal/` 폴더를 ZIP으로 묶어 업로드합니다. ZIP을 열었을 때 `geulppal/SKILL.md`가 있어야 합니다. [Claude 설치 위치 안내](https://code.claude.com/docs/en/skills) · [ZIP 작성 안내](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

## 구성과 검증 상태

- [SKILL.md](skills/geulppal/SKILL.md): 의미 보존, 편집 판단, 한국어·영어 문체와 출력 방식
- [문서별 판단](skills/geulppal/references/document-types.md): README·PR·기획서·소개글·이메일 기준
- [문장 예시](skills/geulppal/references/editing-examples.md): 고칠 문장과 유지할 문장
- [조사 기록](research/findings.md): 기존 README 수정, 공개 스킬과 글쓰기 자료에서 채택한 기준
- [평가 사례 12개](evals/cases.json)와 [평가 방법](evals/README.md)

현재는 첫 초안입니다. 스킬 메타데이터, 로컬 문서 링크, 평가 입력 구조와 업로드용 ZIP 구성을 확인했습니다. Claude에서의 자동 선택과 스킬 유무 비교 평가는 아직 수행하지 않았습니다. AI 작성 여부를 판별하거나 탐지기 통과율을 보장하는 기능은 없습니다.
