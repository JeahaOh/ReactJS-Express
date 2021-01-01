## LifeCycle API I
React의 LifeCycle API
- 이 API는 컴포넌트가 브라우져에서 나타날때, 사라질때, 그리고 업데이트 될 때, 호출되는 API 임.
- 컴포넌트가 브라우져에 나타나기 전, 후에 호출되는 API들이 있음.

1. 컴포넌트 초기 생성.
컴포넌트가 브라우저에 나타나기 전, 후에 호출되는 API들이 있음.
- **Constructor()**
    - 컴포넌트의 생성자 함수. 컴포넌트가 새로 만들어질 때마다 이 함수가 호출됨.
    ```
    constructor(props) {
        super(props);
    }
    ```

- componentWillMount()
    - 이 API는 컴포넌트가 화면에 나가기 직전에 호출되는 API.
    - v16.3 이후부터 deprecated되었고,
    - Constructor와 componentDidMount에서 충분히 처리 할 수 있음.
    ```
    componentWillMount() {    }
    ```
- **componentDidMount()**
    - 이 API는 컴포넌트가 화면에 나타나게 됐을 때 호출됨.
    - 주로 DOM을 사용해야하는 외부 라이브러리를 연동하거나,
        해당 컴포넌트에서 필요로 하는 데이터를 요청하기 위해
        axios, fetch 등을 통해 ajax를 요청하거나, 
        DOM의 속성을 읽거나 직접 변경하는 작업을 진행함.
    ```
    componentDidMount() {
    // 외부 라이브러리 연동: D3, masonry, etc
    // 컴포넌트에서 필요한 데이터 요청: Ajax, GraphQL, etc
    // DOM 에 관련된 작업: 스크롤 설정, 크기 읽어오기 등
    }
    ```

2. 컴포넌트 업데이트.
컴포넌트 업데이트는 props의 변화, state의 변화에 따라 결정됨.
업데이트의 전, 후에 호출되는 API들.

- componentWillReceiveProps()
    - 컴포넌트가 새로운 props를 받게 되었을 때 호출.
    - 주로, state가 props에 따라 변하는 로직을 작성함.
    - 새로 받게 될 props는 nextProps로 조회할 수 있음.
    - 이때, this.props를 조회하면 업데이트 되기 전의 API임.
    - v16.3이후부터 deprecate됨.
    - getDerivedStateFromProps로 대체 됨.
    ```
    componentWillReceiveProps(nextProps) {
    // this.props 는 아직 바뀌지 않은 상태
    }
    ```

- [NEW] **static** **getDerivedStateFromProps()**
    - v16.3 이후에 만들어진 LifeCycle API
    - props로 받아온 값을 state로 동기화 하는 작업을 해줘야하는 경우에 사용.
    ```
    static getDerivedStateFromProps(nextProps, prevState) {
        //  여기서는 setState를 하는것이 아니라.
        //  특정 props가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태
        if ( nextProps.value !== prevState.value ) {
            return { value: nextProps.value };
        }
        return null;
        //  null을 리턴하면 따로 업데이트 할 것은 없다라는 의미.
    }
    ```

- **shouldComponentUpdate()**
    - 컴포넌트를 최적화 하는 작업에서 매우 유용함.
    - react는 변화가 발생하는 부분만 업데이트를 해줘서 성능이 잘나옴.
        - 변화한 부분만 감지하기 위해서는 VirtualDom에 한번 그려줘야함.
    - 즉, 현재 컴포넌트의 상태가 업데이트 되지 않아도, 부모 컴포넌트가 리렌더링 되면,
    - 자식 컴포넌트도 렌더링 됨. (render() 함수가 호출 된다는 뜻.)
    - 변화가 없다면 DOM은 조작아지 않음. virtualDOM에만 렌더링할 뿐임.
    - 이 작업이 부하가 많이 않지만, 무수히 많은 컴포넌트에서 렌더링을 한다면 부하가 옴.
    - 쓸데없이 낭비되는 CPU처리량을 줄여주기 위해서 우리는 Virtual DOM에 리렌더링 하는것도, 불필요 할 경우엔 방지하기 위해서 shouldComponentUpdate를 작성함.
    - 이 함수는 기본적으로 true를 반환 하지만,
    - 우리가 따로 작성을 해서 조건에 따라 false를 반환하면 해당 조건에는 render()함수를 호출하지 않음.
    ```
    shouldComponentUpdate( nextProps, nextState ) {
        //  return false 하면 업데이트 하지 않음.
        //  return this.props.checked !== nextProps.checked
        return true;
    }
    ```
