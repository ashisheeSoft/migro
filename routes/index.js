var express = require('express');
var router = express.Router();

const wAuthController = require("../controllers/wAuthController");
const wUserController = require("../controllers/wUserController");
const wDeviceController = require('../controllers/wDeviceController');
const wDashboardController = require('../controllers/wDashboardController');

/* GET home page. */
router.get('/',  wAuthController.getLogin);


router.get('/dashboard', wDashboardController.dashboard);


router.get('/devices', wDeviceController.list);

router.get('/users', wUserController.list);


module.exports = router;
