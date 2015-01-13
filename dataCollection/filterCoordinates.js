var fs = require('fs');
var gju = require('geojson-utils');
var topojson = require('topojson');
var uk = require('../data/uk.json');

var tweets = require('../data/tweets.json');
var filtered = [];

// Extract the regions we are interested in from the map
var tregions = uk.objects.subunits.geometries;
var regions = tregions.map(function(d) {
	return topojson.feature(uk, d);
});

for (var i in tweets) {
	// We are only interested in tweets that have location
	if (tweets[i].geo) {
		// Create a new structure with only the values we are interested in:
		// - the timestamp of a tweet
		// - the text
		// - the location as longitude and latitude
		// - and the region within which the coordinates are
		var reduced = {
			timestamp: parseInt(tweets[i].timestamp_ms),
			text: tweets[i].text,
			geo:{longitude: tweets[i].geo.coordinates[1], latitude: tweets[i].geo.coordinates[0]},
			region: findRegion(tweets[i], regions);
		}
		
		filtered.push(reduced);
	}
}
console.log(JSON.stringify(filtered));

function findRegion(tweet, regions) {
	var geojsonProperty = {type: "Point", coordinates: [tweet.geo.coordinates[1], tweet.geo.coordinates[0]]};
	for (var r in regions) {
		if (gju.pointInMultiPolygon(geojsonProperty, regions[r].geometry)) {
			return regions[r].properties.name;
		}
	}
}