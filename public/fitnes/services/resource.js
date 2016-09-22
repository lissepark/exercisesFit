angular.module('fitnes').factory('Exercises', ['$resource',function($resource) {
    return $resource('api/exercises/:exerciseId', {
                    articleId: '@_id'
                }, {
                    update: {
                    method: 'PUT'
                }
        });
}]);