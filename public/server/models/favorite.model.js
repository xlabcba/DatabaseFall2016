// load mock forms data
var mock = require("./favorite.mock.json");
//var Guid = require("../js/guid.js");
var q = require("q");


module.exports = function() {

    var api = {

        isFavorite: isFavorite,
        like: like,
        unlike: unlike

    };
    return api;

    function isFavorite(userId, movieId) {

        var deferred = q.defer();

        db.query('SELECT COUNT(*) as total FROM moviedb.Favorite as f WHERE f.savedBy = ? AND f.saves = ?;', [userId, movieId], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;

    }

    function like(userId, movieId) {

        var deferred = q.defer();

        db.query('INSERT INTO moviedb.Favorite SET savedBy = ?, saves = ?;', [userId, movieId], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log(result);
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

    function unlike(userId, movieId) {

        var deferred = q.defer();

        db.query('DELETE FROM moviedb.Favorite WHERE savedBy = ? AND saves = ?;', [userId, movieId], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log(result);
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }

};