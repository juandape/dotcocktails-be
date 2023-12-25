const cocktails = require('./api/cocktails');
const users = require('./api/users');
const uploadRouter = require('./api/upload');

function routes(app) {
  app.use('/api/cocktails', cocktails);
  app.use('/api/users', users);
  app.use('/api/upload', uploadRouter);
}

module.exports = routes;
