const fluxGen = require('../lib/fluxGen');

module.exports = function (ticker, name, startingQuote, startingDate, variability, positivity) {
  this.ticker = ticker;
  this.name = name;
  this.variability = variability;
  this.positivity = positivity;
  this.startingQuote = startingQuote;
  this.startingDate = startingDate;
  this.quotes = [this.startingQuote];

  this.getNext = function () {
    var newQuote = fluxGen(this.quotes[this.quotes.length - 1], 1, this.variability, this.positivity)[0];
    this.quotes.push(newQuote);
    return newQuote;
  };

  this.getLast = function () {
    return this.quotes[this.quotes.length - 1];
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
};
