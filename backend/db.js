const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nakshu2048:nakshu2048@cluster0.srd6dr8.mongodb.net/farmiii?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000, // Added socket timeout
      connectTimeoutMS: 30000, // Added connection timeout
    });

    console.log('✅ MongoDB connected successfully');
    
    // Optional: Verify connection by listing collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    // More detailed error handling
    if (err.name === 'MongooseServerSelectionError') {
      console.error('Server selection error - check network/authentication');
    } else if (err.name === 'MongoNetworkError') {
      console.error('Network error - check internet connection and firewall');
    }
    process.exit(1);
  }
};

// Add event listeners for better debugging
mongoose.connection.on('connecting', () => console.log('Connecting to MongoDB...'));
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));

module.exports = mongoDB;
