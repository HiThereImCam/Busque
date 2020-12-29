const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
const Venue = require("../../models/Venues");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the venue route ya bish" })
);

router.get("venues/:venue_id", (req, res) => {
  Venue.findbyId(req.params.id)
    .sort({ available: true })
    .then((venue) => res.json(venue))
    .catch((err) => res.status(404).json({ novenue: "Venue not available" }));
});

router.post("/", (req, res) => {
    const {errors, isValid} = validate
}

)

module.exports = router;
