var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	consumer_key : 'dxuP4rlqvS7sem1rI2aRwUISh',
	consumer_secret : 'CN2xjoK1THyTTsLhcXQYdqGxr5Uk8CO8kGCLl0PWIokU0xb85g',
	access_token : '82142104-NdRCSgf5JicNGHlV4K1rvQLXcPfxHaq3NFSFinC9y',
	access_token_secret : 'Z8EeMeFAAxYXxE151linzlhbOmhe9NIYFLqzcHfDCaTBu'
});

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
var stream = twit.stream('statuses/filter', { locations: uk })
var log = fs.createWriteStream('tweets.log');
var keywords = {};
var tweetsSeen = 0;
var tweetsWanted = 50;

stream.on('tweet', processTweet);

function processTweet(tweet) {
	var regexp = /[\w'@#]+/g;
	var words = tweet.text.match(regexp);
	for (var i = 0; i < words.length; i++) {
		var keyword = words[i];
		if (keywords[keyword])
			keywords[keyword]++;
		else
			keywords[keyword] = 1;
	}
	tweetsSeen++;
	if (tweetsSeen == tweetsWanted) {
		reformatResult(keywords);
	}
};

function reformatResult(keywords) {
	var result = [];
	for (var key in keywords) {
		result.push({keyword: key, frequency: keywords[key]});
	}
	var sortedResult = result.sort(keywordCompare);
	console.log(sortedResult);
}

function keywordCompare(a, b) { 
	if (a.frequency < b.frequency)
		return 1;
	else if (a.frequency > b.frequency) 
		return -1;
	else if (a.frequency == b.frequency) {
		if (a.keyword < b.keyword)
			return -1;
		else
			return 1;
	}
}