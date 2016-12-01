(function() {
    angular.module("MovieFanApp")
        .factory("FavoriteService", FavoriteService);

    function FavoriteService($http) {

        var api = {

            isFavorite:isFavorite,
            like:like,
            unlike:unlike

        };
        return api;

        function isFavorite(userId, movieId){
            //return $http.get("/api/project/user/"+userId+"/movie/"+movieId);
            return $http.get("/api/project/favorite?userId="+userId+"&movieId="+movieId);
        }

        function like(userId, movieId) {
            return $http.post("/api/project/user/"+userId+"/movie/"+movieId);
        }

        function unlike(userId, movieId) {
            console.log("HERE!!!");
            return $http.put("/api/project/user/"+userId+"/movie/"+movieId);
        }

    }
})();

