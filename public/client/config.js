/**
 * Created by wendy on 4/3/16.
 */
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
                //.when('/movie_list', {
                //    templateUrl: './views/movielist/home.view.html',
                //    controller: 'MovieController',
                //    controllerAs: 'model'
                //    //resolve: {
                //    //    getLoggedIn: getLoggedIn
                //    //}
                //})
                .when('/movie_detail/:id', {
                    templateUrl: './views/movie/moviedetail.view.html',
                    controller: 'MovieDetailController',
                    controllerAs: 'model'
                    //resolve: {
                    //    getLoggedIn: getLoggedIn
                    //}
                })
                //.when('/tv_list', {
                //    templateUrl: './views/tvlist/tvlist.view.html',
                //    controller: 'TvController',
                //    controllerAs: 'model',
                //    resolve: {
                //        getLoggedIn: getLoggedIn
                //    }
                //})
                //.when('/tv_detail/:id', {
                //    templateUrl: './views/tvdetail/tvdetail.view.html',
                //    controller: 'TvDetailController',
                //    controllerAs: 'model',
                //    resolve: {
                //        getLoggedIn: getLoggedIn
                //    }
                //})
                //.when('/tv_season/:id/:tvname/season/:season_number',{
                //    templateUrl: './views/tvseason/tvseason.view.html',
                //    controller: 'TvSeasonController',
                //    controllerAs:'model',
                //    resolve: {
                //        getLoggedIn: getLoggedIn
                //    }
                //})
                //.when('/actor_list',{
                //    templateUrl:'./views/actorlist/actorlist.view.html',
                //    controller: 'ActorController',
                //    controllerAs: 'model',
                //    resolve: {
                //        getLoggedIn: getLoggedIn
                //    }
                //})
                //.when('/actor_detail/:id',{
                //    templateUrl:'./views/actordetail/actordetail.view.html',
                //    controller: 'ActorDetailController',
                //    controllerAs: 'model',
                //    resolve: {
                //        getLoggedIn: getLoggedIn
                //    }
                //})
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
                //.when('/admin',{
                //    templateUrl: './views/admin/admin.view.html',
                //    controller: 'AdminController',
                //    controllerAs: 'model'
                //})
                .when('/profile', {
                    templateUrl: './views/user/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model'
                })
                //.when('/logout', {
                //    templateUrl: './views/home/home.view.html',
                //    controller: 'HomeController',
                //    controllerAs: 'model'
                //})
                .otherwise({
                    redirectTo: '/home'
                });

        });

    //function getLoggedIn(UserService, $q) {
    //var getLoggedIn($q) {
        //var deferred = $q.defer();
        //return deferred.promise;
        //var deferred = $q.defer();
        //
        //UserService
        //    .getProfile()
        //    .then(function(response) {
        //        var curUser = response.data;
        //        if(curUser) {
        //            UserService.setCurrentUser(curUser);
        //            deferred.resolve();
        //        } else {
        //            UserService.setCurrentUser(null);
        //            deferred.resolve();
        //        }
        //    });
        //return deferred.promise;
    //}

    //MovieFanApp.config(function($sceDelegateProvider) {
    //    $sceDelegateProvider.resourceUrlWhitelist([
    //        'self',
    //        'https://www.youtube.com/**',
    //        'http://image.tmdb.org/t/p/**',
    //        'http://api.themoviedb.org/3'
    //    ]);
    //});
})();



