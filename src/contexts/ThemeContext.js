import React, { createContext, useState, useEffect, useCallback } from "react";
import { KEYS_VALUES, COLORS } from "../utils/constants";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(KEYS_VALUES.darkThemeValue);

  const setTheme = useCallback((mode) => {
    switch (mode) {
      case KEYS_VALUES.darkThemeValue:
        document.documentElement.style.setProperty("--text-color", COLORS.darkText);
        document.documentElement.style.setProperty("--brand-color", COLORS.darkBrand);
        document.documentElement.style.setProperty("--background-color", COLORS.darkBackground);
        document.documentElement.style.setProperty("--top-bar-background-color", COLORS.darkTopBarBackground);
        document.documentElement.style.setProperty("--pattern-color", COLORS.darkPattern);
        localStorage.setItem(KEYS_VALUES.themeKey, KEYS_VALUES.darkThemeValue);
        setThemeState(KEYS_VALUES.darkThemeValue);
        break;
      case KEYS_VALUES.lightThemeValue:
        document.documentElement.style.setProperty("--text-color", COLORS.lightText);
        document.documentElement.style.setProperty("--brand-color", COLORS.lightBrand);
        document.documentElement.style.setProperty("--background-color", COLORS.lightBackground);
        document.documentElement.style.setProperty("--top-bar-background-color", COLORS.lightTopBarBackground);
        document.documentElement.style.setProperty("--pattern-color", COLORS.lightPattern);
        localStorage.setItem(KEYS_VALUES.themeKey, KEYS_VALUES.lightThemeValue);
        setThemeState(KEYS_VALUES.lightThemeValue);
        break;
      default:
        setTheme(KEYS_VALUES.lightThemeValue);
        break;
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(KEYS_VALUES.themeKey);
    setTheme(storedTheme || KEYS_VALUES.lightThemeValue);
  }, [setTheme]);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem(KEYS_VALUES.themeKey);
    setTheme(currentTheme === KEYS_VALUES.lightThemeValue ? KEYS_VALUES.darkThemeValue : KEYS_VALUES.lightThemeValue);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
