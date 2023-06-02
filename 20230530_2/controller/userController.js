const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

exports.signUp = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { user_id, user_pw, username } = req.body;
    const data = await User.findOne({ where: { user_id } });
    if (data == null) {
      const hash = bcrypt.hashSync(user_pw, 10);
      await User.create({
        user_id,
        user_pw: hash,
        username,
        img: filename,
      });
      res.send("성공");
      console.log("req.file");
    } else {
      res.send("중복됨");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { user_id, user_pw } = req.body;
    const data = await User.findOne({ where: { user_id } });
    if (data) {
      const same = bcrypt.compareSync(user_pw, data.user_pw);
      if (same) {
        const token = jwt.sign(
          {
            type: "JWT",
            id: data.id,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "20m",
          }
        );
        req.session.token = token;
        res.redirect("http://127.0.0.1:5500/20230530_2/userProfile.html");
      } else {
        res.send("비밀번호가 잘 못 됐습니다.");
      }
    } else {
      res.send("있는 유저가 아닙니다.");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUserInfo = async (req, res) => {
  try {
    const { token } = req.session;
    const data = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (err, decoded) => {
        if (err) {
          console.log(err);
          res.send("토큰 만료됨");
        }
        const data = await User.findOne({ where: { id: decoded.id } });
        res.json(data);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.changeUserProfile = async (req, res) => {
  try {
    const { token } = req.session;
    const { user_id, username } = req.body;
    console.log(req.session);
    const { filename } = req.file;
    const data = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (err, decoded) => {
        if (err) {
          console.log(err);
          res.send("토큰 만료됨");
        }
        const data = await User.findOne({ where: { id: decoded.id } });

        if (data.user_id != user_id) {
          await User.update( {user_id}, { where: { id:decoded.id } });
        }

        if (data.username != username) {
          await User.update(  {username}, { where: { id:decoded.id } });
        }
        if (data.img != filename) {
          await User.update( {img:filename}, { where: { id:decoded.id } });
        }
        res.send("변경 성공");
      }
    );
  } catch (error) {
    console.log(error);
  }
};
