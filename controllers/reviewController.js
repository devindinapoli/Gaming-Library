module.exports = function(express, app, db) {

    app.get("/review", function(req, res) {
      db.Review.find({})
        .then(function(dbReview) {
          res.json(dbReview);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  
    app.get("/user", function(res, res) {
      db.User.find({})
        .then(function(dbUser) {
          res.json(dbUser);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  
    app.post("/newReview", function(req, res) {
      console.log(Object.keys(db));
      db.Review.create(req.body)
        .then(function(dbReview) {
          return db.User.findOneAndUpdate({}, { $push: { review: dbReview._id } }, { new: true });
        })
        .then(function(dbReview) {
          res.redirect("/profile");
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  
    // app.get("/populateduser", function(res, res) {
    //   db.User.find({})
    //     .populate("notes")
    //     .then(function(dbUser) {
    //       res.json(dbUser);
    //     })
    //     .catch(function(err) {
    //       res.json(err);
    //     });
    // });
  };