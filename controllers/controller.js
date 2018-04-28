// Dependencies
const express = require("express");
const path = require("path");
const db = require("../models");

var router = express.Router();

// HTML Routes
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
};

//API Routes
