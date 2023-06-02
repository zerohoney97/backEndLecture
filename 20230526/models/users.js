const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(seq) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        user_pw: {
          type: Sequelize.STRING(155),
          allowNull: true,
        },
      },
      {
        sequelize: seq,
        timestamps: true,
        underscored: false,
        modelName: "User", // 노드 프로젝트에서 사용할 이름(조회 했을 때 보임)
        tableName: "users2",
        paranoid: false, //삭제시간 표기
        charset: "utf8", //인코딩 방식 표기
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "user_for_id", sourceKey: "id" });
  }
}

module.exports = User;
