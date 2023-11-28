const cocktails = require('./api/cocktails');

function routes(app) {
  app.use('/api/cocktails', cocktails);
}

module.exports = routes;
