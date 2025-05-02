import React, { useEffect, useState } from 'react';

function Customize() {
  const [product, setProduct] = useState(null);
  const [design, setDesign] = useState(null);
  const [position, setPosition] = useState('front');
  const [color, setColor] = useState('white');
  const [size, setSize] = useState('M');

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selected) {
      setProduct(selected);
    } else {
      alert('No product selected. Redirecting to products...');
      window.location.href = '/products';
    }
  }, []);

  const handleImageUpload = (e) => {
    setDesign(URL.createObjectURL(e.target.files[0]));
  };

  const addToCart = () => {
    const newItem = {
      product: product.name,
      price: product.price,
      design,
      position,
      color,
      size,
    };
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    storedCart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert('Item added to cart!');
  };

  if (!product) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="max-w-2xl w-full bg-pink-50 p-6 rounded-xl shadow space-y-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Customize Your {product.name}
        </h2>

        {/* Upload Design */}
        <div>
          <label className="block text-pink-700 font-semibold mb-1">Upload Design Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Select Position */}
        <div>
          <label className="block text-pink-700 font-semibold mb-1">Choose Print Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="front">Front</option>
            <option value="back">Back</option>
            <option value="left-sleeve">Left Sleeve</option>
            <option value="right-sleeve">Right Sleeve</option>
          </select>
        </div>

        {/* Select Color */}
        <div>
          <label className="block text-pink-700 font-semibold mb-1">Select Product Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>

        {/* Select Size */}
        <div>
          <label className="block text-pink-700 font-semibold mb-1">Choose Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>
        </div>

        {/* Live Preview */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-pink-600">Live Preview</h3>
          <div className={`w-64 h-64 mx-auto border-4 border-pink-200 flex items-center justify-center bg-${color} overflow-hidden rounded-lg`}>
            {design ? (
              <img src={design} alt="design preview" className="w-40 h-40 object-contain" />
            ) : (
              <span className="text-gray-600">No design uploaded</span>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-700">Position: {position}</p>
        </div>

        <button
          onClick={addToCart}
          className="w-full bg-orange-500 text-blue-500 rounded-lg hover:bg-pink-400 px-4 py-2  transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Customize;
