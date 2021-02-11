const mongoose = require("mongoose");
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
    default: "https://busque-dev.s3-us-west-2.amazonaws.com/buskerlogo.jpg",
  },
  venues: {
    type: Schema.Types.ObjectId,
    ref: "venues",
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
 
  liked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.email;
  return obj;
};

module.exports = User = mongoose.model("User", UserSchema);
