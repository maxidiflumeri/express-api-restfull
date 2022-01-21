import express from 'express'
import routes from './src/routes/index.js'

const PORT = 5000
const app = express()

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use('/api', routes)
app.use(express.static('public'))


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
