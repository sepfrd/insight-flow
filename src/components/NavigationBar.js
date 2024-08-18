import "../styles/navigation-bar.css";
import React, { useContext } from "react";
import { ICONS, KEYS_VALUES } from "../utils/constants";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const NavigationBar = () => {
  const { userInfo, onLogout } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="top-bar">
      <label className="switch">
        <input
          type="checkbox"
          id="theme-switcher"
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
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
        <NavLink
          className="nav-item"
          to="/login">
          <span className="nav-item-icon">{ICONS.login}</span>
          <span className="nav-item-title">Login</span>
        </NavLink>
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
};

export default NavigationBar;
