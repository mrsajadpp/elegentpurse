var express = require('express');
let db = require('../db/config')

var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const userCollection = db.get().collection('USER');
    await userCollection.insertOne({ name: "Sajad" });
    res.json({ message: "User inserted successfully." });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
