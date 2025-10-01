import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [{ url: '' }],
  });

  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/user/user-details', { withCredentials: true });
        if (!response.data.success) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image URL changes for dynamic image fields
  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImages = [...product.images];
    updatedImages[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  // Add a new image URL field
  const handleAddImage = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, { url: '' }],
    }));
  };

  // Remove a specific image URL field
  const handleRemoveImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    console.log('Submitting Product:', product); // Log the product object
  
    if (!product.name || !product.description || !product.price || !product.category || !product.stock || !product.images) {
      setErrorMessage('Please fill out all fields.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('/api/products/create', {
        ...product,
      }, { withCredentials: true });
      console.log('Product added successfully:', response.data); // Log the response
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [{ url: '' }],
      });
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.response || error.message);
      const errorMsg = error.response?.data?.message || 'Failed to add product. Please try again.';
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Add New Product</h2>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a product name.</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            ></textarea>
            <div className="invalid-feedback">Please provide a product description.</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              required
            />
            <div className="invalid-feedback">Please provide a valid price.</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Please provide a product category.</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="stock" className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              min="0"
              required
            />
            <div className="invalid-feedback">Please provide a stock quantity.</div>
          </div>


          {product.images.map((image, index) => (
            <div key={index} className="col-md-6 d-flex align-items-center">
              <div className="flex-grow-1">
                <label htmlFor={`imageUrl-${index}`} className="form-label">
                  Image URL {index + 1}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`imageUrl-${index}`}
                  name="url"
                  value={image.url}
                  onChange={(e) => handleImageChange(e, index)}
                  required
                />
                <div className="invalid-feedback">Please provide an image URL.</div>
              </div>
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary mb-3"
            onClick={handleAddImage}
          >
            Add Another Image
          </button>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


// final