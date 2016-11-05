'use strict';

/* Services */
angular.module('fitnes').value("appEvents", {
        workout: { exerciseStarted: "event:fitness:exerciseStarted" }
    });

angular.module('WorkoutBuilder').factory("WorkoutBuilderService", ['$q', '$location', 'WorkoutService', 'WorkoutPlan', 'Exercise', 'Complex', 'Exercises',
    function ($q, $location, WorkoutService, WorkoutPlan, Exercise, Complex, Exercises) {
        var service = {};
        var buildingComplex = {};
        buildingComplex.exercises = [];
        var ex = [];
        var newComplex;
        service.startBuilding = function (name) {
            if (name) {
                
                return $q.all([Exercises.query().$promise, Complex.get({complexId: name}).$promise]).then(function (response) {
                    var allExercises = response[0];
                    buildingComplex = response[1];
                    var exercises2 = [];                   
                    angular.forEach(response[1].exercises, function (exercise) {
                        exercise = allExercises.filter(function (e) {return e._id === exercise;})[0];
                        exercises2.push(exercise);
                    });
                    buildingComplex.exercises = exercises2;
                    return buildingComplex;
                });
                newComplex = false;
            } else {
                buildingComplex = new Complex({});
                buildingComplex.totalWorkoutDuration = 0;
                newComplex = true;
            }
            return buildingComplex;
        };

        service.getExercises = function() {
            return buildingComplex.exercises;
        };

        service.removeExercise = function (exercise) {
            buildingComplex.exercises.splice(buildingComplex.exercises.indexOf(exercise), 1);
            timeWorkoutDuration();
            if (buildingComplex.exercises.length == 0) buildingComplex.totalWorkoutDuration = 0;
        };

        var timeWorkoutDuration = function () {
            if (buildingComplex.exercises.length == 0) return 0;
            var total = 0;
            angular.forEach(buildingComplex.exercises, function (exercise) {
                total = total + exercise.duration;
            });
            if (!buildingComplex.restBetweenExercise) {
                buildingComplex.restBetweenExercise = 10;
            };
            buildingComplex.totalWorkoutDuration = buildingComplex.restBetweenExercise * (buildingComplex.exercises.length - 1) + total;
            return buildingComplex.totalWorkoutDuration;
        };

        service.addExercise = function (exercise) {
            buildingComplex.exercises.push(exercise);
           timeWorkoutDuration();
        };

        service.saveComplex = function() {
            buildingComplex.$save(function(response){
                $location.path('builder/exercises');
            },function(errorResponse) {
                //add message
            });
        };
/*
        service.moveExerciseTo = function (exercise, toIndex) {
            if (toIndex < 0 || toIndex >= buildingWorkout.exercises) return;
            var currentIndex = buildingWorkout.exercises.indexOf(exercise);
            buildingWorkout.exercises.splice(toIndex, 0, buildingWorkout.exercises.splice(currentIndex, 1)[0]);
        };

        service.save = function () {
            var workout = newWorkout ? WorkoutService.addWorkout(buildingWorkout):
            WorkoutService.updateWorkout(buildingWorkout);
            newWorkout = false;
            return workout;
        };
*/
        return service;
    }]);

