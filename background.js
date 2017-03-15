const codewarsUrl = 'https://www.codewars.com/dashboard';

if (!SiteBlocker.getWatchThisInstead()) {
    SiteBlocker.setWatchThisInstead(chrome.extension.getURL("instead.html"));
}
chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
    blockPageUnlessCompletedTask(tab);
});

chrome.tabs.onCreated.addListener(blockPageUnlessCompletedTask);

function blockPageUnlessCompletedTask (tab) {
    var completedTask = JSON.parse(localStorage.getItem('completedTask'));
    if (completedTask) {

    } else {
        for (site in SiteBlocker.getBlockedSites()) {
            if (tab.url.match(site)) {
                // store the wanted page in Session storage
                localStorage.setItem('wantedPage', tab.url);
                // then redirect once user has completed task
                
                chrome.tabs.update(tab.id, {"url" : codewarsUrl}, function () {
                    // localStorage.setItem('wantedPage', null);
                });
            }
        }
    }
}

// if on wanted and then close --> completedTask = false
// chrome.tabs.onRemoved.addListener(reset);
chrome.windows.onRemoved.addListener(reset);
chrome.windows.onCreated.addListener(reset);

function reset () {
    localStorage.setItem('completedTask', 'false');
    localStorage.setItem('wantedPage', '');    
}