// ES6문법

// 가져와서 Login명으로 사용할거임
import LoginBtn from "./components/loginBtn";

// 루트 요소 가상 DOM으로 생성

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<LoginBtn></LoginBtn>);
