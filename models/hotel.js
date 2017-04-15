var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
  title: {
    type: String,
    required:true,
    trim: true
  },
  address: {
    type: String,
    required:true,
    trim: true
  },
  image: {
    type: String,
    required:true,
    trim: true
  }
});

// Create the "News" model with the NewsSchema
var Hotel = mongoose.model('hotel', hotelSchema);

// export the model
module.exports = Hotel;