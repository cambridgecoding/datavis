/**
 * Created by pjn on 30/01/15.
 */
var width = 900;
var height = 700;

var graphics = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.orthographic()
    .center([-4.4, 55.4])
    .scale(4000)
    .translate([width / 2, height / 2]);


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
    var ukRegions = topojson.feature(dataset,
    dataset.objects.subunits).features;

    var path = d3.geo.path()
        .projection(projection);
    var color = d3.scale.ordinal()
        .domain(["ENG", "SCT", "WLS", "NIR"])
        .range(["#CC0000", "#003399", "#33CC33", "#006600"]);

    graphics.selectAll("path")
        .data(ukRegions)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(region){
            return color(region.id);
        }
    );

}

function loadUserData(error, dataset) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(projection([0.1275,51.5072]));
        drawUserData(dataset);
    }
};

//function get_coordinates(d) {
//    var lon = d.tweets[0].geo.coordinates[0];
//    var lat = d.tweets[0].geo.coordinates[1];
//    var coordinates =[lat, lon];
//    console.log(d, coordinates)
//    return "translate(" + projection(coordinates) +")";
//}

function getLongitude (d){
    return d.geo.coordinates[1];
}

function getLatitude (d){
    return d.geo.coordinates[0];
}

function get_coordinates(d) {
    //var coordinates = [d3.mean(d.tweets,getLongitude), d3.mean(d.tweets,getLatitude)];
    //console.log(d, coordinates)
    return "translate(" + projection(d.geo) +")";
}



function drawUserData(dataset){
    for(var i =0; i < dataset.nodes.length; i++){
        var user = dataset.nodes[i];
        var coordinates = [d3.mean(user.tweets, getLongitude), d3.mean(user.tweets, getLatitude)];
        user.geo = coordinates;
    }
    //The new visualisation
    //for (var i =0; i < dataset.nodes.length; i++) {

    var circleSize = d3.scale.linear()
        .domain([0,5])
        .range([0,1])

        graphics.selectAll(".tweet")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr("class", "tweet")
            .attr("r", function(user) {

                return circleSize(user.tweets.length);
            })
            .style("fill", "#000066")
            .style("opacity", 0.5)
            .attr("transform", get_coordinates);
    //}
        graphics.selectAll(".link")
            .data(dataset.links)
            .enter()
            .append("line")
            .style("stroke", "#999")
            .style("opacity", 0.4)
            .attr("x1", function (d) {
                return projection(dataset.nodes[d.source].geo)[0];
            })
            .attr("y1", function (d) {
                return projection(dataset.nodes[d.source].geo)[1];
            })
            .attr("x2", function (d) {
                return projection(dataset.nodes[d.target].geo)[0];
            })
            .attr("y2", function (d) {
                return projection(dataset.nodes[d.target].geo)[1];
            })



}
d3.json("data/usersGraph.json", loadUserData)