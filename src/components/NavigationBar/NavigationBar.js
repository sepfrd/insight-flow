import { storageService } from "@/api/storageService";
import { AuthContext } from "@/contexts/AuthContext";
import { StorageContext } from "@/contexts/StorageContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { ICONS, KEYS_VALUES } from "@/utils/constants";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { isAuthenticated, userInfo, onLogout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { storageUpdated } = useContext(StorageContext);

  useEffect(() => {
    const fetchProfileImageAsync = async () => {
      let storedImage = await storageService.loadProfileImageAsync(userInfo?.username);

      return !storedImage ? null : URL.createObjectURL(storedImage);
    };

    if (isAuthenticated) {
      fetchProfileImageAsync().then((storedImage) => {
        if (storedImage) {
          setProfileImage(storedImage);
        }
      });
    }
  }, [isAuthenticated, userInfo, storageUpdated]);

  return (
    <nav className={styles.NavigationBar}>
      <div className={styles.NavigationBarLeft}>
        <div className={styles.NavigationBarThemeSwitch}>
          <button
            className={styles.ThemeSwitchSlider}
            onClick={toggleTheme}>
            <span className={`${styles.ThemeSwitchIcon} ${theme === KEYS_VALUES.darkThemeValue ? styles.ThemeSwitchIconDark : ""}`}>{theme === KEYS_VALUES.darkThemeValue ? ICONS.moon : ICONS.sun}</span>
          </button>
        </div>
        <NavLink
          to="/"
          className={styles.NavigationBarItem}>
          <i className={`bi bi-house-door ${styles.NavigationBarIcon}`} />
          <span className={styles.NavigationBarTitle}>Home</span>
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/create-blog-post"
            className={styles.NavigationBarItem}>
            <i className={`bi bi-pencil-square ${styles.NavigationBarIcon}`} />
            <span className={styles.NavigationBarTitle}>Create</span>
          </NavLink>
        )}
      </div>
      <div className={styles.NavigationBarRight}>
        {isAuthenticated ? (
          <>
            <NavLink
              className={styles.NavigationBarItem}
              to={"/my-blog-posts"}>
              <i className={`bi bi-file-text ${styles.NavigationBarIcon}`} />
              <span className={styles.NavigationBarTitle}>My Blog Posts</span>
            </NavLink>
            <NavLink
              to="/"
              className={styles.NavigationBarItem}
              onClick={onLogout}>
              <i className={`bi bi-box-arrow-in-left ${styles.NavigationBarIcon}`} />
              <span className={styles.NavigationBarTitle}>Logout</span>
            </NavLink>
            <NavLink
              className={styles.NavigationBarItem}
              to="profile">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="From server"
                  className={styles.NavigationBarImage}
                />
              ) : (
                <>
                  <i className={`bi bi-person ${styles.NavigationBarIcon}`} />
                  <span className={styles.NavigationBarTitle}>Profile</span>
                </>
              )}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={styles.NavigationBarItem}
              to="/login">
              <i className={`bi bi-box-arrow-in-right ${styles.NavigationBarIcon}`} />
              <span className={styles.NavigationBarTitle}>Sign-in</span>
            </NavLink>
            <NavLink
              className={styles.NavigationBarItem}
              to="/signup">
              <i className={`bi bi-person-add ${styles.NavigationBarIcon}`} />
              <span className={styles.NavigationBarTitle}>Signup</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
