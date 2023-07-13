const router = require("express").Router();

const { CreateUser,GetUserData } = require("../controllers/UserController");
router.post("/save", CreateUser);
router.get('/getUserData',GetUserData)

module.exports = router;
