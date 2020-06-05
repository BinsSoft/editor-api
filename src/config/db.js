const mongoose = require('mongoose')
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_DATABASE
const authdb = (process.env.DB_AUTH_DATABASE || null)
const username = (process.env.DB_USER || null)
const password = (process.env.DB_PASSWORD || null)


if(process.env.DB_DRIVER && process.env.DB_DRIVER=='mongo' ) {
    var mongoConnectStr = "mongodb://";
    if(username != null) {
        mongoConnectStr += username;
    }
    if(password != null) {
        mongoConnectStr += ":"+password+"@";
    }
    mongoConnectStr += host + ":"+port+"/"+database;
    if (authdb != null){
        mongoConnectStr += '?authSource='+authdb;
    }
    console.log(mongoConnectStr);
    mongoose.connect(mongoConnectStr,{ useNewUrlParser: true, useUnifiedTopology :true}, (err)=> {
        console.log("3) Mongo db server starts")
    });
}
		