const app = require('./app');
const port = process.env.PORT || 8080;

app.listen(port, () => {
  try {
    console.log(`Server running 🤖🚀 at http://localhost:${port}/`);
  } catch (error) {
    console.log('Error connecting to Server', error);
  }
});

module.exports = app;
