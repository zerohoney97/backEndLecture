const {
  insert,
  getAllPosts,
  toUpdatePage,
  sendDataToUpdatePage,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { isLogin } = require("../middleware/loginMiddleware");
const router = require("express").Router();

router.get("/", isLogin, getAllPosts);

router.post("/insert", isLogin, insert);

router.get("/getPodstData", sendDataToUpdatePage);
router.get("/update/:id", isLogin, toUpdatePage);
router.post("/update/execute/:id", isLogin, updatePost);
router.get("/del/:id", deletePost);

module.exports = router;
