(function () {
    angular
        .module('MovieFanApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, UserService) {
        console.log("HeaderController");

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.islogin = islogin;
            vm.isAdmin = isAdmin;
            vm.logout = logout;
            vm.keyword = '';
        }

        init();

        function logout() {
            UserService.logout();
            $location.url("/home");
        }

        function islogin(){
            return UserService.islogin();
        }

        function isAdmin(){
            return UserService.isAdmin();
        }

    }
})();
