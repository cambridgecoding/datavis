var fs = require('fs');

var tweets = require('../data/tweets-sunday30Nov-UK.json');
var filtered = [];

for (i in tweets) {
	if (tweets[i].geo)
		filtered.push({
			timestamp: parseInt(tweets[i].timestamp_ms),
			text: tweets[i].text,
			geo:{longitude: tweets[i].geo.coordinates[1], latitude: tweets[i].geo.coordinates[0]}
		});
}
console.log(JSON.stringify(filtered));