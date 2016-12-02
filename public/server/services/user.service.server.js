module.exports = function(app, userModel) {

    app.post("/api/project/user", createNewUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/admin", getAdmin);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/admin/user", getAllUsers);
    app.put("/api/project/user/:id", updateUser);
    app.post("/api/project/logout", logout);
    app.delete("/api/project/admin/:userId", deleteUser);

    function createNewUser(req, res) {
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
        var username = req.query.username;
        var password = req.query.password;
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

};