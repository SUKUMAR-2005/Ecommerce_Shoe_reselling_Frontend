import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate('/products');
    }
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar animate-fade-in">
      <Link to="/" className="logo">ShoeKart</Link>
      <form onSubmit={handleSearch} className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for sneakers, boots, and more..." 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      <div className="nav-links">
        <Link to="/products" className="nav-item">Explore</Link>
        <Link to="/cart" className="nav-item">Cart</Link>
        {userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 600 }}>Hi, {userInfo.name}</span>
            <button onClick={logoutHandler} className="btn-login" style={{ cursor: 'pointer', border: 'none' }}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn-login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
