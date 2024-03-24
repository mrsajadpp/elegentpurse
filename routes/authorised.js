var express = require('express');
let db = require('../db/config')

var router = express.Router();

const isAuthorised = (req, res, next) => {
    try {
        const userCollection = db.get().collection('USER');
        if (!req.session.user) {
            res.redirect('/auth/login');
        } else {
            if (req.session.user.status) {
                next();
            } else {
                res.redirect('/auth/login');
            }
        }
    } catch (error) {

    }
}

// GET Cart Page
router.get('/cart', isAuthorised, async function (req, res, next) {
    try {
        res.render('user/cart', { title: 'Cart - Elegentpurse' })
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET Profile Page
router.get('/profile', isAuthorised, async function (req, res, next) {
    try {
        res.render('user/profile', { title: 'Profile - Elegentpurse' })
      } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal server error" });
      }
});


// GET Edit Profile Page
router.get('/profile/edit', isAuthorised, async function (req, res, next) {
    try {
        res.render('user/editprofile', { title: 'Edit Profile - Elegentpurse' })
      } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal server error" });
      }
});


// GET Profile Page
router.get('/checkout', isAuthorised, async function (req, res, next) {
    try {
        res.render('user/checkout', { title: 'Checkout - Elegentpurse' })
      } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal server error" });
      }
});

module.exports = router;