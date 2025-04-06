const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nakshu:nakshu@cluster0.iphj8gm.mongodb.net/farmiee?retryWrites=true&w=majority&appName=cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Wait 5s before failing
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = mongoDB;