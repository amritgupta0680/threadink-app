const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { customer_name, shipping_address, items, total } = req.body;
  try {
    await pool.query(
      'INSERT INTO orders (customer_name, shipping_address, items, total) VALUES ($1, $2, $3, $4)',
      [customer_name, shipping_address, JSON.stringify(items), total]
    );
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

module.exports = router;
