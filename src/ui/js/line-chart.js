var Chart = require('chart.js'),
  dataStore = require('./dataStore'),
  moneyFormat = require('../helpers/moneyFormat');

var ctx = document.getElementById('mainChart'),
  myLineChart;

function draw () {
  myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: slimArray(dataStore.getAggregateDates()),
      datasets: [{
        label: 'Total',
        data: slimArray(dataStore.getAggregate()),
        lineTension: 0,
        fill: true
      }]
    },
    options: {
      responsive: false,
      animation: false,
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return moneyFormat(tooltipItem.yLabel);
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (label, index, labels) {
                return moneyFormat(label);
              }
            }
          }
        ]
      }
    }
  });
}

function slimArray (arr) {
  return arr.slice(arr.length > 20 ? arr.length - 21 : 0);
}

function updateChart () {
  myLineChart.data.labels = slimArray(dataStore.getAggregateDates());
  myLineChart.data.datasets[0].data = slimArray(dataStore.getAggregate());
  myLineChart.update();
}

module.exports.draw = draw;
module.exports.updateChart = updateChart;
