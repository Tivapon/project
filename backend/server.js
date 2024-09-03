const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
  }));  

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
