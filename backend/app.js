const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/index.js');

const app = express();

// Professional Middleware Setup
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(express.urlencoded({ extended: true }));

// Centralized API Routes
app.use('/api', apiRoutes);

// Static folder for recipe images
app.use('/uploads', express.static('public/assets'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Kitchen Assistant API running on http://localhost:${PORT}`);
});