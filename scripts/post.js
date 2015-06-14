function initPost() {
    initPostsList();
    //initIframe();
}

function initPostsList() {
    $.get("/index.html", function (result) {
        $("#post_list").replaceWith($(result).filter("#post_list"));
        init();
    });
}

//function initIframe() {
//    _.each($('iframe'), function(iframe) {
//        console.log($(iframe).attr("src"));
//    });
//}