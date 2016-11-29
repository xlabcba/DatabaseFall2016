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
            //vm.isMovieLink = isMovieLink;
            //vm.isTvLink = isTvLink;
            //vm.isActorLink = isActorLink;
            //vm.catelogs =
            //    [
            //        {value: 'movie',label: 'Movie'},
            //        {value: 'tv',label: 'TV'},
            //        {value: 'actor',label: 'Actor'}
            //    ];
            vm.keyword = '';
        }

        init();

        function logout() {
            UserService.logout();
            $location.url("/home");
        }

        function islogin(){
            return UserService.islogin();
            //return false
        }

        function isAdmin(){
            //return UserService.isAdmin();
            return false
        }

        //function isMovieLink(){
        //    //return $location.url().search("/movie_list")==0;
        //    return true
        //}
        //
        //function isTvLink(){
        //    //return $location.url().search("/tv_list")==0;
        //    return false
        //}
        //
        //function isActorLink(){
        //    //return $location.url().search("/actor_list")==0;
        //    return false
        //}

    }
})();
