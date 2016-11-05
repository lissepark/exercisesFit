angular.module('fitnes').factory('Exercises', ['$resource',function($resource) {
    return $resource('api/exercises/:exerciseId', {
                    exerciseId: '@_id'
                }, {
                    update: {
                    method: 'PUT'
                }
        });
}]);

angular.module('fitnes').factory('Complex', ['$resource',function($resource) {
    return $resource('api/complexes/:complexId', {
                    complexId: '@_id'
                }, {
                    update: {
                    method: 'PUT'
                }
        });
}]);