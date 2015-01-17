var margin = {top: 10, right: 10, bottom: 70, left: 50};
var width = 900 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/usersGraph.json", loadData);

function loadData(error, dataset) {
	if (error) {
		console.log(error);
	}
	else {
		drawData(dataset);
	}
};

function drawData(graph) {
	var force = d3.layout.force()
		.charge(-100)
		.linkDistance(30)
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
		.append("line");

	var node = graphics.selectAll("circle")
		.data(graph.nodes)
		.enter()
		.append("circle")
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
}