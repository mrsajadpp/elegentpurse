var express = require('express');
let connectToMongoDB = require('../db/config');

let db = connectToMongoDB(process.env.MONGO_STRING, 'elegentpurse');

var router = express.Router(); 

/* GET home page. */
router.get('/', async function(req, res, next) {
  await db.collection('USER').insertOne({ name: "Sajad" });
  res.json(db) 
});

module.exports = router;
