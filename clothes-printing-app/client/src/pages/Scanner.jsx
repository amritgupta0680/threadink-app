// client/src/pages/Scanner.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Scanner() {
  const upiId = "store@upi";
  const navigate = useNavigate();

  const handlePaymentDone = async () => {
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));

    if (!pendingOrder) {
      alert("No order data found.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/orders', pendingOrder);
      localStorage.removeItem('pendingOrder');
      localStorage.removeItem('cart');
      alert('Payment successful! Order placed.');
      navigate('/');
    } catch (err) {
      console.error('Error saving order:', err);
      alert('Failed to save order.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Scan & Pay</h1>

      <img
        src="/images/qr-placeholder.png"
        alt="UPI Scanner"
        className="w-64 h-64 mb-4 object-contain border border-gray-300 p-2"
      />

      <p className="text-lg text-gray-800 mb-6">
        Pay to UPI ID: <span className="font-semibold">{upiId}</span>
      </p>

      <button
        onClick={handlePaymentDone}
        className="bg-orange-500 text-blue-500 px-6 py-3 rounded hover:bg-orange-600 transition duration-200"
      >
        Payment Done
      </button>
    </div>
  );
}

export default Scanner;
