const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  console: {
    type: String,
    required: true,
    unique: false
  },
  releaseYear: {
    type: Number,
    required: true,
    unique: false
  },
  rating: {
    type: Number,
    required: true,
    unique: false
  },
  Summary: {
    type: String,
    required: false,
    unique: false
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
