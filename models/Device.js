const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt')

const DeviceSchema = new Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },

  deviceName: {
    type: String,
    required: true,
  },
  
  type:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Type' 
},
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
},
{
    timestamps: true,
})


const Device = mongoose.model('devices', DeviceSchema)
module.exports = Device