import React, { useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        alert('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} className='logo' alt="" />
          <p>QUICKMeds Trusted Medicine Delivery Service</p>
          <p>We ensure fast, reliable, and safe delivery of medicines to your doorstep, making healthcare accessible and convenient for everyone.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>Call : +91-9178498927</li>
            <li>Email : contact@quickmeds.com</li>
          </ul>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-contact-form-container">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit} className="footer-contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © QUICKMeds.com - All Right Reserved(BY Developer Rudra).</p>
    </div>
  );
};

export default Footer;