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
            //findUserByUsername:findUserByUsername,
            //findUserByCredentials: findUserByCredentials,
            //adminCreateUser: adminCreateUser,
            //adminUpdateUser:adminUpdateUser,
            //getProfile:getProfile,
            //isAdmin:isAdmin,
            //like: like,
            //unlike:unlike,
            //more functions
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
            //return $http.post("/api/project/user", credential);
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

        //function getProfile(){
        //    return $http.get("/api/project/loggedin");
        //}
        //
        //function findUserByUsername(username){
        //    return $http.get("/api/project/user?username="+username);
        //}
        //
        //function findUserByCredentials(username,password) {
        //    return $http.get("/api/project/user?username="+username+"&password="+password);
        //}
        //
        //function adminCreateUser(user) {
        //    return $http.post("/api/project/admin/user",user);
        //}
        //
        //function adminDeleteUserById(userId){
        //    return $http.delete("/api/project/admin/user/"+userId);
        //}
        //
        //function adminUpdateUser(userId, user) {
        //    return $http.put("/api/project/admin/user/"+userId,user);
        //}
        //
        //function like(type,tviso_id){
        //    return $http.post("/api/project/user/like",{"tviso_id":tviso_id,"type":type});
        //}
        //
        //function unlike(type,tviso_id){
        //    return $http.delete("/api/project/user/unlike/"+type+"/"+tviso_id);
        //}
        //
        //function isAdmin(){
        //    if(islogin()&&$rootScope.curUser.rules!=undefined&&$rootScope.curUser.rules=="admin"){
        //        return true;
        //    }else{
        //        return false;
        //    }
        //}

    }
})();