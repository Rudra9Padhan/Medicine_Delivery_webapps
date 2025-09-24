import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminAuth.css';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Signup logic
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      // Save user details in localStorage
      const adminData = { email, password };
      localStorage.setItem('adminData', JSON.stringify(adminData));
      toast.success('Signup successful! Please login.');
      setIsLogin(true); // Switch to login mode
    } else {
      // Login logic
      const storedAdminData = JSON.parse(localStorage.getItem('adminData'));

      if (storedAdminData && email === storedAdminData.email && password === storedAdminData.password) {
        localStorage.setItem('isLoggedIn', 'true'); // Save login status
        toast.success('Login successful!');
        navigate('/dashboard'); // Redirect to the main page
      } else {
        toast.error('Invalid email or password!');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/admin/auth'); // Redirect to the login page
  };

  return (
    <div className="admin-auth">
      <ToastContainer />
      <h2>{isLogin ? 'Admin Login' : 'Admin Sign_up'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
        {isLogin ? "Don't have an account? Signup" : 'Already have an Account? Login'}
      </p>
    </div>
  );
};

export default AdminAuth;