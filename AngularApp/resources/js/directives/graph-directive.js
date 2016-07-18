app.directive('tempGraph', function ($parse) {

    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, elem, attrs){
            
            var directiveElement = angular.element( document.querySelector( '#tempCircleRemove' ) );
            directiveElement.remove();
            
            var exp = $parse(attrs.graphData);
            var graphData = exp(scope);

            //create an svg canvas
            var canvas = d3.select("#data-display").append("svg")
                .attr("class", "graph")
                .attr("id", "tempGraphRemove")
                .attr("width", 800)
                .attr("height", 500);

            scope.$watchCollection(exp, function(newVal){

                graphData=newVal;

                canvas.selectAll("path").remove();
                canvas.selectAll("g").remove();

                var xScale = d3.scale.linear()
                    .domain([graphData[0].time, graphData[graphData.length-1].time])
                    .range([20, 700]);

                var yScale = d3.scale.linear()
                    .domain([30, 18])
                    .range([20,350]);

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(yScale)
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
                    .attr("transform", "translate(80,373)")
                    .call(xAxis);

                var yLabel = canvas.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(100,20)")
                    .call(yAxis);

                canvas.append("path")
                    .attr("class", "pathClass")
                    .attr("transform", "translate(80,20)")
                    .attr("d", line(graphData))

                xLabel.append("text")
                    .attr("class", "x label")
                    .attr("transform", "translate(325, 50)")
                    .text("Seconds (s)");

                yLabel.append("text")
                    .attr("class", "y label")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -270)
                    .attr("y", -50)
                    .text("Temperature (°)");

            });
        }
    }
});