(function () {
    angular
        .module("MovieFanApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            register:register,
            findUserById: findUserById,
            updateUser: updateUser,
            login:login,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            islogin:islogin,
            logout: logout
            //findUserByUsername:findUserByUsername,
            //findUserByCredentials: findUserByCredentials,
            //adminFindAllUsers: adminFindAllUsers,
            //adminCreateUser: adminCreateUser,
            //adminUpdateUser:adminUpdateUser,
            //adminDeleteUserById: adminDeleteUserById,
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

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId, user);
        }

        function login(credential){
            return $http.get("/api/project/user?username="+credential.username+"&password="+credential.password);
            //return $http.post("/api/project/user", credential);
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

        function logout() {
            var curuser = jQuery.extend(true, {}, $rootScope.curUser);
            $rootScope.curUser = null;
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
        //function adminFindAllUsers() {
        //    return $http.get("/api/project/admin/user");
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