- componentWillUpdate()
    - shouldComponentUpdate에서 true를 반환할 시 호출되는 메소드.
    - 주로 애니메이션 효과를 초기화 하거나, 이벤트 리스너를 없애는 작업을 함.
    - 이 함수가 호출 된 후, render()가 호출됨.
    - v16.3이후 deprecate되었고 getSnapshotBeforeUpdate()로 대체됨.
    ```
    componentWillUpdate( nextProps, nextState ) {   }
    ```
- [NEW] **getSnapshotBeforeUpdate()**
    - 이 API가 발생하는 시점.
        - render()
        - getSnapshotBeforeUpdate()
        - 실제 DOM에 변화 발생.
        - componentDidUpdate()
    - DOM의 변화가 일어나기 직전의 DOM의 상태를 가져오고,
    - 여기서 리턴하는 값은 componentDidUpdate에서 3번째 파라마티러로 받아올 수 있게됨.
    ```
    getSnapshotBeforeUpdate( prevProps, prevState ) {
        //  DOM 업데이트가 일어나기 직전으 시지머.
        //  새 data가 상단에 추가 되어도 스크롤바를 유지할것.
        //  scrollHeight는 전, 후를 비교해서 스크롤 위치를 설정하기 위함.
        //  scrollTop은, 이미 크롬에서 구현 되어 있음.
        //  이미 구현되어 있다면 처리하지 않도록 하기 위함.
        if ( prevState.array !== this.state.array ) {
            const {
                scrollTop, scrollHeight
            }   = this.list;

            //  여기서 반환하는 값은 componenetDidMount에서 snapshot값으로 받아 올 수 있음.

            return {
                scrollTop, scrollHeight
            };
        }
    }

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if ( snapshot ) {
            const { scrollTop } = this.list;
            if( scrollTop !== snapshot.scrollTop ) return;
            //  이미 기능이 있다면 처리하지 않음.
            const diff = this.list.scrollHeight - snapshot.scrollHeight;
            this.list.scrollTop += diff;
        }
    }
    ```
        - 전체 코드 : https://codesandbox.io/s/484zvr87ow

- **componentDidUpdate()**
    - 컴포넌트에서 render()를 호출하고 난 다음에 발생.
    - 이 시점에서 this.props와 this.state가 바뀌어 있음.
    - 그리고 파라미터를 통해 이전의 값인 prevProps와 prevState를 조회할 수 있음.
    - 그리고 getSnapshotBeforeupdate에서 반환한 snapshot값은 세번때 값으로 받아옴.
    ```
    componentDidUpdate( prevProps, prevState, snapshot ) {  }
    ```

3. 컴포넌트 제거
컴포넌트가 더 이상 필요하지 않게 되면 단 하나의 API가 호출됨.

- **componentWillUnmount()**
    - 주로 등록했던 이벤트를 제거하고,
    - 만약 setTimeout을 걸은것이 있다면 clearTimeout을 통해 제거를 함.
    - 추가적으로 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose 기능이 있다면 여기서 호출하면 됨.

## LifeCycle API II
- 예제 전체 코드
    - https://codesandbox.io/s/484zvr87ow
- 예제 초기 코드
    - https://codesandbox.io/s/4r6lqrlvj9
- Counter.js
```
import React, { Component } from 'react';

class Conter extends Component {
    state = {
        nember : 0
    }

    constructor( props ) {
        supter( props );
        console.log('constructor');
    }

    componentWillMount() {
        console.log( 'componentWillMount (deprecated)' );
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    shouldComponentUpdate( nextProps, nextState ) {
        //  5의 배수라면 리랜더링 하지 않음.
        console.log('shouldComponentUpdate');
        if ( nextState.number % 5 === 0 ) return false;
        return true;
    }

    componentWillUpdate( nextProps, nextState ) {
        console.log('componentWillUpdate');
    }

    componentDidUpdate( prevProps, prevState ) {
        console.log('componentDidUpdate');
    }

    handleIncrease = () => {
        const { number } = this.state;
        this.setState( {
            number : nember + 1
        });
    }

    handleDecrease = () => {
        this.setState(
            ( { number } ) => ({
                number: number - 1
            })
        );
    }

    render() {
        console.log('render');
        return (
            <div>
                <h1>카운터</h1>
                <div>값 : {this.state.number}</div>
                <button onClick={this.handleIncrease}> + </button>
                <button onClick={this.handleDecrease}> - </button>
            </div>
        );
    }
}

expert default Counter;
```

5의 배수일 때 컴포넌트가 리랜더링 되지 않음.

