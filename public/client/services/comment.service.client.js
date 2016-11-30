(function() {
    angular.module("MovieFanApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var api = {

            getCommentSet:getCommentSet,
            createComment:createComment
            //createSubComment:createSubComment,
            //deleteComment:deleteComment,
            //deleteSubComment:deleteSubComment

        };

        return api;

        function getCommentSet(movieId){
            return $http.get("/api/project/movie/"+movieId+"/comment");
        }

        function createComment(comment){
            return $http.post("/api/project/comment/", comment);
        }

        //function createSubComment(type,tviso_id,comment_id,subcomment){
        //    return $http.post("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id,subcomment);
        //}
        //
        //function deleteComment(type,tviso_id,comment_id){
        //    return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id);
        //}
        //
        //function deleteSubComment(type,tviso_id,comment_id,subcomment_id){
        //    return $http.delete("/api/project/comment/"+type+"/"+tviso_id+"/comment/"+comment_id+"/subcomment/"+subcomment_id);
        //}
    }
})();

