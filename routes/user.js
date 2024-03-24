var express = require('express');
const crypash = require('crypash');
var router = express.Router();
let db = require('../db/config');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth/signup', async function (req, res, next) {
  try {
    const userCollection = db.get().collection('USER');
    const userExist = userCollection.findOne({ email: req.body.email, status: true });

    if (!userExist) {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      const hashedPassword = crypash.hash('sha256', req.body.password);

      // Check if OTP expired
      if (userExist && userExist.otp_expiry && userExist.otp_expiry > new Date()) {
        otp = Math.floor(100000 + Math.random() * 900000); // Generate new OTP
      }

      if (userExist.otp_expiry > new Date()) {
        otp = userExist.otp;
      }

      // Create new user document
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        status: false,
        otp: otp,
        otp_expiry: new Date(Date.now() + 5 * 60 * 1000) // OTP expiry after 5 minutes
      };

      await userCollection.insertOne(newUser);

      req.session.user = newUser;
      res.render('user/otp', { title: 'Verify OTP - Elegentpurse' })
    } else {
      res.render('user/login', { title: 'Login - Elegentpurse' })
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
