const productdb = require('./db/productosdb')

module.exports = productdb.schema.createTable('products', (table) => {
    table.increments('id'),
    table.string('title'),
    table.double('price'),
    table.string('logo')
}).then(()=> {
    console.log('tabla productos creada!')
})


module.exports = productdb.schema.createTable('messages', (table) => {
    table.increments('id'),
    table.string('name'),
    table.string('message')    
}).then(()=> {
    console.log('tabla mensajes creada!')
})