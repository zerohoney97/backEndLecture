const { Board, User } = require("../models");

exports.InsertBoard = async (req, res) => {
  try {
    const { id } = req.decoded;
    console.log(id);
    const { title, content, formattedDate } = req.body;
    await Board.create({
      title,
      content,
      user_id: id,
      date: formattedDate,
    });
    res.send("insert success");
  } catch (error) {
    console.log(error);
    res.send("fail");
  }
};

exports.GetAllBoards = async (req, res) => {
  try {
    console.log(req.session.token, "컨트롤러");
    let data = await Board.findAll({ include: [User] });
    data.forEach((dataEl, index) => {
      data[index].User = dataEl.User.dataValues;
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send("fail");
  }
};

exports.GetBoard = async (req, res) => {
  try {
    console.log(req.session);
    const { id } = req.params;
    let data = await Board.findOne({ where: { id }, include: [User] });
    data.User = data.User.dataValues;
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteBoard = async (req, res) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;
    const board = await Board.findOne({ where: { id } });
    console.log(userId, "---------", board.dataValues);
    if (parseInt(userId) === board.dataValues.user_id) {
      await Board.destroy({ where: { id } });
      res.send("정상파괴");
    } else {
      res.send("another");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.ModifyBoard = async (req, res) => {
  try {
    const { title, content, formattedDate, id } = req.body;
    await Board.update({ title, content, formattedDate }, { where: { id } });
    res.send('success')
  } catch (error) {
    console.log(error);
  }
};
