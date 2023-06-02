const {
  signUp,
  getAllUserInfo,
  login,
  changeUserProfile,
} = require("../controller/userController");
const upload = require("../uploadImg/uploadImg");
const router = require("express").Router();
router.post("/", upload.single("profile"), signUp);

router.post("/login", login);

router.get("/getAllUserInfo", getAllUserInfo);

router.post("/changeUserProfile", upload.single("profile"), changeUserProfile);
router.get("/changeUserProfile", (req,res)=>{
res.redirect('http://127.0.0.1:5500/20230530_2/changeData.html')
});
module.exports = router;
