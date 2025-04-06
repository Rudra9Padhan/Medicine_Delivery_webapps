import React from 'react';
import MedicineItem from '../MedicineItem/MedicineItem';
import "./ProductQuickView.css";

const ProductQuickView = ({ product, onClose }) => {
    if (!product) {
        return null; // If no product is selected, don't render the modal
    }

    return (
        <div className="quick-view-overlay">
            <div className="quick-view-modal">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <MedicineItem 
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    isQuickView={true} // Pass this prop to disable the "Quick View" button
                />
            </div>
        </div>
    );
};

export default ProductQuickView;
