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
	// .on("mouseover", function() {
	// 	d3.select(this)
	// 		.transition()
	// 		.duration(250)
	// 		.attr("fill", "#0C9CDF");
	// })
	// .on("mouseout", function() {
	// 	d3.select(this)
	// 		.transition("back_to_old_color")
	// 		.duration(250)
	// 		.attr("fill", "#7ED26D");
	// })
	.on("click", function(d){
		//console.log(d)
		svg.selectAll("rect")
			.sort(function(a, b) {
				return d3.ascending(a, b);
			})
			.transition("sort")
			.duration(1000)
			.attr("x", function(d, i) {
				return x_scale(i);
			});
		svg.selectAll("text")
			.sort(function(a, b) {
				return d3.ascending(a, b);
			})
			.transition()
			.duration(1000)
			.attr("x", function(d, i) {
				return x_scale(i) + x_scale.bandwidth() / 2;
			});
	});

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
	.attr("font-size", 14)
	.style("pointer-events", "none");