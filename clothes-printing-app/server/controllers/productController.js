// server/controllers/productController.js
const Product = require('../models/Product');

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    console.error('Error in getProducts:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, image_url } = req.body;
    const newProduct = await Product.create({ name, price, image_url });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error in addProduct:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
};
