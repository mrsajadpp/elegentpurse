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
    const userExist = await userCollection.findOne({ email: req.body.email, status: true });
    const userExistNotVerified = await userCollection.findOne({ email: req.body.email, status: false });
    if (!userExist) {
      if (userExistNotVerified) {
        // Generate 6-digit OTP
        let otp = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = crypash.hash('sha256', req.body.password);

        // Check if OTP expired
        if (userExistNotVerified && userExistNotVerified.otp_expiry && userExistNotVerified.otp_expiry > new Date()) {
          otp = Math.floor(100000 + Math.random() * 900000); // Generate new OTP
        }

        if (userExistNotVerified.otp_expiry > new Date()) {
          otp = userExistNotVerified.otp;
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

        await userCollection.updateOne({ email: req.body.email }, { $set: newUser });

        req.session.user = newUser;
        res.render('user/otp', { title: 'Verify OTP - Elegentpurse' })
      } else {
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = crypash.hash('sha256', req.body.password);

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
      }
    } else {
      res.render('user/login', { title: 'Login - Elegentpurse' })
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
