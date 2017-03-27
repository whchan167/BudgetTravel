var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema ({
  username: {
    type: String,
    unique: true,
  },
  password: {
  	type: String,
  	unique:true,
  },
  date: {
    type: Date,
  }
});

var User = mongoose.model('User', userSchema);
module.exports = User;