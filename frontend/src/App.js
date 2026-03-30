
import React, { useState } from 'react';
import './FlipkartTheme.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Home from './Home';

function App() {
  // Example state for demo
  const [cartItems] = useState([
    { _id: '1', name: 'Sneaker A', price: 100, quantity: 2 },
  ]);

  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
