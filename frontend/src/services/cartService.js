// frontend/src/services/cartService.js
import axios from 'axios';

export const addToCart = async (productId, quantity) => {
  try {
    await axios.post(
      '/api/cart/create',
      { productId, quantity },
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
