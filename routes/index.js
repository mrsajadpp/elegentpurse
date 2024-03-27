var express = require('express');
let db = require('../db/config');

var router = express.Router();

const isNotAuthorised = (req, res, next) => {
  try {
    if (req.session.user) {
      if (req.session.user.status) {
        res.redirect('/');
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.error("Error:", err);
  }
} 

// GET Home Page
router.get('/', async function (req, res, next) {
  try {
    const catCollection = db.get().collection('CATEGORY');
    const categories = await catCollection.find().toArray();
    res.render('user/index', { title: 'Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, categories })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Product Page
router.get('/product/:prodId', async function (req, res, next) {
  try {
    res.render('user/product', { title: 'Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Loggin Page
router.get('/auth/login', isNotAuthorised, async function (req, res, next) {
  try {
    res.render('user/login', { title: 'Login - Elegentpurse', auth: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET SignUp Page
router.get('/auth/signup', isNotAuthorised, async function (req, res, next) {
  try {
    res.render('user/signup', { title: 'SignUp - Elegentpurse', auth: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
