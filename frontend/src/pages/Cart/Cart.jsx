import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, med_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {med_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-item"> {/* Use item._id as the key */}
                <img src={`${url}/image/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{cartItems[item._id] * item.price}</p>
                <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                <hr />
              </div>
            );
          }
          return null; // Return null if the item is not in the cart
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal:</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee:</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2.5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total:</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2.5}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCESS TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='Promo code' />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;