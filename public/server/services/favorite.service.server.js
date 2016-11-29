module.exports = function(app, favoriteModel) {

    app.get("/api/project/user/:userId/movie/:movieId", isFavorite);

    function isFavorite(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var result = favoriteModel.isFavorite(userId, movieId);
        res.json(result);
    }
};