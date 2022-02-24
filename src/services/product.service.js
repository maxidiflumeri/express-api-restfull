const productdb = require('../db/productosdb')

class productService{

    constructor(tableName){
        this._tableName = tableName
    }

    async getAll(){
        const products = await productdb(`${this._tableName}`).select('*')
        return products
    }

    async getById(id){
        const products = await productdb(`${this._tableName}`).select('*').where({id: id})
        return products
    }

    async create(product){
        const productCreated = await productdb(`${this._tableName}`).insert(product)
        return productCreated
    }

}

module.exports = productService