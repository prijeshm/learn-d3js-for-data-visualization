var data = [];

for(var i = 0; i < 10; i++) {
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
d3.select(".update")
	.on("click", function() {
		//data.reverse();
		data[0] = 50;

		y_scale.domain([0, d3.max(data)]);

		svg.selectAll("rect")
			.data(data)
			.transition()
			.duration(1000)
			//.attr("opacity", Math.random())
			//.delay(5000)
			.delay(function(d, i) {
				return i / data.length * 250;
			})
			.ease(d3.easeElasticOut)
			.attr("y", function(d) {
				return chart_height - y_scale(d);
			})
			.attr("height", function(d) {
				return y_scale(d);
			});

		svg.selectAll("text")
			.data(data)
			.transition()
			.duration(1000)
			.delay(function(d, i) {
				return i / data.length * 250;
			})
			.ease(d3.easeElasticOut)
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

// Add data
d3.select(".add")
	.on("click", function() {
		// Add new data
		var new_num = Math.floor(Math.random() * d3.max(data));
		data.push(new_num);

		// Update scales
		x_scale.domain(d3.range(data.length));
		y_scale.domain([0, d3.max(data)]);

		// Select bars
		var bars = svg.selectAll("rect").data(data);

		// Add new bar
		bars.enter()
			.append("rect")
			.attr("x", function(d, i) {
				return x_scale(i);
			})
			.attr("y", chart_height)
			.attr("width", x_scale.bandwidth())
			.attr("height", 0)
			.attr("fill", "#7ED26D")
			.merge(bars)
			.transition()
			.duration(1000)
			.attr("x", function(d, i) {
				return x_scale(i);
			})
			.attr("y", function(d) {
				return chart_height - y_scale(d);
			})
			.attr("width", x_scale.bandwidth())
			.attr("height", function(d) {
				return y_scale(d);
			});

		// Select existing labels
		var labels = svg.selectAll("text").data(data);

		// Add new labels
		labels.enter()
			.append("text")
			.text(function(d) {
				return d;
			})
			.attr("x", function(d, i) {
				return x_scale(i) + x_scale.bandwidth() / 2;
			})
			.attr("y", chart_height)
			.attr("fill", "#FFF")
			.attr("text-anchor", "middle")
			.attr("font-size", 14)
			.merge(labels)
			.transition()
			.duration(1000)
			.attr("x", function(d, i) {
				return x_scale(i) + x_scale.bandwidth() / 2;
			})
			.attr("y", function(d) {
				return chart_height - y_scale(d) + 15;
			})

	})