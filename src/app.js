const express = require('express')
require('dotenv').config({path: __dirname+'/config/.env'})
require('./config/db')
//require('./router/index')
const userRoute = require('./router/users')
const snippetRoute = require('./router/snippet')

const app = express()
const port= process.env.PORT || 3330
app.use(express.json())
app.use(userRoute)
app.use(snippetRoute)

app.listen(port, () =>{
    console.log('Server is up on '+port)
})