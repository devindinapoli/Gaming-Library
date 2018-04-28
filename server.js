//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

const passport = require("passport");
require("./config/passport.js")(passport);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// Required for passport
app.use(passport.initialize());
app.use(passport.session());

require("./controllers/controller.js")(app, passport);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/VGDB";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
