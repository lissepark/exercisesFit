'use strict';

angular.module('WorkoutBuilder').controller('WorkoutListController', ['$scope', 'WorkoutService', '$location', 
	function ($scope, WorkoutService, $location) {
      $scope.goto = function (workout) {
          $location.path('/builder/workouts/' + workout.name);
      }
      var init = function () {
          $scope.workouts = WorkoutService.getWorkouts();
      };
      init();
  }]);

angular.module('WorkoutBuilder').controller('WorkoutDetailController', ['$scope', 'WorkoutBuilderService', 'selectedWorkout',
	'$routeParams',function($scope, WorkoutBuilderService, selectedWorkout,$routeParams) {
		$scope.selected = {};

	$scope.removeExercise = function (exercise) {
        WorkoutBuilderService.removeExercise(exercise);
    };

    $scope.moveExerciseTo = function (exercise, location) {
        WorkoutBuilderService.moveExerciseTo(exercise, location);
    };	

	var restWatch = $scope.$watch('formWorkout.restBetweenExercise',function (newValue) {
		if (newValue) {
			newValue.$parsers.unshift(function (value) {
				return isNaN(parseInt(value)) ? value : parseInt(value);
			});
			newValue.$formatters.push(function (value) {
				return isNaN(parseInt(value)) ? value : parseInt(value);
			});
			restWatch(); //De-register the watch after first time.
		}
		});

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

	$scope.save = function () {
		$scope.submitted = true; // Will force validations
		if ($scope.formWorkout.$invalid) return;
		$scope.workout = WorkoutBuilderService.save();
		$scope.formWorkout.$setPristine(); //mark the form pristine after persisting the data to server on save
		$scope.submitted = false;
	};

	$scope.hasError = function (modelController, error) {
		return (modelController.$dirty || $scope.submitted) && error;
	};

	$scope.reset = function () {
		$scope.workout = WorkoutBuilderService.startBuilding($routeParams.id);
		$scope.formWorkout.$setPristine();
		$scope.submitted = false;
	};

	var init = function () {
		$scope.workout = selectedWorkout; // Resolved workout
	};
	init();
}]);