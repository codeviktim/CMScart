const express = require("express");
const router = express.Router();
//const mkdirp = require("mkdirp");
//const fs = require("fs-extra");
const resizeImg = require("resize-img");
const auth = require("../../config/auth");
//const isAdmin = auth.isAdmin;

//Load Product && Category model
const Product = require("../../models/Product");
const Category = require("../../models/Category");

//@route  GET api/admin/products/test
// @desc  Tests api/admin/products route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "AdminPages Works" }));

// @route  GET admin/products
// @desc  Get all products
// @access  Private
router.get("/", (req, res) => {
  let count;
  Product.count().then(c => {
    count = c;
  });
  Product.find().then(products => {
    res.json(products);
    count = count;
  });
});

// @route  POST admin/products/add-product
// @desc  Add a product
// @access  Private
router.get("/add-product", (req, res) => {});

module.exports = router;
