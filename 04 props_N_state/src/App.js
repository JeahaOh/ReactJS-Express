import React, { Component, Fragment } from 'react';
import MyName from './MyName';

class App extends Component {
  render() {
    return (
      <Fragment>
        <MyName name="TEST" />
        <MyName />
        <Counter />
      </Fragment>
    );
  }
}

export default App;
