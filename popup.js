$(document).ready(function(){
    console.log('Popup')
    $.each(SiteBlocker.getBlockedSites(), function (index, value) {
        $("#blockedlist").append("<div class='siterow' title='"+value+"'><div class='sitename'>"+index+"</div><span class='sitedesc'> : "+value+"</span></div>");
    });
});