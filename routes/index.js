var express = require('express');
let db = require('../db/config')

var router = express.Router();

// GET Home Page
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

// GET Loggin Page
router.get('/auth/login', async function (req, res, next) {
  try {
    res.json({ message: "Login Page." });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET SignUp Page
router.get('/auth/signup', async function (req, res, next) {
  try {
    res.json({ message: "SignUp Page." });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
