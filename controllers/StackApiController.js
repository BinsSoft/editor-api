
const Atlas = require('../services/Atlas');
module.exports = {
    save : function(req, res) {
		var postData = req.body;

		if (postData._id) {
			Atlas.updateOne("stacks", {
				filter: {
					_id: {"$oid": postData._id}
				},
				update: {$set: {
						"title": postData.title,
						"description": postData.description,
						"body": postData.body,
						"updatedOn": new Date()
					}}}).then((stack)=>{
				if (stack.data) {
					res.send(global.config.app.send("AC-SU-0005","Update successful"));
				} else {
					res.send(global.config.app.send("AC-SU-0006",stack.data));
				}
			});
		} else {

			Atlas.insertOne("stacks", {document: postData}).then((stack)=>{
				if (stack.data) {
					res.send(global.config.app.send("AC-SU-0007",stack.data));
				} else {
					res.send(global.config.app.send("AC-SU-0008",stack.data));
				}
			});
		}
	}
}