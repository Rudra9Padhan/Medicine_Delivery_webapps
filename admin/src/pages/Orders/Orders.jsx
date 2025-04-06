import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the server
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('An error occurred while fetching orders.');
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        toast.success('Order status updated successfully.');
        await fetchAllOrders(); // Refresh orders
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('An error occurred while updating order status.');
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-container">
      <h3>Order Page</h3>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <OrderItem key={order._id || index} order={order} statusHandler={statusHandler} />
          ))}
        </div>
      ) : (
        <p className="no-orders-message">No orders available.</p>
      )}
    </div>
  );
};

const OrderItem = ({ order, statusHandler }) => (
  <div className="order-item">
    <img src={assets.parcel_icon} alt="Parcel Icon" className="parcel-icon" />
    <div className="order-details">
      <p className="order-item-medicine">
        {order.items.map((item, idx) => (
          <span key={idx}>
            {item.name} X {item.quantity}
            {idx < order.items.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
      <p className="order-item-name">
        {order.address.firstName} {order.address.lastName}
      </p>
      <div className="order-item-address">
        <p>{order.address.street},</p>
        <p>
          {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
        </p>
      </div>
      <p className="order-item-phone">{order.address.phone}</p>
    </div>
    <div className="order-summary">
      <p>Items: {order.items.length}</p>
      <p>₹{order.amount.toFixed(2)}</p>
    </div>
    <div className="order-status">
      <label htmlFor={`status-${order._id}`}>Status:</label>
      <select
        id={`status-${order._id}`}
        onChange={(event) => statusHandler(event, order._id)}
        value={order.status}
      >
        <option value="Package Processing">Package Processing</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  </div>
);

export default Orders;
