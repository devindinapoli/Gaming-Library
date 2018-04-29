// Dependencies
const express = require("express");
const path = require("path");
const db = require("../models");

var router = express.Router();

// app/routes.js
module.exports = function(app, passport) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/profile", isLoggedIn, function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile.html", {
        user: req.user
      })
    );
  });

  //--------------Log in/out Routes----------------------------------//
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.post( "/login",
    passport.authenticate("local", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/", // redirect back to the signup page if there is an error
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  app.get("/signIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
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
      })});
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

  //-----------Sign up----------------------------------------------//
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true
    }));

};


// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
