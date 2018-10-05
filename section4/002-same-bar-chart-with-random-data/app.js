var data = [];

for(var i = 0; i < 20; i++) {
	//var num = Math.floor(Math.random() * 50);
	var num = Math.floor(d3.randomUniform(1, 50)());
	data.push(num);
}

//console.log(data);

var chart = d3.select("#chart")
	.selectAll("div")
	.data(data)
	.enter()
	.append("div")
		.attr("class", "bar")
		.style("height", function(d) {
			return (d * 3) + "px";
		})