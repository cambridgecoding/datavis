var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	consumer_key : '???',
	consumer_secret : '???',
	access_token : '???',
	access_token_secret : '???'
});

var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
var stream = twit.stream('statuses/filter', { locations: uk })
var log = fs.createWriteStream('tweets.log');

stream.on('tweet', processTweet);

function processTweet(tweet) {
	var regexp = /[\w'@#]+/g;
	var words = tweet.text.match(regexp);
	log.write(words);
};