(function(){
    angular
        .module('MovieFanApp')
        .controller('MovieDetailController',MovieDetailController);

    function MovieDetailController($routeParams,MovieService,CommentService,UserService,FavoriteService){
        console.log("MovieDetailController");

        var vm = this;

        function init(){
            vm.movieId = $routeParams.id;
            vm.currentActiveComment = -1;
            vm.image_base_url = 'http://image.tmdb.org/t/p';
            vm.poster_size='/w500';
            vm.isCommented = false;
            vm.currComment = null;
            vm.commenttext = "";

            vm.getUsersOfComments = getUsersOfComments;
            vm.getMovieById = getMovieById;
            vm.veriPosterImg = veriPosterImg;
            vm.getCommentSet = getCommentSet;
            vm.addComment = addComment;
            vm.updateComment = updateComment;
            vm.deleteComment = deleteComment;
            //vm.deleteSubComment = deleteSubComment;
            vm.authPower = authPower;
            vm.activeCommentWell = activeCommentWell;
            vm.isCommentWellActive = isCommentWellActive;
            vm.islogin = islogin;
            vm.like= like;
            vm.unlike= unlike;
            vm.roundRate = roundRate;
            vm.loadLike = loadLike;

            vm.getMovieById(vm.movieId);
            vm.loadLike();
            vm.getCommentSet();
        }

        init();

        function getMovieById(id){
            MovieService.getMovieById(id)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        console.log(resp.data);
                        vm.movie = resp.data;
                    }
            });
        }

        function getCommentSet(){
            CommentService.getCommentSet(vm.movieId)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else {
                        console.log(resp.data);
                        getUsersOfComments(resp.data);
                    }
            });
        }

        function getUsersOfComments(comments) {
            if (UserService.islogin()) {
                var curUser = UserService.getCurrentUser();
            } else {
                var curUser = null;
            }
            for (var c in comments) {
                (function() {
                    var i = c;
                    UserService
                        .findUserById(comments[i].commentedBy)
                        .then(function(response) {
                            console.log(response.data);
                            comments[i].username = response.data.username;
                        });
                    if (curUser != null && curUser.id == comments[i].commentedBy){
                        vm.isCommented = true;
                        vm.currComment = comments[i];
                        vm.commenttext = comments[i].text;
                    }
                })();
            }
            console.log(comments);
            vm.commentSet = comments;
        }

        function loadLike(){
            if (!UserService.islogin()) {
                //console.log("NOT LOGIN!!!");
                return;
            } else {
                vm.curUser = UserService.getCurrentUser();
                //console.log(vm.curUser);
            }
            FavoriteService
                .isFavorite(vm.curUser.id, vm.movieId)
                .then(function(resp){
                    console.log("GOT FAVOR");
                    console.log(resp);
                    if (resp === undefined || resp.length === 0) {
                        alert("Get Current User Fail");
                    } else {
                        vm.likeitem = resp.data[0].total;
                    }
                });
        }

        function like(){
            FavoriteService.like(vm.curUser.id, vm.movieId)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Like Movie Fail");
                    } else {
                        //vm.likeitem = resp.data;
                        //console.log(resp.data);
                        vm.loadLike();
                    }
                });

        }

        function unlike(){
            FavoriteService.unlike(vm.curUser.id, vm.movieId)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("UnLike Movie Fail");
                    } else {
                        //vm.likeitem = resp.data;
                        //console.log(resp.data);
                        vm.loadLike();
                    }
                });
        }

        function addComment(){
            if (vm.commenttext == "" || vm.commenttext == undefined || vm.commenttext == null) {
                alert("Comment cannot be empty");
                return;
            }
            //var user = UserService.getCurrentUser();
            var time = new Date().toISOString().slice(0, 19).replace('T', ' ');

            var comment =
            {
                "commentedBy": vm.curUser.id,
                "comments": parseInt(vm.movieId),
                "text":vm.commenttext,
                "createDate": time,
                "updateDate": time
            };
            CommentService.createComment(comment)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Create Comment Fail");
                    } else {
                        vm.isCommented = false;
                        vm.currComment = null;
                        vm.commenttext ='';
                        vm.getCommentSet();
                        //vm.commentSet = resp.data;
                    }
            });
        }

        function deleteComment(userId){
            CommentService.deleteComment(userId, vm.movieId)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Delete Comment Fail");
                    } else {
                        vm.isCommented = false;
                        vm.currComment = null;
                        vm.commenttext = '';
                        vm.getCommentSet();
                    }
            });
        }

        function updateComment(){
            if (vm.commenttext == "" || vm.commenttext == undefined || vm.commenttext == null) {
                alert("Comment cannot be empty");
                vm.commenttext = vm.currComment.text;
                return;
            }
            //var user = UserService.getCurrentUser();
            var time = new Date().toISOString().slice(0, 19).replace('T', ' ');

            var comment =
            {
                "text":vm.commenttext,
                "updateDate": time
            };
            CommentService.updateComment(vm.curUser.id, vm.movieId, comment)
                .then(function(resp){
                    if (resp === undefined || resp.length === 0) {
                        alert("Update Comment Fail");
                    } else {
                        vm.isCommented = false;
                        vm.currComment = null;
                        vm.commenttext = '';
                        vm.getCommentSet();
                    }
                });
        }

        function authPower(user_id){
            var user = UserService.getCurrentUser();
            return user != undefined && user!= null && user.id == user_id;
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

        function roundRate(rate){
            return (Math.round(parseFloat(rate)*10)).toString()+'%';
        }

    }
})();
