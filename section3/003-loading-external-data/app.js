d3.csv('data.csv').then(function(data) {
	console.log(data);
	//generate(data.columns)
});

d3.json('data.json').then(function(data) {
	console.log(data);
	generate(data);
})

d3.csv("people.csv").then(function(peopleData) {
	console.log(peopleData);
})

function generate(dataset) {
	var el = d3.select("body")
		.selectAll('p')
		.data(dataset)
		.enter()
			.append('p')
			.text(function(d){
				return d;
			})
			.style('color', function(d) {
				if(d > 25) {
					return "red";
				} else {
					return "blue";
				}
			})
			.attr('class', function(d) {
				if(d > 25) {
					return 'foo';
				} else {
					return null;
				}
			})
			.classed("bar", function(d) {
				return d < 25
			});
	console.log(el)
}


