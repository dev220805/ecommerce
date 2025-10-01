import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user/login', { email, password }, { withCredentials: true });
      if (response && response.data && response.data.success) {
        navigate('/');
      } else {
        alert(response?.data?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <a href="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </a>
            <br />
            <a href="/register" className="text-decoration-none">
              Don't have an account? Register here.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;