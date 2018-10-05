var data = [];

for(var i = 0; i < 15; i++) {
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
	.attr("fill", "#7ED26D");

svg.selectAll("text")
	.data(data)
	.enter()
	.append("text")
	.text(function(d) {
		return d;
	})
	.attr("x", function(d, i) {
		return x_scale(i) + x_scale.bandwidth() / 2;
	})
	.attr("y", function(d) {
		return chart_height - y_scale(d) + 15;
	})
	.attr("fill", "#FFF")
	.attr("text-anchor", "middle")
	.attr("font-size", 14);

// Events
d3.select("button")
	.on("click", function() {
		data.reverse();

		svg.selectAll("rect")
			.data(data)
			.attr("y", function(d) {
				return chart_height - y_scale(d);
			})
			.attr("height", function(d) {
				return y_scale(d);
			});

		svg.selectAll("text")
			.data(data)
			.text(function(d) {
				return d;
			})
			.attr("x", function(d, i) {
				return x_scale(i) + x_scale.bandwidth() / 2;
			})
			.attr("y", function(d) {
				return chart_height - y_scale(d) + 15;
			})


	});