const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
  const { access_token } = req.session;
  console.log(access_token);

  jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.send("만료되었습니다. 다시 로그인 해주세요");
    } else {
      req.decoded = decoded;
    //  다음 미들웨어 실행
      next();
    }
  });
};
