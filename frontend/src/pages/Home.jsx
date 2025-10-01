import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import Navbar from '../components/Navbar';
import Tabs from '../components/Tabs';
import axios from 'axios';
import Footer from '../components/Footer';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Handle token in the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Save token in localStorage or other secure storage
      localStorage.setItem('authToken', token);

      // Clear the token from the URL
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/products/get`, { page: 1, limit: 20 });
        console.log('Fetched products:', response.data);
        setProducts(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching products:', error.response || error.message);
      }
    };
    fetchProducts();
  }, []);

  const carouselImages = [
    { src: 'https://m.media-amazon.com/images/I/71VcGrxQRBL._SX3000_.jpg', alt: 'Image 1', caption: 'Welcome to Our Store', link: '/category/electronics' },
    { src: 'https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg', alt: 'Image 2', caption: 'Exclusive Offers', link: '/category/phones' },
    { src: 'https://m.media-amazon.com/images/I/818WR6jtOyL._SX3000_.jpg', alt: 'Image 3', caption: 'Best Deals', link: '/category/furniture' },
  ];

  return (
    <div>
      <Navbar />
      <Tabs />

      {/* Carousel */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ height: '350px', overflow: 'hidden' }}
      >
        <div className="carousel-inner" style={{ height: '100%' }}>
          {carouselImages.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              key={index}
              style={{ height: '100%' }}
            >
              <img
                src={image.src}
                className="d-block w-100"
                alt={image.alt}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
              {image.link && (
                <a href={image.link} className="carousel-caption d-none d-md-block">
                  <h5>{image.caption}</h5>
                </a>
              )}
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Products */}
      <div className="container mt-4">
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="col-6 col-md-4 mb-4">
                <div 
                  className="card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.image && product.image.length > 0 ? product.image[0]?.url || product.image[0] : '/path/to/default-image.jpg'}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <strong>${product.price}</strong>
                    </p>
                    <span className="free-delivery">Free Delivery</span>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product._id}`);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
