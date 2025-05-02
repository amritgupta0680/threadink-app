import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path is correct for your project structure
import './index.css'; // Optional, if you are using a global CSS file like Tailwind CSS

// Create the root element for React to render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

