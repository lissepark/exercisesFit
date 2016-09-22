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

angular.module('WorkoutBuilder').controller('ExerciseDetailController', ['$scope','$location','Exercises', 'ExerciseBuilderService', 'selectedExercise',
  '$routeParams',function($scope, $location, Exercises, ExerciseBuilderService, selectedExercise,$routeParams) {
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
  $scope.create = function () {
    //$scope.submitted = true; // Will force validations
    //if ($scope.formExercise.$invalid) return;
    //$scope.exercise = ExerciseBuilderService.saveExercise();
    //$scope.formExercise.$setPristine(); //mark the form pristine after persisting the data to server on save
    //$scope.submitted = false;
    $scope.exercise = new Exercises({
      name: this.exercise.name,
      title: this.exercise.title,
      description: this.exercise.description,
      image: this.exercise.image,
      related: {},
      videos: this.exercise.related.videos,
      nameSound: this.exercise.nameSound,
      procedure: this.exercise.procedure
    });
    //$scope.exercise.related.videos = [];
    $scope.exercise.$save(function(response){
        $location.path('builder/');
    }, function(errorResponse){
        //$scope.error = errorResponse.data.message;
    });
  };
/*
  $scope.hasError = function (modelController, error) {
    return (modelController.$dirty || $scope.submitted) && error;
  };
*/
  $scope.reset = function () {
    $scope.exercise = ExerciseBuilderService.startExerciseBuilding($routeParams.id);
    $scope.formExercise.$setPristine();
    $scope.submitted = false;
  };

  $scope.addVideo = function(){
    $scope.exercise.related.videos.push($scope.videos);
    //ExerciseBuilderService.addVideo($scope.formExercise.videos);
  };

  $scope.deleteVideo = function(index){
    $scope.exercise.related.videos.splice(index,1);
    //ExerciseBuilderService.addVideo($scope.formExercise.videos);
  };

  $scope.showFileName = function() {
    $scope.nameFile = $scope.formExercise.myFile;
    $scope.exercise.image = $scope.nameFile.value;
  };

  var init = function () {
    $scope.exercise = selectedExercise; // Resolved workout
    $scope.exercise.related = {};
    $scope.exercise.related.videos = [];
  };
  init();

}]);