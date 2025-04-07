import "../styles/navigation-bar.css";
import React, { useContext } from "react";
import { ICONS, KEYS_VALUES } from "../utils/constants";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function NavigationBar() {
  const { userInfo, onLogout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="top-bar">
      <div className="top-bar-left">
        <div className="switch">
          <button
            className="slider"
            onClick={toggleTheme}>
            <span className={`theme-switcher-icon ${theme}`}>{theme === KEYS_VALUES.darkThemeValue ? ICONS.moon : ICONS.sun}</span>
          </button>
        </div>
        <NavLink
          to="/"
          className="nav-item"
          id="home-button">
          <i class="bi bi-house-door nav-item-icon" />
          <span className="nav-item-title">Home</span>
        </NavLink>
      </div>
      <div className="top-bar-right">
        <div className="dropdown">
          {userInfo ? (
            <>
              <i className="bi bi-person-check dropdown-icon" />
              <div className="dropdown-content">
                <NavLink
                  className="dropdown-item"
                  to="profile">
                  <i class="bi bi-person nav-item-icon" />
                  <span className="nav-item-title">Profile</span>
                </NavLink>
                <NavLink
                  to="/"
                  className="dropdown-item"
                  onClick={onLogout}>
                  <i class="bi bi-box-arrow-in-left nav-item-icon" />
                  <span className="nav-item-title">Logout</span>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <i className="bi bi-person-x dropdown-icon" />
              <div className="dropdown-content">
                <NavLink
                  className="dropdown-item"
                  to="/login">
                  <i class="bi bi-box-arrow-in-right nav-item-icon" />
                  <span className="nav-item-title">Sign-in</span>
                </NavLink>
                <NavLink
                  className="dropdown-item"
                  to="/signup">
                  <i class="bi bi-person-add nav-item-icon" />
                  <span className="nav-item-title">Signup</span>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
      {userInfo?.role === KEYS_VALUES.adminRoleValue ? (
        <NavLink
          className="nav-item"
          to="/users">
          <i class="bi bi-people nav-item-icon" />
          <span className="nav-item-title">Users</span>
        </NavLink>
      ) : null}
      {/* <NavLink
        to="/"
        className="navbar-brand">
        Insight Flow
      </NavLink> */}
    </nav>
  );
}
