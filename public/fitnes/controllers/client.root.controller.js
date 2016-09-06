angular.module('fitnes').controller('RootController', ['$scope', '$uibModal', function ($scope, $uibModal) {
      $scope.showWorkoutHistory = function () {
          var dailog = $uibModal.open({
              templateUrl: 'fitnes/views/fitness-history.html',
              controller: FitnessHistoryController,
              size: 'lg'
          });
      };

      var FitnessHistoryController = function ($scope, $uibModalInstance, fitnessHistoryTracker) {
          $scope.search = {};
          $scope.search.completed = '';
          $scope.history = fitnessHistoryTracker.getHistory();

          $scope.ok = function () {
              $uibModalInstance.close();
          };
      };
      FitnessHistoryController['$inject'] = ['$scope', '$uibModalInstance', 'fitnessHistoryTracker'];

      $scope.$on('$routeChangeSuccess', function(e,current,previous){
        $scope.currentRoute = current;
      });
      
  }]);