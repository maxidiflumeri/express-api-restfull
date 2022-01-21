import Joi from 'joi'

const ProductosSchema = Joi.object({
    titulo: Joi.string().required(),
    precio: Joi.number().required(),
    logo: Joi.string().required()
})

export default ProductosSchema






