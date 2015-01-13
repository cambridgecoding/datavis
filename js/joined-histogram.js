var drawHistogram;

(function(){
	var margin = {top: 500, right: 10, bottom: 70, left: 50};
	var width = 1400 - margin.left - margin.right;
	var height = 700 - margin.top - margin.bottom;

	var graphics = d3.select("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	drawHistogram = function(dataset){
		var boundData = graphics.selectAll("rect")
			.data(dataset);

		var yScale = d3.scale.linear()
			.domain([0, d3.max(dataset, function(d) { return d.frequency; })])
			.range([height, 0]);

		var xScale = d3.scale.ordinal()
			.domain(dataset.map(function(d){ return d.keyword; }))
			.rangeBands([0, width]);

		boundData.enter()
			.append("rect")
			.attr("x", function(d, i){ return xScale(d.keyword); })
			.attr("y", function(d){ return yScale(d.frequency); })
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) { return height-yScale(d.frequency); })
			.style("fill", "#4682B4")
			.style("stroke", "#CCCCCC")
			.style("stroke-width", "1px");

		boundData.enter()
			.append("text")
			.text(function(d) { return d.frequency })
			.attr("x", function(d, i){ return xScale(d.keyword); })
			.attr("y", function(d){ return yScale(d.frequency); })
			.style("font-size", "11px")

		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

		graphics.append("g")
			.call(yAxis)
			.attr("class", "y axis");

		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");

		graphics.append("g")	
			.call(xAxis)
			.attr("class", "x axis")
			.attr("transform", "translate(0," +height + ")");

		graphics.selectAll(".x.axis text")
			.style("text-anchor", "start")
			.style("transform", "rotate(60deg) translate(10px, -5px) ");
	}
}());
