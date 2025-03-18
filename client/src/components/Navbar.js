import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }
    return (
        <nav className="navbar">
        <div className="container">
          <div className="logo">
            EWASTE
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <i className="fas fa-bars"></i>
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/troubleshooting">Troubleshooting</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;