var express = require('express');
var router = express.Router();
const { loginCheck } = require("../middleware/authMiddleware");
const userController = require("../controllers/apiUserController");



router.get("/profile", loginCheck, userController.profile);
router.post("/update", loginCheck, userController.update);
router.post("/change-password", loginCheck, userController.changePassword);


module.exports = router;