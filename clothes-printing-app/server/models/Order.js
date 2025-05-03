// server/models/Order.js
const pool = require('../db'); // Assuming you're using a pool for DB connections

class Order {
  static async create({ customer_name, shipping_address, items, total }) {
    const result = await pool.query(
      'INSERT INTO orders (customer_name, shipping_address, items, total) VALUES ($1, $2, $3, $4) RETURNING *',
      [customer_name, shipping_address, JSON.stringify(items), total]
    );
    return result.rows[0]; // Return the newly created order
  }
}

module.exports = Order;
