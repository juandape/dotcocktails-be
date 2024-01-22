const cocktails = require('./api/cocktails');
const users = require('./api/users');
const uploadRouter = require('./api/upload');
const histories = require('./api/histories');
const authLocalRouter = require('./auth/local');

function routes(app) {
  app.use('/api/v1/cocktails', cocktails);
  app.use('/api/v1/users', users);
  app.use('/api/v1/upload', uploadRouter);
  app.use('/api/v1/histories', histories);
  app.use('/auth/local', authLocalRouter);
}

module.exports = routes;
