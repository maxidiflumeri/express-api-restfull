const productdb = require('../db/productosdb')

class messagesService{

    constructor(tableName){
        this._tableName = tableName
    }

    async getAll(){
        const messages = await productdb(`${this._tableName}`).select('*')
        return messages
    }

    async create(message){
        const messageCreated = await productdb(`${this._tableName}`).insert(message)
        return messageCreated
    }

}

module.exports = messagesService