import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { KEYS_VALUES } from "../utils/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const storedAuthToken = sessionStorage.getItem(KEYS_VALUES.authTokenKey);
    if (storedAuthToken) {
      const decoded = jwtDecode(storedAuthToken);
      setUserInfo(decoded);
    }
  }, []);
  const onLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem(KEYS_VALUES.authStatusKey, false);
    setUserInfo();
  };

  const onLogin = (token) => {
    const decoded = jwtDecode(token);
    sessionStorage.setItem(KEYS_VALUES.authTokenKey, token);
    sessionStorage.setItem(KEYS_VALUES.authStatusKey, true);
    setUserInfo(decoded);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        onLogin,
        onLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
