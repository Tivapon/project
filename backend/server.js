const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/psu_alerts';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow CORS for this origin (frontend)
}));
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Contact routes
const contactRoutes = require('./routes/contact.routes');
app.use('/api/contacts', contactRoutes);

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB (via Mongoose)');
}).catch(err => {
  console.error('Mongoose connection error:', err);
  process.exit(1);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
