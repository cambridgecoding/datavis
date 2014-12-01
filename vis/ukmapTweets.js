var width = 960,
    height = 1160;

var projection = d3.geo.albers()
    .center([0, 55.4])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(1200 * 5)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/uk.json", function(error, uk) {
    svg.selectAll(".subunit")
            .data(topojson.feature(uk, uk.objects.subunits).features)
        .enter().append("path")
            .attr("class", function(d) { return "subunit " + d.id; })
            .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary");

    svg.append("path")
        .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === "IRL"; }))
        .attr("d", path)
        .attr("class", "subunit-boundary IRL");

    d3.json("data/tweets-sunday30Nov-UK-coordinates.json", function(err, coordinates) {
        svg.selectAll(".tweet")
                .data(coordinates)
            .enter()
                .append("circle")
                .attr("r", 2.5)
                .attr("class", "tweet")
                .style("fill", "rgba(128, 0, 20, 0.2)")
                .attr("transform", function(d) { return "translate(" + projection([d.geo.longitude, d.geo.latitude]) + ")"; });
    });
});
