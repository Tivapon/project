const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3002; // Use port from .env or default to 3002

// Check if MONGODB_URI exists
if (!process.env.MONGODB_URI) {
  console.error('MongoDB URI not found in environment variables.');
  process.exit(1);
}

const uri = process.env.MONGODB_URI;

// Create MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useUnifiedTopology: true // Ensures compatibility with MongoDB's server discovery and monitoring engine
});

app.use(cors({
  origin: 'http://localhost:3000' // Allow CORS for this origin
}));
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Connect to MongoDB Atlas and start the server
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Start the server after MongoDB connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (e) {
    console.error('Error connecting to MongoDB:', e.message || e); // Provide detailed error
    process.exit(1); // Exit the process with error code
  }
}

// Call the connectDB function to connect to MongoDB and start the server
connectDB();

