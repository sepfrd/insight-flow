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
      <div className="switch">
        <button
          className="slider"
          onClick={toggleTheme}>
          <span className={`theme-switcher-icon ${theme}`}>{theme === KEYS_VALUES.darkThemeValue ? ICONS.moon : ICONS.sun}</span>
        </button>
      </div>
      <NavLink
        to="/"
        className="nav-item">
        <span className="nav-item-icon">{ICONS.home}</span>
        <span className="nav-item-title">Home</span>
      </NavLink>
      {userInfo ? (
        <NavLink
          className="nav-item"
          onClick={onLogout}>
          <span className="nav-item-icon">{ICONS.logout}</span>
          <span className="nav-item-title">Logout</span>
        </NavLink>
      ) : (
        <div className="login-signup-buttons">
          <NavLink
            className="nav-item"
            to="/login">
            <span className="nav-item-icon">{ICONS.login}</span>
            <span className="nav-item-title">Login</span>
          </NavLink>
          <NavLink
            className="nav-item"
            to="/signup">
            <span className="nav-item-icon">{ICONS.users}</span>
            <span className="nav-item-title">Signup</span>
          </NavLink>
        </div>
      )}
      {userInfo?.role === KEYS_VALUES.adminRoleValue ? (
        <NavLink
          className="nav-item"
          to="/users">
          <span className="nav-item-icon">{ICONS.users}</span>
          <span className="nav-item-title">Users</span>
        </NavLink>
      ) : null}
      <NavLink
        to="/"
        className="navbar-brand">
        Insight Flow
      </NavLink>
    </nav>
  );
}
