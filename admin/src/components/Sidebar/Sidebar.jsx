import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
      <NavLink to='/dashboard' className="sidebar-option">
          <img src={assets.idashboard} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/admincontact' className="sidebar-option">
          <img src={assets.icon_letter} alt="" />
          <p>AdminContact</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>List items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/managereport' className="sidebar-option">
          <img src={assets.icon_view} alt="" />
          <p>View Reports</p>
        </NavLink>
        </div>

    </div>
  )
}

export default Sidebar;