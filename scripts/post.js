function initPostsList() {
    $.get("/index.html", function (result) {
        $("#post_list").replaceWith($(result).filter("#post_list"));
        init();
    });
}