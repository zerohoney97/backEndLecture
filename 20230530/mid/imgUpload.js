const multer = require("multer");
const path = require("path");

// multer 함수 안에 매개변수로 객체형태의 인자를 전달
// storage 속성을 통해서 업로드 된 파일을 어디에 저장 시킬지 지정 할 수 있다.
exports.Upload = multer({
  storage: multer.diskStorage({
    // diskStorage: 메서드를 사용해서 서버 컴퓨터의 하드디스크에 업로드 파일을 저장한다.
    // 객체로 인자값 전달
    // destination 속성을 사용하면 파일이 저장될 폴더를 설정 할 수 있다.
    destination: (req, file, done) => {
      // done 콜백 함수의 두번쨰 인자값으로 폴더의 이름을 설장해주면 된다.
      // 서버 컴퓨터의 폴더명
      // 오류 내용이 있다면 작성
      done(null, "20230530/uploads/");
      //   첫번째 매개변수는 에러처리의 부분
      //  두번째 매개변수는 파일이 저장될 폴더이름
    },
    filename: (req, file, done) => {
      // filename 속성 값에서 매개변수 file.originalname은 클라이언트가 업로드한 파일의 이름을 나타낸다.
      //   file.originalname : 사용자가 업로드한 파일 원본명
      //   extname 메서드는 파일의 경로를 매개변수로 받고 파일의 확장자를 추출 해준다.
      const ext = path.extname(file.originalname);

      //   파일을 저장하는데 이름이 전부 같으면 (2)이런게 생기므로 안된다.
      //   파일 관리가 힘들어진다. 이름을 예측할 수가 없기 때문에
      //   시간을 같이 이름에 포함시켜서 저장을 시켜주면 겹칠 일이 없어 지겠죠?

      //   basename 메서드는 확장자를 추가, 제거할 수 있다.
      //   1.js=>1
      //   첫번째 매개변수로 파일의 경로
      // 두번째 매개변수로 옵션
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      done(null, filename);
      //   첫번째 매개변수는 에러 처리의 부분
      // 두번째 매개변수 서버 컴퓨터에 실제로 저장할 파일명
    },
  }),
  //   파일의 사이즈를 설정(최대 파일의 사이즈 설정)
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
});
