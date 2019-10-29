const express = require('express');
const Item = require('../models/item');


var menRouter = express.Router();

//Route for getting all clothes of specific type for men


menRouter.get("/:slug", (req, res) => {

   if (req.params.slug === "men") {

      Item.find({ gender: "men" }).limit(10).exec((err, response) => {

         res.send(response);
      })

   } else {
      Item.find({ type: req.params.slug }, (err, response) => {

         res.send(response);

      })

   }

})

module.exports = menRouter;