function init() {
    randomizeLayout();
    restoreState();
    addFilterHandlers();
    addPaperHandlers();
    addBrowserBackHandler();

    $(document).on('click', "#post_backdrop", function (event) {
        var targetId = $(event.target).attr("id");
        if (targetId == "post_backdrop") {
            $("#post_backdrop").fadeOut();
        }
    });
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
    toggleDeselectButton(false);
    var categories = getAllCategories();
    _.each(categories, function (category) {
        var show = (localStorage[category] != "hidden");
        restoreStateForCategory(category, show);
        if(!show) {
            toggleDeselectButton(true);
        }
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
    localStorage[category] = (show ? "shown" : "hidden");
}

function addPaperHandlers() {
    $(".paper").on('click', function(e) {
        var paper = $(e.currentTarget);
        var postUrl = paper.attr("ajax-href");
        $.get(postUrl, function(result) {
            history.pushState({post: true, url: postUrl},null,postUrl);
            $("#post_backdrop").replaceWith($(result).filter("#post_backdrop"));
        });
    });
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

function addBrowserBackHandler() {
    window.onpopstate = function(e) {
        window.location.href = document.location;
    };
}

function addFilterHandlers() {
    $('i.selector').click(function() {
        var selectedCategory = $(event.currentTarget).data("category");
        _.each(getAllCategories(), function(category) {
            var show = (category == selectedCategory);
            restoreStateForCategory(category, show);
        });
        toggleDeselectButton(true);
    });

    $('i.icon-deselect').click(function() {
        _.each(getAllCategories(), function(category) {
           restoreStateForCategory(category, true);
        });
        toggleDeselectButton(false);
    });
}

function toggleDeselectButton(show) {
    $('i.icon-deselect').toggle(show);
}

function getAllCategories() {
    return _.collect($('i.selector'), function(selector) { return $(selector).data("category")});
}
