const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const mongoose = require("mongoose");
const Venue = require("../../models/Venues")

router.get("/test", (req, res) => res.json({ msg: "This is the venue route ya bish" }));



module.exports = router;
