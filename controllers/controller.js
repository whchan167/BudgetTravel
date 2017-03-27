//Dependencies
var express = require ('express');
var router = express.Router();

//link the Article database file to controller.js
var Travel = require('../models/Travel.js');
var User = require('../models/User.js');

//Main Route
router.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

module.exports = router;