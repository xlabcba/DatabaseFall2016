(function () {
    angular
        .module("MovieFanApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            register:register,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login:login,
            loginAsAdmin:loginAsAdmin,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            setAdmin: setAdmin,
            isAdmin: isAdmin,
            islogin:islogin,
            logout: logout
        };

        return api;

        function register(user){
            return $http.post('/api/project/user', user);
        }

        function findUserById(userId) {
            console.log(userId);
            return $http.get("/api/project/user/"+userId);
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId, user);
        }

        function deleteUser(userId) {
            return $http.delete("/api/project/admin/"+userId);
        }

        function login(credential){
            return $http.get("/api/project/user?username="+credential.username+"&password="+credential.password);
        }

        function loginAsAdmin(credential){
            return $http.get("/api/project/admin?username="+credential.username+"&password="+credential.password);
        }

        function setCurrentUser(user) {
            $rootScope.curUser = user;
            $rootScope.$broadcast("setCurrentUser");
        }

        function getCurrentUser() {
            return $rootScope.curUser;
        }

        function islogin() {
            return !($rootScope.curUser == undefined || $rootScope.curUser == null);
        }

        function setAdmin() {
            $rootScope.isAdmin = true;
        }

        function isAdmin() {
            return islogin() && $rootScope.isAdmin;
        }

        function logout() {
            var curuser = jQuery.extend(true, {}, $rootScope.curUser);
            $rootScope.curUser = null;
            $rootScope.isAdmin = false;
            return $http.post("/api/project/logout", curuser);
        }
    }
})();