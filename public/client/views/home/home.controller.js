(function(){
    angular
        .module('MovieFanApp')
        .controller('HomeController', HomeController);

    function HomeController(MovieService, $route,$location,$routeParams){
        console.log("HomeController");

        var vm = this;

        function init() {
            vm.$route = $route;
            vm.$location = $location;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.movielist = [];
            vm.veriPosterImg = veriPosterImg;
            vm.getMovies = getMovies;
            vm.searchMovie = searchMovie;
            vm.getMovies();
        }
        init();

        function getMovies(){
            MovieService.findAllMovies()
                .then(function(resp) {
                    vm.keyword = "";
                    vm.showSearchResult = "";
                    vm.movielist = resp.data;
                });
        }


        function searchMovie(){
            if (vm.keyword == "" || vm.keyword == undefined || vm.keyword == null) {
                vm.getMovies();
            } else {
                MovieService.searchMoviesByTitle(vm.keyword)
                    .then(function(resp) {
                        vm.movielist = resp.data;
                        vm.showSearchResult = vm.keyword;
                        vm.keyword = "";
                    });
            }
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return './images/noposter.png';
            }else{
                return imageurl;
            }
        }

    }
})();
