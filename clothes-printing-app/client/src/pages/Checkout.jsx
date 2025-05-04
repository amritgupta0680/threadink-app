// client/src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer_name: name,
      shipping_address: address,
      phone_number: phone,
      items: cartItems,
      total,
    };

    if (paymentMethod === 'UPI') {
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));
      navigate('/scanner');
    } else {
      try {
        await axios.post('http://localhost:5000/api/orders', orderData);
        localStorage.removeItem('cart');
        alert('Order placed with Cash on Delivery!');
        navigate('/');
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Error placing order.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-2xl bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-300 rounded" />
          <input type="text" placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full p-3 border border-gray-300 rounded" />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full p-3 border border-gray-300 rounded" />

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Payment Method:</label>
            <div className="flex gap-4">
              <label><input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI</label>
              <label><input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery</label>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">Order Summary:</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-700 mb-2">
                <span>{item.name} - {item.color} / {item.size} ({item.position})</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <div className="text-right font-bold text-blue-800">Total: ₹{total}</div>
          </div>

          <button type="submit" className="w-full bg-orange-500 text-blue-500 py-3 rounded hover:bg-pink-400">
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
