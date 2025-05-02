// client/src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to load products:', err));
  }, []);

  const handleCustomize = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/customize');
  };

  return (
    <div className="min-h-screen w-full bg-white p-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-extrabold text-pink-500 mb-10 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-pink-200 bg-pink-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              {/* Image container with fixed aspect ratio */}
              <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-pink-600 mb-2">{product.name}</h3>
              <p className="text-gray-700 text-md mb-4">₹{product.price}</p>

              <button
                onClick={() => handleCustomize(product)}
                className="mt-auto px-4 py-2 bg-orange-500 text-blue-500 rounded-lg hover:bg-pink-400 transition-colors duration-300"
              >
                Customize
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
