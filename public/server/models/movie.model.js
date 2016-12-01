// load mock forms data
var mock = require("./movie.mock.json");
//var Guid = require("../js/guid.js");

var q = require("q");


module.exports = function(db) {

    var api = {

        findAllMovies: findAllMovies,
        findMovieById: findMovieById,
        searchMovieByTitle: searchMovieByTitle
        //createRecipeForUser: createRecipeForUser,
        //findAllRecipesForUser: findAllRecipesForUser,
        //deleteRecipeById: deleteRecipeById,
        //updateRecipeById: updateRecipeById,
        //deleteRecipeOfUser: deleteRecipeOfUser,
        //updateRating: updateRating,
        //likeByUser: likeByUser,
        //unlikeByUser: unlikeByUser,
        //findAllLikedRecipesForUser: findAllLikedRecipesForUser,
        //findAllRecipesForStr: findAllRecipesForStr,
        //deleteUserFromLikeBy: deleteUserFromLikeBy,

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
        //for(var m in mock) {
        //
        //    if(mock[m]._id == movieId) {
        //        return mock[m];
        //    }
        //}
        //return null;
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

        console.log("IN DB");
        console.log(keyword);
        db.query("SELECT * FROM moviedb.Movie as m WHERE m.title LIKE ?;", ['%'+keyword+'%'], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("SUCCESS SEARCH!!!");
                console.log(rows);
                deferred.resolve(rows);
            }
        });

        return deferred.promise;
    }

    //function createRecipeForUser(userId, recipe) {
    //    var newRecipe = {
    //        _id: Guid.create(),  //"ID_" + (new Date()).getTime(),
    //        userId: userId,
    //        title: recipe.title,
    //        titleImg: recipe.titleImg,
    //        recipeImg: recipe.recipeImg,
    //        rating: "0",
    //        rateImg: "./images/star0.png",
    //        likeBy:[],
    //        tag1: recipe.tag1,
    //        tag2: recipe.tag2,
    //        tag3: recipe.tag3,
    //        ingredientSpirit: recipe.ingredientSpirit,
    //        ingredientOther: recipe.ingredientOther,
    //        step: recipe.step
    //    };
    //    mock.push(newRecipe);
    //    return mock;
    //}
    //
    //function findAllRecipesForUser(userId) {
    //    var ret_recipes = [];
    //    for(var r in mock) {
    //        if(mock[r].userId == userId) {
    //            ret_recipes.push(mock[r]);
    //        }
    //    }
    //    return ret_recipes;
    //}
    //
    //function deleteRecipeById(recipeId) {
    //    for(var r in mock) {
    //        if(mock[r]._id == recipeId) {
    //            mock.splice(r,1);
    //            return mock;
    //        }
    //    }
    //    return null;
    //}
    //
    //function updateRecipeById(recipeId, newRecipe) {
    //    for(var r in mock) {
    //        if(mock[r]._id == recipeId) {
    //            mock.splice(r,1,newRecipe);
    //            return mock;
    //        }
    //    }
    //    return null;
    //}
    //
    //function deleteRecipeOfUser(userId) {
    //    for(var r = 0; r < mock.length; r++) {
    //        if(mock[r].userId == userId) {
    //            mock.splice(r,1);
    //            r--;
    //        }
    //    }
    //    return 1;
    //}
    //
    //function updateRating(recipeId, rating) {
    //    var rateImg;
    //    if (rating == 1) {
    //        rateImg = "./images/star1.png";
    //    } else if (rating == 2) {
    //        rateImg = "./images/star2.png";
    //    } else if (rating == 3) {
    //        rateImg = "./images/star3.png";
    //    } else if (rating == 4) {
    //        rateImg = "./images/star4.png";
    //    } else if (rating == 5) {
    //        rateImg = "./images/star5.png";
    //    } else {
    //        rateImg = "./images/star0.png";
    //    }
    //    for(var r in mock) {
    //        if(mock[r]._id == recipeId) {
    //            mock[r].rating = rating;
    //            mock[r].rateImg = rateImg;
    //            return mock[r];
    //        }
    //    }
    //    return null;
    //}
    //
    //function likeByUser(userId, recipeId) {
    //    for(var r in mock) {
    //        if(mock[r]._id == recipeId) {
    //            mock[r].likeBy.push(userId);
    //            return mock[r];
    //        }
    //    }
    //    return null;
    //}
    //
    //function unlikeByUser(userId, recipeId) {
    //    for(var r in mock) {
    //        if(mock[r]._id == recipeId) {
    //            for(var l in mock[r].likeBy) {
    //                if(mock[r].likeBy[l] == userId) {
    //                    mock[r].likeBy.splice(l,1);
    //                    return mock[r];
    //                }
    //            }
    //        }
    //    }
    //    return null;
    //}
    //
    //function findAllLikedRecipesForUser(likedRecipes) {
    //    var ret_recipes = [];
    //    for(var r in likedRecipes) {
    //        var recipe = findRecipeById(likedRecipes[r]);
    //        if(recipe) {
    //            ret_recipes.push(recipe);
    //        }
    //    }
    //    return ret_recipes;
    //}
    //
    //function findAllRecipesForStr(searchStr) {
    //    var ret_recipes = [];
    //    for(var r in mock) {
    //        if(mock[r].title.search(searchStr) >= 0
    //            || isInStrArray(searchStr, mock[r].ingredientSpirit)
    //            || isInStrArray(searchStr, mock[r].ingredientOther)
    //            || isInStrArray(searchStr, mock[r].step)
    //            || isInStrArray(searchStr, mock[r].tag1)
    //            || isInStrArray(searchStr, mock[r].tag2)
    //            || mock[r].tag3.search(searchStr) >= 0) {
    //
    //            ret_recipes.push(mock[r]);
    //        }
    //    }
    //    if (ret_recipes.length == 0) {
    //        ret_recipes = findAllRecipes();
    //        console.log("empty!");
    //        console.log(ret_recipes);
    //        return ret_recipes;
    //    } else {
    //        console.log("NOT empty!");
    //        console.log(ret_recipes);
    //        return ret_recipes;
    //    }
    //}
    //
    //function isInStrArray(searchStr, strArray) {
    //    for (var s in strArray) {
    //        if (s.search(searchStr) >= 0) {
    //            return true;
    //        }
    //    }
    //    return false;
    //}
    //
    //function deleteUserFromLikeBy(userId) {
    //    for(var r in mock) {
    //        for(var u in mock[r].likeBy) {
    //            if(mock[r].likeBy[u] == userId) {
    //                mock[r].likeBy.splice(u,1);
    //                return mock[r].likeBy;
    //            }
    //        }
    //    }
    //    return null;
    //}
};