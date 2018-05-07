const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

// define the schema for our user model
const UserSchema = new Schema({
  local: {
    email: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  name: {
    type: String,
    required: false,
    unique: false
  },
  game: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }]
});

// Methods
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
