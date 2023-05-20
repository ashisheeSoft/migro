const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt')

const TypeSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

  relays: [
    { relayName: String, relayCode: String, status: Boolean }
  ],
  
},
{
    timestamps: true,
})


const Type = mongoose.model('types', TypeSchema)
module.exports = Type