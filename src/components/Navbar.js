import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏨 e-Hotels
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/search" className="nav-link">
              Customer Search
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/employee" className="nav-link">
              Employee Portal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/views" className="nav-link">
              Database Views
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
