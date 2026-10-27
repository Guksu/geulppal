# 트리거 평가: v0.2.1

자동 생성 파일이다(`node scripts/eval/trigger.mjs --out 2026-10-27-trigger --label v0.2.1 --skill evals/snapshots/v0.2.1/geulppal`).

실행 44회(성공 44, 실패 0). 요청 22개 × 2회. 같은 요청의 반복은 새 요청으로 세지 않는다.

| 구분 | 요청 | 실제 선택(회차별) | 단어 겹침 대리 지표 | 다른 스킬 호출 |
|---|---|---|---|---|
| 써야 함 | `readme-file-ai-tone` | 선택 · 선택 | 선택 | - |
| 써야 함 | `pr-body-polish` | 선택 · 선택 | 선택 | - |
| 써야 함 | `intro-ai-slop` | 선택 · 선택 | 선택 | - |
| 써야 함 | `en-docs-salesy` | 선택 · 선택 | 안 함 | - |
| 써야 함 | `draft-intro-from-facts` | 선택 · 선택 | 선택 | - |
| 써야 함 | `proposal-translationese` | 선택 · 선택 | 선택 | - |
| 써야 함 | `blog-repetition` | 선택 · 선택 | 선택 | - |
| 써야 함 | `email-awkward` | 선택 · 선택 | 선택 | - |
| 써야 함 | `docs-file-natural` | 선택 · 선택 | 선택 | - |
| 써야 함 | `release-note-draft` | 선택 · 선택 | 선택 | - |
| 써야 함 | `remove-ai-tone-short` | 선택 · 선택 | 선택 | - |
| 써야 함 | `en-readme-marketing` | 안 함 · 선택 | 안 함 | - |
| 쓰지 말아야 함 | `code-debounce` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `code-bugfix` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `info-node-fetch` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `ai-detection` | 안 함 · 안 함 | 선택 | - |
| 쓰지 말아야 함 | `code-package-script` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `convert-json-yaml` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `explain-sql` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `count-csv` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `git-howto` | 안 함 · 안 함 | 안 함 | - |
| 쓰지 말아야 함 | `code-unused-imports` | 안 함 · 안 함 | 안 함 | - |

## 요약

- 써야 하는 요청: 실행 단위 선택 23/24. 요청 단위로는 12개 중 모든 회차에서 선택 11개, 한 번 이상 선택 12개.
- 쓰지 말아야 하는 요청: 실행 단위 선택 0/20. 요청 단위로는 10개 중 한 번 이상 선택 0개.
- 단어 겹침 대리 지표(모델 호출 없음): 써야 하는 요청 20/24, 쓰지 말아야 하는 요청 2/20. 실제 선택과 다른 지표다.
- 비용 합 1.770 USD(CLI 보고값), 시간 중앙값 8.3초.
