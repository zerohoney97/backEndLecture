const e = require("express");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const signUpRouter = require("./router/user");
const session = require("express-session");
const dot = require("dotenv").config();
const app = e();

app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
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

app.use("/signUp", signUpRouter);
app.use("/img", e.static(path.join(__dirname, "imgs")));

app.listen(8080, () => {
  console.log("gogo");
});
