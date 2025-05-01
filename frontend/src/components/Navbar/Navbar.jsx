import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { Link as ScrollLink } from 'react-scroll'; // Import react-scroll
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  const handleSearch = () => {
    toast.info("This feature is coming soon...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link
          to='/'
          onClick={() => {
            setMenu("home");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <ScrollLink
          to='category-section'
          smooth={true}
          duration={500}
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Category
        </ScrollLink>
        <ScrollLink
          to='contact-section'
          smooth={true}
          duration={500}
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact us
        </ScrollLink>
        <Link
          to='/aboutus'
          onClick={() => setMenu("aboutus")}
          className={menu === "aboutus" ? "active" : ""}
        >
          About-us
        </Link> 
        
        <Link
          to='/tracker'
          onClick={() => setMenu("tracker")}
          className={menu === "tracker" ? "active" : ""}
        >
          Live Tracking
        </Link> 
        
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="navbar-search-icon">
          <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div className="navbar-upload">
          <Link to='/view'> <img src={assets.icon_upload} alt="" /></Link>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;