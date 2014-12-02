// http://www.ranks.nl/stopwords
var stopWords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",	"ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "http", "https", "co"];

var keywordFrequency = function(text, hist, df){
    if (hist === undefined)
        hist = {};
    if (df === undefined)
        df = {};
    hasWord = {};
    var words = text.split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}$%&0-9*]/)
    for(var i in  words) {
        if(words[i].length >1 ) {
            var word = words[i].toLowerCase();
            if (stopWords.indexOf(word) == -1) {
                hist[word] ? hist[word]+=1 : hist[word]=1;
                hasWord[word] = true;
            }
        }
    }
    for (word in hasWord)
        df[word] ? df[word] += 1 : df[word] = 1;
    return hist;
};

var orderKeywords = function(hist) {
    var keyList = [];
    for (var key in hist) {
        if (hist[key] > 1)
            keyList.push({keyword: key, frequency: hist[key]});
    }
    return keyList.sort(keywordComparator);
}

function keywordComparator(a, b) { 
    if (a.frequency < b.frequency)
        return 1;
    else if (a.frequency > b.frequency) 
        return -1;
    else {
        if (a.keyword < b.keyword)
            return -1;
        else
            return 1;
    }
}

//Running in Node.js

module.exports = {
    keywordFrequency: keywordFrequency,
    orderKeywords: orderKeywords
}


