module.exports = function(app, movieModel) {

    app.get("/api/project/movie", getAllMovies);
    app.get("/api/project/movie/:movieId", getMovieById);
    app.get("/api/project/search/:keyword", searchMovieByTitle);

    function getAllMovies(req, res) {
        movieModel.findAllMovies()
            .then(
                function ( movies ) {
                    res.json(movies);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function  getMovieById(req, res) {
        var movieId = req.params.movieId;

        movieModel.findMovieById(movieId)
            .then(
                function ( movie ) {
                    res.json(movie);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function searchMovieByTitle(req, res) {
        var keyword = req.params.keyword;

        movieModel.searchMovieByTitle(keyword)
            .then(function ( movies ) {
                    res.json(movies);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }
};