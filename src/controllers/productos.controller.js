const productos = require('../db/productos.js')

const getAll = () => {
    return productos
}

const getById = (id) => {
    const producto = productos.find(prod => prod.id == id)
    return producto
}

const createProduct = (product) => {
    if (productos.length == 0) {
        product.id = 1
    } else {
        product.id = productos[productos.length - 1].id + 1
    }
    productos.push(product)
}

const editProduct = (product, id) => {        
    const productoIndex = productos.findIndex(prod => prod.id == id)
    if (productoIndex == -1) {
        return -1
    } else {
        productos[productoIndex].titulo = product.titulo
        productos[productoIndex].precio = product.precio
        productos[productoIndex].logo = product.logo
        return productos[productoIndex]
    }
}

const deleteProduct = (id) => {
    const productoIndex = productos.findIndex(prod => prod.id == id)
    if (productoIndex == -1) {
        return -1
    } else {
        productos.splice(productoIndex, 1)
        return 0
    }
}

module.exports = {
    getAll,
    getById,
    createProduct,
    editProduct,
    deleteProduct
}