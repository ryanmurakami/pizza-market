var data = {};

function init () {
  data.pizzas = {};
  data.agg = generateAggregate();
  console.log(data);
}

function generateAggregate () {
  var localAgg = [],
    count = 0;

  for (var key in data.pizzas) {
    count++;
    localAgg = data.pizzas[key].quotes.map(function (val, ix) {
      return val + (localAgg[ix] || 0);
    });
  }

  return localAgg.map(function (val) {
    return +(val / count).toFixed(0);
  });
}

function updatePizzas (payload) {
  payload.forEach(function (val) {
    data.pizzas[val.ticker].quotes.push(val.nextQuote);
  });

  data.agg = generateAggregate();
}

function getAggregate () {
  return data.agg;
}

function getAggregateDates () {
  var dates = [],
    currDate = new Date(data.pizzas.PEPP.startingDate);

  for (var i = 0; i < data.agg.length; i++) {
    dates.push(formatDate(currDate));
    currDate.setDate(currDate.getDate() + 1);
  }

  return dates;
}

function formatDate (date) {
  return (date.getMonth() + 1) +
    '/' +
    date.getDate() +
    '/' +
    ('' + date.getFullYear()).slice(2);
}

function getPizza (ticker) {
  return data.pizzas[ticker];
}

function getAllQuotes () {
  var quotes = {};

  for (var key in data.pizzas) {
    quotes[data.pizzas[key].ticker] = data.pizzas[key].quotes;
  }

  return quotes;
}

module.exports = {
  init: init,
  updatePizzas: updatePizzas,
  getAggregate: getAggregate,
  getAggregateDates: getAggregateDates,
  getAllQuotes: getAllQuotes,
  getPizza: getPizza
};
