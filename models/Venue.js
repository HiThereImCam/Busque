const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  coordinate: {
    type: Array,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
    default: "https://busque-dev.s3-us-west-2.amazonaws.com/buskerlogo.jpg",
  },
  
  type: {
    type: String,
    required: true,
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],

  ratings: [
    {
      type: Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
});

module.exports = Venue = mongoose.model("Venue", VenueSchema);
