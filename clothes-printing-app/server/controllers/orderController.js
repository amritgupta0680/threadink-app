const pool = require('../db');

exports.createOrder = async (req, res) => {
  const { customer_name, shipping_address, items, total } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (customer_name, shipping_address, items, total) VALUES ($1, $2, $3, $4) RETURNING *',
      [customer_name, shipping_address, items, total]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
