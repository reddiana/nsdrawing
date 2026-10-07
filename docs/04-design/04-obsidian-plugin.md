---
title: "설계: Obsidian 플러그인"
tags:
  - nsdrawing
  - design
status: 작성 전
updated: 2026-10-07
---

# 설계: Obsidian 플러그인 (`apps/obsidian`)

## 관련 요구사항

- [[01-requirements#2.1 Obsidian 플러그인]]
- [[0006-file-extensions|ADR-0006]]

## 1. `.ns.svg` 파일 열기

> [!warning] 먼저 검증 필요 (스파이크)
> Obsidian은 확장자 단위로 뷰를 등록하고, `a.ns.svg`의 확장자는 `svg`로 봅니다.
> 기본 이미지 뷰와 충돌하지 않고 `.ns.svg`만 편집기로 여는 방법을 확인합니다. → [[02-architecture#7. 위험과 검증이 필요한 사항]]
> - 참고: drawio-obsidian, Excalidraw 플러그인(`.excalidraw.md`)의 구현 방식

## 2. 노트에 새 다이어그램 넣기 ("Insert new NS diagram")

요구사항: [[01-requirements#^obs-insert]], [[01-requirements#^obs-insert-command]]. drawio-obsidian의 흐름을 따른다.

> [!todo] 설계할 것
> - 노트 편집 화면 우클릭 메뉴에 항목 추가하는 방법
> - 탭을 닫을 때까지 "어느 노트의 어느 커서 위치에 넣을지"를 기억하는 방법 (그사이 노트가 수정되거나 닫힌 경우 포함)
> - 새 파일의 이름 규칙과 저장 위치 (제안: 첨부 파일 폴더 설정 따름)
> - 빈 채로 닫았을 때 처리 (제안: 파일 삭제, 삽입 안 함)

## 3. 삽입된 다이어그램 편집 ("Edit NS diagram")

요구사항: [[01-requirements#^obs-edit-embed]], [[01-requirements#^obs-detect]]

> [!todo] 설계할 것
> - 노트에 보이는 그림(읽기 화면, 편집 화면 모두)의 우클릭 메뉴에 항목 추가하는 방법
> - 저장 후 노트의 그림이 바로 갱신되는지 확인 (이미지 캐시 때문에 안 바뀌면 대응 필요)

> [!tip] 참고 구현
> drawio-obsidian의 소스 코드에서 두 메뉴를 어떻게 붙였는지 먼저 확인한다.

## 4. 볼트 입출력

> [!todo] 읽기/쓰기, 저장 시점(탭 닫을 때 / 자동 저장), 다른 곳에서 파일이 바뀌었을 때 처리

## 5. 테마 연동

> [!todo] Obsidian 라이트/다크 테마 ↔ 편집 화면 ([[01-requirements#^obs-theme]])

## 미결정 사항

- [ ] 
