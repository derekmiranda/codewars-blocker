const codewarsUrl = 'https://www.codewars.com/dashboard';

if (!SiteBlocker.getWatchThisInstead()) {
    SiteBlocker.setWatchThisInstead(chrome.extension.getURL("instead.html"));
}
chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
    var completedTask = localStorage.getItem('completedTask');

    if (completedTask) {
        // don't redirect when going to wanted page
        // localStorage.setItem('completedTask', false);
    } else {
        for (site in SiteBlocker.getBlockedSites()) {
            if (tab.url.match(site)) {
                // store the wanted page in Session storage
                localStorage.setItem('wantedPage', tab.url);
                // then redirect once user has completed task
                
                chrome.tabs.update(tabId, {"url" : codewarsUrl}, function () {
                    // localStorage.setItem('wantedPage', null);
                });
            }
        }

        // TODO: check if there's any elements with class name "solutions_view" i.e. solved coding challenge

    }


    
});

chrome.tabs.onCreated.addListener(function(tab) {
    for (site in SiteBlocker.getBlockedSites()) {
        if (tab.url.match(site)) {
            chrome.tabs.update(tab.id, {"url" : codewarsUrl}, function () {});
        }
    }
});

// if on wanted and then close --> completedTask = false
chrome.tabs.onRemoved.addListener(function() {
    localStorage.setItem('completedTask', false);
})