var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = 900 - margin.left - margin.right;
var height = 900 - margin.top - margin.bottom;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/uk.json", loadData);

function loadData(error, dataset) {
	if (error)
		console.log(error);
	else
		drawData(dataset);
}

function drawData(dataset){
	var ukRegions = topojson.feature(dataset, dataset.objects.subunits).features;

	var projection = d3.geo.orthographic()
		.center([-4.4, 55.4])
		.scale(6000)
		.translate([width / 2, height / 2])

	var path = d3.geo.path()
		.projection(projection);

	var color = d3.scale.ordinal()
		.domain(["ENG", "SCT", "WLS", "NIR"])
		.range(["#dcd", "#ddc", "#cdd", "#cdc"]);

	graphics.selectAll(".subunit")
		.data(ukRegions)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", function(d) { return color(d.id); })
}
