$(document).ready(function () {
    $("#watchthis").click(function () {
        SiteBlocker.setWatchThisInstead(chrome.extension.getURL("instead.html"));
        $("#status").text("YOU'RE GOOD MATE.  ");
        $("#status").append("<a href='http://gawker.com'>TRY ME</a>");
    });
    $("#makethathappen").click(function () {
        SiteBlocker.setWatchThisInstead($("#watchthatinstead").val());
        $("#status").text("GO WHERE YOU LIKE MATE.  ");
        $("#status").append("<a href='http://gawker.com'>TRY ME</a>");
    });
    $("#blockthistoo").click(function () {
        SiteBlocker.addBlockedSite($("#dontgothere").val());
        $("#status").text("G'ON AND TRY IT.  ");
        var prot = /\/\//g;
        if ($("#dontgothere").val().match(prot)) {
            $("#status").append("<a href='" + $("#dontgothere").val() + "'>TRY ME</a>");
        } else {
            $("#status").append("<a href='http://" + $("#dontgothere").val() + "'>TRY ME</a>");
        }
        showBlockList();
    });
    if (SiteBlocker.getWatchThisInstead() != chrome.extension.getURL("instead.html")) {
        $("#watchthatinstead").text(SiteBlocker.getWatchThisInstead());
    }
    showBlockList();
});
function showBlockList () {
    $("#blocklist").children().remove();
    var i=1;
    $.each(SiteBlocker.getBlockedSites(), function (index, value) {
        $("#blocklist").append("<div id='site-"+i+"'><input type='button' id='unblock-"+i+"' value='OH GO ON THEN' /> " + index + " : " + value + "</div>");
        $("#unblock-"+i).click(function () {
            SiteBlocker.removeBlockedSite(index);
            showBlockList();
        });
        i++;
    });
}