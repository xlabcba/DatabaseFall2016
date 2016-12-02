(function() {
    angular
        .module("MovieFanApp")
        .factory("MovieService", MovieService);

    function MovieService($http, $q) {

        var api = {

            getMovieById : getMovieById,
            findAllMovies: findAllMovies,
            searchMoviesByTitle: searchMoviesByTitle

        };
        return api;

        function getMovieById(movieId){
            return $http.get("/api/project/movie/"+movieId);
        }

        function findAllMovies(){
            return $http.get("/api/project/movie");
        }

        function searchMoviesByTitle(keyword){
            return $http.get("/api/project/search/"+keyword);
        }
    }
})();