const { Router } = require('express')
const UserSchema = require('../models/user.js')
const userController = require('../controllers/user.controller.js')

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const users = await userController.getAll()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await userController.getById(req.params.id)
        if (!user) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.post('/', async (req, res, next) => {
    try {
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            alias: req.body.alias,
            avatar: req.body.avatar
        }
        const { error } = UserSchema.validate(user)
        if (error) {
            res.status(400).send({ mensaje: error.message })
        } else {            
            await userController.createUser(user)                
            res.status(200).send('Usuario creado!')
        }
    } catch (error) {
        res.status(500).send({ mensaje: error.message })
    }
    next()
})

router.put('/:id', (req, res, next) => {
    try {
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            alias: req.body.alias,
            avatar: req.body.avatar
        }        
        const { error } = UserSchema.validate(user)
        if (error) {
            res.status(400).send({ mensaje: error.message })
        } else {
            const userResult = userController.editUser(user, req.params.id)
            if (userResult == -1) {
                res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
            } else {                
                res.status(200).send('user updated!')
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

router.delete('/:id', async (req, res, next) => {
    try {
        const userDeleted = await userController.deleteUser(req.params.id)
        if (userDeleted == -1) {
            res.status(401).send({ mensaje: `No existe el producto con el id ${req.params.id}` })
        } else {
            res.status(200).send('User deleted!')
        }
    } catch (error) {
        res.status(500).send('Ups! hubo un problema! Volve a intentarlo mas tarde.')
    }
    next()
})

module.exports = router