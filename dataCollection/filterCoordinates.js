var fs = require('fs');

var tweets = require('../data/tweets-sunday30Nov-UK.json');
var filtered = [];

for (i in tweets) {
	if (tweets[i].geo)
		filtered.push(tweets[i].geo.coordinates);
}
console.log(JSON.stringify(filtered));