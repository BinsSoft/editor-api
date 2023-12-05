'use strict';
const Schema = global.mongoose.Schema;
const table = 'users';
const schema = new Schema({},
	{strict:false }
  );
const model = global.mongoose.model(table, schema);
const Users = {

	saveUser: (user, callback) =>{
		// console.log(user);
		user = new model(user);
		user.save((err, user)=>{
			if (err) return console.error(err);
			callback(user)
		})
	},
	checkEmailExist : function(email, callback) {
		model.findOne({email:email})
		.exec()
		.then(function(data){
			callback(data);
		})
	},
	checkLogin : function(postData, callback) {
		model.findOne({email: postData.email, password: postData.password}).exec().then(function(data){
			if(data) {
				callback({status:true, user : data});
			} else {
				callback({status: false});
			}
		})
	},

	resetPassword : function(postData,callback)
	{
		model.update({ _id : new ObjectId(postData.id) }, {
            $set : {
              "password" : postData.password
            }
          }, {upsert: true}, (err,data)=>{
			callback(data);
		} )
	}
};

module.exports = Users;