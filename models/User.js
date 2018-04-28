const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  }
});

module.exports = mongoose.model("User", userSchema);
