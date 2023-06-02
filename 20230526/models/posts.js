const Sequelize = require("sequelize");
class Post extends Sequelize.Model {
  static init(seq) {
    return super.init(
      {
        title: { type: Sequelize.STRING(20), allowNull: false },
        writer: { type: Sequelize.STRING(20), allowNull: false },
        content: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize: seq,
        timestamps: true,
        underscored: false,
        modelName: "Post", // 노드 프로젝트에서 사용할 이름(조회 했을 때 보임)
        tableName: "posts2",
        paranoid: false, //삭제시간 표기
        charset: "utf8", //인코딩 방식 표기
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "user_for_id", targetKey: "id" });
  }
}

module.exports = Post;
