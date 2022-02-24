const Joi = require('joi')

const ProductosSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    logo: Joi.string().required()
})

module.exports = ProductosSchema






