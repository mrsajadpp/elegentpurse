var express = require('express');
const crypash = require('crypash');
var router = express.Router();
let db = require('../db/config');
let mail = require('../mail/config');

router.post('/auth/login', async function (req, res, next) {
  try {
    const userCollection = db.get().collection('USER');
    const userExist = await userCollection.findOne({ email: req.body.email, status: true });

    if (userExist) {
      let isCorrect = await crypash.check('sha256', req.body.password, userExist.password);
      if (isCorrect) {
        req.session.user = userExist;
        res.redirect('/');
      } else {
        res.redirect('/auth/login');
      }
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/auth/signup', async function (req, res, next) {
  try {
    const userCollection = db.get().collection('USER');
    const userExist = req.body.email ? await userCollection.findOne({ email: req.body.email, status: true }) : req.session.user;
    const userExistNotVerified = await userCollection.findOne({ email: req.body.email, status: false });
    if (!req.body.otp) {
      if (!userExist) {
        if (userExistNotVerified) {
          // Generate 6-digit OTP
          let otp = Math.floor(100000 + Math.random() * 900000);
          const hashedPassword = await crypash.hash('sha256', req.body.password);

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

          await mail.sendMail({
            from: '"Elegentpurse" <thintryin@gmail.com>',
            to: newUser.email,
            subject: "Your OTP for Elegentpurse",
            text: "Hello " + newUser.first_name + ",\n\nYour OTP for Elegentpurse is: " + newUser.otp + "\n\nThis OTP is valid for 5 minutes.\n\nIf you didn't request this OTP, please ignore this email.\n\nBest regards,\nThe Elegentpurse Team",
            html: "<p>Hello " + newUser.first_name + ",</p><p>Your OTP for Elegentpurse is: <strong>" + newUser.otp + "</strong></p><p>This OTP is valid for 5 minutes.</p><p>If you didn't request this OTP, please ignore this email.</p><p>Best regards,<br/>The Elegentpurse Team</p>"
          });

          await userCollection.updateOne({ email: req.body.email }, { $set: newUser });

          console.log(newUser);
          req.session.user = newUser;
          res.render('user/otp', { title: 'Verify OTP - Elegentpurse' })
        } else {
          // Generate 6-digit OTP
          const otp = Math.floor(100000 + Math.random() * 900000);
          const hashedPassword = await crypash.hash('sha256', req.body.password);

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

          await mail.sendMail({
            from: '"Elegentpurse" <thintryin@gmail.com>',
            to: newUser.email,
            subject: "Your OTP for Elegentpurse",
            text: "Hello " + newUser.first_name + ",\n\nYour OTP for Elegentpurse is: " + newUser.otp + "\n\nThis OTP is valid for 5 minutes.\n\nIf you didn't request this OTP, please ignore this email.\n\nBest regards,\nThe Elegentpurse Team",
            html: "<p>Hello " + newUser.first_name + ",</p><p>Your OTP for Elegentpurse is: <strong>" + newUser.otp + "</strong></p><p>This OTP is valid for 5 minutes.</p><p>If you didn't request this OTP, please ignore this email.</p><p>Best regards,<br/>The Elegentpurse Team</p>"
          });

          await userCollection.insertOne(newUser);

          console.log(newUser);

          req.session.user = newUser;
          res.render('user/otp', { title: 'Verify OTP - Elegentpurse' })
        }
      } else {
        res.render('user/login', { title: 'Login - Elegentpurse' })
      }
    } else {
      if (userExist && req.body.otp == userExist.otp) {
        // Create new user document
        const newUser = {
          first_name: userExist.first_name,
          last_name: userExist.last_name,
          email: userExist.email,
          phone: userExist.phone,
          password: userExist.password,
          status: true,
          timestamp: new Date()
        };

        await await userCollection.updateOne({ email: userExist.email }, { $set: newUser });

        req.session.user = newUser;
        res.redirect('/');
      }
    }
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
