const express 		= require('express');
global.app 			= express();
const http 			= require('http').Server(global.app);
global.mongo 		= require('mongodb');
global.mongoose 	= require('mongoose');

global.request        = require('request');

const  cors = require('cors')

global.fs 			= require("fs");
global.bodyParser 	= require('body-parser');

require('dotenv').config();
global.app.use( global.bodyParser.json({limit: '50mb'}) );

global.app.use(cors());
global.systems = require('./systems');

global.app.set('port', (process.env.PORT || 3000));
http.listen(global.app.get('port'), function(){
  console.log("1) Api App Server starts");
  console.log("2) It is running with port " + global.app.get('port'));
});
