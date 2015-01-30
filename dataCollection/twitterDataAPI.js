//load required libraries defined in package.json
var Twit = require('twit');
var fs = require('fs');
var twit = new Twit({
	//authentification

});
//coordinates for the UK
var uk = [ '-9.23', '49.84', '2.69', '60.85' ];
//filter stream of information to data from within the defined coordinates=selects stream of incoming tweets by location
//on twit = authentification, status updates
var stream = twit.stream('statuses/filter', { track: "ebola, Ebola" });
var log = fs.createWriteStream('tweets.log');
//event 'tweet' defined by 'twit' library
stream.on('tweet', processTweet);

function processTweet(tweet) {
	var regexp = /.*/g;
    //var regexp = /.*CO.*/g
	var words = tweet.text.match(regexp);
    console.log(words)
	//log.write(words);
	//printing streamed tweets as log to console
	//console.log(tweet);
	//convert tweet into string using JSON
	//var strTweet = JSON.stringify(tweet);
	//write into file now
	//log.write(strTweet)
	//log.write('\n')
	//fs.fsync
};