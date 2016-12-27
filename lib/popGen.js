var dataStore = require('./dataStore'),
  _ = require('lodash');

function getPopularSlices () {
  var finalQuotes = _getFinalQuotes(),
    orderedQuotes = _.orderBy(finalQuotes, ['quote'], ['desc']);
  return _.take(orderedQuotes, 4);
}

function getMostPopular () {
  var finalQuotes = _getFinalQuotes();
  return finalQuotes.reduce(function (best, curr) {
    if (curr.quote > best.quote) {
      return curr;
    }
    return best;
  }, { quote: 0 });
}

function getNewestSlice () {
  return { ticker: 'HAWA', quote: dataStore.getPizza('HAWA').getLast() };
}

function getMostImproved () {
  var allQuotes = dataStore.getAllQuotes(),
    diffQuotes = [];
  for (var key in allQuotes) {
    diffQuotes.push({
      ticker: key,
      diff: allQuotes[key][allQuotes[key].length - 1] - allQuotes[key][0],
      quote: allQuotes[key][allQuotes[key].length - 1]
    });
  }
  return diffQuotes.reduce(function (best, curr) {
    if (curr.diff > best.diff) {
      return curr;
    }
    return best;
  }, { diff: 0});
}

function _getFinalQuotes () {
  var allQuotes = dataStore.getAllQuotes(),
    finalQuotes = [];
  for (var key in allQuotes) {
    finalQuotes.push({
      ticker: key,
      quote: allQuotes[key][allQuotes[key].length - 1],
      diffLast: _percentOf(allQuotes[key][allQuotes[key].length - 2], allQuotes[key][allQuotes[key].length - 1])
    });
  }
  return finalQuotes;
}

function _percentOf(val1, val2) {
  return (val2 - val1) / val1;
}

module.exports = {
  getPopularSlices: getPopularSlices,
  getMostPopular: getMostPopular,
  getNewestSlice: getNewestSlice,
  getMostImproved: getMostImproved
};
