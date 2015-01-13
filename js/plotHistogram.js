d3.json(datafile, function(err, values) {
    if (err) {
        console.log(err);
        return;
    }
    values.sort(keywordComparator);

    var data = values.slice(0, 54);
    // A formatter for counts.
    var formatCount = d3.format(",.0f");

    var margin = {top: 10, right: 30, bottom: 80, left: 50},
        width = 900 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(data.map(function(d){ return d.keyword; }))

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.frequency; })])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.keyword) + "," + y(d.frequency) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return height - y(d.frequency); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", -11)
        .attr("x", 5)
        .attr("width", x.rangeBand())
        .attr("text-anchor", "start")
        .attr("transform", "rotate(90)")
        .text(function(d) { return formatCount(d.frequency); });

    var t_axis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    t_axis.selectAll("text")
            .attr("y", 10)
            .attr("x", 5)
            .attr("dy", ".35em")
            .attr("transform", "rotate(60)")
            .style("text-anchor", "start");

    t_axis.append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("dy", ".71em")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "1.4em")
            .text("Keyword");

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -46)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-weight", "bold")
            .style("font-size", "1.4em")
            .text("Frequency");
});