- 컴포넌트에 에러 발생.
render 함수에서 에러가 발생한다면, 리액트 앱이 크래쉬 되어버림.
그러한 상황에 유용하게 사용 할 수 있는 API 가 있음.

- **componentDidCatch()**
    - 에러가 발생하면 아래와 같이 componentDidCatch가 실행되고,
    - state.error를 true로 설정하게 되고,
    - render() 함수 쪽에서 이에 따라 에러를 띄워주면 됨.
    - 사용시 주의점 :
        - 컴포넌트 자신의 render() 함수에서 에러가 발생하는것은 잡을 수 없음.
        - 그 대신, 컴포넌트의 자식 컴포넌트 내부에서 발생하는 에러들을 잡을 수 있음.
    ```
    componentDidCatch( error, info ) {
        this.setState( {
            error: true
        });
    }
    ```

- 문제가 발생하는 코드 작성.
    ```
    import React, { Component } from 'react';

    const Problematic = () => {
        throw (new Error('버그가 나타났다!'));
        return(
            <div>
            </div>
        );
    };

    class Counter extends Component {
        //  ... 생략

        render() {
            return (
                <div>
                    <h1>카운터</h1>
                    <div>값: {this.state.number}</div>
                    { this.state.number === 4 && <Problematic/> }
                    <button onClick={this.handleIncrease}>+</button>
                    <button onClick={this.handleDecrease}>-</button>
                </div>
            );
        }
    }

    export default Counter;
    ```
    - Problematic 이라는 컴포넌트를 만들고 이 값이 4가 되면 렌더링을 하도록 성정함.
    - Problematic은 렌더링이 될 때 에러가 발생했음을 알리는 throw를 사용,
    - 한번 카운터 값이 4까지 올라갔을때 콘솔에서 Error가 남.
    
- componentDidCatch를 통하여 자식 컴포넌트에서 발생한 에러 잡기.
    - Counter.js
        - 에러가 발생하는 상황을 만들면 앱이 크래쉬 되는것이 아니라,
        - 에러가 발생했다는 메세지를 띄움.
    ```
    import React, { Component } from 'react';

    const Problematic = () => {
        throw ( new Error('버그가 나타났다!'));
        return (
            <div>
            
            </div>
        );
    };

    class Counter extends Component {
        state = {
            number: 0,
            error: false
        }

        //  (...생략)

        componentDidCatch( error, info ) {
            this.setState({
                error:true
            });
        }

        render() {
            if(this.state.error) return (<h1>에러발생!</h1>);

            return (
                <div>
                    <h1>카운터</h1>
                    <div>값: {this.state.number}</div>
                    { this.state.number === 4 && <Promblematic /> }
                    <button onClick={this.handleIncrease}>+</button>
                    <button onClick={this.handleDecrease}>-</button>
                </div>
            );
        }
    }
    ```

    - 보통 렌더링 부분에서 오류가 발생하는 것은 사전에 방지해 주어야 함.
    - 주로 자주 에러가 발생하는 이유는 다음과 같음.
        1. 존재하지 않는 함수를 호출하려고 할 때.
            - ex: props로 받을줄 알았던 함수가 전달되지 않았을 때
            ```
            this.props.onClick();
            ```
        2. 배열이나 객체가 올 줄 알았는데, 해당 객체나 배열이 존재하지 않을 때.
            ```
            this.props.object.value;    //  object is undefined
            this.props.array.length;    //  array is undefined
            ```
    - 이러한 것들은 render 함수 대신에 다음과 같은 형식으로 막아 줄 수 있음.
        ```
        render() {
            if(
                !this.props.object || !this.props.array || this.props.array.length === 0
                ) return null;
            //  object나 array를 사용하는 코드.
        }
    - 혹은 이전에 배운 컴포넌트 기본값을 설정하는 defaultProps를 통해서 설정할 수 있음.
        ```
        class Sample extends Component {
            static defaultProps ={
                onIncrement: () => console.warn('onIncrement is not defined'),
                object: {},
                array: []
            }
        }
        ```
        - 하지만 이걸로도 놓친 버그들은 componentDidCatch를 통해서 잡아주고, 필요시엔 에러의 세부 내용을 서버쪽에 기록하게 해서 조사하면 좋음.

- 정리
    - 리액트 컴포넌트가 사용될 때 각 상황에 따라 호출되는 LifeCycle API에 대해 알아보았음.
    - 이 API 들은 알아두면 여러 상황에서 유용하게 쓸 수 있음.
    - 어떠한 API 들이 있는지 인지하고 나중에 해결해야 할 문제가 있을 때 사용하면 됨.