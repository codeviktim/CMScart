const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
