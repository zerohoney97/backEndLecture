// ES6 문법을 사용
// require로 파일을 가져왔는데 모듈을 가져왔는데
// import가 생겼음
import React from 'react';
class LoginBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  render() {
    return (
      <button
        onClick={() => {
          this.setState({ isLogin: !this.state.isLogin });
        }}
      >
        {this.state.isLogin ? "Logout" : "Login"}
      </button>
    );
  }
}

// nodejs에서는

// 내보낼 component가 여러개일 경우
// export { LoginBtn };
// 하나일 경우
export default LoginBtn;
