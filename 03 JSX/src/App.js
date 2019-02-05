import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    const name = 'JEJE';
    const value = 1;
    const val = 3;
    return (
      <Fragment>
        <div>Hello {name}!</div>
        <div>Bye</div>

        <div style={style}>3항 연산자</div>
        {
          1 + 1 === 2
            ? 'true!'
            : 'false!'
        }

        <div style={style}>and 연산자를 이용한 조건부 랜더링</div>
        {
          name === 'JEJE' && <div className="App">JEJE!</div>
        }

        <div style={style}>IIFE </div>
        {
          (function() {
            if (value === 1) return <div className="App">1!</div>;
            if (value === 2) return <div className="App">2!</div>;
            if (value === 3) return <div className="App">3!</div>;
            return <div className="App">null!</div>;
          })()
        }
        {
          (() => {
            if (val === 1) return <div className="App">1!</div>;
            if (val === 2) return <div className="App">2!</div>;
            if (val === 3) return <div className="App">3!</div>;
            return <div className="App">null!</div>;
          })()
        }
        <div>
        
          <h1 // 태그 안의 주석
          >리액트</h1>
            // 주석?
            /*
              주석???
            */
          {/* 주석! */}
        </div>
      </Fragment>
      // 두개 이상의 엘리먼트는 반드시 하나의 엘리먼트로 감싸져야 한다.
      // 불 필요한 태그라면 <Fragment>라는 태그를 사용해도 된다.
    );
  }
}

export default App;
