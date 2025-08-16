import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppHeader.css";

const AppHeader = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const logOut = (event) => {
    props.onLogout(event);
  };

  const handleOpenNavMenu = (event) => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleOpenUserMenu = (event) => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleCloseNavMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <nav className="navbar">
          {/* Desktop Logo and Brand */}
          <div className="navbar-brand desktop-only">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <a href="/app/company/list" className="brand-text">
              Supply Chain Portal
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            <NavLink to="/app/company/list" className="nav-link">
              Companies
            </NavLink>
            <NavLink to="/app/contact/list" className="nav-link">
              Contacts
            </NavLink>
            <NavLink to="/app/inventory/list" className="nav-link">
              Inventories
            </NavLink>
            <NavLink to="/app/quote/list" className="nav-link">
              Quotes
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-container mobile-only">
            <button 
              className="mobile-menu-button"
              onClick={handleOpenNavMenu}
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            
            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
              <div className="mobile-menu">
                <NavLink 
                  to="/app/company/list" 
                  className="mobile-nav-link"
                  onClick={handleCloseNavMenu}
                >
                  Companies
                </NavLink>
                <NavLink 
                  to="/app/contact/list" 
                  className="mobile-nav-link"
                  onClick={handleCloseNavMenu}
                >
                  Contacts
                </NavLink>
                <NavLink 
                  to="/app/inventory/list" 
                  className="mobile-nav-link"
                  onClick={handleCloseNavMenu}
                >
                  Inventories
                </NavLink>
                <NavLink 
                  to="/app/quote/list" 
                  className="mobile-nav-link"
                  onClick={handleCloseNavMenu}
                >
                  Quotes
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Brand */}
          <div className="mobile-brand mobile-only">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="brand-text-mobile">SCP</span>
          </div>

          {/* User Profile Menu */}
          <div className="user-menu">
            <button 
              className="user-menu-button"
              onClick={handleOpenUserMenu}
              title="Open user menu"
            >
              <div className="user-avatar">
                <img 
                  src="/static/images/avatar/2.jpg" 
                  alt="User Avatar"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallback = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="avatar-fallback">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </button>
            
            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="user-dropdown">
                <Link 
                  to="/app/profile/changepassword" 
                  className="user-dropdown-link"
                  onClick={handleCloseUserMenu}
                >
                  My Profile
                </Link>
                <button 
                  className="user-dropdown-link logout-button"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
