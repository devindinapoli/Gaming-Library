const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
    gameId: Number,
    platform: String,
    condition: String,
    Genre:  String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


const Game = mongoose.model("Game", GameSchema);



module.exports = Game;