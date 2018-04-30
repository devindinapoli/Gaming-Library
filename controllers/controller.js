// Dependencies
const express = require("express");
const path = require("path");
const db = require("../models");


var router = express.Router();

// app/routes.js
module.exports = function(app, passport, igdb, client) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  app.post("/submit", function(req, res) {
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/submitGame", function(req, res) {
    db.Game.create(req.body)
      .then(function(dbGame) {
        return db.User.findOneAndUpdate(
          {},
          { $push: { games: dbGame._id } },
          { new: true }
        );
      })
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/user", function(req, res) {
    db.User.find({})
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //-----------IGDB Routes----------------------------------------------//
    app.get("/search", function(req, res) { //currently this handles routes for searching games by title
        client.games({
            limit: 10, // limit results for testing.
            offset: 0,
            order: 'release_dates.date:desc',
            search: req.query.title    },[
            'name',
            'first_release_date',
            'rating',
            'summary'
        ]).then(function(results) {
            res.json( results.body);
        });
    
    });

};
