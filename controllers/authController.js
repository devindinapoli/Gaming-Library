// Pass our dependcies as arguments
module.exports = function(express, app, passport) {
  app.get("/", function(req, res) {
    res.render("home");
  });

  // these routes require user to be logged in to access
  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile", { user: req.user });
  });

  app.get("/currentuser", function(req, res) {
    res.json(req.user);
  });



  //--------------Log in/out Routes----------------------------------//

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/",
      failureflash: true
    })
  );


  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/",
      failureflash: true
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
