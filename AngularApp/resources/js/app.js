
var app = angular.module('myApp', ['ui.router']);




app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'resources/js/pages/login.html',
            controller: 'loginCtrl'
            
        })
    
        .state('register', {
            url: '/register',
            templateUrl: 'resources/js/pages/register.html',
            controller: 'registerCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'resources/js/pages/home.html',
            controller: 'homeCtrl',
            resolve: {
                auth: function ($q, authService, $location, $timeout) {
                    var userDetails = authService.getUserDetails();
                    if (userDetails) {
                        return $q.when(userDetails);
                    } else {
                        $timeout(function(){
                            $location.path('/login');
                        }, 5);
                        return $q.reject({ authenticated: false });
                    }
                }
            }
        })
    
        .state('home.circle', {   
            url: '/circle',
            templateUrl: 'resources/js/pages/home.circle.html',
            controller: 'homeCtrl'
        })
    
        .state('home.graph', {
            url: '/graph',
            templateUrl: 'resources/js/pages/home.graph.html',
            controller: 'homeCtrl'
        });
    
    $urlRouterProvider.otherwise('/login');
    
}]);

app.filter('capitalize', function() {
  return function(username) {
      return username.charAt(0).toUpperCase() + username.slice(1);
   }
});