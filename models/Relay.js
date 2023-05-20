const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt')

const RelaySchema = new Schema({
    device:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Device' 
    },
    deviceId:{ 
      type: String,
      required: true, 
  },
    name: {
        type: String,
    },
    description: {
      type: String,
    },
  relayName: {
    type: String,
    required: true,
  },

  relayCode: {
    type: String,
    required: true,
  },

  status: {
    type: Boolean,
    default: false,
},
  
  schedules: [],
},
{
    timestamps: true,
})


const Relay = mongoose.model('relays', RelaySchema)
module.exports = Relay