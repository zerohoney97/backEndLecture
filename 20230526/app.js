// 로그인 페이지
// 복습
// 폴더를 나눠서
// 배포를 해서 프론트를 수정하면 프론트에만 푸쉬
// 백엔드를 수정하면 백에만 푸쉬

const e = require("express");
const cors = require("cors");
const session = require("express-session");
const dot = require("dotenv").config();
const { sequelize } = require("./models");
const loginRouter = require("./routers/login");
const signUprouter = require("./routers/signUp");
const postRouter = require("./routers/posts");
const mypageRouter = require("./routers/mypage");
// 프로젝트 관리
// 백엔드랑 프론트랑 나눠서 깃 레파지토리 파놓고 푸쉬

// express express-session cors
// 프로젝트 시작

const app = e();
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("시퀄 성공");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(e.urlencoded({ extended: false }));

// 다른 도메인에서 악의적으로 접근할 수 없도록
// 도메인 접근시 발생하는 보안 정책
// cors 모듈을 가지고 도메인을 허용해주자
// Access-control-allow-origin을 헤더에 포함해서
// 접근을 허용하고 응답하고 브라우저에서 응답을 받은뒤
// 헤더값을 확인해서 접근을 허용 또는 차단한다.

app.use(
  cors({
    // 도메인 혀용 옵션
    // 접근을 허용할 도메인
    // 여러개의 도메인을 허용하고 싶다면 배열의 형태로 넣어주면 된다.
    origin: "http://127.0.0.1:5500",
    // 클라이언트의 요청에 쿠키를 포함할지의 속성
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("응답함");
});
app.use("/login", loginRouter);
app.use("/signUp", signUprouter);
app.use("/posts", postRouter);
app.use("/mypage", mypageRouter);

app.listen(8080, () => {
  console.log("gogo");
});
