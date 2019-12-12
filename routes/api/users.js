const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../../models/User");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");

// @route   GET api/users / test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
// @desc    register New User
// @access  Public
router.post("/register", (req, res) => {
  //destructuring
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: 0
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
      res.redirect("/api/users/login");
    }
  });
});

//@route POST api/users/login
//@desc  User login route
//@access  Public
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/api/users/login"
  })(req, res, next);
});

//@route GET api/users/logout
//@desc    User logout route
//@access  Private
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/api/users/login");
});

//Get Current User
router.get("/current", (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});
module.exports = router;
