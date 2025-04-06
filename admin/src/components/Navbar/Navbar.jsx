import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login status from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
    // Redirect to the login page
    navigate('/admin/auth');
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if the user is logged in

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/admin/login" className="admin-button">
            Admin
          </Link>
        )}
        <img className="profile" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default Navbar;