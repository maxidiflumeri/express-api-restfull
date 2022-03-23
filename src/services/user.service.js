const productdb = require('../db/productosdb')

class UserService {

    constructor(tableName) {
        this._tableName = tableName
    }

    async getById(id) {
        const user = await productdb(`${this._tableName}`).select('*').where({ id: id })
        return user
    }

    async getAll() {
        const users = await productdb(`${this._tableName}`).select('*')
        return users
    }

    async create(user) {
        const userCreated = await productdb(`${this._tableName}`).insert(user)
        return userCreated
    }

    async delete(id) {
        const userDeleted = await productdb(`${this._tableName}`).where('id', id).del()
        return userDeleted
    }

}

module.exports = UserService