$(document).ready(function () {
    $("#watchthis").click(function () {
        GB.setWatchThisInstead(chrome.extension.getURL("instead.html"));
        $("#status").text("YOU'RE GOOD MATE.  ");
        $("#status").append("<a href='http://gawker.com'>TRY ME</a>");
    });
    $("#makethathappen").click(function () {
        GB.setWatchThisInstead($("#watchthatinstead").val());
        $("#status").text("GO WHERE YOU LIKE MATE.  ");
        $("#status").append("<a href='http://gawker.com'>TRY ME</a>");
    });
    $("#blockthistoo").click(function () {
        GB.addBlockedSite($("#dontgothere").val());
        $("#status").text("G'ON AND TRY IT.  ");
        var prot = /\/\//g;
        if ($("#dontgothere").val().match(prot)) {
            $("#status").append("<a href='" + $("#dontgothere").val() + "'>TRY ME</a>");
        } else {
            $("#status").append("<a href='http://" + $("#dontgothere").val() + "'>TRY ME</a>");
        }
        showBlockList();
    });
    if (GB.getWatchThisInstead() != chrome.extension.getURL("instead.html")) {
        $("#watchthatinstead").text(GB.getWatchThisInstead());
    }
    showBlockList();
});
function showBlockList () {
    $("#blocklist").children().remove();
    var i=1;
    $.each(GB.getBlockedSites(), function (index, value) {
        $("#blocklist").append("<div id='site-"+i+"'><input type='button' id='unblock-"+i+"' value='OH GO ON THEN' /> " + index + " : " + value + "</div>");
        $("#unblock-"+i).click(function () {
            GB.removeBlockedSite(index);
            showBlockList();
        });
        i++;
    });
}