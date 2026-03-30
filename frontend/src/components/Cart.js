import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const addProductId = searchParams.get('productId');
  const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1;

  useEffect(() => {
    const fetchCartAndUpdate = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo) {
        navigate('/login');
        return;
      }
      try {
        setLoading(true);
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        
        if (addProductId) {
           await axios.post('http://localhost:5000/api/cart', {
              productId: addProductId,
              qty: qty,
              name: 'Premium Sneaker',
              price: 120.99
           }, config).catch(e => console.log(e));
           navigate('/cart', { replace: true });
        }

        const { data } = await axios.get('http://localhost:5000/api/cart', config);
        setCartItems(data.cartItems || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCartAndUpdate();
  }, [addProductId, qty, navigate]);

  const removeFromCartHandler = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.delete(`http://localhost:5000/api/cart/${id}`, config);
      setCartItems(cartItems.filter(x => x.product !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '2', minWidth: '300px' }}>
        <h2 style={{ marginBottom: '1.5rem', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>Shopping Cart</h2>
        {loading ? (
          <div>Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className="card">
            Your cart is empty. <Link to="/" style={{ color: '#2874f0', fontWeight: 'bold' }}>Go Back</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map((item) => (
              <div key={item.product} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem' }}>
                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px' }} />
                <div style={{ flex: '1' }}>
                  <Link to={`/products/${item.product}`} style={{ textDecoration: 'none', color: '#212121', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.name || 'Premium Sneaker'}</Link>
                </div>
                <div style={{ fontWeight: 'bold', color: '#2874f0', fontSize: '1.1rem' }}>${item.price || 120.99}</div>
                <div>
                   Qty: {item.qty}
                </div>
                <button type="button" onClick={() => removeFromCartHandler(item.product)} style={{ background: 'transparent', border: 'none', color: '#ff6161', cursor: 'pointer', fontWeight: 'bold' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: '1', minWidth: '300px' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
          </h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            ${cartItems.reduce((acc, item) => acc + item.qty * (item.price || 120.99), 0).toFixed(2)}
          </div>
          <button 
            type="button" 
            className="btn-secondary" 
            disabled={cartItems.length === 0} 
            onClick={checkoutHandler}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
