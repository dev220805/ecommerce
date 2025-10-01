import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import './Cart.css';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  
  // Check authentication and fetch cart data
  useEffect(() => {
    const checkAuthAndFetchCart = async () => {
      try {
        // Check if user is authenticated
        const response = await axios.get('/api/user/user-details', { withCredentials: true });
        if (!response.data.success) {
          navigate('/login');
          return;
        }
        
        // Fetch cart from backend
        const cartResponse = await axios.get('/api/cart/get', { withCredentials: true });
        if (cartResponse.data.success) {
          setCart(cartResponse.data.data || []);
        }
      } catch (error) {
        console.error('Auth check or cart fetch failed:', error);
        navigate('/login');
      }
    };
    
    checkAuthAndFetchCart();
  }, [navigate, setCart]);

  // Handle remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle quantity change
  const updateQuantity = (index, quantity) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.productId?.price || 0) * item.quantity, 0).toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <Tabs />
      <div className="container mt-4">
        {/* <h2>Your Cart</h2> */}
        {cart.length === 0 ? (
          <div>
            <h2>Your Cart is Empty</h2>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div
                key={index}
                className="cart-item"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Product Image */}
                <img
                  src={item.productId?.image && item.productId.image.length > 0 ? 
                    (item.productId.image[0]?.url || item.productId.image[0]) : 
                    'default-image-url.jpg'}
                  alt={item.productId?.name || 'Product'}
                  style={{
                    width: '100px',
                    height: 'auto',
                    objectFit: 'contain',
                    marginRight: '15px',
                  }}
                />
                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      margin: '0',
                      color: '#007185',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    {item.productId?.name || 'Product'}
                  </h4>
                  <div
                    className="quantity-control"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '8px',
                    }}
                  >
                    <label style={{ fontSize: '14px', color: '#555' }}>Qty:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        backgroundColor: '#f8f8f8',
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: '#b12704',
                        fontSize: '20px',
                        cursor: 'pointer',
                      }}
                    >
                      &#x1F5D1; {/* Trash can icon */}
                    </button>
                  </div>
                </div>
                {/* Product Price */}
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#b12704',
                    alignSelf: 'center',
                  }}
                >
                  ${(item.productId?.price || 0) * item.quantity} {/* Calculate total price dynamically */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Price */}
        {cart.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            <span>Total: ${calculateTotalPrice()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

// final