var express = require('express');
var router = express.Router();

const authController = require("../controllers/apiAuthController");


//router.post("/isadmin", authController.isAdmin);
router.post("/register", authController.register);
router.post("/login", authController.login);
//router.post("/signin", authController.postSignin);
//router.post("/user", loginCheck, isAuth, isAdmin, authController.allUser);

module.exports = router;