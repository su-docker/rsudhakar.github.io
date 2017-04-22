var Listing = function () {
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

    function filterByCategory() {
        var categoryName = window.location.hash.substr(1) || "programming";
        $("#papers a").addClass("hide");
        $("#papers a." + categoryName).removeClass("hide");
        $(".categories .icon").removeClass("selected");
        $(".categories .icon-"+categoryName).addClass("selected");
    }
    
    return {
        init: function () {
            randomizeLayout();
            filterByCategory();
            window.onhashchange = filterByCategory;
            if (Utils.isMobile()) {
                SidePanel.hide();
            }
        },
    }   
} ();

var Post = function () {
    return {
        init: function () {
            SidePanel.hide();
            if (Utils.isMobile()) {
                SidePanel.peek(true);
                $(".post-container").addClass("expand");
            }
        }
    }
} ();

var SidePanel = function () {
    return {
        show: function () {
            $(".side-panel").removeClass("collapse");
            $("#papers").removeClass("expand");
        },
        hide: function () {
            $(".side-panel").addClass("collapse");
            $("#papers").addClass("expand");
        },
        toggle: function () {
            $(".side-panel").toggleClass("collapse");
            $("#papers").toggleClass("expand");            
        },
        peek: function (state) {
            state ? $(".side-panel").addClass("peek") : $(".side-panel").removeClass("peek");
        }
    }
} ();

var Utils = {
    isMobile: function () {
        return $(window).width() < 600;
    }
};
