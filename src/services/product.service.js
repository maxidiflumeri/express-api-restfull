const productdb = require('../db/productosdb')
const { faker } = require('@faker-js/faker')

class productService {

    constructor(tableName) {
        this._tableName = tableName
    }

    async getAll() {
        const products = await productdb(`${this._tableName}`).select('*')
        return products
    }

    async getById(id) {
        const products = await productdb(`${this._tableName}`).select('*').where({ id: id })
        return products
    }

    async create(product) {
        const productCreated = await productdb(`${this._tableName}`).insert(product)
        return productCreated
    }

    async delete(id) {
        const productDeleted = await productdb(`${this._tableName}`).where('id', id).del()
        return productDeleted
    }

    async update(product, id) {
        const productUpdated = await productdb(`${this._tableName}`).where({ id: id }).update(product)
        return productUpdated
    }

    async generateRandomProducts() {
        try {
            return new Promise((resolve, reject) => {
                let productos = []
                for (let index = 0; index < 5; index++) {
                    const producto = {
                        id: faker.random.number(),
                        title: faker.commerce.product(),
                        price: faker.commerce.price(),
                        logo: faker.image.food()
                    }
                    productos.push(producto)
                }
                resolve(productos)                
            })
        } catch (error) {            
            reject(error.message)
        }
    }
}

module.exports = productService