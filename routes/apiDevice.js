var express = require('express');
var router = express.Router();
const { loginCheck } = require("../middleware/authMiddleware");

const deviceController = require("../controllers/apiDeviceController");

router.post("/create", loginCheck, deviceController.create);
router.post("/revoke", loginCheck, deviceController.revoke);
router.post("/update", loginCheck, deviceController.update);
router.post("/list", loginCheck, deviceController.list);

module.exports = router;