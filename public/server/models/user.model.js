// load mock forms data
//var mock = require("./user.mock.json");
//var Guid = require("../js/guid.js");
var q = require("q");


module.exports = function(db) {

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        updateUserById: updateUserById,
        findUserByCredentials: findUserByCredentials,
        findAdminByCredentials: findAdminByCredentials,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser

    };
    return api;

    function createUser(user) {

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

};