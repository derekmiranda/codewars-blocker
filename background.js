const codewarsUrl = 'https://www.codewars.com/dashboard';

chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
    blockPageUnlessCompletedTask(tab);
});

chrome.tabs.onCreated.addListener(blockPageUnlessCompletedTask);

function blockPageUnlessCompletedTask (tab) {
    chrome.storage.local.get('completedTask', (itemObj) => {
        const completedTask = itemObj['completedTask'];
        if (completedTask) {
            return;
        }

        for (site in SiteBlocker.getBlockedSites()) {
            if (tab.url.match(site)) {
                // store the wanted page in Session storage
                chrome.storage.local.set({
                    wantedPage: tab.url
                }, () => {
                    // then redirect once user has completed task
                    chrome.tabs.update(tab.id, {"url" : codewarsUrl}, function () {});
                });
            }
        }
    });
}

// if on wanted and then close --> completedTask = false
// chrome.tabs.onRemoved.addListener(reset);
// chrome.windows.onCreated.addListener(reset);
chrome.windows.onRemoved.addListener(reset);

function reset (cb) {
    chrome.storage.local.set({
        wantedPage: null,
        completedTask: false
    }, cb);  
}