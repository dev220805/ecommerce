import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/user/user-details', { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.data);
        }
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfile && !event.target.closest('.dropdown')) {
        setShowProfile(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfile]);

  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout', { withCredentials: true });
      setUser(null);
      setShowProfile(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Hamburger Icon */}
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i
              className="fa-solid fa-compass fs-3 ms-2"
              style={{ marginTop: '2px' }}
            ></i>
          </Link>

          {/* Links for smaller screens */}
          <div className="d-lg-none d-flex align-items-center ms-auto">
            <Link to="/add-product" className="me-3" style={{ color: 'black' }}>
              <i className="fa-solid fa-plus fs-5"></i>
            </Link>
            <Link to="/cart" className="me-3" style={{ color: 'black' }}>
              <i className="fa-solid fa-cart-shopping fs-5"></i>
            </Link>
            {user ? (
              <div className="dropdown me-2">
                <button
                  className="btn btn-link p-0"
                  style={{ color: 'black', border: 'none' }}
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <i className="fa-solid fa-user fs-5"></i>
                </button>
                {showProfile && (
                  <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '100%' }}>
                    <div className="dropdown-item-text">
                      <strong>{user.name}</strong><br />
                      <small>{user.email}</small>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="me-2" style={{ color: 'black' }}>
                <i className="fa-solid fa-user fs-5"></i>
              </Link>
            )}
          </div>

          {/* Search bar for larger screens */}
          <form
            className="d-flex d-none d-lg-flex mx-auto"
            role="search"
            onSubmit={handleSearchSubmit}
            style={{ flexGrow: '1', maxWidth: '600px' }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for Products"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: '100%' }}
            />
          </form>

          {/* Links for larger screens */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/cart">
                  <i className="fa-solid fa-cart-shopping me-2"></i>Cart
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/add-product">
                  <i className="fa-solid fa-plus me-2"></i>Add Products
                </Link>
              </li>
              <li className="nav-item ms-4">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="nav-link btn btn-link"
                      style={{ border: 'none', background: 'none' }}
                      onClick={() => setShowProfile(!showProfile)}
                    >
                      <i className="fa-solid fa-user me-2"></i>{user.name}
                    </button>
                    {showProfile && (
                      <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '100%' }}>
                        <div className="dropdown-item-text">
                          <strong>{user.name}</strong><br />
                          <small>{user.email}</small>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-user me-2"></i>Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Off-canvas menu for smaller screens */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
              <hr />
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-product">
                Add Products
              </Link>
              <hr />
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
              <hr />
            </li>
            <li className="nav-item">
              {user ? (
                <div>
                  <div className="nav-link">
                    <strong>{user.name}</strong><br />
                    <small>{user.email}</small>
                  </div>
                  <button className="nav-link btn btn-link text-start p-0" onClick={handleLogout}>
                    Logout
                  </button>
                  <hr />
                </div>
              ) : (
                <div>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <hr />
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Search bar for smaller screens */}
      <div className="d-lg-none bg-light p-3">
        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
          <input
            className="form-control"
            type="search"
            placeholder="Search for Products"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: '100%' }}
          />
        </form>
      </div>
    </>
  );
};

export default Navbar;
