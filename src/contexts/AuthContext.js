import React, { createContext, useState, useEffect } from "react";
import { KEYS_VALUES } from "../utils/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  const onLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem(KEYS_VALUES.authStatusKey, false);
    setUserInfo();
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        onLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
