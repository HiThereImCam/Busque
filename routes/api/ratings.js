const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Rating = require("../../models/Rating");

router.get("/", (req, res) => {
  Rating.find()
    .then((rating) => res.json(rating))
    .catch((err) => res.json(err));

});

router.get("/:id", (req, res) => {
  Rating.findOne({ _id: req.params.id })
    .then((rating) => res.json(rating))
    .catch((err) => res.json(err));

});

router.post("/", (req, res) => {
  const newRating = new Rating({
    rating: req.body.rating,
  });

  newRating
    .save()
    .then((rating) => res.json(rating))
    .catch((err) => res.json(err));
});

router.delete(
  "/:id",
  
  (req, res) => {
    Rating.findByIdAndDelete(req.params.id, function (err, response) {
      if (err) {
        console.log(err);
        res.json({
          message: "Database Update Failure",
        });
      }
      console.log(`this is the response: ${response}`);
      return res.send(response);
    });
  }
); //end delete
module.exports = router;
