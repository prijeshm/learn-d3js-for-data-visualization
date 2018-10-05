var el = d3.select("body");
var p = el.append("p")
	// .attr("class", "foo")
	// .attr("class", "bar")

	//.attr("class", "foo bar")
	.classed("foo", true)
	.classed("bar", true)
	.text("Hello World!")
	.style("color", "blue");

console.log(p);