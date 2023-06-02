const { signUp } = require("../controllers/signUpController");

const router = require("express").Router();

router.post("/", signUp);

module.exports = router;
