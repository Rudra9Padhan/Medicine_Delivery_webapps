import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const toggleForm = () => setIsRegister(!isRegister);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isRegister ? `${url}/api/user/register` : `${url}/api/user/login`;

    try {
      const response = await axios.post(endpoint, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`login-popup-overlay ${isRegister ? 'register-active' : 'login-active'}`} onClick={() => setShowLogin(false)}>
      <div className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-greeting">
          <h2>{isRegister ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
          <p>{isRegister ? 'Already have an account?' : "Don't have an account yet?"}</p>
          <button onClick={toggleForm}>{isRegister ? 'Login' : 'Register'}</button>
        </div>
        <div className="login-popup-form">
          <div className="login-popup-title">
            <h2>{isRegister ? 'Sign Up' : 'Login'}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
          </div>
          <form onSubmit={handleSubmit} className="login-popup-inputs">
            {isRegister && <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
            <button type="submit">{isRegister ? 'Create Account' : 'Login'}</button>
          </form>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms and conditions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
