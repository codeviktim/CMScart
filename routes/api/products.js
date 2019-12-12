const express = require("express");
const router = express.Router();
//const fs = require("fs-extra");

const auth = require("../../config/auth");
const isUser = auth.isUser;

//Load Product && Category Model
const Product = require("../../models/Product");
const Category = require("../../models/Category");

/// @route   GET api/products/test
// @desc    Tests products route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Products Works" }));

// @route   GET api/products
// @desc    Get all products available
// @access  Public
router.get("/", (req, res) => {
  const errors = {};
  Product.find()
    .then(products => {
      if (!products) {
        errors.noproducts = "Sorry, no available products";
        return res.status(404).json(errors);
      }
      res.json(products);
    })
    .catch(err =>
      res
        .status(404)
        .json({ products: "Sorry There are no products available" })
    );
});

// @route   GET api/products/:category
// @desc    Get Products by category
// @access  Public
router.get("/:category", (req, res) => {
  let categorySlug = req.params.category;

  Category.findOne({ slug: categorySlug }).then(category => {
    Product.find({ category: categorySlug }).then(product => {
      res.json(product);
    });
  });
});

// @route   GET api/products/:category/:product
// @desc    Get Product details
// @access  Public
router.get("/:category/:product", (req, res) => {
  let galleryImages = null;
  let loggedIn = req.isAuthenticated() ? true : false;

  Product.findOne({});
});

module.exports = router;
