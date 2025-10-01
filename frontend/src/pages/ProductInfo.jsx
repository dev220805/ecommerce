import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import { addToCart } from '../services/cartService';
import './ProductInfo.css';
import StarRatingComponent from 'react-star-rating-component';

const ProductInfo = ({ cart = [], setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post('/api/products/get-product-details', { productId: id });
        setProduct(response.data?.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle review submission
  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment || !reviewerName) {
      alert('Please provide a name and a comment.');
      return;
    }

    try {
      const response = await axios.post(
        `/api/products/${id}/review`,
        { reviewerName, rating, comment }
      );
      
      if (response.data.success) {
        setProduct(response.data.data);
        setRating(1);
        setComment('');
        setReviewerName('');
        alert('Review submitted successfully!');
      } else {
        alert('Failed to submit review: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review: ' + (error.response?.data?.message || error.message));
    }
  };

  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: i <= rating ? '#FFD700' : '#dcdcdc' }}
        ></i>
      );
    }
    return stars;
  };

  // Function to handle Add to Cart button click
  const handleAddToCart = async () => {
    if (!product || !product._id) {
      alert('Product details or ID are missing.');
      return;
    }
  
    try {
      // Check if user is authenticated first
      const authResponse = await axios.get('/api/user/user-details', { withCredentials: true });
      if (!authResponse.data.success) {
        alert('Please login to add items to cart');
        navigate('/login');
        return;
      }

      // Add to cart using the service
      await addToCart(product._id, parseInt(quantity, 10));
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      if (error.response?.status === 401) {
        alert('Please login to add items to cart');
        navigate('/login');
      } else {
        alert('An error occurred while adding the product to cart. Please try again.');
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Tabs />
      <div className="container mt-4">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6">
            <img
              src={product.image && product.image.length > 0 ? product.image[0]?.url || product.image[0] : 'default-image-url.jpg'}
              alt={product.name}
              className="product-image"
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="d-flex align-items-center mb-2">
              <strong>Rating:</strong>
              <div>{renderStars(product.ratings || 0)}</div>
              <div className="ms-2">({product.numReviews || 0} Reviews)</div>
            </div>
            <p><strong>Price: </strong>${product.price}</p>

            {/* Add to Cart Button and Quantity Dropdown */}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-warning rounded-3 me-3"
                style={{ backgroundColor: '#FFD700', border: 'none', padding: '10px 20px' }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <select
                className="form-select"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '70px' }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Review Form */}
            <h3 className="mt-4">Add a Review</h3>
            <form onSubmit={submitReview}>
              <div className="form-group">
                <label htmlFor="reviewerName">Your Name:</label>
                <input
                  type="text"
                  id="reviewerName"
                  className="form-control"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rating:</label>
                <StarRatingComponent
                  name="productRating"
                  starCount={5}
                  value={rating}
                  onStarClick={(nextValue) => setRating(nextValue)}
                  starSize={30}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Your Review:</label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success mt-3">Submit Review</button>
            </form>

            {/* Display Reviews */}
            <div className="reviews mt-5">
              <h4>Customer Reviews:</h4>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <div className="review-header">
                      <strong>{review.reviewerName}</strong> - {renderStars(review.rating)}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

// final