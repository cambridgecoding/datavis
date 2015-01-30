var width = 900;
var height = 700;

var graphics = d3.select("body")
	.append("svg")
	.attr("width", width)
	.attr("height", height);

// Don't forget to change the data file name!
d3.json("data/uk.json", loadData);

function loadData(error, dataset) {
	if (error) {
		console.log(error);
	}
	else {
		console.log(dataset);
		drawData(dataset);
	}
};

function drawData(dataset) {
	// Draw your data
}