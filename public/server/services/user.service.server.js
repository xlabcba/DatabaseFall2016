module.exports = function(app, userModel) {

    app.post("/api/project/user", createNewUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/admin", getAdmin);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/admin/user", getAllUsers);
    app.put("/api/project/user/:id", updateUser);
    app.post("/api/project/logout", logout);
    app.delete("/api/project/admin/:userId", deleteUser);
    //app.post("/api/project/user/:followerId/user/:followedId", userFollowsUser);
    //app.put("/api/project/user/:followerId/user/:followedId", userUnfollowsUser);
    //app.post("/api/project/user/searchFollowedUsers", getFollowedUsersForUser);
    //app.post("/api/project/user/photo", uploadPhotoForUserById);
    //app.get("/api/project/user/photo", getPhotoForUserById);

    //files = [];

    function createNewUser(req, res) {
        //var user = req.body;
        //var users = userModel.createUser(user);
        ////req.session.currentUser = user;
        //res.json(users);
        var user = req.body;

        userModel.createUser(user)
            .then(
                function (insertId) {
                    console.log("CREATED USER");
                    console.log(insertId);
                    res.json(insertId)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserById(req, res) {
        //var userId = req.params.id;
        //var user = userModel.findUserById(userId);
        //res.json(user);
        var userId = req.params.id;
        if (!userId || userId == undefined) {
            userId = req.params.userId;
        }
        userModel.findUserById(userId)
            .then(
                function ( user ) {
                    res.json(user)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res) {
        //var userId = req.params.id;
        //var user = userModel.findUserById(userId);
        //res.json(user);

        userModel.findAllUsers()
            .then(
                function ( users ) {
                    res.json(users)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        //var userId = req.params.id;
        //var newUser = req.body;
        //var users = userModel.updateUserById(userId, newUser);
        //res.json(users);

        var userId = req.params.id;
        var newUser = req.body;
        userModel.updateUserById(userId, newUser)
            .then(
                function (result) {
                    res.json(200)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res) {
        //if (Object.keys(req.query).length === 0) {
        //    var users = userModel.findAllUsers();
        //    res.json(users);
        //} else if (Object.keys(req.query).length === 1) {
        //    var username = req.query.username;
        //    var user = userModel.findUserByUsername(username);
        //    res.json(user);
        //} else if (Object.keys(req.query).length === 2) {
        //    var username = req.query.username;
        //    var password = req.query.password;
        //    var user = userModel.findUserByCredentials(username, password);
        //    res.json(user);
        //} else {
        //    res.json(null);
        //}
        if (Object.keys(req.query).length === 0) {
            userModel.findAllUsers()
                .then(
                    function ( users ) {
                        res.json(users);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else if (Object.keys(req.query).length === 1) {
            var username = req.query.username;
            userModel.findUserByUsername(username)
                .then(
                    function ( user ) {
                        res.json(user);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else if (Object.keys(req.query).length === 2) {
            var username = req.query.username;
            var password = req.query.password;
            userModel.findUserByCredentials(username, password)
                .then(
                    function ( user ) {
                        res.json(user)
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(400).send(err);
        }
    }

    function getAdmin(req, res) {
        //if (Object.keys(req.query).length === 0) {
        //    var users = userModel.findAllUsers();
        //    res.json(users);
        //} else if (Object.keys(req.query).length === 1) {
        //    var username = req.query.username;
        //    var user = userModel.findUserByUsername(username);
        //    res.json(user);
        //} else if (Object.keys(req.query).length === 2) {
        //    var username = req.query.username;
        //    var password = req.query.password;
        //    var user = userModel.findUserByCredentials(username, password);
        //    res.json(user);
        //} else {
        //    res.json(null);
        //}
        var username = req.query.username;
        var password = req.query.password;
        //console.log("IN SERVER");
        //console.log(username);
        //console.log(password);
        userModel.findAdminByCredentials(username, password)
            .then(
                function ( user ) {
                    res.json(user)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }


    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.deleteUser(userId)
            .then(
                function ( result ) {
                    console.log("DELETED IN SERVER");
                    res.send(200)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
    //
    //function userFollowsUser(req, res) {
    //    var followerId = req.params.followerId;
    //    var followedId = req.params.followedId;
    //    userModel.followByUser(followerId, followedId);
    //    var user = userModel.followUser(followerId, followedId);
    //    res.json(user);
    //}
    //
    //function userUnfollowsUser(req, res) {
    //    var followerId = req.params.followerId;
    //    var followedId = req.params.followedId;
    //    console.log(followerId);
    //    console.log(followedId);
    //    userModel.unfollowByUser(followerId, followedId);
    //    var user = userModel.unfollowUser(followerId, followedId);
    //    console.log(user);
    //    res.json(user);
    //}
    //
    //function getFollowedUsersForUser(req, res) {
    //    var followedUsers = req.body;
    //    var users = userModel.findFollowedUsersForUser(followedUsers);
    //    res.json(users);
    //}
    //
    //function uploadPhotoForUserById(req, res) {
    //    console.log('body: ' + JSON.stringify(req));
    //    /*
    //     var myFile = req.files.myFile;
    //     var file = {
    //     path: myFile.path,
    //     name: myFile.name,
    //     size: myFile.size,
    //     type: myFile.type
    //     };
    //     // optionally rename the file to its original name
    //     var oldPath = __dirname + "/../../" + myFile.path;
    //     var newPath = __dirname + "/../../public/uploads/" + myFile.name;
    //     files.push(file);
    //     res.json(files);
    //     /*
    //     res.redirect("/experiments/upload/file-list.view.html");
    //     */
    //    res.json(null);
    //}
    //
    //function getPhotoForUserById(req, res) {
    //    res.json(files);
    //}

};