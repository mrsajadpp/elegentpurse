var express = require('express');
let db = require('../db/config');

var router = express.Router();

// GET Home Page
router.get('/', async function (req, res, next) {
  try {
    res.render('user/index', { title: 'Elegentpurse', admin: false })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Product Page
router.get('/product/:prodId', async function (req, res, next) {
  try {
    res.render('user/product', { title: 'Elegentpurse' })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Loggin Page
router.get('/auth/login', async function (req, res, next) {
  try {
    res.render('user/login', { title: 'Login - Elegentpurse' })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET SignUp Page
router.get('/auth/signup', async function (req, res, next) {
  try {
    res.render('user/signup', { title: 'SignUp - Elegentpurse' })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET SignUp Address Page
router.get('/auth/signup/address', async function (req, res, next) {
  try {
    res.render('user/signup_two', { title: 'SignUp - Elegentpurse' })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
