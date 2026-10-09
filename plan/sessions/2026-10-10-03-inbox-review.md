---
title: 2026-10-10 inbox 검토
tags:
  - nsdrawing
  - plan
  - session
date: 2026-10-10
---

# 2026-10-10 inbox 검토

> [!note] 세션 중
> 마무리할 때 논의 흐름, 결정, 위험, 다음 할 일을 채운다.

## 결정

- 세션 기록 파일 이름에 그날의 순번을 넣는다: `YYYY-MM-DD-NN-주제.md`. 기존 네 파일 이름을 바꾸고 링크를 고쳤다. 규칙은 CLAUDE.md "세션 끝날 때 할 일"에 반영했다.

- Sequence Diagram에 activation bar를 넣는다. 기존 두 그림(`drive-app-basics`, `02-architecture`)에 넣고, CLAUDE.md 문서 작성 규칙에 추가했다.
- inbox의 "5. 질문"은 Claude에게 하는 모든 질문이다. inbox 맨 위 주석을 고쳤다.
- 요구사항 우선순위에 #P3(언젠가, 하면 좋음)을 새로 둔다. inbox의 "#후순위"는 #P3로 적는다.
- 웹 광고 #P3: 편집 화면을 가리지 않고, 저장·내보내기·공유 때만 보인다. 정확한 자리는 광고 네트워크 정책을 확인해 정한다 → [[01-requirements#^web-ads]]
- Claude skill #P3: `.ns.svg` 파일과 공유 URL을 함께 내놓는다 → [[01-requirements#^skill-claude]]
- Buy Me a Coffee #P3: 모든 무료 배포 대상에 둔다 → [[01-requirements#^all-donate]]. README 버튼은 웹 베타를 출시할 때 단다 (status에 올림)

## inbox 원문 (지운 항목)

### 1. 일하는 방식

- 하루에도 세션이 여러번 있을 수 있습니다. 파일명에 `plan/sessions/2026-10-10-solo-housekeeping` 처럼 날짜만 있으면 어떤 세션이 가장 최근인지 어떻게 알 수 있나요? git log를 보면 되겠지만 repo 방문자에게 불친절한 방법입니다. 제안해주세요.
- 삽입하는 Sequence Diagram에는 activation bar를 표시해주세요. 이해하는데 도움이 됩니다. 예를 들면 [[drive-app-basics#흐름 Drive에서 열고 저장하기]] 이밖에도 더 있을거에요. 찾아서 다 적용해주세요.
- 이 문서의 5.질문은 기술적인 것 뿐만 아니라 claude에게 하는 모든 질문에 해당합니다.

### 2. 배포 대상

- #후순위 웹버전에 광고를 넣고 싶어요. 작성할 때 화면 영역을 잡아먹는다든지 해서 사람들 불편하게 하고 싶지는 않고, 저장, 내보내기, 공유 URL 할 때 노출하면 적당하겠네요.
- #후순위 ns diagram을 그릴 수 있는 claude skill이 있으면 좋겠네요. 예를들어 claude 에게 퀵소트를 설명해달라고 하면 ns diagram을 그려주는 거에요.
- #후순위  Buy Me a Coffee
	- 최상단 README에 'Buy Me a Coffee' 후원 버튼 링크 있으면 좋겠어요. 웹버전 베타버전 출시하면 합시다.
	- 웹버전 광고에 더해서 'Buy Me a Coffee'도 나오게
