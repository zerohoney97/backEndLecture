const { Sequelize } = require("sequelize");
const config = require("../config/config");
const User = require("./User");

const seq = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};
db.sequelize = seq;
db.User = User;
User.init(seq);

module.exports = db;
