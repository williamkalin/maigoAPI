const mongoose = require("mongoose");




var itemSchema = new mongoose.Schema({
   gender: String,
   type: String,
   name: String,
   imagename: String,
   price: String,
   color: String,
   material: String,
   fit: String,
   available: String,
   description: String
});

var Item = mongoose.model("Item", itemSchema);

module.exports = Item;