var express = require('express');
var router = express.Router();
let db = require('../db/config');
let mongoose = require('mongoose');
const fs = require('fs');

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
router.post('/category/add', isAdmin, async function (req, res, next) {
  try {
    const catCollection = db.get().collection('CATEGORY');
    console.log(req.body);
    const newCat = {
      name: req.body.name,
      description: req.body.discription,
      timestamp: new Date()
    }
    await catCollection.insertOne(newCat);
    res.redirect('/admin/category')
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Add Product Api
router.post('/add', isAdmin, async function (req, res, next) {
  try {
    const prodCollection = db.get().collection('PRODUCT');
    console.log(req.body);
    const newProd = {
      name: req.body.name.toUpperCase(),
      short_des: req.body.short_des,
      description: req.body.discription,
      price: req.body.price,
      sale_price: req.body.sale_price,
      discount_percentage: req.body.discount_percentage,
      SKU: req.body.SKU,
      quantity: req.body.quantity,
      category: new mongoose.Types.ObjectId(req.body.category),
      status: req.body.status
    }

    let productA = await prodCollection.insertOne(newProd);

    const imagePath = `./public/images/${productA.insertedId}.jpeg`;
    let image = req.files.image;

    image.mv(imagePath, err => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log("Image saved successfully");
      res.redirect('/admin/product')
    });

  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
