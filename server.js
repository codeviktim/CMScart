const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const ssAuth = require("./config/session_auth");

//Load All Routes
const users = require("./routes/api/users");
const pages = require("./routes/api/pages");
const adminPages = require("./routes/api/admin_pages");
const products = require("./routes/api/products");
const adminProducts = require("./routes/api/admin_products");
//const adminCategories = require('./routes/admin_categories.js');
//const cart = require('./routes/cart.js');

//init app
const app = express();

//Passport Config
require("./config/passport")(passport);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Express session Middleware
const IN_PROD = process.env.NODE_ENV === "production";

app.use(
  session({
    name: ssAuth.SESS_NAME,
    secret: ssAuth.SESS_SECRET,
    resave: ssAuth,
    saveUninitialized: false,
    cookie: {
      //default HTTP only
      maxAge: ssAuth.SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    }
  })
);

//Use Routes Middleware
app.use("/", pages);
app.use("/api/users", users);
app.use("/api/admin/pages", adminPages);
app.use("/api/products", products);
app.use("api/admin/products", adminProducts);
//app.use("/admin/categories", adminCategories);
//app.use("/cart", cart);
//Connect mongoose to mongoDB

mongoose
  .connect("mongodb://localhost/cmscart", { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(function(req, res, next) {
  res.locals.message = require("express-messages")(req, res);
  next();
});

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    res.locals.user = req.user || null;
    res.locals.cart = req.session.cart;
    next();
  });
}

//Server Port Configuration
const port = process.env.PORT || 5000;

//Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
