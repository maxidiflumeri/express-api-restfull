const express = require('express')
const routesProd = require('./routes/index.js')
const exphbs = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const morgan = require('morgan')
const productsServices = require('./services/product.service')
const messagesServices = require('./services/messages.service')
const _productServices = new productsServices('products')
const _messagesServices = new messagesServices('messages')

const PORT = 5000
const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', async function (socket) {
    console.log('Alguien se conecto');
    socket.on('new-message', async data => {
        console.log('nuevo mensaje', data)
        await _messagesServices.create(data)
        io.sockets.emit('mensajes', await _messagesServices.getAll())    
    });
    io.sockets.emit('mensajes', await _messagesServices.getAll())    
    io.sockets.emit('productos', await _productServices.getAll())    
});

app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', routesProd)
app.use(require('./routes/navigation.routes.js'))
app.engine('.hbs', exphbs.engine({
    defaulLayout: 'main',
    layoutDir: path.join(app.get('views'), '/layouts'),
    partialDir: path.join(app.get('views'), '/partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
