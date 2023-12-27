const cocktails = require('./api/cocktails');
const users = require('./api/users');
const uploadRouter = require('./api/upload');
const histories = require('./api/histories');

function routes(app) {
  app.use('/api/cocktails', cocktails);
  app.use('/api/users', users);
  app.use('/api/upload', uploadRouter);
  app.use('/api/histories', histories);
}

module.exports = routes;
