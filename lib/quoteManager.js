var dataStore = require('./dataStore');

module.exports.updateQuotes = function (socket) {
  var pizzas = dataStore.getPizzas(),
    newData = [];
  pizzas.forEach(function (pizza) {
    newData.push({
      ticker: pizza.ticker,
      nextQuote: pizza.getNext()
    });
  });
  console.log(newData);
  console.log('updating quotes');
  return newData;
};
