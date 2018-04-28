var LocalStrategy = require("passport-local").Strategy;

// load up the user model
var User = require("../models/User");

// expose this function to our app using module.exports
module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        User.findOne({ "local.email": email }, function(err, user) {
          // if there are any errors, return the error
          if (err) return done(err);

          // check to see if theres already a user with that email
          if (user) {
            return done(
              null,
              false,
              req.flash("signupMessage", "That email is already taken.")
            );
          } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model

            // save the user
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // callback with email and password from our form

        User.findOne({ "local.email": email }, function(err, user) {
          // if there are any errors, return the error before anything else
          if (err) return done(err);
          if (!user)
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            ); // req.flash is the way to set flashdata using connect-flash

          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            ); // create the loginMessage and save it to session as flashdata

          return done(null, user);
        });
      }
    )
  );
};
