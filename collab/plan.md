---
title: 작업 계획
tags:
  - nsdrawing
  - collab
updated: 2026-10-07
---

# 작업 계획

## 지금 단계

**설계 시작 전.** 요구사항과 1차 아키텍처 결정(ADR 0001~0008)을 마쳤습니다.

## 다음 할 일

- [ ] 사용자가 문서 전체 검토 (특히 ADR "검토한 대안"이 대화 내용과 맞는지)
- [ ] 제안됨 ADR 결정
	- [ ] [[0011-development-order|ADR-0011]] 개발 순서 (제안: 웹 → Obsidian → 데스크톱)
	- [ ] [[0010-ui-framework|ADR-0010]] UI 프레임워크
	- [ ] [[0009-desktop-framework|ADR-0009]] 데스크톱 프레임워크 (텍스트 폭 문제 결정 후)
- [ ] 설계: [[01-model]] (노드 타입, 불변 조건, 편집 명령)
- [ ] 설계: [[02-layout]] (레이아웃 알고리즘, 텍스트 폭 측정 문제)
- [ ] 스파이크: Obsidian에서 `.ns.svg`만 편집기로 열 수 있는지 검증

## 열린 질문

- 주 사용자: 교육용 / 실무 설계 문서용 → [[01-requirements#6. 미결정 사항]]
- 텍스트 폭 측정의 환경 차이를 어떻게 다룰지 → [[02-architecture#7. 위험과 검증이 필요한 사항]]
- 모델 네임스페이스 URI → [[01-file-format#6. 미결정 사항]]
- If/Case 풀기 규칙("내용 있는 갈래를 이어 붙임")은 Claude가 임의로 정한 것 — 확인 필요 → [[01-requirements#감싸기 · 풀기]]
- 문서 폴더 이름: 현재 `docs/` (사용자는 `doc/`로 언급) — 확인 필요
- Obsidian "Insert new NS diagram" 세부: 새 파일 이름·위치, 빈 채로 닫았을 때, 저장 시점 → [[01-requirements#2.1 Obsidian 플러그인]]
