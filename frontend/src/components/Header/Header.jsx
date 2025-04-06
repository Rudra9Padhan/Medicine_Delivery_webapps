import React, { useEffect, useState } from 'react';
import './Header.css'; // Custom CSS for the slider
import slider1 from '../../assets/slider1.jpeg';
import slider2 from '../../assets/slider2.jpeg';
import slider3 from '../../assets/slider3.jpeg'; // Ensure all images are imported correctly

const Header = () => {
  // Array of slider images with captions
  const sliderImages = [
    { src: slider1, alt: 'Slider 1', caption: 'Your Health, Our Priority' },
    { src: slider2, alt: 'Slider 2', caption: 'Fast and Reliable Medicine Delivery' },
    { src: slider3, alt: 'Slider 3', caption: 'Caring for You, Always' },
  ];

  // State to track the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [sliderImages.length]);

  return (
    <div className="header">
      <div className="slider-container">
        {/* Slider Wrapper */}
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Move slides based on the current index
            transition: 'transform 0.5s ease-in-out', // Smooth transition effect
          }}
        >
          {/* Render each slide */}
          {sliderImages.map((image, index) => (
            <div className="slider-item" key={index}>
              <img src={image.src} alt={image.alt} className="slider-image" />
              <div className="slider-caption">
                <h2>{image.caption}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="slider-dots">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)} // Navigate to the selected slide
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Header;