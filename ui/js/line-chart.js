var Chart = require('chart.js'),
  dataStore = require('./dataStore');

var ctx = document.getElementById('mainChart'),
  myLineChart;

function draw () {
  myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataStore.getAggregateDates(),
        datasets: [{
          label: 'Total',
          data: dataStore.getAggregate()
        }]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        }
      }
  });
}

function updateChart () {
  myLineChart.data.labels = dataStore.getAggregateDates();
  myLineChart.data.datasets[0].data = dataStore.getAggregate();
  myLineChart.update();
}

module.exports.draw = draw;
module.exports.updateChart = updateChart;
