const path = require("path");
const passport = require("passport");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const venues = require("./routes/api/venues");
const venueComments = require("./routes/api/venueComments")
require("./config/passport")(passport);


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Busque"));
app.use("/api/users", users);
app.use("/api/venues", venues);
//app.use("api/venues/:venue_id", venueComments)
//app.use("api/users/:user_id/comments", userComments);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
