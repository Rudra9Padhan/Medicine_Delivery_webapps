import React from 'react';
import './AboutUs.css'; // Ensure the CSS file is updated for styling
import { FaHeartbeat, FaTruck, FaSmile } from 'react-icons/fa'; // Import icons for creativity

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2 className="about-us-title">About <span>QUICKMeds</span></h2>
      <p className="about-us-intro">
        Welcome to <strong>QUICKMeds</strong>, your trusted partner in medicine delivery. 
        We are dedicated to making healthcare accessible, reliable, and convenient for everyone.
      </p>

      <div className="about-us-mission">
        <h3>Our Mission</h3>
        <p>
          To revolutionize healthcare by providing fast, reliable, and affordable medicine delivery 
          services, ensuring that everyone has access to the care they need.
        </p>
      </div>

      <div className="about-us-features">
        <div className="feature">
          <FaHeartbeat className="feature-icon" />
          <h4>Health First</h4>
          <p>We prioritize your health and well-being with quality medicines and services.</p>
        </div>
        <div className="feature">
          <FaTruck className="feature-icon" />
          <h4>Fast Delivery</h4>
          <p>Get your medicines delivered to your doorstep quickly and efficiently.</p>
        </div>
        <div className="feature">
          <FaSmile className="feature-icon" />
          <h4>Customer Satisfaction</h4>
          <p>We are committed to providing a seamless and satisfying experience for our customers.</p>
        </div>
      </div>

      <p className="about-us-thankyou">
        Thank you for choosing <strong>QUICKMeds</strong>. Together, let's make healthcare simpler and better.
      </p>
    </div>
  );
};

export default AboutUs;