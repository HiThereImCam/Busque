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
    min: 0,
    max: 5,
    required: true,
  }
});

module.exports = Rating = mongoose.model("rating", RatingSchema);
