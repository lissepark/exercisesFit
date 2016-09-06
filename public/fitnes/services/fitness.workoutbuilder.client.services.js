'use strict';

/* Services */
angular.module('fitnes').value("appEvents", {
        workout: { exerciseStarted: "event:fitness:exerciseStarted" }
    });

angular.module('WorkoutBuilder').factory("WorkoutBuilderService", ['WorkoutService', 'WorkoutPlan', 'Exercise', 
    function (WorkoutService, WorkoutPlan, Exercise) {
        var service = {};
        var buildingWorkout;
        var newWorkout;
        service.startBuilding = function (name) {
            //We are going to edit an existing workout
            if (name) {
                buildingWorkout = WorkoutService.getWorkout(name);
                newWorkout = false;
            }
            else {
                buildingWorkout = new WorkoutPlan({});
                newWorkout = true;
            }
            return buildingWorkout;
        };

        service.removeExercise = function (exercise) {
            buildingWorkout.exercises.splice(buildingWorkout.exercises.indexOf(exercise), 1);
        };

        service.addExercise = function (exercise) {
            buildingWorkout.exercises.push({ details: exercise, duration: 30 });
        };

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

        return service;
    }]);

