// load mock forms data
var mock = require("./comment.mock.json");
//var Guid = require("../js/guid.js");

module.exports = function() {

    var api = {

        findCommentsByMovieId: findCommentsByMovieId

    };
    return api;

    function findCommentsByMovieId(movieId) {
        var ret_comments = [];
        for(var c in mock) {
            if(mock[c].movieId == movieId) {
                ret_comments.push(mock[c]);
            }
        }
        return ret_comments;
    }

};