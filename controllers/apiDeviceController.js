const { validateEmail, validateNumber } = require("../helpers/utility");
const User = require('../models/User')
const Device = require('../models/Device')
const Type = require('../models/Type')
const Relay = require('../models/Relay')
const createError = require('http-errors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ApiDeviceController {

    async create(req, res) {

        let uId  = req.payload._id;

        let { deviceType, deviceName, deviceId } = req.body;

        if (!deviceType) {
            return res.status(403).json({ error:"Device Type must not be empty!" });
        }

        if (!deviceName) {
            return res.status(403).json({ error:"Device Name must not be empty!" });
        }

        if (!deviceId) {
            return res.status(403).json({ error:"Device Id must not be empty!" });
        }

        try {
            //check user
            const data = await User.findOne({ _id: uId });

            if (!data) {
                return res.status(404).json({ error:"User not found!" });
            }else{

                //find device by defaul device id
                const findDeviceId = await Device.findOne({deviceId:deviceId});

                if (!findDeviceId) {

                    // console.log(findDeviceId)

                    //find device type
                    const findDeviceType = await Type.findOne({name:deviceType});

                    if (!findDeviceType) {
                        return res.status(404).json({ error:"Device Type not found!" });
                    }else{

                        // First time create device

                        // Device Model
                        let users = [];
                        users.push(data._id)

                        // new device obj
                        const newDevice = {
                            user:data._id,
                            deviceName:deviceName,
                            deviceId:deviceId,
                            type:findDeviceType._id,
                            users:users
                        }

                        const newdv = new Device(newDevice)
                        const savedDevice = await newdv.save();

                        const relaysObj = findDeviceType.relays;
                        let relaysInsertObj = [];

                        //relays obj
                        relaysObj.forEach(async  (relay) => {
                            const newRelay = new Relay({
                                device: savedDevice._id,
                                deviceId:deviceId,
                                name: '',
                                relayName: relay.relayName,
                                relayCode: relay.relayCode,
                                status: relay.status
                            })
                            relaysInsertObj.push(newRelay)
                        });

                    
                        //insert relays
                        const result = await  Relay.insertMany(relaysInsertObj).then(function(){
                        }).catch(function(error){
                            return res.status(500).json({ error:"Something went wrong!" });
                        });


                        //create devices array from user
                        let userDevices = data.devices;
                        userDevices.push(savedDevice._id)

                        let uDevices = await User.findOneAndUpdate( data._id, {
                            devices: userDevices,
                            updatedAt: Date.now(),
                        });

                        if(savedDevice){
                            return res.status(201).json({ messgae:"Device added successfully!" });
                        }

                    }

                }else{

                    //create users array
                    let deviceUsers = findDeviceId.users;

                    const includeCurrentUser = deviceUsers.includes(data._id);
                    //console.log(includeCurrentUser)

                    if(includeCurrentUser){

                        return res.status(403).json({ error:"User already configured this device!" });

                    }else{

                    // Only update the user
                    deviceUsers.push(data._id)
                    //console.log(findDeviceId.users)
                  
                    let userAppend = await Device.findOneAndUpdate( findDeviceId._id, {
                        users: deviceUsers,
                        updatedAt: Date.now(),
                    });

                    //if(userAppend){
                    //    return res.status(201).json({ messgae:"Device added successfully!" });
                    //}
                        
                    }

                    //create devices array from user
                    let userDevices = data.devices;
                    //userDevices.push(savedDevice._id)
                    const includeCurrentDevice = userDevices.includes(findDeviceId._id);

                    if(includeCurrentUser){

                        return res.status(403).json({ error:"User already configured this device!" });

                    }else{

                        userDevices.push(findDeviceId._id)

                        let deviceAppend = await User.findOneAndUpdate( data._id, {
                            devices: userDevices,
                            updatedAt: Date.now(),
                        });
    
                        //if(deviceAppend){
                        //    return res.status(201).json({ messgae:"Device added successfully!" });
                        //}

                    }


                    return res.status(201).json({ messgae:"Device added successfully!" });
                    
                    
                }


 
            }

        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }

    }


    async revoke(req, res) {

        let uId  = req.payload._id;
        let { deviceId } = req.body;

        if (!deviceId) {
            return res.status(403).json({ error:"Device Id must not be empty!" });
        }

        try {
            //check user
            const data = await User.findOne({ _id: uId });

            if (!data) {
                return res.status(404).json({ error:"User not found!" });
            }else{

                //console.log(deviceId)
                const findDeviceId = await Device.findOne({_id: deviceId});
                //console.log(findDeviceId)
                if (!findDeviceId) {
                    return res.status(403).json({ error:"You dont have access of this device!" });
                }else{
                    //create users array
                    let deviceUsers = findDeviceId.users;

                    const includeCurrentUser = deviceUsers.includes(data._id);
                    //console.log(includeCurrentUser)
                    if(includeCurrentUser){
                       // console.log(deviceUsers)
                        deviceUsers.pop(data._id)
                        //console.log(deviceUsers)

                        let userRemove = await Device.findOneAndUpdate( findDeviceId._id, {
                            users: deviceUsers,
                            updatedAt: Date.now(),
                        });
    
                        //create devices array from user
                        let userDevices = data.devices;

                        const includeCurrentDevice = userDevices.includes(findDeviceId._id);

                        if(includeCurrentUser){

                            userDevices.pop(findDeviceId._id)

                            let devicePop = await User.findOneAndUpdate( data._id, {
                                devices: userDevices,
                                updatedAt: Date.now(),
                            });

                        }

                        return res.status(201).json({ messgae:"Device revoked successfully!" });

                    }else{

                        return res.status(403).json({ error:"You dont have access of this device!" });
                    }
                }
                
            }
        
        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }
       

    }


    async update(req, res) {
        let uId  = req.payload._id;

        let { name, description, deviceId } = req.body;

        if (!deviceId) {
            return res.status(403).json({ error:"Device Id must not be empty!" });
        }

        if (!name) {
            return res.status(403).json({ error:"Device Name must not be empty!" });
        }

        try {

            let detailsChange = await Device.findByIdAndUpdate(deviceId, {
                name: name,
                description:description,
                updatedAt: Date.now(),
              });

            return res.status(200).json({ message:"Details changed successfully!" });

        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }
    }


    async list(req, res) {
        
        let uId  = req.payload._id;

        try {
            //check user
            const data = await User.findOne({ _id: uId });

            if (!data) {
                return res.status(404).json({ error:"User not found!" });
            }else{
                console.log(data.devices)
                const findDevices = await Device.find({_id : { $in : data.devices }});
                if(findDevices){
                    return res.status(200).json({ devices:findDevices });
                }else{
                    return res.status(403).json({ error:"No devices found with this device!" });
                }
            }

        }catch (err) {
            return res.status(500).json({ error:"Something went wrong!" });
        }
        
    }



}

const deviceController = new ApiDeviceController();
module.exports = deviceController;