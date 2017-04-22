function init() {
    randomizeLayout();    
    initSidePanel();
}

function randomizeLayout() {
    var papers = $('.paper');
    for (var idx = 0; idx < papers.length; idx++) {
        rotateRandomly($(papers[idx]));
    }
}

function rotateRandomly(paper) {
    var rotation = (Math.random() * 20) - 10;
    var transform = 'rotate(' + rotation + 'deg)';
    paper.css('transform', transform);
    paper.css('-webkit-transform', transform);
    paper.css('-ms-transform', transform);
    paper.css('-o-transform', transform);
    paper.css('-moz-transform', transform);
}

function initSidePanel() {
    initShowHide();
    initCategorySelector();
}

function initShowHide() {
    $(".side-panel .control").click(function () {
        $(".side-panel").toggleClass("collapse");
        $("#papers").toggleClass("expand");
    });
    if (isMobile()) {
        $(".side-panel .control").click();
    }
}

function initCategorySelector() {
    $(".categories .icon").click(function (e) {
        var categorySelector = $(e.currentTarget);
        var categoryName = categorySelector.data("category");
        $("#papers a").addClass("hide");
        $("#papers a." + categoryName).removeClass("hide");
        $(".categories .icon").removeClass("selected");
        categorySelector.addClass("selected");
        window.location.hash = categoryName;
    });
    var selector = (window.location.hash) ? ".icon-" + window.location.hash.substr(1) : ".icon-programming" 
    $(".categories "+selector).click();
}

function isMobile() {
    return $(window).width() < 600;
}