const {Router} = require('express')
const productosRouter = require('./productos.routes.js')

const router = Router()

router.use('/productos', productosRouter)

module.exports = router
