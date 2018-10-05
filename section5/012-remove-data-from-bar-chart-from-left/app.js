var data = [
	{ key: 0, num: 6 },
	{ key: 1, num: 20 },
	{ key: 2, num: 21 },
	{ key: 3, num: 14 },
	{ key: 4, num: 2 },
	{ key: 5, num: 30 },
	{ key: 6, num: 7 },
	{ key: 7, num: 16 },
	{ key: 8, num: 25 },
	{ key: 9, num: 5 },
	{ key: 10, num: 11 },
	{ key: 11, num: 28 },
	{ key: 12, num: 10 },
	{ key: 13, num: 26 },
	{ key: 14, num: 9 }
];

var key = function(d) {
	return d.key;
}

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
	.domain([0, d3.max(data, function(d) {
		return d.num;
	})])
	.range([0, chart_height])

//Bind data and create bars
svg.selectAll("rect")
	.data(data, key)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
		return x_scale(i);
	})
	.attr("y", function(d) {
		return chart_height - y_scale(d.num);
	})
	.attr("width", function(d) {
		return x_scale.bandwidth();
	})
	.attr("height", function(d) {
		return y_scale(d.num);
	})
	.attr("fill", "#7ED26D");

svg.selectAll("text")
	.data(data, key)
	.enter()
	.append("text")
	.text(function(d) {
		return d.num;
	})
	.attr("x", function(d, i) {
		return x_scale(i) + x_scale.bandwidth() / 2;
	})
	.attr("y", function(d) {
		return chart_height - y_scale(d.num) + 15;
	})
	.attr("fill", "#FFF")
	.attr("text-anchor", "middle")
	.attr("font-size", 14);

// Events
d3.select(".update").on("click", function() {
	//data.reverse();
	data[0].num = 50;

	y_scale.domain([0, d3.max(data, function(d) {
		return d.num;
	})]);

	svg.selectAll("rect")
		.data(data, key)
		.transition()
		.duration(1000)
		//.attr("opacity", Math.random())
		//.delay(5000)
		.delay(function(d, i) {
			return i / data.length * 250;
		})
		.ease(d3.easeElasticOut)
		.attr("y", function(d) {
			return chart_height - y_scale(d.num);
		})
		.attr("height", function(d) {
			return y_scale(d.num);
		});

	svg.selectAll("text")
		.data(data, key)
		.transition()
		.duration(1000)
		.delay(function(d, i) {
			return i / data.length * 250;
		})
		.ease(d3.easeElasticOut)
		.text(function(d) {
			return d.num;
		})
		.attr("x", function(d, i) {
			return x_scale(i) + x_scale.bandwidth() / 2;
		})
		.attr("y", function(d) {
			return chart_height - y_scale(d.num) + 15;
		})
});

// Add data
d3.select(".add").on("click", function() {
	// Add new data
	var new_num = Math.floor(Math.random() * d3.max(data, function(d){
		return d.num;
	}));
	data.push({ key: data[data.length - 1].key + 1, num: new_num});

	// Update scales
	x_scale.domain(d3.range(data.length));
	y_scale.domain([0, d3.max(data, function(d) {
		return d.num;
	})]);

	// Select bars
	var bars = svg.selectAll("rect").data(data, key);

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
			return chart_height - y_scale(d.num);
		})
		.attr("width", x_scale.bandwidth())
		.attr("height", function(d) {
			return y_scale(d.num);
		});

	// Select existing labels
	var labels = svg.selectAll("text").data(data, key);

	// Add new labels
	labels.enter()
		.append("text")
		.text(function(d) {
			return d.num;
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
			return chart_height - y_scale(d.num) + 15;
		})
})

// Remove data
d3.select(".remove").on("click", function() {
	// Remove first item
	data.shift();

	// Update scales
	x_scale.domain(d3.range(data.length));
	y_scale.domain([0, d3.max(data, function(d) {
		return d.num;
	})]);

	// Select bars
	var bars = svg.selectAll("rect").data(data, key);

	// Update bars
	bars.transition()
		.duration(500)
		.attr("x", function(d, i) {
			return x_scale(i);
		})
		.attr("y", function(d) {
			return chart_height - y_scale(d.num);
		})
		.attr("width", x_scale.bandwidth())
		.attr("height", function(d) {
			return y_scale(d.num);
		});

	// Remove bars
	bars.exit()
		.transition()
		.attr("x", -x_scale.bandwidth())
		.remove();


	// Select labels
	var labels = svg.selectAll("text").data(data, key);

	// Update labels
	labels.transition()
		.duration(500)
		.text(function(d) {
			return d.num;
		})
		.attr("x", function(d, i) {
			return x_scale(i) + x_scale.bandwidth() / 2;
		})
		.attr("y", function(d) {
			return chart_height - y_scale(d.num) + 15;
		});

	// Remove labels
	labels.exit()
		.transition()
		.attr("x", -x_scale.bandwidth())
		.remove();

})