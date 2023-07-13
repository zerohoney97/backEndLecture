const { Sequelize } = require("sequelize");
const Board = require("./Board");
const User = require("./User");
const config = require("../config/config");

const seq = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};
db.sequelize = seq;
db.User = User;
db.Board = Board;
User.init(seq);
Board.init(seq);
User.associate(db)
Board.associate(db)
module.exports = db;
