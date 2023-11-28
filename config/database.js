const mongoose = require('mongoose');

const dbUri = process.env.MONGO_DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
}

module.exports = connectDB;
