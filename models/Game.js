const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
    unique: false
  },
  summary: {
    type: String,
    required: false,
    unique: false
  },
  cover: {
    type: String,
    required: false,
    unique: false
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
