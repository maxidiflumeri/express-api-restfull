const productosController = require('../controllers/productos.controller.js')
const { Router } = require('express')

const router = Router()

router.get('/', async (req, res, next) => {
    try {        
        const productos = await productosController.generateRandomProduct()                
        res.status(200).send(productos)
    } catch (error) {        
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

module.exports = router