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

  type: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
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
});

VenueSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  return obj;
};

module.exports = Venue = mongoose.model("Venue", VenueSchema);
