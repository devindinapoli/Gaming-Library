// Dependencies
const express = require("express");
const path = require("path");
const db = require("../models");

var router = express.Router();

// app/routes.js
module.exports = function(app, passport, igdb, client) {
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile", { user: req.user });
  });

  app.get("/currentuser", function(req, res) {
    res.json(req.user);
  });

  //--------------Log in/out Routes----------------------------------//
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureflash: true
    })
  );

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/login",
      failureflash: true
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // User update routes-----------------------------------------------------//
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
  app.get("/search", function(req, res) {
    //currently this handles routes for searching games by title
    client
      .games(
        {
          limit: 12, // limit results for testing.
          offset: 0,
          order: "release_dates.date:desc",
          search: req.query.title
        },
        ["name", "first_release_date", "rating", "summary", "screenshots"]
      )
      .then(function(results) {
        res.json(results.body);
      });
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
