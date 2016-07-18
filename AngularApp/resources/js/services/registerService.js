app.factory('registerService', function($http, $q){
    var regStatus;
    
    function register(username, password){
        var deferred = $q.defer();
        
        $http.post("http://140.203.245.213:3000/registerUser", {username: username, password: password}).then(function(result) {
            regStatus = result.data.regStatus;
            deferred.resolve(regStatus);
        },function(error){
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function setRegStatus(status){
        regStatus = status;
    }
    
    function getRegStatus(){
        return regStatus;
    }
    
    return {
        register: register,
        getRegStatus: getRegStatus,
        setRegStatus: setRegStatus 

    }
})


