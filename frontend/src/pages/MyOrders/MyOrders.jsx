import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

// Helper function to get hidden orders from localStorage
const getHiddenOrders = () => {
    const hidden = localStorage.getItem('hiddenCancelledOrders');
    return hidden ? JSON.parse(hidden) : [];
};

// Helper function to save hidden orders to localStorage
const saveHiddenOrders = (hiddenIds) => {
    localStorage.setItem('hiddenCancelledOrders', JSON.stringify(hiddenIds));
};


const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [hiddenOrderIds, setHiddenOrderIds] = useState(getHiddenOrders()); // Load hidden IDs on init

    const fetchOrders = async () => {
        if (!token) return; // Ensure token exists before fetching

        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            const sortedData = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Filter out orders whose IDs are in the hidden list
            const visibleOrders = sortedData.filter(order => !hiddenOrderIds.includes(order._id));

            setData(visibleOrders);
        } catch (error) {
            toast.error("Failed to fetch orders.");
            console.error("Fetch orders error:", error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }
        try {
            const response = await axios.post(`${url}/api/order/cancel`, { orderId }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                // Update status locally
                setData(prevData => prevData.map(order =>
                    order._id === orderId ? { ...order, status: "Cancelled" } : order
                ));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to cancel order. Please try again.");
            console.error("Cancel order error:", error);
        }
    };

    // Updated function to remove order permanently from view
    const handleRemoveCancelledOrder = (orderIdToRemove) => {
        // Update the list of hidden IDs
        const updatedHiddenIds = [...hiddenOrderIds, orderIdToRemove];
        setHiddenOrderIds(updatedHiddenIds); // Update state
        saveHiddenOrders(updatedHiddenIds); // Save to localStorage

        // Remove from current view immediately
        setData(prevData => prevData.filter(order => order._id !== orderIdToRemove));
        toast.info("Cancelled order hidden.", { autoClose: 2000 });
    };


    // Fetch orders when token changes or hiddenOrderIds list changes (though fetchOrders itself uses hiddenOrderIds)
    useEffect(() => {
        fetchOrders();
    }, [token, hiddenOrderIds]); // Re-fetch if hidden IDs change (optional, filtering happens in fetchOrders anyway)

    return (
      <div className='my-orders'>
          <h2>My Orders</h2>
          <div className="container">
              {data.length === 0 && <p>You haven't placed any orders yet.</p>}
              {data.map((order) => {
                  const canCancel = order.status !== "Delivered" && order.status !== "Cancelled" && order.status !== "Out for delivery";
                  const isCancelled = order.status === "Cancelled";

                  return (
                      <div key={order._id} className={`my-orders-order ${isCancelled ? 'is-cancelled' : ''}`}>
                          {isCancelled && (
                              <div
                                  className="cancelled-indicator"
                                  title="Hide this order"
                                  onClick={() => handleRemoveCancelledOrder(order._id)}
                              >
                                  &#x2715;
                              </div>
                          )}

                          <img src={assets.parcel_icon} alt="" />
                          <p>{order.items.map((item, index) => {
                              if (index === order.items.length - 1) {
                                  return item.name + " X " + item.quantity;
                              } else {
                                  return item.name + " X " + item.quantity + ", ";
                              }
                          })}</p>
                          <p>₹{order.amount.toFixed(2)}</p>
                          <p>Items: {order.items.length}</p>
                          <p><span className={`status-dot status-${order.status.toLowerCase().replace(' ', '-')}`}>&#x25cf;</span> <b>{order.status}</b></p>
                          <p className='order-date'>Ordered on: {new Date(order.date).toLocaleDateString()}</p>
                          <div className="order-buttons">
                              {!isCancelled && (
                                  <button
                                      className='track-button'
                                      onClick={() => toast.info(`Current Status: ${order.status}`, { autoClose: 3000 })}
                                  >
                                      Track Order
                                  </button>
                              )}
                              {canCancel && (
                                  <button className='cancel-button' onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
                              )}
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
  );
};

export default MyOrders;