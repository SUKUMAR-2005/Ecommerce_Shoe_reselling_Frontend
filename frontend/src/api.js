import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

export const fetchCart = async (userId) => {
  const res = await axios.get(`${API_BASE}/cart/${userId}`);
  return res.data;
};

// Add more API functions as needed
