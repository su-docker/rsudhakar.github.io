var REGEX_KEY = "pairing-matrix-reloaded:regex";

$(document).ready(
    function () {
        $("#pairing_text").keyup(displayPairNames);
        $("#regex").keyup(displayPairNames);

        $("#go").click(function () {
            $('.accordion-toggle').trigger("click");
            var pairs = regexMatch();
            var model = convert(pairs);
            draw(model);
        });

        var previousRegex = localStorage[REGEX_KEY];
        if(previousRegex) {
            $("#regex").val(previousRegex);
        }
    }
)

function displayPairNames() {
    var matches = regexMatch();
    var matches_with_line_breaks = _.reduce(matches, function (text, v) {
        return text + v[0] + "," + v[1] + "\n"
    }, "");
    $("#pairing_names").val(matches_with_line_breaks);
}

function regexMatch() {
    var text = $("#pairing_text").val(),
        regexText = $("#regex").val(),
        regex = new RegExp(regexText),
        pairs = [];
    localStorage[REGEX_KEY] = regexText;
    _.forEach(text.split("\n"), function (commit) {
        var matches = regex.exec(commit);
        console.log(matches);
        if (matches != null) {
            pairs.push([matches[1].trim().toLowerCase(), matches[2].trim().toLowerCase()]);
        } else {
            pairs.push([null, null]);
        }
    });
    return pairs;
}

function convert(pairs) {
    //var pairs_count = _.countBy(pairs, function(pair){return pair});
    var unique_pairs_count = _.countBy(pairs, function (pair) {
        return _.sortBy(pair, function (person) {
            return person;
        })
    });
    var required_format = _.map(_.pairs(unique_pairs_count), function (model) {
        return _.flatten([model[0].split(','), model[1]])
    });
    return required_format;
}

function draw(model) {
    var playground = new PlayGround(".area");
    playground.load(model);

}