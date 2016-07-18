var app = angular.module('myApp', []);



app.controller('homeCtrl', function ($rootScope, $scope, $http) {

  $scope.tempRequest = function(){
          $http.get('http://140.203.245.123:3000/mongodata').success(function(data){
              $scope.mongoData = data;
          });
  }

  $scope.liveTempRequest = function(){
          $http.get('http://140.203.245.123:3000/live').success(function(data){
              $scope.liveTemp = data;
          });
  }
});
