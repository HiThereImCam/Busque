const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: "venues",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  }
});

module.exports = Rating = mongoose.model("ratings", RatingSchema);
