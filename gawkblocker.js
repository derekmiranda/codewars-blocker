var SM = (function () {

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

var GB = (function (SM) {
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
    
    if (!SM.get("blocklist")) {
        SM.put("blocklist", JSON.stringify(my.blockTheseSites));
    }
    
    my.getBlockedSites = function () {
        return JSON.parse(SM.get("blocklist"));
    }
    
    my.setWatchThisInstead = function (value) {
        var prot = /^http|chrome-extension/i;
        if (value.match(prot)) {
            SM.put("instead", value);
        } else {
            SM.put("instead", "http://" + value);
        }
        return SM.get("instead");
    }

    my.getWatchThisInstead = function () {
        return SM.get("instead");        
    }
    
    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        my.blockedSites[site] = "Custom Add";
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        delete my.blockedSites[site];
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }
    
    return my;
}(SM));