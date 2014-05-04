ScatterModel = Backbone.Model.extend({

    getData: function() {
        return [
            [0.5, 0.75],
            [2.5, 0.75],
            [2.9, 3.85],
            [5, -4.75],
            [12,45.55],
            [-80,-63],
            [90, 100],
            [90, -100],
            [-100,100],
            [-100,-100]
        ];
    },

    getSalesRange: function() {
        return [-110,110];
    },

    getMarginRange: function() {
        return [-110,110];
    },

    getSalesMedian: function() {
        return [10,10];
    },

    getMarginMedian: function() {
        return [50,50];
    },

    getSalesLabel: function() {
        return "Sales (Average Unitary)";
    },

    getMarginLabel: function() {
        return "Margin Percentage";
    },

    getTooltip: function(data) {
        return "Sample Article (Id)";
    }

});
