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
            //vm.page = 1;
            //vm.filtervalue = 'popular';
            vm.veriPosterImg = veriPosterImg;
            vm.getMovies = getMovies;
            //vm.getTopRate = getTopRate;
            //vm.getNowPlaying = getNowPlaying;
            //vm.getUpcoming = getUpcoming;
            vm.searchMovie = searchMovie;
            //vm.changefilter = changefilter;
            //vm.changePage = changePage;
            //vm.Filters = [
            //    {"value":"popular","label":"Popular"},
            //    {"value":"toprate","label":"Top Rate"},
            //    {"value":"nowplaying","label":"Now Playing"},
            //    {"value":"upcoming","label":"Upcoming"},
            //    {"value":"search","label":"Search"}
            //];
            //vm.selectedfilter = vm.Filters[0];
            vm.movielist = [];
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

        //function getTopRate(){
        //    MovieService.findTopRateMovie(vm.page)
        //        .then(function(resp) {
        //            if (resp === undefined || resp==null || resp.length === 0) {
        //                vm.page = vm.page - 1;
        //                alert("Not more item");
        //            } else {
        //                vm.movielist = resp.results;
        //                for (i = 0; i < resp.results.length; i++) {
        //                    if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
        //                        vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
        //                }
        //            }
        //        });
        //}

        //function getNowPlaying(){
        //    MovieService.findMovieNowPlaying(vm.page)
        //        .then(function(resp) {
        //            if (resp === undefined || resp==null || resp.length === 0) {
        //                vm.page = vm.page - 1;
        //                alert("Not more item");
        //            } else {
        //                vm.movielist = resp.results;
        //                for (i = 0; i < resp.results.length; i++) {
        //                    if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
        //                        vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
        //                }
        //            }
        //        });
        //}

        //function getUpcoming() {
        //    MovieService.findMovieUpcoming(vm.page)
        //        .then(function(resp) {
        //            if (resp === undefined || resp==null || resp.length === 0) {
        //                vm.page = vm.page - 1;
        //                alert("Not more item");
        //            } else {
        //                vm.movielist = resp.results;
        //                for (i = 0; i < resp.results.length; i++) {
        //                    if (vm.movielist[i].poster_path != null && vm.movielist[i].poster_path !== '')
        //                        vm.movielist[i].posterurl = vm.image_base_url + vm.poster_size + vm.movielist[i].poster_path;
        //                }
        //            }
        //        });
        //}


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

        //function changefilter(filtervalue){
        //    vm.page = 1;
        //    vm.filtervalue = filtervalue.value;
        //    if(filtervalue.value=='popular'){
        //        vm.getPopular();
        //    }else if(filtervalue.value=='toprate'){
        //        vm.getTopRate();
        //    }else if(filtervalue.value=='nowplaying'){
        //        vm.getNowPlaying();
        //    }else if(filtervalue.value=='upcoming'){
        //        vm.getUpcoming();
        //    }else{
        //        vm.searchMovie();
        //    }
        //}

        //function changePage(page){
            //vm.page = page;
            //if(vm.filtervalue=='popular'){
            //    vm.getPopular();
            //}else if(vm.filtervalue=='toprate'){
            //    vm.getTopRate();
            //}else if(vm.filtervaluee=='nowplaying'){
            //    vm.getNowPlaying();
            //}else if(vm.filtervalue=='upcoming'){
            //    vm.getUpcoming();
            //}else{
            //    vm.searchMovie();
            //}
        //}

    }
})();
