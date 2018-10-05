var data = [6, 20, 21, 14, 2, 30, 7, 16, 25, 5, 11, 28, 10, 26, 9];

var chart_height = 400, 
	chart_width = 800
	bar_padding = 5;

// Create SVG element
var svg = d3.select("#chart")
	.append("svg")
		.attr("width", chart_width)
		.attr("height", chart_height);

// Create Scales
var x_scale = d3.scaleBand()
	.domain(d3.range(data.length))
	.rangeRound([0, chart_width])
	.paddingInner(0.05);
var y_scale = d3.scaleLinear()
	.domain([0, d3.max(data)])
	.range([0, chart_height])

//Bind data and create bars
svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		return x_scale(i);
	})
	.attr("y", function(d) {
		return chart_height - y_scale(d);
	})
	.attr("width", function(d) {
		return x_scale.bandwidth();
	})
	.attr("height", function(d) {
		return y_scale(d);
	})
	.attr("fill", "#7ED26D")
	.append("title")
	.text(function(d) {
		return d;
	});