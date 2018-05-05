// Pass our dependcies as arguments
module.exports = function(express, app, igdb, client) {
  //-----------IGDB Routes----------------------------------------------//
  app.get("/search", function(req, res) {
    //currently this handles routes for searching games by title
    client
      .games(
        {
          limit: 12, // limit results for testing.
          offset: 0,
          search: req.query.title
        },
        ["name", "first_release_date", "rating", "summary", "screenshots", "cover"]
      )
      .then(function(results) {
        res.json(results.body);
      });
  });

  app.get("/gameId", function(req, res) {
    client
      .games(
        {
          ids: [req.query.id]
        },
        ["name", "screenshots", "rating", "summary"]
      )
      .then(function(results) {
        res.json(results.body);
      });
  });
};
