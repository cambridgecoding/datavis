var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = 900 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var projection = d3.geo.orthographic()
	.center([-4.4, 55.4])
	.scale(5000)
	.translate([width / 2, height / 2]);

function loadData(error, dataset) {
	if (error) {
		console.log(error);
	}
	else {
		drawData(dataset);
	}
}

var zoomed = false;
function zoom(region) {
	var z = 3;
	console.log("Clicked on", region);
	
	var x, y;
	if (!zoomed) {
		var mouse = d3.mouse(this);
		x = mouse[0];
		y = mouse[1];
		z = 3;
		zoomed = true;
	} else {
		x = width / 2;
		y = height / 2;
		z = 1;
		zoomed = false;
	}
	
	graphics.transition()
		.attr("transform", 
		"translate(" + width / 2 + "," + height / 2 + ")"+
		"scale(" + z + ")"+
		"translate(" + -x + "," + -y + ")");
}

function drawData(dataset){
	var ukRegions = topojson.feature(dataset, dataset.objects.subunits).features;

	var path = d3.geo.path()
		.projection(projection);

	var color = d3.scale.ordinal()
		.domain(["ENG", "SCT", "WLS", "NIR"])
		.range(["#dcd", "#ddc", "#cdd", "#cdc"]);

	graphics.selectAll("path")
		.data(ukRegions)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", function(d) { 
			return color(d.id); 
		})

	graphics.selectAll("path")
		.on("click", zoom);
}

function loadUserData(error, dataset){
	if (error) {
		console.log(error);
	}
	else {
		drawUserData(dataset);
	}
}

var nodeSize;
function highlightTweet(tweet, i) {
	graphics
		.selectAll(".tweet")
		.transition()
		.attr("r", function(d){
			return nodeSize(d.tweets.length);
		})
		.style("opacity", 0.2);

	graphics
		.selectAll(".tweet.user"+i)
		.transition()
		.attr("r", 5)
		.style("opacity", 1);

	graphics
		.selectAll(".link")
		.transition()
		.style("opacity", 0)
	graphics
		.selectAll(".link.user"+i)
		.transition()
		.style("opacity", 1)
}
	
function drawUserData(dataset) {
	nodeSize = d3.scale.linear()
		.domain([1, d3.max(dataset.nodes, function(d){ return d.tweets.length})])
		.range([3, 6])

	for (var i = 0; i < dataset.nodes.length; i++) {
		var user = dataset.nodes[i];
		var coordinates = [d3.mean(user.tweets, getLongitude), d3.mean(user.tweets, getLatitude)];
		user.geo = coordinates;
	}

	graphics.selectAll(".link")
		.data(dataset.links)
		.enter()
		.append("line")
		.attr("class", function(d){
			return "link user"+d.source+" user"+d.target;
		})
		.style("stroke", "#999")
		.style("opacity", 0.1)
		.attr("x1", function(d) { 
			return projection(dataset.nodes[d.source].geo)[0];
		})
		.attr("y1", function(d) { 
			return projection(dataset.nodes[d.source].geo)[1]; 
		})
		.attr("x2", function(d) { 
			return projection(dataset.nodes[d.target].geo)[0]; 
		})
		.attr("y2", function(d) { 
			return projection(dataset.nodes[d.target].geo)[1]; 
		});

	graphics.selectAll(".tweet")
		.data(dataset.nodes)
		.enter()
		.append("circle")
		.attr("class", function(d, i){ 
			return "tweet user"+i;
		})
		.attr("r", function(d){
			return nodeSize(d.tweets.length);
		})
		.style("fill", "#800014")
		.style("opacity", 0.2)
		.attr("transform", function(d) {
			return "translate(" + projection(d.geo) + ")";
		});

	graphics.selectAll(".tweet")
		.on("click", highlightTweet);
}

function getLongitude(tweet) {
	return tweet.geo.coordinates[1];
}
function getLatitude(tweet) {
	return tweet.geo.coordinates[0];
}

d3.json("data/uk.json", loadData);
d3.json("data/usersGraph.json", loadUserData);