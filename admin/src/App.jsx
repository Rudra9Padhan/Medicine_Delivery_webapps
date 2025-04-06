import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Added useNavigate
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAuth from './pages/AdminAuth/AdminAuth';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import ManageReports from './pages/ManageReport/ManageReports';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard'; // Corrected import path for Dashboard
import AdminContact from './pages/AdminContact/AdminContact'

const App = () => {
  const url = "http://localhost:4000";
  const navigate = useNavigate(); // Initialize navigate

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Ensure it's a boolean

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    navigate('/adminauth'); // Redirect to login page
  };

  return (
    <div>
      <ToastContainer />
      {isLoggedIn && <Navbar onLogout={handleLogout} />} {/* Pass logout handler to Navbar */}
      <hr />
      <div className="app-content">
        {isLoggedIn && <Sidebar />} {/* Show Sidebar only if logged in */}
        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? '/dashboard' : '/adminauth'} />}
          />
          {/* Redirect to AdminAuth if not logged in */}
          {!isLoggedIn && <Route path="/adminauth" element={<AdminAuth />} />}
          {/* Protected Routes */}
          {isLoggedIn && (
            <>
              <Route path="/admincontact" element={<AdminContact />} /> {/* Ensure AdminContact is rendered */}
              <Route path="/dashboard" element={<Dashboard />} /> {/* Ensure Dashboard is rendered */}
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/managereport" element={<ManageReports />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </>
          )}
          {/* Catch-all route to redirect to the appropriate page */}
          <Route path="*" element={<Navigate to={isLoggedIn ? '/add' : '/adminauth'} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;