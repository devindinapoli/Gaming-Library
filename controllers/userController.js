// Pass our dependcies as arguments
module.exports = function(express, app, db, passport) {
  // User update routes-----------------------------------------------------//
  app.post("/submit", function(req, res) {
    db.User.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
        console.log(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/currentuser", function(req, res) {
    db.User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { game: req.body.gameId } }
    )
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/delete", function(req, res) {
    db.User.findOneAndUpdate(
      {_id: req.user.id },
      { $pull: { game: req.body.gameId } }
    )
      .then(function(dbUser) {
        res.json(dbUser);
      })
      .catch(function(err) {
        res.json(err);
      });
  })

};
