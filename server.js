const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
require('dotenv').config();

const app = express();
connectDatabase();

// Enable CORS for all requests
app.use(cors());

// Middleware
app.use(express.json());
// Routes
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
