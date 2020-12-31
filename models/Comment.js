const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: "venues",
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
