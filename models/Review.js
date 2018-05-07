const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    gameID: Number,
    platform: String,
    review: String
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;