var express = require('express');
let connectToMongoDB = require('../db/config');

let db = connectToMongoDB(process.env.MONGO_STRING, 'elegentpurse');

var router = express.Router(); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(db) 
});

module.exports = router;
