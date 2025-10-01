// frontend/src/services/cartService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const addToCart = async (productId, quantity) => {
  try {
    await axios.post(
      `${API_URL}/api/cart/create`,
      { productId, quantity },
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
