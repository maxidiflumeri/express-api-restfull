const {Router} = require('express')
const productosRouter = require('./productos.routes.js')
const usersRouter = require('./users.routes.js')
const productosTestRouter = require('./productos-test.routes.js')

const router = Router()

router.use('/productos', productosRouter)
router.use('/usuarios', usersRouter)
router.use('/productos-test', productosTestRouter)

module.exports = router
