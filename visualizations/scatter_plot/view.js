ScatterView = Backbone.View.extend({
    el: 'svg',

    initialize: function () {
        this.totalHeight = 500;
        this.totalWidth = 600;
        this.xAxisHeight = 40;
        this.yAxisWidth = 50;
        this.topPadding = 20;
        this.rightPadding = 10;
        this.svg = d3.select(this.el);
    },

    render: function() {
        this.renderAxis();
        this.plot();
    },

    renderAxis: function() {
        this.xScale = d3.scale.linear()
            .range([0, (this.totalWidth-this.yAxisWidth-this.rightPadding)])
            .domain(this.model.getSalesRange());
        this.yScale = d3.scale.linear()
            .range([0,this.totalHeight-this.xAxisHeight-this.topPadding])
            .domain(this.model.getMarginRange());
        var xAxisGen = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom");
        var yAxisGen = d3.svg.axis()
            .scale(this.yScale)
            .orient("left");

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+ this.yAxisWidth + "," + (this.totalHeight-this.xAxisHeight) + ")")
            .call(xAxisGen)
            .append("text")
            .attr("class", "label")
            .attr("x", this.totalWidth - this.yAxisWidth)
            .attr("y", 30)
            .text(this.model.getSalesLabel());

        this.svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + this.yAxisWidth + "," + this.topPadding + ")")
            .call(yAxisGen)
            .append("text")
            .attr("class","label")
            .attr("x",0)
            .attr("y",-35)
            .text(this.model.getMarginLabel())
            .attr("transform","rotate(-90)");
    },

    plot: function() {
        var view = this;
        this.plotRegion = this.svg.append("g")
            .attr("transform","translate(" + this.yAxisWidth + ","+ this.topPadding + ")");

        this.plotRegion.selectAll(".dot")
            .data(this.model.getData())
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx",function(d) {return view.xScale(d[0])})
            .attr("cy",function(d) {return view.yScale(d[1])})
            .on("mouseover", function(data) {view.highlightPoint(view,this,data)})
            .on("mouseout", function(data) {view.trivializePoint(view,this,data)});

    },

    highlightPoint: function(view,point,data) {
        var dot = d3.select(point),
            xPix = view.xScale(data[0]),
            yPix = view.yScale(data[1]);

        //Dot styling
        dot.classed('highlight', true);
        //dot.attr("r", 7);

        //Dot to axis lines
        view.plotRegion.append('line')
            .attr('class','aid')
            .attr('x1', xPix)
            .attr('y1', yPix)
            .attr('x2', xPix)
            .attr('y2', this.totalHeight - this.xAxisHeight - this.topPadding);
        view.plotRegion.append('line')
            .attr('class','aid')
            .attr('x1', xPix)
            .attr('y1', yPix)
            .attr('x2', 0)
            .attr('y2', yPix);

        //Dot co-ordinates on the axis
        var xAxisAid = view.plotRegion.append('g')
            .attr('class','aid-axis');
        xAxisAid.append('rect')
            .attr('x',-view.yAxisWidth)
            .attr('y',view.totalHeight-view.xAxisHeight-view.topPadding)
            .attr('width',view.totalWidth)
            .attr('height', view.xAxisHeight)
        xAxisAid.append('text')
            .text(data[0])
            .attr('x',xPix)
            .attr('y',view.totalHeight-view.xAxisHeight-6)
            .style('text-anchor','middle');

        var yAxisAid = view.plotRegion.append('g')
            .attr('class','aid-axis');
        yAxisAid.append('rect')
            .attr('x',0-view.yAxisWidth)
            .attr('y',0-view.topPadding)
            .attr('width', view.yAxisWidth)
            .attr('height', view.totalHeight-view.xAxisHeight);
        yAxisAid.append('text')
            .text(data[1])
            .attr('x',-2)
            .attr('y',yPix+4)
            .style('text-anchor','end');

        //Tooltip
        var tooltip = view.plotRegion.append('g')
            .attr('class','tooltip');
        var text = tooltip.append('text')
            .attr('x', xPix)
            .attr('y', yPix - 10)
            .text(view.model.getTooltip(data));
    },

    trivializePoint: function(view,point,data) {
        var dot = d3.select(point);
        dot.classed('highlight', false);
        this.svg.selectAll('.aid').remove();
        this.svg.selectAll('.aid-axis').remove();
        this.svg.selectAll('.tooltip').remove();
    }
});
