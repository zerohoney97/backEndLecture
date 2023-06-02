const router = require("express").Router();
const { Upload } = require("../mid/imgUpload");

// Upload.single =>form에서 이미지 파일을 가지고 있는 input의 name
router.post("/", Upload.single("upload"), (req, res) => {
  const { file, body } = req;
  console.log(file, body);
  //   데이터 베이스에 이미지의 경로를 추가
  
  res.send("file uplaod");
});

module.exports = router;
