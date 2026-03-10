import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏨 Hotel Booking System
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/hotels" className="nav-link">
              Browse Hotels
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reservations" className="nav-link">
              My Reservations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
