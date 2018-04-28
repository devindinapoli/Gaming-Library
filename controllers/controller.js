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

  app.get("/signIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signIn.html"));
  });

  app.get("/profile", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile.html", {
        user: req.user
      })
    );
  });

  // process the signup form
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/", // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get("/profile", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../public/profile.html", {
        user: req.user
      })
    );
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
