// load mock forms data
var mock = require("./comment.mock.json");
//var Guid = require("../js/guid.js");
var q = require("q");


module.exports = function() {

    var api = {

        findCommentsByMovieId: findCommentsByMovieId,
        createComment: createComment,
        updateComment: updateComment,
        deleteComment: deleteComment

    };
    return api;

    function findCommentsByMovieId(movieId) {

        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.Comment as c WHERE c.comments = ?;', [movieId], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });

        return deferred.promise;
    }

    function createComment(comment) {

        var deferred = q.defer();

        db.query('INSERT INTO moviedb.Comment SET commentedBy = ?, comments = ?, text = ?, createDate = ?, updateDate = ?;', [comment.commentedBy, comment.comments, comment.text, comment.createDate, comment.updateDate], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

    function updateComment(userId, movieId, comment) {

        var deferred = q.defer();
        console.log("IN DB");
        console.log(userId);
        console.log(movieId);
        console.log(comment);

        db.query('UPDATE moviedb.Comment SET text = ?, updateDate = ? WHERE commentedBy = ? and comments = ?;', [comment.text, comment.updateDate, userId, movieId], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(result);
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

    function deleteComment(userId, movieId) {

        var deferred = q.defer();

        db.query('DELETE FROM moviedb.Comment WHERE commentedBy = ? AND comments = ?;', [userId, movieId], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

};