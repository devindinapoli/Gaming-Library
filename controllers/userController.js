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

  app.post("/delete", function(req, res) {

    db.Game.findOne( {gameId: req.body.gameId} )
      .then(function(gameObj) {
        db.User.findOneAndUpdate(
          { _id: req.user._id },
          { $pull: { game: gameObj._id } }
        )
        .then( db.Game.remove({ _id: gameObj._id }));
      })
      res.end()
      
  
  })

  app.post("/currentuser", function(req, res) {
    db.Game.create(req.body)
      .then(function(game) { 
        return db.User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { game:  game._id } },
          { new: true }
        );
    })
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        res.json(err);
      })
  })

};
