var mongoose = require('mongoose');
const Store = require('./store-model');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

	// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
  password: {
		type: String
	},
	enrolled: [{type: Schema.Types.ObjectId, ref: 'Store'}]
});

var User = module.exports = mongoose.model('User', UserSchema);

//create user and encrypt password
module.exports.createUser = function(newUser, callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}
//get user by their mail (useful to avoid same emails)
module.exports.getUserByMail = function(email, callback) {
  var query = {email: email};
  User.findOne(query, callback);
}
//get user by id
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}
//compare input password with encrypted password
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
