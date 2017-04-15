var path = require("path");
var cheerio = require ("cheerio")
var request = require ("request")

//link the database models file to controller.js
var User = require("../models/User");
var Hotel = require("../models/hotel")

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

	app.get("/scrapeParis", function(req, res){
		 Parisscrape(function(resp){
			 res.json(resp);
		 });
	})

	//web scraping
	var Parisscrape = function(cb){
		 	var resultarray = [];

		 // Make a request for hotels info
  	request("https://www.hotels.com/search.do?resolved-location=CITY%3A504261%3AUNKNOWN%3AUNKNOWN&destination-id=504261&q-destination=Paris,%20France&q-check-in=2017-04-15&q-check-out=2017-04-22&q-rooms=1&q-room-0-adults=2&q-room-0-children=0", function(error, response, html) {
    
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

			//For each "title"
			$(".hotel-wrap").each(function(i, element){
					 
					var title = $(this).children(".description").children("h3").children("a").text().trim();
					var address = $(this).children(".description").children(".contact").children(".p-adr").text().trim();
					var image = $(this).children(".description").children(".image-and-details").children(".image").children().children("a").children(".use-bgimage").css("background-image");
					var price = $(this).children("pricing").children("price").children("a").children("span.old-price-cont").text("del");
					var imageNext = image.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
					
					var dataAdd = {
						title: title,
						address: address,
						image: imageNext,
						price: price
					}

					resultarray.push(dataAdd);
					
					 console.log(price)
			})
			cb(resultarray);
		})
	};


}
