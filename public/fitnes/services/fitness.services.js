angular.module('fitnes').factory('fitnessHistoryTracker', ['$rootScope','localStorageService', 
	function($rootScope,localStorageService) {
	var maxHistoryItems = 20;
	var storageKey = "fitnesshistory";
	var workoutHistory = localStorageService.get(storageKey) || [];
	//Track for last 20 exercise
	var currentWorkoutLog = null;
	var service = {};

	service.startTracking = function () {
		currentWorkoutLog = { startedOn: new Date().toISOString(),
			completed: false,
			exercisesDone: 0 
		};
		if (workoutHistory.length >= maxHistoryItems) {
			workoutHistory.shift();
		}
		workoutHistory.push(currentWorkoutLog);
		localStorageService.add(storageKey,workoutHistory);
	};

	service.endTracking = function (completed) {
		currentWorkoutLog.completed = completed;
		currentWorkoutLog.endedOn = new Date().toISOString();
		currentWorkoutLog = null;
		localStorageService.add(storageKey,workoutHistory);
	};

	service.getHistory = function () {
		return workoutHistory;
	};

	$rootScope.$on("$routeChangeSuccess", function (e, args) {
		if (currentWorkoutLog) {
			service.endTracking(false); // End the current tracking if in progress the route changes.
		}
	});

	$rootScope.$on('event:fitness:exerciseStarted', function(e,args){
		currentWorkoutLog.lastExercise = args.title;
		++currentWorkoutLog.exercisesDone;
		localStorageService.add(storageKey,workoutHistory);
	});

	return service;
}]);