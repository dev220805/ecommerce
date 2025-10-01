import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import SearchResults from './pages/SearchResults';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
  const [cart, setCart] = useState([]); // State to manage the cart

  return (
    <Router>
      <div>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Add Product Page */}
          <Route path="/add-product" element={<AddProduct />} />

          {/* Product Info Page */}
          <Route
            path="/product/:id"
            element={<ProductInfo cart={cart} setCart={setCart} />}
          />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

          {/* Search Results Page */}
          <Route path="/search" element={<SearchResults />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Register Page */}
          <Route path="/register" element={<Register />} />

          {/* Dashboard Page */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
