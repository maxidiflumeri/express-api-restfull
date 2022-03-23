const Joi = require('joi')

const UserSchema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    edad: Joi.number().required(),
    alias: Joi.string().required(),
    avatar: Joi.string().required()
})

module.exports = UserSchema