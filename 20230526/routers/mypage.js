const {
  Login,
  changeUserId,
  changeUserNick,
} = require("../controllers/loginController");
const { getUserPost } = require("../controllers/postController");
const { isLogin } = require("../middleware/loginMiddleware");
const router = require("express").Router();

router.get("/", isLogin, getUserPost);

router.post("/changeNick", isLogin, changeUserNick);
router.post("/changeUserId", isLogin, changeUserId);

module.exports = router;
