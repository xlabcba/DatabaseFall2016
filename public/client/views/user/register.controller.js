(function(){
    angular
        .module('MovieFanApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService){
        console.log("RegisterController");
        var vm = this;

        function init(){
            vm.register = register;
            vm.user = {"username":"", "password":"","veripassword":"","email":""};
        }
        init();

        function register(){
            if (vm.user.username == "" || vm.user.username == null) {
                alert("Please input username");
                return;
            }
            if (vm.user.email == "" || vm.user.email == null) {
                alert("Please input email");
                return;
            }
            if (vm.user.password == "" || vm.user.password == null) {
                alert("Please input password");
                return;
            }
            if (vm.user.veripassword == "" || vm.user.veripassword == null) {
                alert("Please verify password");
                return;
            }
            if (vm.user.password != vm.user.veripassword) {
                alert("Password doesn't match");
                return;
            }
            var registerUser = {};
            registerUser.username = vm.user.username;
            registerUser.password = vm.user.password;
            registerUser.email = vm.user.email;

            UserService.register(registerUser)
                .then(function (response) {
                    if (response != null && response != undefined) {
                        var userId = response.data;
                        console.log(userId);
                        UserService
                            .findUserById(userId)
                            .then(function(response) {
                                var curUser = response.data;
                                if(curUser) {
                                    UserService.setCurrentUser(curUser);
                                    $location.url("/profile");
                                } else {
                                    $location.url("/home");
                                }
                            });
                    }

                    //var currentUser = response.data;
                    //console.log(currentUser);
                    //if (currentUser != null) {
                    //    UserService.setCurrentUser(currentUser);
                    //    $location.url("/profile");
                    //}
                });
        }
    }
})();