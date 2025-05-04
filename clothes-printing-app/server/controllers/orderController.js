// server/controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { customer_name, shipping_address, phone_number, items, total } = req.body;

  try {
    const newOrder = await Order.create({
      customer_name,
      shipping_address,
      phone_number,
      items,
      total,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
