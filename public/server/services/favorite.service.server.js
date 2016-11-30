module.exports = function(app, favoriteModel) {

    app.get("/api/project/user/:userId/movie/:movieId", isFavorite);
    app.post("/api/project/user/:userId/movie/:movieId", like);
    app.put("/api/project/user/:userId/movie/:movieId", unlike);

    function isFavorite(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var result = favoriteModel.isFavorite(userId, movieId);
        res.json(result);
    }

    function like(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var result = favoriteModel.like(userId, movieId);
        res.json(result);
    }

    function unlike(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var result = favoriteModel.unlike(userId, movieId);
        res.json(result);
    }
};