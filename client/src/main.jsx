import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/modern.css'; // Import our new modern CSS
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
