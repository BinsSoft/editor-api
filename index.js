const express = require('express')
require('dotenv').config({ path: __dirname + '/config/.env' })
require('./config/db')
var cors = require('cors')
//require('./router/index')
const userRoute = require('./router/users')
const snippetRoute = require('./router/snippet')
const githubAuthtRoute = require('./router/githubAuth')
const app = express()
const port = process.env.PORT || 3330
app.use(express.json())
app.use(cors())
app.use(userRoute)
app.use(snippetRoute)
app.use(githubAuthtRoute);
app.listen(port, () => {
    console.log('Server is up on ' + port)
})