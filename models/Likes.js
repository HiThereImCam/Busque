const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  likerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  venueId: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
  },

  commentId: {
    type: Schema.Types.ObjectId,
    ref: "comments",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Likes = mongoose.model("Likes", LikeSchema);
