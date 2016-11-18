module.exports = function (socket) {
  socket.on('stop', function () {
    require('../lib/market').stop();
  });
};
