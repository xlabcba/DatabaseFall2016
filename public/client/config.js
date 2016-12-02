(function () {
    angular
        .module('MovieFanApp')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: './views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                    //resolve: {
                    //    getLoggedIn: getLoggedIn
                    //}
                })
                .when('/movie_detail/:id', {
                    templateUrl: './views/movie/moviedetail.view.html',
                    controller: 'MovieDetailController',
                    controllerAs: 'model'
                    //resolve: {
                    //    getLoggedIn: getLoggedIn
                    //}
                })
                .when('/register', {
                    templateUrl: './views/user/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'model'
                })
                .when('/login', {
                    templateUrl: './views/user/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'model'
                })
                .when('/admin',{
                    templateUrl: './views/admin/admin.view.html',
                    controller: 'AdminController',
                    controllerAs: 'model'
                })
                .when('/profile', {
                    templateUrl: './views/user/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        });

})();



