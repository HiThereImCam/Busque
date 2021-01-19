const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let PhotoSchema = new Schema(
  {
    description: { type: String },
    fileLink: { type: String },
    s3_key: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = Photo = mongoose.model("Photo", PhotoSchema);
