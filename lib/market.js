var runInterval;

module.exports = {
  run: function (socket) {
    runInterval = setInterval(function () {
      var newData = require('./quoteManager').updateQuotes();
      socket.emit('new_data', JSON.stringify(newData));
    }, 1000);
  },

  stop: function () {
    clearInterval(runInterval);
  }
};
