app.factory("authService", function($http, $q, $window) {
    var userDetails;

  function login(username, password) {
    var deferred = $q.defer();

    $http.get("http://140.203.245.213:3000/login/" + username + "/" + password).then(function(result) {
        if(result.data.success){
            userDetails = {
                accessToken: result.data.access_token,
                username: result.data.username
            };
        }else{
            userDetails = null;
        }
        $window.sessionStorage["userDetails"] = JSON.stringify(userDetails);
            deferred.resolve(userDetails);
        }, function(error) {
            deferred.reject(error);
        });

    return deferred.promise;
  }
    
    function init() {
        if ($window.sessionStorage["userDetails"]) {
            userDetails = JSON.parse($window.sessionStorage["userDetails"]);
        }
    }
    init();

    function getUserDetails() {
        return userDetails;
    }
    
    function setUserDetails(newDetails){
        userDetails = newDetails;
    }
    
    return {
        login: login,
        getUserDetails: getUserDetails,
        setUserDetails: setUserDetails
    };
});