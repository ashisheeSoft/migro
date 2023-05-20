//const { registerSchema } = require('../helpers/validationSchema')
const { validateEmail, validateNumber } = require("../helpers/utility");
const User = require('../models/User')
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class webDashboardController {
    
    async dashboard(req, res) {

        res.render('dashboard', { title: 'dashboard', layout: true });
  
    }
}

const wDashboardController = new webDashboardController();
module.exports = wDashboardController;