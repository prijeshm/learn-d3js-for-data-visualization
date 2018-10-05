// Width & Height
var chart_width = 800,
	chart_height = 600;

// Projection
var projection = d3.geoAlbersUsa()
	.scale([chart_width])
	.translate([chart_width/2, chart_height/2]);

var path = d3.geoPath(projection)
	//.projection(d3.geoAlbersUsa());

// Create SVG
var svg = d3.select("#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height);

// Data
d3.json("us.json").then(function(data) {
	console.log(data);
	svg.selectAll("path")
		.data(data.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("fill", "#58CCE1")
		.attr("stroke", "#FFF")
		.attr("stroke-width", 1);
})