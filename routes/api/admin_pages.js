const express = require("express");
const router = express.Router();
const auth = require("../../config/auth");
const isAdmin = auth.isAdmin;

//Load Page model
const Page = require("../../models/Page");

//Load Add Page Validation
const validateAddPageInput = require("../../validation/add_page");

// @route   GET api/admin/pages/test
// @desc    Tests Admin Pages route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "AdminPages Works" }));

//@route GET api/admin/pages
//@desc   Get a Page index
//@access  Private
router.get("/", isAdmin, (req, res) => {
  const errors = {};
  Page.find()
    .sort({ sorting: 1 })
    .then(pages => {
      if (!pages) {
        errors.nopages = "Admin has created no  pages";
        return res.status(404).json(errors);
      }
      res.json(pages);
    })
    .catch(err => res.status(404).json("Sorry, no admin pages"));
});

//@route POST api/admin/pages/add-page
//@desc   Add a Page
//@access  Private
router.post("/add-page", (req, res) => {
  const { errors, isValid } = validateAddPageInput(req.body);

  let title = req.body.title;
  let content = req.body.content;
  let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
  if (slug == "") slug = title.replace(/\s+/g, "-").toLowerCase();

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Check if Page slug exists already
  Page.findOne({ slug: slug }).then(page => {
    if (page) {
      errors.addpage = "Page slug exists already,choose another";
      return res.status(400).json(errors);
    } else {
      const newPage = new Page({
        title: title,
        slug: slug,
        content: content,
        sorting: 100
      });
      newPage
        .save()
        .then(page => {
          //Resort the pages
          Page.find({})
            .sort({ sorting: 1 })
            .then(pages => {
              req.app.locals.pages = pages;
              res.redirect("/");
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    }
  });
});

// Sort pages function
const sortPages = (ids, callback) => {
  let count = 0;
  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Page.findById(id).then(page => {
        if (page) {
          page.sorting = count;
          page
            .save()
            .then(page => {
              ++count;
              if (count >= ids.length) {
                callback();
              }
            })
            .catch(err => res.json(err));
        }
      });
    })(count);
  }
};

//@route POST api/admin/pages/reorder-pages
//@desc   Reoder the pages
//@access  Private
router.post("/reorder-pages", (req, res) => {
  let ids = req.body["id[]"];

  sortPages(ids, () => {
    Page.find({})
      .sort({ sorting: 1 })
      .then(pages => {
        req.app.locals.pages = pages;
      })
      .catch(err => res.json(err));
  });
});

//@route POST api/admin/pages/reorder-pages
//@desc   Reoder the pages
//@access  Private

module.exports = router;
