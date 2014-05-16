var svg = d3.select('svg');
var groupColors = d3.scale.category10();

//Switcher viz
var switchers = svg.selectAll('.switcher')
    .data(dataSets)
    .enter()
    .append("g")
    .attr("class", "switcher");

switchers.attr("transform", function (d, i) {
    return "translate(" + (i * 70 + 50) + ",40)";
})
switchers.append("ellipse")
    .attr("rx", 40)
    .attr("ry", 30);
switchers.append("text")
    .style("text-anchor", "middle")
    .attr("dy", ".3em")
    .text(function (d) {
        return d.name
    });
switchers.on("click", function (d) {
    d3.select('.switcher.selected').classed('selected', false);
    d3.select(this).classed('selected', true);
    reload(d);
});


//Data viz
var dim = 650;
var offset = [100, 120];
var pack = d3.layout.pack().size([dim, dim]).value(function (d) {
    return d.size
});
var format = d3.format(",d");

var group = svg.append("g");
group.attr("transform", "translate(" + offset[0] + "," + offset[1] + ")");
group.append('text')
    .attr("class","title")
    .attr("x", function() {return 280})
    .attr("y", -10);

function reload(data) {
    group.select('.title')
        .text(function() {return data.name});

    var node = group.selectAll('.node')
        .data(pack.nodes(data), function (d) {
            return d['name']
        });
    var newNodes = node.enter()
        .append("g")
        .attr("class", function (d) {
            return d.root ? "root node" : (d.children ? "trunk node" : "leaf node");
        })
        .attr("transform", function (d) {
            return "translate(325,325)";
        });
    newNodes.append("circle");
    newNodes.filter(function (d) {
        return !d.children;
    }).append("text");

    var exitNodes = node.exit();
    exitNodes.select('text').remove();
    exitNodes.select('circle')
        .transition()
        .attr("r", function (d) {
            return 0
        })
        .duration(500)
    exitNodes
        .transition().delay(500).remove();

    node
        .transition()
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .duration(2000);

    node.select("circle")
        .transition()
        .delay(1000)
        .attr("r", function (d) {
            return d.r;
        })
        .duration(1000);

    node.filter(function (d) {
        return !d.children;
    }).select("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .transition()
        .text(function (d) {
            return d.name.substring(0, d.r / 3);
        })
        .delay(2000);
    node.on("mouseover", showTooltip);
    node.on("mouseout", hideTooltip);

    group.selectAll('.trunk circle').style("fill", function (d, i) {
        return groupColors(i)
    });
}

function showTooltip(event) {
    var size = [300, 100];
    var data = d3.select(this).data()[0];
    var tooltip = svg.append("g").attr("class", "tooltip");
    var pointerSize = 8;

    tooltip.attr("transform", "translate(" + (data.x + offset[0] - size[0] / 2) + "," + (data.y + offset[1] - data.r - size[1] - pointerSize) + ")");

    tooltip.append("rect")
        .attr("width", size[0]).attr("height", size[1])
        .attr("rx", 4);
    var pointer = [(data.x + offset[0]), (data.y + offset[1] - data.r)];

    var lowerTriangle = [
        [size[0] / 2, size[1] + pointerSize].join(","),
        [size[0] / 2 - pointerSize, size[1]].join(","),
        [size[0] / 2 + pointerSize, size[1]].join(",")].join(" ");
    tooltip.append("polygon")
        .attr("points", lowerTriangle);

    tooltip.append("text")
        .attr("class", "heading")
        .attr("x", 10)
        .attr("y", 20)
        .text(function () {
            return format(data.value) + " crores"
        });
    tooltip.append("text")
        .attr("class", "description")
        .attr("x", 10)
        .attr("y", 50)
        .text(function () {
            return data.name
        });
}

function hideTooltip(event) {
    svg.select('.tooltip').remove();
}

//Load first dataset
//svg.select('.switcher').classed('selected',true);
reload(budget2014_2015);
switchers.filter(function(d) { return d == budget2014_2015 }).classed('selected',true)