//const { registerSchema } = require('../helpers/validationSchema')
//const { validateEmail, validateNumber } = require("../helpers/utility");
//const User = require('../models/User')
//const createError = require('http-errors')
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const Device = require('../models/Device')

class webDeviceController {
    
    async list(req, res) {

        const allDevices = await Device.find({}); 
        console.log(allDevices)
        res.render('devices', { 
            title: 'devices', 
           // layout: true, 
            data: allDevices
        });
  
    }
}

const wDeviceController = new webDeviceController();
module.exports = wDeviceController;