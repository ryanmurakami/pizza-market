
var runInterval;

function run (socket) {
  runInterval = setInterval(function () {
    var newData = require('./quoteManager').updateQuotes();
    socket.emit('new_data', JSON.stringify(newData));
  }, 1000);
}

function stop () {
  clearInterval(runInterval);
}

module.exports = {
  run: run,
  stop: stop
};
