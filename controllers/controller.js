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
			isAuthenticated,
			function(req, res){
		res.sendFile(path.join(__dirname, "../views/index.html"));
	});

	app.get('/user',function(req,res){
    User.find({},function(err,data){
    if(err){
        console.log("error in db")
    }else{
        res.json(data[0])
    	}
		})
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

	app.post("/scrapeParis", function(req, res){
		 scrapeParis(req.body.date1, req.body.date2, function(resp){
			 res.send(resp);
		 });
	})

	app.post("/scrapeOrlando", function(req, res){
		 scrapeOrlando(req.body.date1, req.body.date2, function(resp){
			 res.json(resp);
		 });
	})

	app.post("/scrapeLA", function(req, res){
		 scrapeLA(req.body.date1, req.body.date2, function(resp){
			 res.json(resp);
		 });
	})

	app.post("/yelp", function(req, res){
		 Yelp(req.body.address, req.body.price2, function(resp){
			 res.send(resp);
		 })
	})

	var Yelp = function(location, price, cb){
	var Yelp = require ('yelp-api-v3');
  	var yelp = new Yelp({
    app_id: 'ZnooBAC8I_XD2R4jQuL0fg',
    app_secret: '8zVJBnDgScPx7zYATPEz38NWAZNAmLuIXtHGBe9dSoZKPhwShUyPLBFyjffKEn8H'
	});
	yelp.search({term:'food', location: location, price: price, limit:15}).then(function(data){
		cb(data); 
	})
	}

	//web scraping to paris hotel data
	var scrapeParis = function(date1, date2, cb){
		 	var resultarray = [];
			var parisUrl = "https://www.hotels.com/search.do?resolved-location=CITY%3A504261%3AUNKNOWN%3AUNKNOWN&destination-id=504261&q-destination=Paris,%20France&q-check-in=" + date1 + "&q-check-out=" + date2 +"&q-rooms=1&q-room-0-adults=2&q-room-0-children=0";
		 // Make a request for hotels info
  	request(parisUrl, function(error, response, html) {
    
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

			//For each "title"
			$(".hotel-wrap").each(function(i, element){
					 
					var title = $(this).children(".description").children("h3").children("a").text().trim();
					var address = $(this).children(".description").children(".contact").children(".p-adr").text().trim();
					var image = $(this).children(".description").children(".image-and-details").children(".image").children().children("a").children(".use-bgimage").css("background-image");
					var price = $(this).children(".pricing").children(".price").text();
					var imageNext = image.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
					
					var dataAdd = {
						title: title,
						address: address,
						image: imageNext,
						price: price
					}

					resultarray.push(dataAdd);
					
			})
			cb(resultarray);
		})
	};

	var scrapeOrlando = function(date1, date2, cb){
		 	var resultarray = [];
			var orlandoUrl = "https://www.hotels.com/search.do?resolved-location=CITY%3A1404711%3AUNKNOWN%3AUNKNOWN&destination-id=1404711&q-destination=Orlando,%20Florida,%20United%20States%20of%20America&q-check-in=" + date1 + "&q-check-out=" + date2 + "&q-rooms=1&q-room-0-adults=2&q-room-0-children=0";
		 // Make a request for hotels info
  	request(orlandoUrl, function(error, response, html) {
    
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

			//For each "title"
			$(".hotel-wrap").each(function(i, element){
					 
					var title = $(this).children(".description").children("h3").children("a").text().trim();
					var address = $(this).children(".description").children(".contact").children(".p-adr").text().trim();
					var image = $(this).children(".description").children(".image-and-details").children(".image").children().children("a").children(".use-bgimage").css("background-image");
					var price = $(this).children(".pricing").children(".price").text();
					var imageNext = image.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
					
					var dataAdd = {
						title: title,
						address: address,
						image: imageNext,
						price: price
					}

					resultarray.push(dataAdd);
					
			})
			cb(resultarray);
		})
	};

	var scrapeLA = function(date1, date2, cb){
		 	var resultarray = [];
			var LAUrl = "https://www.hotels.com/search.do?resolved-location=CITY%3A1439028%3AUNKNOWN%3AUNKNOWN&destination-id=1439028&q-destination=Los%20Angeles,%20California,%20United%20States%20of%20America&q-check-in=" + date1 + "&q-check-out=" + date2 + "&q-rooms=1&q-room-0-adults=2&q-room-0-children=0";
		 // Make a request for hotels info
  	request(LAUrl, function(error, response, html) {
    
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);

			//For each "title"
			$(".hotel-wrap").each(function(i, element){
					 
					var title = $(this).children(".description").children("h3").children("a").text().trim();
					var address = $(this).children(".description").children(".contact").children(".p-adr").text().trim();
					var image = $(this).children(".description").children(".image-and-details").children(".image").children().children("a").children(".use-bgimage").css("background-image");
					var price = $(this).children(".pricing").children(".price").text();
					var imageNext = image.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
					
					var dataAdd = {
						title: title,
						address: address,
						image: imageNext,
						price: price
					}

					resultarray.push(dataAdd);
					
			})
			cb(resultarray);
		})
	};


}
