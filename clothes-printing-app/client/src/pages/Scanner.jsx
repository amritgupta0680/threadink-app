import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Scanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state;

  const handlePaymentDone = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders', orderDetails);
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">Scan & Pay</h2>
      <img
        src="/images/qr-placeholder.png"
        alt="QR Code"
        className="w-72 h-72 object-contain mb-6 border border-gray-300 p-2 rounded"
      />
      <p className="mb-4 text-blue-700 font-semibold">Pay to: clothesprint@upi</p>
      <button
        onClick={handlePaymentDone}
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      >
        Payment Done
      </button>
    </div>
  );
}

export default Scanner;
