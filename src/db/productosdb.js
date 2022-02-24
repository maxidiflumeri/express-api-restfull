// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host : '127.0.0.1',
//       port : 3306,
//       user : 'root',
//       password : '',
//       database : 'productsdb'
//     }
// });

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './ecommerce.sqlite'
    },
    useNullAsDefault: true
});

module.exports = knex
