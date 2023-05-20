//const { registerSchema } = require('../helpers/validationSchema')
const { validateEmail, validateNumber } = require("../helpers/utility");
const User = require('../models/User')
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class webAuthController {

    async getLogin(req, res) {

        res.render('login', { title: 'Login', layout: false });
  
        }
    
}

const wAuthController = new webAuthController();
module.exports = wAuthController;