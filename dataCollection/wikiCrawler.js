var Crawler = require('simplecrawler');
var cheerio = require('cheerio');

var crawler = new Crawler("en.wikipedia.org", "/wiki/Love");
crawler.maxDepth = 2;
crawler.maxConcurrency = 5;
crawler.downloadUnsupported = false;

var excludeNonWikis = crawler.addFetchCondition(function(parsedURL) {
    return !(parsedURL.path.match(/\/w\//i)
        || parsedURL.path.match(/wiki\/Wikipedia:/i)
        || parsedURL.path.match(/wiki\/File:/i)
        || parsedURL.path.match(/wiki\/Category:/i)
        || parsedURL.path.match(/wiki\/Portal:/i)
        || parsedURL.path.match(/wiki\/Help:/i)
        || parsedURL.path.match(/wiki\/Special:/i) );
});

function processContentText(i, elem) {
    // Process the retrieved text element, e.g. extract keywords
}

crawler.on("crawlstart",function() {
    console.log("Starting to Crawl");
});

crawler.on("fetchcomplete",function(queueItem, data, res) {
    var $ = cheerio.load(data.toString("utf8"));
    var content = $('#mw-content-text');
    content.each(processContentText);
});

crawler.on("complete",function() {
    console.log("Crawling Finished!");
    // Do something with the aggregated data
});

crawler.start();