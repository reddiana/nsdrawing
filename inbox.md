# 1. 프로젝트
1. `docs/00-index/00-index.md`를 `docs/README.md`로 mv해주세요. github 방문자에게 이게 더 편할 것 같아요.
2. `inbox`의 처리된 항목을 지우더라도 1레벨 제목은 남겨두세요. 다음 번 무언가 추가할 때 편할 것 같아요. 참, 1레벨 제목들과 inbox 페이지 구조를 추천해주세요.
3. 이 파일을 `plan/` 하위로 옮겨주세요.
4. 내 요구사항이 점점 더 늘어나고 있지요. MVP(Minimum Viable Product)를 만들어서 요구사항을 리뷰하는게 좋을 것 같은데 시점과 범위를 어떻게 정해야할지 모르겠어요. 일단 이번 MVP에서는 요구사항 리뷰까지로 합니다. 
5. 요구사항을 아키텍처 디자인 이전에 최대한 더 도출하려는 이유는 나중에 구현할지라도 아키텍처가 크게 변경될 것을 미연해 방지하기 위함입니다. 확장을 고려한 아키텍처를 구현하더라도 예상되는 요구사항들이 있으면 아키텍처를 디자인하는데 도움이 많이 되겠지요. 아키텍처 디자인을 시작할 시점도 제언해주세요.
6. 아키텍처 디자인이 완성되어 가면, 실제 개발을 하기 전에 테스트를 설계하고 테스크코드를 작성할 것입니다. 참고하세요.
# 2. 배포 대상
2. 수익 창출 버전: 다른 배포 버전들은 모두 무료로 배포하고, 이 버전들은 유상으로 수익을 창출하고 싶습니다.
	1. Confluence 플러그인 버전도 만들고 싶습니다. [Explore apps for Confluence | Atlassian Marketplace](https://marketplace.atlassian.com/product/confluence) 
	2. 수익을 창출할 다른 버전을 제안해주세요.
3. 웹버전:
	1. [SequenceDiagram.org - UML Sequence Diagram Online Tool](https://sequencediagram.org/) — 참고 모델
		1. URL to Share / 저장 장소 / View 모드 / Help - Instructions 등
4. Obsidian Plugin 버전
	1. drawio-obsidian을 기존 diagram을 편집완료 해도 삽입되었던 페이지를 다시 열지 않으면 변경된 것이 보이지 않았습니다. 내 경우 [mnaoumov/obsidian-refresh-any-view: Obsidian Plugin that allows to refresh any view without reopening it.](https://github.com/mnaoumov/obsidian-refresh-any-view) 을 설치해서 사용하고 있습니다. NSDrawing plugin에 수정 편집을 완료하면 페이지를 갱신하는 기능을 추가해주세요.
	2. [[01-requirements]]에 내용 보충
		- [drawio-obsidian](https://github.com/zapthedingbat/drawio-obsidian) — 모델 내장 SVG 저장 방식 참고. Obsidian 페이지에 삽입하고 편집하는 방식 참고.
# 3. 기능
1. [Scratch - Imagine, Program, Share](https://scratch.mit.edu/)의 장점 도입
	1. Scratch가 NS Diagram과 유사해보이는데, Event를 표현할 수 있다는 점이 마음에 듭니다. NS Diagram에는 없는 표기법이지만 Scratch 처럼 이벤트를 표현할 수 있으면 좋겠어요.
	2. Embeded 시스템 개발자들이 Scratch를 많이 쓴다고 들었어요. Scratch의 어떤 장점 때문인지 분석해주세요. NSDrawing도 그러면 좋겠어요. 
3. 강조하기
	1. 특정 Block 또는 연속된 여러 Block을 선택해서 강조하는 방식을 제안해주세요. 테두리 선을 굻게 한다든지 또는 색상을 변경한다든지 다양한 방법이 있겠네요.
4. .ns.svg를 다른 도구로 그림만 고치면 다음 번 열었을 때 변경이 발생했음을 알려줌.
5. 접기/펼치기 기능: 요구사항 구체화해서 제안해주세요.
	1. control block
	2. selection range
# 나의 결정

# 질문 및 요청
- 구글 Drive에 저장할 확장자를 `.ns` 로 하면 Drive가 썸네일과 미리보기를 별도 작업 없이 보여준다는 장점이 사라지나요? 그렇다면 `.ns.svg`로 해야겠네요.
- `docs/01-requirements/01-requirements`에 변경하신 내용이 commit 되어있지 않았습니다. 다음에는 마무리 정리할 때 commit/push를 부탁드립니다.
- 내용 변경이 없는 파일들이 git status 에는 modified로 나옵니다. 왜죠? 안 그러면 좋겠는데...
```
PS C:\myProject\NSDrawing> git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   CLAUDE.md
        modified:   docs/00-index/00-index.md
        modified:   docs/01-requirements/01-requirements.md
        modified:   inbox.md
        modified:   journal/README.md
        modified:   journal/learning-claude-code.md
        modified:   journal/timeline.md
        modified:   plan/debt.md
        modified:   plan/sessions/2026-10-09-inbox-and-folders.md
        modified:   plan/status.md
        modified:   tech-notes/README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .obsidian/

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\myProject\NSDrawing> git diff .\CLAUDE.md
warning: in the working copy of 'CLAUDE.md', LF will be replaced by CRLF the next time Git touches it  
```
- 나를 `사용자`라고 부르시던데 이 github repo는 public이어서 다른 사람도 봅니다. 그들이 혼란스러워하지 않을까요? 다른 호칭을 제안해주세요.
- [[drive-app-basics]] 
	- 시퀀스다이어그램을 그려주면 이해하기 좋겠어요. participant에 웹브라우저를 포함해주세요.
	- `client secret`이 뭐지요?
- `스파이크`란 무엇? 시제품이나 MVP(Minimum Viable Product)를 말하나요?