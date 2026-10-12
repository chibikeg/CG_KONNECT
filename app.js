const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

//Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);

//Health check route
app.get('/', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Welcome to CGKONNECT API' });
});

app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'CGKONNECT API is healthy' });
});

module.exports = app;
