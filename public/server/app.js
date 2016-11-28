module.exports = function(app) {

    var movieModel    = require("./models/movie.model.js")();
    var userModel     = require("./models/user.model.js")();

    var movieService  = require("./services/movie.service.server.js")(app, movieModel);
    var userService  = require("./services/user.service.server.js")(app, userModel);


    //var userModelProj    = require("./models/user.model");
    //var recipeModel   = require("./models/recipe.model.js")(db, mongoose);
    //var commentModel   =  require("./models/comment.model.js")(db, mongoose, recipeModel);

    //var userService  = require("./services/user.service.server.js") (app, userModelProj, recipeModel, commentModel);
    //var recipeService = require("./services/recipe.service.server.js")(app, userModelProj, recipeModel, commentModel);
    //var commentService = require("./services/comment.service.server.js")(app, userModelProj, recipeModel, commentModel);
};