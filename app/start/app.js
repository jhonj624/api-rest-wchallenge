const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user');
const coingeckoRoutes = require('../routes/coingecko');
const authRoutes = require('../routes/auth');

const app = express();

// CORS
app.use(cors());

// Reading and body parser
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(coingeckoRoutes);
app.use(authRoutes);

module.exports = app;
