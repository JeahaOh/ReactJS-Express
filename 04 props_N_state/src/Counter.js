import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0
  };
  //  state는 객체여야 함.

  handleIncrease = () => {
    this.setState({
      number: this.state.number + 1
    });
  };

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  };
  /*  handle함수를 일반 함수로 선언하게 되면 this가 뭔지 모름.
      Constructor를 만들어야 함. 코드가 길어짐.

    constuctor( props ) {
      super(props);
      this.handleIncrease = this.handleIncrease.bind(this);
      this.handleDecrease = this.handleDecrease.bind(this);
    }

    handleIncrease() {
      console.log(this);
      this.setState({
        number: this.state.number + 1
      });
    };

    handleDecrease() {
      this.setState({
        number: this.state.number - 1
      });
    };

    처음부터 화살표 함수로 작성해주는게 편함.
   */

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
