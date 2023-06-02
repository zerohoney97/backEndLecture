// 이미지 업로드
// 서버측 컴퓨터에 폴더에 저장이후 이미지 파일을
// 파일의 경로를 설정하고 서버측에서 이미지 파일을 가져와서 보여준다.

const e = require("express");
const path = require("path");
const cors = require("cors");
const uploadRouter = require("./routers/upload");
// express path multer
// multer 모듈을 사용해서 이미지 업로드 할것. 파일이 저장될 경로나 파일의 확장자
// 이름등을 설정해서 파일을 저장한다.

const app = e();

app.set("views", path.join(__dirname, "page"));

app.use(e.urlencoded({ extended: false }));

// cors 도메인 허용

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.use("/upload", uploadRouter);
// 정적 파일 경로 추가했던 것 처럼...
app.use("/img", e.static(path.join(__dirname, "uploads")));

// 요청과 응답에서 json 형식의 데이터를 전달 받았을 때
// 요청과 응답에서 json 파싱을 해서 자바 스크립트 객체로 변환 시켜주는 미들웨어
// json 메서드로 json 파싱
app.use(e.json());

app.listen(8080, () => {
  console.log("gogo");
});
