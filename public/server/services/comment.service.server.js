module.exports = function(app, commentModel) {

    app.get("/api/project/movie/:movieId/comment", findCommentsByMovieId);

    function findCommentsByMovieId(req, res) {
        var movieId = req.params.movieId;
        //console.log(movieId);
        //var comments = commentModel.findCommentsByMovieId(movieId);
        //res.json(comments);

        commentModel.findCommentsByMovieId(movieId)
            .then(
                function ( comments ) {
                    res.json(comments);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }
};