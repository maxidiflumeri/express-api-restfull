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

// const editProduct = (product, id) => {        
//     const productoIndex = productos.findIndex(prod => prod.id == id)
//     if (productoIndex == -1) {
//         return -1
//     } else {
//         productos[productoIndex].titulo = product.titulo
//         productos[productoIndex].precio = product.precio
//         productos[productoIndex].logo = product.logo
//         return productos[productoIndex]
//     }
// }

// const deleteProduct = (id) => {
//     const productoIndex = productos.findIndex(prod => prod.id == id)
//     if (productoIndex == -1) {
//         return -1
//     } else {
//         productos.splice(productoIndex, 1)
//         return 0
//     }
// }

module.exports = {
    getAll,
    getById,
    createProduct,
    // editProduct,
    // deleteProduct
}