$(document).ready(function () {
    $("#blockthistoo").click(function () {
        updateList();
    });

    $("#dontgothere").keypress(e => {
        // Enter
        if (e.which === 13) updateList();
    });

    showBlockList();
});

function updateList() {
    SiteBlocker.addBlockedSite($("#dontgothere").val());
    var prot = /\/\//g;
    if ($("#dontgothere").val().match(prot)) {
        $("#status").append("<a href='" + $("#dontgothere").val() + "'>Try me now!</a>");
    } else {
        $("#status").append("<a href='http://" + $("#dontgothere").val() + "'>Try me now!</a>");
    }
    $("#dontgothere").val('');
    showBlockList();
}

function showBlockList () {
    $("#blocklist").children().remove();
    var i=1;
    $.each(SiteBlocker.getBlockedSites(), function (index, value) {
        $("#blocklist").append("<div id='site-"+i+"'><input type='button' id='unblock-"+i+"' value='I surrender...' /> " + index + " : " + value + "</div>");
        $("#unblock-"+i).click(function () {
            SiteBlocker.removeBlockedSite(index);
            showBlockList();
        });
        i++;
    });
}