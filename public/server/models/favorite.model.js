// load mock forms data
var mock = require("./favorite.mock.json");
//var Guid = require("../js/guid.js");

module.exports = function() {

    var api = {

        isFavorite: isFavorite

    };
    return api;

    function isFavorite(userId, movieId) {
        console.log(userId);
        console.log(movieId);
        for(var f in mock) {
            console.log(mock[f].userId);
            console.log(mock[f].movieId);

            if(mock[f].userId == userId && mock[f].movieId == movieId) {
                return true;
            }
        }
        return false;
    }

};