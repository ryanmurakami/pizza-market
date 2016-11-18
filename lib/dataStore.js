var Pizza = require('../models/pizzaType');

var data = {};

// initialize data store with bootstrapped data
function init (server) {
  server.app.data = data;
  data.quotes = require('../mock/quotes');
  data.pizzas = initPizzas();
}

function getQuotes (ticker) {
  return data.quotes[ticker];
}

function getAllQuotes () {
  return data.quotes;
}

function getPizzas () {
  return data.pizzas;
}

function initPizzas () {
  var pizzas = require('../mock/pizzas'),
    realPizzas = [],
    startingDate = new Date();

  pizzas.forEach(function (pizza) {
    realPizzas.push(new Pizza(pizza[0], pizza[1], pizza[2], startingDate, pizza[3], pizza[4], pizza[5]));
  });

  return realPizzas;
}

module.exports = {
  init: init,
  getQuotes: getQuotes,
  getAllQuotes: getAllQuotes,
  getPizzas: getPizzas
}
