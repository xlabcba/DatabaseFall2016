module.exports = function(app, commentModel) {

    app.get("/api/project/movie/:movieId/comment", findCommentsByMovieId);
    app.post("/api/project/comment", createComment);
    app.put("/api/project/comment/user/:userId/movie/:movieId", updateComment);
    app.delete("/api/project/comment/user/:userId/movie/:movieId", deleteComment);

    function findCommentsByMovieId(req, res) {
        var movieId = req.params.movieId;
        //console.log(movieId);
        //var comments = commentModel.findCommentsByMovieId(movieId);
        //res.json(comments);

        commentModel
            .findCommentsByMovieId(movieId)
            .then(
                function ( comments ) {
                    res.json(comments);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function createComment(req, res) {
        var comment = req.body;
        //console.log("IN SERVER");
        //console.log(comment);
        commentModel
            .createComment(comment)
            .then(function ( result ) {
                    //console.log("COMMENTED!!!");
                    //console.log(insertId);
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function updateComment(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var comment = req.body;
        console.log("IN SERVER");
        console.log(userId);
        console.log(movieId);
        console.log(comment);
        commentModel
            .updateComment(userId, movieId, comment)
            .then(function ( result ) {
                    console.log("UPDATED!!!");
                    console.log(result);
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function deleteComment(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        commentModel
            .deleteComment(userId, movieId)
            .then(function ( result ) {
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

};