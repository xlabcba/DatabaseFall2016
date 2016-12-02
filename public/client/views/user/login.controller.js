(function() {
    angular
        .module('MovieFanApp')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {
        console.log("LoginController");
        var vm = this;

        function init() {
            vm.login = login;
            vm.user = {"username": "", "password": ""};
        }

        init();

        function login() {
            if (vm.user.username == "" || vm.user.username == null) {
                alert("Please input username");
                return;
            }
            if (vm.user.password == "" || vm.user.password == null) {
                alert("Please input password");
                return;
            }
            if (vm.loginAsAdmin) {
                console.log("GOING TO LOGIN AS ADMIN");
                UserService.loginAsAdmin(vm.user)
                    .then(function (response) {
                        if (response.data == "" || response.data == null || response.data == undefined) {
                            alert("Invalid Admin Username or/and Password");
                            return;
                        } else {
                            console.log(response);
                            vm.user = response.data;
                            UserService.setCurrentUser(response.data);
                            UserService.setAdmin();
                            $location.path('/admin');
                        }
                    })
            } else {
                console.log("GOING TO LOGIN AS NORMAL USER");
                UserService.login(vm.user)
                    .then(function (response) {
                        if (response.data == "" || response.data == null || response.data == undefined) {
                            alert("Invalid Username or/and Password");
                            return;
                        } else {
                            console.log(response);
                            vm.user = response.data;
                            UserService.setCurrentUser(response.data);
                            $location.path('/profile');
                        }
                    })
            }
        }
    }
})();
