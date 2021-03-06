angular.module('WorkoutBuilder').factory("ExerciseBuilderService", ['$resource','Exercises','$routeParams',
    '$location','WorkoutService', 'Exercise',
    function($resource, Exercises, $routeParams, $location, WorkoutService, Exercise) {
        var service = {};
        var buildingExercise;
        var newExercise;
        service.startExerciseBuilding = function (name) {
            //We are going to edit an existing workout
            if (name) {
                //buildingExercise = WorkoutService.getExercise(name);
                buildingExercise = Exercises.get({
                    exerciseId: name
                    //exerciseId: $routeParams.exerciseId
                }, function(exercise){
                    //return exercise;
                });
                newExercise = false;
            }
            else {
                buildingExercise = new Exercises({});
                buildingExercise.videos = [];
                newExercise = true;
            }
            return buildingExercise;
        };
/*
        service.removeExercise = function (exercise) {
            buildingWorkout.exercises.splice(buildingWorkout.exercises.indexOf(exercise), 1);
        };

        service.addExercise = function (exercise) {
            buildingWorkout.exercises.push({ details: exercise, duration: 30 });
        };
*/
        service.saveExercise = function () {
            var exercise = newExercise ? WorkoutService.addExercise(buildingExercise):
            WorkoutService.updateExercise(buildingExercise);
            newExercise = false;
            buildingExercise.$save(function(response){
                $location.path('api/exercises');
            }, function(errorResponse){
                //$scope.error = errorResponse.data.message;
            });

            return exercise;
        };
/*
        service.addVideo = function () {
            buildingExercise.related.videos.push("");
        };
*/
        return service;
    }]);