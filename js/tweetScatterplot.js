var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// setup x 
var xValue = function(d) { return d.geo.longitude;}, // data -> value
    xScale = d3.scale.linear() // value -> display
                .range([0, width]);
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.geo.latitude;}, // data -> value
    yScale = d3.scale.linear() // value -> display
                .range([height, 0]);
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");


// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load data
d3.json("data/tweets-coordinates-1hour.json", function(error, data) {
  xScale.domain([-10, 3]);
  yScale.domain([49, 61]);
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Longitude");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Latitude");

  // draw the dots for tweets
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 2.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "rgba(128, 0, 20, 0.1)");
});