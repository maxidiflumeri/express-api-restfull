import {Router} from 'express'
import productosRouter from './productos.router.js'

const router = Router()

router.use('/productos', productosRouter)

export default router
