const express = require('express');
const fs = require("fs");
const http = require("http");
const AWS = require("aws-sdk");
const uuid = require("uuid");
const mongoose = require("mongoose")
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
  timestamps: true,
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.email;
  return obj;
  
};

module.exports = User = mongoose.model("User", UserSchema); 