import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are dedicated to providing high-quality products at affordable prices. 
              Our mission is to make online shopping convenient, secure, and enjoyable for everyone.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/add-product">Add Product</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: support@example.com</p>
            <p>Phone: +1 (234) 567-890</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} My E-commerce Project. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
