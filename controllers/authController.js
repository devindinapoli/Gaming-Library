// Pass our dependcies as arguments
module.exports = function(express, app, passport, db) {
  app.get("/", function(req, res) {
    res.render("home");
  });

  // these routes require user to be logged in to access
  app.get("/profile", isLoggedIn, function(req, res) {
    res.render("profile", { user: req.user });
  });

  app.get("/currentuser", function(req, res) {
    db.User.findOne({_id: req.user._id})
      .populate("game review")
      .then(function(user) {
        res.json(user );
      })
  });

  app.get("/isMember", function(req, res) {
    if(req.user) {
      res.json(req.user);
    }
    if(!req.user){
      res.json(null);
    }
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
    req.session.destroy();        // stack overflow https://bit.ly/2HRDDvA
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect("/");
}
