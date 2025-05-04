const pool = require('../db');

class Order {
  static async create({ customer_name, shipping_address, phone_number, items, total }) {
    const result = await pool.query(
      `INSERT INTO orders (customer_name, shipping_address, phone_number, items, total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [customer_name, shipping_address, phone_number, JSON.stringify(items), total]
    );
    return result.rows[0];
  }
}

module.exports = Order;
