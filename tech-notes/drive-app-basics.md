---
title: Google Drive 앱의 기초
tags:
  - nsdrawing
  - tech-notes
updated: 2026-10-09
---

# Google Drive 앱의 기초

## 한 줄 요약

Drive 앱은 Drive 화면에 메뉴를 하나 걸어 두고, 사용자가 누르면 우리 웹 페이지를 파일 ID와 함께 열어 주는 방식이다.

## 백엔드로 비유하면

- **"연결 앱(Open with)"은 웹훅 콜백과 비슷하다.** 미리 등록한 URL(Open URL)로 Drive가 사용자를 보내면서 `state` 파라미터에 파일 ID를 담아 준다.
- **OAuth는 백엔드에서 쓰던 것과 같은 OAuth 2.0이다.** 다만 서버 없이 브라우저에서 토큰을 받는다(Google Identity Services). 그래서 client secret을 둘 곳이 없고, 그 대신 등록한 도메인에서만 동작한다.
- **`drive.file` 범위는 최소 권한 원칙이다.** DB 계정에 테이블 하나만 GRANT하듯, 앱이 만들었거나 사용자가 그 앱으로 연 파일만 접근한다. 범위가 좁으면 Google 심사도 가볍다.
- **파일 저장은 REST 호출 하나다.** `PATCH https://www.googleapis.com/upload/drive/v3/files/{id}`로 내용을 올리면 된다.

## NSDrawing에서 어디에 쓰나

- 웹 버전 위에 Drive 연동을 얹는다. → [[0012-google-drive-integration|ADR-0012]]
- 파일이 SVG라서 Drive가 썸네일과 미리보기를 알아서 보여 준다.

## 더 읽을거리

- [Drive UI integration overview](https://developers.google.com/drive/api/v3/about-apps)
- [Integrate with Drive UI's "Open with" context menu](https://developers.google.com/drive/integrate-open)
