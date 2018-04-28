const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
