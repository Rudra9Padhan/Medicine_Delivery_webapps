import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';

// Helper function to get hidden orders from localStorage (admin specific key)
const getAdminHiddenOrders = () => {
    const hidden = localStorage.getItem('adminHiddenCancelledOrders');
    return hidden ? JSON.parse(hidden) : [];
};

// Helper function to save hidden orders to localStorage (admin specific key)
const saveAdminHiddenOrders = (hiddenIds) => {
    localStorage.setItem('adminHiddenCancelledOrders', JSON.stringify(hiddenIds));
};


const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);
    const [hiddenOrderIds, setHiddenOrderIds] = useState(getAdminHiddenOrders()); // Load hidden IDs on init

    // Fetch all orders from the server
    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                // Filter out orders whose IDs are in the hidden list
                const visibleOrders = response.data.data.filter(order => !hiddenOrderIds.includes(order._id));
                // Optional: Sort orders if needed, e.g., by date descending
                const sortedVisibleOrders = visibleOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(sortedVisibleOrders);
                console.log(sortedVisibleOrders);
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
        const newStatus = event.target.value;
        try {
            const response = await axios.post(`${url}/api/order/status`, {
                orderId,
                status: newStatus,
            });
            if (response.data.success) {
                toast.success('Order status updated successfully.');
                // Update status locally immediately for better UX
                setOrders(prevOrders => prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                ));
                // Optionally re-fetch if needed, but local update is faster
                // await fetchAllOrders();
            } else {
                toast.error('Failed to update order status.');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('An error occurred while updating order status.');
        }
    };

    // Function to hide a cancelled order from the admin view
    const handleHideCancelledOrder = (orderIdToHide) => {
        const updatedHiddenIds = [...hiddenOrderIds, orderIdToHide];
        setHiddenOrderIds(updatedHiddenIds); // Update state
        saveAdminHiddenOrders(updatedHiddenIds); // Save to localStorage

        // Remove from current view immediately
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderIdToHide));
        toast.info("Cancelled order hidden from admin view.", { autoClose: 2000 });
    };


    // Fetch orders on component mount or when hidden IDs change
    useEffect(() => {
        fetchAllOrders();
    }, [hiddenOrderIds]); // Re-fetch if hidden IDs change

    return (
        <div className="order-container">
            <h3>Order Page</h3>
            {orders.length > 0 ? (
                <div className="order-list">
                    {orders.map((order, index) => (
                        <OrderItem
                            key={order._id || index}
                            order={order}
                            statusHandler={statusHandler}
                            onHideCancelled={handleHideCancelledOrder} // Pass handler down
                        />
                    ))}
                </div>
            ) : (
                <p className="no-orders-message">No orders available.</p>
            )}
        </div>
    );
};

// Updated OrderItem component
const OrderItem = ({ order, statusHandler, onHideCancelled }) => {
    const isCancelled = order.status === "Cancelled";

    return (
        // Add 'is-cancelled' class for potential styling
        <div className={`order-item ${isCancelled ? 'is-cancelled' : ''}`}>
            {/* Conditionally render the hide indicator */}
            {isCancelled && (
                <div
                    className="admin-cancelled-indicator"
                    title="Hide this cancelled order"
                    onClick={() => onHideCancelled(order._id)} // Call handler on click
                >
                    &#x2715;
                </div>
            )}

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
                    // Disable select if order is cancelled? Optional
                    // disabled={isCancelled}
                >
                    <option value="Package Processing">Package Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>
        </div>
    );
};


export default Orders;