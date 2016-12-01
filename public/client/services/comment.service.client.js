(function() {
    angular.module("MovieFanApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {

            getCommentSet:getCommentSet,
            createComment:createComment,
            updateComment:updateComment,
            deleteComment:deleteComment
            //deleteSubComment:deleteSubComment

        };

        return api;

        function getCommentSet(movieId){
            return $http.get("/api/project/movie/"+movieId+"/comment");
        }

        function createComment(comment){

            return $http.post("/api/project/comment", comment);
        }

        function updateComment(userId, movieId, comment){
            return $http.put("/api/project/comment/user/"+userId+"/movie/"+movieId, comment);
        }

        function deleteComment(userId, movieId){
            console.log("IN CLIENT");
            console.log(userId);
            console.log(movieId);
            return $http.delete("/api/project/comment/user/"+userId+"/movie/"+movieId);
        }

        //function deleteSubComment(type,tviso_id,comment_id,subcomment_id){
        //    return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id+"/subcomment/"+subcomment_id);
        //}
    }
})();

