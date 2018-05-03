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

    app.post("/submitGame", function(req, res) {
        db.Game.create(req.body)
        .then(function(dbGame) {
            return db.User.findOneAndUpdate(
            {},
            { $push: { games: dbGame._id } },
            { new: true }
            );
        })
        .then(function(dbUser) {
            res.json(dbUser);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/user", function(req, res) {
        db.User.find({})
        .then(function(dbUser) {
            res.json(dbUser);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
}