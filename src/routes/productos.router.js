import { Router } from 'express'
import ProductosSchema from '../models/producto.js'

const productos = []

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
        const { error } = ProductosSchema.validate(req.body)
        if (error) {
            res.status(400).send({ mensaje: error.message })
        } else {
            if (productos.length == 0) {
                req.body.id = 1
            } else {
                req.body.id = productos[productos.length - 1].id + 1
            }
            productos.push(req.body)
            res.status(200).send(req.body)
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
            const { error } = ProductosSchema.validate(req.body)
            if (error) {
                res.status(400).send({ mensaje: error.message })
            } else {
                productos[productoIndex].titulo = req.body.titulo
                productos[productoIndex].precio = req.body.precio
                productos[productoIndex].logo = req.body.logo
                res.status(200).send(productos[productoIndex])
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
        console.log(productoIndex)
        if (productoIndex == -1) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            let productoDel = productos.splice(productoIndex, 1)
            res.status(200).send(productoDel)
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

export default router