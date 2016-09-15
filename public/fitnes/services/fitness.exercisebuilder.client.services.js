angular.module('WorkoutBuilder').factory("ExerciseBuilderService", ['WorkoutService', 'Exercise', 
    function (WorkoutService, Exercise) {
        var service = {};
        var buildingExercise;
        var newExercise;
        service.startExerciseBuilding = function (name) {
            //We are going to edit an existing workout
            if (name) {
                buildingExercise = WorkoutService.getExercise(name);
                newExercise = false;
            }
            else {
                buildingExercise = new Exercise({});
                buildingExercise.related.videos = [];
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
            return exercise;
        };
/*
        service.addVideo = function () {
            buildingExercise.related.videos.push("");
        };
*/
        return service;
    }]);