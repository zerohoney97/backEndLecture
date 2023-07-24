const Sequelize = require("sequelize");

class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: { type: Sequelize.STRING(30), allowNull: false },
        content: { type: Sequelize.TEXT },
        date:{type:Sequelize.STRING(30),allowNull:false}
      },
      {
        sequelize: sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Board", // 노드 프로젝트에서 사용할 이름(조회 했을 때 보임)
        tableName: "boards",
        paranoid: false, //삭제시간 표기
        charset: "utf8", //인코딩 방식 표기
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

  }
}

module.exports = Board;
