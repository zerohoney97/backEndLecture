const router = require("express").Router();
const {
  InsertBoard,
  GetAllBoards,
  GetBoard,
  DeleteBoard,
  ModifyBoard,
} = require("../controllers/BoardController");
router.post("/insert", InsertBoard);
router.get("/getAllBoards", GetAllBoards);
router.get("/getBoard/:id", GetBoard);
router.get("/deleteBoard/:id", DeleteBoard);
router.post("/modify", ModifyBoard);

module.exports = router;
