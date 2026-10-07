# NSDrawing

NS 차트(Nassi-Shneiderman Diagram) 편집기. Obsidian 플러그인 · 데스크톱 · 웹(정적 페이지)으로 배포한다. 현재 설계 단계이며 코드는 아직 없다.

## 저장소 구성

| 폴더 | 용도 |
| --- | --- |
| `docs/` | 애플리케이션 문서: 요구사항, 아키텍처, ADR, 설계, 파일 형식 명세. 시작점은 `docs/00-index/00-index.md` |
| `collab/` | 사용자와 Claude의 협업 기록: 세션 기록(`sessions/`), 작업 계획(`plan.md`) |
| `journey/` | 나중에 YouTube 영상을 만들기 위한 여정 기록: 타임라인, 영상 구성 아이디어, 스크린샷 |

## 문서 작성 규칙

- 사용자는 모든 문서를 **Obsidian**으로 읽고 편집한다. 속성(frontmatter), `[[위키링크]]`, 태그, 체크박스, 콜아웃, Mermaid를 쓴다.
- 문서는 한국어, 파일 이름은 영어 kebab-case.
- `docs/` 아래는 모두 폴더이며, 읽는 순서대로 두 자리 번호를 붙인다. 문서 하나짜리 항목도 같은 이름의 폴더로 감싼다 (`00-index/00-index.md`, `04-design/01-model.md` …). ADR만 네 자리 번호(`0001-…`)를 쓴다. 새 문서는 순서에 맞는 다음 번호로 만든다.
- 위키링크는 파일 이름만으로 건다. 그래서 `docs/`, `collab/`, `journey/` 전체에서 파일 이름이 겹치지 않게 한다 (`README.md` 제외).
- 요구사항에는 "무엇을"만 쓴다. 근거는 ADR(`docs/03-adr/`, 템플릿 `0000-template.md`), 방법은 설계 문서로 링크한다.
- 요구사항 항목은 블록 ID(`^edit-wrap` 등)로 가리킨다. 새 요구사항에도 ID를 단다.
- 승인된 ADR은 고치지 않는다. 결정이 바뀌면 새 ADR을 쓰고 `supersedes`/`superseded-by`로 잇는다. ADR을 추가하면 `docs/00-index/00-index.md` 목록도 갱신한다.

## 세션 시작 시 할 일

새 세션의 첫 응답에서는, 사용자의 첫 메시지가 인사뿐이더라도 먼저 다음을 한다:

1. `collab/plan.md`와 `collab/sessions/`의 가장 최근 세션 기록을 읽는다.
2. 지난 세션에서 한 일, 지금 단계, 다음 할 일, 열린 질문을 짧게 요약해 알려 준다.
3. 그다음 사용자의 요청을 처리한다. 첫 메시지가 구체적인 요청이면 요약은 몇 줄로 줄인다.

## 세션 끝날 때 할 일

의미 있는 논의나 결정이 있었던 세션이 끝날 때:

1. `collab/sessions/YYYY-MM-DD-주제.md`에 논의 흐름, 결정, 발견한 위험, 다음 할 일을 적고 `collab/README.md` 목록에 추가한다.
2. `collab/plan.md`의 다음 할 일과 열린 질문을 갱신한다.
3. `journey/timeline.md`에 전환점을 추가한다. 사용자의 요청 원문을 짧게 인용한다.
4. 사용자는 Claude Code 초보자다. 사용자가 Claude Code나 AI와 일하는 법에 대해 새로 배운 것이 있으면 `journey/learning-claude-code.md`에 추가한다.
5. 결정은 `docs/`(요구사항 또는 ADR)에 반영하고, `collab/`에는 링크만 남긴다.
