var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var travelSchema = new Schema ({
  location: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
  }
});

var Travel = mongoose.model('Travel', travelSchema);
module.exports = Travel;