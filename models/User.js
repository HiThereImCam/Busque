const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  performerType: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  imageURL: {
    type: String,
    required: false,
  },
  venues: {
    type: Schema.Types.ObjectId,
    ref: "venues",
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
  date: {
    type: Date,
    default: Date.now,
  },
});


module.exports = User = mongoose.model("User", UserSchema);
