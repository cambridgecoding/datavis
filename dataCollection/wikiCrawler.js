var Crawler = require('simplecrawler');
var cheerio = require('cheerio');
var freq = require('../vis/keywordFrequency.js');

var crawler = new Crawler("en.wikipedia.org", "/wiki/Love");
crawler.maxDepth = 2;
crawler.maxConcurrency = 5;
crawler.downloadUnsupported = false;

crawler.on("crawlstart",function() {
    // console.log("Crawl starting");
});

var tf = {};
var df = {};
crawler.on("fetchcomplete",function(queueItem, data, res) {
    // console.log("fetchcomplete",queueItem.url, queueItem.depth);
    var $ = cheerio.load(data.toString("utf8"));
    var content = $('#mw-content-text');
    content.each(function(i, elem) {
        // console.log(elem);
        freq.keywordFrequency($(this).text(), tf, df);
    });
});

crawler.on("complete",function() {
    console.log("Finished!");

    var ordered = freq.orderKeywords(tf);
    console.log(JSON.stringify(ordered));
    // console.log(ordered.slice(0, 50));
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
