const userService = require('../services/user.service')

const _userService = new userService('users')


const getAll = async () => {
    return await _userService.getAll()
}

const getById = async (id) => {
    const user = await _userService.getById(id)
    return user
}

const createUser = async (user) => {    
    await _userService.create(user)
}

const editUser = async (user, id) => {
    const userUpdated = await _userService.update(user, id)
    return userUpdated
}

const deleteUser = async (id) => {
    const user = await _userService.delete(id)
    return user
}

module.exports = {
    getAll,
    getById,
    createUser,
    editUser,
    deleteUser    
}