// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="w-full bg-pink-200 fixed top-0 left-0 z-50 shadow-lg">
      <nav className="max-w-screen-xl mx-auto p-4 flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <span role="img" aria-label="thread">🧵</span>
          <span>ThreadInk</span>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:bg-pink-300 px-4 py-2 rounded transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:bg-pink-300 px-4 py-2 rounded transition-colors duration-300"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/customize"
              className="hover:bg-pink-300 px-4 py-2 rounded transition-colors duration-300"
            >
              Customize
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:bg-pink-300 px-4 py-2 rounded transition-colors duration-300"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="hover:bg-pink-300 px-4 py-2 rounded transition-colors duration-300"
            >
              Checkout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
