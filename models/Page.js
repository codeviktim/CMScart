const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Page Schema
const PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  sorting: {
    type: Number
  }
});

module.exports = Page = mongoose.model("page", PageSchema);
