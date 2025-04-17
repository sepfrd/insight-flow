import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { storageService } from "../api/storageService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const storedAuthToken = storageService.getAuthToken();
    if (storedAuthToken) {
      const decoded = jwtDecode(storedAuthToken);
      setUserInfo(decoded);
    }
  }, []);

  const onLogout = () => {
    storageService.clearSessionStorage();
    storageService.setAuthStatus(false);
    storageService.clearIndexedDb();
    setUserInfo();
  };

  const onLogin = (token) => {
    const decoded = jwtDecode(token);
    storageService.setAuthToken(token);
    storageService.setAuthStatus(true);
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
