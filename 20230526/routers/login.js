const { Login, viewUser } = require("../controllers/loginController");
const { isLogin } = require("../middleware/loginMiddleware");

const router = require("express").Router();

router.post("/", Login);
router.get("/view", isLogin, viewUser);

module.exports = router;
