var data = [];

for(var i = 0; i < 5; i++) {
	//var num = Math.floor(Math.random() * 50);
	var num = Math.floor(d3.randomUniform(1, 50)());
	data.push(num);
}

//console.log(data);

var chart_height = 400, 
	chart_width = 800
	bar_padding = 5;
// Create SVG element
var svg = d3.select("#chart")
	.append("svg")
		.attr("width", chart_width)
		.attr("height", chart_height);

//Bind data and create bars
svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		return i * (chart_width / data.length);
	})
	.attr("y", function(d) {
		return chart_height - (d * 5);
	})
	.attr("width", function(d) {
		return (chart_width / data.length) - bar_padding;
	})
	.attr("height", function(d) {
		return d * 5;
	})
	.attr("fill", "#7ED26D");

svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d;
	})
	.attr("x", function(d, i) {
		return i * (chart_width / data.length) + (chart_width / data.length - bar_padding) / 2;
	})
	.attr("y", function(d) {
		return chart_height - (d * 5) + 15;
	})
	.attr("fill", "#FFF")
	.attr("text-anchor", "middle")
	.attr("font-size", 14)