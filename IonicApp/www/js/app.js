// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('myApp', ['ionic', 'ngRoute']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function ($routeProvider) {

  $routeProvider


    .when('/', {
      templateUrl: 'pages/circle.html',
      controller: 'myCtrl'
    })

    .when('/graph', {
      templateUrl: 'pages/graph.html',
      controller: 'myCtrl'
    })
});

app.controller('myCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){

  $interval(function(){
    $http.get('http://192.168.24.241:3000/live').success(function(data){
      $scope.liveTemp = data;
    });
    $http.get('http://192.168.24.241:3000/mongodata').success(function(data){
      $scope.mongoData = data;
    });
  }, 1000);
}]);

app.directive('tempCircle', function() {

  return {

    restrict: 'EA',
    replace: false,

    //store data from radius-data in views
    scope: {data: '=radiusData'},
    link: function (scope) {



      var directiveElement = angular.element( document.querySelector( '#tempGraphRemove' ) );
      directiveElement.remove();



      //scale which maps values to colours
      var color = d3.scale.linear()
        .domain([21, 24])
        .range(["blue", "red"]);

      //create an svg canvas
      var canvas = d3.select("body").append("svg")
        .attr("class", "circle")
        .attr("id", "tempCircleRemove")
        .attr("width", 320)
        .attr("height", 370);

      //move group to the middle of the page
      var group = canvas.append("g")
        .attr("transform", "translate(100, 100)");

      scope.$watch('data', function(newVal){
        //remove all text and circles and create news ones each time temp changes
        canvas.selectAll("path").remove();
        canvas.selectAll("text").remove();
        var r = (newVal)*4; //to make the circle larger
        var p = Math.PI*2;

        //blueprint for the arc
        var arc = d3.svg.arc()
          .innerRadius(r - 15)
          .outerRadius(r)
          .startAngle(0)
          .endAngle(p);

        //append temperature text to middle of the circle
        group.append("text")
          .attr("class", "circleText")
          .attr("x", -20)
          .attr("y", 5)
          .text(scope.data + "°");

        //draw the arc and colour it - newVal is used as r was changed (multiplied by 5)
        group.append("path")
          .attr("d", arc)
          .attr("fill", function(){ return color(newVal) });
      });
    }
  };
});



app.directive('tempGraph', function ($parse) {

  return {

    restrict: 'EA',

    replace: false,

    link: function (scope, elem, attrs){



      var directiveElement = angular.element( document.querySelector( '#tempCircleRemove' ) );
      directiveElement.remove();


      var exp = $parse(attrs.graphData);
      var dataToPlot = exp(scope);

      //create an svg canvas
      var canvas = d3.select("body").append("svg")
        .attr("class", "graph")
        .attr("id", "tempGraphRemove")
        .attr("width", 350)
        .attr("height", 250);

      scope.$watchCollection(exp, function(newVal){

        dataToPlot=newVal;

        canvas.selectAll("path").remove();
        canvas.selectAll("g").remove();

        var xScale = d3.scale.linear()
          .domain([dataToPlot[0].time, dataToPlot[dataToPlot.length-1].time])
          .range([20, 250]);

        var yScale = d3.scale.linear()
          .domain([30, 18])
          .range([20, 130]);

        var xAxis = d3.svg.axis()
          .scale(xScale)
          .ticks(5)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(yScale)
          .ticks(5)
          .orient("left");

        var line = d3.svg.line()
          .x(function(d){
            return xScale(d.time);
          })
          .y(function(d){
            return yScale(d.temp);
          })
          .interpolate("basis");

        var xLabel = canvas.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(60,200)")
          .call(xAxis);

        var yLabel = canvas.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(80,68)")
          .call(yAxis);

        canvas.append("path")
          .attr("class", "pathClass")
          .attr("transform", "translate(60,68)")
          .attr("d", line(dataToPlot));

        xLabel.append("text")
          .attr("class", "x label")
          .attr("transform", "translate(100, 40)")
          .text("Seconds (s)");

        yLabel.append("text")
          .attr("class", "y label")
          .attr("transform", "rotate(-90)")
          .attr("x", -120)
          .attr("y", -35)
          .text("Temperature (°)");

      });
    }
  }
});





