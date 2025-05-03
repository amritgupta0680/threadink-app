import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // ✅ Convert item.price to number
  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-4">
                  <div>
                    <p className="text-gray-800 font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.color} / {item.size} ({item.position})
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-800 font-semibold">₹{item.price}</span>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right text-xl font-bold text-blue-800">
              Total: ₹{total}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => navigate('/checkout')}
                className="bg-orange-500 text-blue-500 px-6 py-3 rounded hover:bg-pink-400"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
