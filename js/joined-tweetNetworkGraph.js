var drawNetwork;
var highlightUserNetwork;
(function(){
	var margin = {top: 10, right: 10, bottom: 70, left: 700};
	var width = 1400 - margin.left - margin.right;
	var height = 600 - margin.top - margin.bottom;

	var graphics = d3.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	drawNetwork = function (graph) {
		var force = d3.layout.force()
			.charge(-40)
			.linkDistance(10)
			.size([width, height]);

		force.nodes(graph.nodes)
			.links(graph.links)
			.start();

		var circleSize = d3.scale.linear()
			.domain([1, 20])
			.range([3, 10]);

		var line = graphics.selectAll("line")
			.data(graph.links)
			.enter()
			.append("line")

		var node = graphics.selectAll(".networkNode")
			.data(graph.nodes)
			.enter()
			.append("circle")
			.attr("class", function(d, i) { return "networkNode user"+i+" component"+d.component; })
			.attr("r", function(d){
			  return circleSize(d.weight);
			})
			.call(force.drag);

		node.append("title")
			.text(function(d) { return d.name; });

		force.on("tick", function() {
		  	line.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; }); 
		});

		highlightUserNetwork = function(d, i){
			graphics
				.selectAll("circle")
				.transition()
				.style("fill", "#4682B4");

			graphics
				.selectAll("circle.component"+d.component)
				.transition()
				.style("fill", "#800014");
		}	
	}

}());