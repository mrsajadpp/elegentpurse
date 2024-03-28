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


router.get('/', isAdmin, function (req, res, next) {
  try {
    res.render('admin/index', { title: 'Admin - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* GET users listing. */
router.get('/product', isAdmin, async function (req, res, next) {
  try {
    const prodCollection = db.get().collection('PRODUCT');
    const products = await prodCollection.find().toArray();
    res.render('admin/product', { title: 'Product - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true, auth: true, products })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Category Page
router.get('/category', isAdmin, async function (req, res, next) {
  try {
    const catCollection = db.get().collection('CATEGORY');
    const categories = await catCollection.find().toArray();
    console.log(categories);
    res.render('admin/category', { title: 'Category - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true, categories })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Add Category Page
router.get('/category/add', isAdmin, function (req, res, next) {
  try {
    res.render('admin/addcategory', { title: 'Add Category - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Add Product Page
router.get('/product/add', isAdmin, async function (req, res, next) {
  try {
    const catCollection = db.get().collection('CATEGORY');
    const categories = await catCollection.find().toArray();
    console.log(categories);
    res.render('admin/addproduct', { title: 'Add Product - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true, categories })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Orders Page
router.get('/orders', isAdmin, function (req, res, next) {
  try {
    res.render('admin/orders', { title: 'Orders - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET Customers Page
router.get('/customers', isAdmin, async function (req, res, next) {
  try {
    const userCollection = db.get().collection('USER');
    const users = await userCollection.find().toArray();
    res.render('admin/customers', { title: 'Customers - Elegentpurse', admin: req.session.user ? req.session.user.admin : false, user: req.session.user ? req.session.user : false, auth: true, users })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
