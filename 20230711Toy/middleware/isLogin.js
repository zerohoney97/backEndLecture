const jwt = require("jsonwebtoken");

exports.isLogin = (req, res, next) => {
  const { token } = req.session;
  console.log(req.session,'이즈로그인');
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.send("expired");
    } else {
      req.decoded = decoded;
      //  다음 미들웨어 실행
      next();
    }
  });
};
