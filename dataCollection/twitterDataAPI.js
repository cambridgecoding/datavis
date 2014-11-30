var util = require('util');
var Twit = require('twit');
var fs = require('fs');

var twit = new Twit({
    consumer_key : 'Gs1rHqW1dwXEopN711mQFA',
    consumer_secret : '0l6DpoGEjruOH7fYWRCjvWOdHzFXHSqBRbTIBax7T6I',
    access_token : '82142104-Jfa0l5APzBnV2KenIMDfzpfWvlXuvDFdRUyo8w00D',
    access_token_secret : 'tnQy4PZMSNWC7kSy4MvFmCf1qiuYdC8FsPmghYzOs'
});

var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
var uk = [ '-9.23', '49.84', '2.69', '60.85' ];

var stream = twit.stream('statuses/filter', { locations: sanFrancisco })

var log = fs.createWriteStream('tweets.log');

stream.on('tweet', function (tweet) {
	var str = JSON.stringify(tweet);
	log.write(str+"\n");
  	console.log(str)
});	