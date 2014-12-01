var fs = require('fs');
var gju = require('geojson-utils');
var topojson = require('topojson');
var uk = require('../data/uk.json');

var tweets = require('../data/tweets-sunday30Nov-UK.json');
var filtered = [];

var tregions = uk.objects.subunits.geometries;
var regions = tregions.map(function(d) {
	return topojson.feature(uk, d);
});

for (var i in tweets) {
	if (tweets[i].geo) {
		var reduced = {
			timestamp: parseInt(tweets[i].timestamp_ms),
			text: tweets[i].text,
			geo:{longitude: tweets[i].geo.coordinates[1], latitude: tweets[i].geo.coordinates[0]},
		}
		var geojsonProperty = {type: "Point", coordinates: [tweets[i].geo.coordinates[1], tweets[i].geo.coordinates[0]]};
		for (var r in regions) {
			if (gju.pointInMultiPolygon(geojsonProperty, regions[r].geometry))
				reduced.region = regions[r].properties.name;
		}
		filtered.push(reduced);
	}
}
console.log(JSON.stringify(filtered));