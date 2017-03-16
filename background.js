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
                    triedBlockedPage: true,
                    wantedPage: tab.url
                }, () => {
                    // then redirect once user has completed task
                    chrome.tabs.update(tab.id, {"url" : codewarsUrl}, () => {});
                });
            }
        }

        // check triedBlockedPage
        chrome.storage.local.get(['triedBlockedPage', 'wantedPage'], items => {
            const triedBlockedPage = items['triedBlockedPage'];
            const wantedPage = items['wantedPage'];

            // will redirect if you've solved a challenge (forrealsies)
            if (tab.url.match(/codewars\.com.+\/solutions\b(?!.+show\-solutions=1)/i)) {
                chrome.storage.local.set({
                    completedTask: true
                }, () => {
                    if (triedBlockedPage) chrome.tabs.update(tab.id, {"url" : wantedPage}, () => {});
                });
            }
        })
    });
}

// if on wanted and then close --> completedTask = false
// chrome.tabs.onRemoved.addListener(reset);
// chrome.windows.onCreated.addListener(reset);
chrome.windows.onRemoved.addListener(reset);

function reset () {
    chrome.storage.local.clear();
}
