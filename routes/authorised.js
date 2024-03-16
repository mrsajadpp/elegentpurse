var express = require('express');
let db = require('../db/config')

var router = express.Router();

const isAuthorised = (req, res, next) => {
    try {
        const userCollection = db.get().collection('USER');
        if (!req.session.user) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    } catch (error) {

    }
}

// GET Cart Page
router.get('/cart', isAuthorised, async function (req, res, next) {
    try {
        res.json({ message: "Cart Page" });
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;