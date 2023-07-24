const router = require("express").Router();

const { CreateUser,GetUserData } = require("../controllers/UserController");
router.post("/signUp", CreateUser);
router.get('/getUserData',GetUserData)

module.exports = router;
