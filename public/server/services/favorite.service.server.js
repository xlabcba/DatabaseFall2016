module.exports = function(app, favoriteModel) {

    app.get("/api/project/favorite", isFavorite);
    app.post("/api/project/user/:userId/movie/:movieId", like);
    app.put("/api/project/user/:userId/movie/:movieId", unlike);

    function isFavorite(req, res) {
        //var userId = req.params.userId;
        //var movieId = req.params.movieId;
        //var result = favoriteModel.isFavorite(userId, movieId);
        //res.json(result);

        var userId = req.query.userId;
        var movieId = req.query.movieId;

        //console.log(userId);
        //console.log(movieId);

        favoriteModel
            .isFavorite(userId, movieId)
            .then(
                function ( total ) {
                    //console.log("IS FAVORITE");
                    //console.log(total);
                    res.json(total);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function like(req, res) {
        //var userId = req.params.userId;
        //var movieId = req.params.movieId;
        //var result = favoriteModel.like(userId, movieId);
        //res.json(result);

        var userId = req.params.userId;
        var movieId = req.params.movieId;
        favoriteModel
            .like(userId, movieId)
            .then(function ( result ) {
                    //console.log("LIKE");
                    //console.log(result);
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function unlike(req, res) {
        //var userId = req.params.userId;
        //var movieId = req.params.movieId;
        //var result = favoriteModel.unlike(userId, movieId);
        //res.json(result);
        var userId = req.params.userId;
        var movieId = req.params.movieId;

        console.log("UNLIKE");
        console.log(userId);
        console.log(movieId);

        favoriteModel
            .unlike(userId, movieId)
            .then(function ( result ) {
                    //console.log("UNLIKED!!!");
                    //console.log(result);
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }
};