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

    my.blockTheseSites = {
        "gawker.com"        : "Gawker Media",
        "io9.com"           : "SciFi Blog",
        "gizmodo.com"       : "Gadget Blog",
        "kotaku.com"        : "Video Game Blog",
        "jalopnik.com"      : "Car Blog",
        "lifehacker.com"    : "Productivity Blog",
        "deadspin.com"      : "Sports Blog",
        "jezebel.com"       : "Celebrity Blog",
        "fleshbot.com"      : "Porn Blog",
        "gawker.tv"         : "Gawker.TV",
        "cityfile.com"      : "Notable People Blog"
    }
    
    if (!LocalStorageHandler.get("blocklist")) {
        LocalStorageHandler.put("blocklist", JSON.stringify(my.blockTheseSites));
    }
    
    my.getBlockedSites = function () {
        return JSON.parse(LocalStorageHandler.get("blocklist"));
    }
    
    my.setWatchThisInstead = function (value) {
        var prot = /^http|chrome-extension/i;
        if (value.match(prot)) {
            LocalStorageHandler.put("instead", value);
        } else {
            LocalStorageHandler.put("instead", "http://" + value);
        }
        return LocalStorageHandler.get("instead");
    }

    my.getWatchThisInstead = function () {
        return LocalStorageHandler.get("instead");        
    }
    
    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(LocalStorageHandler.get("blocklist"));
        my.blockedSites[site] = "Custom Add";
        LocalStorageHandler.put("blocklist", JSON.stringify(my.blockedSites));
    }

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(LocalStorageHandler.get("blocklist"));
        delete my.blockedSites[site];
        LocalStorageHandler.put("blocklist", JSON.stringify(my.blockedSites));
    }
    
    return my;
}(LocalStorageHandler));