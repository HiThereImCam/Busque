const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
    type: Schema.Types.ObjectId,
    ref: "comments",
  },
  ratings: {
    type: Schema.Types.ObjectId,
    ref: "ratings",
  },
});

module.exports = Venue = mongoose.model("Venue", VenueSchema);
