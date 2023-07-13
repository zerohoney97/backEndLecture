const router = require("express").Router();
const {
  InsertBoard,
  GetAllBoards,
  GetBoard,
  DeleteBoard,
  ModifyBoard,
} = require("../controllers/BoardController");
const { isLogin } = require("../middleware/isLogin");
router.post("/insert", isLogin, InsertBoard);
router.get("/getAllBoards", isLogin, GetAllBoards);
router.get("/getBoard/:id", isLogin, GetBoard);
router.get("/deleteBoard/:id", DeleteBoard);
router.post("/modify", ModifyBoard);

module.exports = router;
