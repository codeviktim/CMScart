const express = require("express");
const router = express.Router();

//Load Page Model
const Page = require("../../models/Page");

// @route   GET pages/test
// @desc    Tests pages route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Pages Works" }));

// @route   GET pages
// @desc    GET all pages
// @access  Public
router.get("/", (req, res) => {
  const errors = {};
  Page.find()
    .then(pages => {
      if (!pages) {
        errors.nopages = "Sorry,you have no page";
        return res.status(404).json(errors);
      }
      res.json(pages);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET /:slug
//@desc   Get a Page using its slug
//@access  Public
router.get("/:slug", (req, res) => {
  Page.findOne({ slug: req.params.slug })
    .then(page => {
      if (!page) {
        res.redirect("/");
      } else {
        res.json(page);
      }
    })
    .catch(err =>
      res.status(404).json({ pageslugnotfound: "The page slug not found" })
    );
});

module.exports = router;
