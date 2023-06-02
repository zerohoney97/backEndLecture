const { Post, User } = require("../models");

let postId;
exports.insert = async (req, res) => {
  try {
    console.log(req.decoded.name);
    const { title, content } = req.body;
    const { decoded } = req;
    await Post.create({
      title,
      writer: decoded.name,
      content,
      user_for_id: decoded.id,
    });
    res.redirect("http://127.0.0.1:5500/20230526/posts.html");
  } catch (error) {
    console.log(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const data = await Post.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

exports.toUpdatePage = async (req, res) => {
  try {
    const { id } = req.params;
    postId = id;
    res.redirect("http://127.0.0.1:5500/20230526/update.html");
  } catch (error) {
    console.log(error);
  }
};
exports.sendDataToUpdatePage = async (req, res) => {
  try {
    console.log(postId);
    res.json(postId);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { writer, content } = req.body;
    const { id } = req.params;
    await Post.update({ writer, content }, { where: { id } });
    res.redirect("http://127.0.0.1:5500/20230526/posts.html");
  } catch (err) {
    console.log(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.redirect("http://127.0.0.1:5500/20230526/posts.html");
  } catch (error) {
    console.log(error);
  }
};

exports.getUserPost = async (req, res) => {
  try {
    const { decoded } = req;
    console.log(decoded);
    const data = await User.findOne({
      where: { id: decoded.id },
      include: [{ model: Post }],
    });
    const newData=data.dataValues.Posts.map((a)=>{
      return a.dataValues
    })
    console.log(newData);
    res.json(newData);
  } catch (error) {
    console.log(error);
  }
};
