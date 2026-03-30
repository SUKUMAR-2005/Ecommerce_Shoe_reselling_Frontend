import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container animate-fade-in">
      <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #2874f0 0%, #1a5ac6 100%)', color: 'white', padding: '4rem', textAlign: 'center', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 800 }}>Step Up Your Game</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9 }}>Discover the latest trends in premium footwear. Exclusive drops every week.</p>
        <Link to="/products" className="btn-secondary" style={{ display: 'inline-block', width: 'auto', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>Shop Now</Link>
      </div>

      <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>Deals of the Day</h2>
      {loading ? (
        <div>Loading deals...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-img-wrapper">
                <img src={product.image} className="product-img" alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="rating">★ {product.rating || '4.5'} ({product.numReviews || 0})</div>
                <div className="product-price">
                  ${product.price}
                </div>
                <Link to={`/products/${product._id}`} className="btn-primary" style={{ marginTop: '1rem', textDecoration: 'none' }}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
