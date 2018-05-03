// Pass our dependcies as arguments
module.exports = function(express, app, db) {
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
};
