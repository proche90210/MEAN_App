app.controller('homeCtrl', function($scope, $location, authService, auth, $timeout, logoutService, $interval){
    
    $scope.userDetails = auth;
    
    $timeout(function(){
        $scope.logout();
    }, 300000);

    $scope.logout = function () {
        logoutService.logout().then(function (result) {
                $location.path("/login");
        }, function (error) {
                console.error(error);
        });
    };
    
   /* $interval(function(){
        $http.get('http://140.203.245.123:3000/live').success(function(data){
            $scope.liveTemp = data;
        });
        $http.get('http://140.203.245.123:3000/mongodata').success(function(data){
            $scope.mongoData = data;
        });
    }, 1000);*/
        

    $scope.liveTemp = {currentTemp: 24};
    
    $scope.mongoData = [
        {time: 0, temp: 25},
        {time: 1, temp: 25.2},
        {time: 2, temp: 25.1},
        {time: 3, temp: 25},
        {time: 4, temp: 25.2},
        {time: 5, temp: 25.1},
        {time: 6, temp: 25},
        {time: 7, temp: 25.2},
        {time: 8, temp: 25.1},
        {time: 9, temp: 25},
        {time: 10, temp: 25.2},
        {time: 11, temp: 25.1},
        {time: 12, temp: 25},
        {time: 13, temp: 25.2},
        {time: 14, temp: 25.1},
        {time: 15, temp: 25},
        {time: 16, temp: 25.2},
        {time: 17, temp: 25.1},
        {time: 18, temp: 25},
        {time: 19, temp: 25.2},
        {time: 20, temp: 25.1}
    ];
});
