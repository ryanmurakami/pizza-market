var popGen = require('../lib/popGen'),
  dataStore = require('../lib/dataStore');

module.exports = function (request, reply) {
  var context = {
    popSlices: popGen.getPopularSlices(),
    mostPopular: popGen.getMostPopular(),
    newestSlice: popGen.getNewestSlice(),
    mostImproved: popGen.getMostImproved(),

  };

  return reply.view('index', context);
};
