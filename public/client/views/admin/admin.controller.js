(function () {
    angular
        .module('MovieFanApp')
        .controller('AdminController', AdminController);

    function AdminController($q, UserService) {
        console.log("AdminController");
        vm = this;

        function init() {
            vm.curUser = UserService.getCurrentUser();
            vm.loadAllUsers = loadAllUsers;
            vm.deleteUser = deleteUser;
            vm.loadAllUsers();
        }

        init();

        function loadAllUsers() {
            var deferred = $q.defer();

            UserService.findAllUsers()
                .then(function (response) {
                    if (response.data) {
                        vm.users = response.data;
                        deferred.resolve();
                    } else {
                        alert("Load Users Failed");
                        deferred.reject();
                    }
                });

            return deferred.promise;
        }

        function deleteUser(index) {
            var deferred = $q.defer();
            UserService.deleteUser(vm.users[index].id)
                .then(function (response) {
                    if (response.data) {
                        vm.loadAllUsers();
                        deferred.resolve();
                    } else {
                        alert("Delete User Failed");
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }
    }
})();

