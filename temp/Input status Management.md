## Input 상태 관리하기
리액트는 그냥 자바스크립트와 가까움.
자바스크립트를 잘하면 리액트도 그냥 할 수 있다?
전화 번호부 관리 프로젝트를 예제로 할거임.

- - -
### 프로젝트 생성.
- 예제 코드 : https://github.com/vlpt-playground/phone-book
```
create-react-app phone-book
```
해당 디렉토리를 VSCode에서 열고 yarn start.

### 컴포넌트 PhoneForm
사용자 이름과 전화번호를 입력 받는 컴포넌트를 만들거임.
input 컴포넌트의 입력을 state에 담을 것임.

#### input 다루기
file: src/components/PhoneForm.js
```
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>{this.state.name}</div>
      </form>
    );
  }
}

export default PhoneForm;
```
onChange 이벤트가 발생하면, 
e.target.value 값을 통하여 이벤트 객체에 담겨있는 현재 텍스트 값을 읽어옴.
해당 값을 state의 name으로 설정.
render 부분에서 input을 렌더링 할 때 value값과 onChange 값을 넣어줌.
onChange는 input의 텍스트 값이 바뀔 때마다 발생하는 이벤트 객체임.
여기에 handleChange를 설정함.
나중에 데이터를 등록하고 나면 이 name 값을 공백으로 초기화 해주고,
초기화 됐을 때 input애서도 반영이 되도록 value를 설정함.
그리고 name 값이 잘 바뀌는지 확인 할 수 있도록 값을 렌더링함.

// file: src/App.js
```
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';


class App extends Component {
  render() {
    return (
      <div>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
```

#### input 추가하기
이름과 함께 전화번호도 받아야함으로 수정.
// file: src/components/PhoneForm.js
```
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>{this.state.name} {this.state.phone}</div>
      </form>
    );
  }
}

export default PhoneForm;
```
input에 name 속성을 더해서 두개의 input을 받음.
render를 보면 각 input에 name 값을 부여해 줬음.
name 값은 event.target.name을 통해서 조회 가능함.
setState 내부에 사용된 문법은 Computed property names라는 문법임.
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names


#### 부모 컴포넌트에 정보 전달하기
state 안에 있는 값들을 부모 컴포넌트에 전달해야함.
이런 상황에서, 부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에게 전달한 다음에 자식 내부에서 호출하는 방식을 사용함.
App에서 handleCreate라는 메소드를 만들고, 이를 PhoneForm에 전달함.
PhoneForm에서 submit하면 props로 받은 함수를 호출. App에서 파라미터로 받은 값을 사용 할 수 있도록 함.

file: src/App.js
```
import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  }
  render() {
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;
```

file: src/components/PhoneForm.js
```
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
```
handleSubmit 함수에서 e.preventDefault()가 호출 됨.
submit 버튼의 기능을 막고,
props오 받은 onCreate 함수를 호출하고, 상태값을 초기화.
render 부분에서 submit함.