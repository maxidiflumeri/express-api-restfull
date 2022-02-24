const { Router } = require('express')
const productsServices = require('../services/product.service')
const messagesServices = require('../services/messages.service')
const _productServices = new productsServices('products')
const _messagesServices = new messagesServices('messages')

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/productos', async (req, res) => {
    const productos = await _productServices.getAll()
    res.render('productos', { productos })
})

router.get('/nuevoProducto', async (req, res) => {
    const productos = await _productServices.getAll()
    const mensajes = await _messagesServices.getAll()
    res.render('nuevoProducto', { productos, mensajes })
})

router.get('/editarProducto/:id', async (req, res) => {
    const producto = await _productServices.getById(req.params.id)
    res.render('editarProducto', { producto: producto[0] })
})

module.exports = router
