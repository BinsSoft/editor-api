const express = require('express')
const router = new express.Router()
const Snippet = require('../models/snippet')
const auth = require('../middleware/auth')
const msgType = require('../config/messageType')

router.post('/snippets', auth.afterLogin, async (req, res) =>{
    const snippet = new Snippet({
        ...req.body,
        user: req.user._id
    })
    try {
        await snippet.save()
        res.status(201).send(msgType.send('S-0001', snippet))
    } catch (e) {
        return res.status(400).send(msgType.send('S-0002', e, false))
    }
})

router.get('/snippets/:id', auth.afterLogin, async (req, res) =>{
    try {
        const snippet = await Snippet.findOne({'snippetId' : req.params.id})
        if(snippet.user != '') {
            await snippet.populate('user').execPopulate()
        }
        if(!snippet){
            return res.status(404).send(msgType.send('S-0005', e, false))
        }
        res.send(msgType.send('S-0003', snippet))
    } catch(error) {
        return res.status(500).send(msgType.send('S-0004', error, false))
    }
})


router.patch('/snippets/:id', auth.afterLogin, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'html', 'css', 'script', 'extended']
    const isvalidoperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isvalidoperation) {
        return res.status(400).send(msgType.send('S-0005', 'Invalid Update', false))
    }
    try {
        const snippet = await Snippet.findById(req.params.id)
        updates.forEach((update) => snippet[update] = req.body[update])
        await snippet.save()
        if(!snippet){
            return res.status(400).send(msgType.send('S-0006', 'Invalid Update', false))
        }
        res.send(msgType.send('S-0007', snippet))
    } catch(e) {
        console.log(e)
        res.status(500).send(msgType.send('S-0008', e, false))
    }
})

router.delete('/task/:id', auth.afterLogin, async (req, res) =>{
    try {
        const task = await Snippet.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch {
        res.status(500).send()
    }
})

module.exports = router