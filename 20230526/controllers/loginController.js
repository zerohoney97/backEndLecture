const { User, Post } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  try {
    const { user_id, user_pw } = req.body;
    const user = await User.findOne({ where: { user_id } });
    if (user == null) {
      return res.send("가입 안한 아이디 입니다");
    }

    const same = bcrypt.compareSync(user_pw, user.user_pw);

    if (same) {
      let token = jwt.sign(
        {
          type: "JWT",
          id: user.id,
          name: user.name,
          user_id: user.user_id,
          age: user.age,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "10m",
        }
      );
      req.session.access_token = token;
      //   /:경로는 백엔드의 도메인 경로 루트
      //  프론트의 경로를 작성해주자
      // 이렇게 리다이렉트를 할게 아니면 프론트에서 응답받은 값으로
      // 조건 분기 처리해서 페이지를 전환 시켜주면 된다.

      //   리다이렉트는 우리가 배포한 프론트의 경로를 쓰자 ㅎㅎ
      return res.redirect("http://127.0.0.1:5500/20230526/main.html");
    } else {
      return res.send("비밀번호 틀림");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.viewUser = async (req, res) => {
  const { decoded } = req;
  const user = await User.findOne({ where: { user_id: decoded.user_id } });
  //   json 형태로 데이터를 응답
  res.json(user);
};

exports.changeUserNick = async (req, res) => {
  try {
    const { decoded } = req;
    const { name } = req.body;

    await User.update({ name }, { where: { id: decoded.id } });
    await Post.update({ writer: name }, { where: { user_for_id: decoded.id } });
    res.redirect("http://127.0.0.1:5500/20230526/mypage.html");
  } catch (error) {
    console.log(error);
  }
};

exports.changeUserId = async (req, res) => {
  try {
    const { decoded } = req;
    const { user_id } = req.body;
    await User.update({ user_id }, { where: { id: decoded.id } });
    res.redirect("http://127.0.0.1:5500/20230526/mypage.html");
  } catch (error) {
    console.log(error);
  }
};
