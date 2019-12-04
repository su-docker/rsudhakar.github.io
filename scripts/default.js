var Listing = function () {
    function randomizeLayout() {
        var papers = $('.paper');
        for (var idx = 0; idx < papers.length; idx++) {
            rotateRandomly($(papers[idx]));
        }
    }
    
    function rotateRandomly(paper) {
        var rotation = (Math.random() * 10) - 5;
        var transform = 'rotate(' + rotation + 'deg)';
        paper.css('transform', transform);
        paper.css('-webkit-transform', transform);
        paper.css('-ms-transform', transform);
        paper.css('-o-transform', transform);
        paper.css('-moz-transform', transform);
    }

    function drawSquigglyPath() {
        $("#papers svg path").each(function (i, path) {
            $(path).attr("d", Squiggly.rectangle(10, 10, 250, 245));
        });
    }
    
    return {
        init: function () {
            randomizeLayout();
            drawSquigglyPath();
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

var MyDetails = function () {
    return {
        toggle: function () {
            if (!$(".side-panel").hasClass('collapse')) {
                $(".side-panel .details").toggle();
                ga('send', 'event', 'MyName', 'view', 'MyDetails');
            }
        }
    }
} ();

var Utils = {
    isMobile: function () {
        return $(window).width() < 600;
    }
};
