# ReactJS-Express

- - -

## 학습 방법

- 영상강의 1번 시청.
- 영상강의 2번째 시청 후 정리.
- 영상강의 3번째 시청하며 코드 따라 쳐보기.

## React 프로젝트 시작하기

- Webpack
  - 특정 확장자마다 어떤 process를 하는것을 도와주는 lib.
  - 웹 프로젝트에서 전채적인 파일을 관리해주는 도구.
- Babel
  - 최신 문법을 컴파일해서 구형 브라우져에서 지원할 수 있게 해줌.
- 초기단계에서는 WebPack과 Babel을 사용하지 않아도 됨.
- JSX?
- CodeSandBox
  - https://codesandbox.io/s/new
  - Angular, React, Preact, Vue, Web 등의 Javascript Web Application을 만들 수 있는 온라인 에디터임.
  - 강의에서 사용할 코드는 아래 링크에서 Fork해서 사용할 수 있음.
  - https://codesandbox.io/s/4r6lqrlvj9

- - -

## Virtual Dom

    We built React to solve one problem:  
    building large applications with data that changes over time.  
    우리는 지속해서 데이터가 변화하는 대규모 어플리케이션을 구축하기 위해 리액트를 만들었다.  


가상의 돔.

- 변화가 일어나면 브라우져에 새로운 돔을 만드는것이 아니라 자바스크립트로 이루어진 가상의 돔에 한번 랜더링을 한 후,
- 기존의 돔과 비교를 한 후, 정말 변화가 필요한 곳에만 update를 해줌.

- React & Virtual Dom
  - https://youtu.be/BYbgopx44vo

- - -

## React?

Ract.js는 User Interface를 위한 Javascript lib임.

- 장점. 가볍다.
- Angular.js(framework)와 함께 사용 할 수도 있다. 둘을 비교는 할 수 없다.
- Virtual Dom을 사용함.
- React는 Component라는 개념에 집중이 되 있는 라이브러리.

- - -

## 2019.01.30 

- React.js와 Express framwork을 이용한 서비스를 만들어보자.
- ReactJS의 전반적, 기초적 이해가 목표임.
- 참고 :
  - **https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/**
  - **https://react-anyone.vlpt.us/**