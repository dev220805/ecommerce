// frontend/src/services/reviewService.js
import axios from 'axios';

export const submitReview = async (productId, reviewText, rating) => {
  const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage

  try {
    await axios.post(
      'http://localhost:3000/api/reviews',
      { productId, reviewText, rating },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in request header
        },
      }
    );
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};
