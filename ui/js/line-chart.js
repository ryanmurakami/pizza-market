var Chart = require('chart.js');

var ctx = document.getElementById('mainChart');

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: 'Pepperoni Pizza',
        data: require('../../mock/quotes').PEPP.map(function (quote) {
          return quote;
        })
      }]
    },
    options: {
      responsive: false,
      legend: {
        display: false
      }
    }
});

module.exports = myLineChart;
