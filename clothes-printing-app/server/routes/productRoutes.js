// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get('/', productController.getProducts);

// POST /api/products
router.post('/', productController.addProduct);

module.exports = router;
