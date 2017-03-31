var path = require("path");

//link the database models file to controller.js
var User = require("../models/User");

//Main Route
module.exports = function(app, passport){
  app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "../views/main.html"));

  app.get("/signup", function(req, res) {
    	res.sendFile(path.join(__dirname, "../views/signup.html"));
  	});
});
}
