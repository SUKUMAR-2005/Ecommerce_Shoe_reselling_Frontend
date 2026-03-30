import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        const url = keyword ? `http://localhost:5000/api/products?keyword=${keyword}` : 'http://localhost:5000/api/products';
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [keyword]);

  if (loading) return <div className="container"><h2>Loading Products...</h2></div>;
  if (error) return <div className="container"><h2>{error}</h2></div>;

  return (
    <div className="container animate-fade-in">
      <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>
        {keyword ? `Search Results for "${keyword}"` : 'All Products'}
      </h2>

      {products.length === 0 ? (
        <div className="card"><h3>No products found.</h3></div>
      ) : (
        <div className="product-grid">
          {products.map((product, idx) => {
            const demoImages = [
              'https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/6/2/2/6-380-6-world-wear-footwear-grey-original-imagqz2gqzqzqzqz.jpeg?q=70',
              'https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/2/2/2/6-380-6-world-wear-footwear-black-original-imagqz2gqzqzqzqz.jpeg?q=70',
              'https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/8/2/2/6-380-6-world-wear-footwear-blue-original-imagqz2gqzqzqzqz.jpeg?q=70',
              'https://rukminim1.flixcart.com/image/832/832/xif0q/shoe/4/2/2/6-380-6-world-wear-footwear-red-original-imagqz2gqzqzqzqz.jpeg?q=70',
            ];
            const imgSrc = product.image || demoImages[idx % demoImages.length];
            return (
              <div className="product-card" key={product._id}>
                <div className="product-img-wrapper">
                  <img src={imgSrc} className="product-img" alt={product.name} />
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductList;
