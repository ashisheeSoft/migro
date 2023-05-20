
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.loginCheck = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload
        console.log(req)
        next();

    }catch (err) {
      return res.status(401).json({ error:"Authorization Required!" });
      }
}