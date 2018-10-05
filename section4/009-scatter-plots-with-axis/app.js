var data = [
	[400, 200],
	[210, 140],
	[722, 300],
	[70, 160],
	[250, 50],
	[110, 280],
	[699, 225],
	[90, 220]
];

var chart_width = 800,
	chart_height = 400
	padding = 50;

// Create SVG element
var svg = d3.select("#chart")
	.append("svg")
	.attr("width", chart_width)
	.attr("height", chart_height);

// Creating Scales
var x_scale = d3.scaleLinear()
	.domain([0, d3.max(data, function(d) {
		return d[0];
	})])
	.range([padding, chart_width - padding * 2]);

var y_scale = d3.scaleLinear()
	.domain([0, d3.max(data, function(d) {
		return d[1];
	})])
	.range([chart_height - padding, padding]);

var r_scale = d3.scaleLinear()
	.domain([0, d3.max(data, function(d) {
		return d[1];
	})])
	.range([3, 50]);

// Create Axis
//var x_axis = d3.axisBottom().scale(x_scale);
var x_axis = d3.axisBottom(x_scale);
var y_axis = d3.axisLeft(y_scale);

svg.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0," + (chart_height - padding) + ")")
	.call(x_axis);
svg.append("g")
	.attr("class", "y-axis")
	.attr("transform", "translate(" + padding + ",0)")
	.call(y_axis);

// Create circles
svg.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
		.attr("cx", function(d) {
			return x_scale(d[0]);
		})
		.attr("cy", function(d) {
			return y_scale(d[1]);
		})
		.attr("r", function(d) {
			return r_scale(d[1]);
		})
		.attr("fill", "#d1ab0e");

svg.append("g").selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d.join(",")
	})
	.attr("x", function(d) {
		return x_scale(d[0]);
	})
	.attr("y", function(d) {
		return y_scale(d[1]);
	})