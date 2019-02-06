import React /* { Component } */ from 'react';

{
  /*
class MyName extends Component {
  static defaultProps = {
    name: 'defaultProps'
  };
  //  static으로 해주는게 최신 문법.

  render() {
    return (
      <div>
        Hi My Name is <p>{this.props.name}</p>.
      </div>
    );
  }
}

// MyName.defaultProps = {
//   name: 'defaultProps'
// };
 */
}

//  딱히 기능없이 단순히 props만 받아와서 보여주는 경우,
//  아래와 같이 함수형 함수형 컴포넌트로 작성함.
//  함수형 컴포넌트를 사용할 경우 상단에서 Component를 불러오지 않아도 됨.
const MyName = ({ name }) => {
  return (
    <div>
      Hi My Name is <b>{name}</b>.
    </div>
  );
};
MyName.defaultProps = {
  name: 'React'
};
export default MyName;