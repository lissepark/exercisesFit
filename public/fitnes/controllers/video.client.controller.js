angular.module('fitnes').controller('VideosController', ['$scope','$uibModal', function($scope,$uibModal){
	
	$scope.playVideo = function (videoId) {
          $scope.pauseWorkout();
          var dailog = $uibModal.open({
              templateUrl: 'youtube-modal',
              controller: VideoPlayerController,
              scope:$scope.$new(true),
              resolve: {
                  video: function () {  
                      return 'http://www.youtube.com/embed/' + videoId;
                  }
              },
              size: 'lg'
          }).result['finally'](function () {
              $scope.resumeWorkout();
          });
      };

      var VideoPlayerController = function ($scope, $uibModalInstance, video) {
          $scope.video = video;
          $scope.ok = function () {
              $uibModalInstance.close();
          };
      };
      VideoPlayerController['$inject'] = ['$scope', '$uibModalInstance', 'video'];

      var init = function () {
      };
      init();
}]);