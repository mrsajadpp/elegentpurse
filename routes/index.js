var express = require('express');
let db = require('../db/config');

db(process.env.MONGO_STRING, 'elegentpurse')

var router = express.Router(); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
