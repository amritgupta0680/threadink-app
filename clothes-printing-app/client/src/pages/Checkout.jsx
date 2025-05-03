import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading state
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);  // Start loading state
    
      const orderData = {
        customer_name: name,
        shipping_address: address,
        items: cartItems,
        total,
      };
    
      console.log("Submitting order data:", orderData); // Debugging line
    
      try {
        const response = await axios.post('http://localhost:5000/api/orders', orderData);
        console.log('Order placed successfully:', response.data);  // Log the response
        localStorage.removeItem('cart');
        alert('Order placed successfully!');
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Error placing order. Please try again.');
      } finally {
        setLoading(false);  // End loading state
      }
    };
    
    // Prepare the order data
    const orderData = {
      customer_name: name,
      shipping_address: address,
      items: cartItems,
      total,
    };

    try {
      // Make POST request to backend to create the order
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      console.log('Order placed successfully:', response.data);
      
      // Clear cart from localStorage after successful order
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);  // End loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-2xl bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">Order Summary:</h3>
            {cartItems.length === 0 ? (
              <div className="text-red-500">Your cart is empty!</div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700 mb-2">
                  <span>{item.color} / {item.size} ({item.position})</span>
                  <span>₹{item.price}</span>
                </div>
              ))
            )}
            <div className="text-right font-bold text-blue-800">Total: ₹{total}</div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-blue-500 py-3 rounded hover:bg-pink-400"
            disabled={loading}  // Disable button during loading
          >
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
