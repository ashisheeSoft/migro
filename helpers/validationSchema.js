const Joi = require('joi')

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  mobile: Joi.number().required(),
  password: Joi.string().min(8).required(),
})
/*
const loginSchema = Joi.object({
  mobile: Joi.number().required(),
  password: Joi.string().min(8).required(),
})

const mobileOtpVerifySchema = Joi.object({
  mobileOtp: Joi.number().required(),
})

const deviceRegistrationSchema = Joi.object({
  deviceId: Joi.string().required(),
  deviceName: Joi.string().required(),
  userId: Joi.string().required(),
  type: Joi.string().required()
})

const switchUpdateSchema = Joi.object({
  deviceId: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().required()
})
*/

module.exports = {
    registerSchema,
  //loginSchema,
  //mobileOtpVerifySchema,
  //deviceRegistrationSchema,
  //switchUpdateSchema
}