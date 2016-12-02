module.exports = function(app, db, mysql) {

    require("./models/tables.server.js")(db);

    var movieModel    = require("./models/movie.model.js")(db);
    var userModel     = require("./models/user.model.js")(db);
    var commentModel  = require("./models/comment.model.js")(db);
    var favoriteModel = require("./models/favorite.model.js")(db);

    var movieService  = require("./services/movie.service.server.js")(app, movieModel);
    var userService   = require("./services/user.service.server.js")(app, userModel);
    var commentService= require("./services/comment.service.server.js")(app, commentModel);
    var favoriteService = require("./services/favorite.service.server.js")(app, favoriteModel);

};