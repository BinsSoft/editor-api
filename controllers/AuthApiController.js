
const Atlas = require('../services/Atlas');
module.exports = {
    signUp : function(req, res) {
		var postData = req.body;
		const user = Atlas.findOne("users",{filter: {email:postData.email}});
		user.then((data)=>{
			if (data.data.document) {
				res.send(global.config.app.send("AC-SU-0001","Email Already exists." , false));
			} else {
				Atlas.insertOne("users", {document: postData});
				res.send(global.config.app.send("AC-SU-0002",  "Success"));
			}
		});
	},
	signin : function(req, res) {
        var postData = req.body;
		const user = Atlas.findOne("users", {filter: {email:postData.email, password: postData.password}});
		user.then((data)=>{
			if (data.data.document) {
				res.send(global.config.app.send("AC-SU-0003", data.data.document));
			} else {
				res.send(global.config.app.send("AC-SU-0004",  "Login failed: check username and password", false));
			}
		});
	},
	resetPassword : function(req, res) {
		global.models.users.resetPassword(req.body, (responsedata)=>{
			res.send({status:true});
		})
	}
}