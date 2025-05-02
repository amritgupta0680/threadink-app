import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div>
                  <p className="font-semibold text-gray-800">{item.color} / {item.size}</p>
                  <p className="text-sm text-gray-600">Position: {item.position}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-lg text-pink-600">₹{item.price}</span>
                  <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right font-semibold text-lg text-blue-800">
              Total: ₹{total}
            </div>
            <Link to="/checkout" className="block w-full text-center bg-black-500 text-blue-500 py-2 rounded hover:bg-pink-400">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


export default Cart;
