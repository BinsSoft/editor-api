const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const msgType = require('../config/messageType')
var request 		= require('request');
router.get('/authtoken', async (req, res) =>{
    const token = jwt.sign( { apiKey: 'BinsSoft'}, process.env.JWT_SECRET)
    res.send({'token' : token})
})

router.post('/users', auth.beforeLogin, async (req, res) =>{
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send(msgType.send('U-0001', "Account created successfully"))
    } catch (e) {
        let errors = [];
        if (e.errors) {
            // console.log(e.errors)
            let errorObj = Object.keys(e.errors);
            errors = errorObj.map((i)=>{
                return e.errors[i].properties.message;
            })
        }
        res.status(200).send(msgType.send('U-0002', e, false))
    }
})

router.post('/user/forgotPassword', auth.beforeLogin, async (req, res) =>{
    try {
        const user = await User.findByEmail(req.body.email)
        res.send(msgType.send('U-0011', user))
    } catch (e){
        return res.status(500).send(msgType.send('U-00012', e, false))
    }
})

router.post('/user/login', auth.beforeLogin, async (req, res) =>{
    try {
        const user = await User.findByCredential(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send(msgType.send('U-0003', {user, token}))
    } catch (e){
        console.log(e)
        return res.status(200).send(msgType.send('U-0004', e, false))
    }
})

router.get('/users/me', auth.afterLogin, async (req, res) => {
    await req.user.populate('snippet').execPopulate()
    console.log(req.user.snippet)
    res.status(500).send(msgType.send('U-0005', {user :req.user, snippets: req.user.snippet}))
})

router.post('/user/logout', auth.afterLogin, async(req, res) => {
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send(msgType.send('U-0006', 'User successfully logout!'))
    } catch(e) {
        return res.status(500).send(msgType.send('U-0007', e, false))
    }
})

router.patch('/user/me', auth.afterLogin, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isvalidoperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isvalidoperation) {
        return res.status(400).send(msgType.send('U-0008', 'Invalid Update', false))
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(msgType.send('U-0009', req.user))
    } catch(e) {
        return res.status(500).send(msgType.send('U-0010', e, false))
    }
})



module.exports = router