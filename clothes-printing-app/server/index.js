// server/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db'); // Import pool for DB connection
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import order routes

const app = express();
app.use(cors());
app.use(express.json());

// Test DB connection route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (err) {
    console.error('DB test error:', err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);  // Add the order routes here

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
