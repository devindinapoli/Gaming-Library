const path = require("path"); // I don't think we need this anymore.

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

    // This will probably not be needed if we use a modal
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
}

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
  
    // if they aren't redirect them to the home page
    res.redirect("/");
};

