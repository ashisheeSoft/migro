var express = require('express');
var router = express.Router();
const { loginCheck } = require("../middleware/authMiddleware");

const relayController = require("../controllers/apiRelayController");

router.post("/list", loginCheck, relayController.list);
router.post("/update", loginCheck, relayController.update);
router.post("/status", loginCheck, relayController.status);

module.exports = router;