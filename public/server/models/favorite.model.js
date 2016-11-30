// load mock forms data
var mock = require("./favorite.mock.json");
//var Guid = require("../js/guid.js");

module.exports = function() {

    var api = {

        isFavorite: isFavorite,
        like: like,
        unlike: unlike

    };
    return api;

    function isFavorite(userId, movieId) {
        for(var f in mock) {
            if(mock[f].userId == userId && mock[f].movieId == movieId) {
                return true;
            }
        }
        return false;
    }

    function like(userId, movieId) {
        var newLike = {"userId": userId, "movieId": movieId};
        for(var l in mock) {
            if(mock[l].userId == userId && mock[l].movieId == movieId) {
                return null;
            }
        }
        mock.push(newLike);
        return true;
    }

    function unlike(userId, movieId) {
        for(var l in mock) {
            if(mock[l].userId == userId && mock[l].movieId == movieId) {
                mock.splice(l,1);
                return false;
            }
        }
        return null;
    }

};