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
            order: "release_dates.date:desc",
            search: req.query.title
            },
            ["name", "first_release_date", "rating", "summary", "screenshots"]
        )
        .then(function(results) {
            res.json(results.body);
        });
    });
};