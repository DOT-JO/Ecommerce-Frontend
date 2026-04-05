import React, { useState } from 'react';
import './componentStyle/Header.css';
import logo from '/image1.png'
import { Link, useNavigate } from 'react-router-dom';  
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

  const token = localStorage.getItem("token");  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <div className='main'>

        <div className="logo">
          <img src={logo} style={{ width: "65px", height: "65px", borderRadius: "50%", border: "3px dotted gold" }} />
        </div>

        <div className={`links ${open ? "active" : ""}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">shop</Link></li>
            <li><Link to="/About">About Us</Link></li>
          </ul>
        </div>

        <div className='icons'>
          <Link to="/cart"><FaCartShopping style={{ color: "gold" }} /></Link>
          <div className="ham" onClick={() => setOpen(!open)}>
            <GiHamburgerMenu />
          </div>

       
          {token ? (
            <button className="login-link" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <Link to="/login" className="login-link">Log In</Link>
          )}
        </div>

      </div>
    </>
  );
};

export default Header;