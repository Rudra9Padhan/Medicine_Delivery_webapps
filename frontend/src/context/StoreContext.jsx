import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the StoreContext
export const StoreContext = createContext(null);

// Provider component
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [med_list, setMedicineList] = useState([]);
  
  const setFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(`${url}/api/upload`, formData);
    console.log(response.data);
  };

  const addToCart = async (itemId) => {
    try {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        return updatedCart;
      });

      if (token) {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => {
        if (!prev[itemId]) return prev; // If item doesn't exist, do nothing
        const updatedCart = { ...prev };
        if (updatedCart[itemId] === 1) {
          delete updatedCart[itemId]; // Remove the item if quantity is 1
        } else {
          updatedCart[itemId] -= 1; // Decrease quantity
        }
        return updatedCart;
      });

      if (token) {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = med_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };
 
  const fetchMedicineList = async () => {
    try {
      const response = await axios.get(`${url}/api/medicine/list`);
      setMedicineList(response.data.data);
    } catch (error) {
      console.error("Error fetching medicine list:", error);
    }
  };

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.CartData);
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchMedicineList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, []); // Empty dependency array to run only once on mount

  const contextValue = {
    med_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    setFile,
    token,
    setToken,
    fetchMedicineList,
    loadCartData
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;