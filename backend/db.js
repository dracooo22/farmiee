const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://b22cs063:b22cs063@cluster0.jurfpzv.mongodb.net/farmie?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Limit the number of connections in the pool
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds before failing
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = mongoDB;
