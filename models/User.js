var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
	facebook: {
		id: String,
		token: String,
		name: String
	},
	google: {
		id: String,
		token: String,	
		name: String
	}
});


module.exports = mongoose.model('User', userSchema);