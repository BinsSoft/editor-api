const express = require('express')
const router = new express.Router()
const msgType = require('../config/messageType')
var request 		= require('request');

router.post('/github-accesstoken', async (req, res)=>{
    const options = {
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
       
        body: req.body,
        json: true  // JSON stringifies the body automatically
      }
    request(options, function(error, response){
        // let data = JSON.parse(response.body);
        if (response.body.access_token) {
            const userOption = {
                method :'GET',
                url : 'https://api.github.com/user',
                headers: {
                    Authorization: "Bearer  " + response.body.access_token
                },
            }
            request(userOption, function(error, userResponse){
                return res.status(200).send(msgType.send('U-0010', userResponse, true))
            });
        }
    });
});

module.exports = router

