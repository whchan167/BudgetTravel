//Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.Promise = Promise

//requiring bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//serve static content for app from the "public" folder
app.use(express.static('./public'));

//import routes from controllers
var routes = require('./controllers/controller.js');
app.use("/", routes);

//setting up mongoose database
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/Travel";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});


//port listener
var PORT = process.env.PORT || 3010;
app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});