'use strict';

angular.module('WorkoutBuilder').controller('ExercisesNavController', ['$scope', 'WorkoutService', 'WorkoutBuilderService',
  function ($scope, WorkoutService,WorkoutBuilderService) {
      var init = function () {
          $scope.exercises = WorkoutService.getExercises();
      };

      $scope.addExercise = function (exercise) {
        WorkoutBuilderService.addExercise(exercise);
      };

      init();
  }]);

angular.module('WorkoutBuilder').controller('ExerciseListController', ['$scope', 'WorkoutService', '$location', 
  function ($scope, WorkoutService, $location) {
      $scope.goto = function (exercise) {
          $location.path('/builder/exercises/' + exercise.name);
      }
      var init = function () {
          $scope.exercises = WorkoutService.getExercises();
      };
      init();
  }]);

angular.module('WorkoutBuilder').controller('ExerciseDetailController', ['$scope', 'ExerciseBuilderService', 'selectedExercise',
  '$routeParams',function($scope, ExerciseBuilderService, selectedExercise,$routeParams) {
    //$scope.selected = {};
/*
  $scope.removeExercise = function (exercise) {
        ExerciseBuilderService.removeExercise(exercise);
    };

    $scope.moveExerciseTo = function (exercise, location) {
        ExerciseBuilderService.moveExerciseTo(exercise, location);
    };  
*/
  var exerciseDurationWatch = $scope.$watch('formExercise.duration',function (newValue) {
    if (newValue) {
      newValue.$parsers.unshift(function (value) {
        return isNaN(parseInt(value)) ? value : parseInt(value);
      });
      newValue.$formatters.push(function (value) {
        return isNaN(parseInt(value)) ? value : parseInt(value);
      });
      exerciseDurationWatch(); //De-register the watch after first time.
    }
    });
/*
  $scope.$watch('formWorkout.exerciseCount', function (newValue) {
    if (newValue) {
    newValue.$setValidity("count",$scope.workout.exercises.length > 0);
  }});

  $scope.$watch('workout.exercises.length',function (newValue, oldValue) {
    if (newValue != oldValue) {
    $scope.formWorkout.exerciseCount.$dirty = true;
    $scope.formWorkout.$setDirty();
    $scope.formWorkout.exerciseCount.$setValidity("count", newValue > 0);
  }});
*/
  $scope.save = function () {
    $scope.submitted = true; // Will force validations
    if ($scope.formExercise.$invalid) return;
    $scope.exercise = ExerciseBuilderService.saveExercise();
    $scope.formExercise.$setPristine(); //mark the form pristine after persisting the data to server on save
    $scope.submitted = false;
  };
/*
  $scope.hasError = function (modelController, error) {
    return (modelController.$dirty || $scope.submitted) && error;
  };
*/
  $scope.reset = function () {
    $scope.exercise = ExerciseBuilderService.startExerciseBuilding($routeParams.id);
    $scope.formWorkout.$setPristine();
    $scope.submitted = false;
  };

  $scope.addVideo = function(){
    ExerciseBuilderService.addVideo($scope.exercise.videos);
  };

  var init = function () {
    $scope.exercise = selectedExercise; // Resolved workout
  };
  init();
}]);