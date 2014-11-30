var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var freq = require('../keywordFrequency.js');

var input = fs.createReadStream('tweets.log');
var output = new stream;
var log = readline.createInterface(input, output);

var hist = {};
var df = {};
log.on('line', function(data) {
  	var tweet = JSON.parse(data);
	freq.keywordFrequency(tweet.text, hist, df);
});

log.on('close', function() {
	console.log("finished reading");
  	// console.log(JSON.stringify(freq.orderKeywords(hist)));
  	console.log(freq.orderKeywords(hist));
  	// console.log("DF:");
  	// console.log(JSON.stringify(freq.orderKeywords(df)));
});