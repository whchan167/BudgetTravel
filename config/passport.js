'use strict'
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var User = require('../models/User');
var configAuth = require('./auth');

module.exports = function(passport){
		passport.serializeUser(function(user, done){
			console.log("SERIALIZING");
			console.log(user.id);
			done(null, user.id);
		});

		passport.deserializeUser(function(user, done){
			console.log("DESERIALIZE");
			console.log(user);
			User.findById(user.id, function(err, user){
				done(err, user);
			});
		});

// For Authentication Purposes

	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {	
	  		User.findOne({'facebook.id': profile.id
			}).then(function(user){
			
			if(user){
				  	return done(null, user);
			} else {
				var newUser = new User();
				newUser.facebook.id = profile.id;
				newUser.facebook.Token = accessToken;
				newUser.facebook.name = profile.name
			  	
				newUser.save(function(err){
					if (err){
						console.log("error in facebook login");
					}
					return done(null, newUser);
				})
				}

				}).catch(function(err){
					return done(err);
			});
	    }
	));

	passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL
  	},
  	function(token, tokenSecret, profile, done) {
      		User.findOne({'google.id': profile.id
			}).then(function(user){
			if(user){
				  return done(null, user);
			} else {
			  var newUser = new User();
				newUser.google.id = profile.id;
				newUser.google.Token = token;
				newUser.google.name = profile.displayName;
			  	
				newUser.save(function(err){
					if (err){
						console.log("error in google login");
					}
					return done(null, newUser);
				})
				}

			}).catch(function(err){
					return done(err);
			});
	    }
	));
};