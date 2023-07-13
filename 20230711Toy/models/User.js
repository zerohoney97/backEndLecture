const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: { type: Sequelize.STRING(20), allowNull: false },
        user_pw: { type: Sequelize.STRING(155), allowNull: false },
        user_nickname: { type: Sequelize.STRING(20) },
      },
      {
        sequelize: sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User", // 노드 프로젝트에서 사용할 이름(조회 했을 때 보임)
        tableName: "users",
        paranoid: false, //삭제시간 표기
        charset: "utf8", //인코딩 방식 표기
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Board, { foreignKey: "user_id", sourceKey: "id" });

  }
}

module.exports = User;
