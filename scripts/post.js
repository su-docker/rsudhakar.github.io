$(document).on('click', "#post_backdrop", function (event) {
    var targetId = $(event.target).attr("id");
    console.log(targetId);
    if (targetId == "post_backdrop") {
        $("#post_backdrop").fadeOut();
    }
});