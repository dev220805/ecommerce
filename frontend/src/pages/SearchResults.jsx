import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Extract query from URL

  useEffect(() => {
    // Log the query and products when they change
    if (query) {
      console.log('Search Query:', query);
    }
    if (products.length) {
      console.log('Products:', products);
    }

    // Fetch search results from the backend
    const fetchSearchResults = async () => {
      try {
        const response = await axios.post('/api/products/search-product', { search: query, page: 1, limit: 20 });
        setProducts(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }

  }, [query]); // Run this effect when the query changes

  return (
    <div>
        <Navbar/>
    <div className="container mt-5">
            <h3>Search Results for "{query}"</h3>
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-4" key={product._id}>
                            <div className="card">
                                {/* Image Display with Placeholder */}
                                {product.image && product.image.length > 0 ? (
                                    <img
                                        src={product.image[0]?.url || product.image[0]}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }} // Added style for consistent image height
                                    />
                                ) : (
                                    <img
                                        src="/placeholder_image.jpg" // Path to your placeholder
                                        className="card-img-top"
                                        alt="No Image Available"
                                        style={{ height: '200px', objectFit: 'cover' }} // Added style for consistent image height
                                    />
                                )}

                                <div className="card-body">
                                    {/* Product Information */}
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Price: ${product.price}</p>
                                    {/* Add other product details here */}
                                    <Link to={`/product/${product._id}`} className="btn btn-primary">View Product</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
        </div>
  );
};

export default SearchResults;
