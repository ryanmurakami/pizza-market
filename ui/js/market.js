var $ = require('jquery'),
  socket = require('./socketBroker'),
  dataStore = require('./dataStore'),
  lineChart = require('./line-chart');

function init () {
  var $openButton = $('.open-button');

  $openButton.click(function () {
    if ($openButton.text() === 'Open Market') {
      socket.emit('start');
      $openButton.text('Close Market');
    } else {
      socket.emit('stop');
      $openButton.text('Open Market');
    }
  });

  dataStore.init();

  socket.on('new_data', function (payload) {
    dataStore.updatePizzas(JSON.parse(payload));
    lineChart.updateChart();
  });
}

module.exports.init = init;
