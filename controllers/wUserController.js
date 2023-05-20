//const { registerSchema } = require('../helpers/validationSchema')
//const { validateEmail, validateNumber } = require("../helpers/utility");
//const User = require('../models/User')
//const createError = require('http-errors')
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const User = require('../models/User')

class webUserController {
    
    async list(req, res) {
        const allUsers = await User.find({}); 
        res.render('users', { 
            title: 'users', 
            //layout: true,
            data: allUsers,
        });
  
    }
}

const wUserController = new webUserController();
module.exports = wUserController;