import React, { useEffect, useState } from 'react';
import { FaChartBar, FaEnvelope, FaShoppingCart, FaUser, FaBars, FaAngleLeft } from 'react-icons/fa';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(window.innerWidth < 768);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const handleResize = () => setIsMinimized(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsMinimized((prev) => !prev);

  return (
    <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="sidebar-header">
        {!isMinimized && <div className="logo">ERM</div>}
        <button className="toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isMinimized ? <FaBars /> : <FaAngleLeft />}
        </button>
      </div>

      <ul className="menu">
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
            <FaUser />
            {!isMinimized && <span>      Profile</span>}
          </Link>
        </li>
        <li className={location.pathname === "/analytics" ? "active" : ""}>
          <Link to="/dashboard">
            <FaChartBar />
            {!isMinimized && <span>      Analytics</span>}
          </Link>
        </li>
        <li className={location.pathname === "/mail" ? "active" : ""}>
          <Link to="/mail">
            <FaEnvelope />
            {!isMinimized && <span>     Mail</span>}
          </Link>
        </li>
        <li className={location.pathname === "/sales" ? "active" : ""}>
          <Link to="/sales">
            <FaShoppingCart />
            {!isMinimized && <span>     Sales</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
