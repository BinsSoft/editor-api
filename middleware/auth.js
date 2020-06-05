const jwt = require('jsonwebtoken')
const User = require('../models/users')
const msgType = require('../config/messageType')

var auth = {
    beforeLogin : async (req, res, next) =>{
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded  = jwt.verify(token, process.env.JWT_SECRET)
            if(decoded.apiKey == 'BinsSoft') {
                req.token = token
            } else {
                throw new Error()
            }
            next()
        } catch(e) {
            res.status(401).send(msgType.send('AUTH-0001', 'Please authenticate', false))
        }
    },

    afterLogin : async (req, res, next) =>{
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded  = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({_id: decoded._id, 'tokens.token' : token})

            if(!user){
                throw new Error()
            }
            req.token = token
            req.user = user
            next()
        } catch(e) {
            res.status(401).send(msgType.send('AUTH-0002', 'Please authenticate', false))
        }
    }
}
module.exports = auth