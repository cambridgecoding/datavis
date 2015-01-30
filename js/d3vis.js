// Let's draw something

var body =d3.select("body");
var graphics = body.append("svg");
var width = 900;
var height = 600;

graphics.attr("width", width);
graphics.attr("height", height);

//graphics.append("circle")
//.attr("r", 15)   //add a circle
//.attr("cx", 20)
//    .attr("cy", 20)

//graphics.append("rect")
//.attr("x", 155)
//.attr("y", 150)
//.attr("height", 345)
//.attr("width", 50)
//
//graphics.append("rect")
//    .attr("x", 210)
//    .attr("y", 350)
//    .attr("height", 145)
//    .attr("width", 50)
//
//graphics.append("rect")
//    .attr("x", 265)
//    .attr("y", 360)
//    .attr("height", 135)
//    .attr("width", 50)
//
//graphics.append("rect")
//    .attr("x", 320)
//    .attr("y", 375)
//    .attr("height", 120)
//    .attr("width", 50)
//
//graphics.append("rect")
//    .attr("x", 375)
//    .attr("y", 400)
//    .attr("height", 95)
//    .attr("width", 50)
//
//graphics.append("rect")
//    .attr("x", 430)
//    .attr("y", 455)
//    .attr("height", 40)
//    .attr("width", 50)
//
//graphics.append("line")
//    .attr("x1", 150)
//    .attr("y1", 150)
//    .attr("x2", 150)
//    .attr("y2", 500)
//    .attr("stroke", "#000000")
//    .attr("stroke-width",2)
//
//graphics.append("line")
//    .attr("x1", 150)
//    .attr("y1", 500)
//    .attr("x2", 500)
//    .attr("y2", 500)
//    .attr("stroke", "#000000")
//    .attr("stroke-width",2)
//
//graphics.append("text")
//.text("X Axis")
//.attr("x", 510)
//.attr("y", 500)
//
//
//graphics.append("text")
//    .text("Y Axis")
//    .attr("x", 130)
//    .attr("y", 140)
//
//graphics.append("circle")
//.attr("r", 40)
//.attr("cx", 50)
//.attr("cy", 50)
//.style("fill", "#4682B4")
//.style("stroke", "#CCCCCC")
//.style("stroke-width", "3px")
//.style("opacity", "0.5")

//graphics.append("circle")
//    .attr("r", 20)
//    .attr("cx", 260)
//    .attr("cy", 260)
//    .style("fill", "#000000")
//.style("opacity", "1.0")
//
graphics.append("circle")
    .attr("r", 200)
    .attr("cx", 300)
    .attr("cy", 300)
    .style("fill", "#ffff00")
    .style("opacity", "0.5")
graphics.append("circle")
    .attr("r", 20)
    .attr("cx", 260)
    .attr("cy", 260)
    .style("fill", "#000000")
    .style("opacity", "1.0")

graphics.append("circle")
    .attr("r", 20)
    .attr("cx", 340)
    .attr("cy", 260)
    .style("fill", "#000000")
    .style("opacity", "1.0")

//graphics.append("text")
//    .text("I am drawing")
//    .attr("x", 190)
//    .attr("y", 30)
//    .attr("textanchor", "start")
//    .attr("transform","rotate(45)")
//    .attr("transform","scale(2,2)");

var arc = d3.svg.arc()
.innerRadius(80)
.outerRadius(100)
.startAngle(2.07)
.endAngle(4)

var arc2 = d3.svg.arc()
    .innerRadius(40)
    .outerRadius(50)
    .startAngle(5.5)
    .endAngle(7)

var arc2 = d3.svg.arc()
    .innerRadius(40)
    .outerRadius(50)
    .startAngle(5.5)
    .endAngle(7)

var arc3 = d3.svg.arc()
    .innerRadius(250)
    .outerRadius(260)
    .startAngle(5)
    .endAngle(8)


graphics.append("path")
    //.attr("cx", 300)
    //.attr("cy", 200)
    //.attr("arc", "start")
    .attr("transform","rotate(45)")
    .attr("transform","translate(300,300)")
.attr("d",arc);

graphics.append("path")
    //.attr("cx", 300)
    //.attr("cy", 200)
    //.attr("arc", "start")
    .attr("transform","rotate(45)")
    .attr("transform","translate(260,260)")
    .attr("d",arc2);

graphics.append("path")
    //.attr("cx", 300)
    //.attr("cy", 200)
    //.attr("arc", "start")
    //.attr("transform","rotate(90)")
    .attr("transform","translate(340,260)")
    .attr("d",arc2);

graphics.append("path")
    //.attr("cx", 300)
    //.attr("cy", 200)
    //.attr("arc", "start")
    .attr("transform","rotate(45)")
    .attr("transform","translate(300,360)")
    .attr("fill", "#D93E14")
    .attr("d",arc3);

//graphics.append("line")
//.attr("x1",100)
//.attr("y1", 300)
//.attr("x2", 85)
//.attr("y2", 300)
//.attr("stroke", "#D93E14")
//.attr("stroke-width", 5);