
var data = {};

function init () {
  data.pizzas = pizzas;
  data.agg = generateAggregate();
  console.log(data);
}

function generateAggregate () {
  var localAgg = data.agg || [],
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
    dates.push(currDate.toDateString());
    currDate.setDate(currDate.getDate() + 1);
  }

  return dates;
}

module.exports = {
  init: init,
  updatePizzas: updatePizzas,
  getAggregate: getAggregate,
  getAggregateDates: getAggregateDates
};
