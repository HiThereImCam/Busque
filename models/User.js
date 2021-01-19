const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// var imgPath = '/path/to/some/img.png';

// mongoose.connect('localhost', 'testing_storeImg');

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
    type: Schema.Types.ObjectId,
    ref: "comments",
  },
  ratings: {
    type: Schema.Types.ObjectId,
    ref: "ratings",
  },
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
<<<<<<< HEAD
=======

>>>>>>> 10c0c386c0e7e02f3d6d5cfdb3f105390c474007
  delete obj.email;
  return obj;
  
};

module.exports = User = mongoose.model("User", UserSchema);
