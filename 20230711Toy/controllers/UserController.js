const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateUser = async (req, res) => {
  try {
    const { id, pw, nickName } = req.body;
    console.log(req);
    const hashPw = bcrypt.hashSync(pw, 10);
    await User.create({
      user_id: id,
      user_pw: hashPw,
      user_nickname: nickName,
    });
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};

exports.GetUserData = async (req, res) => {
  try {
    console.log(req.query);
    const { id, pw } = req.query.data;
    const user = await User.findOne({ where: { user_id: id } });
    if (user) {
      const isMatch = bcrypt.compareSync(pw, user.dataValues.user_pw);
      if (isMatch) {
        const { user_id, user_nickname } = user.dataValues;
        const token = jwt.sign(
          {
            type: "JWT",
            id: user.dataValues.id,
            user_id,
            user_nickname,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "20m",
          }
        );
        req.session.token = token;
        res.send(user.dataValues);
      } else {
        res.send("invalidPW");
      }
    } else {
      res.send("invalidID");
    }
  } catch (error) {
    console.log(error);
  }
};
