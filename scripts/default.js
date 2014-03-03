function init() {
    randomizeLayout();
    restoreState();
    addFilterHandlers();
}

function randomizeLayout() {
    var papers = $('.paper');
    for (var idx = 0; idx < papers.length; idx++) {
        rotateRandomly($(papers[idx]));
    }
}

function rotateRandomly(paper) {
    var rotation = (Math.random() * 20) - 10;
    var xOffset = (Math.random() * 30) - 15;
    var yOffset = (Math.random() * 30) - 15;
    paper.css('transform', 'translate(' + xOffset + 'px)' + 'rotate(' + rotation + 'deg)');
    paper.css('-webkit-transform', 'translate(' + xOffset + "," + yOffset + 'px)' + 'rotate(' + rotation + 'deg)');
    paper.css('-ms-transform', 'translate(' + xOffset + "," + yOffset + 'px)' + 'rotate(' + rotation + 'deg)');
    paper.css('-o-transform', 'translate(' + xOffset + "," + yOffset + 'px)' + 'rotate(' + rotation + 'deg)');
    paper.css('-moz-transform', 'translate(' + xOffset + "," + yOffset + 'px)' + 'rotate(' + rotation + 'deg)');
}

function restoreState() {
    var categories = _.map($('div.filter img'), function (e) {
        return $(e).data('category');
    });
    _.each(categories, function (category) {
        var show = (localStorage[category] != "hidden");
        restoreStateForCategory(category, show);
    });
    setTimeout(function () {
        $('#papers').animate({opacity: 1});
    }, 300);
}

function restoreStateForCategory(category, show) {
    if (show) {
        showPapers(category);
        showFilter(category);
    } else {
        hidePapers(category);
        hideFilter(category);
    }
}

function showPapers(category) {
    var papers = $(".paper." + category)
    papers.animate({opacity: 1});
    papers.removeClass("hidden");
    localStorage.removeItem(category);
}

function hidePapers(category) {
    var papers = $(".paper." + category)
    papers.animate({opacity: 0.05});
    papers.addClass("hidden");
    localStorage[category] = "hidden";
}

function showFilter(category) {
    var filterImg = $('.filter img[data-category=' + category + ']');
    var enabledImgSrc = filterImg.data("enabledSrc");
    filterImg.attr("src", enabledImgSrc);
}

function hideFilter(category) {
    var filterImg = $('.filter img[data-category=' + category + ']');
    var disabledImgSrc = filterImg.data("disabledSrc");
    filterImg.attr("src", disabledImgSrc);
}

function addFilterHandlers() {
    $('div.filter').click(function (event) {
        var filterImg = $(event.currentTarget).find('img');
        var category = filterImg.data("category");
        var filterImgSrc = filterImg.attr("src");
        var disabledImgSrc = filterImg.data("disabledSrc");
        var show = (filterImgSrc == disabledImgSrc);
        localStorage[category] = show ? "shown" : "hidden";
        restoreStateForCategory(category, show);
    });
}
