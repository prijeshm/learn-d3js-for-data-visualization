// Data
var data = [35, 6, 20, 47, 19];
var chart_width = 600,
	chart_height = 600;
var color_scale = d3.scaleOrdinal(d3.schemeCategory10)

// Pie Layout
var pie = d3.pie();

// Arc
var inner_radius = chart_width / 4;
var outer_radius = chart_width / 2;
var arc = d3.arc()
	.innerRadius(inner_radius)
	.outerRadius(outer_radius);

// Draw Pie Chart
var svg = d3.select("#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height);

// Groups
var arcs = svg.selectAll("g.arc")
	.data(pie(data))
	.enter()
	.append("g")
	.attr("class", "arc")
	.attr("transform", "translate(" + outer_radius + ", " + chart_width / 2 + ")");

// Arcs
arcs.append("path")
	.attr("fill", function(d, i) {
		return color_scale(i);
	})
	.attr("d", arc);

// Labels
arcs.append("text")
	.attr("transform", function(d) {
		return "translate(" + arc.centroid(d) + ")";
	})
	.attr("text-anchor", "middle")
	.text(function(d) {
		return d.value;
	})