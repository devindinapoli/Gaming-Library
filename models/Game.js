const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  gameId: Number,
  platform: String,
  condition: String,
  Genre: String,
  copies: Number,
  user: {
    type: String
  }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
