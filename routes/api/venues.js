//! Would suggest placeholders for front end update/delete components

const express = require("express");
const router = express.Router();

const passport = require("passport");
const mongoose = require("mongoose");
const Venue = require("../../models/Venue");
const validateVenueInput = require("../../validations/venue");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the venue route ya bish" })
);

router.get("/:id", (req, res) => {
  //find venue by ID
  Venue.findById(req.params.id)

    .then((venue) => res.json(venue))
    .catch((err) => res.status(404).json({ novenue: "Venue not found" }));
});

router.post(
  //create venue
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVenueInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors); //union square long-122.4045 lat37.78616 long should be first
    }

    const newVenue = new Venue({
      name: req.body.name,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      type: req.body.type,
      available: req.body.available,
      user: req.user.id,
    });

    newVenue.save().then((venue) => res.json(venue));
  }
); //end post

//update venue
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVenueInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Venue.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        type: req.body.type,
        available: req.body.available,
      },
      { new: true },
      //error handling
      function (err, response) {
        if (err) {
          console.log("we hit an error" + err);
          res.json({
            message: "Database Update Failure",
          });
        }
        console.log("This is the Response: " + response);
        return res.send(response);
      }
    );
  }
); //end update

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Venue.findByIdAndDelete(req.params.id, function(err, response) {
      if (err) {
        console.log(err)
      res.json({
        message: "Database Update Failure",
      })
      } 
      console.log(`this is the response: ${response}`)
      return res.send(response);
    }
    );
  
  }

); //end delete

module.exports = router;
