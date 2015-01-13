d3.json("data/usersGraph.json", loadData);

function loadData(error, dataset) {
	if (error)
		console.log(error);
	else {
		drawTweetsMap(dataset);
		drawNetwork(dataset);
		setupInteraction();
	}
}

function setupInteraction() {
	d3.selectAll(".tweet")
		.on("click", function(d, i){
			highlightUser(d, i);
			highlightUserNetwork(d, i);
		});

	d3.selectAll(".networkNode")
		.on("click", function(d, i){
			highlightUser(d, i);
			highlightUserNetwork(d, i);
		});
	
}
