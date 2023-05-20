//const { registerSchema } = require('../helpers/validationSchema')
const { validateEmail, validateNumber } = require("../helpers/utility");
const User = require('../models/User')
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ApiAuthController {

    async register(req, res) {

        let { name, email, mobile, password } = req.body;

        if (!name) {
            return res.status(403).json({ error:"Name must not be empty!" });
        }

        if (!email) {
            return res.status(403).json({ error:"Email must not be empty!" });
        }

        if (!mobile) {
            return res.status(403).json({ error:"Mobile must not be empty!" });
        }

        if (!password) {
            return res.status(403).json({ error:"Password must not be empty!" });
        }

        if (!validateEmail(email)) {
            return res.status(403).json({ error:"Provide valid email address!" });
        }

        if (!validateNumber(mobile)) {
            return res.status(403).json({ error:"Provide valid mobile number!" });
        }

     
        const emailCheck = await User.findOne({ email: email });

        if(emailCheck){
            return res.status(403).json({ error:"Email already exists!" });
        }

        const mobileCheck = await User.findOne({ mobile: mobile });

        if(mobileCheck){
            return res.status(403).json({ error:"Mobile number already exists!" });
        }

    

        try {

            const mobileOtp = 9999;
            const emailOtp = 9999;

            password = bcrypt.hashSync(password, 10);

            const newUser = {
                name:name,
                email:email,
                mobile:mobile,
                password:password,
                mobileOtp:mobileOtp,
                emailOtp:emailOtp,
                userRole:1
            }

            const user = new User(newUser)
            const savedUser = await user.save()

            if(savedUser){
                return res.status(201).json({ messgae:"Account created successfully. Please login!" });
            }



        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }

    }


    async login(req, res) {

        let { mobile, password } = req.body;

        if (!mobile) {
            return res.status(403).json({ error:"Mobile must not be empty!" });
        }

        if (!password) {
            return res.status(403).json({ error:"Password must not be empty!" });
        }

        if (!validateNumber(mobile)) {
            return res.status(403).json({ error:"Provide valid mobile number!" });
        }

        try {

            const data = await User.findOne({ mobile: mobile });
            console.log(data)
     
            if (!data) {
                return res.status(403).json({ error:"Invalid mobile number!" });
            }else{

                const login = await bcrypt.compare(password, data.password);
                //console.log(data)
                //console.log(login)

                if (login) {

                    const token = jwt.sign(
                        { _id: data._id, role: data.userRole },
                        process.env.JWT_SECRET
                      );

                    //console.log(token)
                    
                    //const encode = jwt.verify(token, JWT_SECRET);
                    //console.log(encode)

                    return res.status(200).json({ 
                        userId: data._id,
                        mobile: data.mobile,
                        email: data.email,
                        token: token,
                        //user: encode
                    });
                    


                } else {

                    return res.status(403).json({ error:"Invalid Credentials!" });

                }

            

            }


        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }

    }

}

const authController = new ApiAuthController();
module.exports = authController;