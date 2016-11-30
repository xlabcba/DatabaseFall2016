/**
 * Created by wendy on 3/4/16.
 */
(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieDetailController',MovieDetailController);

    //var youtubeVideoLinkBase = "https://www.youtube.com/embed/";

    function MovieDetailController($routeParams,MovieService,CommentService,UserService,FavoriteService){
        console.log("MovieDetailController");

        var vm = this;

        function init(){
            vm.movieId = $routeParams.id;
            vm.currentActiveComment = -1;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.commenttext = '';
            vm.subcommenttext ='';
            vm.currentvideo = 0;
            vm.getMovieById = getMovieById;
            vm.veriPosterImg = veriPosterImg;
            vm.getCommentSet = getCommentSet;
            vm.addComment = addComment;
            vm.addSubComment = addSubComment;
            vm.deleteComment = deleteComment;
            vm.deleteSubComment = deleteSubComment;
            vm.authPower = authPower;
            vm.activeCommentWell = activeCommentWell;
            vm.isCommentWellActive = isCommentWellActive;
            vm.islogin = islogin;
            vm.like= like;
            vm.unlike= unlike;
            vm.roundRate = roundRate;
            vm.loadLike = loadLike;
            vm.arrayToString = arrayToString;

            vm.getMovieById(vm.movieId);

        }

        init();

        function getMovieById(id){
            MovieService.getMovieById(id)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.movie = resp.data;
                        //if(!(vm.movie.poster_path===undefined||vm.movie.poster_path===''))
                        //    vm.movie.posterurl = vm.image_base_url + vm.poster_size + vm.movie.poster_path;
                        //MovieService.getMovieVideoById(vm.movie.id)
                        //    .then(function(resp) {
                        //        if (resp === undefined) {
                        //            alert("Item you are trying to search could not be found");
                        //        } else {
                        //            vm.movie.video = resp.results;
                        //            for(var i=0;i<vm.movie.video.length;i++){
                        //                vm.movie.video[i].youtubeurl = youtubeVideoLinkBase + vm.movie.video[i].key;
                        //            }
                        //        }
                        //});
                        vm.getCommentSet();
                        vm.loadLike();

                    }
            });
        }

        function getCommentSet(){
            CommentService.getCommentSet(vm.movieId)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        vm.commentSet = resp.data;
                    }
            });
        }

        function loadLike(){
            if (!UserService.islogin()) {
                return;
            } else {
                vm.curUser = UserService.getCurrentUser();
            }
            FavoriteService.isFavorite(vm.curUser._id, vm.movieId)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Get Current User Fail");
                    } else {
                        vm.likeitem = resp.data;
                        console.log(vm.likeitem);
                        //var user = resp.data;
                        //for(var i in user.like){
                        //    if(user.like[i].tviso_id==vm.movie.id&&user.like[i].type=='movie'){
                        //        vm.likeitem = true;
                        //        break;
                        //    }
                        //}
                    }
            });
        }

        function like(){
            FavoriteService.like(vm.curUser._id, vm.movieId)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Like Movie Fail");
                    } else {
                        vm.likeitem = resp.data;
                    }
                });

        }

        function unlike(){
            FavoriteService.unlike(vm.curUser._id, vm.movieId)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("UnLike Movie Fail");
                    } else {
                        vm.likeitem = resp.data;
                    }
                });
        }

        function addComment(){
            //var user = UserService.getCurrentUser();
            var comment =
            {
                "userId": vm.curUser._id,
                "movieId": vm.movieId,
                "text":vm.commenttext,
                "date":(new Date).toString(),
                "username":user.username
            };
            CommentService.createComment(comment)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Create Comment Fail");
                    } else {
                        vm.commenttext ='';
                        vm.commentSet = resp.data;
                    }
            });
        }

        function addSubComment(index){
            var user = UserService.getCurrentUser();
            var subcomment =
            {
                "text":vm.subcommenttext,
                "user_id" :user._id,
                "username":user.username,
                "date":(new Date).toString()
            };
            CommentService.createSubComment('movie',vm.movie.id,vm.commentSet.comments[index]._id, subcomment).then(function(resp){
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments[index].subcomments = resp.data;
                }
            });
        }

        function deleteComment(comment_id){
            CommentService.deleteComment('movie',vm.commentSet.tviso_id,comment_id).then(function(resp){
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments = resp.data;
                }
            });
        }

        function deleteSubComment(comment_id, subcomment_id){
            CommentService.deleteSubComment('movie',vm.movie.id,comment_id,subcomment_id).then(function(resp) {
                if (resp === undefined) {
                    alert("Create Sub Comment Fail");
                } else if (resp.length === 0) {
                    alert("Create Sub Comment Fail");
                } else {
                    vm.subcommenttext = '';
                    vm.commentSet.comments=resp.data;
                }
            });
        }

        function authPower(user_id){
            var user = UserService.getCurrentUser();
            return user!=undefined&&user!=null&&(user._id==user_id||user.rules=='admin');
        }

        function activeCommentWell(index){
            if(vm.currentActiveComment==index){
                vm.currentActiveComment = -1;
            }else {
                vm.currentActiveComment = index;
            }
        }

        function isCommentWellActive(index){
            return index == vm.currentActiveComment;
        }

        function islogin(){
            return UserService.islogin();
        }

        function veriPosterImg(imageurl){
            if(imageurl==undefined||imageurl===null){
                return './images/noposter.png';
            }else{
                return imageurl;
            }
        }

        function arrayToString(arr){
            //var str = "";
            //for(var i in arr){
            //    str = str+arr[i].name+" | ";
            //}
            //return str.substring(0,str.length-2);
            if (arr == undefined || arr.length == 0) {
                return "";
            } else {
                return arr.join(" | ");
            }
        }

        function roundRate(rate){
            return (Math.round(rate*10)).toString()+'%';
        }

    }
})();
