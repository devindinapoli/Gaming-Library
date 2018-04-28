const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define the schema for our user model
const UserSchema = new Schema({
  local: {
    email: String,
    password: String
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
