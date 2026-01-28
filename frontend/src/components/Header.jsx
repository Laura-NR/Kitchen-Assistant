import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Or 'token'
    navigate('/login');
  };

  return (
    <nav className="bg-primary w-100 position-relative d-flex flex-row justify-content-center align-items-center overflow-visible"
      style={{ height: "6rem", borderBottom: "2px solid #d4af37" }}>
      
      <ul className="d-flex flex-row justify-content-between align-items-center w-75 list-unstyled mb-0">
        {/* Left Side */}
        <div className="d-flex flex-row gap-4">
          <li><a href="#" className="nav-link-gold">Recipes</a></li>
          <li><a href="#" className="nav-link-gold">Menus</a></li>
        </div>

        {/* Logo - Center Absolute */}
        <li className="logo-container">
          <a href="/">
            <img
              src="/logo-green-background.png" 
              alt="Logo"
              style={{ width: "140px", height: "auto", filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))" }}
            />
          </a>
        </li>

        {/* Right Side */}
        <div className="d-flex flex-row gap-4 align-items-center">
          <li><a href="#" className="nav-link-gold">Shopping</a></li>
          <li><a href="#" className="nav-link-gold">Tools</a></li>
          <li className="ms-3 d-flex align-items-center gap-2">
            <span className="account-icon" title="Account Settings">👤</span>
            <button onClick={handleLogout} className="logout-text-btn">Logout</button>
          </li>
        </div>
      </ul>
    </nav>
  );
}