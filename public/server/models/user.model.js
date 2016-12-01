// load mock forms data
var mock = require("./user.mock.json");
var Guid = require("../js/guid.js");
var q = require("q");


module.exports = function(db) {

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        updateUserById: updateUserById,
        findUserByCredentials: findUserByCredentials,
        findAdminByCredentials: findAdminByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        //followUser: followUser,
        //followByUser: followByUser,
        //unfollowUser: unfollowUser,
        //unfollowByUser: unfollowByUser,
        //likeRecipe: likeRecipe,
        //unlikeRecipe: unlikeRecipe,
        //deleteRecipeFromLike: deleteRecipeFromLike,
        //deleteUserFromFollower: deleteUserFromFollower,
        //findFollowedUsersForUser: findFollowedUsersForUser

    };
    return api;

    function createUser(user) {
        //var newUser = {
        //    _id: Guid.create(),
        //    //photo: user.photo,
        //    //gender: user.gender,
        //    firstName: user.firstName,
        //    lastName: user.lastName,
        //    username: user.username,
        //    password: user.password,
        //    email: user.email
        //    //birthday: user.birthday,
        //    //follow: [],
        //    //followBy: [],
        //    //like: [],
        //    //intro: user.intro,
        //    //roles:["user"]
        //};
        //mock.push(newUser);
        //return newUser;
        var deferred = q.defer();
        //console.log("ENTER DB SUCCESSFULLY!");

        db.query('INSERT INTO moviedb.User SET username = ?, password = ?, email = ?;', [user.username, user.password, user.email], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                db.query('INSERT INTO moviedb.NormalUser SET id = ?;', [result.insertId], function(err, ret) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        console.log("inserted");
                        console.log(result.insertId);
                        deferred.resolve(result.insertId);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        //for(var u in mock) {
        //    if(mock[u]._id == userId) {
        //        return mock[u];
        //    }
        //}
        //return null;
        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.User as u WHERE u.id = ?;', [userId], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows[0]);
            }
        });

        return deferred.promise;
    }

    function updateUserById(userId, user) {
        //for(var u in mock) {
        //    if(mock[u]._id == userId) {
        //        user._id = userId
        //        mock.splice(u,1,user);
        //        return user;
        //    }
        //}
        //return null;
        var deferred = q.defer();

        db.query('UPDATE moviedb.User SET username = ?, password = ?, firstName = ?, lastName = ?, password = ?, email = ? WHERE id = ?;', [user.username, user.password, user.firstName, user.lastName, user.password, user.email, userId], function(err, row) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(row);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        //for(var u in mock) {
        //    if(mock[u].username == username && mock[u].password == password) {
        //        return mock[u];
        //    }
        //}
        //return null;
        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.User as u, moviedb.NormalUser as nu WHERE u.username = ? AND u.password = ? AND u.id = nu.id;', [username, password], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows[0]);
            }
        });

        return deferred.promise;
    }

    function findAdminByCredentials(username, password) {
        //for(var u in mock) {
        //    if(mock[u].username == username && mock[u].password == password) {
        //        return mock[u];
        //    }
        //}
        //return null;
        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.User as u, moviedb.Admin as a WHERE u.username = ? AND u.password = ? AND u.id = a.id;', [username, password], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows[0]);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if(mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers() {
        var deferred = q.defer();

        db.query('SELECT * FROM moviedb.User as u, moviedb.NormalUser as nu WHERE u.id = nu.id;', function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });

        return deferred.promise;
    }

    function deleteUser(userId) {
        //for(var w in mock) {
        //    if(mock[w]._id == userId) {
        //        mock.splice(w,1);
        //        return mock;
        //    }
        //}
        //return null;
        var deferred = q.defer();

        db.query('DELETE nu, u FROM moviedb.NormalUser as nu INNER JOIN moviedb.User as u WHERE nu.id = ? AND nu.id = u .id;', [userId], function(err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("DELETED NORMAL USER");
                console.log(result);
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    }
    //
    //function followUser(followerId, followedId) {
    //    for(var u in mock) {
    //        if(mock[u]._id == followerId) {
    //            mock[u].follow.push(followedId);
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}
    //
    //function followByUser(followerId, followedId) {
    //    for(var u in mock) {
    //        if(mock[u]._id == followedId) {
    //            mock[u].followBy.push(followerId);
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}
    //
    //function unfollowUser(followerId, followedId) {
    //    for(var u in mock) {
    //        if(mock[u]._id == followerId) {
    //            for(var v in mock[u].follow) {
    //                if(mock[u].follow[v] == followedId) {
    //                    mock[u].follow.splice(v,1);
    //                    console.log("success unfollow!");
    //                    return mock[u];
    //                }
    //            }
    //        }
    //    }
    //    return null;
    //}
    //
    //function unfollowByUser(followerId, followedId) {
    //    for(var u in mock) {
    //        if(mock[u]._id == followedId) {
    //            for(var v in mock[u].followBy) {
    //                if(mock[u].followBy[v] == followerId) {
    //                    mock[u].followBy.splice(v,1);
    //                    console.log("success unfollowBy!");
    //                    return mock[u];
    //                }
    //            }
    //        }
    //    }
    //    return null;
    //}
    //
    //function likeRecipe(userId, recipeId) {
    //    for(var u in mock) {
    //        if(mock[u]._id == userId) {
    //            mock[u].like.push(recipeId);
    //            return mock[u];
    //        }
    //    }
    //    return null;
    //}
    //
    //function unlikeRecipe(userId, recipeId) {
    //    for(var u in mock) {
    //        if(mock[u]._id == userId) {
    //            for(var v in mock[u].like) {
    //                if(mock[u].like[v] == recipeId) {
    //                    mock[u].like.splice(v,1);
    //                    return mock[u];
    //                }
    //            }
    //        }
    //    }
    //    return null;
    //}
    //
    //function deleteRecipeFromLike(recipeId) {
    //    for(var u in mock) {
    //        for(var v in mock[u].like) {
    //            if(mock[u].like[v] == recipeId) {
    //                mock[u].like.splice(v,1);
    //            }
    //        }
    //    }
    //    return null;
    //}
    //
    //function deleteUserFromFollower(userId) {
    //    for(var u in mock) {
    //        for(var v in mock[u].follow) {
    //            if(mock[u].follow[v] == userId) {
    //                mock[u].follow.splice(v,1);
    //                return mock[u].follow;
    //            }
    //        }
    //    }
    //    return null;
    //}
    //
    //function findFollowedUsersForUser(followingUsers) {
    //    var ret_users = [];
    //    for(var u in followingUsers) {
    //        var user = findUserById(followingUsers[u]);
    //        if(user) {
    //            ret_users.push(user);
    //        }
    //    }
    //    return ret_users;
    //}


};