import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    navigate(`/cart?productId=${id}&qty=${qty}`);
  };

  if (loading) return <div className="container"><h2>Loading...</h2></div>;
  if (error) return <div className="container"><h2>{error}</h2></div>;
  if (!product) return null;

  const imgSrc = product.image || 'https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/6/2/2/6-380-6-world-wear-footwear-grey-original-imagqz2gqzqzqzqz.jpeg?q=70';

  return (
    <div className="container animate-fade-in">
      <Link to="/products" className="btn-login" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Go Back</Link>
      <div className="card" style={{ display: 'flex', gap: '3rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center', background: '#fafafa', padding: '2rem', borderRadius: '8px' }}>
          <img src={imgSrc} alt={product.name} style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }} />
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h2>
          <div className="rating" style={{ marginBottom: '1rem', padding: '0.4rem 0.8rem', fontSize: '1rem' }}>
            ★ {product.rating || '4.5'} ({product.numReviews || 0} reviews)
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2874f0', marginBottom: '1rem' }}>
            ${product.price}
          </div>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
            {product.description || 'Premium quality shoe designed for optimal performance and comfort. Perfect for everyday wear or sports activities.'}
          </p>

          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span>Price:</span>
              <strong>${product.price}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}>
              <span>Status:</span>
              <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
            </div>

            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                <span>Qty:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))} 
                  style={{ padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  {[...Array(product.countInStock > 10 ? 10 : product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button 
              className="btn-secondary" 
              onClick={addToCartHandler} 
              disabled={product.countInStock === 0}
              style={{ padding: '1rem', fontSize: '1.1rem' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
