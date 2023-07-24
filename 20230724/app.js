const e = require("express");
const path = require("path");

const dot = require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
});
const app = e();
const session = require("express-session");
const { sequelize } = require("./models");
const userRouter = require("./router/userRouter");
const boardRouter = require("./router/boardRouter");
const cors = require("cors");
app.use(e.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
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

app.use(
  e.urlencoded({
    extended: false,
  })
);

app.use("/user", userRouter);
app.use("/board", boardRouter);

app.listen(8080, () => {
  console.log("gogo");
});

