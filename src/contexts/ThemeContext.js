import React, { createContext, useCallback, useEffect, useState } from "react";
import { COLORS, KEYS_VALUES } from "../utils/constants";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(KEYS_VALUES.darkThemeValue);

  const setTheme = useCallback((mode) => {
    switch (mode) {
      case KEYS_VALUES.darkThemeValue:
        document.documentElement.style.setProperty("--primary-color", COLORS.light);
        document.documentElement.style.setProperty("--secondary-color", COLORS.dark);
        localStorage.setItem(KEYS_VALUES.themeKey, KEYS_VALUES.darkThemeValue);
        setThemeState(KEYS_VALUES.darkThemeValue);
        break;
      case KEYS_VALUES.lightThemeValue:
        document.documentElement.style.setProperty("--primary-color", COLORS.dark);
        document.documentElement.style.setProperty("--secondary-color", COLORS.light);
        localStorage.setItem(KEYS_VALUES.themeKey, KEYS_VALUES.lightThemeValue);
        setThemeState(KEYS_VALUES.lightThemeValue);
        break;
      default:
        setTheme(KEYS_VALUES.darkThemeValue);
        break;
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(KEYS_VALUES.themeKey);
    setTheme(storedTheme || KEYS_VALUES.darkThemeValue);
  }, [setTheme]);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem(KEYS_VALUES.themeKey);
    setTheme(currentTheme === KEYS_VALUES.lightThemeValue ? KEYS_VALUES.darkThemeValue : KEYS_VALUES.lightThemeValue);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
