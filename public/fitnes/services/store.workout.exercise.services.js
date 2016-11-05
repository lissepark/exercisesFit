'use strict';

/* Services */
angular.module('fitnes').value("appEvents", {
        workout: { exerciseStarted: "event:fitness:exerciseStarted" }
    });

angular.module('fitnes').factory("WorkoutService", ['WorkoutPlan', 'Exercise', 'Exercises', 'Complex',
  function (WorkoutPlan, Exercise, Exercises, Complex) {
        var service = {};
        var workouts = [];
        var exercises = [];
        service.getExercises = function () {
            exercises = Exercises.query();
            return exercises;
        };

        service.getWorkouts = function () {
            workouts = Complex.query();
            return workouts;
        };

	service.getWorkout = function (name) {
            var result = null;
            angular.forEach(service.getWorkouts(), function (workout) {
                if (workout.name === name) result = angular.copy(workout);
            });
            return result;
        };

    service.getExercise = function (name) {
            var result = null;
            angular.forEach(service.getExercises(), function (exercise) {
                if (exercise.name === name) result = angular.copy(exercise);
            });
            return result;
        };

        service.updateWorkout = function (workout) {
            var workoutIndex;
            for (var i = 0; i < workouts.length; i++) {
                if (workouts[i].name === workout.name) {
                    workouts[i] = workout;
                    break;
                }
            }
            return workout;
        };

        service.updateExercise = function (exercise) {
            var exerciseIndex;
            for (var i = 0; i < exercises.length; i++) {
                if (exercises[i].name === exercise.name) {
                    exercises[i] = exercise;
                    break;
                }
            }
            return exercise;
        };

        service.addWorkout = function (workout) {
            if (workout.name) {
                workouts.push(workout);
                return workout;
            }
        };

        service.addExercise = function (exercise) {
            if (exercise.name) {
                exercises.push(exercise);
                return exercise;
            }
        };

        var init = function () {
            service.getWorkouts();
        };

        init();
        return service;
    }]);

