(function() {
    angular
        .module("MovieFanApp")
        .factory("MovieService", MovieService);

    function MovieService($http, $q) {
        //var base = 'http://api.themoviedb.org/3';
        //var apiKey = 'a2ba7e66f0a9510643003d8fb4fae3f0';

        var api = {

            getMovieById : getMovieById,
            findAllMovies: findAllMovies,
            //getAllMovies : getAllMovies,
            //getMovieVideoById : getMovieVideoById,
            searchMoviesByTitle: searchMoviesByTitle
            //findTopRateMovie:findTopRateMovie,
            //findMovieNowPlaying:findMovieNowPlaying,
            //findMovieUpcoming:findMovieUpcoming,

        };
        return api;

        function getMovieById(movieId){
            //var deferred = $q.defer();
            //var service = '/movie/';
            //var url = base + service + id + '?api_key=' + apiKey;
            //$http({method: 'GET', url: url}).
            //success(function (response) {
            //    deferred.resolve(response);
            //}).
            //error(function (response) {
            //    deferred.resolve(response);
            //});
            //return deferred.promise;
            return $http.get("/api/project/movie/"+movieId);
        }

        function findAllMovies(){
            //var deferred = $q.defer();
            //var service = '/movie/popular';
            //var url = base + service + '?api_key=' + apiKey+'&page='+page;
            //$http({method: 'GET', url: url}).
            //success(function (response) {
            //    deferred.resolve(response);
            //}).
            //error(function (response) {
            //    deferred.resolve(response);
            //});
            //return deferred.promise;
            return $http.get("/api/project/movie");
        }

        function searchMoviesByTitle(keyword){
            return $http.get("/api/project/search/"+keyword);
        }

        //function findTopRateMovie(page){
        //    var deferred = $q.defer();
        //    var service = '/movie/top_rated';
        //    var url = base + service + '?api_key=' + apiKey+'&page='+page;
        //    $http({method: 'GET', url: url}).
        //    success(function (response) {
        //        deferred.resolve(response);
        //    }).
        //    error(function (response) {
        //        deferred.resolve(response);
        //    });
        //    return deferred.promise;
        //}
        //
        //function findMovieNowPlaying(page){
        //    var deferred = $q.defer();
        //    var service = '/movie/now_playing';
        //    var url = base + service + '?api_key=' + apiKey+'&page='+page;
        //    $http({method: 'GET', url: url}).
        //    success(function (response) {
        //        deferred.resolve(response);
        //    }).
        //    error(function (response) {
        //        deferred.resolve(response);
        //    });
        //    return deferred.promise;
        //}
        //
        //function findMovieUpcoming(page){
        //    var deferred = $q.defer();
        //    var service = '/movie/upcoming';
        //    var url = base + service + '?api_key=' + apiKey+'&page='+page;
        //    $http({method: 'GET', url: url}).
        //    success(function (response) {
        //        deferred.resolve(response);
        //    }).
        //    error(function (response) {
        //        deferred.resolve(response);
        //    });
        //    return deferred.promise;
        //}
        //
        //function getAllMovies(){
        //    var deferred = $q.defer();
        //    var service = '/movie/popular';
        //    var url = base + service + '?api_key=' + apiKey;
        //    $http({method: 'GET', url: url}).
        //    success(function (response) {
        //        deferred.resolve(response);
        //    }).
        //    error(function (response) {
        //        deferred.resolve(response);
        //    });
        //    return deferred.promise;
        //}
        //
        //function getMovieVideoById(id){
        //    var deferred = $q.defer();
        //    var service = '/movie/';
        //    var url = base + service + id + '/videos?api_key=' + apiKey;
        //    $http({method: 'GET', url: url}).
        //    success(function (response) {
        //        deferred.resolve(response);
        //    }).
        //    error(function (response) {
        //        deferred.resolve(response);
        //    });
        //    return deferred.promise;
        //}

    }
})();