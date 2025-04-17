import React, { createContext, useEffect, useState } from "react";
import { storageService } from "../api/storageService";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const storedAuthToken = storageService.getAuthToken();
    if (storedAuthToken) {
      const decoded = jwtDecode(storedAuthToken);
      console.log(decoded.roles);
      setUserRoles(decoded.roles);
      storageService.setAuthStatus(true);
      return;
    }

    storageService.setAuthStatus(false);
  }, []);

  const onLogout = () => {
    storageService.clearSessionStorage();
    storageService.setAuthStatus(false);
    storageService.clearIndexedDb();
    setUserRoles();
    window.location.reload();
  };

  const onLogin = (token) => {
    const decoded = jwtDecode(token);
    storageService.setAuthToken(token);
    storageService.setAuthStatus(true);
    setUserRoles(decoded.roles);
  };

  return (
    <AuthContext.Provider
      value={{
        userRoles,
        setUserRoles,
        onLogin,
        onLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
