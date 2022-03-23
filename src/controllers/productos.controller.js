const productsServices = require('../services/product.service')

const _productServices = new productsServices('products')


const getAll = async () => {
    return await _productServices.getAll()
}

const getById = async (id) => {
    const producto = await _productServices.getById(id)
    return producto
}

const createProduct = async (product) => {
    await _productServices.create(product)
}

const editProduct = async (product, id) => {
    const productUpdated = await _productServices.update(product, id)
    return productUpdated
}

const deleteProduct = async (id) => {
    const producto = await _productServices.delete(id)
    return producto
}

const generateRandomProduct = async () => {
    const productos = await _productServices.generateRandomProducts()    
    return productos
}

module.exports = {
    getAll,
    getById,
    createProduct,
    editProduct,
    deleteProduct,
    generateRandomProduct
}