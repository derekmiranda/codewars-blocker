var LocalStorageHandler = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    }
    my.put = function (key, value) {
        return localStorage.setItem(key, value);
    }
    my.delete = function (key) {
        return localStorage.removeItem(key);
    }
    
    return my;

}());

var SiteBlocker = (function (LocalStorageHandler) {
    var my = {};

    my.defaults = {
        "codesmith.io" : "Codesmith",
        "facebook.com" : "Facebook",
        "twitter.com" : "Twitter",
        "youtube.com" : "YouTube",
        "reddit.com"  : "Reddit",
        "pinterest.com" : "Pinterest",
        "instagram.com" : "Instagram",
        "ebay.com" : "Ebay",
        "amazon.com" : "Amazon",
        "netflix.com" : "Netflix",
        "tumblr.com" : "Tumblr",
        "9gag.com" : "9Gag",
        "hulu.com" : "Hulu"
    }

    // set defaults on install
    if (!LocalStorageHandler.get("blocklist")) {
        LocalStorageHandler.put("blocklist", JSON.stringify(my.defaults));
    }
    
    my.getBlockedSites = function () {
        return JSON.parse(LocalStorageHandler.get("blocklist"));
    }
    
    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(LocalStorageHandler.get("blocklist"));

        var match = site.match(/^\w+\b/);
        var name = match && match[0];

        if (name) {
            name = name.split('');
            name[0] = name[0].toUpperCase();
            name = name.join('');
        } else {
            name = 'Custom Site';
        }
        my.blockedSites[site] = name;
        LocalStorageHandler.put("blocklist", JSON.stringify(my.blockedSites));
    }

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(LocalStorageHandler.get("blocklist"));
        delete my.blockedSites[site];
        LocalStorageHandler.put("blocklist", JSON.stringify(my.blockedSites));
    }
    
    return my;
}(LocalStorageHandler));