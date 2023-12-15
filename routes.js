const cocktails = require('./api/cocktails');
const users = require('./api/users');

function routes(app) {
  app.use('/api/cocktails', cocktails);
  app.use('/api/users', users);
}

module.exports = routes;
