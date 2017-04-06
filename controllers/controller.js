var path = require("path");

//link the database models file to controller.js
var User = require("../models/User");

//create method to authenticate the datapage
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	  }
      res.redirect('/')
  }

//Main Route
module.exports = function(app, passport){
  app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "../views/main.html"));
	});

  app.get('/index',
			//isAuthenticated,
			function(req, res){
		res.sendFile(path.join(__dirname, "../views/index.html"));
	});


  //facebook authenticate request
	app.get('/login/facebook', passport.authenticate('facebook'));

	app.get('/login/facebook/return',
	  		passport.authenticate('facebook',
	  		  { failureRedirect: '/' }), function(req, res){
	  			res.sendFile(path.join(__dirname, "../views/index.html"));
	  		});

	//google authenticate request
	app.get('/auth/google', passport.authenticate('google',  {scope: 'https://www.googleapis.com/auth/plus.login'}
		));

	app.get('/auth/google/callback',
	  		passport.authenticate('google',
	  		  { failureRedirect: '/' }), function(req, res){
	  			res.sendFile(path.join(__dirname, "../views/index.html"));
	  		});

	//logout
	app.get('/logout', function(req, res){
		req.logout();
		req.session.destroy();
		res.redirect('/');
	});

}
