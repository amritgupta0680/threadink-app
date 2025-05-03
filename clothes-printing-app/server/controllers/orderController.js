// server/controllers/orderController.js
const Order = require('../models/Order'); // Ensure this model exists

exports.createOrder = async (req, res) => {
  const { customer_name, shipping_address, items, total } = req.body;

  console.log("Received order data:", req.body); // Debugging line

  try {
    const newOrder = await Order.create({
      customer_name,
      shipping_address,
      items,
      total,
    });

    console.log('Order created:', newOrder); // Log created order
    res.status(201).json(newOrder);  // Return the newly created order
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
