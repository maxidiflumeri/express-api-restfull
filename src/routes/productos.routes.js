const { Router } = require('express')
const ProductosSchema = require('../models/producto.js')
const productosController = require('../controllers/productos.controller.js')

const router = Router()

router.get('/', (req, res, next) => {
    try {
        const productos = productosController.getAll()
        res.status(200).send(productos)
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.get('/:id', (req, res, next) => {
    try {
        const producto = productosController.getById(req.params.id)
        if (producto == undefined) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            res.status(200).send(producto)
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.post('/', (req, res, next) => {
    try {
        const producto = {
            titulo: req.body.titulo,
            precio: req.body.precio,
            logo: req.body.logo
        }
        const { error } = ProductosSchema.validate(producto)
        if (error) {
            res.status(400).send({ mensaje: error.message })
        } else {
            productosController.createProduct(producto)
            res.status(200).redirect('/nuevoProducto')
        }
    } catch (error) {
        res.status(500).send({ mensaje: error.message })
    }
    next()
})

router.put('/:id', (req, res, next) => {
    try {
        const producto = {
            titulo: req.body.titulo,
            precio: req.body.precio,
            logo: req.body.logo
        }
        const { error } = ProductosSchema.validate(producto)
        if (error) {
            res.status(400).send({ mensaje: error.message })
        } else {
            const productResult = productosController.editProduct(producto, req.params.id)            
            if (productResult == -1) {
                res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
            } else {
                res.status(200).redirect('/productos')
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.delete('/:id', (req, res, next) => {
    try {
        const producto = productosController.deleteProduct(req.params.id)
        if (producto == -1) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            res.status(200).redirect('/nuevoProducto')
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

module.exports = router