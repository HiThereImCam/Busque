  const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  comments: {
    //todo check if comments/ratings need to be seperate for venues/users

    type: Schema.Types.ObjectId,
    ref: "comments",
  },
  ratings: {
    type: Schema.Types.ObjectId,
    ref: "ratings",
  },
});


module.exports = Venue = mongoose.model("Venue", VenueSchema);
