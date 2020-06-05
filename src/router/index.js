const express = require('express')
const userRoute = require('./users')
const app = express()
app.use(userRoute)
module.exports = userRoute;
