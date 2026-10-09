---
title: 현재 상태
tags:
  - nsdrawing
  - plan
updated: 2026-10-09
---

# 현재 상태

## 지금 단계

**설계 시작 전.** 요구사항과 아키텍처 결정(승인 ADR 0001~0008, 0012, 0013)을 마쳤습니다. 2026-10-09에 Google Drive 연동과 기본 시각 스타일을 더했습니다.

## 다음 할 일

- [ ] 제안됨 ADR 결정
	- [ ] [[0011-development-order|ADR-0011]] 개발 순서 (제안: 웹 → Obsidian → 데스크톱)
	- [ ] [[0010-ui-framework|ADR-0010]] UI 프레임워크
	- [ ] [[0009-desktop-framework|ADR-0009]] 데스크톱 프레임워크 (텍스트 폭 문제 결정 후)
- [ ] 설계: [[01-model]] (노드 타입, 불변 조건, 편집 명령)
- [ ] 설계: [[02-layout]] (레이아웃 알고리즘, 텍스트 폭 측정 문제)
- [ ] 스파이크: Obsidian에서 `.ns.svg`만 편집기로 열 수 있는지 검증
- [ ] `inbox.md`에 남은 항목 검토: 3-1 Scratch(이벤트 표현, 임베디드 분석), 3-3 강조하기, 2-2 유료 버전(나중에)
	- 3-3은 EasyCODE `#ifdef` 영역 모양(왼쪽 막대 + 머리 띠 + 접기)을 시안 C 위에 그려 보여 주기로 제안함

## 열린 질문

사용자의 확인을 기다리는 일은 [[debt]]에 따로 모읍니다.

- 주 사용자: 교육용 / 실무 설계 문서용 → [[01-requirements#6. 미결정 사항]]
- 텍스트 폭 측정의 환경 차이를 어떻게 다룰지 → [[02-architecture#7. 위험과 검증이 필요한 사항]]
- 모델 네임스페이스 URI → [[01-file-format#6. 미결정 사항]]
- 블록 글자는 코드인가, 일반 문장인가 (구문 강조 방식이 갈림) → [[01-requirements#6. 미결정 사항]]
- 저장된 SVG의 색: 고정 / 보는 환경의 테마를 따름 → [[0013-default-visual-style|ADR-0013]]
- Drive에 저장할 확장자: `.ns` / `.ns.svg` → [[0012-google-drive-integration|ADR-0012]]
- Obsidian "Insert new NS diagram" 세부: 새 파일 이름·위치, 빈 채로 닫았을 때, 저장 시점 → [[01-requirements#2.1 Obsidian 플러그인]]
