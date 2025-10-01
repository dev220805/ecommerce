import React from 'react';
import { Link } from 'react-router-dom';
import './Tabs.css'; // Import the CSS file

const Tabs = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          All
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/deals">
          Today's Deal
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/customer-service">
          Customer Service
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/registry">
          Registry
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/gift-cards">
          Gift Cards
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/sell">
          Sell
        </Link>
      </li>
    </ul>
  );
};

export default Tabs;
