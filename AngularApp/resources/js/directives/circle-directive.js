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
            var canvas = d3.select("#data-display").append("svg")
                .attr("class", "circle")
                .attr("id", "tempCircleRemove")
                .attr("width", 400)
                .attr("height", 400);
            
            //move group to the middle of the page
            var group = canvas.append("g")
                .attr("transform", "translate(100, 100)");

            scope.$watch('data', function(newVal){
                //remove all text and circles and create news ones each time temp changes
                canvas.selectAll("path").remove();
                canvas.selectAll("text").remove();
                r = (newVal)*5; //to make the circle larger
                var p = Math.PI*2;

                //blueprint for the arc
                var arc = d3.svg.arc()
                    .innerRadius(r - 20)
                    .outerRadius(r)
                    .startAngle(0)
                    .endAngle(p);

                //append temperature text to middle of the circle
                group.append("text")
                    .attr("class", "circleText")
                    .attr("x", -28)
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

