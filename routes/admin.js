var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  try {
    res.render('admin/index', { title: 'Admin - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* GET users listing. */
router.get('/product', function (req, res, next) {
  try {
    res.render('admin/product', { title: 'Product - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Category Page
router.get('/category', function (req, res, next) {
  try {
    res.render('admin/category', { title: 'Category - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Add Category Page
router.get('/category/add', function (req, res, next) {
  try {
    res.render('admin/addcategory', { title: 'Add Category - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET Add Product Page
router.get('/product/add', function (req, res, next) {
  try {
    res.render('admin/addproduct', { title: 'Product - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
  
// GET Orders Page
router.get('/orders', function (req, res, next) {
  try {
    res.render('admin/orders', { title: 'Orders - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET Customers Page
router.get('/customers', function (req, res, next) {
  try {
    res.render('admin/customers', { title: 'Customers - Elegentpurse', admin: true })
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
