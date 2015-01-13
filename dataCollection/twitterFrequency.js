var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var freq = require('../vis/keywordFrequency.js');

var input = fs.createReadStream('tweets-trunc.log');
var output = new stream;
var log = readline.createInterface(input, output);

var hist = {};
var df = {};
log.on('line', function(data) {
  	var tweet = JSON.parse(data.slice(0, -1));
	freq.keywordFrequency(tweet.text, hist, df);
});

log.on('close', function() {
	console.log("finished reading");
  	console.log(JSON.stringify(freq.orderKeywords(hist)));
});