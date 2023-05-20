const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  mobileVerified: {
    type: Boolean,
    default: false,
  },
  active: {
      type: Boolean,
      default: false,
  },
  mobileOtp: {
    type: String,
    required: true,
  },
  emailOtp: {
    type: String,
    required: true,
  },
  userRole: {
    type: Number,
    required: true,
  },
  devices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device"
    }
  ],
  mobileOtpTime : { type : Date, default: Date.now },
  emailOtpTime : { type : Date, default: Date.now },
},
{
    timestamps: true,
})

/*

UserSchema.pre('save', async function (next) {
  try {

    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

*/

const User = mongoose.model('users', UserSchema)
module.exports = User