var twitter = require('./lib/twitter');

var run, county;

county = function(array) {
  var i = 0;
  array.forEach(function(entry) {
    if (new Date() > Date.parse(entry.created_at) + 3600 * 1000 * 24)
          i++;
  });
  return i;
};

run = function(stock, done) {
  var negative, positive, trimToJson;
  positive = ["buy", "long", "bullish"];
  negative = ["sell", "short", "bearish"];
  uri = twitter.makeUri("$" + stock, positive.join("%20OR%20"));

  return $.ajax({
    url: uri,
    type: "GET",
    dataType: "jsonp"
  }).done(function(pdata) {

    return $.ajax({
      url: twitter.makeUri("$" + stock, negative.join("%20OR%20")),
      type: "GET",
      dataType: "jsonp"
    }).done(function(ndata) {
      return done({
        pcount: county(pdata.results),
        ncount: county(ndata.results),
        stock: stock
      });
    }).fail(function(err) {
      return console.log("fail on negative", err);
    });
  }).fail(function(err) {
    return console.log("fail on positive", err);
  });
};

$(function() {
  $('.stock-input').on("keypress", function(evt) {
    if (evt.charCode !== 13) return;

    $('.loader').show();
    $results = $('#results').hide();

    run($(this).val(), function(result) {
      console.log(result);
      $('.loader').hide();
      $results.find('.stock').html(result.stock);
      $results.find('.positive').html(result.pcount);
      $results.find('.negative').html(result.ncount);
      $results.show().removeClass("loading");
    });    
  });
});
