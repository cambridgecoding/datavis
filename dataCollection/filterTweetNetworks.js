var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var _ = require('lodash');

function keepTweet(tweet) {
    var keep = false;
    if (tweet.in_reply_to_status_id)
        keep = true;
    if (tweet.in_reply_to_user_id)
        keep = true;
    if (tweet.entities.user_mentions)
        keep = true;
    if (!tweet.geo)
        keep = false;
    return keep;
}

var userRel = {};
processData();

function processData() {
    var input = fs.createReadStream('tweets.log');
    var output = new stream;
    var log = readline.createInterface(input, output);

    log.on('line', function(data) {
        var tweet = JSON.parse(data.slice(0, -1));
        var keep = keepTweet(tweet);

        if (keep) {
            var user_id = tweet.user.id_str;
            if (!userRel[user_id])
                userRel[user_id] = [];
            if (tweet.in_reply_to_user_id != null)
                userRel[user_id].push(tweet.in_reply_to_user_id_str);
            for (var i in tweet.entities.user_mentions) {
                userRel[user_id].push(tweet.entities.user_mentions[i].id_str);
            }
        }

    });


    log.on('close', function() {
        console.log("Finished reading data");   
        var relationships = removeUnconnectedUsers(userRel);
        relationships = removeSmallComponents(relationships, 10);
        collectMetadata(relationships);
    });
}

function collectMetadata(relationships) {
    console.log("Collecting metadata for interesting users");
    var input = fs.createReadStream('tweets.log');
    var output = new stream;
    var log = readline.createInterface(input, output);

    var intUsers = _.uniq(_.merge(_.flatten(_.values(relationships)), _.keys(relationships)))

    var tweets = {};
    for (var i in intUsers) {
        tweets[intUsers[i]] = [];
    }
    var userNames = {};

    log.on('line', function(data) {
        var tweet = JSON.parse(data.slice(0, -1));
        var user_id = tweet.user.id_str;
        userNames[user_id] = "@"+tweet.user.screen_name;
        if (intUsers.indexOf(user_id) > -1) {
            var keepTweet = false;
            if (intUsers.indexOf(tweet.user.id_str) > -1)
                keepTweet = true;
            if (tweet.in_reply_to_user_id_str && intUsers.indexOf(tweet.in_reply_to_user_id_str) > -1)
                keepTweet = true;
            for (var i in tweet.entities.user_mentions) {
                if (intUsers.indexOf(tweet.entities.user_mentions[i].id_str) > -1)
                    keepTweet = true;
            }
            if (!tweet.geo)
                keepTweet = false;
            if (keepTweet) {
                var newTweet = {
                    id: tweet.id_str,
                    text: tweet.text,
                    geo: tweet.geo,
                    timestamp_ms: tweet.timestamp_ms
                };
                tweets[user_id].push(newTweet);
            }
        }

    });

    log.on('close', function() {
        console.log("Finished reading data 2 (metadata)");
        var graph = formatForForceGraph(userRel, userNames, tweets);
        console.log(JSON.stringify(graph));
        console.log("DONE");
    });
}

function removeUnconnectedUsers(relationships) {
    var authors = _.keys(relationships).sort();
    var totalAuthors = authors.length;
    var processed = 0;
    var incoming = {};
    for (var user_id in relationships) {
        relationships[user_id] = _.uniq(relationships[user_id]);
    }

    for (var user_id in relationships) {
        // relationships[user_id] = _.pull(relationships[user_id], user_id);
        var tusers = [];
        for (var i in relationships[user_id]) {
            var target = relationships[user_id][i];
            if (relationships[target]) {
                tusers.push(target);
                if (incoming[target])
                    incoming[target]++;
                else
                    incoming[target] = 1;
            }
        }
        relationships[user_id] = tusers;
    }

    for (var user_id in relationships) {
        if (_.isEmpty(relationships[user_id]) && !incoming[user_id])
            delete relationships[user_id];
    }
    return relationships;
}
var connected = {};
function formatForForceGraph(relationships, userNames, tweets) {
    var graph = {nodes: [], links: []};
    var keys = _.keys(relationships);
    for (var i in relationships) {
        graph.nodes.push({
            name: userNames[i],
            id: i,
            tweets: tweets[i],
            component: connected[i]
        });
        for (var j in relationships[i]) {
            var target = relationships[i][j];
            graph.links.push({
                source: keys.indexOf(i),
                target: keys.indexOf(target)
            });
        }
    }
    return graph;
}

function markAllComponents(relationships) {
    console.log("finding connected components");
    var components = 0;
    for (var user_id in relationships) {
        if (!connected[user_id]) {
            components++;
            connected[user_id] = components;
            markConnectedComponents(relationships, user_id);
        }
    }
    // console.log("COMPONENTS", components, connected);
}
function markConnectedComponents(relationships, user_id) {
    for (var i in relationships[user_id]) {
        var neighbour = relationships[user_id][i];
        if (!connected[neighbour]) {
            connected[neighbour] = connected[user_id];
            markConnectedComponents(relationships, neighbour);
        }
    }
}
function markComponentSize(relationships) {
    markAllComponents(relationships);
    var transformed = _.transform(connected, function(result, val, key) {
        result.push({component: val, user_id: key});
    }, []);
    var grouped = _.groupBy(transformed, 'component');
    // console.log(grouped);
    return grouped;
}

function removeSmallComponents(relationships, minSize) {
    var componentSizes = markComponentSize(relationships);
    for (var i in componentSizes) {
        var component = componentSizes[i];
        if (component.length < minSize) {
            for (var j in component) {
                var user_id = component[j].user_id;
                delete relationships[user_id];
            }
        }
    }
    return removeUnconnectedUsers(relationships)
}
