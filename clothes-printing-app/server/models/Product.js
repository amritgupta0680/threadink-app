// server/models/Product.js
const pool = require('../db'); // Database connection pool

class Product {
  // Fetch all products
  static async getAll() {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    return result.rows;
  }

  // Create a new product
  static async create({ name, price, image_url }) {
    const result = await pool.query(
      'INSERT INTO products (name, price, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, price, image_url]
    );
    return result.rows[0];
  }
}

module.exports = Product;
