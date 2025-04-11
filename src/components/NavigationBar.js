import "../styles/navigation-bar.css";
import React, { useContext } from "react";
import { ICONS, KEYS_VALUES } from "../utils/constants";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function NavigationBar() {
  const { userInfo, onLogout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isAuthenticated = userInfo && true;

  return (
    <nav className="navigation-bar">
      <div className="navigation-bar__left">
        <div className="navigation-bar__theme-switch">
          <button
            className="theme-switch__slider"
            onClick={toggleTheme}>
            <span className={`theme-switch__icon ${theme === KEYS_VALUES.darkThemeValue && "theme-switch__icon--dark"}`}>{theme === KEYS_VALUES.darkThemeValue ? ICONS.moon : ICONS.sun}</span>
          </button>
        </div>
        <NavLink
          to="/"
          className="navigation-bar__item">
          <i className="bi bi-house-door navigation-bar__icon" />
          <span className="navigation-bar__title">Home</span>
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/create-blog-post"
            className="navigation-bar__item">
            <i className="bi bi-pencil-square navigation-bar__icon" />
            <span className="navigation-bar__title">Create</span>
          </NavLink>
        )}
      </div>
      <div className="navigation-bar__right">
        <div className="navigation-bar__dropdown">
          {isAuthenticated ? (
            <>
              <i className="bi bi-person-check dropdown__icon" />
              <div className="dropdown__content">
                <NavLink
                  className="dropdown__item"
                  to="profile">
                  <i className="bi bi-person navigation-bar__icon" />
                  <span className="navigation-bar__title">Profile</span>
                </NavLink>
                <NavLink
                  className="dropdown__item"
                  to={"/my-blog-posts"}>
                  <i className="bi bi-file-text navigation-bar__icon" />
                  <span className="navigation-bar__title">My Blog Posts</span>
                </NavLink>
                <NavLink
                  to="/"
                  className="dropdown__item"
                  onClick={onLogout}>
                  <i className="bi bi-box-arrow-in-left navigation-bar__icon" />
                  <span className="navigation-bar__title">Logout</span>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <i className="bi bi-person-x dropdown__icon" />
              <div className="dropdown__content">
                <NavLink
                  className="dropdown__item"
                  to="/login">
                  <i className="bi bi-box-arrow-in-right navigation-bar__icon" />
                  <span className="navigation-bar__title">Sign-in</span>
                </NavLink>
                <NavLink
                  className="dropdown__item"
                  to="/signup">
                  <i className="bi bi-person-add navigation-bar__icon" />
                  <span className="navigation-bar__title">Signup</span>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
      {userInfo?.role === KEYS_VALUES.adminRoleValue ? (
        <NavLink
          className="navigation-bar__item"
          to="/users">
          <i className="bi bi-people navigation-bar__icon" />
          <span className="navigation-bar__title">Users</span>
        </NavLink>
      ) : null}
    </nav>
  );
}
