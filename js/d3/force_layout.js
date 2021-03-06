    var min = 5;
    var max = 20;

    var dataSet = [];
    for (var i = 0; i < 20; i++) {
        var number = Math.floor((Math.random() * (max - min +1 )) + min)
        dataSet.push({radius:number, index: i});
    }

    var height = 300;
    var width = 900;

    var colorScale = d3.scale.category20b();

    var force = d3.layout.force()
                         .nodes(dataSet)
                         .size([width, height])
                         .charge([-100])
                         .on("tick", processTick)
                         .start();

    var svg = d3.select("#chartContainer")
                .append("svg")
                .attr("width", width)
                .attr("height", height);


    var nodes = svg.selectAll("circle")
                    .data(dataSet)
                    .enter()
                    .append("circle")
                    .attr("r", function (item, i) { return item.radius })
                    .attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
                    .style("fill", function (item, i) {
                        return colorScale(i);
                    })
                    .call(force.drag);

    function processTick() {
        nodes.attr("cx", function (d) { return d.x; })
             .attr("cy", function (d) { return d.y; });
    }