const express = require('express');
const Item = require('../models/item');

var womenRouter = express.Router();

//Route for getting all clothes of specific type for men

womenRouter.get("/:slug", (req, res) => {

   if (req.params.slug === "women") {

      Item.find({ gender: "women" }).limit(10).exec((err, response) => {

         res.send(response);
      })

   } else {

      Item.find({ type: req.params.slug }, (err, response) => {

         res.send(response);

      })

   }

})

module.exports = womenRouter;