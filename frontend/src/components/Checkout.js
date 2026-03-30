import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const orderData = {
        orderItems: [
          { name: 'Premium Sneaker', qty: 1, price: 120.99, product: '60d5ecb8b392a40b8c000001' }
        ],
        shippingAddress: { address, city, postalCode, country },
        paymentMethod: 'Credit Card Mock',
        itemsPrice: 120.99,
        shippingPrice: 10.00,
        taxPrice: 12.00,
        totalPrice: 142.99
      };
      await axios.post('http://localhost:5000/api/orders', orderData, config);
      alert('Order placed successfully! (Mock Demo)');
      await axios.delete('http://localhost:5000/api/cart', config);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Shipping & Checkout</h2>
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Postal Code</label>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>

          <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '1rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total (Incl. Taxes & Shipping)</span>
            <span style={{ color: '#2874f0' }}>$142.99</span>
          </div>

          <button type="submit" className="btn-secondary" style={{ marginTop: '1rem', padding: '1rem' }}>
            Place Final Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
