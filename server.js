//Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require("passport");
var path = require('path');
var cheerio = require ("cheerio")
var request = require ("request")

mongoose.Promise = Promise

//requiring bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use("/node_modules", express.static('node_modules'));

//serve static content for app from the "public" and "views" folder
app.use(express.static(__dirname + '/public'));
app.set(express.static(__dirname + '/views'));

//using passport.js to authenticate the user to login the page
app.use(session({ secret: 'keep it safe',
				  saveUninitialized: true,
				  resave: true }));

app.use(passport.initialize());
app.use(passport.session());

//import routes from controllers
require('./config/passport')(passport);
require('./controllers/controller.js')(app, passport);

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
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});