const { validateEmail, validateNumber } = require("../helpers/utility");
const User = require('../models/User')
const Device = require('../models/Device')
const Type = require('../models/Type')
const Relay = require('../models/Relay')
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ApiRelayController {

    async list(req, res) {

        let uId  = req.payload._id;

        let {  deviceId } = req.body;

        if (!deviceId) {
            return res.status(403).json({ error:"Device Id must not be empty!" });
        }

        const findrelays = await Relay.find({device:deviceId});
        if(findrelays){
            return res.status(200).json({ relays:findrelays });
        }else{
            return res.status(403).json({ error:"No relays found with this device!" });
        }


    }


    async update(req, res) {
        let uId  = req.payload._id;

        let { name, description, relayId } = req.body;

        if (!relayId) {
            return res.status(403).json({ error:"Relay Id must not be empty!" });
        }

        if (!name) {
            return res.status(403).json({ error:"Relay Name must not be empty!" });
        }

        try {

            let detailsChange = await Relay.findByIdAndUpdate(relayId, {
                name: name,
                description:description,
                updatedAt: Date.now(),
              });

            return res.status(200).json({ message:"Details changed successfully!" });

        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }
    }

    async status(req, res) {
        let uId  = req.payload._id;

        let { status, relayId } = req.body;

        if (!relayId) {
            return res.status(403).json({ error:"Relay Id must not be empty!" });
        }


        try {

            let detailsChange = await Relay.findByIdAndUpdate(relayId, {
                status: status,
                updatedAt: Date.now(),
              });

            return res.status(200).json({ message:"Status changed successfully!" });

        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }
    }
}
const relayController = new ApiRelayController();
module.exports = relayController;