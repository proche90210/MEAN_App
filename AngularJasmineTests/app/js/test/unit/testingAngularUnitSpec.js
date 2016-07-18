describe('Testing AngularJS Test Suite', function(){

  beforeEach(module('myApp'));

  describe('Testing AngularJS Home Controller', function () {
    var scope, ctrl, httpBackend;

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      scope = $rootScope.$new();
      ctrl = $controller('homeCtrl', {$scope:scope});
      httpBackend = $httpBackend;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should simulate the http request for the current temperature', function() {
        httpBackend.expectGET("http://140.203.245.123:3000/live").respond(
          {currentTemp: 24}
        );

        scope.liveTempRequest();
        httpBackend.flush();
        expect(scope.liveTemp.currentTemp).toBe(24);

    });

    it('should simulate the http request for the mongodata', function(){
        httpBackend.expectGET("http://140.203.245.123:3000/mongodata").respond(
          [
            {time: 0, temp: 25},
            {time: 1, temp: 25.2}
          ]
        );
        scope.tempRequest();
        httpBackend.flush();
        expect(scope.mongoData[0].temp).toBe(25);
    })   
  });
});
