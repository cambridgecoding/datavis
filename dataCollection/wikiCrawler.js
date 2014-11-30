var Crawler = require("simplecrawler");

var crawler = new Crawler("en.wikipedia.org", "/wiki/Fuel_economy_in_automobiles");
crawler.maxDepth = 2;
crawler.interval = 250;
crawler.maxConcurrency = 5;
crawler.downloadUnsupported = false;

crawler.on("crawlstart",function() {
    console.log("Crawl starting");
});

crawler.on("fetchcomplete",function(queueItem) {
    console.log("fetchcomplete",queueItem.url);
});

crawler.on("complete",function() {
    console.log("Finished!");
});


var excludeNonWikis = crawler.addFetchCondition(function(parsedURL) {
    return !(parsedURL.path.match(/\/w\//i)
        || parsedURL.path.match(/wiki\/Wikipedia:/i)
        || parsedURL.path.match(/wiki\/File:/i)
        || parsedURL.path.match(/wiki\/Category:/i)
        || parsedURL.path.match(/wiki\/Portal:/i)
        || parsedURL.path.match(/wiki\/Help:/i)
        || parsedURL.path.match(/wiki\/Special:/i) );
});

crawler.start();
