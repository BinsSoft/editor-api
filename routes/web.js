var express 	     = require('express');
var router 	         = express.Router();
const apiPrefix      = '/api/1.0';

router.post(apiPrefix+"/signin",  global.controllers.AuthApiController.signin);
router.post(apiPrefix+"/signup",  global.controllers.AuthApiController.signUp);

router.post(apiPrefix+"/stack-manage",  global.controllers.StackApiController.save);
module.exports = router;