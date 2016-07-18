app.controller('loginCtrl', function($scope, $location, $rootScope, $http, $window, authService, registerService){

    $scope.login = function () {
        authService.login($scope.username, $scope.password).then(function (result) {
            if(!result){
                $scope.loginFailed = true;
                $scope.regMessage = '';
                $scope.reset();
            } else {
                $location.path("/home");
            }
        }, function (error) {
                console.log(error);
        });
    };

    $scope.reset = function () {
        $scope.username = "";
        $scope.password = "";
    };
    
    if(registerService.getRegStatus()){
        $scope.regMessage = 'Registered Successfully';
        registerService.setRegStatus(false);
    } else {
        $scope.regMessage = '';
    }
       
});