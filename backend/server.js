require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', transactionRoutes);



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
