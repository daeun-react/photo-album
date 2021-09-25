# Firebase를 활용한 포토앨범 사이트 만들기

## [🔗 배포 링크](https://photo-album-6df25.web.app/)

## 테스트 계정 정보

- main@naver.com / 123123
- sub@naver.com / 123123
- guest@naver.com / 123123

## 시연 영상

![시연 영상](https://user-images.githubusercontent.com/67173064/134769698-bb36a7a4-a3ba-43b8-bfb1-589d13d0d999.gif)


## 요구 사항 및 구현 기능

- [x] firebase Authentication를 통한 로그인/회원가입 구현
- [x] react-hook-form을 통한 validation 확인
- [x] Post 작성, 수정, 댓글 작성 기능 구현(Firestore Database)
- [x] Post 실시간 댓글 알림 기능 구현(Realtime Database)
- [x] Post Infinity Scroll 적용
- [x] Post 확인 Modal 기능 구현
- [x] MyPage에서 내가 작성한 Post 확인 가능
- [x] MyPage에서 Profile 이미지 변경 가능
- [x] antd 라이브러리 사용
- [x] redux, redux-thunk를 통한 전역 상태관리

## 설치 및 시작 방법

```js
- git clone https://github.com/daeun-react/photo-album.git
- cd photo-album
- npm install
- .env.development, .env.production - firebase API 변수 설정
- npm start
```
