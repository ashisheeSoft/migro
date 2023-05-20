//const { registerSchema } = require('../helpers/validationSchema')
const { validateEmail, validateNumber } = require("../helpers/utility");
const User = require('../models/User')
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ApiUserController {

    async profile(req, res) {

      let uId  = req.payload._id;

      if (!uId) {
        return res.status(404).json({ error:"User not found!" });
      }else{

        try {
          let UserDetails = await User
            .findById(uId)
            .select("name email mobile devices");
          if (UserDetails) {
            return res.status(200).json({ user:UserDetails });
          }
        } catch (err) {
          return res.status(500).json({ error:"Something went wrong!" });
        }

      }

      }


      async update(req, res) {

        let uId  = req.payload._id;

        let {  name } = req.body;

        if (!name) {
          return res.status(403).json({ error:"Name must not be empty!" });
        }else{

          let currentUser = await User.findByIdAndUpdate(uId, {
            name: name,
            updatedAt: Date.now(),
          });

          return res.status(200).json({ message:"User updated successfully!" });

        }


      }


      async changePassword(req, res) {

        let uId  = req.payload._id;

        let { oldPassword, newPassword } = req.body;

        if (!oldPassword) {
          return res.status(403).json({ error:"Old password must not be empty!" });
        }

        if (!newPassword) {
          return res.status(403).json({ error:"New password must not be empty!" });
        }

        try {

          const data = await User.findOne({ _id: uId });
          
          if (!data) {
            return res.status(404).json({ error:"User not found!" });
          }else{

            const oldPassCheck = await bcrypt.compare(oldPassword, data.password);

            if (oldPassCheck) {

              newPassword = await bcrypt.hashSync(newPassword, 10);

              //console.log(newPassword)

              let passChange = await User.findByIdAndUpdate(uId, {
                password: newPassword,
                updatedAt: Date.now(),
              });

              return res.status(200).json({ message:"Password changed successfully!" });

            }else{

              return res.status(403).json({ error:"Provide correct old password!" });

            }

          }

        }catch (err) {
          return res.status(500).json({ error:"Something went wrong!" });
      }

      }



}

const userController = new ApiUserController();
module.exports = userController;