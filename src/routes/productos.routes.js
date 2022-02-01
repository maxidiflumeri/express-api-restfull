const { Router } = require('express')
const ProductosSchema = require('../models/producto.js')
const productos = require('../db/productos.js')

const router = Router()

router.get('/', (req, res, next) => {
    try {
        res.status(200).send(productos)
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.get('/:id', (req, res, next) => {
    try {
        const producto = productos.find(prod => prod.id == req.params.id)
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
            if (productos.length == 0) {
                producto.id = 1
            } else {
                producto.id = productos[productos.length - 1].id + 1
            }
            productos.push(producto)
            res.status(200).redirect('/productos')
        }
    } catch (error) {
        res.status(500).send({ mensaje: error.message })
    }
    next()
})

router.put('/:id', (req, res, next) => {
    try {
        const productoIndex = productos.findIndex(prod => prod.id == req.params.id)
        if (productoIndex == -1) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            const producto = {
                titulo: req.body.titulo,
                precio: req.body.precio,
                logo: req.body.logo
            }
            const { error } = ProductosSchema.validate(producto)
            if (error) {
                res.status(400).send({ mensaje: error.message })
            } else {
                productos[productoIndex].titulo = producto.titulo
                productos[productoIndex].precio = producto.precio
                productos[productoIndex].logo = producto.logo
                res.status(200).redirect('/productos')
            }
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.delete('/:id', (req, res, next) => {
    try {
        const productoIndex = productos.findIndex(prod => prod.id == req.params.id)        
        if (productoIndex == -1) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            productos.splice(productoIndex, 1)
            res.status(200).redirect('/productos')
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

module.exports = router