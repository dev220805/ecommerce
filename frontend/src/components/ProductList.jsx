import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery === '') {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    axios
      .get(`http://localhost:3000/api/products/search?query=${searchQuery}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
