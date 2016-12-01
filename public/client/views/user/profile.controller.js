(function(){
    angular
        .module('MovieFanApp')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService,$q,$location,$rootScope){
        console.log("ProfileController");
        var vm = this;

        function init() {
            //vm.uploadPhoto = '';
            var deferred = $q.defer();
            vm.currUser = UserService.getCurrentUser();
            console.log($rootScope.curUser);
            console.log(vm.currUser);
            console.log(vm.currUser.email);
            console.log(vm.currUser.id);

            UserService
                .findUserById(vm.currUser.id)
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        UserService.setCurrentUser(curUser);
                        vm.user = curUser;
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });
            vm.update = update;
        }
        init();

        function update(){
            if (vm.user.username == null || vm.user.username == '' || vm.user.username == undefined) {
                alert("username cannot be empty");
                return;
            }
            if (vm.user.password == null || vm.user.password == '' || vm.user.password == undefined) {
                alert("password cannot be empty");
                return;
            }
            if (vm.user.email == null || vm.user.email == '' || vm.user.email == undefined) {
                alert("email cannot be empty");
                return;
            }

            var deferred = $q.defer();
            var updateUser = jQuery.extend({}, vm.user);
            if(updateUser.hasOwnProperty('id')){
                delete updateUser.id;
            }
            UserService
                .updateUser(vm.user.id, updateUser)
                .then(function(response) {
                    var curUser = response.data;
                    if(curUser) {
                        //UserService.setCurrentUser(curUser);
                        //vm.user = curUser;
                        //console.log(curUser);
                        UserService
                            .findUserById(vm.currUser.id)
                            .then(function(response) {
                                var curUser = response.data;
                                if(curUser) {
                                    UserService.setCurrentUser(curUser);
                                    vm.user = curUser;
                                    deferred.resolve();
                                } else {
                                    deferred.reject();
                                    $location.url("/home");
                                }
                            });
                    } else {
                        alert("Update Profile Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

    }
})();