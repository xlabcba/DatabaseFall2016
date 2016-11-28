(function(){
    angular
        .module('MovieFanApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, UserService){
        console.log("RegisterController");
        var vm = this;

        function init(){
            vm.register = register;
            vm.user = { "username":"", "password":"","veripassword":"","email":""};
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
            //TODO: handle first and last name
            UserService.register(registerUser)
                .then(function (response) {
                    var currentUser = response.data;
                    console.log(currentUser);
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                });
        }
    }
})();