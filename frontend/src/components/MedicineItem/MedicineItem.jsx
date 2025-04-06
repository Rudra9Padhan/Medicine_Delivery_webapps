import React, { useContext, useState } from 'react';
import './MedicineItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import ProductQuickView from '../ProductQuickView/ProductQuickView';

const MedicineItem = ({ id, name, price, description, image, isQuickView = false }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = () => {
    setSelectedProduct({ id, name, price, description, image });
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="medicine-item">
      <div className="medicine-item-img-container">
        <img
          className="medicine-item-image"
          src={`${url}/image/${image}`}
          alt={`Image of ${name}`}
        />
        {!cartItems?.[id] ? ( // Add null check for cartItems
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
            className="add"
          />
        ) : (
          <div className="medicine-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Decrease quantity"
              className="counter"
            />
            <p className="medicine-quantity">{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Increase quantity"
              className="counter"
            />
          </div>
        )}
      </div>
      <div className="medicine-info">
        <div className="medicine-header">
          <p className="medicine-name">{name}</p>
          <img
            src={assets.rating_starts}
            alt="Rating stars"
            className="rating-stars"
          />
        </div>
        <p className="medicine-desc">{description}</p>
        <p className="medicine-price">₹{price.toFixed(2)}</p>
        {!isQuickView && ( // Render "Quick View" button only if not in quick view mode
          <button onClick={handleQuickView} className="quick-view-button">Quick View</button>
        )}
        {selectedProduct && (
          <ProductQuickView product={selectedProduct} onClose={closeQuickView} />
        )}
      </div>
    </div>
  );
};

export default MedicineItem;
