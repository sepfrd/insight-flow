import { createContext, useState, useEffect } from "react";
import { KEYS_VALUES } from "../utils/constants";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(KEYS_VALUES.lightThemeValue);

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem(KEYS_VALUES.themeKey, theme);
    };

    refreshTheme();
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
