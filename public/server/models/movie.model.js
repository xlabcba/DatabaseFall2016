// load mock forms data
var mock = require("./movie.mock.json");
//var Guid = require("../js/guid.js");

var q = require("q");


module.exports = function(db) {

    var api = {

        findAllMovies: findAllMovies,
        findMovieById: findMovieById,
        searchMovieByTitle: searchMovieByTitle

    };
    return api;

    function findAllMovies() {

        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.Movie;', function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });

        return deferred.promise;
    }

    function findMovieById(movieId) {

        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.Movie as m WHERE m.id = ?;', [movieId], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows[0]);
            }
        });

        return deferred.promise;
    }

    function searchMovieByTitle(keyword) {
        var deferred = q.defer();

        db.query("SELECT * FROM moviedb.Movie as m WHERE m.title LIKE ?;", ['%'+keyword+'%'], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });

        return deferred.promise;
    }
};