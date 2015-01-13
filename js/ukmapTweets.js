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
    .translate([width / 2, height / 2])

d3.json("data/uk.json", loadData);

function loadData(error, dataset) {
    if (error)
        console.log(error);
    else
        drawData(dataset);
}

function drawData(dataset){
    var ukRegions = topojson.feature(dataset, dataset.objects.subunits).features;

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

d3.json("data/usersGraph.json", function(err, dataset) {
    var nodes = dataset.nodes;
    var nodeSize = d3.scale.linear()
        .domain([1, d3.max(dataset.nodes, function(d){ return d.tweets.length})])
        .range([3, 6])

    for (var i in dataset.nodes) {
        var user = dataset.nodes[i];
        var coordinates = [d3.mean(user.tweets, getLongitude), d3.mean(user.tweets, getLatitude)];
        user.geo = coordinates;
    }

    graphics.selectAll(".tweet")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("class", "tweet")
        .attr("r", function(d){
            return nodeSize(d.tweets.length);
        })
        .style("fill", "#800014")
        .style("opacity", 0.2)
        .attr("transform", function(d) {
            return "translate(" + projection(d.geo) + ")";
        });

    graphics.selectAll(".link")
        .data(dataset.links)
        .enter()
        .append("line")
        .style("stroke", "#999")
        .style("opacity", 0.1)
        .attr("x1", function(d) { return projection(dataset.nodes[d.source].geo)[0]; })
        .attr("y1", function(d) { return projection(dataset.nodes[d.source].geo)[1]; })
        .attr("x2", function(d) { return projection(dataset.nodes[d.target].geo)[0]; })
        .attr("y2", function(d) { return projection(dataset.nodes[d.target].geo)[1]; })
        

    function getLongitude(tweet) {
        return tweet.geo.coordinates[1];
    }
    function getLatitude(tweet) {
        return tweet.geo.coordinates[0];
    }
});