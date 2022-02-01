const { Router } = require('express')
const productos = require('../db/productos.js')

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/productos', (req, res) => {    
    res.render('productos', { productos })
})

router.get('/nuevoProducto', (req, res) => {
    res.render('nuevoProducto')
})

router.get('/editarProducto/:id', (req, res) => {
    const productoIndex = productos.findIndex(prod => prod.id == req.params.id)
    const producto = productos[productoIndex]
    res.render('editarProducto', { producto })
})

module.exports = router

