var express = require('express');
var router = express.Router();
let db = require('../db/config');

const isAdmin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/auth/login');
  } else {
    if (!req.session.user.admin) {
      res.redirect('/');
    } else {
      next();
    }
  }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// GET Add Category Api
router.post('/category/add', isAdmin, function (req, res, next) {
  try {
    
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
