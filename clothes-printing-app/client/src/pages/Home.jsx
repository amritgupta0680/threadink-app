import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-400 mb-6">
          Welcome to 🧵ThreadInk!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Design and order your custom printed clothes with ease.
        </p>
        <Link
          to="/products"
          className="px-8 py-4 bg-pink-500 text-white text-lg rounded-lg hover:bg-pink-400 transition duration-300"
        >
          Start Designing
        </Link>
      </div>
    </div>
  );
}

export default Home;
