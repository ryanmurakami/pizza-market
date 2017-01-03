var fluxGen = require('../lib/fluxGen');

function getRand () {
  return +(Math.random() * 100).toFixed(0);
}

module.exports = function (startingDate, ticker, name, startingQuote, variability, positivity) {
  var self = this;

  this.startingDate = startingDate;
  this.ticker = ticker;
  this.name = name;
  this.startingQuote = startingQuote;
  this.variability = variability || getRand();
  this.positivity = positivity || getRand();
  this.quotes = [this.startingQuote];

  this.getNext = function () {
    var newQuote = fluxGen(this.getLast(), 1, this.variability, this.positivity)[0];
    addQuote(newQuote);
    return newQuote;
  };

  this.getLast = function () {
    return getQuote(this.quotes.length - 1);
  };

  this.getDatedQuotes = function () {
    var quotesMap = {},
      curDate = startingDate;

    this.quotes.forEach(function (quote) {
      quotesMap[curDate] = quote;
      curDate.setDate(curDate.getDate() + 1);
    });

    return quotesMap;
  };

  // private methods
  function addQuote (quote) {
    self.quotes.push(quote);
  }

  function getQuote (quoteIndex) {
    return self.quotes[quoteIndex];
  }
};
