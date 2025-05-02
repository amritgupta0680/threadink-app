const pool = require('../db');

class Order {
  static async create({ customer_name, shipping_address, items, total }) {
    const result = await pool.query(
      `INSERT INTO orders (customer_name, shipping_address, items, total)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        customer_name,
        shipping_address,
        JSON.stringify(items), // ✅ Convert array to JSON string
        total
      ]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return result.rows;
  }
}

module.exports = Order;
