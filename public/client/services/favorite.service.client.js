(function() {
    angular.module("MovieFanApp")
        .factory("FavoriteService", FavoriteService);

    function FavoriteService($http) {

        var api = {

            isFavorite:isFavorite

        };
        return api;

        function isFavorite(userId, movieId){
            return $http.get("/api/project/user/"+userId+"/movie/"+movieId);
        }

    }
})();

