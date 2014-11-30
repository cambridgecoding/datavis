var Crawler = require("simplecrawler");

var crawler = new Crawler("en.wikipedia.org", "/wiki/Fuel_economy_in_automobiles");
crawler.maxDepth = 2;
crawler.interval = 250;
crawler.maxConcurrency = 5;
crawler.downloadUnsupported = false;

crawler.on("crawlstart",function() {
    console.log("Crawl starting");
});
    
// crawler.on("fetchstart",function(queueItem) {
//     console.log("fetchStart",queueItem);
// });

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
// var Crawler = require("crawler");
// var url = require('url');

// var c = new Crawler({
//     maxConnections : 10,
//     skipDuplicates: true,
//     maxDepth: 2,
//     // This will be called for each crawled page
//     callback : function (error, result, $) {
//         // console.log(result);
//         // $ is Cheerio by default
//         //a lean implementation of core jQuery designed specifically for the server
//         var urls = [];
//         $('#content a').each(function(index, a) {
//             var href = $(a).attr('href');
//             if (href && href.indexOf('/wiki/') == 0 && href.indexOf('/wiki/File:') == -1 && href.indexOf('/wiki/Wikipedia:')) {
//                 // console.log(index, href);
//                 var toQueueUrl = href;
//                 urls.push("http://en.wikipedia.org"+href);
//             }    
//         });
//         var subset = urls.slice(0, 10);
//         console.log(subset);
//         c.queue(subset);
//     }
// });

// // Queue just one URL, with default callback
// c.queue('http://en.wikipedia.org/wiki/Fuel_economy_in_automobiles');