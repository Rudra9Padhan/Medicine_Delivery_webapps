import React from 'react';
import './Category.css';
import { category_list } from '../../assets/assets';

const Category = ({ category, setCategory }) => {
  return (
    <div className="Category" id="Category">
      <h1>Explore Our Categories</h1>
      <p className="Category-text">
        Your health is our top priority, and we are here to provide you with a seamless and reliable shopping experience.
      </p>
      <div className="Category-list">
        {category_list && category_list.length > 0 ? (
          category_list.map((item, index) => {
            return (
              <div
                onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
                key={index}
                className="Category-list-item"
              >
                <img
                  className={category === item.menu_name ? "active" : ""}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })
        ) : (
          <p>No categories available</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Category;
