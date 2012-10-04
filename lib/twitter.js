function makeUri (query, supplement) {
  return "http://search.twitter.com/search.json?rpp=100&q=" + query + "%20AND%20" + supplement;
}

module.exports = {
  makeUri:  makeUri
};

