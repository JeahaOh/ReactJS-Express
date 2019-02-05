##JSX 기본 문법 II.
- CSS Style
    - 문자열 형태가 아닌 객체 형태로 넣어줌.
    - backgroundColor 와 같이 '-' 대신 camelCase를 사용한다.
    ```
    class App extends Component {
        render() {
            const style = {
            backgroundColor: 'black',
            padding: '16px',
            color: 'white',
            fontSize: '36px'
            };

            return <div style={style}>안녕하세요!</div>;
        }
    }
    ```
- Class
    - class 대신 className을 사용함.
        - 작동은 하지만, 올바른 문법을 따라 주는것이 좋다.
    - App.css
        ```
        .App {
            background: black;
            color: aqua;
            font-size: 36px;
            padding: 1rem;
            font-weight: 600;
        }
        ```
    - App.js
        ```
        import React, { Component } from 'react';
        import './App.css'

        class App extends Component {
            render() {
                return (
                <div className="App">
                    리액트
                </div>
                );
            }
        }

        export default App;
        ```
- 주석
    - {/*   */}
    - 태그 사이에 //
    ```
    import React, { Component } from 'react';

    class App extends Component {
        render() {
            return (
            <div>
                {/* 주석은 이렇게 */}
                <h1
                // 태그 사이에
                >리액트</h1>
            </div>
            );
        }
    }

    export default App;
    ```

- - -

##JSX 기본 문법 I.
- HTML 코드처럼 생겼지만 자바스크립트로 변환됨.
- React Component를 작성할때 이용되는 문법임.
- 지켜야 할 규칙이 몇가지 있음.
    - 태그는 꼭 닫아줘야 함.
        - input 태그 등도 닫아줘야함(self-closing도 가능).
    - 두개 이상의 엘리먼트는 반드시 하나의 엘리먼트로 감싸져야 한다.
        - 불 필요한 태그라면 <Fragment>라는 태그를 사용해도 된다.

    - JSX 안에 자바스크립트 값 사용하기.
        ```
        render() {
            const name = 'react';
            return (
                <div>
                    hello {name}!
                </div>
            );
        }
        ```
        - var
            - Scope가 function 단위.
            - 유동적인 값.
            - ES6에서 더이상 사용하지 않음.
        - let
            - Scope가 Scope 단위.
            - 유동적인 값.
            - ES6 이후 권장.
        - const
            - Scope가 Scope 단위.
            - 한번 선언 후 고정 값.

    - 조건부 렌더링.
        - JSX 내부에서 조건부 렌더링을 할 때는 보통 3항 연산자 사용하거나 AND 연산자를 사용함.
        - IF는 사용할 수 없음.

        - 삼항 연산자.
            - true 일 때와 false 일 때 다른것을 보여 주고 싶을 때 사용.
            ```
            render() {
                return (
                    <div>
                        {
                        1 + 1 === 2 
                            ? (<div>맞아요!</div>)
                            : (<div>틀려요!</div>)
                        }
                    </div>
                );
            }
            ```
            
        - AND 연산자.
            - 단순히 조건이 true일 때만 보여주고 false인 경우 아무것도 보여주지 않을 때 사용.
            ```
            render() {
                return (
                    <div>
                        {
                        1 + 1 === 2 && (<div>맞아요!</div>)
                        }
                    </div>
                );
            }
            ```
        
        - 복잡한 조건식의 경우 JSX 밖에서 작성하는 것이 좋음. But 꼭 JSX 내에서 사용해야한다면 IIFE를 사용함.
            ```
            render() {
                const value = 1;
                return (
                    <div>
                        {
                        (function() {
                            if (value === 1) return (<div>하나</div>);
                            if (value === 2) return (<div>둘</div>);
                            if (value === 3) return (<div>셋</div>);
                        })()
                        }
                    </div>
                );
            }
            ```

        - if문 대신 switch도 사용 가능하며, 위의 코드는 다음과 같이 쓸 수도 있음.
            ```
            (() => {
                if (value === 1) return (<div>하나</div>);
                if (value === 2) return (<div>둘</div>);
                if (value === 3) return (<div>셋</div>);
            })()
            ```
            - () => {   } : 화살표 함수 
                - this, arguments, super 개념이 없는 익명 함수. ES6에서 자주 사용하게 됨.
