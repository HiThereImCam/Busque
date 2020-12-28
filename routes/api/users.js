const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
 const keys = require("../../config/keys");
const passport = require("passport");

router.get("/test", (req, res) => res.json({ msg: "This is the users route ya bish" }));



module.exports = router;
